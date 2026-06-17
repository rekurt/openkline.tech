import { useState } from 'react';
import { OkChart } from './OkChart.jsx';
import { INDICATOR_PRESETS, presetsToConfigs } from '../engine/indicatorPresets.js';

/**
 * The REAL openkline engine with an optional indicator-toggle bar. A thin preset
 * over <OkChart>: pages pass indicator preset keys (e.g. 'sma20') and a caption;
 * toggles map to live IndicatorConfig reconciliation on the actual core.
 *
 *  - symbol:        caption shown in the bar (e.g. 'BTC/USDT · 1H')
 *  - tradingSymbol: engine symbol label (default 'BTC/USDT')
 *  - resolution:    engine resolution id (default '1H')
 *  - indicators:    preset keys, e.g. ['sma20','ema50']
 *  - toggles:       show the toggle bar (default true)
 */
export function DemoChart({
  symbol = 'BTC/USDT · 1H',
  tradingSymbol = 'BTC/USDT',
  resolution = '1H',
  indicators = ['sma20', 'ema50'],
  height = 300,
  count = 200,
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
            {INDICATOR_PRESETS.map((it) => (
              <button
                key={it.key}
                type="button"
                className={'dc-chip' + (on.includes(it.key) ? ' on' : '')}
                aria-pressed={on.includes(it.key)}
                onClick={() => toggle(it.key)}
              >
                <span className="dot" style={{ background: it.color }}></span>
                {it.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <OkChart
        symbol={tradingSymbol}
        resolution={resolution}
        indicators={presetsToConfigs(on)}
        count={count}
        height={height}
      />
    </div>
  );
}
