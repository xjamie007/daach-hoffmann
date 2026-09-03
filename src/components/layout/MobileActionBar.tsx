import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { telHref, whatsappHref } from '@/lib/site';
import { client } from '~/config/client.config';
import { PhoneIcon, WhatsAppIcon, FormIcon } from '@/components/ui/icons';

/**
 * The single most important conversion measure in this project (section 12.3).
 *
 * It is deliberately always visible rather than revealed on scroll: a visitor
 * whose roof is leaking should never have to discover a control. There is no
 * scroll listener, no JavaScript and no hydration cost — it is three links.
 *
 * The layout reserves matching bottom padding on <main>, so the bar covers no
 * content, including the closing call to action of every page.
 */
export async function MobileActionBar() {
  const t = await getTranslations();

  return (
    <div
      role="group"
      aria-label={t('a11y.quickActions')}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border-inverse bg-navy-900/97 pb-[env(safe-area-inset-bottom)] shadow-bar backdrop-blur-sm md:hidden"
    >
      <div className="grid grid-cols-3">
        <a
          href={telHref}
          className="flex min-h-14 flex-col items-center justify-center gap-1 border-r border-border-inverse px-2 py-2 font-heading text-micro font-semibold tracking-[0.06em] text-clay-50 uppercase no-underline active:bg-navy-800"
        >
          <PhoneIcon className="size-5" />
          {t('actions.call')}
          <span className="sr-only">{client.contact.phoneDisplay}</span>
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 flex-col items-center justify-center gap-1 border-r border-border-inverse px-2 py-2 font-heading text-micro font-semibold tracking-[0.06em] text-clay-50 uppercase no-underline active:bg-navy-800"
        >
          <WhatsAppIcon className="size-5" />
          {t('actions.whatsapp')}
        </a>
        <Link
          href="/kontakt"
          className="flex min-h-14 flex-col items-center justify-center gap-1 bg-accent px-2 py-2 font-heading text-micro font-semibold tracking-[0.06em] text-on-accent uppercase no-underline active:bg-accent-hover"
        >
          <FormIcon className="size-5" />
          {/* Short label on purpose: three columns on a 360px screen leave
              about 110px each, and "Anfrage stellen" wraps to two lines and
              pushes the bar taller than the thumb reach it was sized for. */}
          {t('actions.requestShort')}
        </Link>
      </div>
    </div>
  );
}
