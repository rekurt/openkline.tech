import * as React from 'react';

/**
 * Mono tabular price/metric readout — uppercase label, big value,
 * bull/bear-colored delta.
 */
export interface PriceStatProps {
  /** Tiny uppercase mono label, e.g. "BTC/USDT" or "Last price" */
  label?: string;
  /** Pre-formatted value string, e.g. "67,412.50" */
  value?: React.ReactNode;
  /** Number → auto-formatted "▲ 2.31%" colored bull/bear; or a custom node */
  delta?: number | React.ReactNode;
  size?: 'md' | 'lg';
  style?: React.CSSProperties;
}

export declare function PriceStat(props: PriceStatProps): React.ReactElement;
