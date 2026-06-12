import * as React from 'react';

/**
 * The engine's "Go to live" pill — appears floating over the chart when the
 * user pans away from the right edge (autoFollow disengaged).
 */
export interface GoLivePillProps {
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  /** Defaults to "Go to live" */
  children?: React.ReactNode;
}

export declare function GoLivePill(props: GoLivePillProps): React.ReactElement;
