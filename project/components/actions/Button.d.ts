import * as React from 'react';

/**
 * openkline button. Toolbar variant is the workhorse inside the terminal;
 * primary (accent blue) for confirming actions; ember for marketing CTAs only.
 */
export interface ButtonProps {
  /** 'toolbar' (default, dark bordered) | 'primary' (accent blue) | 'ember' (brand CTA, marketing only) | 'ghost' */
  variant?: 'toolbar' | 'primary' | 'ember' | 'ghost';
  /** 'sm' 26px | 'md' 32px (default) | 'lg' 40px (marketing) */
  size?: 'sm' | 'md' | 'lg';
  /** Toggled-on state — accent fill, like an armed drawing tool */
  active?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare function Button(props: ButtonProps): React.ReactElement;
