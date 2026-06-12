export function SegmentedControl({ options = [], value, onChange, size = 'md', style }) {
  const normalized = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  return (
    <div className={`ok-seg${size === 'sm' ? ' ok-seg--sm' : ''}`} role="group" style={style}>
      {normalized.map((o) => (
        <button
          key={o.value}
          type="button"
          className={o.value === value ? 'ok-seg--on' : ''}
          onClick={() => onChange && onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
