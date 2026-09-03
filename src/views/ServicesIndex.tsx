import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { PhoneIcon, ArrowRightIcon } from '@/components/ui/icons';
import { client, servicesByOrder } from '~/config/client.config';
import { telHref } from '@/lib/site';
import { servicesOverview, getServiceContent } from '@/content/services';

/**
 * The services hub.
 *
 * Each entry shows its own opening sentence rather than a repeated stub, so
 * the page reads as six distinct offers instead of one template rendered six
 * times — which is precisely how the incumbent site's prestations grid reads,
 * and why it is duplicated on every URL.
 */
export async function ServicesIndex({ locale }: { readonly locale: Locale }) {
  const t = await getTranslations();

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, [{ name: t('nav.home'), pathname: '/' }])} />

      <Section tight className="pb-0">
        <Container width="wide">
          <Breadcrumbs crumbs={[{ name: t('nav.home'), pathname: '/' }]} current={t('nav.services')} />
          <h1 className="font-heading text-h1 font-bold text-balance">{servicesOverview.title[locale]}</h1>
          <p className="mt-7 max-w-[64ch] text-lead text-ink-muted">{servicesOverview.lead[locale]}</p>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <ul className="border-t border-border-strong">
            {servicesByOrder.map((service, index) => {
              const content = getServiceContent(service.id);
              return (
                <li key={service.id} className="border-b border-border">
                  <Link
                    href={{ pathname: '/leistungen/[service]', params: { service: service.slug[locale] } }}
                    className="group grid gap-x-8 gap-y-3 py-9 no-underline md:grid-cols-[3rem_minmax(0,22rem)_1fr] md:items-baseline"
                  >
                    <span className="font-mono text-small text-ink-subtle tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span
                      className={[
                        'link-underline font-heading text-h3 font-bold transition-colors duration-fast ease-out group-hover:text-accent-text',
                        service.isEmergency ? 'text-red-700' : 'text-ink',
                      ].join(' ')}
                    >
                      {service.name[locale]}
                    </span>

                    <span className="flex flex-col gap-3">
                      <span className="max-w-[58ch] text-body text-ink-muted">
                        {content ? content.intro[locale] : service.promise[locale]}
                      </span>
                      <span className="flex items-center gap-2 font-heading text-small font-semibold text-accent-text">
                        {t('actions.moreDetails')}
                        <ArrowRightIcon className="size-4 transition-transform duration-fast ease-out group-hover:translate-x-1" />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section tone="sunken" tight>
        <Container width="content">
          <h2 className="font-heading text-h2 font-bold text-balance">
            {
              {
                de: 'Nicht sicher, worum es bei Ihnen geht?',
                fr: 'Vous ne savez pas de quoi il retourne ?',
                en: 'Not sure which of these you need?',
              }[locale]
            }
          </h2>
          <p className="mt-5 max-w-[62ch] text-lead text-ink-muted">
            {
              {
                de: 'Das ist der Normalfall, nicht die Ausnahme. Beschreiben Sie kurz, was Sie sehen — ein Fleck an der Decke, ein Ziegel im Garten, Moos auf der Nordseite. Die Einordnung ist unsere Aufgabe.',
                fr: "C'est le cas courant, pas l'exception. Décrivez simplement ce que vous voyez : une auréole au plafond, une tuile dans le jardin, de la mousse au nord. Le diagnostic, c'est notre travail.",
                en: 'That is the normal case, not the exception. Just describe what you can see — a stain on the ceiling, a tile in the garden, moss on the north side. Working out which job it is, is ours.',
              }[locale]
            }
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button as="link" href="/kontakt" size="lg">
              {t('actions.requestQuoteLong')}
            </Button>
            <Button as="a" href={telHref} variant="secondary" size="lg" icon={<PhoneIcon className="size-5" />}>
              {client.contact.phoneDisplay}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
