import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Photo } from '@/components/media/Photo';
import { PHOTO_ALT, type PhotoId } from '@/content/photos';
import * as content from '@/content/home';

/**
 * The work, as one row that moves on its own.
 *
 * This replaces both the static gallery block and the separate projects page.
 * All twenty-two photographs on a single track: two rows filled the band but
 * gave the eye two things to follow at once, and one is enough to read.
 *
 * Built entirely in CSS. The track holds its photographs twice and translates
 * by exactly half its own width, so the loop is seamless with no measurement,
 * no timer and no JavaScript. The duplicate is hidden from assistive
 * technology, so a screen reader hears each caption once.
 *
 * Motion stops on hover and on keyboard focus — a caption you cannot read
 * because it is sliding away is worse than no caption — and
 * `prefers-reduced-motion` stops it outright rather than merely slowing it.
 *
 * Nothing here claims a location, a year or an area. None was supplied with
 * the images, and section 7.3's project model needs all of it.
 */

const RUN: readonly PhotoId[] = [
  'haus-schiefer-fertig',
  'schiefer-verlegen',
  'dach-offen-geruest',
  'geruest-luftbild',
  'dach-first-ziegel',
  'ziegel-dunkel-leitern',
  'schiefer-dachfenster',
  'schiefer-detail',
  'kaminkopf',
  'kaminkopf-verkleidet',
  'arbeit-stehfalz',
  'spenglerei-anschluss',
  'zink-fallrohr',
  'dachrinne-detail',
  'dachstuhl-offen',
  'dachgeschoss-ausgebaut',
  'moos-vorher-nachher',
  'moos-nordseite',
  'ziegel-gebrochen',
  'terrasse-reinigung',
  'pflaster-halb-gereinigt',
  'natursteinmauer',
];

function Track({ photos, locale }: { readonly photos: readonly PhotoId[]; readonly locale: Locale }) {
  const run = (hidden: boolean) =>
    photos.map((id, index) => (
      <li
        key={`${hidden ? 'dup' : 'run'}-${id}`}
        className="group w-[min(72vw,22rem)] shrink-0"
        aria-hidden={hidden || undefined}
      >
        <figure className="m-0">
          <Photo
            id={id}
            locale={locale}
            sizes="(min-width: 1024px) 22rem, 72vw"
            aspect="4/3"
            className="photo-plate photo-lift"
          />
          <figcaption className="mt-3.5 flex gap-3">
            <span className="font-mono text-small text-ink-subtle tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="line-clamp-3 text-small leading-relaxed text-ink-muted">
              {PHOTO_ALT[id][locale]}
            </span>
          </figcaption>
        </figure>
      </li>
    ));

  return (
    <ul
      className="marquee-track"
      style={{ '--marquee-duration': `${photos.length * 6}s` } as React.CSSProperties}
    >
      {run(false)}
      {run(true)}
    </ul>
  );
}

export async function WorkMarquee({ locale }: { readonly locale: Locale }) {
  const t = await getTranslations();
  const { projects } = content;

  return (
    <>
      <div aria-hidden="true" className="roofline-divider roofline-divider--sky bg-surface" />

      <section
        aria-labelledby="work-title"
        className="section-glow plane-dark bg-surface-inverse py-[var(--section-y)]"
      >
        <Container width="wide">
          <div data-reveal>
            <SectionHeader
              id="work-title"
              index={2}
              tone="inverse"
              eyebrow={projects.eyebrow[locale]}
              title={projects.title[locale]}
              lead={projects.lead[locale]}
            />
          </div>
        </Container>

        {/* Full-bleed: the tracks run past the container on both sides, which
            is what tells the eye they continue rather than stopping. */}
        <div className="marquee mt-14">
          <Track photos={RUN} locale={locale} />
        </div>

        <Container width="wide">
          <p className="mt-8 text-small text-ink-inverse-muted">{t('projects.marqueeNote')}</p>
        </Container>
      </section>

      <div aria-hidden="true" className="roofline-divider roofline-divider--sky rotate-180 bg-surface" />
    </>
  );
}
