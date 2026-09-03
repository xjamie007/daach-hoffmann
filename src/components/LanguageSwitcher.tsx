'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/routing';
import { rememberLocale } from '@/lib/locale';
import { servicesByOrder } from '~/config/client.config';

const LABELS: Record<Locale, { full: string; short: string }> = {
  de: { full: 'Deutsch', short: 'DE' },
  fr: { full: 'Français', short: 'FR' },
  en: { full: 'English', short: 'EN' },
};

/**
 * Always visible, never the only way a language is chosen.
 *
 * Switching preserves the current page: the internal pathname is the same in
 * every language, so `/de/leistungen/dacheindeckung` becomes
 * `/fr/prestations/couverture` rather than dropping the visitor on the home
 * page — which is the usual failure of trade-site language switchers and the
 * reason people give up and leave.
 */
export function LanguageSwitcher({ className }: { readonly className?: string }) {
  const t = useTranslations('a11y');
  const active = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  /*
    Dynamic segments have to be re-resolved, not passed through.

    Every page except the home page and the styleguide is served by one
    catch-all, `/[locale]/[...slug]`, because a static export runs no
    middleware and the app directory cannot hold three folder names for one
    segment (see src/routes/registry.ts). So `useParams()` on a service page
    returns `{ locale, slug: ['leistungen', 'dacheindeckung'] }` — there is no
    `service` key, because no route declares one.

    `usePathname()` still correctly reports the internal pathname
    `/leistungen/[service]`. Handing that to the router together with params
    that contain no `service` left the placeholder unsubstituted, and the
    switcher navigated to the literal `/fr/prestations/[service]`: a 404 in
    production, and silently nothing at all in dev. The home page worked,
    which is what made it look like a translation problem rather than a
    routing one.

    So the current locale's slug is mapped back to its service and forward to
    the target locale's slug. `servicesByOrder` is already in this bundle for
    the mobile menu, so this costs no bytes on a page with a 120 KB budget.
  */
  function paramsFor(next: Locale): Record<string, string | string[]> {
    const slug = params.slug;
    const segments = Array.isArray(slug) ? slug : slug ? [slug] : [];
    const last = segments[segments.length - 1];

    if (pathname === '/leistungen/[service]' && last) {
      const service = servicesByOrder.find((entry) => entry.slug[active] === last);
      // No match means the URL is not one this build produced. Falling through
      // with the raw params would navigate to a placeholder; better to send
      // the visitor to the same page in their language than to a 404.
      if (service) return { service: service.slug[next] };
    }

    return params as Record<string, string | string[]>;
  }

  function switchTo(next: Locale) {
    if (next === active) return;
    rememberLocale(next);
    /*
      No useTransition here. It was only ever feeding a `data-busy` attribute
      that no rule styled, so it bought a pending state nobody could see and
      cost bytes on a page with a 120 KB budget.
    */
    router.replace(
      // @ts-expect-error — `params` is correctly typed per route, but this
      // component is route-agnostic by design and cannot narrow the union.
      { pathname, params: paramsFor(next) },
      { locale: next },
    );
  }

  return (
    <nav aria-label={t('languageSwitcher')} className={className}>
      <ul className="flex items-center gap-0.5">
        {locales.map((locale) => {
          const isActive = locale === active;
          return (
            <li key={locale}>
              <button
                type="button"
                lang={locale}
                onClick={() => switchTo(locale)}
                aria-current={isActive ? 'true' : undefined}
                className={[
                  'rounded-sm px-2 py-1.5 font-heading text-micro font-semibold tracking-[0.08em] uppercase transition-colors',
                  'duration-fast ease-out',
                  isActive
                    ? 'bg-navy-900 text-clay-50'
                    : 'text-ink-muted hover:bg-navy-900/8 hover:text-ink',
                ].join(' ')}
              >
                <span aria-hidden="true">{LABELS[locale].short}</span>
                <span className="sr-only">
                  {LABELS[locale].full}
                  {isActive ? ` (${t('currentLanguage')})` : ''}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
