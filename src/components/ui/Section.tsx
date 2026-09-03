import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'default' | 'sunken' | 'tint' | 'inverse';

/*
  Tones are translucent, and they are planes.

  Translucent because the page carries a fixed wash behind everything (see the
  Surface block in globals.css). An opaque section paints that out, and with
  every section opaque the wash existed only in the DOM. `default` adds nothing
  at all, so the ground *is* the surface; the others tint it rather than
  replace it, except `inverse`, which is meant to be a hard dark band and has
  to be solid to stay legible.

  Planes because translucency on its own was not enough. A tint with no edge is
  still a rectangle, and nine rectangles stacked on each other is a flat page
  whatever colour they are. `.plane-*` adds the lit top lip and the recess
  under it, so the sections read as courses of material rather than as bands of
  paint — the construction is documented where it is defined.
*/
const TONES: Record<Tone, string> = {
  default: 'text-ink',
  sunken: 'plane plane-light bg-surface-sunken/70 text-ink',
  tint: 'plane plane-light bg-surface-tint/60 text-ink',
  inverse: 'plane plane-dark bg-surface-inverse text-ink-inverse',
};

/**
 * A page section with its own vertical rhythm and background.
 *
 * Sections carry the background, not the cards inside them. Section 1.3 of the
 * brief names cards-inside-cards as the incumbent site's defining mistake, and
 * the reliable way to avoid it is to make sure a surface change always happens
 * at this level.
 */
export function Section({
  tone = 'default',
  tight = false,
  id,
  labelledBy,
  className,
  children,
}: {
  readonly tone?: Tone;
  readonly tight?: boolean;
  readonly id?: string;
  readonly labelledBy?: string;
  readonly className?: string;
  readonly children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        TONES[tone],
        tight ? 'py-[var(--section-y-tight)]' : 'py-[var(--section-y)]',
        className,
      )}
    >
      {children}
    </section>
  );
}
