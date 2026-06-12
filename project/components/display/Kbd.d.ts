import * as React from 'react';

/**
 * Keyboard key cap — keyboard-first UX is a product pillar, so shortcuts
 * appear in hints, docs, and marketing.
 */
export interface KbdProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare function Kbd(props: KbdProps): React.ReactElement;
