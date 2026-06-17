import { describe, it, expect } from 'vitest';
import { OHLCVChart } from '@rekurt/openkline-core';
import { generateCandles } from './index.js';
import { SYMBOLS } from './symbols.js';
import { RESOLUTIONS } from './resolutions.js';
import { presetsToConfigs } from './indicatorPresets.js';

// Smoke test: forces Vitest/esbuild to resolve the engine alias and transpile
// the entire core barrel (index.ts re-exports the whole public surface). If the
// vendored TS source compiles, this import graph loads without error.
describe('engine integration', () => {
  it('resolves the real core class via alias', () => {
    expect(typeof OHLCVChart).toBe('function');
  });

  it('generates deterministic candles with second-precision timestamps', () => {
    const c = generateCandles({ symbol: SYMBOLS[0], resolution: RESOLUTIONS[3], count: 50, endTime: 1_700_000_000 });
    expect(c).toHaveLength(50);
    expect(c[0].t).toBeLessThan(c[49].t); // ascending
    expect(c[49].t).toBe(1_699_999_200); // last bucket = endTime floored to the 1H grid
    expect(c[49].t % 3600).toBe(0); // aligned, seconds (not ms)
    // OHLC invariants the engine's validateCandles enforces
    for (const k of c) {
      expect(k.h).toBeGreaterThanOrEqual(Math.max(k.o, k.c));
      expect(k.l).toBeLessThanOrEqual(Math.min(k.o, k.c));
      expect(k.v).toBeGreaterThanOrEqual(0);
    }
  });

  it('maps indicator presets to valid engine configs', () => {
    const cfgs = presetsToConfigs(['sma20', 'bb', 'vwap', 'macd']);
    expect(cfgs).toEqual([
      { type: 'sma', period: 20 },
      { type: 'bb', period: 20, stdDev: 2 },
      { type: 'vwap', anchor: 'session' },
      { type: 'macd', fast: 12, slow: 26, signal: 9 },
    ]);
  });
});
