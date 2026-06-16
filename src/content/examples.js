// Example catalog — defines every example shown on /examples and /examples/:id.
// Only features with status 'available' in features.js get an example page.

import { PROJECT } from './project.js';

/**
 * Each example: id, chart config (seed/indicators/symbol/basePrice/drift),
 * code snippet, feature tags, and proof links.
 *
 * The i18n layer provides title/description per locale; this module holds
 * the structural data that doesn't change across languages.
 */
export const EXAMPLES = [
  {
    id: 'realtime',
    featureTags: ['realtime', 'data-transports'],
    chart: { seed: 42, indicators: ['sma20', 'ema50'], symbol: 'BTC/USDT · 1H', basePrice: 67000, drift: 0.03, height: 360 },
    code: `import { OHLCVChart } from '${PROJECT.packages.core}';

const chart = new OHLCVChart({
  container, symbol: 'BTC/USDT',
  resolution: '1H', theme: 'auto',
});
chart.setData(candles);

// O(1) append — no recomputation
transport.onCandle((c) => chart.appendCandle(c));
transport.onTick((t) => chart.updateLastCandle(t));`,
    docs: '/docs#live-data',
    source: `${PROJECT.urls.github}/tree/main/examples/realtime`,
  },
  {
    id: 'indicators',
    featureTags: ['indicators'],
    chart: { seed: 17, indicators: ['sma20', 'ema50', 'bb'], symbol: 'ETH/USDT · 1H', basePrice: 3100, drift: -0.01, height: 360 },
    code: `chart.setIndicatorConfigs([
  { type: 'sma', period: 20 },
  { type: 'ema', period: 50 },
  { type: 'bollinger', period: 20, stdDev: 2 },
  { type: 'rsi', period: 14 },
]);
// diffed — reference-stable arrays skip recomputation`,
    docs: '/docs#indicators',
    source: `${PROJECT.urls.github}/tree/main/examples/indicators`,
  },
  {
    id: 'drawings',
    featureTags: ['drawings'],
    chart: { seed: 31, indicators: ['ema50'], symbol: 'SOL/USDT · 4H', basePrice: 144, drift: 0.05, height: 360 },
    code: `chart.setDrawingToolConfigs([
  { type: 'TrendLine', points: [p1, p2] },
  { type: 'FibRetracement', points: [p1, p2] },
  { type: 'HorizontalLine', price: 150 },
]);
// anchored in buffer space — survive zoom and pan`,
    docs: '/docs#drawings',
    source: `${PROJECT.urls.github}/tree/main/examples/drawings`,
  },
  {
    id: 'state',
    featureTags: ['state-sharing'],
    chart: { seed: 55, indicators: ['sma20', 'vwap'], symbol: 'BTC/USDT · 1H', basePrice: 67000, drift: 0.02, height: 360 },
    code: `// Save
const state = chart.saveLayoutState();
const url = new URL(location.href);
url.searchParams.set('chart', JSON.stringify(state));

// Restore — validates untrusted input
chart.loadState(JSON.parse(params.get('chart')));`,
    docs: '/docs#state',
    source: `${PROJECT.urls.github}/tree/main/examples/state`,
  },
  {
    id: 'theming',
    featureTags: ['theming'],
    chart: { seed: 63, indicators: ['bb'], symbol: 'ETH/USDT · 4H', basePrice: 3100, drift: 0.04, height: 360 },
    code: `const chart = new OHLCVChart({
  container, symbol: 'ETH/USDT',
  resolution: '4H',
  theme: 'dark', // 'dark' | 'light' | 'auto'
  // or pass a full ThemeColors object:
  // theme: { bg: '#0a0a0a', bull: '#26a69a', ... },
  priceFormat: (v) => v.toFixed(2),
  volumeFormat: (v) => \`\${(v / 1e6).toFixed(1)}M\`,
});`,
    docs: '/docs#theming',
    source: `${PROJECT.urls.github}/tree/main/examples/theming`,
  },
  {
    id: 'react',
    featureTags: ['framework-wrappers'],
    chart: { seed: 77, indicators: ['sma20', 'ema50'], symbol: 'BTC/USDT · 1H', basePrice: 67000, drift: 0.01, height: 360 },
    code: `import { OpenKlineChart } from '${PROJECT.packages.react}';

function App() {
  return (
    <OpenKlineChart
      symbol="BTC/USDT"
      resolution="1H"
      theme="auto"
      indicators={[
        { type: 'sma', period: 20 },
        { type: 'ema', period: 50 },
      ]}
    />
  );
}`,
    docs: '/docs#quickstart',
    source: `${PROJECT.urls.github}/tree/main/packages/openkline-react`,
  },
  {
    id: 'vue',
    featureTags: ['framework-wrappers'],
    chart: { seed: 81, indicators: ['sma20', 'bb'], symbol: 'ETH/USDT · 1H', basePrice: 3100, drift: -0.02, height: 360 },
    code: `<template>
  <OpenKlineChart
    symbol="ETH/USDT"
    resolution="1H"
    theme="auto"
    :indicators="indicators"
  />
</template>

<script setup>
import { OpenKlineChart } from '${PROJECT.packages.vue}';

const indicators = [
  { type: 'sma', period: 20 },
  { type: 'bollinger', period: 20, stdDev: 2 },
];
</script>`,
    docs: '/docs#quickstart',
    source: `${PROJECT.urls.github}/tree/main/packages/openkline-vue`,
  },
  {
    id: 'ssr',
    featureTags: ['ssr-recipes'],
    chart: { seed: 91, indicators: ['ema50'], symbol: 'BTC/USDT · 1D', basePrice: 67000, drift: 0.06, height: 360 },
    code: `// Next.js — client-only mounting
import dynamic from 'next/dynamic';

const Chart = dynamic(
  () => import('${PROJECT.packages.react}')
    .then((m) => m.OpenKlineChart),
  { ssr: false }
);

export default function Page() {
  return <Chart symbol="BTC/USDT" resolution="1D" />;
}`,
    docs: '/docs#ssr',
    source: `${PROJECT.urls.github}/tree/main/examples/ssr`,
  },
];

/** Example IDs as a set for fast lookup. */
export const EXAMPLE_IDS = new Set(EXAMPLES.map((e) => e.id));

/** Lookup by id. */
export const EXAMPLE_BY_ID = Object.fromEntries(EXAMPLES.map((e) => [e.id, e]));
