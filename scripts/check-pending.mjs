#!/usr/bin/env node
/**
 * Lists every unresolved client fact in the built site.
 *
 * Section 19 allows a marked placeholder where the business has not supplied a
 * value; section 18 forbids any placeholder in the production build. Those two
 * only coexist if somebody can enumerate them on demand — this does that from
 * the built output, not from a list somebody maintains by hand.
 *
 * Exit code is 0 by design: pending facts are expected before launch. Pass
 * --strict to make it fail, which is what the pre-launch check does.
 *
 * Run: npm run check:pending  ·  npm run check:pending -- --strict
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'out');
const strict = process.argv.includes('--strict');

if (!existsSync(out)) {
  console.error('\n  No build found. Run `npm run build` first.\n');
  process.exit(1);
}

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walk(full));
    else if (entry.endsWith('.html')) files.push(full);
  }
  return files;
}

const byId = new Map();
for (const file of walk(out)) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/data-pending="([^"]+)"/g)) {
    const id = match[1];
    if (!byId.has(id)) byId.set(id, new Set());
    byId.get(id).add(relative(out, file));
  }
}

console.log('\n  Facts the client still owes us (section 19)\n');

if (byId.size === 0) {
  console.log('  None. Every value in client.config.ts is filled in.\n');
  process.exit(0);
}

for (const [id, files] of [...byId].sort()) {
  console.log(`  · ${id.padEnd(28)} ${files.size} page${files.size === 1 ? '' : 's'}`);
}

console.log(`\n  ${byId.size} distinct value(s) outstanding.`);

if (strict) {
  console.error('  Strict mode: the production build must not contain placeholders.\n');
  process.exit(1);
}
console.log('  Not a failure before launch — run with --strict to gate a release.\n');
