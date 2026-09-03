import type { Locale, AppPathname } from '@/i18n/routing';
import { client } from '~/config/client.config';
import { absoluteUrl, siteUrl } from '@/lib/site';

/**
 * Structured data, section 13.2.
 *
 * The incumbent site carries none at all, which is why it has no chance of a
 * rich result in local search. Everything emitted here has to be true: Google's
 * structured-data policy treats markup that contradicts the visible page as
 * spam, and unlike a paragraph of copy, a wrong `foundingDate` in JSON-LD is
 * invisible to everyone except the crawler.
 *
 * So every field the client has not confirmed is omitted rather than guessed.
 * `priceRange`, `openingHours`, `foundingDate` and `sameAs` will appear here
 * the day section 19 is answered, and not before.
 */

type Json = Record<string, unknown>;

/** Drops keys whose value is null, undefined or an empty array. */
function compact(object: Json): Json {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => {
      if (value === null || value === undefined) return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    }),
  );
}

export const ORGANISATION_ID = `${siteUrl}/#business`;

/**
 * RoofingContractor is a subtype of LocalBusiness and the most specific type
 * schema.org offers for this trade — worth using over the generic parent,
 * because it is what tells a local search result what the business actually is.
 */
export function organisationSchema(locale: Locale): Json {
  return compact({
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    '@id': ORGANISATION_ID,
    name: client.name,
    legalName: client.legal.rcs ? client.legalName : null,
    url: absoluteUrl(locale, '/'),
    telephone: client.contact.phone,
    email: client.contact.email,
    foundingDate: client.founded ? String(client.founded) : null,
    address: {
      '@type': 'PostalAddress',
      streetAddress: client.address.street,
      postalCode: client.address.postalCode,
      addressLocality: client.address.locality,
      addressCountry: client.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: client.address.geo.lat,
      longitude: client.address.geo.lng,
    },
    areaServed: [
      { '@type': 'Country', name: 'Luxembourg' },
      ...client.serviceAreas.map((area) => ({ '@type': 'AdministrativeArea', name: area.name })),
    ],
    /* Advertised on the existing site, so this is the business's own claim. */
    openingHoursSpecification: client.emergency.available
      ? [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            description: 'Emergency call-out',
          },
        ]
      : null,
    sameAs: client.sameAs.length > 0 ? [...client.sameAs] : null,
    vatID: client.legal.vat,
    inLanguage: [...client.locales],
  });
}

export function serviceSchema({
  locale,
  name,
  description,
  url,
}: {
  readonly locale: Locale;
  readonly name: string;
  readonly description: string;
  readonly url: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    serviceType: name,
    provider: { '@id': ORGANISATION_ID },
    areaServed: { '@type': 'Country', name: 'Luxembourg' },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: absoluteUrl(locale, '/kontakt'),
      servicePhone: { '@type': 'ContactPoint', telephone: client.contact.phone },
    },
  };
}

export function faqSchema(entries: readonly { question: string; answer: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };
}

export interface Crumb {
  readonly name: string;
  readonly pathname: AppPathname;
  readonly params?: Record<string, string>;
}

export function breadcrumbSchema(locale: Locale, crumbs: readonly Crumb[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(locale, crumb.pathname, crumb.params),
    })),
  };
}

/**
 * Renders JSON-LD.
 *
 * `JSON.stringify` escapes nothing that matters inside a script element except
 * `</script>`, which cannot appear in this data — but the replacement costs
 * nothing and removes the question.
 */
export function JsonLd({ data }: { readonly data: Json | readonly Json[] }) {
  const payload = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: payload }} />;
}
