import { client } from '~/config/client.config';
import { locales, defaultLocale, type Locale } from '@/i18n/routing';
import { getPathname } from '@/i18n/navigation';
import type { AppPathname } from '@/i18n/routing';

/**
 * Absolute origin of the production site. Canonical URLs, hreflang, the
 * sitemap and Open Graph all need it, and a relative URL is silently wrong in
 * every one of those places.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? `https://www.${client.legacy.domain}`).replace(/\/$/, '');

/** Set when the site is served from a sub-path, e.g. a GitHub Pages project site. */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

/** Path relative to the deployment root, including the base path. */
export function localePath(locale: Locale, pathname: AppPathname, params?: Record<string, string>): string {
  const resolved = getPathname({
    locale,
    // @ts-expect-error — route-agnostic helper; the union cannot be narrowed here.
    href: params ? { pathname, params } : pathname,
  });
  return `${basePath}${resolved}`;
}

/** Fully qualified URL, for canonical, hreflang, sitemap and JSON-LD. */
export function absoluteUrl(locale: Locale, pathname: AppPathname, params?: Record<string, string>): string {
  return `${siteUrl}${localePath(locale, pathname, params)}`;
}

/**
 * hreflang for every language plus x-default, as section 13.1 requires.
 *
 * x-default points at the language-selection page at the root rather than at
 * the German version: it is the only URL that serves a visitor whose language
 * we have not established.
 */
export function alternateLanguages(
  pathname: AppPathname,
  /**
   * Route params, resolved per locale. This has to be a function rather than a
   * plain object: the slug of a dynamic segment is itself translated, so the
   * German alternate of /fr/prestations/couverture is
   * /de/leistungen/dacheindeckung — passing one params object for all three
   * languages would emit three URLs that only differ in their prefix, two of
   * which do not exist.
   */
  paramsFor?: (locale: Locale) => Record<string, string>,
): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    alternates[locale] = absoluteUrl(locale, pathname, paramsFor?.(locale));
  }
  alternates['x-default'] =
    pathname === '/'
      ? `${siteUrl}${basePath}/`
      : absoluteUrl(defaultLocale, pathname, paramsFor?.(defaultLocale));
  return alternates;
}

/** `tel:` target. Never build this from a displayed number. */
export const telHref = `tel:${client.contact.phone}`;

/** WhatsApp deep link that works on both iOS and Android without an app check. */
export const whatsappHref = `https://wa.me/${client.contact.whatsapp.replace(/\D/g, '')}`;

export const mailHref = `mailto:${client.contact.email}`;
