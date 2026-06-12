import * as React from 'react';

/**
 * 36px square glyph button — the drawing-tool rail and toolbar utilities.
 * Pass an <Icon> from the openkline stroke set as the child. Never emoji.
 */
export interface IconButtonProps {
  /** Armed/selected state — accent fill */
  active?: boolean;
  size?: 'sm' | 'md';
  /** Tooltip + aria-label. Always provide one. */
  title?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  /** The glyph: an <Icon name="…" size={18} /> from the openkline set */
  children?: React.ReactNode;
}

export declare function IconButton(props: IconButtonProps): React.ReactElement;
