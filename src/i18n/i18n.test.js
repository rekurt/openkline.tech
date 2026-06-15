import { describe, it, expect } from 'vitest';
import en from './en.jsx';
import ru from './ru.jsx';
import zh from './zh.jsx';

const locales = { en, ru, zh };

// ---------------------------------------------------------------------------
// Structural parity — every locale has the same top-level keys
// ---------------------------------------------------------------------------
describe('i18n structural parity', () => {
  const enTopKeys = Object.keys(en).sort();

  for (const [name, dict] of Object.entries(locales)) {
    if (name === 'en') continue;
    it(`${name} has the same top-level keys as en`, () => {
      expect(Object.keys(dict).sort()).toEqual(enTopKeys);
    });
  }
});

// ---------------------------------------------------------------------------
// New landing sections exist in all locales
// ---------------------------------------------------------------------------
const requiredProductSections = [
  'problem', 'builtFor', 'pillars', 'useWhen', 'faq', 'finalCta',
];

describe('landing conversion sections present in all locales', () => {
  for (const section of requiredProductSections) {
    for (const [name, dict] of Object.entries(locales)) {
      it(`${name}.product.${section} exists`, () => {
        expect(dict.product).toHaveProperty(section);
      });
    }
  }
});

// ---------------------------------------------------------------------------
// Problem section
// ---------------------------------------------------------------------------
describe('problem section', () => {
  for (const [name, dict] of Object.entries(locales)) {
    const prob = dict.product.problem;
    it(`${name} has 4 problem cards`, () => {
      expect(prob.cards).toHaveLength(4);
    });
    it(`${name} problem cards have icon, h, p`, () => {
      for (const card of prob.cards) {
        expect(card).toHaveProperty('icon');
        expect(card).toHaveProperty('h');
        expect(card).toHaveProperty('p');
      }
    });
  }
});

// ---------------------------------------------------------------------------
// Built-for section
// ---------------------------------------------------------------------------
describe('builtFor section', () => {
  for (const [name, dict] of Object.entries(locales)) {
    const bf = dict.product.builtFor;
    it(`${name} has 4 segments`, () => {
      expect(bf.segments).toHaveLength(4);
    });
    it(`${name} segments have required fields`, () => {
      for (const seg of bf.segments) {
        expect(seg).toHaveProperty('h');
        expect(seg).toHaveProperty('pain');
        expect(seg).toHaveProperty('features');
        expect(seg).toHaveProperty('cta');
        expect(seg.ctaId || seg.ctaRoute).toBeTruthy();
      }
    });
  }
});

// ---------------------------------------------------------------------------
// Pillars section
// ---------------------------------------------------------------------------
describe('pillars section', () => {
  for (const [name, dict] of Object.entries(locales)) {
    const pil = dict.product.pillars;
    it(`${name} has 6 pillar items`, () => {
      expect(pil.items).toHaveLength(6);
    });
    it(`${name} pillar items have claim, proof, docs`, () => {
      for (const item of pil.items) {
        expect(item).toHaveProperty('claim');
        expect(item).toHaveProperty('proof');
        expect(item).toHaveProperty('docs');
      }
    });
  }
});

// ---------------------------------------------------------------------------
// Use-when section
// ---------------------------------------------------------------------------
describe('useWhen section', () => {
  for (const [name, dict] of Object.entries(locales)) {
    const uw = dict.product.useWhen;
    it(`${name} has use and other lists`, () => {
      expect(uw.use.items.length).toBeGreaterThanOrEqual(4);
      expect(uw.other.items.length).toBeGreaterThanOrEqual(3);
    });
    it(`${name} has footnote`, () => {
      expect(uw.footnote).toBeTruthy();
    });
  }
});

// ---------------------------------------------------------------------------
// FAQ section
// ---------------------------------------------------------------------------
describe('faq section', () => {
  for (const [name, dict] of Object.entries(locales)) {
    const faq = dict.product.faq;
    it(`${name} has at least 6 FAQ items`, () => {
      expect(faq.items.length).toBeGreaterThanOrEqual(6);
    });
    it(`${name} FAQ items have q and a`, () => {
      for (const item of faq.items) {
        expect(item).toHaveProperty('q');
        expect(item).toHaveProperty('a');
        expect(item.q.length).toBeGreaterThan(0);
        expect(item.a.length).toBeGreaterThan(0);
      }
    });
  }
});

// ---------------------------------------------------------------------------
// Final CTA section
// ---------------------------------------------------------------------------
describe('finalCta section', () => {
  for (const [name, dict] of Object.entries(locales)) {
    const cta = dict.product.finalCta;
    it(`${name} has h2, lede, and button labels`, () => {
      expect(cta.h2).toBeTruthy();
      expect(cta.lede).toBeTruthy();
      expect(cta.btnDemo).toBeTruthy();
      expect(cta.btnDocs).toBeTruthy();
      expect(cta.btnGithub).toBeTruthy();
    });
  }
});

// ---------------------------------------------------------------------------
// Examples section
// ---------------------------------------------------------------------------
describe('examples section', () => {
  for (const [name, dict] of Object.entries(locales)) {
    it(`${name} has examples key with 8 items`, () => {
      expect(dict.examples).toBeTruthy();
      expect(dict.examples.items).toHaveLength(8);
    });
    it(`${name} example items have id, title, desc`, () => {
      for (const item of dict.examples.items) {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('desc');
      }
    });
  }
});

// ---------------------------------------------------------------------------
// Playground section
// ---------------------------------------------------------------------------
describe('playground section', () => {
  for (const [name, dict] of Object.entries(locales)) {
    it(`${name} has playground key with required fields`, () => {
      const pg = dict.playground;
      expect(pg).toBeTruthy();
      expect(pg.h2).toBeTruthy();
      expect(pg.lede).toBeTruthy();
      expect(pg.symbol).toBeTruthy();
      expect(pg.resolution).toBeTruthy();
      expect(pg.chartType).toBeTruthy();
      expect(pg.theme).toBeTruthy();
      expect(pg.indicators).toBeTruthy();
      expect(pg.share).toBeTruthy();
      expect(pg.reset).toBeTruthy();
      expect(pg.chartTypes).toHaveProperty('candle');
      expect(pg.chartTypes).toHaveProperty('line');
      expect(pg.chartTypes).toHaveProperty('area');
      expect(pg.themes).toHaveProperty('dark');
      expect(pg.themes).toHaveProperty('light');
    });
  }
});

// ---------------------------------------------------------------------------
// Array lengths match across locales
// ---------------------------------------------------------------------------
describe('array length consistency across locales', () => {
  it('problem cards count matches', () => {
    expect(ru.product.problem.cards.length).toBe(en.product.problem.cards.length);
    expect(zh.product.problem.cards.length).toBe(en.product.problem.cards.length);
  });
  it('builtFor segments count matches', () => {
    expect(ru.product.builtFor.segments.length).toBe(en.product.builtFor.segments.length);
    expect(zh.product.builtFor.segments.length).toBe(en.product.builtFor.segments.length);
  });
  it('pillars items count matches', () => {
    expect(ru.product.pillars.items.length).toBe(en.product.pillars.items.length);
    expect(zh.product.pillars.items.length).toBe(en.product.pillars.items.length);
  });
  it('faq items count matches', () => {
    expect(ru.product.faq.items.length).toBe(en.product.faq.items.length);
    expect(zh.product.faq.items.length).toBe(en.product.faq.items.length);
  });
  it('examples items count matches', () => {
    expect(ru.examples.items.length).toBe(en.examples.items.length);
    expect(zh.examples.items.length).toBe(en.examples.items.length);
  });
  it('useWhen items count matches', () => {
    expect(ru.product.useWhen.use.items.length).toBe(en.product.useWhen.use.items.length);
    expect(zh.product.useWhen.use.items.length).toBe(en.product.useWhen.use.items.length);
    expect(ru.product.useWhen.other.items.length).toBe(en.product.useWhen.other.items.length);
    expect(zh.product.useWhen.other.items.length).toBe(en.product.useWhen.other.items.length);
  });
});

// ---------------------------------------------------------------------------
// Benchmarks section
// ---------------------------------------------------------------------------
describe('benchmarks section', () => {
  const requiredKeys = [
    'label', 'h1', 'lede', 'emptyState', 'emptySub', 'staleWarning',
    's01Label', 's01H2', 's01Lede', 's02Label', 's02H2',
    's03Label', 's03H2', 's04Label', 's04H2', 's04Lede',
    'methWarmup', 'methIsolation', 'methPercentiles', 'methEnv', 'methReproducible',
    's05Label', 's05H2', 's05Lede', 'rawToggle',
    's06Label', 's06H2', 's06HasData', 's06Empty',
    'envBrowser', 'envOs', 'envDevice', 'envVersion', 'envCommit', 'envDate',
    'colOperation', 'colMemory',
    'ctaH2', 'ctaLede', 'ctaPlayground', 'ctaDocs',
  ];

  for (const [name, dict] of Object.entries(locales)) {
    it(`${name} has benchmarks key with all required fields`, () => {
      expect(dict.benchmarks).toBeTruthy();
      for (const key of requiredKeys) {
        expect(dict.benchmarks).toHaveProperty(key);
        expect(dict.benchmarks[key]).toBeTruthy();
      }
    });
  }
});
