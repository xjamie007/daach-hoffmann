#!/usr/bin/env node
/**
 * JavaScript budget for the home page.
 *
 * Section 4 sets it at under 120 KB gzip. Two things make that number easy to
 * get wrong, so this measures rather than trusting the build summary:
 *
 *  · Next's "First Load JS" column is its own estimate and does not match the
 *    bytes a browser actually pulls.
 *  · The `polyfills-*.js` chunk carries `noModule`, so every browser of the
 *    last several years skips it entirely. Counting it would overstate the
 *    real payload by roughly forty kilobytes and counting nothing would
 *    understate what an old browser pays. Both numbers are reported; the
 *    budget applies to the modern one, which is what essentially every visitor
 *    to this site will load.
 *
 * Run: npm run build && npm run check:bundle
 */
import { readFileSync, existsSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'out');
const BUDGET_KB = 120;

const PAGES = [
  { label: 'Startseite', file: 'de/index.html', budget: BUDGET_KB },
  { label: 'Leistungsseite', file: 'de/leistungen/dacheindeckung/index.html', budget: null },
  { label: 'Kontakt', file: 'de/kontakt/index.html', budget: null },
];

if (!existsSync(out)) {
  console.error('\n  Kein Build gefunden. Zuerst `npm run build` ausführen.\n');
  process.exit(1);
}

let failures = 0;
console.log('\n  JavaScript je Seite, gzip\n');

for (const page of PAGES) {
  const path = join(out, page.file);
  if (!existsSync(path)) {
    console.log(`  – ${page.label}: nicht gebaut (${page.file})`);
    continue;
  }

  const html = readFileSync(path, 'utf8');
  const sources = [...new Set([...html.matchAll(/\/_next\/static\/[^"']+?\.js/g)].map((m) => m[0]))];

  let modern = 0;
  let legacyOnly = 0;

  for (const src of sources) {
    const file = join(out, src);
    if (!existsSync(file)) continue;
    const size = gzipSync(readFileSync(file), { level: 9 }).length;
    // noModule chunks are fetched only by browsers without ES modules.
    if (src.includes('polyfills')) legacyOnly += size;
    else modern += size;
  }

  const kb = modern / 1024;
  const overBudget = page.budget !== null && kb >= page.budget;
  if (overBudget) failures += 1;

  const budgetNote = page.budget !== null ? `  (Budget ${page.budget} KB)` : '';
  console.log(
    `  ${page.budget === null ? ' ' : overBudget ? '✗' : '✓'} ${page.label.padEnd(16)}` +
      `${kb.toFixed(1).padStart(6)} KB${budgetNote}` +
      `   + ${(legacyOnly / 1024).toFixed(1)} KB nur für Alt-Browser (noModule)`,
  );
}

console.log('');
if (failures > 0) {
  console.error(`  ${failures} Seite(n) über dem Budget.\n`);
  process.exit(1);
}
console.log('  Budget eingehalten.\n');
