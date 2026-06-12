import React from 'react';

const openklineKbdCss = `
.ok-kbd {
  display: inline-flex; align-items: center; justify-content: center;
  font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-1);
  min-width: 20px; height: 20px; padding: 0 5px;
  background: var(--surface-raised);
  border: var(--border-w) solid var(--border); border-bottom-width: 2px;
  border-radius: var(--radius-sm);
}
`;

function ensureKbdStyle() {
  if (typeof document !== 'undefined' && !document.getElementById('ok-kbd-style')) {
    const s = document.createElement('style');
    s.id = 'ok-kbd-style';
    s.textContent = openklineKbdCss;
    document.head.appendChild(s);
  }
}

export function Kbd({ style, children }) {
  ensureKbdStyle();
  return (
    <kbd className="ok-kbd" style={style}>
      {children}
    </kbd>
  );
}
