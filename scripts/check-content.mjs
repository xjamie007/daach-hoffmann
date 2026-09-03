#!/usr/bin/env node
/**
 * Word-count gate for the long-form pages.
 *
 * Section 7.2 requires at least 600 words of original text on every service
 * page, and section 6 at least 250 on every municipality page — in each of the
 * three languages. Thin pages are the incumbent site's core SEO problem
 * (section 3.2: "three to four paragraphs per sub-page, the rest duplicated"),
 * so the replacement should not be able to regress into the same shape
 * unnoticed.
 *
 * Counting is done on the source rather than the rendered page so a language
 * that has fallen behind shows up before it is built, not after.
 *
 * Run: npm run check:content
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const LOCALES = ['de', 'fr', 'en'];

const TARGETS = [
  { dir: 'src/content/services', minimum: 600, label: 'Leistungsseiten (7.2)' },
  { dir: 'src/content/regions', minimum: 250, label: 'Standortseiten (6)' },
  { dir: 'src/content/pages', minimum: 250, label: 'Weitere Seiten' },
];

/**
 * Pulls every string literal that sits directly behind a locale key.
 * The backreference on the opening quote keeps French apostrophes — which
 * force double quotes — from being missed, which is exactly the bug a naive
 * single-quote pattern produces.
 */
function wordsByLocale(source) {
  const counts = Object.fromEntries(LOCALES.map((l) => [l, 0]));
  const pattern = /(?:^|[\s{,])(de|fr|en):\s*(['"])((?:\\.|(?!\2).)*)\2/g;

  for (const match of source.matchAll(pattern)) {
    const [, locale, , text] = match;
    const words = text
      .replace(/\\'/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
    if (words) counts[locale] += words.split(' ').length;
  }
  return counts;
}

let failures = 0;
let checked = 0;

for (const target of TARGETS) {
  const dir = join(root, target.dir);
  if (!existsSync(dir)) continue;

  const files = readdirSync(dir).filter((f) => f.endsWith('.ts') && f !== 'types.ts' && f !== 'index.ts');
  if (files.length === 0) continue;

  console.log(`\n  ${target.label} — Minimum ${target.minimum} Wörter je Sprache\n`);

  for (const file of files.sort()) {
    const source = readFileSync(join(dir, file), 'utf8');

    // A file may declare several pages (the region files group municipalities
    // by direction). Split on the export boundary so a long entry cannot mask
    // a short one sitting next to it.
    const entries = source.split(/(?=^export const )/m).filter((part) => part.startsWith('export const '));
    if (entries.length > 1) {
      for (const entry of entries) {
        const name = entry.match(/^export const (\w+)/)?.[1] ?? file;
        // The legal notice is a table of statutory identifiers, not an article.
        // A word floor says nothing useful about it.
        if (name === 'legalNotice') continue;
        const counts = wordsByLocale(entry);
        const low = LOCALES.filter((l) => counts[l] < target.minimum);
        if (low.length) failures += 1;
        checked += 1;
        const detail = LOCALES.map((l) => `${l} ${String(counts[l]).padStart(4)}${counts[l] < target.minimum ? '!' : ' '}`).join('  ');
        console.log(`  ${low.length ? '✗' : '✓'} ${name.padEnd(16)} ${detail}`);
      }
      continue;
    }

    const counts = wordsByLocale(source);
    const low = LOCALES.filter((l) => counts[l] < target.minimum);
    if (low.length) failures += 1;
    checked += 1;

    const detail = LOCALES.map((l) => {
      const n = counts[l];
      return `${l} ${String(n).padStart(4)}${n < target.minimum ? '!' : ' '}`;
    }).join('  ');

    console.log(`  ${low.length ? '✗' : '✓'} ${file.replace(/\.ts$/, '').padEnd(16)} ${detail}`);
  }
}

console.log('');
if (checked === 0) {
  console.log('  Noch keine Inhaltsdateien vorhanden.\n');
  process.exit(0);
}
if (failures > 0) {
  console.error(`  ${failures} Seite(n) unter dem Minimum.\n`);
  process.exit(1);
}
console.log(`  Alle ${checked} Seite(n) erreichen das Minimum in allen drei Sprachen.\n`);
