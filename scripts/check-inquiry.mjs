#!/usr/bin/env node
/**
 * Guards against drift between the two enquiry runtimes.
 *
 * The Next app and the Supabase edge function validate the same form on
 * different runtimes — Node and Deno — and cannot share a module, because Deno
 * resolves none of the app's path aliases. The field vocabulary is therefore
 * written twice, and the failure mode if it diverges is nasty and quiet: a
 * form that passes in the browser and is rejected by the endpoint, or worse, a
 * service id the database accepts and nothing in the app can render.
 *
 * This compares the two lists directly.
 *
 * Run: npm run check:inquiry
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const source = readFileSync(join(root, 'src/lib/inquiry/fields.ts'), 'utf8');
const edge = readFileSync(join(root, 'supabase/functions/submit-inquiry/index.ts'), 'utf8');

/** Reads `const NAME = [...]` or `const NAME = <number expression>;`. */
function readConst(text, name) {
  const list = text.match(new RegExp(`const ${name}\\s*=\\s*\\[([^\\]]*)\\]`));
  if (list) {
    return list[1]
      .split(',')
      .map((entry) => entry.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean)
      .join(',');
  }
  const scalar = text.match(new RegExp(`const ${name}\\s*=\\s*([^;]+);`));
  if (!scalar) return null;
  try {
    // Only arithmetic on literals ever appears here.
    return String(Function(`"use strict";return (${scalar[1]})`)());
  } catch {
    return scalar[1].trim();
  }
}

const NAMES = [
  'URGENCIES',
  'ROOF_TYPES',
  'SERVICE_IDS',
  'LOCALES',
  'MAX_PHOTOS',
  'MAX_PHOTO_BYTES',
  'ACCEPTED_PHOTO_TYPES',
  'MIN_FILL_MS',
];

let failures = 0;
console.log('\n  Anfrage-Vokabular: App gegen Edge Function\n');

for (const name of NAMES) {
  const app = readConst(source, name);
  const fn = readConst(edge, name);
  const ok = app !== null && app === fn;
  if (!ok) failures += 1;
  console.log(`  ${ok ? '✓' : '✗'} ${name.padEnd(22)} ${ok ? app : `App: ${app}   Edge: ${fn}`}`);
}

console.log('');
if (failures > 0) {
  console.error(
    `  ${failures} Abweichung(en). src/lib/inquiry/fields.ts ist die Quelle —\n` +
      '  supabase/functions/submit-inquiry/index.ts entsprechend anpassen.\n',
  );
  process.exit(1);
}
console.log('  Beide Laufzeiten stimmen überein.\n');
