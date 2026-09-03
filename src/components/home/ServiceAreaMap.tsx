import { VIEWBOX, LUXEMBOURG_OUTLINE, MAP_POINTS } from '@/content/map/luxembourg';
import { client } from '~/config/client.config';

/**
 * Where the business actually works.
 *
 * The outline is Luxembourg's real administrative border from OpenStreetMap
 * and every point sits at the real coordinates of that village, so this is a
 * map rather than a diagram that looks like one.
 *
 * The dashed radius ellipse is gone. It was the one element on the page that
 * looked bought rather than made — a clip-art halo over a real border — and it
 * said less than the dots underneath it already did. In its place, a hairline
 * runs from the workshop to every municipality. That is the actual claim ("we
 * drive from here to there"), it is drawn from the same coordinates, and a fan
 * of thin lines reads as a considered drawing where a dashed oval read as a
 * template.
 *
 * The municipalities run past as a single moving line rather than a table of
 * distances. The kilometre figures were accurate and nobody needed them: the
 * useful fact is that this is one tight cluster around the workshop, and a
 * line of names carries that faster than ten numbers do. They stay ordered by
 * distance, nearest first, so the sequence keeps what the numbers said.
 *
 * The motion uses the same mechanism as the photographs — the track holds its
 * names twice and moves by half its own width, so the loop is seamless with no
 * measurement and no JavaScript. Server-rendered throughout.
 */
export function ServiceAreaMap({
  labels,
}: {
  readonly labels: {
    readonly workshop: string;
    readonly places: string;
    readonly nationwide: string;
    readonly attribution: string;
  };
}) {
  const areas = [...client.serviceAreas]
    .map((area) => ({ ...area, point: MAP_POINTS[area.slug] }))
    .filter((area): area is typeof area & { point: NonNullable<typeof area.point> } =>
      Boolean(area.point),
    )
    .sort((a, b) => a.point.km - b.point.km);

  const home = MAP_POINTS.holzem!;

  return (
    <div className="grid grid-cols-[9.5rem_minmax(0,1fr)] items-center gap-6 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] sm:gap-14 lg:gap-20">
      {/* ---- Map ------------------------------------------------------- */}
      <figure className="m-0">
        <svg
          viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
          role="img"
          aria-label={labels.nationwide}
          className="h-auto w-full max-w-[24rem] sm:mx-auto lg:mx-0 lg:max-w-none"
        >
          <path
            d={LUXEMBOURG_OUTLINE}
            className="fill-navy-900/5 stroke-navy-900/35"
            strokeWidth={3.5}
            strokeLinejoin="round"
          />

          {/* One hairline per municipality, drawn from the workshop. */}
          <g className="stroke-accent-500/35" strokeWidth={3}>
            {areas.map((area) => (
              <line
                key={area.slug}
                x1={home.x}
                y1={home.y}
                x2={area.point.x}
                y2={area.point.y}
              />
            ))}
          </g>

          {areas.map((area) => (
            <circle
              key={area.slug}
              cx={area.point.x}
              cy={area.point.y}
              r={15}
              className="fill-navy-700 stroke-clay-50"
              strokeWidth={3}
            />
          ))}

          {/* The workshop. Deliberately the only red mark on the map. */}
          <circle
            cx={home.x}
            cy={home.y}
            r={34}
            className="fill-red-500/16 stroke-red-500"
            strokeWidth={3.5}
          />
          <circle
            cx={home.x}
            cy={home.y}
            r={16}
            className="fill-red-500 stroke-clay-50"
            strokeWidth={3}
          />
        </svg>

        <figcaption className="mt-4 flex flex-col gap-1.5 text-small text-ink-subtle sm:mt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="inline-block size-2.5 rounded-full bg-red-500" />
            {labels.workshop}
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="inline-block size-2 rounded-full bg-navy-700" />
            {labels.places}
          </span>
        </figcaption>
      </figure>

      {/* ---- Text beside the map --------------------------------------- */}
      <div>
        <p className="max-w-[52ch] text-lead text-ink-muted">{labels.nationwide}</p>
        <p className="mt-4 text-small text-ink-subtle">{labels.attribution}</p>
      </div>
    </div>
  );
}

/**
 * The municipalities, running past.
 *
 * Full-bleed and outside the container on purpose: a line that stops at the
 * text column reads as a list, and a line that leaves the screen on both sides
 * reads as a route that continues. Holzem leads it, in the one colour reserved
 * for the workshop.
 */
export function ServiceAreaRun() {
  const areas = [...client.serviceAreas]
    .map((area) => ({ ...area, point: MAP_POINTS[area.slug] }))
    .filter((area): area is typeof area & { point: NonNullable<typeof area.point> } =>
      Boolean(area.point),
    )
    .sort((a, b) => a.point.km - b.point.km);

  const run = (hidden: boolean) => (
    <>
      <li className="area-run__origin" aria-hidden={hidden || undefined}>
        {client.address.locality}
      </li>
      {areas.map((area) => (
        <li key={`${hidden ? 'dup' : 'run'}-${area.slug}`} aria-hidden={hidden || undefined}>
          {area.name}
        </li>
      ))}
    </>
  );

  return (
    <div className="marquee area-marquee">
      <ol
        className="marquee-track area-run"
        style={{ '--marquee-duration': `${(areas.length + 1) * 3.4}s` } as React.CSSProperties}
      >
        {run(false)}
        {run(true)}
      </ol>
    </div>
  );
}
