import { defineConfig, createServer } from 'vite';
import { seoMeta, seoAlternates, seoSitemap } from './src/content/seo.js';
import { EXAMPLES } from './src/content/examples.js';
import { ROUTE_DEFS } from './src/content/routes.js';
import react from '@vitejs/plugin-react';
import { mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

function escapeAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function setMeta(html, route, locale, content, example) {
  const m = seoMeta(route, locale, example);
  const replace = (text, key, value) => text.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*(")`), `$1${escapeAttribute(value)}$2`);
  let result = html.replace(/<html lang="[^"]*"/, `<html lang="${locale === 'zh' ? 'zh-CN' : locale}" data-theme="dark"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttribute(m.title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${m.canonical}$2`)
    .replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>/g, '')
    .replace('<div id="root"></div>', `<div id="root">${content}</div>`);
  for (const [key,value] of Object.entries({description:m.desc,robots:m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    'og:title':m.title,'og:description':m.desc,'og:url':m.canonical,'og:locale':m.ogLocale,'twitter:title':m.title,'twitter:description':m.desc})) result = replace(result,key,value);
  const alternates = seoAlternates(route, example?.id).map(a => `<link rel="alternate" hreflang="${a.lang}" href="${a.url}" />`).join('\n');
  const schema = { '@context':'https://schema.org', '@type':'WebPage', '@id':m.canonical+'#webpage', url:m.canonical,
    name:m.title, description:m.desc, inLanguage:m.language, isPartOf:{'@id':'https://openkline.tech/#website'}};
  return result.replace('</head>', `${alternates}\n<script type="application/ld+json" data-page-schema>${JSON.stringify(schema).replaceAll('<','\\u003c')}</script>\n</head>`);
}

function spaSeoShells() {
 return {
  name: 'spa-seo-shells', apply: 'build',
  async closeBundle() {
   const dist = resolve(process.cwd(), 'dist');
   let index = readFileSync(resolve(dist, 'index.html'), 'utf8');
   // Prerendered lazy routes need their CSS before the client imports their JS.
   const styles = readdirSync(resolve(dist,'assets')).filter(name => name.endsWith('.css') && !index.includes('/assets/'+name));
   index = index.replace('</head>', styles.map(name => `<link rel="stylesheet" href="/assets/${name}" />`).join('\n') + '</head>');
   const server = await createServer({server:{middlewareMode:true},appType:'custom'});
   try {
    const { render, exampleMeta } = await server.ssrLoadModule('/src/entry-server.jsx');
    for (const locale of ['en','ru','zh','sn']) {
     for (const route of ROUTE_DEFS) {
      const path = (locale === 'en' ? '' : `/${locale}`) + (route.path === '/' ? '' : route.path);
      const dir = resolve(dist, '.' + path);
      mkdirSync(dir,{recursive:true});
      writeFileSync(resolve(dir,'index.html'),setMeta(index,route.id,locale,render(route.id,locale)));
     }
    }
    for (const locale of ['en','ru','zh','sn']) {
     for (const example of EXAMPLES) {
      const path = (locale === 'en' ? '' : `/${locale}`) + `/examples/${example.id}`;
      const dir = resolve(dist, '.' + path);
      mkdirSync(dir,{recursive:true});
      writeFileSync(resolve(dir,'index.html'),setMeta(index,'examples',locale,render('examples',locale,example.id),exampleMeta(locale,example.id)));
     }
    }
    // Unknown URLs retain SPA routing but must not become indexable home-page duplicates.
    writeFileSync(resolve(dist,'404.html'),index.replace(/(<meta name="robots" content=")[^"]*(")/, '$1noindex, follow$2'));
    writeFileSync(resolve(dist,'sitemap.xml'),seoSitemap());
   } finally { await server.close(); }
  }
 };
}

// The real engine ships only as TypeScript source in the vendored submodule
// (vendor/openkline, not published to npm). We alias the package name straight
// to its `src` entry and let esbuild/Vite transpile it — exactly what the
// engine's own examples/playground does. The core is zero-dependency and
// browser-only, so this bundles cleanly.
const CORE = resolve(process.cwd(), 'vendor/openkline/packages/core/src');
const engineAlias = [
  // ChartEngine's relative import uses the site's responsive legend adapter.
  { find: /^\.\/LegendRenderer$/, replacement: resolve(process.cwd(), 'src/engine/LegendRenderer.js') },
  { find: '@rekurt/openkline-core/indicators', replacement: resolve(CORE, 'indicators/index.ts') },
  { find: '@rekurt/openkline-core', replacement: resolve(CORE, 'index.ts') },
];

export default defineConfig({
  plugins: [react(), spaSeoShells()],
  base: '/',
  resolve: { alias: engineAlias },
});
