import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware navigation primitives. Always import `Link` from here rather
 * than from `next/link`: this one resolves translated pathnames, so a single
 * `<Link href="/leistungen/[service]">` renders the right slug in every
 * language.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
