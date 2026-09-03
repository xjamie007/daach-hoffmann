import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { absoluteUrl, alternateLanguages } from '@/lib/site';
import { WorkMarquee } from '@/components/home/WorkMarquee';
import {
  Hero,
  EmergencyBand,
  ServicesGrid,
  AboutBlock,
  ProcessSteps,
  RoofAnatomySection,
  ServiceArea,
  ClosingCta,
} from '@/components/home/HomeSections';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Section 13.1: metadata is written per page and per language. There are no
 * shared defaults, because a shared default is how six pages end up with one
 * description and none of them ranks.
 */
const META: Record<Locale, { title: string; description: string }> = {
  de: {
    title: 'Dachdecker in Luxemburg — Daach Hoffmann, Holzem',
    description:
      'Dacheindeckung, Sanierung, Spenglerei und Notdienst 7/7 im ganzen Grossherzogtum. Kostenvoranschlag und Anfahrt im ganzen Grossherzogtum kostenlos. Jetzt anfragen.',
  },
  fr: {
    title: 'Couvreur au Luxembourg — Daach Hoffmann, Holzem',
    description:
      "Couverture, rénovation, ferblanterie et dépannage 7j/7 dans tout le Grand-Duché. Devis et déplacement gratuits dans tout le Grand-Duché. Demandez votre devis.",
  },
  en: {
    title: 'Roofing contractor in Luxembourg — Daach Hoffmann',
    description:
      'Roofing, renovation, sheet metal and seven-day emergency call-outs across Luxembourg. Free quote and free call-out across the Grand Duchy. Request a quote today.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale];

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: absoluteUrl(locale, '/'),
      languages: alternateLanguages('/'),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: absoluteUrl(locale, '/'),
      type: 'website',
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero locale={locale} />
      <EmergencyBand locale={locale} />
      <ServicesGrid locale={locale} />
      <AboutBlock locale={locale} />
      <WorkMarquee locale={locale} />
      <ProcessSteps locale={locale} />
      <RoofAnatomySection locale={locale} />
      <ServiceArea locale={locale} />
      {/* Reviews would sit here — omitted while none exist. See HomeSections. */}
      <ClosingCta locale={locale} />
    </>
  );
}
