import * as React from 'react';

/**
 * Joined button group for exclusive choices — chart type, timeframe rows.
 * Active segment fills accent blue.
 */
export interface SegmentedControlProps {
  /** Strings or {value,label} pairs */
  options?: Array<string | { value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

export declare function SegmentedControl(props: SegmentedControlProps): React.ReactElement;
