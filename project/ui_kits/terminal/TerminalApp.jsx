import React, { useMemo, useState } from 'react';
import { Button } from '../../components/actions/Button.jsx';
import { IconButton } from '../../components/actions/IconButton.jsx';
import { Icon } from '../../components/actions/Icon.jsx';
import { Select } from '../../components/forms/Select.jsx';
import { Checkbox } from '../../components/forms/Checkbox.jsx';
import { Badge } from '../../components/display/Badge.jsx';
import { CandleChart } from '../../components/chart/CandleChart.jsx';
import { LegendChip } from '../../components/chart/LegendChip.jsx';
import { GoLivePill } from '../../components/chart/GoLivePill.jsx';

const SYMBOLS = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'TON/USDT'];
const BASE = { 'BTC/USDT': 67000, 'ETH/USDT': 3100, 'SOL/USDT': 144, 'TON/USDT': 7.2 };
const RESOLUTIONS = ['1m', '5m', '15m', '1H', '4H', '1D'];
const IND_META = {
  sma20: { label: 'SMA 20', color: 'var(--ind-1)' },
  ema50: { label: 'EMA 50', color: 'var(--ind-2)' },
  bb: { label: 'BB 20·2', color: 'var(--ind-3)' },
  vwap: { label: 'VWAP', color: 'var(--ind-4)' },
};

const terminalCss = `
.ok-term { display: grid; grid-template-columns: var(--toolrail-w) 1fr; grid-template-rows: var(--toolbar-h) 1fr var(--statusbar-h); grid-template-areas: 'rail toolbar' 'rail chart' 'rail status'; height: 100%; min-height: 0; background: var(--bg-canvas); color: var(--text-1); font-family: var(--font-ui); font-size: var(--text-md); }
.ok-term-toolbar { grid-area: toolbar; display: flex; align-items: center; gap: 10px; padding: 8px 14px; background: var(--surface-panel); border-bottom: var(--hairline); flex-wrap: wrap; }
.ok-term-rail { grid-area: rail; background: var(--surface-panel); border-right: var(--hairline); display: flex; flex-direction: column; align-items: center; padding: 8px 0; gap: 4px; }
.ok-term-rail .spacer { flex: 1; }
.ok-term-chart { grid-area: chart; position: relative; min-height: 0; overflow: hidden; }
.ok-term-status { grid-area: status; display: flex; align-items: center; gap: 16px; background: var(--surface-panel); border-top: var(--hairline); padding: 4px 14px; font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-muted); white-space: nowrap; overflow: hidden; }
.ok-term-status .hint { margin-left: auto; }
.ok-term-legend { position: absolute; left: 10px; top: 16px; display: flex; flex-direction: column; align-items: flex-start; gap: 2px; z-index: 2; pointer-events: none; }
.ok-term-legend > * { pointer-events: auto; }
.ok-term-symlabel { margin-left: auto; font-weight: 600; font-size: var(--text-sm); display: flex; align-items: center; gap: 8px; }
.ok-term-menu { position: relative; }
.ok-term-dropdown { position: absolute; top: 100%; left: 0; margin-top: 4px; background: var(--surface-panel); border: var(--hairline); border-radius: var(--radius-sm); padding: 6px 12px; min-width: 200px; z-index: 10; box-shadow: var(--shadow-menu); display: flex; flex-direction: column; }
.ok-term-pill { position: absolute; right: 70px; bottom: 56px; z-index: 2; }
`;

function ensureTerminalStyle() {
  if (typeof document !== 'undefined' && !document.getElementById('ok-terminal-style')) {
    const s = document.createElement('style');
    s.id = 'ok-terminal-style';
    s.textContent = terminalCss;
    document.head.appendChild(s);
  }
}

function fmt(n) {
  return n >= 1000 ? n.toLocaleString('en-US', { maximumFractionDigits: 1 }) : n.toFixed(2);
}

export function TerminalApp({ height = '100%' }) {
  ensureTerminalStyle();
  const [symbol, setSymbol] = useState('BTC/USDT');
  const [resolution, setResolution] = useState('1H');
  const [chartType, setChartType] = useState('candles');
  const [transform, setTransform] = useState('none');
  const [inds, setInds] = useState({ sma20: true, ema50: false, bb: false, vwap: false });
  const [tool, setTool] = useState('none');
  const [menuOpen, setMenuOpen] = useState(false);
  const [live, setLive] = useState(false);
  const [dark, setDark] = useState(true);
  const [following, setFollowing] = useState(true);

  const seed = useMemo(
    () => SYMBOLS.indexOf(symbol) * 31 + RESOLUTIONS.indexOf(resolution) * 7 + 11,
    [symbol, resolution],
  );
  const active = Object.keys(inds).filter((k) => inds[k]);
  const base = BASE[symbol];
  const last = base * 1.006;

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  }

  return (
    <div className="ok-term" style={{ height }} data-screen-label="openkline terminal">
      <aside className="ok-term-rail">
        <IconButton title="Select / no tool (Esc)" active={tool === 'none'} onClick={() => setTool('none')}><Icon name="pointer" size={18} /></IconButton>
        <IconButton title="Trend line (T)" active={tool === 'trendline'} onClick={() => setTool('trendline')}><Icon name="trendline" size={18} /></IconButton>
        <IconButton title="Horizontal line (H)" active={tool === 'hline'} onClick={() => setTool('hline')}><Icon name="hline" size={18} /></IconButton>
        <div className="spacer"></div>
        <IconButton title="Clear all drawings"><Icon name="trash" size={18} /></IconButton>
        <IconButton title="Export chart as PNG"><Icon name="camera" size={18} /></IconButton>
      </aside>

      <header className="ok-term-toolbar">
        <Select label="Symbol" value={symbol} onChange={setSymbol} options={SYMBOLS} />
        <Select label="TF" value={resolution} onChange={setResolution} options={RESOLUTIONS} />
        <Select
          label="Type"
          value={chartType}
          onChange={setChartType}
          options={[
            { value: 'candles', label: 'Candles' },
            { value: 'line', label: 'Line' },
            { value: 'area', label: 'Area' },
            { value: 'ohlc', label: 'OHLC Bars' },
          ]}
        />
        <Select
          label="Data"
          value={transform}
          onChange={setTransform}
          options={[
            { value: 'none', label: 'Raw' },
            { value: 'heikin-ashi', label: 'Heikin Ashi' },
            { value: 'renko', label: 'Renko' },
          ]}
        />
        <div className="ok-term-menu">
          <Button onClick={() => setMenuOpen(!menuOpen)}>Indicators ▾</Button>
          {menuOpen ? (
            <div className="ok-term-dropdown">
              <Checkbox label="SMA(20)" checked={inds.sma20} onChange={(v) => setInds({ ...inds, sma20: v })} />
              <Checkbox label="EMA(50)" checked={inds.ema50} onChange={(v) => setInds({ ...inds, ema50: v })} />
              <Checkbox label="Bollinger Bands" checked={inds.bb} onChange={(v) => setInds({ ...inds, bb: v })} />
              <Checkbox label="VWAP (session)" checked={inds.vwap} onChange={(v) => setInds({ ...inds, vwap: v })} />
            </div>
          ) : null}
        </div>
        <IconButton title="Toggle theme" onClick={toggleTheme}><Icon name={dark ? 'moon' : 'sun'} size={18} /></IconButton>
        <Button active={live} onClick={() => setLive(!live)}><Icon name="play" size={13} /> Live</Button>
        <span className="ok-term-symlabel">
          {live ? <Badge tone="bull" dot pill>Live</Badge> : null}
          {symbol} · {resolution}
        </span>
      </header>

      <main className="ok-term-chart">
        <div className="ok-term-legend">
          <LegendChip color="var(--text-1)" label={`${symbol} · ${resolution}`} />
          {active.map((k) => (
            <LegendChip
              key={k}
              color={IND_META[k].color}
              label={IND_META[k].label}
              value={fmt(base * (0.99 + 0.004 * (k.length % 3)))}
              onRemove={() => setInds({ ...inds, [k]: false })}
            />
          ))}
        </div>
        <CandleChart
          seed={seed}
          count={200}
          basePrice={base}
          drift={0.01}
          height="100%"
          style={{ position: 'absolute', inset: 0 }}
          indicators={active}
        />
        {!following ? (
          <div className="ok-term-pill">
            <GoLivePill onClick={() => setFollowing(true)} />
          </div>
        ) : null}
      </main>

      <footer className="ok-term-status">
        <span>
          O <span style={{ color: 'var(--bull)' }}>{fmt(last * 0.996)}</span>{' '}
          H <span style={{ color: 'var(--bull)' }}>{fmt(last * 1.004)}</span>{' '}
          L <span style={{ color: 'var(--bear)' }}>{fmt(last * 0.991)}</span>{' '}
          C <span style={{ color: 'var(--bull)' }}>{fmt(last)}</span>{' '}
          V 1.2K
        </span>
        <span style={{ cursor: 'pointer' }} onClick={() => setFollowing(!following)}>
          autoFollow: {following ? 'on' : 'off'}
        </span>
        <span className="hint">Drag pan · Wheel zoom · ←→ keys · T trend · H hline · Esc cancel · Dbl-click fit</span>
      </footer>
    </div>
  );
}
