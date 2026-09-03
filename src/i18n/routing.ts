import { defineRouting } from 'next-intl/routing';

export const locales = ['de', 'fr', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = 'de' satisfies Locale;

/**
 * Slugs are translated, not just content — a French visitor gets
 * /fr/prestations/couverture, never /fr/leistungen/dacheindeckung.
 *
 * Dynamic segments carry translated values too; the mapping from a canonical
 * service or project id to its per-locale slug lives in src/content, so this
 * file only describes the shape of the path.
 *
 * Adding Luxembourgish later means adding 'lb' to `locales` and one column to
 * every entry below. Nothing else in the app needs to change.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  // The prefix is always present, including for German. A URL should never be
  // ambiguous about which language it serves.
  localePrefix: 'always',
  // Locale detection needs middleware, which a static export cannot run.
  // src/app/page.tsx performs the first-visit detection on the client instead
  // and stores the choice in a cookie; the visible switcher is always present.
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/leistungen': {
      de: '/leistungen',
      fr: '/prestations',
      en: '/services',
    },
    '/leistungen/[service]': {
      de: '/leistungen/[service]',
      fr: '/prestations/[service]',
      en: '/services/[service]',
    },
    '/ablauf': {
      de: '/ablauf',
      fr: '/deroulement',
      en: '/how-it-works',
    },
    '/kontakt': {
      de: '/kontakt',
      fr: '/contact',
      en: '/contact',
    },
    '/impressum': {
      de: '/impressum',
      fr: '/mentions-legales',
      en: '/legal-notice',
    },
    '/datenschutz': {
      de: '/datenschutz',
      fr: '/protection-des-donnees',
      en: '/privacy',
    },
    '/styleguide': {
      de: '/styleguide',
      fr: '/styleguide',
      en: '/styleguide',
    },
  },
});

export type AppPathname = keyof typeof routing.pathnames;
