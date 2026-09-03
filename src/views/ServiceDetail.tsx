import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Photo } from '@/components/media/Photo';
import type { PhotoId } from '@/content/photos';
import { JsonLd, serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';
import { PhoneIcon, ArrowRightIcon, CheckIcon } from '@/components/ui/icons';
import { client, servicesByOrder, getService, type ServiceId } from '~/config/client.config';
import { telHref, absoluteUrl } from '@/lib/site';
import type { ServiceContent } from '@/content/services/types';

/**
 * A service page.
 *
 * The reading column is capped at the prose measure and the supporting panel
 * sticks alongside it on wide screens, so the phone number and the enquiry
 * button stay reachable through a page that runs well past a thousand words
 * without either one interrupting the text.
 *
 * Section order follows 7.2: what it is, when you need it, how we work, what
 * we use, questions, ask. The cost section is gone — with no price list
 * supplied it could only say "it depends" at length on six pages, and it was
 * pushing the FAQ, which does answer things, below the fold.
 *
 * The prose is broken up rather than merely shortened. Method reads as
 * numbered steps and materials as a card grid, because the same words in a
 * sequence you can count scan as half the length of the same words in a run
 * of paragraphs.
 */

/**
 * The photograph at the head of each page.
 *
 * One of the firm's own, chosen to show the actual work rather than to
 * decorate. The grey placeholder that stood here read as a broken image.
 */
const HERO: Record<ServiceId, PhotoId> = {
  roofing: 'haus-schiefer-fertig',
  'sheet-metal': 'arbeit-stehfalz',
  chimney: 'kaminkopf-verkleidet',
  cleaning: 'moos-vorher-nachher',
  emergency: 'dach-offen-geruest',
  other: 'natursteinmauer',
};
export async function ServiceDetail({
  locale,
  serviceId,
  content,
}: {
  readonly locale: Locale;
  readonly serviceId: ServiceId;
  readonly content: ServiceContent;
}) {
  const t = await getTranslations();
  const service = getService(serviceId);
  const others = servicesByOrder.filter((entry) => entry.id !== serviceId);
  const url = absoluteUrl(locale, '/leistungen/[service]', { service: service.slug[locale] });

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            locale,
            name: service.name[locale],
            description: content.meta[locale].description,
            url,
          }),
          faqSchema(
            content.faq.map((entry) => ({
              question: entry.question[locale],
              answer: entry.answer[locale],
            })),
          ),
          breadcrumbSchema(locale, [
            { name: t('nav.home'), pathname: '/' },
            { name: t('nav.services'), pathname: '/leistungen' },
          ]),
        ]}
      />

      {/* ---- Opening ------------------------------------------------- */}
      <Section tight className="pb-0">
        <Container width="wide">
          <Breadcrumbs
            crumbs={[
              { name: t('nav.home'), pathname: '/' },
              { name: t('nav.services'), pathname: '/leistungen' },
            ]}
            current={service.name[locale]}
          />

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <h1
                className={[
                  'font-heading text-h1 font-bold text-balance',
                  service.isEmergency ? 'text-red-700' : 'text-ink',
                ].join(' ')}
              >
                {service.name[locale]}
              </h1>
              <p className="mt-6 max-w-[52ch] text-lead text-ink">{content.intro[locale]}</p>
              <p className="mt-5 max-w-[58ch] text-body text-ink-muted">{content.lead[locale]}</p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button as="link" href="/kontakt" size="lg">
                  {t('actions.requestQuoteLong')}
                </Button>
                <Button
                  as="a"
                  href={telHref}
                  variant={service.isEmergency ? 'signal' : 'secondary'}
                  size="lg"
                  icon={<PhoneIcon className="size-5" />}
                >
                  {client.contact.phoneDisplay}
                </Button>
              </div>
            </div>

            <div data-reveal className="hero-media">
              <Photo
                id={HERO[serviceId]}
                locale={locale}
                sizes="(min-width: 1024px) 46vw, 100vw"
                aspect="4/3"
                priority
                className="photo-plate photo-drift"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Body + aside -------------------------------------------- */}
      <Section>
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
            <div className="prose-roof">
              {/* When you need this */}
              <h2>{content.symptoms.title[locale]}</h2>
              <p>{content.symptoms.intro[locale]}</p>
              <ul className="mt-6 grid gap-x-8 gap-y-3.5 md:grid-cols-2">
                {content.symptoms.items.map((item, index) => (
                  <li key={index} className="flex gap-3.5">
                    <CheckIcon className="mt-1 size-4 shrink-0 text-accent-text" />
                    <span>{item[locale]}</span>
                  </li>
                ))}
              </ul>

              {/* How we work, as a sequence you can count rather than a run
                  of paragraphs that all look alike. */}
              <h2>{content.approach.title[locale]}</h2>
              <ol className="method mt-8">
                {content.approach.body.map((paragraph, index) => (
                  <li key={index} data-reveal>
                    <span aria-hidden="true" className="method__step">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="m-0">{paragraph[locale]}</p>
                  </li>
                ))}
              </ol>

              {/* Materials */}
              <h2>{content.materials.title[locale]}</h2>
              <p>{content.materials.intro[locale]}</p>
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-border">
                {content.materials.items.map((item, index) => (
                  <div key={index} className="spec-card card-rise bg-surface p-4 sm:p-6">
                    <dt className="font-heading text-h4 font-bold">{item.name[locale]}</dt>
                    <dd className="mt-2 text-small leading-relaxed text-ink-muted">
                      {item.why[locale]}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* FAQ */}
              <h2>{t('faq.heading')}</h2>
              <div className="mt-7 divide-y divide-border border-y border-border">
                {content.faq.map((entry, index) => (
                  <details key={index} name="service-faq" className="group py-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-heading text-h4 font-semibold marker:content-none">
                      {entry.question[locale]}
                      <span
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-accent-text transition-transform duration-fast ease-out group-open:rotate-45"
                      >
                        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-4 max-w-[62ch] text-ink-muted">{entry.answer[locale]}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* ---- Aside ------------------------------------------------ */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border-t-2 border-navy-900 pt-6">
                <h2 className="font-heading text-h4 font-bold">{content.cta.title[locale]}</h2>
                <p className="mt-3 text-small text-ink-muted">{content.cta.body[locale]}</p>

                <div className="mt-6 flex flex-col gap-3">
                  <Button as="link" href="/kontakt">
                    {t('actions.requestQuote')}
                  </Button>
                  <Button as="a" href={telHref} variant="secondary" icon={<PhoneIcon className="size-4" />}>
                    {client.contact.phoneDisplay}
                  </Button>
                </div>
              </div>

              {/*
                Internal linking, section 13.3: every service page points at the
                others and at the area pages, and they point back. On the
                incumbent site each sub-page is an island carrying the same
                duplicated grid.
              */}
              <div className="mt-12 border-t border-border pt-6">
                <h2 className="font-heading text-micro font-bold text-ink-muted uppercase">
                  {t('nav.services')}
                </h2>
                <ul className="mt-4 space-y-1">
                  {others.map((entry) => (
                    <li key={entry.id}>
                      <Link
                        href={{ pathname: '/leistungen/[service]', params: { service: entry.slug[locale] } }}
                        className="link-underline inline-flex min-h-11 items-center gap-2 text-body no-underline transition-colors duration-fast ease-out hover:text-accent-text"
                      >
                        <ArrowRightIcon className="size-4 shrink-0 text-ink-subtle" />
                        {entry.name[locale]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </aside>
          </div>
        </Container>
      </Section>

      {/* ---- Closing ------------------------------------------------- */}
      <Section tone="sunken" tight>
        <Container width="content">
          <h2 className="font-heading text-h2 font-bold text-balance">{content.cta.title[locale]}</h2>
          <p className="mt-5 max-w-[62ch] text-lead text-ink-muted">{content.cta.body[locale]}</p>
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
