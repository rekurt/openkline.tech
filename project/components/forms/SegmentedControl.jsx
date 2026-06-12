import React from 'react';

const openklineSegCss = `
.ok-seg {
  display: inline-flex; align-items: stretch;
  background: var(--bg-canvas); border: var(--border-w) solid var(--border);
  border-radius: var(--radius-sm); overflow: hidden;
}
.ok-seg button {
  font-family: var(--font-ui); font-size: var(--text-sm); color: var(--text-muted);
  background: transparent; border: none; cursor: pointer;
  height: calc(var(--control-h-md) - 2px); padding: 0 var(--space-5);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.ok-seg button + button { border-left: var(--border-w) solid var(--border); }
.ok-seg button:hover { background: var(--surface-raised); color: var(--text-1); }
.ok-seg button:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: -2px; }
.ok-seg button.ok-seg--on { background: var(--accent); color: var(--text-on-accent); }
.ok-seg--sm button { height: calc(var(--control-h-sm) - 2px); padding: 0 var(--space-4); }
`;

function ensureSegStyle() {
  if (typeof document !== 'undefined' && !document.getElementById('ok-seg-style')) {
    const s = document.createElement('style');
    s.id = 'ok-seg-style';
    s.textContent = openklineSegCss;
    document.head.appendChild(s);
  }
}

export function SegmentedControl({ options = [], value, onChange, size = 'md', style }) {
  ensureSegStyle();
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
