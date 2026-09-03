import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';
import { Wordmark } from '@/components/brand/Wordmark';
import { Pending } from '@/components/Pending';
import { PhoneIcon, WhatsAppIcon, MailIcon } from '@/components/ui/icons';
import { client, servicesByOrder } from '~/config/client.config';
import { telHref, mailHref, whatsappHref } from '@/lib/site';

/**
 * Footer.
 *
 * Rebuilt tighter: the previous version spread four columns across the full
 * width, one of them a list of ten municipalities, and the result read as a
 * sitemap rather than as the end of a page. Now it is contact on the left and
 * two narrow link columns on the right, inside the reading measure rather than
 * stretched to the viewport.
 *
 * Two things here are corrections of findings in the audit and stay whatever
 * else changes: Mentions légales and the privacy policy are reachable from
 * every page — the incumbent site has neither while running a contact form —
 * and every service is linked, including "Cheminée de Toit", which the old
 * footer alone among the six left unlinked.
 */
export async function SiteFooter({ locale }: { readonly locale: Locale }) {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="plane plane-dark bg-surface-inverse text-ink-inverse">
      {/* The roof line, drawn once across the top edge. The same pitch as the
          mark in the logo, so the page closes on the shape it opened with. */}
      <div aria-hidden="true" className="roofline-divider" />

      <Container width="content" className="py-[var(--section-y-tight)]">
        <div className="grid gap-x-16 gap-y-10 md:grid-cols-[1.25fr_1fr]">
          {/* ---- Contact ------------------------------------------------ */}
          <div>
            <Wordmark tone="inverse" className="h-12" />

            <address className="mt-7 flex flex-col gap-1 text-body not-italic text-ink-inverse-muted">
              <span className="text-clay-50">{client.address.street}</span>
              <span>
                {client.address.postalCode} {client.address.locality},{' '}
                {client.address.countryName[locale]}
              </span>
            </address>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={telHref}
                className="link-underline inline-flex min-h-11 items-center gap-2.5 font-heading text-h3 font-bold text-clay-50 no-underline"
              >
                <PhoneIcon className="size-5 text-sky-400" />
                {client.contact.phoneDisplay}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex min-h-10 items-center gap-2 text-body text-ink-inverse-muted no-underline"
              >
                <WhatsAppIcon className="size-4" />
                {t('actions.whatsapp')}
              </a>
            </div>

            <a
              href={mailHref}
              className="link-underline mt-1 inline-flex min-h-10 items-center gap-2 text-body text-ink-inverse-muted no-underline"
            >
              <MailIcon className="size-4" />
              {client.contact.email}
            </a>

            <p className="mt-6 max-w-[42ch] text-small text-ink-inverse-muted">
              {t('footer.builtNotice')}
            </p>
          </div>

          {/* ---- Links -------------------------------------------------- */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            <FooterColumn title={t('footer.servicesHeading')}>
              {servicesByOrder.map((service) => (
                <FooterLink
                  key={service.id}
                  href={{
                    pathname: '/leistungen/[service]',
                    params: { service: service.slug[locale] },
                  }}
                >
                  {service.name[locale]}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title={t('footer.companyHeading')}>
              <FooterLink href="/leistungen">{t('nav.services')}</FooterLink>
              <FooterLink href="/ablauf">{t('nav.process')}</FooterLink>
              <FooterLink href="/kontakt">{t('nav.contact')}</FooterLink>
              <FooterLink href="/impressum">{t('nav.legal')}</FooterLink>
              <FooterLink href="/datenschutz">{t('nav.privacy')}</FooterLink>
            </FooterColumn>
          </div>
        </div>

        {/* ---- Statutory line ------------------------------------------ */}
        <div className="mt-12 flex flex-col gap-3 border-t border-border-inverse pt-6 text-small text-ink-inverse-muted sm:flex-row sm:items-baseline sm:justify-between">
          {/*
            The legally required identifiers, on one line rather than a block.
            Nothing is invented: the brief forbids it, and a wrong statutory
            number is worse than a missing one.
          */}
          <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-clay-50">RCS</span>
            {client.legal.rcs ?? <Pending id="legal.rcs" what="—" />}
            <span className="text-navy-600">·</span>
            <span className="text-clay-50">Autorisation</span>
            {client.legal.autorisation ?? <Pending id="legal.autorisation" what="—" />}
            <span className="text-navy-600">·</span>
            <span className="text-clay-50">TVA</span>
            {client.legal.vat ?? <Pending id="legal.vat" what="—" />}
          </p>
          <p>
            © {year} {t('footer.copyright')}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  readonly title: string;
  readonly children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-heading text-micro font-bold text-sky-400 uppercase">{title}</h2>
      <ul className="mt-4 flex flex-col gap-0.5">
        {Array.isArray(children) ? (
          children.map((child, index) => <li key={index}>{child}</li>)
        ) : (
          <li>{children}</li>
        )}
      </ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  readonly href: Parameters<typeof Link>[0]['href'];
  readonly children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="link-underline inline-flex min-h-8 items-center text-body text-ink-inverse-muted no-underline"
    >
      {children}
    </Link>
  );
}
