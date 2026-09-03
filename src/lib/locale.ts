import type { Locale } from '@/i18n/routing';
import { locales, defaultLocale } from '@/i18n/routing';

/**
 * Name of the cookie that remembers a visitor's language choice.
 *
 * Section 8 asks for Accept-Language on the first visit and a cookie
 * afterwards. On a static host there is no middleware to read the header
 * server-side, so the detection runs once in public/index.html and writes the
 * result here; every later visit to `/` reads it and skips detection.
 *
 * The name matches next-intl's convention so that moving to a server target
 * later requires no migration of anyone's stored preference.
 */
export const LOCALE_COOKIE = 'NEXT_LOCALE';

/** One year. A language preference is not a session-scoped fact. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export function asLocale(value: unknown): Locale {
  return isLocale(value) ? value : defaultLocale;
}

/**
 * Writes the preference without any third-party storage. `SameSite=Lax` keeps
 * it out of cross-site requests; it holds a two-letter language code and
 * nothing else, so it is strictly necessary for a multilingual site and needs
 * no consent banner.
 */
export function rememberLocale(locale: Locale): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
}
