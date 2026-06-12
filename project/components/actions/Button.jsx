import React from 'react';

const openklineButtonCss = `
.ok-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--space-3);
  font-family: var(--font-ui); font-size: var(--text-sm); font-weight: var(--weight-regular);
  color: var(--text-1); background: var(--bg-canvas);
  border: var(--border-w) solid var(--border); border-radius: var(--radius-sm);
  height: var(--control-h-md); padding: 0 var(--space-5);
  cursor: pointer; white-space: nowrap; user-select: none;
  transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
}
.ok-btn:hover { background: var(--border); }
.ok-btn:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
.ok-btn--sm { height: var(--control-h-sm); padding: 0 var(--space-4); font-size: var(--text-sm); }
.ok-btn--lg { height: 40px; padding: 0 var(--space-6); font-size: var(--text-md); font-weight: var(--weight-medium); }
.ok-btn--primary { background: var(--accent); border-color: var(--accent); color: var(--text-on-accent); }
.ok-btn--primary:hover { background: var(--accent-hover); border-color: var(--accent-hover); }
.ok-btn--ember { background: var(--ember); border-color: var(--ember); color: #fff; }
.ok-btn--ember:hover { background: var(--ember-deep); border-color: var(--ember-deep); }
.ok-btn--ghost { background: transparent; border-color: transparent; }
.ok-btn--ghost:hover { background: var(--surface-raised); }
.ok-btn--active { background: var(--accent); border-color: var(--accent); color: var(--text-on-accent); }
.ok-btn--active:hover { background: var(--accent-hover); }
.ok-btn[disabled] { opacity: 0.45; pointer-events: none; }
`;

function ensureButtonStyle() {
  if (typeof document !== 'undefined' && !document.getElementById('ok-btn-style')) {
    const s = document.createElement('style');
    s.id = 'ok-btn-style';
    s.textContent = openklineButtonCss;
    document.head.appendChild(s);
  }
}

export function Button({
  variant = 'toolbar',
  size = 'md',
  active = false,
  disabled = false,
  type = 'button',
  onClick,
  style,
  children,
}) {
  ensureButtonStyle();
  const cls = [
    'ok-btn',
    size !== 'md' ? `ok-btn--${size}` : '',
    variant !== 'toolbar' ? `ok-btn--${variant}` : '',
    active ? 'ok-btn--active' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick} style={style}>
      {children}
    </button>
  );
}
