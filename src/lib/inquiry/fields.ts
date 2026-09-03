/**
 * Field vocabulary for the enquiry form.
 *
 * Dependency-free on purpose. Three separate runtimes need these exact
 * strings — the browser, the Next server action, and a Supabase edge function
 * running on Deno — and a file that imports nothing is the only kind all three
 * can agree on. `npm run check:inquiry` fails if the edge function drifts from
 * this list.
 */

export const URGENCIES = ['emergency', 'soon', 'planning'] as const;
export const ROOF_TYPES = ['tile', 'slate', 'metal', 'flat', 'unknown'] as const;
export const SERVICE_IDS = [
  'roofing',
  'sheet-metal',
  'chimney',
  'cleaning',
  'emergency',
  'other',
] as const;
export const LOCALES = ['de', 'fr', 'en'] as const;

export const MAX_PHOTOS = 5;
export const MAX_PHOTO_BYTES = 10 * 1024 * 1024;
export const MAX_PHOTO_EDGE = 2000;
export const ACCEPTED_PHOTO_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
] as const;

/** Below this, a submission is treated as automated. Section 12.2. */
export const MIN_FILL_MS = 3000;
