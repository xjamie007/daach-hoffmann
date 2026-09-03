import type { MetadataRoute } from 'next';
import { siteUrl, basePath, noindex } from '@/lib/site';

/**
 * robots.txt, section 13.3.
 *
 * Everything is crawlable except the internal styleguide, which is a component
 * reference and would only compete with real pages for attention. The sitemap
 * is linked, which is the one line in this file that actually does work.
 */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  /*
    On the Pages preview, everything is disallowed and no sitemap is advertised
    — a sitemap next to a blanket Disallow is a contradiction crawlers resolve
    in the direction nobody wants. See `noindex` in src/lib/site.ts for why the
    preview must not be indexed.
  */
  if (noindex) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
      host: siteUrl,
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/de/styleguide/', '/fr/styleguide/', '/en/styleguide/'],
      },
    ],
    sitemap: `${siteUrl}${basePath}/sitemap.xml`,
    host: siteUrl,
  };
}
