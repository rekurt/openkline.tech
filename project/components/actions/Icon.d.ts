import * as React from 'react';

/**
 * openkline stroke icon set — 24px grid, 1.75px stroke, currentColor.
 * The ONLY approved icon source; emoji are banned brand-wide.
 */
export interface IconProps {
  /** 'pointer' | 'crosshair' | 'trendline' | 'hline' | 'rect' | 'fib' | 'channel' | 'trash' | 'camera' | 'moon' | 'sun' | 'play' | 'check' | 'x' | 'arrowRight' | 'plus' | 'minus' | 'zoomIn' */
  name:
    | 'pointer'
    | 'crosshair'
    | 'trendline'
    | 'hline'
    | 'rect'
    | 'fib'
    | 'channel'
    | 'trash'
    | 'camera'
    | 'moon'
    | 'sun'
    | 'play'
    | 'check'
    | 'x'
    | 'arrowRight'
    | 'plus'
    | 'minus'
    | 'zoomIn';
  /** Square size in px. 16 default; 18 in the tool rail. */
  size?: number;
  strokeWidth?: number;
  style?: React.CSSProperties;
}

export declare function Icon(props: IconProps): React.ReactElement;
