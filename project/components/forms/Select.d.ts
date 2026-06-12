import * as React from 'react';

/**
 * Toolbar select — symbol / timeframe / chart-type pickers.
 * Muted inline label on the left, compact dark control.
 */
export interface SelectProps {
  /** Muted inline label rendered left of the control (e.g. "Symbol", "TF") */
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  /** Strings or {value,label} pairs */
  options?: Array<string | { value: string; label: string }>;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

export declare function Select(props: SelectProps): React.ReactElement;
