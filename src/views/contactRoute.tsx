import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { absoluteUrl, alternateLanguages } from '@/lib/site';
import { ContactPage } from '@/views/ContactPage';

/**
 * Shared implementation for the contact route.
 *
 * The contact page gets real route folders instead of going through the
 * catch-all, and the reason is bundle scope: Next splits JavaScript per route,
 * not per generated path. Inside the catch-all, the enquiry form's 33 KB would
 * be loaded by every service page too — pages that never render it.
 *
 * Two folders cover all three languages, because French and English both use
 * "contact" and only German differs.
 */
const META: Record<Locale, { title: string; description: string }> = {
  de: {
    title: 'Kontakt & Anfrage — Daach Hoffmann, Holzem',
    description:
      'Anfrage mit Fotos, oder direkt per Telefon, WhatsApp und E-Mail. Kostenvoranschlag und Anfahrt kostenlos im ganzen Grossherzogtum, Notdienst 7 Tage die Woche.',
  },
  fr: {
    title: 'Contact & demande de devis — Daach Hoffmann, Holzem',
    description:
      "Demande avec photos, ou directement par téléphone, WhatsApp et e-mail. Devis et déplacement gratuits dans tout le Grand-Duché, dépannage 7 jours sur 7.",
  },
  en: {
    title: 'Contact & enquiry — Daach Hoffmann, Holzem',
    description:
      'Send an enquiry with photos, or reach us straight away by phone, WhatsApp or email. Free quote and call-out across Luxembourg, emergency service seven days a week.',
  },
};

export async function contactMetadata(locale: Locale): Promise<Metadata> {
  const meta = META[locale];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: absoluteUrl(locale, '/kontakt'),
      languages: alternateLanguages('/kontakt'),
    },
    openGraph: { title: meta.title, description: meta.description, type: 'website' },
  };
}

export async function renderContact(locale: Locale) {
  setRequestLocale(locale);
  return <ContactPage locale={locale} />;
}
