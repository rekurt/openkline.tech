import { useState, Fragment } from 'react';
import { SegmentedControl } from '../components/SegmentedControl.jsx';
import { Badge } from '../components/Badge.jsx';
import { CodeBlock } from '../components/CodeBlock.jsx';
import { DemoChart } from '../components/DemoChart.jsx';
import { Kbd } from '../components/Kbd.jsx';
import { useI18n } from '../i18n/index.jsx';

// Each quick-start example renders this real chart so the snippet isn't just text.
const FW_INDICATORS = {
  vanilla: ['sma20'],
  react: ['sma20', 'ema50', 'bb'],
  vue: ['sma20', 'ema50'],
};

/* Code snippets are code — they stay identical in every locale. */
const QUICKSTART = {
  vanilla: {
    label: 'vanilla.ts',
    code: `// npm install @rekurt/openkline-core
import { OHLCVChart } from '@rekurt/openkline-core';

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
    code: `// npm install @rekurt/openkline-react
import { OHLCVChart } from '@rekurt/openkline-react';

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
// npm install @rekurt/openkline-vue
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

const PROOFS = [
  {
    title: 'live.ts',
    code: `// 500ms ticks, 100k-candle buffer — no rebuilds
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
});`,
  },
  {
    title: 'indicators.ts',
    code: `chart.setIndicatorConfigs([
  { type: 'sma', period: 20 },
  { type: 'bb', period: 20, stdDev: 2 },
  { type: 'vwap', anchor: { type: 'anchored', t: anchorTs } },
  { type: 'rsi', period: 14 },   // gets its own sub-pane
  { type: 'macd', fast: 12, slow: 26, signal: 9 },
]);

// custom indicator? subclass Indicator and register.`,
  },
  {
    title: 'transport.ts',
    code: `class BinanceTransport implements DataTransport {
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
}`,
  },
  {
    title: 'share.ts',
    code: `// share
const state = chart.saveLayoutState();
const url = origin + '?state=' +
  btoa(JSON.stringify(state));

// restore — validated + schema-migrated
const param = new URLSearchParams(location.search)
  .get('state');
if (param) chart.loadState(JSON.parse(atob(param)));`,
  },
];

const OVERLAYS = ['SMA', 'EMA', 'WMA', 'HMA', 'BollingerBands', 'Keltner', 'Donchian', 'VWAP', 'PivotPoints', 'Ichimoku', 'Supertrend', 'ParabolicSAR', 'ZigZag'];
const SUBPANE = ['RSI', 'MACD', 'Stochastic', 'ATR', 'WilliamsR', 'OBV', 'ADX', 'CCI', 'MFI', 'StochRSI', 'ROC'];
const DRAWINGS = ['TrendLine', 'HorizontalLine', 'VerticalLine', 'Ray', 'Rectangle', 'FibRetracement', 'FibExtension', 'Channel', 'Arrow'];

const KEYMAP_KEYS = [['←', '→'], ['↑', '↓'], ['Home', 'End'], ['0'], ['F'], ['T', 'H'], ['Esc'], ['dbl-click']];

/**
 * Developers page of the openkline landing — quick start in three frameworks,
 * advantage rows with code proofs, architecture, catalogs, keyboard map, theming.
 */
export function DevPage() {
  const { t } = useI18n();
  const d = t.dev;
  const [fw, setFw] = useState('vanilla');
  return (
    <div>
      <section style={{ borderTop: 0 }} data-num="01">
        <div className="seclabel">{d.s01.label}</div>
        <h2>{d.s01.h2}</h2>
        <p className="sectionLede">{d.s01.lede}</p>
        <div className="tl-codegrid">
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
              <span className="lab">{QUICKSTART[fw].label} · {d.s01.parity}</span>
            </div>
            <CodeBlock>{QUICKSTART[fw].code}</CodeBlock>
          </div>
          <DemoChart indicators={FW_INDICATORS[fw]} height={300} toggles={false} symbol="BTC/USDT · 1H" />
        </div>
      </section>

      <section data-num="02">
        <div className="seclabel">{d.s02.label}</div>
        <h2>{d.s02.h2}</h2>
        <p className="sectionLede">{d.s02.lede}</p>
        <div className="tl-adv">
          {d.adv.map((row, i) => (
            <div className="tl-advrow" key={i}>
              <div className="txt">
                <span className="k">{row.k}</span>
                <h3>{row.h}</h3>
                <p>{row.p}</p>
                <div className="metrics">
                  {row.metrics.map((m, j) => (
                    <span key={j}>{m}</span>
                  ))}
                </div>
              </div>
              <div className="proof">
                <CodeBlock title={PROOFS[i].title} size="sm">{PROOFS[i].code}</CodeBlock>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section data-num="03">
        <div className="seclabel">{d.s03.label}</div>
        <h2>{d.s03.h2}</h2>
        <div className="tl-features cols3">
          {d.arch.map((card, i) => (
            <div className="tl-feature" key={i}>
              <h3>{card.h}</h3>
              <ul>
                {card.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section data-num="04">
        <div className="seclabel">{d.s04.label}</div>
        <h2>{d.s04.h2}</h2>
        <div className="tl-chipgroup">
          <span className="k">{d.s04.overlay}</span>
          <div className="tl-chips">
            {OVERLAYS.map((n) => (
              <span className="tl-chip" key={n}><span className="dot" style={{ background: 'var(--ind-1)' }}></span>{n}</span>
            ))}
          </div>
        </div>
        <div className="tl-chipgroup">
          <span className="k">{d.s04.subpane}</span>
          <div className="tl-chips">
            {SUBPANE.map((n) => (
              <span className="tl-chip" key={n}><span className="dot" style={{ background: 'var(--ind-2)' }}></span>{n}</span>
            ))}
          </div>
        </div>
        <div className="tl-chipgroup" style={{ marginBottom: 0 }}>
          <span className="k">{d.s04.drawings}</span>
          <div className="tl-chips">
            {DRAWINGS.map((n) => (
              <span className="tl-chip" key={n}><span className="dot" style={{ background: 'var(--ember)' }}></span>{n}</span>
            ))}
            <span className="tl-chip" style={{ color: 'var(--text-muted)' }}>{d.s04.custom}</span>
          </div>
        </div>
      </section>

      <section data-num="05">
        <div className="seclabel">{d.s05.label}</div>
        <h2>{d.s05.h2}</h2>
        <p className="sectionLede">
          {d.s05.lede} <Badge tone="bull">a11y</Badge>
        </p>
        <div className="tl-scrollx">
        <table className="tl-kbdtable">
          <tbody>
            {d.keymap.map((action, i) => (
              <tr key={i}>
                <td>
                  <span className="keys">
                    {KEYMAP_KEYS[i].map((k, j) => (
                      <Fragment key={k}>
                        {j > 0 ? ' ' : ''}<Kbd>{k}</Kbd>
                      </Fragment>
                    ))}
                  </span>
                </td>
                <td>{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </section>

      <section data-num="06">
        <div className="seclabel">{d.s06.label}</div>
        <h2>{d.s06.h2}</h2>
        <div className="tl-codegrid">
          <div>
            <p className="sectionLede" style={{ marginBottom: 16 }}>{d.s06.p}</p>
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
        <div style={{ marginTop: 16 }}>
          <DemoChart indicators={['ema50', 'vwap']} height={260} symbol="BTC/USDT · 1H — toggle the site theme to repaint" />
        </div>
      </section>
    </div>
  );
}
