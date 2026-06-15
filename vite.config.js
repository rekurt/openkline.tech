import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ORIGIN = 'https://openkline.tech';
const LOCALE_PREFIXES = ['ru', 'sn', 'zh'];

// Per-route SEO: title / description / canonical / og:url + og:title.
const ROUTES = {
  developers: {
    title: 'Developers — openkline',
    desc: 'Quick start in vanilla, React and Vue, architecture, indicators, drawing tools, theming and keyboard shortcuts for the openkline charting engine.',
    ogTitle: 'openkline for developers',
  },
  docs: {
    title: 'Documentation — openkline',
    desc: 'openkline documentation: guides, live chart examples and an API quick reference for the OHLCV charting engine.',
    ogTitle: 'openkline documentation',
  },
  reference: {
    title: 'API reference — openkline',
    desc: 'Every method, option and type in @rekurt/openkline-core, plus the indicator and drawing-tool catalogs.',
    ogTitle: 'openkline API reference',
  },
  examples: {
    title: 'Examples — openkline',
    desc: 'Live examples for the openkline OHLCV charting engine: realtime data, indicators, drawing tools, state serialization, theming, React, Vue and SSR.',
    ogTitle: 'openkline examples',
  },
  playground: {
    title: 'Playground — openkline',
    desc: 'Interactive playground for the openkline charting engine. Pick a symbol, toggle indicators, switch themes and copy the generated config.',
    ogTitle: 'openkline playground',
  },
  benchmarks: {
    title: 'Benchmarks — openkline',
    desc: 'Performance benchmarks for the openkline OHLCV charting engine: setData, append, pan, zoom, indicator recompute and more.',
    ogTitle: 'openkline benchmarks',
  },
  roadmap: {
    title: 'Roadmap — openkline',
    desc: 'Feature roadmap for the openkline OHLCV charting engine: available, experimental, planned and sponsored features.',
    ogTitle: 'openkline roadmap',
  },
};

function buildHreflangTags(routePath) {
  const tags = [];
  tags.push(`<link rel="alternate" hreflang="en" href="${ORIGIN}${routePath}" />`);
  for (const loc of LOCALE_PREFIXES) {
    const locPath = routePath === '/' ? `/${loc}` : `/${loc}${routePath}`;
    tags.push(`<link rel="alternate" hreflang="${loc}" href="${ORIGIN}${locPath}" />`);
  }
  tags.push(`<link rel="alternate" hreflang="x-default" href="${ORIGIN}${routePath}" />`);
  return tags.join('\n    ');
}

function setMeta(html, fullPath, cfg, routePath) {
  const url = `${ORIGIN}${fullPath}`;
  const hreflang = buildHreflangTags(routePath);
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${cfg.title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${cfg.desc}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${cfg.ogTitle}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${cfg.desc}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${cfg.ogTitle}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${cfg.desc}$2`)
    .replace('</head>', `    ${hreflang}\n  </head>`);
}

// GitHub Pages serves 404.html for unknown paths (SPA fallback) and a folder's
// index.html for /folder. We emit:
//  - dist/404.html                      → SPA fallback for deep links / hashes
//  - dist/<route>/index.html            → per-route static shell with correct SEO meta
//  - dist/<locale>/<route>/index.html   → locale-prefixed shells (ru, sn, zh)
function spaSeoShells() {
  return {
    name: 'spa-seo-shells',
    closeBundle() {
      const dist = resolve(process.cwd(), 'dist');
      let index;
      try {
        index = readFileSync(resolve(dist, 'index.html'), 'utf8');
      } catch {
        return; // non-build command — nothing to do
      }
      writeFileSync(resolve(dist, '404.html'), index);

      // Unprefixed route shells (en locale)
      for (const [route, cfg] of Object.entries(ROUTES)) {
        const dir = resolve(dist, route);
        mkdirSync(dir, { recursive: true });
        writeFileSync(resolve(dir, 'index.html'), setMeta(index, `/${route}`, cfg, `/${route}`));
      }

      // Locale-prefixed shells
      for (const locale of LOCALE_PREFIXES) {
        // Locale root (e.g. /ru → product page)
        const locDir = resolve(dist, locale);
        mkdirSync(locDir, { recursive: true });
        const productCfg = { title: 'openkline — open-source OHLCV charting engine', desc: 'OHLCV charting engine. MIT, framework-agnostic.', ogTitle: 'openkline — Not your engine, not your charts.' };
        writeFileSync(resolve(locDir, 'index.html'), setMeta(index, `/${locale}`, productCfg, '/'));

        for (const [route, cfg] of Object.entries(ROUTES)) {
          const dir = resolve(dist, locale, route);
          mkdirSync(dir, { recursive: true });
          writeFileSync(resolve(dir, 'index.html'), setMeta(index, `/${locale}/${route}`, cfg, `/${route}`));
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), spaSeoShells()],
  base: '/',
});
