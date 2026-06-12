import * as React from 'react';

/**
 * Indicator legend entry — color swatch, mono name, muted current value,
 * hover-revealed remove ✕.
 */
export interface LegendChipProps {
  /** Swatch color — use the --ind-* tokens */
  color?: string;
  /** e.g. "SMA 20" */
  label?: React.ReactNode;
  /** Current value, e.g. "67,391.2" */
  value?: React.ReactNode;
  /** Renders a hover-revealed ✕ */
  onRemove?: () => void;
  style?: React.CSSProperties;
}

export declare function LegendChip(props: LegendChipProps): React.ReactElement;
