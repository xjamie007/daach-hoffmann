import 'server-only';

import { createHash, randomUUID } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

import { inquirySchema, type Inquiry } from './schema';
import { MIN_FILL_MS, MAX_PHOTOS, MAX_PHOTO_BYTES, ACCEPTED_PHOTO_TYPES } from './fields';
import { notificationEmail, confirmationEmail } from './emails';
import { client } from '~/config/client.config';

/**
 * The server side of the enquiry form.
 *
 * `server-only` at the top is not decoration: this module reads
 * SUPABASE_SERVICE_ROLE_KEY and RESEND_API_KEY, and the import would fail the
 * build rather than quietly shipping either of them to the browser if
 * something ever pulled it into a client component.
 *
 * The same pipeline runs behind both transports — the Next server action on a
 * Node host, and the Supabase edge function on the static one. See
 * supabase/functions/submit-inquiry.
 */

export interface IncomingPhoto {
  readonly name: string;
  readonly type: string;
  /** Raw bytes, base64, already resized in the browser. */
  readonly data: string;
}

export type InquiryResult =
  | { ok: true; id: string; photosStored: number; delivered: boolean }
  | { ok: false; error: 'validation'; fieldErrors: Record<string, string> }
  | { ok: false; error: 'rejected' | 'storage' | 'database' | 'mail' };

const SIGNED_URL_TTL_SECONDS = 60 * 60 * 24 * 7;

function env(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

/**
 * Section 14.3: IP addresses are stored hashed, never in clear text.
 *
 * The per-deployment salt matters. Without it, the hash of an IPv4 address is
 * reversible by brute force in seconds — there are only four billion of them,
 * and a plain SHA-256 of each fits comfortably on a laptop.
 */
function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  const salt = env('IP_HASH_SALT') ?? env('SUPABASE_SERVICE_ROLE_KEY') ?? '';
  if (!salt) return null;
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32);
}

/** Guards the photo payload again on the server. The browser is not trusted. */
function acceptablePhotos(photos: readonly IncomingPhoto[]): IncomingPhoto[] {
  return photos
    .filter((photo) => (ACCEPTED_PHOTO_TYPES as readonly string[]).includes(photo.type))
    .filter((photo) => Buffer.byteLength(photo.data, 'base64') <= MAX_PHOTO_BYTES)
    .slice(0, MAX_PHOTOS);
}

export async function processInquiry(
  raw: unknown,
  photos: readonly IncomingPhoto[] = [],
  meta: { readonly ip?: string | null } = {},
): Promise<InquiryResult> {
  /* 1 · Validate. Same schema the browser used, re-run without trusting it. */
  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join('.');
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: 'validation', fieldErrors };
  }
  const inquiry: Inquiry = parsed.data;

  /* 2 · Bot defences, section 12.2. Both are silent on purpose: a bot that
        learns why it was rejected adapts, and a person never sees either. */
  if (inquiry.website) return { ok: false, error: 'rejected' };
  if (Date.now() - inquiry.startedAt < MIN_FILL_MS) return { ok: false, error: 'rejected' };

  const supabaseUrl = env('NEXT_PUBLIC_SUPABASE_URL');
  const serviceKey = env('SUPABASE_SERVICE_ROLE_KEY');
  const resendKey = env('RESEND_API_KEY');

  /*
    3 · Development fallback.

    With no credentials configured the enquiry is logged and reported as
    accepted, so the whole form — validation, resizing, upload UI, success
    state — can be exercised locally without a Supabase project. It is loud
    about what it did, and `delivered: false` travels back to the caller so
    nothing can mistake this for a real submission.
  */
  if (!supabaseUrl || !serviceKey) {
    console.warn(
      '[inquiry] No Supabase credentials configured — running in development fallback.\n' +
        '[inquiry] Nothing was stored and no mail was sent. Fill in .env.local to enable delivery.\n' +
        JSON.stringify(
          { ...inquiry, message: `${inquiry.message.slice(0, 120)}…`, photos: photos.length },
          null,
          2,
        ),
    );
    return { ok: true, id: randomUUID(), photosStored: 0, delivered: false };
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  /* 4 · Photos first. An enquiry row that references an upload which failed is
        worse than an enquiry with fewer photos than the visitor attached. */
  const id = randomUUID();
  const accepted = acceptablePhotos(photos);
  const paths: string[] = [];

  for (const [index, photo] of accepted.entries()) {
    const extension = photo.type.split('/')[1]?.replace('jpeg', 'jpg') ?? 'jpg';
    const path = `${id}/${index + 1}.${extension}`;
    const { error } = await supabase.storage
      .from('inquiry-photos')
      .upload(path, Buffer.from(photo.data, 'base64'), { contentType: photo.type, upsert: false });

    if (error) {
      console.error('[inquiry] photo upload failed', { path, error: error.message });
      // Keep going. A missing photo must not cost the business the enquiry.
      continue;
    }
    paths.push(path);
  }

  /* 5 · Store. */
  const { error: insertError } = await supabase.from('inquiries').insert({
    id,
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone || null,
    locale: inquiry.locale,
    service: inquiry.service,
    roof_type: inquiry.roofType || null,
    urgency: inquiry.urgency,
    postal_code: inquiry.postalCode,
    locality: inquiry.locality,
    message: inquiry.message,
    photo_paths: paths,
    consent_at: new Date().toISOString(),
    source_page: inquiry.sourcePage ?? null,
    ip_hash: hashIp(meta.ip ?? null),
  });

  if (insertError) {
    console.error('[inquiry] insert failed', insertError.message);
    return { ok: false, error: 'database' };
  }

  /* 6 · Short-lived signed URLs for the notification mail. The bucket is
        private; these expire in a week, by which time the job is quoted. */
  const photoUrls: string[] = [];
  for (const path of paths) {
    const { data } = await supabase.storage
      .from('inquiry-photos')
      .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);
    if (data?.signedUrl) photoUrls.push(data.signedUrl);
  }

  /* 7 · Both mails. The enquiry is already stored, so a mail failure is
        logged and reported but does not discard the visitor's work. */
  if (!resendKey) {
    console.warn('[inquiry] RESEND_API_KEY missing — stored, but no mail sent.');
    return { ok: true, id, photosStored: paths.length, delivered: false };
  }

  const resend = new Resend(resendKey);
  const from = env('INQUIRY_MAIL_FROM') ?? `anfrage@${client.legacy.domain}`;
  const to = env('INQUIRY_MAIL_TO') ?? client.contact.email;

  try {
    const notification = notificationEmail(inquiry, photoUrls);
    await resend.emails.send({
      from: `${client.name} <${from}>`,
      to: [to],
      // So the business can hit reply and reach the customer directly.
      replyTo: inquiry.email,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
    });

    const confirmation = confirmationEmail(inquiry);
    await resend.emails.send({
      from: `${client.name} <${from}>`,
      to: [inquiry.email],
      replyTo: to,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });
  } catch (error) {
    console.error('[inquiry] mail delivery failed', error);
    return { ok: false, error: 'mail' };
  }

  return { ok: true, id, photosStored: paths.length, delivered: true };
}
