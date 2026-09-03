#!/usr/bin/env node
/**
 * Serves ./out exactly the way GitHub Pages does.
 *
 * Verifying against `next dev` would test a build that will never ship: the
 * dev server has a Node runtime, resolves routes dynamically and rewrites
 * trailing slashes. This serves the exported files and nothing else, so a page
 * that only works because a server was there fails here, which is the point.
 *
 * Run: npm run preview
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'out');
const port = Number(process.env.PORT ?? 4321);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

async function resolve(pathname) {
  // Reject traversal before touching the filesystem.
  const safe = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, '');
  const candidates = safe.endsWith('/')
    ? [join(root, safe, 'index.html')]
    : [join(root, safe), join(root, `${safe}.html`), join(root, safe, 'index.html')];

  for (const candidate of candidates) {
    if (!candidate.startsWith(root)) continue;
    try {
      const info = await stat(candidate);
      if (info.isFile()) return candidate;
    } catch {
      // try the next candidate
    }
  }
  return null;
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? '/', `http://localhost:${port}`);
  const file = await resolve(pathname);

  if (!file) {
    const notFound = await resolve('/404.html');
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    res.end(notFound ? await readFile(notFound) : 'Not found');
    return;
  }

  res.writeHead(200, {
    'content-type': TYPES[extname(file)] ?? 'application/octet-stream',
    'cache-control': 'no-store',
  });
  res.end(await readFile(file));
}).listen(port, () => {
  console.log(`  Static export on http://localhost:${port}  (serving ./out)`);
});
