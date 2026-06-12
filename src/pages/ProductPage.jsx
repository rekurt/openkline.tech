import { Button } from '../components/Button.jsx';
import { Badge } from '../components/Badge.jsx';
import { CodeBlock } from '../components/CodeBlock.jsx';
import { Kbd } from '../components/Kbd.jsx';
import { CandleChart } from '../components/CandleChart.jsx';
import { LegendChip } from '../components/LegendChip.jsx';

const PLAYGROUND = 'https://rekurt.github.io/ohlcv-front/';

/**
 * Product page of the openkline landing — hero, proof strip, the four pillars,
 * developer-advantage highlights, comparison table.
 */
export function ProductPage({ onOpenDev }) {
  return (
    <div>
      <header className="tl-hero">
        <div>
          <div className="badges">
            <Badge tone="ember">MIT</Badge>
            <Badge tone="accent">TypeScript</Badge>
            <Badge>framework-agnostic</Badge>
            <Badge tone="bull" dot pill>realtime</Badge>
          </div>
          <h1>Not <em>your</em> engine, not <em>your</em> charts.</h1>
          <p className="lede">
            So own it: <code>@rekurt/openkline</code> — a TradingView-grade OHLCV charting engine. Open source, MIT, no vendor lock-in.
            Candles, 30+ indicators, anchored drawing tools and realtime transports out of the box.
            One TypeScript core; <code>react</code> and <code>vue</code> wrappers with full API parity.
          </p>
          <div className="cta">
            <Button variant="ember" size="lg" onClick={() => window.open(PLAYGROUND, '_blank')}>Open playground</Button>
            <Button size="lg" onClick={onOpenDev}>Read the docs</Button>
          </div>
          <CodeBlock prompt size="sm" copy copyText="npm install @rekurt/openkline" style={{ maxWidth: 440 }}>
            npm install @rekurt/openkline<span className="tl-cursor"></span>
          </CodeBlock>
        </div>
        <div className="tl-frame">
          <span className="corner tlc"></span><span className="corner trc"></span>
          <span className="corner blc"></span><span className="corner brc"></span>
          <div className="tl-frame-head">
            <span className="path">BTC/USDT · 1H</span>
            <span>candles + sma20 + ema50</span>
            <span style={{ marginLeft: 'auto', color: 'var(--bull)' }}>▲ 2.31%</span>
          </div>
          <div className="tl-frame-body">
            <div className="tl-frame-legend">
              <LegendChip color="var(--ind-1)" label="SMA 20" />
              <LegendChip color="var(--ind-2)" label="EMA 50" />
            </div>
            <CandleChart seed={29} count={150} basePrice={67000} drift={0.03} height={360} indicators={['sma20', 'ema50']} />
          </div>
        </div>
      </header>

      <div style={{ paddingBottom: 60 }}>
        <div className="tl-stats">
          <div className="tl-stat"><div className="v">440<em>+</em></div><div className="k">unit tests</div></div>
          <div className="tl-stat"><div className="v">0</div><div className="k">lint warnings in CI</div></div>
          <div className="tl-stat"><div className="v">~27 <em>KB</em></div><div className="k">core, gzipped</div></div>
          <div className="tl-stat"><div className="v">30<em>+</em></div><div className="k">indicators built in</div></div>
          <div className="tl-stat"><div className="v">$0</div><div className="k">license fees, forever</div></div>
        </div>
      </div>

      <section id="engine" data-num="01">
        <div className="seclabel">01 — the engine</div>
        <h2>Batteries included</h2>
        <p className="sectionLede">
          Teams building trading UIs pick between fast-but-bare and complete-but-licensed.
          openkline closes all four gaps in one package.
        </p>
        <div className="tl-features">
          <div className="tl-feature">
            <span className="num">/01</span>
            <h3>One core, any framework</h3>
            <p>
              Pure TypeScript core with no React or Vue inside. Thin <code>@rekurt/openkline-react</code> and{' '}
              <code>@rekurt/openkline-vue</code> wrappers with full API parity. Vanilla, React 18/19 or Vue 3 —
              same engine, no lock-in.
            </p>
          </div>
          <div className="tl-feature">
            <span className="num">/02</span>
            <h3>Built for realtime</h3>
            <p>
              Canvas rendering on <code>Float64Array</code> buffers, O(1) <code>append</code>/<code>updateLast</code>,
              three-layer canvas for cheap crosshair redraws, RAF-coalesced ticks, jittered-backoff reconnect,
              stale-response protection. Not a report chart — an engine for a live order book.
            </p>
          </div>
          <div className="tl-feature">
            <span className="num">/03</span>
            <h3>30+ indicators, 9 drawing tools</h3>
            <p>
              Overlays from SMA to Ichimoku, Supertrend and anchored VWAP; sub-pane RSI, MACD, Stochastic and more.
              Trend lines, Fibonacci, channels — anchored to candles, they never drift on zoom. Heikin-Ashi is
              a first-class chart type.
            </p>
          </div>
          <div className="tl-feature">
            <span className="num">/04</span>
            <h3>UX the competitors skip</h3>
            <p>
              Keyboard-first navigation, <code>prefers-reduced-motion</code> respected, an explicit auto-follow
              state machine, and the whole layout serializes into a query param.
            </p>
            <div className="tl-kbdrow">
              <Kbd>←</Kbd><Kbd>→</Kbd> pan · <Kbd>+</Kbd><Kbd>-</Kbd> zoom · <Kbd>Home</Kbd><Kbd>End</Kbd> jump · <Kbd>F</Kbd> fit
            </div>
          </div>
        </div>
      </section>

      <section data-num="02">
        <div className="seclabel">02 — for developers</div>
        <h2>Five lines to first candle</h2>
        <p className="sectionLede">
          Indicators are config objects, not class instances — the core reconciles them.
          The full technical tour with examples lives on the Developers page.
        </p>
        <div className="tl-codegrid">
          <CodeBlock title="chart.ts">{`import { OHLCVChart } from '@rekurt/openkline';

const chart = new OHLCVChart({
  container, symbol: 'BTC/USDT',
  resolution: '1H', theme: 'auto',
});
chart.setData(candles);`}</CodeBlock>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <CodeBlock title="indicators">{`chart.setIndicatorConfigs([
  { type: 'sma', period: 20 },
  { type: 'ema', period: 50 },
  { type: 'rsi', period: 14 },
]);`}</CodeBlock>
            <Button variant="ember" onClick={onOpenDev} style={{ alignSelf: 'flex-start' }}>
              Developers page →
            </Button>
          </div>
        </div>
      </section>

      <section id="compare" data-num="03">
        <div className="seclabel">03 — the four-way gap</div>
        <h2>Pick all four</h2>
        <p className="sectionLede">
          Realtime performance + full indicator set + drawing tools + framework freedom.
          Every alternative makes you drop at least one.
        </p>
        <table className="tl-table">
          <thead>
            <tr>
              <th></th>
              <th className="openklinecol">openkline</th>
              <th>Lightweight Charts</th>
              <th>Highcharts Stock</th>
              <th>ECharts / Chart.js</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Indicators built in</td><td className="openklinecol yes">30+</td><td className="no">write your own</td><td className="yes">yes</td><td className="part">generic</td></tr>
            <tr><td>Drawing tools</td><td className="openklinecol yes">9, anchored</td><td className="no">none</td><td className="yes">yes</td><td className="no">none</td></tr>
            <tr><td>Realtime transports</td><td className="openklinecol yes">built in</td><td className="no">bring your own</td><td className="part">partial</td><td className="no">bring your own</td></tr>
            <tr><td>Keyboard + a11y</td><td className="openklinecol yes">first-class</td><td className="no">none</td><td className="part">partial</td><td className="part">partial</td></tr>
            <tr><td>License</td><td className="openklinecol yes">MIT</td><td className="yes">Apache-2.0</td><td className="no">commercial</td><td className="yes">MIT</td></tr>
            <tr><td>Framework lock-in</td><td className="openklinecol yes">none</td><td className="yes">none</td><td className="part">vendor APIs</td><td className="yes">none</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
