import React from 'react';

const openklineLegendCss = `
.ok-legend {
  display: inline-flex; align-items: center; gap: var(--space-3);
  font-family: var(--font-mono); font-size: var(--text-sm);
  font-variant-numeric: tabular-nums; color: var(--text-1);
  padding: 2px var(--space-3); border-radius: var(--radius-sm);
}
.ok-legend-dot { width: 8px; height: 8px; border-radius: 2px; flex: none; }
.ok-legend-value { color: var(--text-muted); }
.ok-legend-x {
  background: none; border: none; padding: 0 2px; cursor: pointer;
  color: var(--text-muted); font-size: var(--text-xs); line-height: 1;
  border-radius: 2px; opacity: 0; transition: opacity var(--dur-fast) var(--ease-out);
}
.ok-legend:hover .ok-legend-x { opacity: 1; }
.ok-legend-x:hover { color: var(--text-1); }
`;

function ensureLegendStyle() {
  if (typeof document !== 'undefined' && !document.getElementById('ok-legend-style')) {
    const s = document.createElement('style');
    s.id = 'ok-legend-style';
    s.textContent = openklineLegendCss;
    document.head.appendChild(s);
  }
}

export function LegendChip({ color = 'var(--ind-1)', label, value, onRemove, style }) {
  ensureLegendStyle();
  return (
    <span className="ok-legend" style={style}>
      <span className="ok-legend-dot" style={{ background: color }}></span>
      <span>{label}</span>
      {value != null ? <span className="ok-legend-value">{value}</span> : null}
      {onRemove ? (
        <button type="button" className="ok-legend-x" title="Remove" onClick={onRemove}>
          ✕
        </button>
      ) : null}
    </span>
  );
}
