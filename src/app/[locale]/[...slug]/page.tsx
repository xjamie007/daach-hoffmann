import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { staticParams, resolveRoute } from '@/routes/registry';
import { absoluteUrl, alternateLanguages } from '@/lib/site';
import { getService, type ServiceId } from '~/config/client.config';
import { getServiceContent, servicesOverview } from '@/content/services';
import { ServicesIndex } from '@/views/ServicesIndex';
import { ServiceDetail } from '@/views/ServiceDetail';
import { ProcessPage } from '@/views/ArticlePages';
import { LegalNoticePage, PrivacyPage } from '@/views/LegalPages';
import { processPage } from '@/content/pages/process';
import { legalNotice, privacyPolicy } from '@/content/pages/legal';
import type { AppPathname } from '@/i18n/routing';

/** Metadata source and canonical pathname for each single-segment page. */
const SIMPLE_PAGES = {
  process: { meta: processPage.meta, pathname: '/ablauf' },
  legal: { meta: legalNotice.meta, pathname: '/impressum' },
  privacy: { meta: privacyPolicy.meta, pathname: '/datenschutz' },
} as const satisfies Record<string, { meta: Record<Locale, { title: string; description: string }>; pathname: AppPathname }>;

/**
 * Every page except the home page and the styleguide.
 *
 * A catch-all rather than one folder per page, because the app directory can
 * hold exactly one folder name per segment and this site needs three — one per
 * language. Section 8 requires translated slugs, and next-intl delivers them by
 * rewriting in middleware, which a static export cannot run. See
 * src/routes/registry.ts.
 *
 * Static routes still win over this one, so /de/styleguide keeps its own file.
 */
export function generateStaticParams() {
  return staticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const route = resolveRoute(locale, slug);
  if (!route) return {};

  if (route.kind === 'services-index') {
    const meta = servicesOverview.meta[locale];
    return {
      title: meta.title,
      description: meta.description,
      alternates: {
        canonical: absoluteUrl(locale, '/leistungen'),
        languages: alternateLanguages('/leistungen'),
      },
      openGraph: { title: meta.title, description: meta.description, type: 'website' },
    };
  }

  if (route.kind in SIMPLE_PAGES) {
    const page = SIMPLE_PAGES[route.kind as keyof typeof SIMPLE_PAGES];
    const meta = page.meta[locale];
    return {
      title: meta.title,
      description: meta.description,
      alternates: {
        canonical: absoluteUrl(locale, page.pathname),
        languages: alternateLanguages(page.pathname),
      },
      openGraph: { title: meta.title, description: meta.description, type: 'website' },
      // The legal pages carry no ranking value and should not compete with the
      // service pages in the index, but they must remain crawlable — the law
      // requires them to be reachable, and a noindex would be read as hiding.
      robots: route.kind === 'legal' || route.kind === 'privacy'
        ? { index: true, follow: true }
        : undefined,
    };
  }

  const service = getService(route.param as ServiceId);
  const content = getServiceContent(route.param as ServiceId);
  if (!content) return {};
  const meta = content.meta[locale];

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: absoluteUrl(locale, '/leistungen/[service]', { service: service.slug[locale] }),
      // Each language points at its own translated slug for the same service.
      languages: alternateLanguages('/leistungen/[service]', (target) => ({
        service: service.slug[target],
      })),
    },
    openGraph: { title: meta.title, description: meta.description, type: 'article' },
  };
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const route = resolveRoute(locale, slug);
  if (!route) notFound();

  switch (route.kind) {
    case 'services-index':
      return <ServicesIndex locale={locale} />;

    case 'process':
      return <ProcessPage locale={locale} />;

    case 'legal':
      return <LegalNoticePage locale={locale} />;

    case 'privacy':
      return <PrivacyPage locale={locale} />;

    case 'service': {
      const serviceId = route.param as ServiceId;
      const content = getServiceContent(serviceId);
      // A service declared in the config without content would otherwise
      // render an empty page. Better a build-time 404 than a live blank.
      if (!content) notFound();
      return <ServiceDetail locale={locale} serviceId={serviceId} content={content} />;
    }
  }
}
