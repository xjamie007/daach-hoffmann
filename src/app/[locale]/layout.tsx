import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { routing, type Locale } from '@/i18n/routing';
import { fontHeading, fontBody } from '@/styles/fonts';
import { siteUrl, alternateLanguages, absoluteUrl } from '@/lib/site';
import { client } from '~/config/client.config';
import { JsonLd, organisationSchema } from '@/lib/schema';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { MobileActionBar } from '@/components/layout/MobileActionBar';
import { RevealRoot } from '@/components/motion/RevealRoot';

import '@/styles/globals.css';

/** Every locale is pre-rendered; there is no runtime to resolve one lazily. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${t('siteName')} — ${t('tagline')}`,
      // Section 13.1: the business name is the constant tail of every title.
      template: `%s | ${t('siteName')}`,
    },
    alternates: {
      canonical: absoluteUrl(locale, '/'),
      languages: alternateLanguages('/'),
    },
    openGraph: {
      siteName: t('siteName'),
      locale,
      type: 'website',
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', sizes: '32x32' },
      ],
      apple: '/apple-touch-icon.png',
    },
    other: { 'theme-color': client.brand.themeColor },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Required for static rendering: without it every page using translations
  // opts into dynamic rendering and the export step fails.
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'a11y' });

  return (
    <html lang={locale} className={`${fontHeading.variable} ${fontBody.variable}`}>
      <body className="page-shell min-h-dvh text-ink antialiased">
        {/*
          RoofingContractor, emitted once per page. Section 13.2 asks for it
          globally, and it is the markup that decides whether this business can
          appear as a local result at all. Every page's own Service, FAQPage or
          BreadcrumbList references it by @id rather than repeating it.
        */}
        <JsonLd data={organisationSchema(locale as Locale)} />

        <NextIntlClientProvider>
          <div aria-hidden="true" className="scroll-progress" />
          <a href="#main" className="skip-link">
            {t('skipToContent')}
          </a>
          <SiteHeader />
          {/*
            The bottom action bar overlaps the last section on phones. The
            padding is reserved here rather than on each page so that no page
            can forget it and bury its own closing call to action.
          */}
          <main id="main" tabIndex={-1} className="pb-[calc(env(safe-area-inset-bottom)+4.5rem)] md:pb-0">
            {children}
          </main>
          <SiteFooter locale={locale as Locale} />
          <MobileActionBar />
          <RevealRoot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
