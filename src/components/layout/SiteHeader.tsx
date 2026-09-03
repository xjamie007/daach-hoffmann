import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { primaryNav } from './navItems';
import { Wordmark } from '@/components/brand/Wordmark';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { MobileNav } from './MobileNav';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { telHref } from '@/lib/site';
import { client } from '~/config/client.config';
import { PhoneIcon } from '@/components/ui/icons';

/**
 * The header carries the phone number on desktop and hands the job to the
 * bottom action bar on phones. Section 5.2 requires both the primary action
 * (make an enquiry) and the equally visible secondary one (call) to be
 * reachable within the first screen, in every language.
 */
export async function SiteHeader() {
  const t = await getTranslations();

  return (
    <header
      // The custom property is read by the mobile panel so it opens flush
      // under the bar rather than guessing at a magic number.
      style={{ '--header-height': '4.5rem' } as React.CSSProperties}
      className="site-bar sticky top-0 z-50 border-b border-border bg-surface/92 backdrop-blur-md"
    >
      {/* The height animates on the container rather than the sticky element:
          animating a sticky ancestor's own height fights its stuck position on
          some engines and produces a one-frame jump at the threshold. */}
      <Container
        width="wide"
        className="site-header flex h-[var(--header-height)] items-center justify-between gap-6"
      >
        <Link href="/" className="shrink-0 no-underline" aria-label={t('meta.siteName')}>
          <Wordmark className="site-header__mark h-10 origin-left sm:h-11" />
        </Link>

        {/*
          A rail rather than a row of loose links. Three destinations spread
          across a 1440px bar read as three stray words; grouped on one tinted
          rail they read as navigation, and each item has a shape to respond
          with when the pointer arrives.
        */}
        <nav aria-label={t('a11y.mainNavigation')} className="hidden lg:block">
          <ul className="nav-rail flex items-center gap-0.5">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link">
                  <span className="nav-link__dot" aria-hidden="true" />
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          <LanguageSwitcher className="hidden sm:block" />

          <span aria-hidden="true" className="hidden h-6 w-px bg-border xl:block" />

          <a
            href={telHref}
            className="link-underline hidden items-center gap-2 px-1 py-2 font-heading text-small font-semibold whitespace-nowrap text-ink no-underline transition-colors duration-fast ease-out hover:text-accent-text xl:inline-flex"
          >
            <PhoneIcon className="size-4 text-accent-text" />
            {client.contact.phoneDisplay}
          </a>

          {/*
            Wrapped rather than given `hidden lg:inline-flex` directly. Button's
            own base classes set `inline-flex`, and two utilities that set the
            same property have equal specificity — the winner is decided by
            their order in the generated stylesheet, not by the order they are
            written in the class attribute. Hiding via a wrapper is the only
            form of this that cannot silently flip. On phones the bottom action
            bar carries this action anyway.
          */}
          <div className="hidden lg:block">
            <Button as="link" href="/kontakt" size="sm">
              {t('actions.requestQuote')}
            </Button>
          </div>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
