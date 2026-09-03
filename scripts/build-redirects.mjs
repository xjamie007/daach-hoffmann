#!/usr/bin/env node
/**
 * Generates redirect documents for the incumbent site's URLs.
 *
 * Section 13.3 asks for 301s from every old URL. GitHub Pages has no redirect
 * layer, so on the static target these become HTML documents that redirect in
 * the browser instead. Written into public/, they land at the exact legacy
 * paths in the export.
 *
 * This is honestly weaker than a 301: search engines follow it, but they treat
 * it as a softer signal and the ranking history transfers less completely. On
 * a host with a redirect layer the same list in src/content/redirects.ts
 * becomes real 301s with no further work — see next.config.ts. That trade is
 * recorded in PRODUCT.md and needs deciding before the live domain moves.
 *
 * Run: npm run build:redirects  (part of `npm run build`)
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/* Kept in step with src/content/redirects.ts, which the server target reads. */
const redirects = [
  { from: '/couverture_hobscheid_luxembourg.html', to: '/fr/prestations/couverture/' },
  { from: '/ferblanterie_luxembourg.html', to: '/fr/prestations/ferblanterie/' },
  { from: '/nettoyage_toiture_luxembourg.html', to: '/fr/prestations/nettoyage/' },
  { from: '/cheminee_toiture_hobscheid.html', to: '/fr/prestations/cheminee/' },
  { from: '/depannage_toiture_luxembourg.html', to: '/fr/prestations/depannage/' },
  { from: '/nettoyage_terrasse_luxembourg.html', to: '/fr/prestations/autres/' },
  { from: '/contact_couvreur_luxembourg.html', to: '/fr/contact/' },
];

/*
  /index.html is deliberately not in the list. It is the language gateway,
  which does something better than redirecting to /de: it detects the
  visitor's language first. Overwriting it with a redirect would send every
  French-speaking existing customer to a German page.
*/

const template = (to) => `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Daach Hoffmann</title>
    <link rel="canonical" href="${to}">
    <meta name="robots" content="noindex, follow">
    <meta http-equiv="refresh" content="0; url=${to}">
    <script>location.replace(${JSON.stringify(to)});</script>
  </head>
  <body>
    <p>Cette page a déménagé. <a href="${to}">Continuer vers la nouvelle page</a>.</p>
  </body>
</html>
`;

mkdirSync(join(root, 'public'), { recursive: true });

for (const entry of redirects) {
  const target = join(root, 'public', entry.from.replace(/^\//, ''));
  writeFileSync(target, template(entry.to), 'utf8');
}

console.log(`  ${redirects.length} Weiterleitungsdokumente in public/ geschrieben.`);
