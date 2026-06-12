import { useState } from 'react';
import { CandleChart } from './CandleChart.jsx';

const ALL = [
  { value: 'sma20', label: 'SMA 20', color: 'var(--ind-1)' },
  { value: 'ema50', label: 'EMA 50', color: 'var(--ind-2)' },
  { value: 'bb', label: 'Bollinger', color: 'var(--ind-3)' },
  { value: 'vwap', label: 'VWAP', color: 'var(--ind-4)' },
];

/**
 * A real, interactive openkline chart: live canvas engine with crosshair and
 * indicator toggles. Used across docs, product and developer pages so every
 * "example" is the actual engine running, not a screenshot.
 */
export function DemoChart({
  seed = 7,
  indicators = ['sma20', 'ema50'],
  height = 300,
  symbol = 'BTC/USDT · 1H',
  basePrice = 67000,
  drift = 0.03,
  count = 150,
  toggles = true,
}) {
  const [on, setOn] = useState(indicators);
  const toggle = (v) => setOn((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));
  return (
    <div className="dc-demo">
      {toggles ? (
        <div className="dc-demo-bar">
          <span className="dc-demo-sym">{symbol}</span>
          <div className="dc-demo-toggles">
            {ALL.map((it) => (
              <button
                key={it.value}
                type="button"
                className={'dc-chip' + (on.includes(it.value) ? ' on' : '')}
                aria-pressed={on.includes(it.value)}
                onClick={() => toggle(it.value)}
              >
                <span className="dot" style={{ background: it.color }}></span>
                {it.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <CandleChart seed={seed} count={count} basePrice={basePrice} drift={drift} height={height} indicators={on} />
    </div>
  );
}
