#!/usr/bin/env node
/**
 * Message-catalogue parity.
 *
 * Section 8 forbids shipping a language that is not finished, and section 18
 * requires all three to be complete. A missing key does not crash next-intl in
 * production — it renders the key path as visible text, which is exactly the
 * kind of defect that survives a click-through in a language nobody on the
 * team reads.
 *
 * Run: npm run check:i18n
 */
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'messages');
const REFERENCE = 'de';

function flatten(object, prefix = '') {
  const keys = new Map();
  for (const [key, value] of Object.entries(object)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      for (const [k, v] of flatten(value, path)) keys.set(k, v);
    } else {
      keys.set(path, value);
    }
  }
  return keys;
}

const catalogues = new Map();
for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
  const locale = file.replace(/\.json$/, '');
  catalogues.set(locale, flatten(JSON.parse(readFileSync(join(dir, file), 'utf8'))));
}

const reference = catalogues.get(REFERENCE);
if (!reference) {
  console.error(`  Reference catalogue messages/${REFERENCE}.json is missing.`);
  process.exit(1);
}

let failures = 0;
console.log(`\n  Message catalogues — ${reference.size} keys in ${REFERENCE} (reference)\n`);

for (const [locale, keys] of catalogues) {
  if (locale === REFERENCE) continue;

  const missing = [...reference.keys()].filter((k) => !keys.has(k));
  const extra = [...keys.keys()].filter((k) => !reference.has(k));
  // A value identical to the reference is usually a forgotten translation
  // rather than a word that genuinely coincides across languages.
  const untranslated = [...keys.entries()].filter(
    ([k, v]) => reference.get(k) === v && typeof v === 'string' && v.length > 3 && !/^[A-Z]{2,3}$/.test(v),
  );

  const ok = missing.length === 0 && extra.length === 0;
  if (!ok) failures += 1;

  console.log(`  ${ok ? '✓' : '✗'} ${locale}: ${keys.size} keys`);
  if (missing.length) console.log(`      missing (${missing.length}): ${missing.join(', ')}`);
  if (extra.length) console.log(`      not in reference (${extra.length}): ${extra.join(', ')}`);
  if (untranslated.length) {
    console.log(`      identical to ${REFERENCE} — check these are intentional (${untranslated.length}):`);
    for (const [k, v] of untranslated) console.log(`        ${k} = ${JSON.stringify(v)}`);
  }
}

console.log('');
if (failures > 0) {
  console.error('  Catalogues are out of step.\n');
  process.exit(1);
}
console.log('  All catalogues match the reference.\n');
