import type { Locale } from '@/i18n/routing';
import { roofAnatomy } from '@/content/roof-anatomy';
import { getTranslations } from 'next-intl/server';

/**
 * A cut through a roof, labelled like a technical drawing.
 *
 * Everything is named at once. The earlier version hid seven of eight layers
 * behind a click, which meant a visitor learned one thing and left — the point
 * of this section is that a roof has more layers than anyone expects, and that
 * only lands if they are all visible together.
 *
 * No interaction, no list, no descriptions. It is a diagram, and a diagram
 * that needs to be operated before it explains anything is a bad diagram.
 *
 * The geometry is computed rather than drawn by hand: each layer is a
 * parallelogram along the slope, offset along the slope's normal by the
 * thickness of everything beneath it, so the stack stays physically coherent.
 * Leader anchors are staggered along the slope so eight lines can leave a
 * 30-pixel-thick sandwich without crossing each other or the roof.
 */

const EAVES = { x: 380, y: 560 };
const RIDGE = { x: 1080, y: 285 };

const dx = RIDGE.x - EAVES.x;
const dy = RIDGE.y - EAVES.y;
const length = Math.hypot(dx, dy);
const along = { x: dx / length, y: dy / length };
/** Outward normal, away from the interior. */
const out = { x: dy / length, y: -dx / length };

const STACK = [
  { id: 'rafters', thickness: -54, className: 'fill-[#a8794e]' },
  { id: 'underlay', thickness: 11, className: 'fill-navy-400' },
  { id: 'counter-battens', thickness: 26, className: 'fill-[#c99f70]' },
  { id: 'battens', thickness: 20, className: 'fill-[#b5854f]' },
  { id: 'covering', thickness: 34, className: 'fill-navy-700' },
] as const;

/** A point on the slope: `t` along it, `offset` out along its normal. */
function at(t: number, offset: number) {
  return {
    x: EAVES.x + along.x * t + out.x * offset,
    y: EAVES.y + along.y * t + out.y * offset,
  };
}

function band(from: number, to: number, startPad = 0, endPad = 0): string {
  const a = at(startPad, 0);
  const b = at(length - endPad, 0);
  const p = (base: { x: number; y: number }, offset: number) =>
    `${(base.x + out.x * offset).toFixed(1)} ${(base.y + out.y * offset).toFixed(1)}`;
  return `M${p(a, from)} L${p(b, from)} L${p(b, to)} L${p(a, to)} Z`;
}

/**
 * Where each label sits and where its line points.
 *
 * The four outer layers read down the left margin, the two structural ones out
 * of the interior below, and the chimney off to the right — the three places
 * on this canvas that are actually empty.
 *
 * Their anchors run *down* the slope as the labels run down the margin, and
 * that ordering is the whole trick. Anchored in stack order instead — covering
 * lowest, underlay highest — the leaders fan the wrong way and every one of
 * the four crosses every other, because the line from the lowest anchor has to
 * reach the highest label. Reversed, the four are a fan that never meets
 * itself. The x-ranges of the remaining four do not overlap, so nothing else
 * can cross either.
 */
const LABELS: {
  id: string;
  anchor: { t: number; offset: number } | { x: number; y: number };
  label: { x: number; y: number };
  align: 'end' | 'start';
}[] = [
  { id: 'covering', anchor: { t: 470, offset: 74 }, label: { x: 330, y: 130 }, align: 'end' },
  { id: 'battens', anchor: { t: 373, offset: 47 }, label: { x: 330, y: 186 }, align: 'end' },
  { id: 'counter-battens', anchor: { t: 276, offset: 24 }, label: { x: 330, y: 242 }, align: 'end' },
  { id: 'underlay', anchor: { t: 179, offset: 5.5 }, label: { x: 330, y: 298 }, align: 'end' },
  { id: 'insulation', anchor: { t: 300, offset: -25 }, label: { x: 560, y: 646 }, align: 'end' },
  /* Offset -50 sits below the insulation band, which runs -48 to -6, so this
     leader lands on a rafter rather than on the wool between them. */
  { id: 'rafters', anchor: { t: 620, offset: -50 }, label: { x: 940, y: 664 }, align: 'start' },
  { id: 'gutter', anchor: { x: 352, y: 588 }, label: { x: 296, y: 660 }, align: 'end' },
  /*
    The one width-critical label on the drawing, and the one that was clipped.

    It used to start at x=1120, which leaves 200px before the viewBox ends at
    1320 — and `overflow` is hidden on an <svg> root, so anything past that edge
    is cut at every screen width, not just narrow ones. Measured against the
    real webfont at fontSize 26, the three languages need 206.7px (de), 219.7px
    (en) and 270.4px (fr), so all three overflowed: by 6.7, 19.7 and 70.4px.
    German only just gave the game away; French lost two characters.

    Widening the viewBox would have fixed it and was the wrong trade. The
    drawing renders at nearly 1:1 in the 1320px container, so every extra 100px
    of canvas shrinks all eight labels by another 7% — and this page is read
    outdoors on a phone and by older homeowners, which section 6 of the brief
    makes a floor on type size rather than a preference.

    So the label moves into the empty band above the ridge instead, where the
    only thing to the right is air. From x=950 the longest of the three ends at
    1220.4, which also clears the 56px scroll fade `.anatomy-figure::after`
    lays over the right edge below 52rem. Roughly 100px of headroom is left for
    a fourth language.

    The anchor moves with it, onto the tiles immediately down-slope of the
    chimney's right flashing rather than into the middle of the chimney shaft.
    That is what the word actually names — the junction, not the chimney — and
    it keeps the red anchor dot on navy tiles, where it is visible, instead of
    on the red flashing, where it would vanish. The covering at x=968 runs from
    y=230.9 to y=267.8, so y=248 sits on it.
  */
  { id: 'chimney', anchor: { x: 968, y: 248 }, label: { x: 950, y: 176 }, align: 'start' },
];

export async function RoofAnatomy({ locale }: { readonly locale: Locale }) {
  const t = await getTranslations();
  let cursor = 0;
  const bands = STACK.map((entry) => {
    const from = entry.thickness < 0 ? entry.thickness : cursor;
    const to = entry.thickness < 0 ? 0 : cursor + entry.thickness;
    if (entry.thickness > 0) cursor = to;
    return { id: entry.id, className: entry.className, d: band(from, to) };
  });

  const names = new Map<string, string>(
    roofAnatomy.layers.map((layer) => [layer.id as string, layer.name[locale]]),
  );

  return (
    /* Eight labels need room. Below the width where they stay legible the
       drawing scrolls sideways rather than shrinking the type to nothing. */
    <figure className="m-0">
      <div className="anatomy-figure overflow-x-auto">
      <svg
        viewBox="0 0 1320 700"
        role="img"
        aria-label={roofAnatomy.lead[locale]}
        className="h-auto w-full min-w-[46rem] select-none"
      >
        {/* The interior below the cut, so this reads as part of a house. */}
        <path d="M380 560 L1080 285 L1080 700 L380 700 Z" className="fill-clay-200/70" />
        <path d="M380 560 L380 700 L446 700 L446 560 Z" className="fill-navy-200/70" />

        {/* Insulation sits between the rafters, not as a layer of its own. */}
        <path d={band(-48, -6, 78, 48)} className="fill-moss-500/70" />

        {bands.map((entry) => (
          <path key={entry.id} d={entry.d} className={entry.className} />
        ))}

        {/* Tile joints, so the covering reads as tiles rather than a slab. */}
        <g className="pointer-events-none">
          {Array.from({ length: 11 }, (_, i) => {
            const t = 62 + i * 64;
            const inner = at(t, 57);
            const outer = at(t, 91);
            return (
              <line
                key={i}
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                className="stroke-clay-100"
                strokeWidth={3}
              />
            );
          })}
        </g>

        {/* Gutter at the eaves. */}
        <g>
          <path
            d="M316 606 a40 40 0 0 0 80 0 v-28 h-15 v26 a25 25 0 0 1-50 0 v-26 h-15 z"
            className="fill-navy-500"
          />
          <ellipse cx={356} cy={578} rx={40} ry={9} className="fill-navy-600" />
        </g>

        {/* Chimney breaking through the covering. */}
        <g>
          <rect x={824} y={150} width={98} height={196} rx={2} className="fill-navy-800" />
          <rect x={812} y={132} width={122} height={22} rx={2} className="fill-navy-900" />
          {/* The flashing, in the one colour reserved for what matters. */}
          <path d="M796 352 L824 320 L824 382 L796 382 Z" className="fill-red-500" />
          <path d="M922 288 L954 256 L954 320 L922 348 Z" className="fill-red-500" />
        </g>

        {/* Leaders and labels, all of them, always. */}
        {LABELS.map((entry) => {
          const anchor = 't' in entry.anchor ? at(entry.anchor.t, entry.anchor.offset) : entry.anchor;
          const tip = entry.align === 'end' ? entry.label.x + 14 : entry.label.x - 14;
          return (
            <g key={entry.id}>
              <line
                x1={anchor.x}
                y1={anchor.y}
                x2={tip}
                y2={entry.label.y - 7}
                className="stroke-navy-500"
                strokeWidth={1.75}
              />
              <circle cx={anchor.x} cy={anchor.y} r={6} className="fill-red-500" />
              <text
                x={entry.label.x}
                y={entry.label.y}
                textAnchor={entry.align === 'end' ? 'end' : 'start'}
                className="fill-ink font-heading"
                style={{ fontSize: 26, fontWeight: 700 }}
              >
                {names.get(entry.id)}
              </text>
            </g>
          );
        })}
        </svg>
      </div>

      <figcaption className="anatomy-hint mt-4 items-center gap-2 text-small text-ink-subtle">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
        {t('anatomy.scrollHint')}
      </figcaption>
    </figure>
  );
}
