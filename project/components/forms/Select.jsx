import React from 'react';

const openklineSelectCss = `
.ok-select-wrap { display: inline-flex; align-items: center; gap: var(--space-3); }
.ok-select-label { font-family: var(--font-ui); font-size: var(--text-sm); color: var(--text-muted); }
.ok-select {
  font-family: var(--font-ui); font-size: var(--text-sm); color: var(--text-1);
  background: var(--bg-canvas); border: var(--border-w) solid var(--border); border-radius: var(--radius-sm);
  height: var(--control-h-md); padding: 0 var(--space-4); cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out);
}
.ok-select:hover { background: var(--border); }
.ok-select:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
.ok-select--sm { height: var(--control-h-sm); }
`;

function ensureSelectStyle() {
  if (typeof document !== 'undefined' && !document.getElementById('ok-select-style')) {
    const s = document.createElement('style');
    s.id = 'ok-select-style';
    s.textContent = openklineSelectCss;
    document.head.appendChild(s);
  }
}

export function Select({ label, value, onChange, options = [], size = 'md', style }) {
  ensureSelectStyle();
  const normalized = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  const select = (
    <select
      className={`ok-select${size === 'sm' ? ' ok-select--sm' : ''}`}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      style={style}
    >
      {normalized.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
  if (!label) return select;
  return (
    <label className="ok-select-wrap">
      <span className="ok-select-label">{label}</span>
      {select}
    </label>
  );
}
