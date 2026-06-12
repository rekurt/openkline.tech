import * as React from 'react';

/**
 * Dark code panel for install commands and snippets — mono, hairline,
 * optional uppercase title bar and ember `$` prompt.
 */
export interface CodeBlockProps {
  /** Tiny uppercase header, e.g. "bash" or "chart.ts" */
  title?: string;
  /** Prefix the first line with an ember "$ " shell prompt */
  prompt?: boolean;
  /** Show a copy-to-clipboard button in the header */
  copy?: boolean;
  /** Text to copy when children aren't a plain string */
  copyText?: string;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
  /** Code content — string or styled spans */
  children?: React.ReactNode;
}

export declare function CodeBlock(props: CodeBlockProps): React.ReactElement;
