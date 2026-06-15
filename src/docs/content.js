// openkline docs/reference content — snippets, navigation, API catalog and
// catalogs. Derived from the real engine API (github.com/rekurt/openkline).
// Code is universal; prose lives in the page components.
import { PROJECT } from '../content/project.js';

export const DOCS_NAV = [
  {
    group: 'Getting started',
    items: [
      { id: 'overview', num: '00', title: 'Overview' },
      { id: 'quickstart', num: '01', title: 'Quick start' },
      { id: 'ssr', num: '02', title: 'SSR integration' },
    ],
  },
  {
    group: 'Guides',
    items: [
      { id: 'live-data', num: '03', title: 'Live data & transports' },
      { id: 'indicators', num: '04', title: 'Indicators' },
      { id: 'drawings', num: '05', title: 'Drawing tools' },
      { id: 'theming', num: '06', title: 'Theming' },
      { id: 'state', num: '07', title: 'State & sharable links' },
      { id: 'performance', num: '08', title: 'Performance' },
    ],
  },
  {
    group: 'Reference',
    items: [
      { id: 'api', num: '09', title: 'API quick reference' },
      { id: 'shortcuts', num: '10', title: 'Keyboard shortcuts' },
    ],
  },
];

export const S = {
  install: PROJECT.install.core,

  vanilla: `import { OHLCVChart } from '${PROJECT.packages.core}';

const chart = new OHLCVChart({
  container: document.querySelector('#chart'),
  symbol: 'BTC/USDT',
  resolution: '1H',
});

chart.setData(candles);       // ascending by time
chart.updateLastCandle(tick); // O(1) per tick`,

  react: `import { OHLCVChart } from '${PROJECT.packages.react}';

export function Chart({ candles }) {
  return (
    <div style={{ height: 600 }}>
      <OHLCVChart
        symbol="BTC/USDT" resolution="1H"
        data={candles} theme="auto"
        indicators={[{ type: 'sma', period: 20 }]}
      />
    </div>
  );
}`,

  vue: `<script setup>
import { ref } from 'vue';
import { OHLCVChart } from '${PROJECT.packages.vue}';

const indicators = ref([
  { type: 'sma', period: 20 },
  { type: 'rsi', period: 14 },
]);
</script>

<template>
  <OHLCVChart
    symbol="BTC/USDT" resolution="1H"
    :data="candles" theme="auto"
    v-model:indicators="indicators"
  />
</template>`,

  next: `'use client';

import { OHLCVChart } from '${PROJECT.packages.react}';

export function Chart({ candles }) {
  return (
    <div style={{ height: 600 }}>
      <OHLCVChart symbol="BTC/USDT" resolution="1H" data={candles} />
    </div>
  );
}

// from a server component, skip the server pass entirely:
// const Chart = dynamic(() => import('./Chart').then(m => m.Chart),
//                       { ssr: false });`,

  nuxt: `<template>
  <ClientOnly>
    <OHLCVChart symbol="BTC/USDT" resolution="1H" :data="candles" />
  </ClientOnly>
</template>

<!-- or name the file Chart.client.vue -->`,

  transport: `import type { DataTransport, Candle, HistoryRequest,
              DataFeedConfig } from '${PROJECT.packages.core}';

class MyTransport implements DataTransport {
  async fetchHistory(req: HistoryRequest): Promise<Candle[]> {
    const res = await fetch(
      '/api/klines?symbol=' + req.symbol + '&from=' + req.from);
    return res.json(); // must be ascending by time
  }
  subscribe(config: DataFeedConfig, onUpdate: (c: Candle[]) => void) {
    this.ws = new WebSocket('wss://stream.example.com/' + config.symbol);
    this.ws.onmessage = (e) => onUpdate([parseCandle(e.data)]);
  }
  unsubscribe() { this.ws?.close(); }
  destroy()     { this.ws?.close(); }
}`,

  drawing: `chart.startDrawing('trendline'); // arm the tool, then route clicks:

container.addEventListener('click', (e) => {
  const vp    = chart.getViewport();
  const index = vp.xToIndex(e.offsetX);
  const price = vp.yToPrice(e.offsetY);
  chart.getDrawingLayer().addPoint({ index, price });
});`,

  indicators: `chart.setIndicatorConfigs([
  { type: 'sma', period: 20 },
  { type: 'ema', period: 50 },
  { type: 'bb',  period: 20, stdDev: 2 },
  { type: 'rsi', period: 14 },          // gets its own sub-pane
  { type: 'macd', fast: 12, slow: 26, signal: 9 },
]);`,

  persist: `// Compact layout state — fits in a URL query param.
const state = chart.saveLayoutState();
const url = location.origin + '?state=' +
            btoa(JSON.stringify(state));

// Restore on load — validated + schema-migrated:
const param = new URLSearchParams(location.search).get('state');
if (param) chart.loadState(JSON.parse(atob(param)));`,

  prepend: `new OHLCVChart({
  container, symbol, resolution,
  maxCandles: 50_000,            // bound memory; the view stays anchored
  onLoadMoreHistory: async (buffer) => {
    const before = buffer.firstTime();   // oldest candle in the buffer
    const page = await fetchOlderCandles({ endTime: before, limit: 1000 });
    const older = page.filter((c) => c.t < before); // drop duplicates
    if (older.length === 0) return;      // reached the start of history
    chart.prependHistory(older);         // amortized O(1), view preserved
  },
});`,

  gaps: `import { findGaps, resolutionToSeconds } from '${PROJECT.packages.core}';

const interval = resolutionToSeconds('1H'); // 3600, null for '1M'
if (interval) {
  for (const gap of findGaps(chart.getBuffer(), interval)) {
    console.log('missing ~' + gap.missingCount + ' candles',
                gap.fromTime, gap.toTime);
  }
}`,

  themeModes: `chart.setTheme('dark');  // default
chart.setTheme('light');
chart.setTheme('auto');  // follows prefers-color-scheme`,

  themeCustom: `import type { ThemeColors } from '${PROJECT.packages.core}';

const dim: ThemeColors = {
  background: '#0d1117',
  bullCandle: '#26a69a',
  bearCandle: '#ef5350',
  bullVolume: 'rgba(38,166,154,0.5)',
  bearVolume: 'rgba(239,83,80,0.5)',
  grid: '#1c2128', axis: '#30363d',
  text: '#c9d1d9', crosshair: '#8b949e',
  priceLine: '#58a6ff',
};
chart.setTheme(dim);`,

  format: `new OHLCVChart({
  container, symbol, resolution,
  priceFormat:  (p) => '$' + p.toLocaleString('en-US',
                  { minimumFractionDigits: 2 }),
  volumeFormat: (v) => (v / 1000).toFixed(1) + 'K',
});`,
};

export const OVERLAYS = ['SMA', 'EMA', 'WMA', 'Bollinger Bands', 'Keltner', 'Donchian',
  'PSAR', 'Supertrend', 'Ichimoku', 'VWAP', 'Anchored VWAP', 'Envelopes'];
export const SUBPANES = ['RSI', 'MACD', 'Stochastic', 'StochRSI', 'ATR', 'ADX', 'CCI',
  'MFI', 'OBV', 'ROC', 'Williams %R'];
export const TOOLS = ['trendline', 'hline', 'vline', 'rectangle', 'ray', 'fib',
  'fibext', 'channel', 'arrow'];

export const API = [
  { name: 'new OHLCVChart(options)', kind: 'constructor', sig: '(options: ChartOptions) => OHLCVChart',
    desc: 'Creates a chart in a sized container. Requires container, symbol, resolution.' },
  { name: 'setData', kind: 'method', sig: '(candles: Candle[]) => void',
    desc: 'Replaces the buffer. Input must be ascending by time.' },
  { name: 'updateLastCandle', kind: 'method', sig: '(tick: Candle) => void',
    desc: 'Per-tick update of the live candle. O(1) — never rebuild the array.' },
  { name: 'prependHistory', kind: 'method', sig: '(older: Candle[]) => void',
    desc: 'Page in older history. Amortized O(1); view and drawings stay anchored.' },
  { name: 'setIndicatorConfigs', kind: 'method', sig: '(configs: IndicatorConfig[]) => void',
    desc: 'Declarative indicator set; diffed via diffIndicatorConfigs — reference-stable arrays skip recompute.' },
  { name: 'setTheme', kind: 'method', sig: "('dark' | 'light' | 'auto' | ThemeColors) => void",
    desc: 'Built-in modes or a full ThemeColors override object.' },
  { name: 'startDrawing', kind: 'method', sig: '(tool: DrawingTool) => void',
    desc: 'Arm a drawing tool; route clicks through getViewport() + getDrawingLayer().addPoint().' },
  { name: 'saveLayoutState', kind: 'method', sig: '() => LayoutState',
    desc: 'Compact serializable state — indicators, drawings, view. Fits in a URL query param.' },
  { name: 'saveFullState', kind: 'method', sig: '() => FullState',
    desc: 'Layout state plus the candle window — for workspace saves and bug repros.' },
  { name: 'loadState', kind: 'method', sig: '(state: unknown) => void',
    desc: 'Validates untrusted input and runs schema migrations (migrateState).' },
  { name: 'getViewport', kind: 'method', sig: '() => Viewport',
    desc: 'Coordinate mapping: xToIndex(px), yToPrice(px) and back.' },
  { name: 'getBuffer', kind: 'method', sig: '() => CandleBuffer',
    desc: 'Float64Array-backed buffer. firstTime(), lastTime(), length.' },
  { name: 'onLoadMoreHistory', kind: 'option', sig: '(buffer: CandleBuffer) => Promise<void>',
    desc: 'Infinite-scroll callback. Serialized — only one call in flight at a time.' },
  { name: 'maxCandles', kind: 'option', sig: 'number',
    desc: 'Memory cap. Eviction keeps the view and drawings anchored to the same candles.' },
  { name: 'preserveView', kind: 'option', sig: 'boolean',
    desc: 'Do not jump the view to the live edge on data updates. Wrappers set this on prop changes.' },
  { name: 'priceFormat / volumeFormat', kind: 'option', sig: '(value: number) => string',
    desc: 'Custom axis and legend formatting.' },
  { name: 'findGaps', kind: 'helper', sig: '(buffer, intervalSec) => Gap[]',
    desc: 'Finds missing candles — weekend gaps, dropped ticks.' },
  { name: 'resolutionToSeconds', kind: 'helper', sig: '(res: Resolution) => number | null',
    desc: "'1H' → 3600. Returns null for calendar resolutions like '1M'." },
  { name: 'DataTransport', kind: 'interface', sig: 'fetchHistory / subscribe / unsubscribe / destroy',
    desc: 'Implement four methods to feed any source. PollingTransport and WebSocketTransport are included.' },
];

export const KIND_COLOR = {
  constructor: 'var(--ind-3)',
  method: 'var(--accent)',
  option: 'var(--ind-1)',
  helper: 'var(--ind-5)',
  interface: 'var(--ind-2)',
};

export const KEYS = [
  { keys: ['←', '→'], does: 'Pan one step left / right' },
  { keys: ['+', '−'], does: 'Zoom in / out around the crosshair' },
  { keys: ['F'], does: 'Fit all candles into the viewport' },
  { keys: ['T'], does: 'Arm the trend line' },
  { keys: ['H'], does: 'Arm the horizontal line' },
  { keys: ['R'], does: 'Arm the rectangle' },
  { keys: ['Esc'], does: 'Cancel drawing · clear selection · close menu' },
];
