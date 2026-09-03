import { z } from 'zod';
import {
  URGENCIES,
  ROOF_TYPES,
  SERVICE_IDS,
  LOCALES,
  MAX_PHOTOS,
  MAX_PHOTO_BYTES,
  ACCEPTED_PHOTO_TYPES,
  MIN_FILL_MS,
} from './fields';

export { URGENCIES, ROOF_TYPES, SERVICE_IDS, MAX_PHOTOS, MAX_PHOTO_BYTES, ACCEPTED_PHOTO_TYPES, MIN_FILL_MS };

/**
 * The enquiry schema — one definition, used on the client and on the server.
 *
 * Section 12.2 requires exactly that: the same rules in both places. Not
 * because client validation is trusted (it never is; the server re-parses
 * every field), but because two schemas drift, and the day they do, a visitor
 * fills in a form that passes in the browser and is rejected on submit with no
 * field to point at.
 *
 * Error messages live in the message catalogues and are resolved by key, so a
 * French visitor gets a French error from the same schema.
 */

export type Urgency = (typeof URGENCIES)[number];
export type RoofType = (typeof ROOF_TYPES)[number];

/**
 * Luxembourg postal codes are four digits, optionally prefixed with "L-".
 * Kept deliberately loose: a neighbour in Arlon or Trier is a legitimate
 * enquiry, and a rejected form is worse than a postcode we have to read.
 */
const postalCode = z
  .string()
  .trim()
  .min(4, 'errors.postalCode')
  .max(12, 'errors.postalCode');

export const inquirySchema = z.object({
  name: z.string().trim().min(2, 'errors.name').max(120, 'errors.nameLong'),

  email: z.string().trim().toLowerCase().email('errors.email').max(180, 'errors.email'),

  /* Optional, but the single field that most shortens time to a real answer. */
  phone: z
    .string()
    .trim()
    .max(40, 'errors.phone')
    .optional()
    .or(z.literal('')),

  urgency: z.enum(URGENCIES, { message: 'errors.urgency' }),

  service: z.enum(SERVICE_IDS, { message: 'errors.service' }),

  roofType: z.enum(ROOF_TYPES).optional().or(z.literal('')),

  postalCode,

  locality: z.string().trim().min(2, 'errors.locality').max(120, 'errors.locality'),

  message: z.string().trim().min(20, 'errors.messageShort').max(4000, 'errors.messageLong'),

  /* Section 14: consent is legally load-bearing and its timestamp is stored. */
  consent: z.literal(true, { message: 'errors.consent' }),

  locale: z.enum(LOCALES),

  /** Which page the visitor came from, for the notification mail. */
  sourcePage: z.string().max(300).optional(),

  /*
    Bot defences, section 12.2. No reCAPTCHA: it is a GDPR problem and a
    usability one, and it fails hardest for exactly the visitors this site
    cannot afford to lose.

    `website` is a honeypot — invisible and never focusable, so only a script
    fills it. `startedAt` carries the moment the form was rendered; a genuine
    person needs longer than three seconds to complete this.
  */
  website: z.literal('').optional(),
  startedAt: z.number().int().positive(),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;

export function looksAutomated(input: { website?: string; startedAt: number }): boolean {
  if (input.website) return true;
  return Date.now() - input.startedAt < MIN_FILL_MS;
}

/**
 * Validates a single file before it is resized or uploaded.
 * Returns a message key, or null when the file is acceptable.
 */
export function validatePhoto(file: { type: string; size: number }): string | null {
  if (!(ACCEPTED_PHOTO_TYPES as readonly string[]).includes(file.type)) return 'errors.photoType';
  if (file.size > MAX_PHOTO_BYTES) return 'errors.photoSize';
  return null;
}
