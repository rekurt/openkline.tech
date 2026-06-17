import { useEffect, useMemo, useRef } from 'react';
import { OHLCVChart } from '@rekurt/openkline-core';
import { generateCandles, symbolByLabel, resolutionById } from '../engine/index.js';

// Read the site's current theme ('dark' | 'light') off <html data-theme>. The
// engine accepts the same tokens, so charts follow the site toggle for free.
function siteTheme() {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

/**
 * React host for the REAL @rekurt/openkline-core engine. Mirrors the engine
 * repo's examples/playground CoreTab: construct in an effect, drive imperatively
 * on prop changes, destroy on unmount. Data is deterministic mock candles so the
 * render is reproducible without an exchange connection.
 *
 * Props:
 *  - symbol:      label string, e.g. 'BTC/USDT'         (default 'BTC/USDT')
 *  - resolution:  id string, e.g. '1H'                  (default '1H')
 *  - chartType:   'candles'|'line'|'area'|'ohlc'|'heikinashi'|'baseline'
 *  - indicators:  IndicatorConfig[]  (real engine configs)
 *  - count:       number of candles to generate         (default 200)
 *  - height:      css height in px                       (default 320)
 *  - onReady:     (chart|null) => void — receive the live engine instance
 *                 (e.g. for saveLayoutState); called null on teardown.
 */
export function OkChart({
  symbol = 'BTC/USDT',
  resolution = '1H',
  chartType = 'candles',
  indicators = [],
  count = 200,
  height = 320,
  style,
  onReady,
  theme, // optional explicit theme; when omitted the chart follows the site theme
}) {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const initialIdRef = useRef({ symbol, resolution });
  const themeRef = useRef(theme);
  const resolveTheme = () => themeRef.current || siteTheme();

  // Deterministic dataset — only regenerates when the identity/length changes.
  const candles = useMemo(
    () => generateCandles({ symbol: symbolByLabel(symbol), resolution: resolutionById(resolution), count }),
    [symbol, resolution, count],
  );

  // Serialize indicators so a fresh array literal with the same contents does
  // not re-run the reconcile effect every render.
  const indicatorKey = useMemo(() => JSON.stringify(indicators), [indicators]);

  // Mount: build the engine once, wire a theme observer, tear down on unmount.
  useEffect(() => {
    if (!containerRef.current) return undefined;
    let chart;
    try {
      chart = new OHLCVChart({
        container: containerRef.current,
        symbol,
        resolution,
        theme: resolveTheme(),
        chartType,
        onError: (err) => console.warn('[openkline]', err),
      });
      chart.setData(candles);
      chart.setIndicatorConfigs(indicators);
    } catch (err) {
      console.warn('[openkline] init failed', err);
      return undefined;
    }
    chartRef.current = chart;
    initialIdRef.current = { symbol, resolution };
    onReady?.(chart);

    // Follow the site theme toggle (data-theme on <html>) unless an explicit
    // theme prop pins it.
    const obs = new MutationObserver(() => chart.setTheme(resolveTheme()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      obs.disconnect();
      onReady?.(null);
      chart.destroy();
      chartRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Identity switch must land before the new dataset (declared first).
  useEffect(() => {
    const initial = initialIdRef.current;
    if (initial.symbol === symbol && initial.resolution === resolution) {
      initialIdRef.current = { symbol: '', resolution: '' };
      return;
    }
    Promise.resolve(chartRef.current?.switchSymbol(symbol, resolution)).catch(() => {});
  }, [symbol, resolution]);

  useEffect(() => {
    themeRef.current = theme;
    chartRef.current?.setTheme(resolveTheme());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  useEffect(() => {
    chartRef.current?.setData(candles, { preserveView: true });
  }, [candles]);

  useEffect(() => {
    chartRef.current?.setChartType(chartType);
  }, [chartType]);

  useEffect(() => {
    chartRef.current?.setIndicatorConfigs(indicators);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indicatorKey]);

  return <div ref={containerRef} style={{ width: '100%', height, ...style }} />;
}
