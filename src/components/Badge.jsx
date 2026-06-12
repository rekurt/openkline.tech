export function Badge({ tone = 'neutral', pill = false, dot = false, style, children }) {
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
