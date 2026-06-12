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
