#!/usr/bin/env node
/**
 * WCAG 2.2 contrast gate.
 *
 * Section 18 lists "contrasts pass WCAG 2.2 AA" as an acceptance criterion.
 * Checking that by eye does not work: OKLCH lightness is perceptual, WCAG
 * contrast is not, and two colours that look a comfortable distance apart can
 * still land at 4.1:1. This reads the real token file and does the arithmetic.
 *
 * Run: npm run check:contrast
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(join(root, 'src/styles/tokens.css'), 'utf8');

/** Every `--color-*` declaration, in source order. */
const raw = new Map();
for (const match of css.matchAll(/--color-([\w-]+):\s*([^;]+);/g)) {
  raw.set(match[1], match[2].trim());
}

/** Resolves `var(--color-x)` chains down to a literal oklch() value. */
function resolve(name, seen = new Set()) {
  if (seen.has(name)) throw new Error(`Circular colour reference at --color-${name}`);
  seen.add(name);
  const value = raw.get(name);
  if (!value) throw new Error(`Unknown token: --color-${name}`);
  const ref = value.match(/^var\(--color-([\w-]+)\)$/);
  return ref ? resolve(ref[1], seen) : value;
}

function parseOklch(value) {
  const m = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
  if (!m) throw new Error(`Not an oklch() value: ${value}`);
  return { L: Number(m[1]), C: Number(m[2]), h: Number(m[3]) };
}

/** OKLCH -> OKLab -> linear sRGB. Björn Ottosson's matrices. */
function oklchToLinearSrgb({ L, C, h }) {
  const hr = (h * Math.PI) / 180;
  const a = C * Math.cos(hr);
  const b = C * Math.sin(hr);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

/** WCAG relative luminance works on linear-light values, so no gamma step. */
function luminance(token) {
  const [r, g, b] = oklchToLinearSrgb(parseOklch(resolve(token)));
  const clamp = (v) => Math.min(1, Math.max(0, v));
  return 0.2126 * clamp(r) + 0.7152 * clamp(g) + 0.0722 * clamp(b);
}

function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Every pairing the site actually renders. A token pair that is not listed
 * here is a pair no component is allowed to produce.
 */
const PAIRS = [
  // [foreground, background, minimum, what it is]
  ['ink', 'surface', 4.5, 'body copy on the page'],
  ['ink', 'surface-raised', 4.5, 'body copy on a raised surface'],
  ['ink', 'surface-sunken', 4.5, 'body copy on a sunken section'],
  ['ink', 'surface-tint', 4.5, 'body copy on the tinted section'],
  ['ink-muted', 'surface-tint', 4.5, 'secondary copy on the tinted section'],
  ['accent-text', 'surface-tint', 4.5, 'links on the tinted section'],
  ['ink-muted', 'surface', 4.5, 'secondary copy'],
  ['ink-muted', 'surface-sunken', 4.5, 'secondary copy on a sunken section'],
  ['ink-subtle', 'surface', 3.0, 'captions and meta, large only'],
  ['accent-text', 'surface', 4.5, 'inline links'],
  ['accent-text', 'surface-sunken', 4.5, 'inline links on a sunken section'],
  ['on-accent', 'accent', 4.5, 'primary button label'],
  ['on-signal', 'signal', 4.5, 'emergency button label'],
  ['ink-inverse', 'surface-inverse', 4.5, 'footer copy'],
  ['ink-inverse-muted', 'surface-inverse', 4.5, 'footer secondary copy'],
  ['sky-400', 'surface-inverse', 4.5, 'links in the footer'],
  ['sky-300', 'surface-inverse', 4.5, 'eyebrows on dark sections'],
  ['red-400', 'surface-inverse', 4.5, 'emergency accent on dark'],
  ['border-strong', 'surface', 3.0, 'input borders and dividers'],
  ['focus', 'surface', 3.0, 'focus ring on light'],
  ['focus', 'surface-inverse', 3.0, 'focus ring on dark'],
  ['moss-600', 'surface', 4.5, 'success message'],
  ['red-700', 'surface', 4.5, 'form error text'],
  ['red-700', 'surface-sunken', 4.5, 'form error on a sunken section'],
];

let failures = 0;
console.log('\n  WCAG 2.2 contrast — token pairs actually rendered\n');

for (const [fg, bg, min, description] of PAIRS) {
  const ratio = contrast(fg, bg);
  const ok = ratio >= min;
  if (!ok) failures += 1;
  console.log(
    `  ${ok ? '✓' : '✗'} ${ratio.toFixed(2).padStart(5)}:1  (min ${min.toFixed(1)})  ` +
      `${fg} on ${bg}`.padEnd(42) + `${description}`,
  );
}

console.log('');
if (failures > 0) {
  console.error(`  ${failures} pairing(s) below the required ratio.\n`);
  process.exit(1);
}
console.log(`  All ${PAIRS.length} pairings pass.\n`);
