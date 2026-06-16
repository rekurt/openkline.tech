import { Component, useState, useEffect, useCallback } from 'react';
import { Button } from '../components/Button.jsx';
import { Badge } from '../components/Badge.jsx';
import { CodeBlock } from '../components/CodeBlock.jsx';
import { CandleChart } from '../components/CandleChart.jsx';
import { SegmentedControl } from '../components/SegmentedControl.jsx';
import { useI18n } from '../i18n/index.jsx';
import { navigate, currentLocale } from '../router.jsx';
import { localePath } from '../i18n/index.jsx';
import { PROJECT } from '../content/project.js';

// ── Playground state defaults ───────────────────────────────────────────────

const SYMBOLS = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'];
const RESOLUTIONS = ['1m', '5m', '15m', '1H', '4H', '1D'];
const CHART_TYPES = ['candle', 'line', 'area'];
const THEMES = ['dark', 'light'];

const INDICATOR_OPTIONS = [
  { value: 'sma20', label: 'SMA 20', color: 'var(--ind-1)' },
  { value: 'ema50', label: 'EMA 50', color: 'var(--ind-2)' },
  { value: 'bb', label: 'Bollinger', color: 'var(--ind-3)' },
  { value: 'vwap', label: 'VWAP', color: 'var(--ind-4)' },
];

const BASE_PRICES = { 'BTC/USDT': 67000, 'ETH/USDT': 3100, 'SOL/USDT': 144 };
const SEEDS = { 'BTC/USDT': 42, 'ETH/USDT': 17, 'SOL/USDT': 31 };

const DEFAULT_STATE = {
  symbol: 'BTC/USDT',
  resolution: '1H',
  chartType: 'candle',
  theme: 'dark',
  indicators: ['sma20', 'ema50'],
};

// ── State serialization ─────────────────────────────────────────────────────

export function stateToParams(state) {
  const p = new URLSearchParams();
  if (state.symbol !== DEFAULT_STATE.symbol) p.set('s', state.symbol);
  if (state.resolution !== DEFAULT_STATE.resolution) p.set('r', state.resolution);
  if (state.chartType !== DEFAULT_STATE.chartType) p.set('ct', state.chartType);
  if (state.theme !== DEFAULT_STATE.theme) p.set('th', state.theme);
  const indStr = state.indicators.slice().sort().join(',');
  const defStr = DEFAULT_STATE.indicators.slice().sort().join(',');
  if (indStr !== defStr) p.set('ind', indStr);
  return p;
}

export function stateFromParams(search) {
  const p = new URLSearchParams(search || '');
  return {
    symbol: SYMBOLS.includes(p.get('s')) ? p.get('s') : DEFAULT_STATE.symbol,
    resolution: RESOLUTIONS.includes(p.get('r')) ? p.get('r') : DEFAULT_STATE.resolution,
    chartType: CHART_TYPES.includes(p.get('ct')) ? p.get('ct') : DEFAULT_STATE.chartType,
    theme: THEMES.includes(p.get('th')) ? p.get('th') : DEFAULT_STATE.theme,
    indicators: p.has('ind')
      ? p.get('ind').split(',').filter((v) => INDICATOR_OPTIONS.some((o) => o.value === v))
      : [...DEFAULT_STATE.indicators],
  };
}

export function generateCode(state) {
  const inds = state.indicators
    .map((id) => {
      if (id === 'sma20') return "  { type: 'sma', period: 20 }";
      if (id === 'ema50') return "  { type: 'ema', period: 50 }";
      if (id === 'bb') return "  { type: 'bollinger', period: 20, stdDev: 2 }";
      if (id === 'vwap') return "  { type: 'vwap' }";
      return `  { type: '${id}' }`;
    })
    .join(',\n');

  return `import { OHLCVChart } from '${PROJECT.packages.core}';

const chart = new OHLCVChart({
  container,
  symbol: '${state.symbol}',
  resolution: '${state.resolution}',
  theme: '${state.theme}',
});

chart.setData(candles);
${inds ? `\nchart.setIndicatorConfigs([\n${inds},\n]);` : ''}`;
}

// ── Error boundary ──────────────────────────────────────────────────────────

class PlaygroundErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="tl-pg-error">
          <p>Something went wrong in the playground.</p>
          <pre>{this.state.error.message}</pre>
          <Button onClick={() => this.setState({ error: null })}>Reset</Button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Playground page ─────────────────────────────────────────────────────────

export function PlaygroundPage() {
  const { t } = useI18n();
  const pg = t.playground;
  const [state, setState] = useState(() =>
    stateFromParams(typeof window !== 'undefined' ? window.location.search : ''),
  );

  // Sync URL when state changes
  useEffect(() => {
    const params = stateToParams(state);
    const search = params.toString();
    const url = localePath(currentLocale(), '/playground') + (search ? `?${search}` : '');
    if (window.location.pathname + window.location.search !== url) {
      window.history.replaceState({}, '', url);
    }
  }, [state]);

  const update = useCallback((key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleIndicator = useCallback((value) => {
    setState((prev) => ({
      ...prev,
      indicators: prev.indicators.includes(value)
        ? prev.indicators.filter((v) => v !== value)
        : [...prev.indicators, value],
    }));
  }, []);

  const reset = useCallback(() => {
    setState({ ...DEFAULT_STATE, indicators: [...DEFAULT_STATE.indicators] });
  }, []);

  const copyShareUrl = useCallback(() => {
    const params = stateToParams(state);
    const search = params.toString();
    const url = `${PROJECT.site}${localePath(currentLocale(), '/playground')}${search ? `?${search}` : ''}`;
    navigator.clipboard?.writeText(url);
  }, [state]);

  const code = generateCode(state);
  const basePrice = BASE_PRICES[state.symbol] || 67000;
  const seed = SEEDS[state.symbol] || 42;

  return (
    <div>
      <section style={{ paddingTop: 32 }}>
        <div className="seclabel">{pg.label}</div>
        <h2>{pg.h2}</h2>
        <p className="sectionLede">{pg.lede}</p>

        <div className="tl-pg-controls">
          <div className="tl-pg-row">
            <label className="tl-pg-label">{pg.symbol}</label>
            <SegmentedControl
              options={SYMBOLS.map((s) => ({ value: s, label: s.split('/')[0] }))}
              value={state.symbol}
              onChange={(v) => update('symbol', v)}
              size="sm"
            />
          </div>

          <div className="tl-pg-row">
            <label className="tl-pg-label">{pg.resolution}</label>
            <SegmentedControl
              options={RESOLUTIONS}
              value={state.resolution}
              onChange={(v) => update('resolution', v)}
              size="sm"
            />
          </div>

          <div className="tl-pg-row">
            <label className="tl-pg-label">{pg.chartType}</label>
            <SegmentedControl
              options={CHART_TYPES.map((ct) => ({ value: ct, label: pg.chartTypes[ct] || ct }))}
              value={state.chartType}
              onChange={(v) => update('chartType', v)}
              size="sm"
            />
          </div>

          <div className="tl-pg-row">
            <label className="tl-pg-label">{pg.theme}</label>
            <SegmentedControl
              options={THEMES.map((th) => ({ value: th, label: pg.themes[th] || th }))}
              value={state.theme}
              onChange={(v) => update('theme', v)}
              size="sm"
            />
          </div>

          <div className="tl-pg-row">
            <label className="tl-pg-label">{pg.indicators}</label>
            <div className="dc-demo-toggles">
              {INDICATOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={'dc-chip' + (state.indicators.includes(opt.value) ? ' on' : '')}
                  aria-pressed={state.indicators.includes(opt.value)}
                  onClick={() => toggleIndicator(opt.value)}
                >
                  <span className="dot" style={{ background: opt.color }}></span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <PlaygroundErrorBoundary>
          <div className="tl-pg-chart">
            <div className="dc-demo-bar">
              <span className="dc-demo-sym">{state.symbol} · {state.resolution}</span>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                <Button size="sm" onClick={copyShareUrl}>{pg.share}</Button>
                <Button size="sm" onClick={reset}>{pg.reset}</Button>
              </div>
            </div>
            <CandleChart
              seed={seed}
              count={150}
              basePrice={basePrice}
              drift={0.03}
              height={420}
              indicators={state.indicators}
            />
          </div>
        </PlaygroundErrorBoundary>

        <div style={{ marginTop: 24 }}>
          <CodeBlock title="your config" copy copyText={code}>
            {code}
          </CodeBlock>
        </div>

        <div className="tl-pg-actions">
          <Button variant="ember" onClick={() => navigate('examples')}>{pg.browseExamples}</Button>
          <Button onClick={() => navigate('docs')}>{pg.readDocs}</Button>
        </div>
      </section>
    </div>
  );
}
