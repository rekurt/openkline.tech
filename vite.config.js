import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ORIGIN = 'https://openkline.tech';

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
};

function setMeta(html, route, cfg) {
  const url = `${ORIGIN}/${route}`;
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${cfg.title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${cfg.desc}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${cfg.ogTitle}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${cfg.desc}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${cfg.ogTitle}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${cfg.desc}$2`);
}

// GitHub Pages serves 404.html for unknown paths (SPA fallback) and a folder's
// index.html for /folder. We emit:
//  - dist/404.html            → SPA fallback for deep links / hashes
//  - dist/<route>/index.html  → per-route static shell with correct SEO meta,
//    so crawlers (and social unfurlers) see the right title/description even
//    before the React app hydrates over it.
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
      for (const [route, cfg] of Object.entries(ROUTES)) {
        const dir = resolve(dist, route);
        mkdirSync(dir, { recursive: true });
        writeFileSync(resolve(dir, 'index.html'), setMeta(index, route, cfg));
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), spaSeoShells()],
  base: '/',
});
