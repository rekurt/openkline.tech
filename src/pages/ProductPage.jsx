import { Button } from '../components/Button.jsx';
import { Badge } from '../components/Badge.jsx';
import { CodeBlock } from '../components/CodeBlock.jsx';
import { Kbd } from '../components/Kbd.jsx';
import { CandleChart } from '../components/CandleChart.jsx';
import { DemoChart } from '../components/DemoChart.jsx';
import { LegendChip } from '../components/LegendChip.jsx';
import { useI18n } from '../i18n/index.jsx';
import { navigate } from '../router.jsx';

const FEATURE_NUMS = ['/01', '/02', '/03', '/04'];

/**
 * Product page of the openkline landing — hero, proof strip, the four pillars,
 * developer-advantage highlights, comparison table.
 */
export function ProductPage({ onOpenDev }) {
  const { t } = useI18n();
  const p = t.product;
  return (
    <div>
      <header className="tl-hero">
        <div>
          <div className="badges">
            <Badge tone="ember">MIT</Badge>
            <Badge tone="accent">TypeScript</Badge>
            <Badge>{p.badges.agnostic}</Badge>
            <Badge tone="bull" dot pill>{p.badges.realtime}</Badge>
          </div>
          <h1>{p.h1}</h1>
          <p className="lede">{p.lede}</p>
          <div className="cta">
            <Button variant="ember" size="lg" onClick={() => navigate('docs')}>{p.ctaPlayground}</Button>
            <Button size="lg" onClick={() => navigate('docs')}>{p.ctaDocs}</Button>
          </div>
          <CodeBlock prompt size="sm" copy copyText="npm install @rekurt/openkline-core" style={{ maxWidth: 440 }}>
            npm install @rekurt/openkline-core<span className="tl-cursor"></span>
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
          {p.stats.map((s, i) => (
            <div className="tl-stat" key={i}>
              <div className="v">{s.v}</div>
              <div className="k">{s.k}</div>
            </div>
          ))}
        </div>
      </div>

      <section id="playground" data-num="live">
        <div className="seclabel">{p.live.label}</div>
        <h2>{p.live.h2}</h2>
        <p className="sectionLede">{p.live.lede}</p>
        <DemoChart seed={88} indicators={['sma20', 'ema50', 'bb']} height={360} symbol="BTC/USDT · 1H" />
        <div className="tl-features" style={{ marginTop: 16 }}>
          <div className="tl-feature">
            <h3>{p.live.presetPlain}</h3>
            <DemoChart seed={5} indicators={[]} height={200} toggles={false} symbol="ETH/USDT · 1H" basePrice={3100} drift={-0.01} />
          </div>
          <div className="tl-feature">
            <h3>{p.live.presetBb}</h3>
            <DemoChart seed={17} indicators={['bb']} height={200} toggles={false} symbol="SOL/USDT · 1H" basePrice={144} drift={0.05} />
          </div>
        </div>
        <div className="tl-features" style={{ marginTop: 16, gridTemplateColumns: '1fr' }}>
          <div className="tl-feature">
            <h3>{p.live.presetVwap}</h3>
            <DemoChart seed={31} indicators={['vwap', 'ema50']} height={220} toggles={false} symbol="BTC/USDT · 4H" />
          </div>
        </div>
      </section>

      <section id="engine" data-num="01">
        <div className="seclabel">{p.s01.label}</div>
        <h2>{p.s01.h2}</h2>
        <p className="sectionLede">{p.s01.lede}</p>
        <div className="tl-features">
          {p.features.map((f, i) => (
            <div className="tl-feature" key={i}>
              <span className="num">{FEATURE_NUMS[i]}</span>
              <h3>{f.h}</h3>
              <p>{f.p}</p>
              {i === 3 ? (
                <div className="tl-kbdrow">
                  <Kbd>←</Kbd><Kbd>→</Kbd> {p.kbd.pan} · <Kbd>+</Kbd><Kbd>-</Kbd> {p.kbd.zoom} · <Kbd>Home</Kbd><Kbd>End</Kbd> {p.kbd.jump} · <Kbd>F</Kbd> {p.kbd.fit}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section data-num="02">
        <div className="seclabel">{p.s02.label}</div>
        <h2>{p.s02.h2}</h2>
        <p className="sectionLede">{p.s02.lede}</p>
        <div className="tl-codegrid">
          <CodeBlock title="chart.ts">{`import { OHLCVChart } from '@rekurt/openkline-core';

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
              {p.s02.btn}
            </Button>
          </div>
        </div>
      </section>

      <section id="compare" data-num="03">
        <div className="seclabel">{p.s03.label}</div>
        <h2>{p.s03.h2}</h2>
        <p className="sectionLede">{p.s03.lede}</p>
        <div className="tl-scrollx">
        <table className="tl-table">
          <thead>
            <tr>
              <th></th>
              <th className="openklinecol">{p.table.cols[0]}</th>
              <th>{p.table.cols[1]}</th>
              <th>{p.table.cols[2]}</th>
              <th>{p.table.cols[3]}</th>
            </tr>
          </thead>
          <tbody>
            {p.table.rows.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                {row.cells.map((c, i) => (
                  <td key={i} className={i === 0 ? `openklinecol ${c.cls}` : c.cls}>{c.text}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </section>
    </div>
  );
}
