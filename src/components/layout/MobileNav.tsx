'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { primaryNav } from './navItems';
import { client, servicesByOrder } from '~/config/client.config';
import { telHref, whatsappHref } from '@/lib/site';
import { CloseIcon, PhoneIcon, WhatsAppIcon, ArrowRightIcon } from '@/components/ui/icons';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

/**
 * Mobile navigation.
 *
 * Three destinations, in the order the header has them, with the services
 * folded inside the first. A full-screen overlay that led to another page of
 * links was a door in front of a door; six services listed flat pushed Ablauf
 * and Kontakt off the first screen. Folded, the menu shows what the site
 * contains at a glance and still reaches a specific service in two taps.
 *
 * The disclosure is a native `<details>`. It is keyboard-operable, announced
 * correctly, and works with the panel's own focus trap without a line of code
 * — where a hand-rolled one would need state, ARIA and an animation of its
 * own to reach the same place.
 *
 * The panel is rendered into document.body through a portal, and that is not a
 * stylistic choice. The header carries `backdrop-filter`, and an element with
 * a backdrop filter becomes the containing block for every `position: fixed`
 * descendant — so a panel nested inside the header is clipped to the header's
 * own 72px box instead of covering the viewport. The same trap applies to
 * `filter`, `transform`, `perspective` and `will-change`, and it is invisible
 * until someone opens the menu on a phone.
 *
 * Everything else here is the ordinary work a hand-rolled panel usually skips:
 * focus moves in on open and back to the trigger on close, Escape closes it,
 * Tab is trapped inside while it is open, the page behind cannot scroll, and
 * it closes on navigation — which matters because next-intl's client router
 * does not remount the tree.
 */
export function MobileNav() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;

      // Keep Tab inside the panel: without this the next Tab lands on the page
      // behind, which is still there and still focusable.
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const secondary = primaryNav.filter((item) => item.href !== '/leistungen');

  const panel = (
    <div
      id={panelId}
      ref={panelRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={t('a11y.mainNavigation')}
      hidden={!open}
      className="mobile-panel fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain lg:hidden"
    >
      <div className="flex min-h-[4.5rem] shrink-0 items-center justify-between px-[var(--gutter-x)]">
        <img src="/brand/logo.png" alt="" width={640} height={389} className="h-9 w-auto" />
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            triggerRef.current?.focus();
          }}
          className="-mr-2 inline-flex size-12 items-center justify-center rounded-sm text-ink transition-colors duration-fast ease-out hover:bg-navy-900/8"
        >
          <CloseIcon className="size-6" />
          <span className="sr-only">{t('a11y.closeMenu')}</span>
        </button>
      </div>

      <nav
        aria-label={t('a11y.mainNavigation')}
        className="flex flex-1 flex-col px-[var(--gutter-x)] pt-3"
      >
        <ul className="flex flex-col">
          <li className="panel-row" style={{ '--i': 0 } as React.CSSProperties}>
            <details className="panel-fold border-b border-border">
              <summary className="flex min-h-15 cursor-pointer items-center justify-between gap-4 marker:content-none">
                <span className="font-heading text-h3 font-bold">{t('nav.services')}</span>
                <span aria-hidden="true" className="panel-fold__mark shrink-0 text-ink-subtle">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>

              <ul className="pb-4">
                {servicesByOrder.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={{
                        pathname: '/leistungen/[service]',
                        params: { service: service.slug[locale] },
                      }}
                      className="group flex min-h-12 items-center justify-between gap-4 border-t border-border/70 no-underline"
                    >
                      <span
                        className={[
                          'font-heading text-body font-semibold',
                          service.isEmergency ? 'text-red-700' : 'text-ink-muted',
                        ].join(' ')}
                      >
                        {service.name[locale]}
                      </span>
                      <ArrowRightIcon className="size-4 shrink-0 text-ink-subtle transition-transform duration-fast ease-out group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/leistungen"
                    className="link-underline flex min-h-11 w-fit items-center text-small font-medium text-accent-text no-underline"
                  >
                    {t('actions.allServices')}
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          {secondary.map((item, index) => (
            <li
              key={item.href}
              className="panel-row"
              style={{ '--i': index + 1 } as React.CSSProperties}
            >
              <Link
                href={item.href}
                className="group flex min-h-15 items-center justify-between gap-4 border-b border-border no-underline"
              >
                <span className="font-heading text-h3 font-bold">{t(item.labelKey)}</span>
                <ArrowRightIcon className="size-5 shrink-0 text-ink-subtle transition-transform duration-fast ease-out group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3 py-8">
          <a
            href={telHref}
            className="flex min-h-14 items-center justify-center gap-3 rounded-sm bg-accent px-5 font-heading text-h4 font-bold text-on-accent no-underline"
          >
            <PhoneIcon className="size-5" />
            {client.contact.phoneDisplay}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 items-center justify-center gap-3 rounded-sm border border-border-strong px-5 font-heading font-semibold text-ink no-underline"
          >
            <WhatsAppIcon className="size-5" />
            {t('actions.whatsapp')}
          </a>

          <div className="mt-2 flex items-center justify-between border-t border-border pt-5">
            <span className="text-small text-ink-muted">{t('a11y.languageSwitcher')}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {/*
        Labelled rather than a bare icon. Three bars mean "menu" to people who
        already know; the word costs 40 pixels and means it to everyone. The
        bars morph into a cross on open, so the button says what it will do.
      */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="menu-trigger -mr-1 inline-flex min-h-11 items-center gap-2.5 rounded-sm px-2 text-ink transition-colors duration-fast ease-out hover:bg-navy-900/8 lg:hidden"
        data-open={open || undefined}
      >
        <span aria-hidden="true" className="menu-bars">
          <span />
          <span />
        </span>
        <span className="font-heading text-small font-semibold">{t('a11y.menu')}</span>
        <span className="sr-only">{open ? t('a11y.closeMenu') : t('a11y.openMenu')}</span>
      </button>

      {/* Portalled to the body: see the note at the top of this file. */}
      {mounted ? createPortal(panel, document.body) : null}
    </>
  );
}
