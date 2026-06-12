import React from 'react';

const openklinePillCss = `
.ok-golive {
  display: inline-flex; align-items: center; gap: var(--space-3);
  font-family: var(--font-ui); font-size: var(--text-sm); font-weight: var(--weight-medium);
  color: var(--text-on-accent); background: var(--accent);
  border: none; border-radius: var(--radius-pill);
  padding: 6px 12px; cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out);
}
.ok-golive:hover { background: var(--accent-hover); }
.ok-golive:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
`;

function ensurePillStyle() {
  if (typeof document !== 'undefined' && !document.getElementById('ok-golive-style')) {
    const s = document.createElement('style');
    s.id = 'ok-golive-style';
    s.textContent = openklinePillCss;
    document.head.appendChild(s);
  }
}

export function GoLivePill({ onClick, style, children }) {
  ensurePillStyle();
  return (
    <button type="button" className="ok-golive" onClick={onClick} style={style}>
      {children || 'Go to live'} <span aria-hidden="true">→</span>
    </button>
  );
}
