import localFont from 'next/font/local';

/**
 * Both families are self-hosted. Section 9.3 forbids the Google Fonts CDN for
 * two independent reasons: it costs a third-party connection on the critical
 * path, and it hands a visitor's IP address to Google without a legal basis.
 *
 * Only the `latin` subset is shipped. It spans U+0000-00FF plus the OE ligature
 * and general punctuation, which covers every character German, French, English
 * and Luxembourgish need. latin-ext and vietnamese would add weight for glyphs
 * this site will never render.
 */

/**
 * Bricolage Grotesque — a grotesque with actual character in the wide weights
 * and an optical-size axis, so a 96px headline is not just a scaled-up 16px
 * one. Section 9.3 rules out Inter and system stacks as the brand face.
 */
export const fontHeading = localFont({
  src: [
    {
      path: '../fonts/BricolageGrotesque-normal.woff2',
      style: 'normal',
      weight: '300 800',
    },
  ],
  variable: '--ff-heading',
  display: 'swap',
  preload: true,
  // Metric-adjusted fallback: the browser renders the substitute at a corrected
  // size so the swap does not shift layout. This is a CLS measure, not a brand
  // choice — the ban on Arial concerns what the brand is set in.
  adjustFontFallback: 'Arial',
  fallback: ['Helvetica Neue', 'Helvetica', 'sans-serif'],
});

/**
 * Public Sans — quiet, wide apertures, holds up at 15px on a phone held at
 * arm's length on a roof. Shipped with its true italic, which the brief asks
 * for on the longer text pages.
 */
export const fontBody = localFont({
  src: [
    {
      path: '../fonts/PublicSans-normal.woff2',
      style: 'normal',
      weight: '300 800',
    },
    {
      path: '../fonts/PublicSans-italic.woff2',
      style: 'italic',
      weight: '300 800',
    },
  ],
  variable: '--ff-body',
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Arial',
  fallback: ['Helvetica Neue', 'Helvetica', 'sans-serif'],
});

export const fontVariables = `${fontHeading.variable} ${fontBody.variable}`;
