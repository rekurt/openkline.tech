import { describe, it, expect } from 'vitest';
import { PROJECT } from './project.js';
import { METRIC_FIELDS, FALLBACK_METRICS } from './metrics.js';
import {
  OVERLAYS, SUBPANE_INDICATORS, DRAWING_TOOLS,
  INDICATOR_COUNT, DRAWING_TOOL_COUNT, FEATURES,
} from './features.js';
import { ROUTE_DEFS, PATH_TO_ROUTE, ROUTE_TO_PATH } from './routes.js';
import { EXAMPLES, EXAMPLE_IDS, EXAMPLE_BY_ID } from './examples.js';

// ---------------------------------------------------------------------------
// project.js
// ---------------------------------------------------------------------------
describe('PROJECT source of truth', () => {
  it('has required identity fields', () => {
    expect(PROJECT.name).toBe('openkline');
    expect(PROJECT.license).toBe('MIT');
    expect(PROJECT.site).toMatch(/^https:\/\//);
  });

  it('has all three packages', () => {
    expect(PROJECT.packages.core).toContain('openkline-core');
    expect(PROJECT.packages.react).toContain('openkline-react');
    expect(PROJECT.packages.vue).toContain('openkline-vue');
  });

  it('install commands match package names', () => {
    for (const key of Object.keys(PROJECT.packages)) {
      expect(PROJECT.install[key]).toContain(PROJECT.packages[key]);
    }
  });

  it('has contact URLs', () => {
    expect(PROJECT.urls.github).toMatch(/^https:\/\/github\.com\//);
    expect(PROJECT.contacts.email).toContain('@');
  });
});

// ---------------------------------------------------------------------------
// metrics.js
// ---------------------------------------------------------------------------
describe('METRICS source of truth', () => {
  it('METRIC_FIELDS contains expected fields', () => {
    expect(METRIC_FIELDS).toContain('version');
    expect(METRIC_FIELDS).toContain('indicators');
    expect(METRIC_FIELDS).toContain('coreSizeGzipKb');
  });

  it('FALLBACK_METRICS has every declared field', () => {
    for (const f of METRIC_FIELDS) {
      expect(FALLBACK_METRICS).toHaveProperty(f);
    }
  });

  it('fallback indicator count matches features catalog', () => {
    expect(FALLBACK_METRICS.indicators).toBe(INDICATOR_COUNT);
  });

  it('fallback drawing tool count matches features catalog', () => {
    expect(FALLBACK_METRICS.drawingTools).toBe(DRAWING_TOOL_COUNT);
  });
});

// ---------------------------------------------------------------------------
// features.js
// ---------------------------------------------------------------------------
describe('FEATURES source of truth', () => {
  it('INDICATOR_COUNT equals overlay + subpane counts', () => {
    expect(INDICATOR_COUNT).toBe(OVERLAYS.length + SUBPANE_INDICATORS.length);
  });

  it('DRAWING_TOOL_COUNT equals catalog length', () => {
    expect(DRAWING_TOOL_COUNT).toBe(DRAWING_TOOLS.length);
  });

  it('no duplicate indicator names', () => {
    const all = [...OVERLAYS, ...SUBPANE_INDICATORS];
    expect(new Set(all).size).toBe(all.length);
  });

  it('no duplicate drawing tool names', () => {
    expect(new Set(DRAWING_TOOLS).size).toBe(DRAWING_TOOLS.length);
  });

  it('every feature has a valid status', () => {
    const validStatuses = ['available', 'experimental', 'planned', 'sponsored'];
    for (const f of FEATURES) {
      expect(validStatuses).toContain(f.status);
    }
  });

  it('available features have proof, planned features do not', () => {
    for (const f of FEATURES) {
      if (f.status === 'available') {
        expect(f.proof).toBeTruthy();
      }
      if (f.status === 'planned') {
        expect(f.proof).toBeFalsy();
      }
    }
  });

  it('covers the minimum required feature set', () => {
    const ids = FEATURES.map((f) => f.id);
    const required = [
      'realtime', 'indicators', 'drawings', 'data-transports',
      'framework-wrappers', 'state-sharing', 'theming', 'keyboard-a11y',
    ];
    for (const r of required) {
      expect(ids).toContain(r);
    }
  });
});

// ---------------------------------------------------------------------------
// routes.js
// ---------------------------------------------------------------------------
describe('ROUTES source of truth', () => {
  it('has product and developers routes', () => {
    const ids = ROUTE_DEFS.map((r) => r.id);
    expect(ids).toContain('product');
    expect(ids).toContain('developers');
  });

  it('PATH_TO_ROUTE maps / to product', () => {
    expect(PATH_TO_ROUTE['/']).toBe('product');
  });

  it('ROUTE_TO_PATH is inverse of PATH_TO_ROUTE for canonical paths', () => {
    for (const r of ROUTE_DEFS) {
      expect(ROUTE_TO_PATH[r.id]).toBe(r.path);
      expect(PATH_TO_ROUTE[r.path]).toBe(r.id);
    }
  });

  it('has examples and playground routes', () => {
    const ids = ROUTE_DEFS.map((r) => r.id);
    expect(ids).toContain('examples');
    expect(ids).toContain('playground');
  });
});

// ---------------------------------------------------------------------------
// examples.js
// ---------------------------------------------------------------------------
describe('EXAMPLES catalog', () => {
  it('has 8 examples', () => {
    expect(EXAMPLES).toHaveLength(8);
  });

  it('no duplicate example ids', () => {
    expect(EXAMPLE_IDS.size).toBe(EXAMPLES.length);
  });

  it('EXAMPLE_BY_ID maps every example', () => {
    for (const ex of EXAMPLES) {
      expect(EXAMPLE_BY_ID[ex.id]).toBe(ex);
    }
  });

  it('every example has required fields', () => {
    for (const ex of EXAMPLES) {
      expect(ex.id).toBeTruthy();
      expect(ex.featureTags.length).toBeGreaterThan(0);
      expect(ex.chart).toBeTruthy();
      expect(ex.chart.seed).toBeGreaterThan(0);
      expect(ex.code).toBeTruthy();
      expect(ex.docs).toBeTruthy();
      expect(ex.source).toContain('github.com');
    }
  });

  it('covers the required example set', () => {
    const ids = [...EXAMPLE_IDS];
    const required = ['realtime', 'indicators', 'drawings', 'state', 'theming', 'react', 'vue', 'ssr'];
    for (const r of required) {
      expect(ids).toContain(r);
    }
  });
});
