import React from 'react';

/* openkline icon set — 24px grid, 1.75px stroke, currentColor.
   Geometry follows the Lucide outline style (flagged substitution:
   the repo ships no icon assets). Emoji are banned brand-wide. */
const ICONS = {
  pointer: [<path key="a" d="m4.5 4.5 6.5 15 2.2-6.3 6.3-2.2-15-6.5Z" />],
  crosshair: [
    <circle key="a" cx="12" cy="12" r="7" />,
    <path key="b" d="M12 2v4M12 18v4M2 12h4M18 12h4" />,
  ],
  trendline: [
    <path key="a" d="m6.8 17.2 10.4-10.4" />,
    <rect key="b" x="3" y="17" width="4" height="4" />,
    <rect key="c" x="17" y="3" width="4" height="4" />,
  ],
  hline: [
    <path key="a" d="M7 12h10" />,
    <rect key="b" x="2" y="10" width="4" height="4" />,
    <rect key="c" x="18" y="10" width="4" height="4" />,
  ],
  rect: [<rect key="a" x="4" y="6" width="16" height="12" />],
  fib: [<path key="a" d="M4 4.5h16M4 10h16M4 14h16M4 19.5h16" />],
  channel: [<path key="a" d="m4 16.5 13-9M7 20.5l13-9" />],
  trash: [
    <path key="a" d="M3.5 6.5h17" />,
    <path key="b" d="M18.5 6.5V19a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V6.5" />,
    <path key="c" d="M8.5 6.5v-2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" />,
    <path key="d" d="M10 11v6M14 11v6" />,
  ],
  camera: [
    <path key="a" d="M3.5 8.2a1.2 1.2 0 0 1 1.2-1.2h2.8l2-2.8h5l2 2.8h2.8a1.2 1.2 0 0 1 1.2 1.2v10.1a1.2 1.2 0 0 1-1.2 1.2H4.7a1.2 1.2 0 0 1-1.2-1.2V8.2Z" />,
    <circle key="b" cx="12" cy="13" r="3.4" />,
  ],
  moon: [<path key="a" d="M12 3.2a6.8 6.8 0 0 0 8.8 8.8A8.8 8.8 0 1 1 12 3.2Z" />],
  sun: [
    <circle key="a" cx="12" cy="12" r="4" />,
    <path key="b" d="M12 2.5v2M12 19.5v2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M2.5 12h2M19.5 12h2M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />,
  ],
  play: [<path key="a" d="M7.5 4.5 19 12 7.5 19.5v-15Z" />],
  check: [<path key="a" d="m4.5 12.5 4.8 4.8L19.5 6.5" />],
  x: [<path key="a" d="m6 6 12 12M18 6 6 18" />],
  arrowRight: [<path key="a" d="M4.5 12h15" />, <path key="b" d="m13.5 6 6 6-6 6" />],
  plus: [<path key="a" d="M12 5v14M5 12h14" />],
  minus: [<path key="a" d="M5 12h14" />],
  zoomIn: [
    <circle key="a" cx="11" cy="11" r="6.5" />,
    <path key="b" d="m20.5 20.5-4.8-4.8M8.2 11h5.6M11 8.2v5.6" />,
  ],
};

export const ICON_NAMES = Object.keys(ICONS);

export function Icon({ name, size = 16, strokeWidth = 1.75, style }) {
  const kids = ICONS[name];
  if (!kids) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      {kids}
    </svg>
  );
}
