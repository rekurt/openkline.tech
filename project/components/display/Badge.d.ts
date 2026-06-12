import * as React from 'react';

/**
 * Tiny mono uppercase tag — version, license, LIVE state, market direction.
 */
export interface BadgeProps {
  /** 'neutral' | 'bull' | 'bear' | 'accent' | 'ember' */
  tone?: 'neutral' | 'bull' | 'bear' | 'accent' | 'ember';
  /** Full-round corners */
  pill?: boolean;
  /** Leading status dot in the tone color */
  dot?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare function Badge(props: BadgeProps): React.ReactElement;
