import { Button } from '../components/Button.jsx';
import { Badge } from '../components/Badge.jsx';
import { CodeBlock } from '../components/CodeBlock.jsx';
import { Kbd } from '../components/Kbd.jsx';
import { OkChart } from '../components/OkChart.jsx';
import { Playground } from '../components/Playground.jsx';
import { presetsToConfigs } from '../engine/indicatorPresets.js';
import { LegendChip } from '../components/LegendChip.jsx';
import { useI18n } from '../i18n/index.jsx';
import { useMetrics } from '../lib/useMetrics.jsx';
import { navigate } from '../router.jsx';

const FEATURE_NUMS = ['/01', '/02', '/03', '/04'];

// Live values for the stats strip (labels come from i18n, numbers from GitHub).
function statValues(m) {
  return [
    <>{m.tests}<em>+</em></>,
    <>{m.lintWarnings}</>,
    <>~{m.coreSizeGzipKb} <em>KB</em></>,
    <>{m.indicators}<em>+</em></>,
    <>$0</>,
  ];
}

/**
 * Product page of the openkline landing — hero, proof strip, the four pillars,
 * developer-advantage highlights, comparison table.
 */
export function ProductPage({ onOpenDev }) {
  const { t } = useI18n();
  const { metrics } = useMetrics();
  const p = t.product;
  const values = statValues(metrics);
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
            <Button size="lg" onClick={onOpenDev}>{p.ctaDocs}</Button>
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
            <OkChart symbol="BTC/USDT" resolution="1H" indicators={presetsToConfigs(['sma20', 'ema50'])} count={150} height={360} />
          </div>
        </div>
      </header>

      <div style={{ paddingBottom: 60 }}>
        <div className="tl-stats">
          {p.stats.map((s, i) => (
            <div className="tl-stat" key={i}>
              <div className="v">{values[i]}</div>
              <div className="k">{s.k}</div>
            </div>
          ))}
        </div>
      </div>

      <section id="playground" data-num="live">
        <div className="seclabel">{p.live.label}</div>
        <h2>{p.live.h2}</h2>
        <p className="sectionLede">{p.live.lede}</p>
        <Playground />
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
