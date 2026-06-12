import React from 'react';

const openklinePriceStatCss = `
.ok-stat { display: inline-flex; flex-direction: column; gap: var(--space-1); }
.ok-stat-label {
  font-family: var(--font-mono); font-size: var(--text-2xs); font-weight: var(--weight-medium);
  letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted);
}
.ok-stat-value {
  font-family: var(--font-mono); font-size: var(--text-xl); font-weight: var(--weight-semibold);
  font-variant-numeric: tabular-nums; color: var(--text-1); line-height: var(--leading-tight);
}
.ok-stat-value--lg { font-size: var(--text-2xl); }
.ok-stat-delta {
  font-family: var(--font-mono); font-size: var(--text-sm);
  font-variant-numeric: tabular-nums;
}
.ok-stat-delta--bull { color: var(--bull); }
.ok-stat-delta--bear { color: var(--bear); }
`;

function ensurePriceStatStyle() {
  if (typeof document !== 'undefined' && !document.getElementById('ok-stat-style')) {
    const s = document.createElement('style');
    s.id = 'ok-stat-style';
    s.textContent = openklinePriceStatCss;
    document.head.appendChild(s);
  }
}

export function PriceStat({ label, value, delta, size = 'md', style }) {
  ensurePriceStatStyle();
  const dir = typeof delta === 'number' ? (delta >= 0 ? 'bull' : 'bear') : null;
  const deltaText =
    typeof delta === 'number'
      ? `${delta >= 0 ? '▲' : '▼'} ${Math.abs(delta).toFixed(2)}%`
      : delta;
  return (
    <div className="ok-stat" style={style}>
      {label ? <span className="ok-stat-label">{label}</span> : null}
      <span className={`ok-stat-value${size === 'lg' ? ' ok-stat-value--lg' : ''}`}>{value}</span>
      {deltaText != null ? (
        <span className={`ok-stat-delta${dir ? ` ok-stat-delta--${dir}` : ''}`}>{deltaText}</span>
      ) : null}
    </div>
  );
}
