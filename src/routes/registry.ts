import { locales, type Locale, type AppPathname } from '@/i18n/routing';
import { getPathname } from '@/i18n/navigation';
import { client } from '~/config/client.config';
import { getServiceContent } from '@/content/services';

/**
 * Every URL this site publishes, enumerated.
 *
 * Why this exists at all: next-intl translates slugs by rewriting requests in
 * middleware, and a static export runs no middleware. `/fr/prestations/couverture`
 * would resolve to nothing, because Next has no file route at that path — the
 * app directory can only hold one folder name per segment, and this site needs
 * three.
 *
 * So the routes are generated here instead and served by a single catch-all.
 * `getPathname` stays the one source of truth for what a URL looks like, which
 * keeps every <Link> and every generated page in step by construction: a link
 * cannot point somewhere the build did not produce.
 *
 * Adding a page means adding its kind here and a branch in the dispatcher.
 * Adding a language means nothing at all.
 */

export type PageKind =
  | 'services-index'
  | 'service'
  | 'process'
  | 'legal'
  | 'privacy'
;

export interface Route {
  readonly locale: Locale;
  /** Path segments after the locale prefix, e.g. ['prestations', 'couverture']. */
  readonly segments: readonly string[];
  readonly kind: PageKind;
  /** Canonical, language-independent id of the thing being shown. */
  readonly param?: string;
  /** The internal pathname, for hreflang and canonical generation. */
  readonly pathname: AppPathname;
}

/** Strips the locale prefix that getPathname adds, leaving bare segments. */
function toSegments(locale: Locale, pathname: AppPathname, params?: Record<string, string>): string[] {
  const full = getPathname({
    locale,
    // @ts-expect-error — registry is route-agnostic; the union cannot narrow here.
    href: params ? { pathname, params } : pathname,
  });
  return full.replace(new RegExp(`^/${locale}/?`), '').split('/').filter(Boolean);
}

function buildRoutes(): Route[] {
  const routes: Route[] = [];

  for (const locale of locales) {
    routes.push({
      locale,
      segments: toSegments(locale, '/leistungen'),
      kind: 'services-index',
      pathname: '/leistungen',
    });

    for (const service of client.services) {
      // A service declared in the config but not yet written is not a page.
      // Registering it anyway would publish an empty URL and put it in the
      // sitemap, which is worse than the link 404-ing during development.
      if (!getServiceContent(service.id)) continue;

      routes.push({
        locale,
        segments: toSegments(locale, '/leistungen/[service]', { service: service.slug[locale] }),
        kind: 'service',
        param: service.id,
        pathname: '/leistungen/[service]',
      });
    }

    /* Static content pages. Each has one segment per language. */
    const simple: ReadonlyArray<[PageKind, AppPathname]> = [
      ['process', '/ablauf'],
      ['legal', '/impressum'],
      ['privacy', '/datenschutz'],
    ];
    for (const [kind, pathname] of simple) {
      routes.push({ locale, segments: toSegments(locale, pathname), kind, pathname });
    }

    /*
      /kontakt is deliberately absent. It has its own route folders so that the
      enquiry form's JavaScript is scoped to it — inside the catch-all, every
      service page would carry the form bundle too. See src/views/contactRoute.
    */
  }

  return routes;
}

export const routes: readonly Route[] = buildRoutes();

/** Params for generateStaticParams on the catch-all. */
export function staticParams(): { locale: Locale; slug: string[] }[] {
  return routes.map((route) => ({ locale: route.locale, slug: [...route.segments] }));
}

/** Resolves an incoming path back to the page it describes. */
export function resolveRoute(locale: Locale, slug: readonly string[]): Route | undefined {
  const key = slug.join('/');
  return routes.find((route) => route.locale === locale && route.segments.join('/') === key);
}
