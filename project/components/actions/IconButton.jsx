import React from 'react';

const openklineIconButtonCss = `
.ok-iconbtn {
  width: var(--icon-btn); height: var(--icon-btn); padding: 0;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: var(--text-lg); line-height: 1; color: var(--text-1);
  background: transparent; border: var(--border-w) solid transparent; border-radius: var(--radius-sm);
  cursor: pointer; user-select: none;
  transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
}
.ok-iconbtn:hover { background: var(--bg-canvas); border-color: var(--border); }
.ok-iconbtn:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
.ok-iconbtn--active { background: var(--accent); border-color: var(--accent); color: var(--text-on-accent); }
.ok-iconbtn--active:hover { background: var(--accent-hover); border-color: var(--accent-hover); }
.ok-iconbtn--sm { width: 28px; height: 28px; font-size: var(--text-md); }
.ok-iconbtn[disabled] { opacity: 0.45; pointer-events: none; }
`;

function ensureIconButtonStyle() {
  if (typeof document !== 'undefined' && !document.getElementById('ok-iconbtn-style')) {
    const s = document.createElement('style');
    s.id = 'ok-iconbtn-style';
    s.textContent = openklineIconButtonCss;
    document.head.appendChild(s);
  }
}

export function IconButton({ active = false, size = 'md', title, disabled = false, onClick, style, children }) {
  ensureIconButtonStyle();
  const cls = [
    'ok-iconbtn',
    active ? 'ok-iconbtn--active' : '',
    size === 'sm' ? 'ok-iconbtn--sm' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button type="button" className={cls} title={title} aria-label={title} disabled={disabled} onClick={onClick} style={style}>
      {children}
    </button>
  );
}
