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

// Real engine catalog — mirrors the IndicatorConfig union (registry.ts) and the
// DrawingTool union (OHLCVChart.ts). 24 indicators, 14 drawing tools.
export const OVERLAYS = ['SMA', 'EMA', 'WMA', 'HMA', 'Bollinger Bands', 'Keltner',
  'Donchian', 'VWAP', 'Pivot Points', 'Ichimoku', 'Supertrend', 'Parabolic SAR', 'ZigZag'];
export const SUBPANES = ['RSI', 'MACD', 'Stochastic', 'StochRSI', 'ATR', 'ADX', 'CCI',
  'MFI', 'OBV', 'ROC', 'Williams %R'];
export const TOOLS = ['trendline', 'hline', 'vline', 'ray', 'rectangle', 'channel',
  'parallelchannel', 'fib', 'fibext', 'fibfan', 'pitchfork', 'regression', 'arrow', 'measure'];

// Enriched API model: each entry carries a one-line `desc` (used by the compact
// list in DocsPage) plus, where it helps a library consumer, a parameter table,
// return value, a runnable `example`, a `notes` aside and `seeAlso` links. The
// `anchor` is a stable slug for deep links (#api-<anchor>). Signatures track the
// real @rekurt/openkline-core surface.
export const API = [
  {
    name: 'new OHLCVChart(config)', anchor: 'constructor', kind: 'constructor',
    sig: '(config: ChartConfig) => OHLCVChart',
    desc: 'Mount a chart into a sized container. Browser-only — construct after the DOM exists.',
    params: [
      { name: 'config.container', type: 'HTMLElement', required: true, desc: 'A sized element the canvas layers mount into. Must have non-zero width/height.' },
      { name: 'config.symbol', type: 'string', required: true, desc: 'Display symbol, e.g. "BTC/USDT". Shown in the legend and saved in layout state.' },
      { name: 'config.resolution', type: 'string', required: true, desc: 'Timeframe id, e.g. "1H", "1D". Drives the time axis and gap detection.' },
      { name: 'config.theme', type: "'dark' | 'light' | 'auto' | ThemeColors", desc: 'Built-in mode or a full color override. Defaults to "dark".' },
      { name: 'config.chartType', type: 'ChartType', desc: "'candles' | 'line' | 'area' | 'ohlc' | 'heikinashi' | 'baseline'. Defaults to 'candles'." },
      { name: 'config.transport', type: 'DataTransport', desc: 'Live data source. Omit to drive the chart imperatively via setData/updateLastCandle.' },
      { name: 'config.maxCandles', type: 'number', desc: 'Memory cap; older candles evict while the view stays anchored.' },
      { name: 'config.onError', type: '(err: ChartError) => void', desc: 'Error sink. The engine never swallows errors silently — wire this in production.' },
    ],
    returns: { type: 'OHLCVChart', desc: 'The chart instance. Call destroy() on teardown.' },
    example: `import { OHLCVChart } from '@rekurt/openkline-core';

const chart = new OHLCVChart({
  container: document.getElementById('chart'),
  symbol: 'BTC/USDT',
  resolution: '1H',
  theme: 'auto',
  onError: (err) => console.error(err),
});
chart.setData(candles);`,
    notes: 'The constructor throws if document is undefined — never run it on the server. In React, build it inside useEffect and destroy() on cleanup.',
    seeAlso: ['setData', 'destroy'],
  },
  {
    name: 'setData', anchor: 'setdata', kind: 'method', sig: '(candles: Candle[], opts?: { preserveView?: boolean }) => void',
    desc: 'Replace the whole buffer. Input must be ascending by time.',
    params: [
      { name: 'candles', type: 'Candle[]', required: true, desc: 'Full dataset, oldest → newest. Each candle is { o, h, l, c, v, t } with t in Unix seconds.' },
      { name: 'opts.preserveView', type: 'boolean', desc: 'Keep the current pan/zoom instead of resetting to the live edge. Use when swapping a dataset under a stable view.' },
    ],
    returns: { type: 'void' },
    example: `chart.setData([
  { o: 42000, h: 42120, l: 41880, c: 42050, v: 1240, t: 1_700_000_000 },
  { o: 42050, h: 42300, l: 42010, c: 42210, v: 1810, t: 1_700_003_600 },
]);`,
    notes: 'Timestamps are SECONDS, not milliseconds. validateCandles enforces h ≥ max(o,c), l ≤ min(o,c), v ≥ 0.',
    seeAlso: ['updateLastCandle', 'prependHistory'],
  },
  {
    name: 'updateLastCandle', anchor: 'updatelastcandle', kind: 'method', sig: '(tick: Candle) => void',
    desc: 'Per-tick update of the live (rightmost) candle. O(1) — never rebuild the array.',
    params: [{ name: 'tick', type: 'Candle', required: true, desc: 'New state of the current candle. Same t as the last candle to update it; a newer t opens a fresh candle.' }],
    returns: { type: 'void' },
    example: `socket.onmessage = (e) => {
  const t = JSON.parse(e.data);
  chart.updateLastCandle({ o: t.o, h: t.h, l: t.l, c: t.c, v: t.v, t: t.t });
};`,
    notes: 'Coalesced to animation frames — call it as often as your feed ticks; the engine repaints at most once per frame.',
    seeAlso: ['setData'],
  },
  {
    name: 'prependHistory', anchor: 'prependhistory', kind: 'method', sig: '(older: Candle[]) => void',
    desc: 'Page in older candles at the left edge. Amortized O(1); view and drawings stay anchored.',
    params: [{ name: 'older', type: 'Candle[]', required: true, desc: 'Candles strictly older than the current oldest, ascending by time. Drop any duplicates first.' }],
    returns: { type: 'void' },
    example: `onLoadMoreHistory: async (buffer) => {
  const before = buffer.firstTime();
  const page = await fetchOlder({ endTime: before, limit: 1000 });
  chart.prependHistory(page.filter((c) => c.t < before));
}`,
    seeAlso: ['onLoadMoreHistory', 'maxCandles'],
  },
  {
    name: 'switchSymbol', anchor: 'switchsymbol', kind: 'method', sig: '(symbol: string, resolution: string) => Promise<void>',
    desc: 'Change the chart identity (symbol + timeframe), reset the view and reload via the transport.',
    params: [
      { name: 'symbol', type: 'string', required: true, desc: 'New display symbol.' },
      { name: 'resolution', type: 'string', required: true, desc: 'New timeframe id.' },
    ],
    returns: { type: 'Promise<void>', desc: 'Resolves once history for the new pair has loaded (when a transport is set).' },
    notes: 'With no transport, follow switchSymbol with a setData call carrying the new dataset, as the React/Vue wrappers do.',
    seeAlso: ['setData'],
  },
  {
    name: 'setIndicatorConfigs', anchor: 'setindicatorconfigs', kind: 'method', sig: '(configs: IndicatorConfig[]) => void',
    desc: 'Declarative indicator set. The core diffs against the previous array and reconciles — reference-stable entries skip recompute.',
    params: [{ name: 'configs', type: 'IndicatorConfig[]', required: true, desc: 'Config objects, not class instances. Sub-pane indicators (rsi, macd…) get their own auto-sized band.' }],
    returns: { type: 'void' },
    example: `chart.setIndicatorConfigs([
  { type: 'sma', period: 20 },
  { type: 'ema', period: 50 },
  { type: 'bb', period: 20, stdDev: 2 },
  { type: 'rsi', period: 14 },                 // own sub-pane
  { type: 'macd', fast: 12, slow: 26, signal: 9 },
]);`,
    notes: 'App code never calls new SMA(20). Pass the same array reference across renders and the diff is a no-op.',
    seeAlso: ['getIndicatorConfigs'],
  },
  {
    name: 'getIndicatorConfigs', anchor: 'getindicatorconfigs', kind: 'method', sig: '() => readonly IndicatorConfig[]',
    desc: 'The current indicator set — e.g. to round-trip through your own UI state.',
    returns: { type: 'readonly IndicatorConfig[]' },
    seeAlso: ['setIndicatorConfigs'],
  },
  {
    name: 'setTheme', anchor: 'settheme', kind: 'method', sig: "(theme: 'dark' | 'light' | 'auto' | ThemeColors) => void",
    desc: 'Switch between built-in modes or apply a full ThemeColors override.',
    params: [{ name: 'theme', type: "'dark' | 'light' | 'auto' | ThemeColors", required: true, desc: "'auto' follows prefers-color-scheme; an object overrides every color token." }],
    returns: { type: 'void' },
    example: `chart.setTheme('light');
chart.setTheme({
  background: '#0d1117', bullCandle: '#26a69a', bearCandle: '#ef5350',
  grid: '#1c2128', axis: '#30363d', text: '#c9d1d9',
});`,
    seeAlso: ['setChartType'],
  },
  {
    name: 'setChartType', anchor: 'setcharttype', kind: 'method', sig: '(type: ChartType) => void',
    desc: 'Switch the series type without touching data or indicators.',
    params: [{ name: 'type', type: 'ChartType', required: true, desc: "'candles' | 'line' | 'area' | 'ohlc' | 'heikinashi' | 'baseline'." }],
    returns: { type: 'void' },
    seeAlso: ['setTheme'],
  },
  {
    name: 'startDrawing', anchor: 'startdrawing', kind: 'method', sig: '(tool: DrawingTool) => void',
    desc: 'Arm a drawing tool. Subsequent clicks on the chart place its anchor points (in buffer space).',
    params: [{ name: 'tool', type: 'DrawingTool', required: true, desc: "One of 14: 'trendline' | 'hline' | 'vline' | 'ray' | 'rectangle' | 'channel' | 'parallelchannel' | 'fib' | 'fibext' | 'fibfan' | 'pitchfork' | 'regression' | 'arrow' | 'measure'." }],
    returns: { type: 'void' },
    notes: 'Drawings anchor to candles, not pixels — they stick through pan and zoom. Press Esc to cancel an armed tool.',
    seeAlso: ['getDrawings', 'clearDrawings'],
  },
  {
    name: 'getDrawings / loadDrawings / clearDrawings', anchor: 'drawings', kind: 'method',
    sig: '() => DrawingSnapshot[]  ·  (snapshots) => void  ·  () => void',
    desc: 'Snapshot, restore and clear the drawing layer — the backbone of save/share/undo.',
    returns: { type: 'DrawingSnapshot[]', desc: 'Serializable anchors you can persist and re-apply.' },
    seeAlso: ['saveLayoutState', 'startDrawing'],
  },
  {
    name: 'createPriceLine', anchor: 'createpriceline', kind: 'method', sig: '(options: PriceLineOptions) => PriceLineHandle',
    desc: 'Draw a horizontal price line (entry, stop, target) with a label. Returns a handle to update or remove it.',
    params: [{ name: 'options', type: 'PriceLineOptions', required: true, desc: '{ price, color?, title?, lineStyle? }.' }],
    returns: { type: 'PriceLineHandle', desc: 'Has remove() and update(partial).' },
    seeAlso: ['addAlert', 'setMarkers'],
  },
  {
    name: 'addAlert', anchor: 'addalert', kind: 'method', sig: '(init: AlertInit) => Alert',
    desc: 'Register a price alert; the chart renders it and fires onAlert when crossed.',
    params: [{ name: 'init', type: 'AlertInit', required: true, desc: '{ price, direction? }. Pair with the onAlert config callback.' }],
    returns: { type: 'Alert' },
    seeAlso: ['createPriceLine'],
  },
  {
    name: 'setMarkers / addMarker', anchor: 'markers', kind: 'method', sig: '(markers: Marker[]) => void  ·  (marker: Marker) => void',
    desc: 'Pin event markers (trades, signals, news) to specific candles.',
    params: [{ name: 'marker(s)', type: 'Marker | Marker[]', required: true, desc: '{ time, position, shape, text?, color? } anchored by candle time.' }],
    returns: { type: 'void' },
  },
  {
    name: 'fitAll / fitVisible / goToLive', anchor: 'view', kind: 'method', sig: '() => void',
    desc: 'View controls: frame the whole dataset, frame the visible range, or jump back to the live edge.',
    returns: { type: 'void' },
    notes: 'Mirrors the F / Fit / and auto-follow keyboard actions. goToLive re-arms auto-follow so new ticks scroll the view.',
  },
  {
    name: 'saveLayoutState', anchor: 'savelayoutstate', kind: 'method', sig: '() => LayoutState',
    desc: 'Serialize symbol, resolution, type, theme, indicators and drawings into a compact object. Fits in a URL.',
    returns: { type: 'LayoutState', desc: 'JSON-serializable; base64 it into a query param to share a view.' },
    example: `const state = chart.saveLayoutState();
location.search = '?state=' + btoa(JSON.stringify(state));`,
    seeAlso: ['loadState', 'saveFullState'],
  },
  {
    name: 'saveFullState', anchor: 'savefullstate', kind: 'method', sig: '() => FullState',
    desc: 'Layout state plus the candle window — for workspace saves and reproducible bug reports.',
    returns: { type: 'FullState' },
    seeAlso: ['saveLayoutState'],
  },
  {
    name: 'loadState', anchor: 'loadstate', kind: 'method', sig: '(state: unknown) => void',
    desc: 'Restore a saved state. Validates untrusted input and runs schema migrations, so old shared links keep working.',
    params: [{ name: 'state', type: 'unknown', required: true, desc: 'A LayoutState/FullState (possibly from an older version). Invalid input is rejected, not trusted.' }],
    returns: { type: 'void' },
    example: `const param = new URLSearchParams(location.search).get('state');
if (param) chart.loadState(JSON.parse(atob(param)));`,
    seeAlso: ['saveLayoutState'],
  },
  {
    name: 'toPNG', anchor: 'topng', kind: 'method', sig: '() => string | null',
    desc: 'Export the current chart as a PNG data URL (null if the canvas is not ready).',
    returns: { type: 'string | null' },
  },
  {
    name: 'destroy', anchor: 'destroy', kind: 'method', sig: '() => void',
    desc: 'Tear down listeners, observers and canvases. Idempotent — safe to call twice.',
    returns: { type: 'void' },
    notes: 'Call from your framework cleanup (React useEffect return, Vue onUnmounted). Safe under React StrictMode double-invoke.',
    seeAlso: ['constructor'],
  },
  {
    name: 'onLoadMoreHistory', anchor: 'onloadmorehistory', kind: 'option', sig: '(buffer: CandleBuffer) => Promise<void>',
    desc: 'Infinite-scroll callback fired near the left edge. Serialized — only one call is in flight at a time.',
    params: [{ name: 'buffer', type: 'CandleBuffer', desc: 'Read firstTime() to know where to page from.' }],
    seeAlso: ['prependHistory', 'maxCandles'],
  },
  {
    name: 'maxCandles', anchor: 'maxcandles', kind: 'option', sig: 'number',
    desc: 'Memory cap. Eviction keeps the view and drawings anchored to the same candles.',
    seeAlso: ['onLoadMoreHistory'],
  },
  {
    name: 'priceFormat / volumeFormat', anchor: 'formatters', kind: 'option', sig: '(value: number) => string',
    desc: 'Custom axis and legend formatting — locale, currency, asset precision.',
    example: `new OHLCVChart({
  container, symbol, resolution,
  priceFormat: (p) => '$' + p.toLocaleString('en-US', { minimumFractionDigits: 2 }),
  volumeFormat: (v) => (v / 1000).toFixed(1) + 'K',
});`,
  },
  {
    name: 'findGaps', anchor: 'findgaps', kind: 'helper', sig: '(buffer: CandleBuffer, intervalSec: number) => CandleGap[]',
    desc: 'Detect missing candles — weekend gaps, dropped ticks, feed outages.',
    params: [
      { name: 'buffer', type: 'CandleBuffer', required: true, desc: 'From chart.getBuffer().' },
      { name: 'intervalSec', type: 'number', required: true, desc: 'Expected spacing — use resolutionToSeconds(res).' },
    ],
    returns: { type: 'CandleGap[]', desc: 'Each { fromTime, toTime, missingCount }.' },
    seeAlso: ['resolutionToSeconds'],
  },
  {
    name: 'resolutionToSeconds', anchor: 'resolutiontoseconds', kind: 'helper', sig: '(res: string) => number | null',
    desc: "Convert a resolution id to seconds. '1H' → 3600. Null for calendar resolutions like '1M'.",
    returns: { type: 'number | null' },
    seeAlso: ['findGaps'],
  },
  {
    name: 'diffIndicatorConfigs', anchor: 'diffindicatorconfigs', kind: 'helper', sig: '(prev: IndicatorConfig[], next: IndicatorConfig[]) => IndicatorDiff',
    desc: 'The reconcile primitive setIndicatorConfigs uses — exposed for advanced hosts that manage their own indicator lifecycle.',
    returns: { type: 'IndicatorDiff', desc: '{ added, removed, kept } keyed by stable indicator id.' },
    seeAlso: ['setIndicatorConfigs'],
  },
  {
    name: 'DataTransport', anchor: 'datatransport', kind: 'interface', sig: 'fetchHistory · subscribe · unsubscribe · destroy',
    desc: 'Implement four methods to feed the chart from any source. PollingTransport and WebSocketTransport ship built in.',
    params: [
      { name: 'fetchHistory', type: '(req: HistoryRequest) => Promise<Candle[]>', desc: 'Return candles ascending by time for the requested window.' },
      { name: 'subscribe', type: '(config, onUpdate) => void', desc: 'Open a live stream; push ticks through onUpdate.' },
      { name: 'unsubscribe', type: '() => void', desc: 'Stop the live stream.' },
      { name: 'destroy', type: '() => void', desc: 'Release all resources.' },
    ],
    example: `class MyTransport implements DataTransport {
  async fetchHistory(req) {
    const r = await fetch('/api/klines?symbol=' + req.symbol + '&from=' + req.from);
    return r.json(); // ascending by time, t in seconds
  }
  subscribe(config, onUpdate) {
    this.ws = new WebSocket('wss://stream.example.com/' + config.symbol);
    this.ws.onmessage = (e) => onUpdate([parseCandle(e.data)]);
  }
  unsubscribe() { this.ws?.close(); }
  destroy() { this.ws?.close(); }
}`,
    notes: 'DataFeed guards against stale responses with a version counter — a mid-fetch symbol switch can never render the wrong data.',
  },
  {
    name: 'Candle', anchor: 'candle', kind: 'interface', sig: '{ o: number; h: number; l: number; c: number; v: number; t: number }',
    desc: 'The atomic data unit. t is a Unix timestamp in SECONDS.',
    notes: 'validateCandles rejects any candle where h < max(o,c), l > min(o,c), v < 0, or t ≤ 0.',
    seeAlso: ['setData'],
  },
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
