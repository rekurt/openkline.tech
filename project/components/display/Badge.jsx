import React from 'react';

const openklineBadgeCss = `
.ok-badge {
  display: inline-flex; align-items: center; gap: var(--space-2);
  font-family: var(--font-mono); font-size: var(--text-2xs); font-weight: var(--weight-medium);
  letter-spacing: 0.08em; text-transform: uppercase;
  padding: 2px 7px; border-radius: var(--radius-sm);
  border: var(--border-w) solid var(--border);
  color: var(--text-muted); background: var(--surface-raised);
  white-space: nowrap;
}
.ok-badge--pill { border-radius: var(--radius-pill); }
.ok-badge--bull { color: var(--bull); background: var(--bull-volume); border-color: transparent; }
.ok-badge--bear { color: var(--bear); background: var(--bear-volume); border-color: transparent; }
.ok-badge--accent { color: var(--accent); background: var(--accent-dim); border-color: transparent; }
.ok-badge--ember { color: var(--ember); background: var(--ember-dim); border-color: transparent; }
.ok-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
`;

function ensureBadgeStyle() {
  if (typeof document !== 'undefined' && !document.getElementById('ok-badge-style')) {
    const s = document.createElement('style');
    s.id = 'ok-badge-style';
    s.textContent = openklineBadgeCss;
    document.head.appendChild(s);
  }
}

export function Badge({ tone = 'neutral', pill = false, dot = false, style, children }) {
  ensureBadgeStyle();
  const cls = [
    'ok-badge',
    tone !== 'neutral' ? `ok-badge--${tone}` : '',
    pill ? 'ok-badge--pill' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <span className={cls} style={style}>
      {dot ? <span className="ok-badge-dot"></span> : null}
      {children}
    </span>
  );
}
