import { describe, expect, it } from 'vitest';
import { ROUTE_DEFS } from './routes.js';
import { seoMeta, seoAlternates, seoSitemap } from './seo.js';

describe('search metadata', () => {
 it('uses final URLs with reciprocal language groups and distinct translated titles', () => {
  for (const route of ROUTE_DEFS) {
   const m = seoMeta(route.id,'en');
   expect(m.canonical).toMatch(/\/$/);
   const alternatives = seoAlternates(route.id);
   expect(new Set(alternatives.map(a => a.lang)).size).toBe(alternatives.length);
   expect(alternatives.find(a => a.lang === 'en').url).toBe(m.canonical);
   if (!['docs','reference'].includes(route.id)) {
    expect(seoMeta(route.id,'ru').title).not.toBe(m.title);
    expect(seoMeta(route.id,'zh').desc).not.toBe(m.desc);
   }
  }
 });
 it('keeps incomplete translations out of indexing and hreflang', () => {
  for (const route of ROUTE_DEFS) {
   expect(seoMeta(route.id,'sn').noindex).toBe(true);
   expect(seoMeta(route.id,'sn').canonical).toBe(seoMeta(route.id,'en').canonical);
   expect(seoAlternates(route.id).some(a => a.lang === 'sn')).toBe(false);
  }
  for (const route of ['docs','reference']) {
   expect(seoMeta(route,'ru').noindex).toBe(true);
   expect(seoAlternates(route).map(a => a.lang)).toEqual(['en','x-default']);
  }
 });
 it('lists all 47 translated canonical pages and example details with language alternates', () => {
  const xml = seoSitemap();
  expect(xml.match(/<loc>/g)).toHaveLength(47);
  expect(xml).not.toContain('/sn/');
  expect(xml).not.toContain('/ru/docs/');
  expect(xml).toContain('https://openkline.tech/ru/playground/');
  expect(xml).toContain('hreflang="zh-CN"');
  expect(xml).toContain('https://openkline.tech/ru/examples/realtime/');
 });
});
