import { describe, it, expect } from 'vitest';
import { stateToParams, stateFromParams, generateCode } from './PlaygroundPage.jsx';

describe('playground state serialization', () => {
  const DEFAULT = {
    symbol: 'BTC/USDT',
    resolution: '1H',
    chartType: 'candle',
    theme: 'dark',
    indicators: ['sma20', 'ema50'],
  };

  it('default state produces empty params', () => {
    const params = stateToParams(DEFAULT);
    expect(params.toString()).toBe('');
  });

  it('non-default symbol serializes to s param', () => {
    const params = stateToParams({ ...DEFAULT, symbol: 'ETH/USDT' });
    expect(params.get('s')).toBe('ETH/USDT');
  });

  it('non-default resolution serializes to r param', () => {
    const params = stateToParams({ ...DEFAULT, resolution: '4H' });
    expect(params.get('r')).toBe('4H');
  });

  it('non-default chartType serializes to ct param', () => {
    const params = stateToParams({ ...DEFAULT, chartType: 'line' });
    expect(params.get('ct')).toBe('line');
  });

  it('non-default theme serializes to th param', () => {
    const params = stateToParams({ ...DEFAULT, theme: 'light' });
    expect(params.get('th')).toBe('light');
  });

  it('non-default indicators serialize to ind param', () => {
    const params = stateToParams({ ...DEFAULT, indicators: ['bb', 'vwap'] });
    expect(params.get('ind')).toBe('bb,vwap');
  });

  it('stateFromParams round-trips correctly', () => {
    const original = { ...DEFAULT, symbol: 'SOL/USDT', resolution: '5m', chartType: 'area', theme: 'light', indicators: ['bb'] };
    const params = stateToParams(original);
    const restored = stateFromParams(params.toString());
    expect(restored).toEqual(original);
  });

  it('stateFromParams uses defaults for empty search', () => {
    const state = stateFromParams('');
    expect(state.symbol).toBe('BTC/USDT');
    expect(state.resolution).toBe('1H');
    expect(state.chartType).toBe('candle');
    expect(state.theme).toBe('dark');
    expect(state.indicators).toEqual(['sma20', 'ema50']);
  });

  it('stateFromParams ignores invalid values', () => {
    const state = stateFromParams('s=INVALID&r=999&ct=dots&th=neon&ind=fake');
    expect(state.symbol).toBe('BTC/USDT');
    expect(state.resolution).toBe('1H');
    expect(state.chartType).toBe('candle');
    expect(state.theme).toBe('dark');
    expect(state.indicators).toEqual([]);
  });
});

describe('playground generateCode', () => {
  it('produces valid code with indicators', () => {
    const code = generateCode({
      symbol: 'BTC/USDT',
      resolution: '1H',
      theme: 'dark',
      indicators: ['sma20', 'ema50'],
    });
    expect(code).toContain("symbol: 'BTC/USDT'");
    expect(code).toContain("resolution: '1H'");
    expect(code).toContain("type: 'sma'");
    expect(code).toContain("type: 'ema'");
    expect(code).toContain('@rekurt/openkline-core');
  });

  it('produces code without indicators section when empty', () => {
    const code = generateCode({
      symbol: 'ETH/USDT',
      resolution: '4H',
      theme: 'light',
      indicators: [],
    });
    expect(code).toContain("symbol: 'ETH/USDT'");
    expect(code).not.toContain('setIndicatorConfigs');
  });
});
