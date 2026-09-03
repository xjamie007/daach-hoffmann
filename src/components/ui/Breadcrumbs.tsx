import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Crumb } from '@/lib/schema';

/**
 * A real breadcrumb component with real links.
 *
 * The incumbent site fakes one with a heading that reads
 * "DAACH HOFFMANN LUXEMBOURG >> ACCUEIL" — an H1 containing a >> character,
 * with nothing to click and no relationship to the document outline
 * (section 3.2). This is a nav landmark with an ordered list, and the matching
 * BreadcrumbList schema is emitted alongside it by the page.
 */
export async function Breadcrumbs({
  crumbs,
  current,
}: {
  readonly crumbs: readonly Crumb[];
  readonly current: string;
}) {
  const t = await getTranslations('a11y');

  return (
    <nav aria-label={t('breadcrumb')} className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-ink-muted">
        {crumbs.map((crumb) => (
          <li key={crumb.pathname + (crumb.params ? JSON.stringify(crumb.params) : '')} className="flex items-center gap-2">
            <Link
              /*
                Link's href is a discriminated union per route: static
                pathnames on their own, dynamic ones only together with their
                params. A breadcrumb is route-agnostic by design and cannot
                narrow that union, so the shape is asserted once here rather
                than pushing the cast onto every caller.
              */
              href={
                (crumb.params
                  ? { pathname: crumb.pathname, params: crumb.params }
                  : crumb.pathname) as Parameters<typeof Link>[0]['href']
              }
              className="link-underline inline-flex min-h-7 items-center no-underline hover:text-accent-text"
            >
              {crumb.name}
            </Link>
            <span aria-hidden="true" className="text-ink-subtle">
              /
            </span>
          </li>
        ))}
        <li aria-current="page" className="text-ink">
          {current}
        </li>
      </ol>
    </nav>
  );
}
