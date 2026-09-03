import type { AppPathname } from '@/i18n/routing';

/**
 * Routes that need no parameters. Excluding the dynamic ones at the type level
 * means a link cannot silently render "/leistungen/[service]" as a literal —
 * which is exactly the kind of mistake that ships and 404s in one language
 * only.
 */
export type StaticPathname = Exclude<AppPathname, `${string}[${string}`>;

/**
 * Primary navigation.
 *
 * Five destinations plus the VAT page. There is deliberately no services
 * mega-menu: the overview page already lists all six services with a line of
 * real copy each, and a hover menu would add JavaScript, a keyboard trap risk
 * and a mobile fallback for no gain on a site this size.
 *
 */
export interface NavItem {
  readonly href: StaticPathname;
  readonly labelKey: string;
}

export const primaryNav: readonly NavItem[] = [
  { href: '/leistungen', labelKey: 'nav.services' },
  { href: '/ablauf', labelKey: 'nav.process' },
  { href: '/kontakt', labelKey: 'nav.contact' },
];
