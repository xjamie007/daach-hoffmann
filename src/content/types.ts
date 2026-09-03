import type { Locale } from '@/i18n/routing';

/** Text that exists in every language the site publishes. */
export type Localized<T = string> = Readonly<Record<Locale, T>>;

/**
 * An image the business has not supplied yet.
 *
 * Section 9.4 allows a clearly marked placeholder with defined dimensions and
 * forbids stock photography outright — no smiling tradesman with a clipboard,
 * and equally no generated roof standing in for a real one. Reserving the
 * exact box the real photograph will occupy keeps the layout honest and
 * prevents the shift that would otherwise appear on the day it arrives.
 */
export interface ImageSlot {
  readonly kind: 'pending';
  readonly id: string;
  readonly width: number;
  readonly height: number;
  /** What the photograph must show, in the site's languages. */
  readonly brief: Localized;
}

/**
 * A photograph that exists, referenced by its id in the generated manifest.
 * Dimensions and available widths come from the manifest, so they cannot drift
 * from the files on disk, and the alt text comes from src/content/photos.
 */
export interface RealPhoto {
  readonly kind: 'photo';
  readonly id: string;
  /** Overrides the manifest aspect ratio when the slot needs a crop. */
  readonly aspect?: `${number}/${number}`;
}

export type SiteImage = ImageSlot | RealPhoto;
