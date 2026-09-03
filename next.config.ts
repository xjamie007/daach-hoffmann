import path from 'node:path';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

/**
 * Deploy target.
 *
 * `static` (default) produces a fully pre-rendered site that runs on any file
 * host, including GitHub Pages. It is the target the client chose. Server
 * Actions, the Next.js image optimizer, middleware and HTTP redirects are all
 * unavailable there — see PRODUCT.md, "Hosting-Einschränkung GitHub Pages",
 * for how each of those is compensated for.
 *
 * `server` keeps the Node runtime and is what the briefing originally assumed.
 * Switching is a one-line environment change, not a rewrite: set
 * NEXT_PUBLIC_DEPLOY_TARGET=server.
 */
const deployTarget = process.env.NEXT_PUBLIC_DEPLOY_TARGET === 'server' ? 'server' : 'static';
const isStatic = deployTarget === 'static';

/**
 * GitHub Pages serves project sites from a sub-path (`/<repo>`) unless a custom
 * domain is configured. Both cases are supported: leave the variable empty for
 * a custom domain such as daach-hoffmann.lu, or set it to `/<repo>` otherwise.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/**
 * The enquiry form's transport is chosen here, at build time.
 *
 * It cannot be a runtime branch: Next refuses to produce a static export if a
 * 'use server' module is anywhere in the graph, however carefully the call is
 * guarded. Aliasing keeps the server-action path in the repository and out of
 * the static bundle, so switching hosts stays a one-variable change.
 */
const transportModule = isStatic
  ? './src/lib/inquiry/transport.endpoint.ts'
  : './src/lib/inquiry/transport.action.ts';

const nextConfig: NextConfig = {
  output: isStatic ? 'export' : undefined,
  basePath: basePath || undefined,
  trailingSlash: isStatic,
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    // On a static host there is no optimizer process. Responsive AVIF/WebP/JPG
    // variants are generated at build time by scripts/optimize-images.mjs and
    // served through the <Picture> component, which emits an explicit
    // <picture> element with width, height and sizes on every image.
    unoptimized: isStatic,
    formats: ['image/avif', 'image/webp'],
  },

  // Turbopack (dev, and builds when enabled) resolves the alias here.
  turbopack: {
    resolveAlias: { '@inquiry-transport': transportModule },
  },

  typescript: {
    // Type errors must fail the build. Never set this to true.
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Webpack (production builds) resolves the same alias.
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@inquiry-transport': path.resolve(process.cwd(), transportModule),
    };
    return config;
  },
};

// Redirects need a server. On the static target the same list is emitted as
// client-side redirect documents by src/app/redirects — see that directory for
// why, and PRODUCT.md for what it costs in SEO terms.
if (!isStatic) {
  nextConfig.redirects = async () => {
    const { legacyRedirects } = await import('./src/content/redirects');
    return legacyRedirects.map((entry) => ({
      source: entry.from,
      destination: entry.to,
      permanent: true,
    }));
  };
}

export default withNextIntl(nextConfig);
