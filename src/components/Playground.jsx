import { useMemo, useState } from 'react';
import { OkChart } from './OkChart.jsx';
import { CodeBlock } from './CodeBlock.jsx';
import { SYMBOLS, RESOLUTIONS } from '../engine/index.js';
import { INDICATOR_PRESETS, presetsToConfigs } from '../engine/indicatorPresets.js';
import { PROJECT } from '../content/project.js';
import './playground.css';

const CHART_TYPES = [
  { id: 'candles', label: 'Candles' },
  { id: 'line', label: 'Line' },
  { id: 'area', label: 'Area' },
  { id: 'ohlc', label: 'OHLC bars' },
  { id: 'heikinashi', label: 'Heikin-Ashi' },
];

const DEFAULT = { symbol: 'BTC/USDT', resolution: '1H', chartType: 'candles', indicators: ['sma20', 'ema50'] };

const SYMBOL_LABELS = SYMBOLS.map((s) => s.label);
const RES_IDS = RESOLUTIONS.map((r) => r.id);
const TYPE_IDS = CHART_TYPES.map((t) => t.id);
const IND_KEYS = INDICATOR_PRESETS.map((i) => i.key);

// Decode a shared ?pg=<base64> config, validating every field against the known
// option sets so a hand-edited URL can never feed the engine garbage.
function decodeShared() {
  try {
    const raw = new URLSearchParams(window.location.search).get('pg');
    if (!raw) return null;
    const o = JSON.parse(atob(raw));
    const indicators = Array.isArray(o.indicators) ? o.indicators.filter((k) => IND_KEYS.includes(k)) : DEFAULT.indicators;
    return {
      symbol: SYMBOL_LABELS.includes(o.symbol) ? o.symbol : DEFAULT.symbol,
      resolution: RES_IDS.includes(o.resolution) ? o.resolution : DEFAULT.resolution,
      chartType: TYPE_IDS.includes(o.chartType) ? o.chartType : DEFAULT.chartType,
      indicators,
    };
  } catch {
    return null;
  }
}

function literal(cfg) {
  const parts = Object.entries(cfg).map(([k, v]) => `${k}: ${typeof v === 'string' ? `'${v}'` : v}`);
  return `{ ${parts.join(', ')} }`;
}

// Build a runnable snippet that mirrors the applied config — copy-paste it and
// it drives the real @rekurt/openkline-core.
function buildSnippet(a) {
  const cfgs = presetsToConfigs(a.indicators);
  const indBlock = cfgs.length
    ? `\n\nchart.setIndicatorConfigs([\n${cfgs.map((c) => '  ' + literal(c)).join(',\n')},\n]);`
    : '';
  return `import { OHLCVChart } from '@rekurt/openkline-core';

const chart = new OHLCVChart({
  container: document.getElementById('chart'),
  symbol: '${a.symbol}',
  resolution: '${a.resolution}',
  chartType: '${a.chartType}',
  theme: 'auto',
});

chart.setData(candles); // your Candle[] (t in seconds)${indBlock}

// serialize the exact view to share or persist:
const state = chart.saveLayoutState();`;
}

export function Playground() {
  const initial = useMemo(() => decodeShared() || DEFAULT, []);
  const [draft, setDraft] = useState(initial);
  const [applied, setApplied] = useState(initial);
  const [copied, setCopied] = useState(false);

  const dirty = JSON.stringify(draft) !== JSON.stringify(applied);
  const snippet = useMemo(() => buildSnippet(applied), [applied]);
  const appliedIndicators = useMemo(() => presetsToConfigs(applied.indicators), [applied.indicators]);

  const set = (patch) => setDraft((d) => ({ ...d, ...patch }));
  const toggleInd = (key) =>
    setDraft((d) => ({
      ...d,
      indicators: d.indicators.includes(key) ? d.indicators.filter((k) => k !== key) : [...d.indicators, key],
    }));

  const apply = () => setApplied(draft);
  const reset = () => { setDraft(DEFAULT); setApplied(DEFAULT); };
  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}?pg=${btoa(JSON.stringify(applied))}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  return (
    <div className="pg">
      <div className="pg-controls">
        <label className="pg-field">
          <span>Symbol</span>
          <select value={draft.symbol} onChange={(e) => set({ symbol: e.target.value })}>
            {SYMBOLS.map((s) => <option key={s.id} value={s.label}>{s.label}</option>)}
          </select>
        </label>
        <label className="pg-field">
          <span>Timeframe</span>
          <select value={draft.resolution} onChange={(e) => set({ resolution: e.target.value })}>
            {RESOLUTIONS.map((r) => <option key={r.id} value={r.id}>{r.id}</option>)}
          </select>
        </label>
        <label className="pg-field">
          <span>Chart type</span>
          <select value={draft.chartType} onChange={(e) => set({ chartType: e.target.value })}>
            {CHART_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </label>
        <div className="pg-field pg-field--inds">
          <span>Indicators</span>
          <div className="pg-inds">
            {INDICATOR_PRESETS.map((it) => (
              <button
                key={it.key}
                type="button"
                className={'pg-chip' + (draft.indicators.includes(it.key) ? ' on' : '')}
                aria-pressed={draft.indicators.includes(it.key)}
                onClick={() => toggleInd(it.key)}
              >
                <span className="dot" style={{ background: it.color }}></span>{it.label}
              </button>
            ))}
          </div>
        </div>
        <div className="pg-actions">
          <button type="button" className="ok-btn ok-btn--ember pg-update" onClick={apply} disabled={!dirty}>
            {dirty ? 'Update ▸' : 'Up to date'}
          </button>
          <button type="button" className="ok-btn pg-share" onClick={share}>{copied ? 'Link copied ✓' : 'Copy link'}</button>
          <a className="ok-btn pg-star" href={PROJECT.urls.github} target="_blank" rel="noreferrer">★ Star on GitHub</a>
          <button type="button" className="pg-reset" onClick={reset}>Reset</button>
        </div>
      </div>

      <div className="pg-stage">
        <div className="pg-chart">
          <div className="pg-chart-head">
            <span className="sym">{applied.symbol} · {applied.resolution}</span>
            {dirty ? <span className="pg-pending">pending — press Update</span> : null}
          </div>
          <OkChart
            symbol={applied.symbol}
            resolution={applied.resolution}
            chartType={applied.chartType}
            indicators={appliedIndicators}
            count={220}
            height={360}
          />
        </div>
        <div className="pg-code">
          <CodeBlock size="sm" copy title="chart.ts">{snippet}</CodeBlock>
        </div>
      </div>
    </div>
  );
}
