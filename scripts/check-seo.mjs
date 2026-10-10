import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { JSDOM } from 'jsdom';
const root = new URL('../dist/',import.meta.url).pathname;
async function files(path) {
 const entries=await readdir(path,{withFileTypes:true});
 return (await Promise.all(entries.map(e => e.isDirectory() ? files(join(path,e.name)) : e.name.endsWith('.html') ? [join(path,e.name)] : []))).flat();
}
const indexed=new Map();
const titles=new Set();
const sitemap=await readFile(join(root,'sitemap.xml'),'utf8');
let excluded=0;
for (const file of await files(root)) {
 const path='/' + relative(root,file).replace(/index\.html$/,'');
 const fail=message => `${path}: ${message}`;
 const html=await readFile(file,'utf8');
 const dom=new JSDOM(html);
 const doc=dom.window.document;
 assert.equal(doc.querySelectorAll('meta[name="robots"]').length,1,fail('one robots directive'));
 const noindex=doc.querySelector('meta[name="robots"]').content.includes('noindex');
 if (noindex) { excluded++; assert.ok(!sitemap.includes(`<loc>https://openkline.tech${path}</loc>`),fail('noindex page excluded from sitemap')); dom.window.close(); continue; }
 assert.equal(doc.querySelectorAll('title').length,1,fail('one title'));
 assert.ok(!titles.has(doc.title),fail('unique title'));
 titles.add(doc.title);
 assert.equal(doc.querySelectorAll('h1').length,1,fail('one primary heading in static HTML'));
 assert.ok(doc.querySelector('#root').textContent.trim().length>200,fail('content without JavaScript'));
 assert.equal(doc.querySelectorAll('link[rel="canonical"]').length,1,fail('one canonical'));
 const canonical=doc.querySelector('link[rel="canonical"]').href;
 assert.equal(canonical,'https://openkline.tech'+path,fail('canonical points at final URL'));
 assert.equal(doc.querySelector('meta[property="og:title"]').content,doc.title,fail('social title matches'));
 assert.equal(doc.querySelector('meta[name="twitter:title"]').content,doc.title,fail('Twitter title matches'));
 assert.equal(doc.querySelector('meta[property="og:url"]').content,canonical,fail('social canonical matches'));
 for (const schema of doc.querySelectorAll('script[type="application/ld+json"]')) assert.ok(JSON.parse(schema.textContent)['@context'],fail('valid JSON-LD'));
 const alternates=[...doc.querySelectorAll('link[rel="alternate"][hreflang]')].map(a=>({lang:a.hreflang,url:a.href}));
 assert.equal(new Set(alternates.map(a=>a.lang)).size,alternates.length,fail('no duplicate language links'));
 assert.ok(sitemap.includes(`<loc>${canonical}</loc>`),fail('indexable URL in sitemap'));
 indexed.set(canonical,{alternates,fail});
 dom.window.close();
}
for (const [canonical,{alternates,fail}] of indexed) for (const a of alternates) {
 const target=indexed.get(a.url);
 assert.ok(target,fail('alternate exists and is indexable'));
 assert.ok(target.alternates.some(link=>link.url===canonical),fail('reciprocal alternate'));
}
assert.equal(indexed.size,47,'all translated pages and 24 example details are indexable');
console.log(`SEO verified: ${indexed.size} prerendered canonical pages; ${excluded} fallback/error pages excluded. Titles, headings, JSON-LD, hreflang and sitemap passed.`);
