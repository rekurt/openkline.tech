import { describe, it, expect } from 'vitest';
import { PROJECT } from './project.js';
import { METRIC_FIELDS, FALLBACK_METRICS } from './metrics.js';
import {
  OVERLAYS, SUBPANE_INDICATORS, DRAWING_TOOLS,
  INDICATOR_COUNT, DRAWING_TOOL_COUNT, FEATURES,
  featuresByStatus, STATUS_ORDER,
} from './features.js';
import { ROUTE_DEFS, PATH_TO_ROUTE, ROUTE_TO_PATH } from './routes.js';
import { EXAMPLES, EXAMPLE_IDS, EXAMPLE_BY_ID } from './examples.js';
import {
  BENCHMARK_LATEST, BENCHMARK_HISTORY, BENCHMARK_OPERATIONS,
  BENCHMARK_DATASETS, RESULT_FIELDS, ENV_FIELDS, STALENESS_DAYS,
  hasResults, isStale, validateResult, validateEnvironment,
} from './benchmarks.js';

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

  it('STATUS_ORDER contains all four statuses', () => {
    expect(STATUS_ORDER).toEqual(['available', 'experimental', 'planned', 'sponsored']);
  });

  it('featuresByStatus returns only features with that status', () => {
    const available = featuresByStatus('available');
    expect(available.length).toBeGreaterThan(0);
    for (const f of available) {
      expect(f.status).toBe('available');
    }
    const planned = featuresByStatus('planned');
    for (const f of planned) {
      expect(f.status).toBe('planned');
    }
  });

  it('featuresByStatus covers all features across all statuses', () => {
    const all = STATUS_ORDER.flatMap((s) => featuresByStatus(s));
    expect(all.length).toBe(FEATURES.length);
  });

  it('planned features have no docs or example links', () => {
    const planned = featuresByStatus('planned');
    for (const f of planned) {
      expect(f.docs).toBeFalsy();
      expect(f.example).toBeFalsy();
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

  it('has roadmap route', () => {
    const ids = ROUTE_DEFS.map((r) => r.id);
    expect(ids).toContain('roadmap');
    expect(PATH_TO_ROUTE['/roadmap']).toBe('roadmap');
    expect(ROUTE_TO_PATH['roadmap']).toBe('/roadmap');
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

// ---------------------------------------------------------------------------
// benchmarks.js
// ---------------------------------------------------------------------------
describe('BENCHMARKS data contract', () => {
  it('BENCHMARK_LATEST has required shape', () => {
    expect(BENCHMARK_LATEST).toHaveProperty('results');
    expect(BENCHMARK_LATEST).toHaveProperty('status');
    expect(BENCHMARK_LATEST).toHaveProperty('statusMessage');
    expect(Array.isArray(BENCHMARK_LATEST.results)).toBe(true);
  });

  it('BENCHMARK_HISTORY has runs array', () => {
    expect(BENCHMARK_HISTORY).toHaveProperty('runs');
    expect(Array.isArray(BENCHMARK_HISTORY.runs)).toBe(true);
  });

  it('BENCHMARK_OPERATIONS has 12 operations', () => {
    expect(BENCHMARK_OPERATIONS).toHaveLength(12);
  });

  it('every operation has id and label', () => {
    for (const op of BENCHMARK_OPERATIONS) {
      expect(op.id).toBeTruthy();
      expect(op.label).toBeTruthy();
    }
  });

  it('no duplicate operation ids', () => {
    const ids = BENCHMARK_OPERATIONS.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('BENCHMARK_DATASETS has 3 sizes', () => {
    expect(BENCHMARK_DATASETS).toHaveLength(3);
    for (const ds of BENCHMARK_DATASETS) {
      expect(ds.count).toBeGreaterThan(0);
      expect(ds.label).toBeTruthy();
      expect(ds.description).toBeTruthy();
    }
  });

  it('RESULT_FIELDS contains required percentiles', () => {
    expect(RESULT_FIELDS).toContain('p50');
    expect(RESULT_FIELDS).toContain('p95');
    expect(RESULT_FIELDS).toContain('p99');
    expect(RESULT_FIELDS).toContain('mean');
  });

  it('ENV_FIELDS contains browser, os, device', () => {
    expect(ENV_FIELDS).toContain('browser');
    expect(ENV_FIELDS).toContain('os');
    expect(ENV_FIELDS).toContain('device');
  });

  it('STALENESS_DAYS is 90', () => {
    expect(STALENESS_DAYS).toBe(90);
  });

  it('hasResults returns false for pending status', () => {
    expect(hasResults()).toBe(false);
  });

  it('isStale returns false for null date', () => {
    expect(isStale(null)).toBe(false);
  });

  it('isStale returns true for old dates', () => {
    expect(isStale('2020-01-01T00:00:00Z')).toBe(true);
  });

  it('isStale returns false for recent dates', () => {
    const recent = new Date();
    recent.setDate(recent.getDate() - 10);
    expect(isStale(recent.toISOString())).toBe(false);
  });

  it('validateResult accepts valid result', () => {
    expect(validateResult({ p50: 1, p95: 2, p99: 3, mean: 1.5, min: 0.5, max: 4 })).toBe(true);
  });

  it('validateResult rejects incomplete result', () => {
    expect(validateResult({ p50: 1 })).toBe(false);
    expect(validateResult(null)).toBe(false);
  });

  it('validateEnvironment accepts valid env', () => {
    expect(validateEnvironment({ browser: 'Chromium 128', os: 'macOS 14.5', device: 'M2' })).toBe(true);
  });

  it('validateEnvironment rejects incomplete env', () => {
    expect(validateEnvironment({ browser: 'Chromium' })).toBe(false);
    expect(validateEnvironment(null)).toBe(false);
  });

  it('routes include benchmarks', () => {
    const ids = ROUTE_DEFS.map((r) => r.id);
    expect(ids).toContain('benchmarks');
    expect(PATH_TO_ROUTE['/benchmarks']).toBe('benchmarks');
    expect(ROUTE_TO_PATH['benchmarks']).toBe('/benchmarks');
  });
});
