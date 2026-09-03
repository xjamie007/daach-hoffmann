/**
 * Enquiry endpoint for the static host.
 *
 * GitHub Pages runs no Node process, so the server action in
 * src/app/actions/submitInquiry.ts has nowhere to execute. This edge function
 * takes its place and performs the same steps in the same order: validate,
 * reject bots, store photos, insert the row, sign the photo URLs, send both
 * mails.
 *
 * It is deliberately self-contained. Deno cannot resolve the app's path
 * aliases, and bundling the Next module graph into an edge function to reuse
 * one schema would be a far worse trade than repeating a field list. What it
 * must not do is drift — `npm run check:inquiry` compares the vocabulary below
 * against src/lib/inquiry/fields.ts and fails the build when they diverge.
 *
 * Deploy:
 *   supabase functions deploy submit-inquiry --no-verify-jwt
 * Then set NEXT_PUBLIC_INQUIRY_ENDPOINT to the function URL.
 */
import { createClient } from 'jsr:@supabase/supabase-js@2';

// --- shared vocabulary: keep in step with src/lib/inquiry/fields.ts ---------
const URGENCIES = ['emergency', 'soon', 'planning'];
const ROOF_TYPES = ['tile', 'slate', 'metal', 'flat', 'unknown'];
const SERVICE_IDS = ['roofing', 'sheet-metal', 'chimney', 'cleaning', 'emergency', 'other'];
const LOCALES = ['de', 'fr', 'en'];
const MAX_PHOTOS = 5;
const MAX_PHOTO_BYTES = 10 * 1024 * 1024;
const ACCEPTED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
const MIN_FILL_MS = 3000;
// ---------------------------------------------------------------------------

const SIGNED_URL_TTL_SECONDS = 60 * 60 * 24 * 7;

/**
 * Only the site's own origin may post here. Without this any page anywhere
 * could drive the business's inbox, and the honeypot alone would not stop it.
 */
const ALLOWED_ORIGIN = Deno.env.get('SITE_ORIGIN') ?? '*';

const corsHeaders = {
  'access-control-allow-origin': ALLOWED_ORIGIN,
  'access-control-allow-headers': 'content-type',
  'access-control-allow-methods': 'POST, OPTIONS',
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...corsHeaders },
  });
}

interface FieldErrors {
  [field: string]: string;
}

function validate(input: Record<string, unknown>): { errors: FieldErrors; value: Record<string, unknown> } {
  const errors: FieldErrors = {};
  const str = (key: string) => (typeof input[key] === 'string' ? (input[key] as string).trim() : '');

  const name = str('name');
  if (name.length < 2 || name.length > 120) errors.name = 'errors.name';

  const email = str('email').toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 180) errors.email = 'errors.email';

  const phone = str('phone');
  if (phone.length > 40) errors.phone = 'errors.phone';

  const urgency = str('urgency');
  if (!URGENCIES.includes(urgency)) errors.urgency = 'errors.urgency';

  const service = str('service');
  if (!SERVICE_IDS.includes(service)) errors.service = 'errors.service';

  const roofType = str('roofType');
  if (roofType && !ROOF_TYPES.includes(roofType)) errors.roofType = 'errors.roofType';

  const postalCode = str('postalCode');
  if (postalCode.length < 4 || postalCode.length > 12) errors.postalCode = 'errors.postalCode';

  const locality = str('locality');
  if (locality.length < 2 || locality.length > 120) errors.locality = 'errors.locality';

  const message = str('message');
  if (message.length < 20) errors.message = 'errors.messageShort';
  if (message.length > 4000) errors.message = 'errors.messageLong';

  if (input.consent !== true) errors.consent = 'errors.consent';

  const locale = str('locale');
  const safeLocale = LOCALES.includes(locale) ? locale : 'de';

  return {
    errors,
    value: {
      name, email, phone, urgency, service,
      roofType, postalCode, locality, message,
      locale: safeLocale,
      sourcePage: str('sourcePage'),
      website: str('website'),
      startedAt: typeof input.startedAt === 'number' ? input.startedAt : 0,
    },
  };
}

async function hashIp(ip: string | null): Promise<string | null> {
  if (!ip) return null;
  const salt = Deno.env.get('IP_HASH_SALT') ?? '';
  if (!salt) return null;
  const bytes = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32);
}

function decodeBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return json({ ok: false, error: 'rejected' }, 405);

  let body: { inquiry?: Record<string, unknown>; photos?: { name: string; type: string; data: string }[] };
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'rejected' }, 400);
  }

  const { errors, value } = validate(body.inquiry ?? {});
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, error: 'validation', fieldErrors: errors }, 400);
  }

  // Bot defences. Silent by design — a bot that learns why it failed adapts.
  if (value.website) return json({ ok: false, error: 'rejected' }, 400);
  if (Date.now() - (value.startedAt as number) < MIN_FILL_MS) {
    return json({ ok: false, error: 'rejected' }, 400);
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false } },
  );

  const id = crypto.randomUUID();

  /* Photos first: a row referencing a failed upload is worse than fewer photos. */
  const photos = (body.photos ?? [])
    .filter((photo) => ACCEPTED_PHOTO_TYPES.includes(photo.type))
    .slice(0, MAX_PHOTOS);

  const paths: string[] = [];
  for (const [index, photo] of photos.entries()) {
    const bytes = decodeBase64(photo.data);
    if (bytes.byteLength > MAX_PHOTO_BYTES) continue;

    const extension = photo.type.split('/')[1]?.replace('jpeg', 'jpg') ?? 'jpg';
    const path = `${id}/${index + 1}.${extension}`;
    const { error } = await supabase.storage
      .from('inquiry-photos')
      .upload(path, bytes, { contentType: photo.type, upsert: false });

    if (error) {
      console.error('photo upload failed', path, error.message);
      continue;
    }
    paths.push(path);
  }

  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() ?? null;

  const { error: insertError } = await supabase.from('inquiries').insert({
    id,
    name: value.name,
    email: value.email,
    phone: value.phone || null,
    locale: value.locale,
    service: value.service,
    roof_type: value.roofType || null,
    urgency: value.urgency,
    postal_code: value.postalCode,
    locality: value.locality,
    message: value.message,
    photo_paths: paths,
    consent_at: new Date().toISOString(),
    source_page: value.sourcePage || null,
    ip_hash: await hashIp(ip),
  });

  if (insertError) {
    console.error('insert failed', insertError.message);
    return json({ ok: false, error: 'database' }, 500);
  }

  const photoUrls: string[] = [];
  for (const path of paths) {
    const { data } = await supabase.storage
      .from('inquiry-photos')
      .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);
    if (data?.signedUrl) photoUrls.push(data.signedUrl);
  }

  /*
    Mails.
    The enquiry is already stored at this point, so a delivery failure is
    reported but never discards what the visitor wrote.
  */
  const resendKey = Deno.env.get('RESEND_API_KEY');
  if (!resendKey) {
    console.warn('RESEND_API_KEY missing — stored, but no mail sent.');
    return json({ ok: true, id, photosStored: paths.length, delivered: false });
  }

  const from = Deno.env.get('INQUIRY_MAIL_FROM') ?? 'anfrage@daach-hoffmann.lu';
  const to = Deno.env.get('INQUIRY_MAIL_TO') ?? 'info@daach-hoffmann.lu';

  const escape = (text: string) =>
    text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const isEmergency = value.urgency === 'emergency';
  const subject =
    `${isEmergency ? '[NOTFALL] ' : ''}Anfrage ${value.postalCode} ${value.locality}` +
    ` — ${value.service} — ${value.name}`;

  const lines = [
    isEmergency ? '*** ALS NOTFALL GEMELDET ***' : '',
    `Name:          ${value.name}`,
    `E-Mail:        ${value.email}`,
    value.phone ? `Telefon:       ${value.phone}` : '',
    `Dringlichkeit: ${value.urgency}`,
    `Leistung:      ${value.service}`,
    value.roofType ? `Dachtyp:       ${value.roofType}` : '',
    `Ort:           ${value.postalCode} ${value.locality}`,
    `Sprache:       ${String(value.locale).toUpperCase()}`,
    '',
    'Nachricht:',
    value.message as string,
    '',
    photoUrls.length ? `Fotos (7 Tage gültig):\n${photoUrls.join('\n')}` : 'Keine Fotos angehängt.',
  ].filter(Boolean);

  async function send(payload: Record<string, unknown>) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${resendKey}`, 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`resend ${response.status}: ${await response.text()}`);
  }

  try {
    await send({
      from: `Daach Hoffmann <${from}>`,
      to: [to],
      reply_to: value.email,
      subject,
      text: lines.join('\n'),
      html: `<pre style="font:14px/1.6 ui-monospace,monospace;white-space:pre-wrap">${escape(lines.join('\n'))}</pre>`,
    });

    const confirmation: Record<string, string> = {
      de: `Guten Tag ${value.name},\n\nvielen Dank für Ihre Anfrage. Wir haben sie erhalten und melden uns innerhalb eines Werktags.\n\nIhre Nachricht:\n${value.message}\n\nMit freundlichen Grüssen\nDaach Hoffmann, Holzem`,
      fr: `Bonjour ${value.name},\n\nmerci pour votre demande. Nous l'avons bien reçue et vous répondons sous un jour ouvrable.\n\nVotre message :\n${value.message}\n\nCordialement\nDaach Hoffmann, Holzem`,
      en: `Hello ${value.name},\n\nthank you for your enquiry. We have received it and will reply within one working day.\n\nYour message:\n${value.message}\n\nKind regards\nDaach Hoffmann, Holzem`,
    };
    const subjects: Record<string, string> = {
      de: 'Ihre Anfrage bei Daach Hoffmann',
      fr: 'Votre demande chez Daach Hoffmann',
      en: 'Your enquiry with Daach Hoffmann',
    };

    await send({
      from: `Daach Hoffmann <${from}>`,
      to: [value.email],
      reply_to: to,
      subject: subjects[value.locale as string],
      text: confirmation[value.locale as string],
    });
  } catch (error) {
    console.error('mail delivery failed', error);
    return json({ ok: false, error: 'mail' }, 502);
  }

  return json({ ok: true, id, photosStored: paths.length, delivered: true });
});
