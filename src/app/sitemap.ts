import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/routing';
import { routes } from '@/routes/registry';
import { absoluteUrl, siteUrl, basePath } from '@/lib/site';

/**
 * Sitemap, section 13.3.
 *
 * Built from the same route registry that generates the pages, so it cannot
 * list a URL that does not exist or omit one that does — the usual failure of
 * a hand-maintained sitemap.
 *
 * Every entry carries its alternates, which is how a multilingual sitemap
 * tells Google that three URLs are one page in three languages rather than
 * three competing pages.
 *
 * The styleguide is absent because it is not in the registry, and the legacy
 * redirect documents are absent because they are not pages.
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  // The language gateway. x-default points here, so it belongs in the sitemap.
  entries.push({
    url: `${siteUrl}${basePath}/`,
    lastModified,
    changeFrequency: 'yearly',
    priority: 0.5,
  });

  for (const locale of locales) {
    entries.push({
      url: absoluteUrl(locale, '/'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, absoluteUrl(l, '/')])),
      },
    });

    entries.push({
      url: absoluteUrl(locale, '/kontakt'),
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, absoluteUrl(l, '/kontakt')])),
      },
    });
  }

  for (const route of routes) {
    /*
      Alternates are resolved per locale by looking up the sibling route of the
      same kind and parameter. A service slug is translated, so the German
      alternate of /fr/prestations/couverture is /de/leistungen/dacheindeckung —
      taking the same path with a different prefix would list URLs that 404.
    */
    const siblings = routes.filter((other) => other.kind === route.kind && other.param === route.param);

    entries.push({
      url: `${siteUrl}${basePath}/${route.locale}/${route.segments.join('/')}/`,
      lastModified,
      changeFrequency: route.kind === 'service' ? 'monthly' : 'yearly',
      priority: route.kind === 'service' ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          siblings.map((sibling) => [
            sibling.locale,
            `${siteUrl}${basePath}/${sibling.locale}/${sibling.segments.join('/')}/`,
          ]),
        ),
      },
    });
  }

  return entries;
}
