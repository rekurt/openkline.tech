import * as React from 'react';

/**
 * Canvas candlestick chart that recreates the openkline engine's rendering:
 * candles, 30%-alpha volume, grid, mono axes, overlay indicators,
 * dashed last-price line with bull/bear axis chip, snap crosshair.
 * Reads every color from the CSS tokens, so it follows [data-theme].
 */
export interface CandleChartProps {
  /** RNG seed — same seed, same market */
  seed?: number;
  /** Number of candles to generate */
  count?: number;
  basePrice?: number;
  /** Per-candle directional bias (≈ -0.1 … 0.1) */
  drift?: number;
  /** Canvas height — px number or CSS size (e.g. '100%'); width fills the container */
  height?: number | string;
  /** Overlay indicators: 'sma20' | 'ema50' | 'bb' | 'vwap' */
  indicators?: Array<'sma20' | 'ema50' | 'bb' | 'vwap'>;
  showVolume?: boolean;
  showGrid?: boolean;
  showAxes?: boolean;
  showLastPrice?: boolean;
  /** Mouse crosshair with snap-to-candle */
  interactive?: boolean;
  /** Bring your own candles: [{t,o,h,l,c,v}] (overrides seed/count) */
  data?: Array<{ t: number; o: number; h: number; l: number; c: number; v: number }>;
  style?: React.CSSProperties;
}

export declare function CandleChart(props: CandleChartProps): React.ReactElement;
