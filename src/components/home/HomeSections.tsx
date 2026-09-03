import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Pending } from '@/components/Pending';
import { ImageSlot } from '@/components/media/ImageSlot';
import { Photo } from '@/components/media/Photo';
import { ServiceAreaMap, ServiceAreaRun } from './ServiceAreaMap';
import { RoofAnatomy } from './RoofAnatomy';
import { DeferredInquiryForm } from '@/components/inquiry/DeferredInquiryForm';
import { PhoneIcon, WhatsAppIcon, ArrowRightIcon, MapPinIcon } from '@/components/ui/icons';
import { client, servicesByOrder } from '~/config/client.config';
import { telHref, whatsappHref } from '@/lib/site';
import { roofAnatomy } from '@/content/roof-anatomy';
import type { PhotoId } from '@/content/photos';
import * as content from '@/content/home';

/* -------------------------------------------------------------------------- */
/* 1 · Hero                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Asymmetric by construction. Section 1.3 rules out the centred-text-over-a-
 * darkened-full-bleed-photo hero as too generic for this trade, so the
 * photograph sits beside the words at its own aspect ratio and stays fully
 * legible as a photograph.
 *
 * It is layered rather than laid flat: a navy plate offset behind the top-left
 * corner and a red rule along the bottom, so the picture reads as something
 * placed on the page rather than something dropped next to the text. That
 * layering is the motif the rest of the page repeats.
 */
export async function Hero({ locale }: { readonly locale: Locale }) {
  const t = await getTranslations();
  const { hero, glance } = content;

  return (
    <section className="relative">
      <Container
        width="wide"
        className="pt-10 pb-12 sm:py-[var(--section-y)] lg:pb-[var(--section-y-tight)]"
      >
        {/*
          The text keeps to the left half on wide screens and the photograph
          takes the rest of the viewport, edge to edge. A picture that stops at
          the container looks placed next to the words; one that runs off the
          screen looks like the page is standing in front of it.
        */}
        <div className="lg:max-w-[52%]">
          <p className="flex items-center gap-3 font-heading text-micro font-bold text-accent-text uppercase">
            <span aria-hidden="true" className="rule-draw h-px w-10 origin-left bg-red-500" />
            {hero.eyebrow[locale]}
          </p>

          <h1 className="mt-5 font-heading text-display font-bold text-balance sm:mt-6">
            {hero.title[locale]}
          </h1>

          <p className="mt-5 max-w-[46ch] text-lead text-ink-muted sm:mt-7">{hero.lead[locale]}</p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <Button as="link" href="/kontakt" size="lg">
              {t('actions.requestQuoteLong')}
            </Button>
            <Button
              as="a"
              href={telHref}
              variant="secondary"
              size="lg"
              icon={<PhoneIcon className="size-5" />}
            >
              {client.contact.phoneDisplay}
            </Button>
          </div>
        </div>

        {/* Below the fold-line on phones, beside the words on wide screens. */}
        <div className="hero-media hero-media--bleed scroll-settle mt-10 sm:mt-12 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:w-[46vw] xl:w-[44vw]">
          <ImageSlot
            image={hero.image}
            locale={locale}
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="photo-plate h-full rounded-sm lg:rounded-l-sm lg:rounded-r-none"
          />
        </div>
      </Container>

      {/*
        The first screen has to answer four questions before anyone scrolls:
        where are they, how far do they come, when do they answer, and what
        does the first step cost. One line, four answers.
      */}
      <div className="plane plane-light border-y border-border bg-surface-raised/70">
        <Container width="wide">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 py-6 sm:gap-x-10 sm:gap-y-6 sm:py-7 lg:grid-cols-4">
            {glance.map((fact) => (
              <div key={fact.id} className="flex flex-col gap-1">
                <dt className="font-heading text-micro font-bold text-ink-subtle uppercase">
                  {fact.label[locale]}
                </dt>
                <dd
                  className={[
                    'font-heading text-h4 font-bold',
                    'accent' in fact && fact.accent ? 'text-red-700' : 'text-ink',
                  ].join(' ')}
                >
                  {fact.value[locale]}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 2 · Emergency band                                                         */
/* -------------------------------------------------------------------------- */

/**
 * The one place the logo's red is spent as a full field. Its value is that it
 * appears nowhere else at this scale, so a visitor who has seen the site once
 * knows what that red means before reading a word of it.
 */
export async function EmergencyBand({ locale }: { readonly locale: Locale }) {
  const t = await getTranslations();
  const { emergency } = content;

  return (
    <section
      aria-labelledby="emergency-title"
      className="plane plane-signal bg-signal text-on-signal"
    >
      <Container width="wide" className="py-[var(--section-y-tight)]">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_auto] lg:items-center lg:gap-16">
          <div data-reveal>
            <p className="flex items-center gap-3 font-heading text-micro font-bold text-clay-50/85 uppercase">
              <span aria-hidden="true" className="rule-draw h-px w-10 origin-left bg-clay-50/60" />
              {emergency.eyebrow[locale]}
            </p>
            <h2 id="emergency-title" className="mt-4 font-heading text-h2 font-bold text-balance">
              {emergency.title[locale]}
            </h2>
            <p className="mt-5 max-w-[62ch] text-lead text-clay-50/90">{emergency.body[locale]}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
            <Button
              as="a"
              href={telHref}
              variant="inverse"
              size="lg"
              icon={<PhoneIcon className="size-5" />}
              className="whitespace-nowrap"
            >
              {client.contact.phoneDisplay}
            </Button>
            <Button
              as="a"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
              icon={<WhatsAppIcon className="size-5" />}
              className="border-clay-50/45 text-clay-50 hover:border-clay-50 hover:bg-clay-50/12"
            >
              {t('actions.whatsapp')}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 3 · Services                                                               */
/* -------------------------------------------------------------------------- */

const SERVICE_PHOTO: Record<string, PhotoId> = {
  roofing: 'dach-first-ziegel',
  'sheet-metal': 'dachrinne-detail',
  chimney: 'kaminkopf',
  cleaning: 'moos-vorher-nachher',
  emergency: 'ziegel-gebrochen',
  other: 'terrasse-reinigung',
};

/**
 * A ruled grid, not a deck of cards.
 *
 * Section 1.3 names cards-inside-cards as the incumbent site's defining
 * mistake, so the section carries the surface and each entry is separated by a
 * single hairline. The photograph belongs to the row rather than sitting on a
 * floating panel above it, and the title's underline grows on hover so the
 * whole row reads as one target.
 */
export async function ServicesGrid({ locale }: { readonly locale: Locale }) {
  const t = await getTranslations();
  const { services } = content;

  return (
    <Section tone="sunken" labelledBy="services-title">
      <Container width="wide">
        <div data-reveal>
          <SectionHeader
            id="services-title"
            index={1}
            eyebrow={services.eyebrow[locale]}
            title={services.title[locale]}
            lead={services.lead[locale]}
          />
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-x-5 border-t border-border-strong sm:mt-14 sm:gap-x-10 lg:grid-cols-3">
          {servicesByOrder.map((service, index) => (
            <li
              key={service.id}
              className="card-rise border-b border-border"
              style={{ '--reveal-index': index % 3 } as React.CSSProperties}
            >
              <Link
                href={{ pathname: '/leistungen/[service]', params: { service: service.slug[locale] } }}
                className="group flex h-full flex-col gap-3.5 py-6 no-underline sm:gap-5 sm:py-8"
              >
                <Photo
                  id={SERVICE_PHOTO[service.id]!}
                  locale={locale}
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 46vw"
                  aspect="16/10"
                  className="photo-plate photo-lift photo-drift lift"
                />

                <span className="flex items-baseline gap-2.5 sm:gap-4">
                  <span className="font-mono text-small text-ink-subtle tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={[
                      'link-underline font-heading text-h4 font-bold transition-colors duration-fast ease-out group-hover:text-accent-text sm:text-h3',
                      service.isEmergency ? 'text-red-700' : 'text-ink',
                    ].join(' ')}
                  >
                    {service.name[locale]}
                  </span>
                </span>

                <span className="line-clamp-4 max-w-[40ch] text-small text-ink-muted sm:line-clamp-none sm:pl-[3.25rem] sm:text-body">
                  {service.promise[locale]}
                </span>

                {/* The whole card is the link; on a two-up phone grid this
                    line is a second label for the same target and costs a
                    row of height per card. */}
                <span className="mt-auto hidden items-center gap-2 pt-3 pl-[3.25rem] font-heading text-small font-semibold text-accent-text sm:flex">
                  {t('actions.moreDetails')}
                  <ArrowRightIcon className="size-4 transition-transform duration-base ease-out group-hover:translate-x-1.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* 4 · About                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Replaces the block of promises that used to sit here.
 *
 * A row of guarantees — free quote, free call-out, seven days a week — reads
 * as marketing wherever it appears, and all three are already stated in the
 * hero and the emergency band. What was missing is the thing section 7.4 calls
 * the site's largest loss of trust: who these people are.
 *
 * There is no longer a separate about page. This block is it, which is why the
 * photograph is large and overlaps the text column rather than sitting beside
 * it politely.
 */
export async function AboutBlock({ locale }: { readonly locale: Locale }) {
  const { about } = content;

  return (
    <Section labelledBy="about-title">
      <Container width="wide">
        <div className="grid gap-6 sm:gap-10 lg:grid-cols-[1.15fr_0.95fr] lg:items-start lg:gap-0">
          <div className="relative lg:z-0">
            <Photo
              id="arbeit-stehfalz"
              locale={locale}
              sizes="(min-width: 1024px) 56vw, 100vw"
              aspect="4/3"
              className="photo-plate photo-lift photo-drift"
            />
          </div>

          {/*
            Overlapped left and dropped down, so the two halves read as one
            composition rather than as two blocks sharing a row. The overlap is
            deliberately shallow — far enough to bind them, not so far that the
            card becomes a lid on the photograph.
          */}
          <div
            data-reveal
            className="relative z-10 rounded-sm bg-surface-raised p-6 shadow-lg sm:p-8 lg:-ml-14 lg:mt-24 lg:p-10"
          >
            <p className="flex items-center gap-3 font-heading text-micro font-bold text-accent-text uppercase">
              <span aria-hidden="true" className="rule-draw h-px w-10 origin-left bg-red-500" />
              {about.eyebrow[locale]}
            </p>
            <h2 id="about-title" className="mt-4 font-heading text-h2 font-bold text-balance">
              {about.title[locale]}
            </h2>

            {about.body.map((paragraph, index) => (
              <p key={index} className="mt-5 max-w-[50ch] text-body text-ink-muted">
                {paragraph[locale]}
              </p>
            ))}

            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6 sm:gap-6">
              {about.figures.map((figure) => (
                <div key={figure.id}>
                  <dt className="font-heading text-micro font-bold text-ink-muted uppercase">
                    {figure.label[locale]}
                  </dt>
                  <dd className="mt-2.5">
                    <Pending id={figure.pendingId} what={figure.pendingWhat[locale]} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* 6 · Process                                                                */
/* -------------------------------------------------------------------------- */

export async function ProcessSteps({ locale }: { readonly locale: Locale }) {
  const t = await getTranslations();
  const { process } = content;

  return (
    <Section labelledBy="process-title">
      <Container width="wide">
        <div data-reveal>
          <SectionHeader
            id="process-title"
            index={3}
            eyebrow={process.eyebrow[locale]}
            title={process.title[locale]}
          />
        </div>

        <ol className="mt-10 grid grid-cols-2 gap-x-6 gap-y-9 sm:mt-14 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-4">
          {process.steps.map((step, index) => (
            <li
              key={step.id}
              className="group border-t-2 border-navy-900 pt-5"
              data-reveal
              style={{ '--reveal-index': index } as React.CSSProperties}
            >
              <p className="font-mono text-h3 text-navy-300 tabular-nums transition-colors duration-base ease-out group-hover:text-red-500">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 font-heading text-h3 font-bold">{step.title[locale]}</h3>
              <p className="mt-3 text-body text-ink-muted">{step.body[locale]}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <Button as="link" href="/ablauf" variant="secondary" icon={<ArrowRightIcon className="size-4" />}>
            {t('nav.process')}
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* 7 · Roof anatomy                                                           */
/* -------------------------------------------------------------------------- */

export async function RoofAnatomySection({ locale }: { readonly locale: Locale }) {
  return (
    <Section tone="tint" labelledBy="anatomy-title">
      <Container width="wide">
        <div data-reveal>
          <SectionHeader
            id="anatomy-title"
            index={4}
            eyebrow={roofAnatomy.eyebrow[locale]}
            title={roofAnatomy.title[locale]}
            lead={roofAnatomy.lead[locale]}
          />
        </div>
        <div className="mt-14">
          <RoofAnatomy locale={locale} />
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* 8 · Service area                                                           */
/* -------------------------------------------------------------------------- */

export async function ServiceArea({ locale }: { readonly locale: Locale }) {
  const t = await getTranslations();
  const { area } = content;

  return (
    <Section labelledBy="area-title">
      <Container width="wide">
        <div data-reveal>
          <SectionHeader
            id="area-title"
            index={5}
            eyebrow={area.eyebrow[locale]}
            title={area.title[locale]}
            lead={area.body[locale]}
          />

          <p className="mt-8 flex items-center gap-3 font-heading text-h4 font-semibold">
            <MapPinIcon className="size-5 text-red-500" />
            {client.address.street}, {client.address.postalCode} {client.address.locality}
          </p>
        </div>

        <div className="mt-14" data-reveal>
          <ServiceAreaMap
            labels={{
              workshop: t('map.workshop'),
              places: t('map.places'),
              nationwide: t('map.nationwide'),
              attribution: t('map.attribution'),
            }}
          />
        </div>
      </Container>

      {/* Full-bleed, outside the container: the run has to leave the screen on
          both sides or it reads as a list rather than as a route. */}
      <div className="mt-10 sm:mt-14">
        <ServiceAreaRun />
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* 9 · Reviews — deliberately absent                                          */
/* -------------------------------------------------------------------------- */

/*
  Section 7.1 lists a reviews section here and settles what to do when there is
  nothing to put in it: leave it out, do not invent anything. No Google reviews
  for this business were findable, and there is no Business Profile access yet.
*/

/* -------------------------------------------------------------------------- */
/* 10 · Closing call to action                                                */
/* -------------------------------------------------------------------------- */

export async function ClosingCta({ locale }: { readonly locale: Locale }) {
  const { cta } = content;

  return (
    <Section tone="sunken" labelledBy="cta-title">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div data-reveal>
            <h2 id="cta-title" className="font-heading text-h1 font-bold text-balance">
              {cta.title[locale]}
            </h2>
            <p className="mt-6 max-w-[46ch] text-lead text-ink-muted">{cta.body[locale]}</p>

            {/* The call stays an equal alternative to the form, never a fallback. */}
            <a
              href={telHref}
              className="link-underline mt-9 inline-flex min-h-14 items-center gap-3 font-heading text-h3 font-bold no-underline"
            >
              <PhoneIcon className="size-6 text-red-500" />
              {client.contact.phoneDisplay}
            </a>

            <div className="mt-10">
              <Photo
                id="natursteinmauer"
                locale={locale}
                sizes="(min-width: 1024px) 34vw, 100vw"
                aspect="16/10"
                className="photo-plate photo-lift"
              />
            </div>
          </div>

          <DeferredInquiryForm
            sourcePage="/"
            fallback={
              <div className="flex min-h-[42rem] flex-col justify-center gap-6 rounded-sm border border-dashed border-border-strong p-8">
                <p className="max-w-[40ch] text-body text-ink-muted">{cta.body[locale]}</p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button as="link" href="/kontakt" size="lg">
                    {
                      (
                        {
                          de: 'Zum Anfrageformular',
                          fr: 'Vers le formulaire de demande',
                          en: 'Go to the enquiry form',
                        } as const
                      )[locale]
                    }
                  </Button>
                  <Button
                    as="a"
                    href={telHref}
                    variant="secondary"
                    size="lg"
                    icon={<PhoneIcon className="size-5" />}
                  >
                    {client.contact.phoneDisplay}
                  </Button>
                </div>
              </div>
            }
          />
        </div>
      </Container>
    </Section>
  );
}
