export function LegendChip({ color = 'var(--ind-1)', label, value, onRemove, style }) {
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
