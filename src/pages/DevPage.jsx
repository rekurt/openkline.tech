import { useState } from 'react';
import { Fragment } from 'react';
import { SegmentedControl } from '../components/SegmentedControl.jsx';
import { Badge } from '../components/Badge.jsx';
import { CodeBlock } from '../components/CodeBlock.jsx';
import { Kbd } from '../components/Kbd.jsx';

const QUICKSTART = {
  vanilla: {
    label: 'vanilla.ts',
    code: `import { OHLCVChart } from '@rekurt/openkline-core';

const chart = new OHLCVChart({
  container: document.getElementById('chart'),
  symbol: 'BTC/USDT',
  resolution: '1H',
  theme: 'auto',                  // follows prefers-color-scheme
  onError: (err) => report(err),  // structured, never swallowed
});

chart.setData(historicalCandles);

// live mode: O(1) per tick, RAF-coalesced
ws.onmessage = (e) => chart.updateLastCandle(parse(e.data));`,
  },
  react: {
    label: 'App.tsx',
    code: `import { OHLCVChart } from '@rekurt/openkline-react';

export function App({ candles }) {
  const indicators = useMemo(() => [
    { type: 'sma', period: 20 },
    { type: 'ema', period: 50 },
    { type: 'bb', period: 20, stdDev: 2 },
  ], []);

  return (
    <OHLCVChart
      symbol="BTC/USDT" resolution="1H"
      data={candles} theme="auto"
      indicators={indicators}
      onHover={(info) => setHovered(info)}
    />
  );
}`,
  },
  vue: {
    label: 'App.vue',
    code: `<script setup lang="ts">
import { OHLCVChart } from '@rekurt/openkline-vue';

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
  },
};

const OVERLAYS = ['SMA', 'EMA', 'WMA', 'HMA', 'BollingerBands', 'Keltner', 'Donchian', 'VWAP', 'PivotPoints', 'Ichimoku', 'Supertrend', 'ParabolicSAR', 'ZigZag'];
const SUBPANE = ['RSI', 'MACD', 'Stochastic', 'ATR', 'WilliamsR', 'OBV', 'ADX', 'CCI', 'MFI', 'StochRSI', 'ROC'];
const DRAWINGS = ['TrendLine', 'HorizontalLine', 'VerticalLine', 'Ray', 'Rectangle', 'FibRetracement', 'FibExtension', 'Channel', 'Arrow'];

const KEYMAP = [
  [['←', '→'], 'Pan left / right'],
  [['↑', '↓'], 'Zoom in / out (also + / -)'],
  [['Home', 'End'], 'Jump to oldest / newest candle'],
  [['0'], 'Reset zoom'],
  [['F'], 'Fit all visible data'],
  [['T', 'H'], 'Arm trend line / horizontal line tool'],
  [['Esc'], 'Cancel active tool or drawing'],
  [['dbl-click'], 'Fit visible range'],
];

/**
 * Developers page of the openkline landing — quick start in three frameworks,
 * advantage rows with code proofs, architecture, catalogs, keyboard map, theming.
 */
export function DevPage() {
  const [fw, setFw] = useState('vanilla');
  return (
    <div>
      <section style={{ borderTop: 0 }} data-num="01">
        <div className="seclabel">01 — quick start</div>
        <h2>Same engine, three ways in</h2>
        <p className="sectionLede">
          The core is pure TypeScript — the wrappers add nothing but idiomatic bindings.
          Switch frameworks without touching chart logic.
        </p>
        <div className="tl-qs">
          <div className="tl-qs-head">
            <SegmentedControl
              size="sm"
              options={[
                { value: 'vanilla', label: 'Vanilla TS' },
                { value: 'react', label: 'React 18/19' },
                { value: 'vue', label: 'Vue 3' },
              ]}
              value={fw}
              onChange={setFw}
            />
            <span className="lab">{QUICKSTART[fw].label} · full API parity</span>
          </div>
          <CodeBlock>{QUICKSTART[fw].code}</CodeBlock>
        </div>
      </section>

      <section data-num="02">
        <div className="seclabel">02 — why devs pick openkline</div>
        <h2>Every claim, backed by a mechanism</h2>
        <p className="sectionLede">Not adjectives — data structures, complexity bounds and state machines you can read in the source.</p>
        <div className="tl-adv">
          <div className="tl-advrow">
            <div className="txt">
              <span className="k">realtime path</span>
              <h3>O(1) per tick, no GC churn</h3>
              <p>
                Candles live in a <code>Float64Array</code>-backed ring buffer. <code>append</code> and{' '}
                <code>updateLast</code> are O(1); history pages in via amortized-O(1) <code>prepend</code>.
                Ticks are RAF-coalesced by <code>CandleMerger</code>, and a three-layer canvas means a crosshair
                move never repaints the candles.
              </p>
              <div className="metrics">
                <span><b>O(1)</b> append / updateLast</span>
                <span><b>3</b> canvas layers</span>
                <span><b>~0 cost</b> static frame</span>
              </div>
            </div>
            <div className="proof">
              <CodeBlock title="live.ts" size="sm">{`// 500ms ticks, 100k-candle buffer — no rebuilds
setInterval(() => {
  chart.updateLastCandle(latest);   // O(1)
}, 500);

// page in older history on left-edge scroll
new OHLCVChart({
  onLoadMoreHistory: async (buf) => {
    const older = await fetchBefore(buf.firstTime());
    chart.prependHistory(older);    // amortized O(1)
  },
  maxCandles: 50_000,               // bounded memory
});`}</CodeBlock>
            </div>
          </div>

          <div className="tl-advrow">
            <div className="txt">
              <span className="k">declarative api</span>
              <h3>Indicators are config, not classes</h3>
              <p>
                App code never calls <code>new SMA(20)</code>. Pass a config array; the core diffs it
                (<code>diffIndicatorConfigs</code>) and reconciles — reference-stable arrays skip recomputation
                entirely. The same objects round-trip through <code>saveLayoutState</code>.
              </p>
              <div className="metrics">
                <span><b>30+</b> indicator types</span>
                <span><b>0</b> manual instances</span>
                <span><b>diffed</b> on every render</span>
              </div>
            </div>
            <div className="proof">
              <CodeBlock title="indicators.ts" size="sm">{`chart.setIndicatorConfigs([
  { type: 'sma', period: 20 },
  { type: 'bb', period: 20, stdDev: 2 },
  { type: 'vwap', anchor: { type: 'anchored', t: anchorTs } },
  { type: 'rsi', period: 14 },   // gets its own sub-pane
  { type: 'macd', fast: 12, slow: 26, signal: 9 },
]);

// custom indicator? subclass Indicator and register.`}</CodeBlock>
            </div>
          </div>

          <div className="tl-advrow">
            <div className="txt">
              <span className="k">transports</span>
              <h3>Any data source in four methods</h3>
              <p>
                Implement <code>DataTransport</code> and you're live. <code>DataFeed</code> guards against
                stale responses with a version counter — a mid-fetch symbol switch can't render the wrong data.
                Reconnects use jittered exponential backoff. Errors flow through <code>onError</code>, never
                a silent catch.
              </p>
              <div className="metrics">
                <span><b>4</b> methods to implement</span>
                <span><b>jittered</b> backoff built in</span>
                <span><b>0</b> silent catches</span>
              </div>
            </div>
            <div className="proof">
              <CodeBlock title="transport.ts" size="sm">{`class BinanceTransport implements DataTransport {
  async fetchHistory(req) {
    const r = await fetch(klinesUrl(req));
    return r.json();              // ascending by time
  }
  subscribe(cfg, onUpdate) {
    this.ws = new WebSocket(streamUrl(cfg.symbol));
    this.ws.onmessage = (e) => onUpdate([parse(e.data)]);
  }
  unsubscribe() { this.ws?.close(); }
  destroy()     { this.ws?.close(); }
}`}</CodeBlock>
            </div>
          </div>

          <div className="tl-advrow">
            <div className="txt">
              <span className="k">state</span>
              <h3>The whole chart fits in a URL</h3>
              <p>
                <code>saveLayoutState()</code> serializes symbol, resolution, chart type, theme, indicators and
                drawings into a compact object. <code>loadState</code> validates untrusted input and runs schema
                migrations, so old links keep working after upgrades. Drawings are anchored in buffer space —
                they stick to their candles through pan and zoom.
              </p>
              <div className="metrics">
                <span><b>1</b> query param</span>
                <span><b>migrated</b> schemas</span>
                <span><b>validated</b> untrusted input</span>
              </div>
            </div>
            <div className="proof">
              <CodeBlock title="share.ts" size="sm">{`// share
const state = chart.saveLayoutState();
const url = origin + '?state=' +
  btoa(JSON.stringify(state));

// restore — validated + schema-migrated
const param = new URLSearchParams(location.search)
  .get('state');
if (param) chart.loadState(JSON.parse(atob(param)));`}</CodeBlock>
            </div>
          </div>
        </div>
      </section>

      <section data-num="03">
        <div className="seclabel">03 — architecture</div>
        <h2>Three subsystems, no magic</h2>
        <div className="tl-features cols3">
          <div className="tl-feature">
            <h3>Rendering</h3>
            <ul>
              <li>Hi-DPI canvas, three-layer split: chart / UI / interaction</li>
              <li>Dirty-flag RAF — static chart costs ~0 between frames</li>
              <li>Sub-pixel <code>fitAll</code> with per-column conflation</li>
              <li>Multi-pane: sub-pane indicators get auto-sized bands + own Y-axes</li>
              <li>Candles, line, area, OHLC bars, first-class Heikin-Ashi</li>
            </ul>
          </div>
          <div className="tl-feature">
            <h3>Data layer</h3>
            <ul>
              <li><code>CandleBuffer</code> — <code>Float64Array</code>, O(1) append, amortized-O(1) prepend</li>
              <li><code>CandleMerger</code> — RAF-coalesced tick merging</li>
              <li><code>DataFeed</code> — stale-response version counter</li>
              <li><code>ExponentialBackoff</code> — jittered reconnects</li>
              <li><code>validateCandles</code> — runtime invariant checks</li>
            </ul>
          </div>
          <div className="tl-feature">
            <h3>Interaction</h3>
            <ul>
              <li><code>KeyboardController</code> — full keyboard navigation</li>
              <li><code>autoFollow</code> state machine — live edge tracking</li>
              <li>Momentum pan that respects <code>prefers-reduced-motion</code></li>
              <li>Trackpad-aware wheel: horizontal pans, vertical zooms</li>
              <li>Touch: one-finger pan, two-finger pinch</li>
            </ul>
          </div>
        </div>
      </section>

      <section data-num="04">
        <div className="seclabel">04 — what's in the box</div>
        <h2>Indicators & drawing tools</h2>
        <div className="tl-chipgroup">
          <span className="k">overlay — main pane</span>
          <div className="tl-chips">
            {OVERLAYS.map((n) => (
              <span className="tl-chip" key={n}><span className="dot" style={{ background: 'var(--ind-1)' }}></span>{n}</span>
            ))}
          </div>
        </div>
        <div className="tl-chipgroup">
          <span className="k">sub-pane — independent y-axis</span>
          <div className="tl-chips">
            {SUBPANE.map((n) => (
              <span className="tl-chip" key={n}><span className="dot" style={{ background: 'var(--ind-2)' }}></span>{n}</span>
            ))}
          </div>
        </div>
        <div className="tl-chipgroup" style={{ marginBottom: 0 }}>
          <span className="k">drawings — anchored in buffer space, survive zoom</span>
          <div className="tl-chips">
            {DRAWINGS.map((n) => (
              <span className="tl-chip" key={n}><span className="dot" style={{ background: 'var(--ember)' }}></span>{n}</span>
            ))}
            <span className="tl-chip" style={{ color: 'var(--text-muted)' }}>+ subclass <code>Drawing</code> for your own</span>
          </div>
        </div>
      </section>

      <section data-num="05">
        <div className="seclabel">05 — keyboard-first</div>
        <h2>Hands stay on the keys</h2>
        <p className="sectionLede">
          Full chart control without a mouse — a pillar, not an afterthought. <Badge tone="bull">a11y</Badge>
        </p>
        <table className="tl-kbdtable">
          <tbody>
            {KEYMAP.map(([keys, action]) => (
              <tr key={action}>
                <td>
                  <span className="keys">
                    {keys.map((k, i) => (
                      <Fragment key={k}>
                        {i > 0 ? ' ' : ''}<Kbd>{k}</Kbd>
                      </Fragment>
                    ))}
                  </span>
                </td>
                <td>{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section data-num="06">
        <div className="seclabel">06 — theming</div>
        <h2>Ten tokens, any brand</h2>
        <div className="tl-codegrid">
          <div>
            <p className="sectionLede" style={{ marginBottom: 16 }}>
              <code>dark</code>, <code>light</code> or <code>auto</code> built in — or pass a full{' '}
              <code>ThemeColors</code> object and the chart is yours. Custom <code>priceFormat</code> /{' '}
              <code>volumeFormat</code> hooks cover locale and asset quirks.
            </p>
            <CodeBlock title="modes" size="sm">{`chart.setTheme('dark');   // default
chart.setTheme('light');
chart.setTheme('auto');   // prefers-color-scheme`}</CodeBlock>
          </div>
          <CodeBlock title="custom-theme.ts" size="sm">{`const myTheme: ThemeColors = {
  background: '#0d1117',
  bullCandle: '#26a69a',
  bearCandle: '#ef5350',
  bullVolume: 'rgba(38,166,154,0.5)',
  bearVolume: 'rgba(239,83,80,0.5)',
  grid: '#1c2128', axis: '#30363d',
  text: '#c9d1d9', crosshair: '#8b949e',
  priceLine: '#58a6ff',
};
chart.setTheme(myTheme);`}</CodeBlock>
        </div>
      </section>
    </div>
  );
}
