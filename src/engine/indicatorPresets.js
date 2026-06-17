// UI-facing indicator presets → real engine IndicatorConfig objects. Shared by
// DemoChart and the Playground so toggles map to valid configs the core accepts
// (see registry.ts IndicatorConfig union). `color` is a design-system token used
// for the toggle dot.
export const INDICATOR_PRESETS = [
  { key: 'sma20', label: 'SMA 20', color: 'var(--ind-1)', config: { type: 'sma', period: 20 } },
  { key: 'ema50', label: 'EMA 50', color: 'var(--ind-2)', config: { type: 'ema', period: 50 } },
  { key: 'bb', label: 'Bollinger', color: 'var(--ind-3)', config: { type: 'bb', period: 20, stdDev: 2 } },
  { key: 'vwap', label: 'VWAP', color: 'var(--ind-4)', config: { type: 'vwap', anchor: 'session' } },
  { key: 'rsi14', label: 'RSI 14', color: 'var(--ind-5)', config: { type: 'rsi', period: 14 } },
  { key: 'macd', label: 'MACD', color: 'var(--ember)', config: { type: 'macd', fast: 12, slow: 26, signal: 9 } },
];

const BY_KEY = Object.fromEntries(INDICATOR_PRESETS.map((p) => [p.key, p]));

/** Map an array of preset keys to engine IndicatorConfig objects (skips unknown). */
export function presetsToConfigs(keys) {
  return keys.map((k) => BY_KEY[k]?.config).filter(Boolean);
}

export function presetByKey(key) {
  return BY_KEY[key];
}
