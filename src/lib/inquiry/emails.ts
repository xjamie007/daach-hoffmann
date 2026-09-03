import type { Inquiry } from './schema';
import { client } from '~/config/client.config';

/**
 * The two mails from section 12.2.
 *
 * Both are plain HTML with a text alternative. No images, no tracking pixel,
 * no external stylesheet: a notification the business reads on a phone on a
 * roof has to render in whatever client is installed, and a mail that only
 * looks right in one of them is a mail that gets missed.
 *
 * The subject line of the notification leads with urgency and place, because
 * that is what decides whether it is opened now or after lunch.
 */

type Locale = 'de' | 'fr' | 'en';

const URGENCY_LABEL: Record<Locale, Record<Inquiry['urgency'], string>> = {
  de: { emergency: 'NOTFALL', soon: 'In den nächsten Wochen', planning: 'Planung' },
  fr: { emergency: 'URGENCE', soon: 'Dans les prochaines semaines', planning: 'En projet' },
  en: { emergency: 'EMERGENCY', soon: 'Within the next weeks', planning: 'Planning ahead' },
};

const ROOF_LABEL: Record<Locale, Record<string, string>> = {
  de: { tile: 'Ziegel', slate: 'Schiefer', metal: 'Blech', flat: 'Flachdach', unknown: 'Weiss nicht' },
  fr: { tile: 'Tuiles', slate: 'Ardoise', metal: 'Tôle', flat: 'Toit plat', unknown: 'Ne sait pas' },
  en: { tile: 'Tile', slate: 'Slate', metal: 'Metal', flat: 'Flat roof', unknown: 'Not sure' },
};

function serviceLabel(id: string, locale: Locale): string {
  const service = client.services.find((entry) => entry.id === id);
  return service ? service.name[locale] : id;
}

/** Minimal escaping. Everything interpolated below is visitor-supplied. */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const SHELL = (title: string, body: string) => `<!doctype html>
<html><head><meta charset="utf-8"><title>${esc(title)}</title></head>
<body style="margin:0;padding:24px;background:#f7f5f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#22282e;line-height:1.55">
<div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e3e1dd;border-radius:4px;padding:28px">
${body}
</div>
</body></html>`;

const row = (label: string, value: string) =>
  `<tr><td style="padding:7px 16px 7px 0;color:#6b6f75;white-space:nowrap;vertical-align:top">${esc(label)}</td>` +
  `<td style="padding:7px 0;font-weight:600;vertical-align:top">${esc(value)}</td></tr>`;

/* -------------------------------------------------------------------------- */
/* 1 · Notification to the business                                           */
/* -------------------------------------------------------------------------- */

export function notificationEmail(inquiry: Inquiry, photoUrls: readonly string[]) {
  const locale = inquiry.locale as Locale;
  const isEmergency = inquiry.urgency === 'emergency';

  const subject =
    `${isEmergency ? '[NOTFALL] ' : ''}Anfrage ${inquiry.postalCode} ${inquiry.locality}` +
    ` — ${serviceLabel(inquiry.service, 'de')} — ${inquiry.name}`;

  const details = [
    row('Name', inquiry.name),
    row('E-Mail', inquiry.email),
    inquiry.phone ? row('Telefon', inquiry.phone) : '',
    row('Dringlichkeit', URGENCY_LABEL.de[inquiry.urgency]),
    row('Leistung', serviceLabel(inquiry.service, 'de')),
    inquiry.roofType ? row('Dachtyp', ROOF_LABEL.de[inquiry.roofType] ?? inquiry.roofType) : '',
    row('Ort', `${inquiry.postalCode} ${inquiry.locality}`),
    row('Sprache', locale.toUpperCase()),
    inquiry.sourcePage ? row('Von Seite', inquiry.sourcePage) : '',
  ].join('');

  const photos = photoUrls.length
    ? `<h2 style="margin:28px 0 10px;font-size:15px;text-transform:uppercase;letter-spacing:.08em;color:#6b6f75">
         Fotos (${photoUrls.length})
       </h2>
       <p style="margin:0;font-size:14px;color:#6b6f75">Links gelten 7 Tage.</p>
       <ul style="margin:10px 0 0;padding-left:18px">
         ${photoUrls.map((url, i) => `<li style="margin:4px 0"><a href="${esc(url)}" style="color:#7a5230">Foto ${i + 1}</a></li>`).join('')}
       </ul>`
    : '<p style="margin:24px 0 0;color:#6b6f75;font-size:14px">Keine Fotos angehängt.</p>';

  const html = SHELL(
    subject,
    `${isEmergency
      ? `<p style="margin:0 0 20px;padding:12px 16px;background:#fdecec;border-left:3px solid #b3261e;font-weight:700;color:#8c1d18">
           Als Notfall gemeldet. ${inquiry.phone ? `Rückruf: ${esc(inquiry.phone)}` : 'Keine Telefonnummer angegeben.'}
         </p>`
      : ''}
     <h1 style="margin:0 0 4px;font-size:20px">Neue Anfrage über die Website</h1>
     <p style="margin:0 0 22px;color:#6b6f75;font-size:14px">${esc(new Date().toLocaleString('de-LU', { timeZone: 'Europe/Luxembourg' }))}</p>
     <table style="border-collapse:collapse;font-size:15px;width:100%">${details}</table>
     <h2 style="margin:28px 0 8px;font-size:15px;text-transform:uppercase;letter-spacing:.08em;color:#6b6f75">Nachricht</h2>
     <p style="margin:0;white-space:pre-wrap">${esc(inquiry.message)}</p>
     ${photos}
     <p style="margin:28px 0 0;padding-top:16px;border-top:1px solid #e3e1dd;font-size:13px;color:#6b6f75">
       Antworten Sie direkt auf diese Mail — sie geht an ${esc(inquiry.email)}.
     </p>`,
  );

  const text = [
    isEmergency ? '*** ALS NOTFALL GEMELDET ***' : '',
    `Neue Anfrage über die Website`,
    '',
    `Name:          ${inquiry.name}`,
    `E-Mail:        ${inquiry.email}`,
    inquiry.phone ? `Telefon:       ${inquiry.phone}` : '',
    `Dringlichkeit: ${URGENCY_LABEL.de[inquiry.urgency]}`,
    `Leistung:      ${serviceLabel(inquiry.service, 'de')}`,
    inquiry.roofType ? `Dachtyp:       ${ROOF_LABEL.de[inquiry.roofType] ?? inquiry.roofType}` : '',
    `Ort:           ${inquiry.postalCode} ${inquiry.locality}`,
    `Sprache:       ${locale.toUpperCase()}`,
    '',
    'Nachricht:',
    inquiry.message,
    '',
    photoUrls.length ? `Fotos (Links gelten 7 Tage):\n${photoUrls.join('\n')}` : 'Keine Fotos angehängt.',
  ]
    .filter(Boolean)
    .join('\n');

  return { subject, html, text };
}

/* -------------------------------------------------------------------------- */
/* 2 · Confirmation to the sender                                             */
/* -------------------------------------------------------------------------- */

const CONFIRMATION: Record<
  Locale,
  {
    subject: string;
    greeting: (name: string) => string;
    intro: string;
    promise: (days: number) => string;
    emergencyNote: (phone: string) => string;
    summaryHeading: string;
    messageHeading: string;
    signoff: string;
    labels: { urgency: string; service: string; roof: string; place: string; phone: string };
  }
> = {
  de: {
    subject: 'Ihre Anfrage bei Daach Hoffmann',
    greeting: (name) => `Guten Tag ${name},`,
    intro: 'vielen Dank für Ihre Anfrage. Wir haben sie erhalten — hier ist, was bei uns angekommen ist.',
    promise: (days) =>
      `Wir melden uns innerhalb von ${days === 1 ? 'einem Werktag' : `${days} Werktagen`}. Falls Sie in der Zwischenzeit etwas ergänzen möchten, antworten Sie einfach auf diese Mail.`,
    emergencyNote: (phone) =>
      `Sie haben Ihre Anfrage als Notfall gekennzeichnet. Bei laufendem Wassereintritt ist ein Anruf schneller als jede Mail: ${phone}`,
    summaryHeading: 'Ihre Angaben',
    messageHeading: 'Ihre Nachricht',
    signoff: 'Mit freundlichen Grüssen\nDaach Hoffmann, Holzem',
    labels: { urgency: 'Dringlichkeit', service: 'Leistung', roof: 'Dachtyp', place: 'Ort', phone: 'Telefon' },
  },
  fr: {
    subject: 'Votre demande chez Daach Hoffmann',
    greeting: (name) => `Bonjour ${name},`,
    intro: 'merci pour votre demande. Nous l’avons bien reçue — voici ce qui nous est parvenu.',
    promise: (days) =>
      `Nous vous répondons sous ${days === 1 ? 'un jour ouvrable' : `${days} jours ouvrables`}. Si vous souhaitez compléter votre demande entre-temps, répondez simplement à ce message.`,
    emergencyNote: (phone) =>
      `Vous avez signalé votre demande comme urgente. En cas d’infiltration active, un appel va plus vite qu’un courriel : ${phone}`,
    summaryHeading: 'Vos indications',
    messageHeading: 'Votre message',
    signoff: 'Cordialement\nDaach Hoffmann, Holzem',
    labels: { urgency: 'Urgence', service: 'Prestation', roof: 'Type de toiture', place: 'Lieu', phone: 'Téléphone' },
  },
  en: {
    subject: 'Your enquiry with Daach Hoffmann',
    greeting: (name) => `Hello ${name},`,
    intro: 'thank you for your enquiry. We have received it — here is what reached us.',
    promise: (days) =>
      `We will get back to you within ${days === 1 ? 'one working day' : `${days} working days`}. If you would like to add anything in the meantime, just reply to this message.`,
    emergencyNote: (phone) =>
      `You marked your enquiry as an emergency. With water actively coming in, a phone call is faster than any email: ${phone}`,
    summaryHeading: 'Your details',
    messageHeading: 'Your message',
    signoff: 'Kind regards\nDaach Hoffmann, Holzem',
    labels: { urgency: 'Urgency', service: 'Service', roof: 'Roof type', place: 'Location', phone: 'Phone' },
  },
};

export function confirmationEmail(inquiry: Inquiry) {
  const locale = inquiry.locale as Locale;
  const copy = CONFIRMATION[locale];
  const days = client.responseTime.workingDays;

  const summary = [
    row(copy.labels.urgency, URGENCY_LABEL[locale][inquiry.urgency]),
    row(copy.labels.service, serviceLabel(inquiry.service, locale)),
    inquiry.roofType ? row(copy.labels.roof, ROOF_LABEL[locale][inquiry.roofType] ?? inquiry.roofType) : '',
    row(copy.labels.place, `${inquiry.postalCode} ${inquiry.locality}`),
    inquiry.phone ? row(copy.labels.phone, inquiry.phone) : '',
  ].join('');

  const html = SHELL(
    copy.subject,
    `<p style="margin:0 0 14px">${esc(copy.greeting(inquiry.name))}</p>
     <p style="margin:0 0 20px">${esc(copy.intro)}</p>
     ${inquiry.urgency === 'emergency'
       ? `<p style="margin:0 0 22px;padding:12px 16px;background:#fdecec;border-left:3px solid #b3261e;color:#8c1d18">
            ${esc(copy.emergencyNote(client.contact.phoneDisplay))}
          </p>`
       : ''}
     <h2 style="margin:24px 0 8px;font-size:15px;text-transform:uppercase;letter-spacing:.08em;color:#6b6f75">${esc(copy.summaryHeading)}</h2>
     <table style="border-collapse:collapse;font-size:15px;width:100%">${summary}</table>
     <h2 style="margin:24px 0 8px;font-size:15px;text-transform:uppercase;letter-spacing:.08em;color:#6b6f75">${esc(copy.messageHeading)}</h2>
     <p style="margin:0;white-space:pre-wrap;color:#4a4f55">${esc(inquiry.message)}</p>
     <p style="margin:26px 0 0">${esc(copy.promise(days))}</p>
     <p style="margin:26px 0 0;padding-top:16px;border-top:1px solid #e3e1dd;white-space:pre-line;font-size:14px;color:#6b6f75">
       ${esc(copy.signoff)}
       <br>${esc(client.address.street)}, ${esc(client.address.postalCode)} ${esc(client.address.locality)}
       <br>${esc(client.contact.phoneDisplay)}
     </p>`,
  );

  const text = [
    copy.greeting(inquiry.name),
    '',
    copy.intro,
    '',
    inquiry.urgency === 'emergency' ? copy.emergencyNote(client.contact.phoneDisplay) + '\n' : '',
    `${copy.labels.urgency}: ${URGENCY_LABEL[locale][inquiry.urgency]}`,
    `${copy.labels.service}: ${serviceLabel(inquiry.service, locale)}`,
    `${copy.labels.place}: ${inquiry.postalCode} ${inquiry.locality}`,
    '',
    `${copy.messageHeading}:`,
    inquiry.message,
    '',
    copy.promise(days),
    '',
    copy.signoff,
    `${client.address.street}, ${client.address.postalCode} ${client.address.locality}`,
    client.contact.phoneDisplay,
  ]
    .filter((line) => line !== '')
    .join('\n');

  return { subject: copy.subject, html, text };
}
