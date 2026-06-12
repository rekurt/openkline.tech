import React from 'react';

const openklineCheckboxCss = `
.ok-check {
  display: inline-flex; align-items: center; gap: var(--space-4);
  font-family: var(--font-ui); font-size: var(--text-sm); color: var(--text-1);
  cursor: pointer; user-select: none; padding: var(--space-3) 0;
}
.ok-check input { position: absolute; opacity: 0; width: 0; height: 0; }
.ok-check-box {
  width: 14px; height: 14px; flex: none;
  border: var(--border-w) solid var(--border); border-radius: 3px;
  background: var(--bg-canvas);
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 10px; line-height: 1; color: var(--text-on-accent);
  transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
}
.ok-check:hover .ok-check-box { border-color: var(--text-muted); }
.ok-check input:checked + .ok-check-box { background: var(--accent); border-color: var(--accent); }
.ok-check input:focus-visible + .ok-check-box { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
.ok-check--disabled { opacity: 0.45; pointer-events: none; }
`;

function ensureCheckboxStyle() {
  if (typeof document !== 'undefined' && !document.getElementById('ok-check-style')) {
    const s = document.createElement('style');
    s.id = 'ok-check-style';
    s.textContent = openklineCheckboxCss;
    document.head.appendChild(s);
  }
}

export function Checkbox({ label, checked = false, onChange, disabled = false, style }) {
  ensureCheckboxStyle();
  return (
    <label className={`ok-check${disabled ? ' ok-check--disabled' : ''}`} style={style}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      <span className="ok-check-box">{checked ? '✓' : ''}</span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
