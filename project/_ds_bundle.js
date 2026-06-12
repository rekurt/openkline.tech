/* @ds-bundle: {"format":3,"namespace":"TorchDesignSystem_f84e77","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"ICON_NAMES","sourcePath":"components/actions/Icon.jsx"},{"name":"Icon","sourcePath":"components/actions/Icon.jsx"},{"name":"IconButton","sourcePath":"components/actions/IconButton.jsx"},{"name":"CandleChart","sourcePath":"components/chart/CandleChart.jsx"},{"name":"GoLivePill","sourcePath":"components/chart/GoLivePill.jsx"},{"name":"LegendChip","sourcePath":"components/chart/LegendChip.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"CodeBlock","sourcePath":"components/display/CodeBlock.jsx"},{"name":"Kbd","sourcePath":"components/display/Kbd.jsx"},{"name":"PriceStat","sourcePath":"components/display/PriceStat.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"TerminalApp","sourcePath":"ui_kits/terminal/TerminalApp.jsx"},{"name":"DevPage","sourcePath":"ui_kits/website/DevPage.jsx"},{"name":"LandingCommunity","sourcePath":"ui_kits/website/LandingCommunity.jsx"},{"name":"LandingPage","sourcePath":"ui_kits/website/LandingPage.jsx"},{"name":"ProductPage","sourcePath":"ui_kits/website/ProductPage.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"beba39dd6e61","components/actions/Icon.jsx":"6da4e24e7467","components/actions/IconButton.jsx":"5bc3fc0572cc","components/chart/CandleChart.jsx":"2b4cab5f0f06","components/chart/GoLivePill.jsx":"186c39ec4a35","components/chart/LegendChip.jsx":"3b847c8be2a0","components/display/Badge.jsx":"d19955f34c3e","components/display/CodeBlock.jsx":"c29ff4ca0679","components/display/Kbd.jsx":"9a970f24cadc","components/display/PriceStat.jsx":"d9b3a8fd13e9","components/forms/Checkbox.jsx":"7be255f74bc2","components/forms/SegmentedControl.jsx":"f4548194b4d4","components/forms/Select.jsx":"6b32096e2439","ui_kits/terminal/TerminalApp.jsx":"4424b5464de6","ui_kits/website/DevPage.jsx":"411ee4fa28b1","ui_kits/website/LandingCommunity.jsx":"80893a535e17","ui_kits/website/LandingPage.jsx":"d59809402d32","ui_kits/website/ProductPage.jsx":"446741e56586"},"inlinedExternals":[],"unexposedExports":[{"name":"generateCandles","sourcePath":"components/chart/CandleChart.jsx"}]} */

(() => {

const __ds_ns = (window.TorchDesignSystem_f84e77 = window.TorchDesignSystem_f84e77 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
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
function Button({
  variant = 'toolbar',
  size = 'md',
  active = false,
  disabled = false,
  type = 'button',
  onClick,
  style,
  children
}) {
  ensureButtonStyle();
  const cls = ['ok-btn', size !== 'md' ? `ok-btn--${size}` : '', variant !== 'toolbar' ? `ok-btn--${variant}` : '', active ? 'ok-btn--active' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    className: cls,
    disabled: disabled,
    onClick: onClick,
    style: style
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/Icon.jsx
try { (() => {
/* openkline icon set — 24px grid, 1.75px stroke, currentColor.
   Geometry follows the Lucide outline style (flagged substitution:
   the repo ships no icon assets). Emoji are banned brand-wide. */
const ICONS = {
  pointer: [/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "m4.5 4.5 6.5 15 2.2-6.3 6.3-2.2-15-6.5Z"
  })],
  crosshair: [/*#__PURE__*/React.createElement("circle", {
    key: "a",
    cx: "12",
    cy: "12",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M12 2v4M12 18v4M2 12h4M18 12h4"
  })],
  trendline: [/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "m6.8 17.2 10.4-10.4"
  }), /*#__PURE__*/React.createElement("rect", {
    key: "b",
    x: "3",
    y: "17",
    width: "4",
    height: "4"
  }), /*#__PURE__*/React.createElement("rect", {
    key: "c",
    x: "17",
    y: "3",
    width: "4",
    height: "4"
  })],
  hline: [/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M7 12h10"
  }), /*#__PURE__*/React.createElement("rect", {
    key: "b",
    x: "2",
    y: "10",
    width: "4",
    height: "4"
  }), /*#__PURE__*/React.createElement("rect", {
    key: "c",
    x: "18",
    y: "10",
    width: "4",
    height: "4"
  })],
  rect: [/*#__PURE__*/React.createElement("rect", {
    key: "a",
    x: "4",
    y: "6",
    width: "16",
    height: "12"
  })],
  fib: [/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M4 4.5h16M4 10h16M4 14h16M4 19.5h16"
  })],
  channel: [/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "m4 16.5 13-9M7 20.5l13-9"
  })],
  trash: [/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M3.5 6.5h17"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M18.5 6.5V19a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V6.5"
  }), /*#__PURE__*/React.createElement("path", {
    key: "c",
    d: "M8.5 6.5v-2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2"
  }), /*#__PURE__*/React.createElement("path", {
    key: "d",
    d: "M10 11v6M14 11v6"
  })],
  camera: [/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M3.5 8.2a1.2 1.2 0 0 1 1.2-1.2h2.8l2-2.8h5l2 2.8h2.8a1.2 1.2 0 0 1 1.2 1.2v10.1a1.2 1.2 0 0 1-1.2 1.2H4.7a1.2 1.2 0 0 1-1.2-1.2V8.2Z"
  }), /*#__PURE__*/React.createElement("circle", {
    key: "b",
    cx: "12",
    cy: "13",
    r: "3.4"
  })],
  moon: [/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M12 3.2a6.8 6.8 0 0 0 8.8 8.8A8.8 8.8 0 1 1 12 3.2Z"
  })],
  sun: [/*#__PURE__*/React.createElement("circle", {
    key: "a",
    cx: "12",
    cy: "12",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M12 2.5v2M12 19.5v2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M2.5 12h2M19.5 12h2M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"
  })],
  play: [/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M7.5 4.5 19 12 7.5 19.5v-15Z"
  })],
  check: [/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "m4.5 12.5 4.8 4.8L19.5 6.5"
  })],
  x: [/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "m6 6 12 12M18 6 6 18"
  })],
  arrowRight: [/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M4.5 12h15"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "m13.5 6 6 6-6 6"
  })],
  plus: [/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M12 5v14M5 12h14"
  })],
  minus: [/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M5 12h14"
  })],
  zoomIn: [/*#__PURE__*/React.createElement("circle", {
    key: "a",
    cx: "11",
    cy: "11",
    r: "6.5"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "m20.5 20.5-4.8-4.8M8.2 11h5.6M11 8.2v5.6"
  })]
};
const ICON_NAMES = Object.keys(ICONS);
function Icon({
  name,
  size = 16,
  strokeWidth = 1.75,
  style
}) {
  const kids = ICONS[name];
  if (!kids) return null;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: style
  }, kids);
}
Object.assign(__ds_scope, { ICON_NAMES, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Icon.jsx", error: String((e && e.message) || e) }); }

// components/actions/IconButton.jsx
try { (() => {
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
function IconButton({
  active = false,
  size = 'md',
  title,
  disabled = false,
  onClick,
  style,
  children
}) {
  ensureIconButtonStyle();
  const cls = ['ok-iconbtn', active ? 'ok-iconbtn--active' : '', size === 'sm' ? 'ok-iconbtn--sm' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: cls,
    title: title,
    "aria-label": title,
    disabled: disabled,
    onClick: onClick,
    style: style
  }, children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/chart/CandleChart.jsx
try { (() => {
const {
  useEffect,
  useMemo,
  useRef
} = React;
/* Seeded RNG so every render of a given seed draws the same market */
function mulberry32(a) {
  return function () {
    a |= 0;
    a = a + 0x6d2b79f5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function generateCandles({
  seed = 42,
  count = 180,
  basePrice = 100,
  drift = 0.02,
  volatility = 0.012
}) {
  const rnd = mulberry32(seed);
  const candles = [];
  let price = basePrice;
  const start = 1718150400 - count * 3600;
  for (let i = 0; i < count; i++) {
    const o = price;
    const dir = rnd() - 0.5 + drift * 0.5;
    const move = dir * volatility * 2 * price;
    const c = Math.max(o + move, basePrice * 0.2);
    const wick = volatility * price;
    const h = Math.max(o, c) + rnd() * wick;
    const l = Math.min(o, c) - rnd() * wick;
    const v = 200 + rnd() * 800 * (1 + Math.abs(move) / (volatility * price));
    candles.push({
      t: start + i * 3600,
      o,
      h,
      l,
      c,
      v
    });
    price = c;
  }
  return candles;
}
function sma(candles, period) {
  const out = new Array(candles.length).fill(null);
  let sum = 0;
  for (let i = 0; i < candles.length; i++) {
    sum += candles[i].c;
    if (i >= period) sum -= candles[i - period].c;
    if (i >= period - 1) out[i] = sum / period;
  }
  return out;
}
function ema(candles, period) {
  const out = new Array(candles.length).fill(null);
  const k = 2 / (period + 1);
  let prev = null;
  for (let i = 0; i < candles.length; i++) {
    prev = prev === null ? candles[i].c : candles[i].c * k + prev * (1 - k);
    if (i >= period - 1) out[i] = prev;
  }
  return out;
}
function bollinger(candles, period = 20, mult = 2) {
  const mid = sma(candles, period);
  const up = new Array(candles.length).fill(null);
  const lo = new Array(candles.length).fill(null);
  for (let i = period - 1; i < candles.length; i++) {
    let s = 0;
    for (let j = i - period + 1; j <= i; j++) s += Math.pow(candles[j].c - mid[i], 2);
    const sd = Math.sqrt(s / period);
    up[i] = mid[i] + mult * sd;
    lo[i] = mid[i] - mult * sd;
  }
  return {
    mid,
    up,
    lo
  };
}
function vwap(candles) {
  const out = new Array(candles.length).fill(null);
  let pv = 0;
  let vol = 0;
  for (let i = 0; i < candles.length; i++) {
    const tp = (candles[i].h + candles[i].l + candles[i].c) / 3;
    pv += tp * candles[i].v;
    vol += candles[i].v;
    out[i] = pv / vol;
  }
  return out;
}
function cssVar(el, name, fallback) {
  const v = getComputedStyle(el).getPropertyValue(name).trim();
  return v || fallback;
}
const HOUR = 3600;

/**
 * Decorative-but-honest recreation of the openkline chart canvas: candles,
 * volume, grid, axes, overlay indicators, last-price line, crosshair.
 */
function CandleChart({
  seed = 42,
  count = 180,
  basePrice = 100,
  drift = 0.02,
  height = 360,
  indicators = [],
  showVolume = true,
  showGrid = true,
  showAxes = true,
  showLastPrice = true,
  interactive = true,
  data,
  style
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef(null);
  const candles = useMemo(() => data || generateCandles({
    seed,
    count,
    basePrice,
    drift
  }), [data, seed, count, basePrice, drift]);
  const series = useMemo(() => {
    const s = {};
    if (indicators.includes('sma20')) s.sma20 = sma(candles, 20);
    if (indicators.includes('ema50')) s.ema50 = ema(candles, 50);
    if (indicators.includes('bb')) s.bb = bollinger(candles, 20, 2);
    if (indicators.includes('vwap')) s.vwap = vwap(candles);
    return s;
  }, [candles, indicators.join(',')]);
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;
    const ctx = canvas.getContext('2d');
    function draw() {
      const W = wrap.clientWidth;
      const H = wrap.clientHeight || (typeof height === 'number' ? height : 0);
      if (W === 0 || H === 0) return;
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const col = {
        bg: cssVar(wrap, '--bg-canvas', '#131722'),
        bull: cssVar(wrap, '--bull', '#26a69a'),
        bear: cssVar(wrap, '--bear', '#ef5350'),
        bullVol: cssVar(wrap, '--bull-volume', 'rgba(38,166,154,0.3)'),
        bearVol: cssVar(wrap, '--bear-volume', 'rgba(239,83,80,0.3)'),
        grid: cssVar(wrap, '--grid', '#1e222d'),
        axis: cssVar(wrap, '--axis', '#363a45'),
        text: cssVar(wrap, '--text-muted', '#758696'),
        crosshair: cssVar(wrap, '--crosshair', '#758696'),
        priceLine: cssVar(wrap, '--price-line', '#4c525e'),
        panel: cssVar(wrap, '--surface-panel', '#1e222d'),
        textStrong: cssVar(wrap, '--text-1', '#d1d4dc'),
        ind1: cssVar(wrap, '--ind-1', '#f5c344'),
        ind2: cssVar(wrap, '--ind-2', '#58a6ff'),
        ind3: cssVar(wrap, '--ind-3', '#c084fc'),
        ind4: cssVar(wrap, '--ind-4', '#f97583')
      };
      const axisW = showAxes ? 56 : 0;
      const timeH = showAxes ? 22 : 0;
      const plotW = W - axisW;
      const plotH = H - timeH;
      const volH = showVolume ? Math.round(plotH * 0.18) : 0;
      ctx.fillStyle = col.bg;
      ctx.fillRect(0, 0, W, H);
      let min = Infinity;
      let max = -Infinity;
      for (const c of candles) {
        if (c.l < min) min = c.l;
        if (c.h > max) max = c.h;
      }
      if (series.bb) {
        for (let i = 0; i < candles.length; i++) {
          if (series.bb.up[i] !== null) {
            if (series.bb.up[i] > max) max = series.bb.up[i];
            if (series.bb.lo[i] < min) min = series.bb.lo[i];
          }
        }
      }
      const pad = (max - min) * 0.05;
      min -= pad;
      max += pad;
      let maxVol = 0;
      for (const c of candles) if (c.v > maxVol) maxVol = c.v;
      const n = candles.length;
      const slot = plotW / n;
      const bodyW = Math.max(1, Math.floor(slot * 0.7));
      const xAt = i => i * slot + slot / 2;
      const yAt = p => (max - p) / (max - min) * (plotH - volH);

      /* grid */
      if (showGrid) {
        ctx.strokeStyle = col.grid;
        ctx.lineWidth = 1;
        const rows = 5;
        for (let r = 0; r <= rows; r++) {
          const y = Math.round(r / rows * (plotH - volH)) + 0.5;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(plotW, y);
          ctx.stroke();
        }
        const colsN = Math.max(2, Math.floor(plotW / 120));
        for (let cI = 0; cI <= colsN; cI++) {
          const x = Math.round(cI / colsN * plotW) + 0.5;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, plotH);
          ctx.stroke();
        }
      }

      /* volume */
      if (showVolume) {
        for (let i = 0; i < n; i++) {
          const c = candles[i];
          const vh = c.v / maxVol * volH;
          ctx.fillStyle = c.c >= c.o ? col.bullVol : col.bearVol;
          ctx.fillRect(xAt(i) - bodyW / 2, plotH - vh, bodyW, vh);
        }
      }

      /* candles */
      for (let i = 0; i < n; i++) {
        const c = candles[i];
        const up = c.c >= c.o;
        ctx.strokeStyle = up ? col.bull : col.bear;
        ctx.fillStyle = up ? col.bull : col.bear;
        const x = Math.round(xAt(i)) + 0.5;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, yAt(c.h));
        ctx.lineTo(x, yAt(c.l));
        ctx.stroke();
        const top = yAt(Math.max(c.o, c.c));
        const hgt = Math.max(1, Math.abs(yAt(c.o) - yAt(c.c)));
        ctx.fillRect(Math.round(xAt(i) - bodyW / 2), top, bodyW, hgt);
      }

      /* indicator overlays */
      function line(arr, color, width = 1.5) {
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        let started = false;
        for (let i = 0; i < n; i++) {
          if (arr[i] === null) continue;
          const x = xAt(i);
          const y = yAt(arr[i]);
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      if (series.bb) {
        line(series.bb.up, col.ind3, 1);
        line(series.bb.lo, col.ind3, 1);
        line(series.bb.mid, col.ind3, 1);
      }
      if (series.sma20) line(series.sma20, col.ind1);
      if (series.ema50) line(series.ema50, col.ind2);
      if (series.vwap) line(series.vwap, col.ind4);

      /* axes */
      if (showAxes) {
        ctx.fillStyle = col.bg;
        ctx.fillRect(plotW, 0, axisW, H);
        ctx.strokeStyle = col.axis;
        ctx.beginPath();
        ctx.moveTo(plotW + 0.5, 0);
        ctx.lineTo(plotW + 0.5, plotH);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, plotH + 0.5);
        ctx.lineTo(plotW, plotH + 0.5);
        ctx.stroke();
        ctx.fillStyle = col.text;
        ctx.font = "11px 'JetBrains Mono', ui-monospace, monospace";
        ctx.textBaseline = 'middle';
        const rows = 5;
        for (let r = 1; r < rows; r++) {
          const y = r / rows * (plotH - volH);
          const p = max - r / rows * (max - min);
          ctx.fillText(p >= 1000 ? p.toFixed(0) : p.toFixed(2), plotW + 8, y);
        }
        const colsN = Math.max(2, Math.floor(plotW / 120));
        ctx.textAlign = 'center';
        for (let cI = 1; cI < colsN; cI++) {
          const i = Math.floor(cI / colsN * n);
          const d = new Date(candles[i].t * 1000);
          ctx.fillText(`${String(d.getUTCDate()).padStart(2, '0')} ${String(d.getUTCHours()).padStart(2, '0')}:00`, cI / colsN * plotW, plotH + 11);
        }
        ctx.textAlign = 'left';
      }

      /* last price */
      if (showLastPrice) {
        const lastC = candles[n - 1];
        const y = Math.round(yAt(lastC.c)) + 0.5;
        const up = lastC.c >= lastC.o;
        ctx.strokeStyle = col.priceLine;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(plotW, y);
        ctx.stroke();
        ctx.setLineDash([]);
        if (showAxes) {
          const label = lastC.c >= 1000 ? lastC.c.toFixed(0) : lastC.c.toFixed(2);
          ctx.fillStyle = up ? col.bull : col.bear;
          ctx.fillRect(plotW + 2, y - 9, axisW - 4, 18);
          ctx.fillStyle = '#ffffff';
          ctx.font = "11px 'JetBrains Mono', ui-monospace, monospace";
          ctx.fillText(label, plotW + 8, y);
        }
      }

      /* crosshair */
      const m = mouseRef.current;
      if (interactive && m && m.x < plotW && m.y < plotH) {
        const i = Math.min(n - 1, Math.max(0, Math.floor(m.x / slot)));
        const snapX = Math.round(xAt(i)) + 0.5;
        ctx.strokeStyle = col.crosshair;
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(snapX, 0);
        ctx.lineTo(snapX, plotH);
        ctx.stroke();
        const y = Math.round(m.y) + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(plotW, y);
        ctx.stroke();
        ctx.setLineDash([]);
        if (showAxes) {
          const p = max - m.y / (plotH - volH) * (max - min);
          ctx.fillStyle = col.panel;
          ctx.fillRect(plotW + 2, y - 9, axisW - 4, 18);
          ctx.strokeStyle = col.axis;
          ctx.strokeRect(plotW + 2.5, y - 8.5, axisW - 5, 17);
          ctx.fillStyle = col.textStrong;
          ctx.font = "11px 'JetBrains Mono', ui-monospace, monospace";
          ctx.fillText(p >= 1000 ? p.toFixed(0) : p.toFixed(2), plotW + 8, y);
        }
      }
    }
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(wrap);
    let onMove = null;
    let onLeave = null;
    if (interactive) {
      onMove = e => {
        const r = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - r.left,
          y: e.clientY - r.top
        };
        draw();
      };
      onLeave = () => {
        mouseRef.current = null;
        draw();
      };
      canvas.addEventListener('mousemove', onMove);
      canvas.addEventListener('mouseleave', onLeave);
    }
    const mo = new MutationObserver(draw);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    return () => {
      ro.disconnect();
      mo.disconnect();
      if (onMove) canvas.removeEventListener('mousemove', onMove);
      if (onLeave) canvas.removeEventListener('mouseleave', onLeave);
    };
  }, [candles, series, height, showVolume, showGrid, showAxes, showLastPrice, interactive]);
  return /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    style: {
      position: 'relative',
      width: '100%',
      height,
      ...style
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      display: 'block',
      cursor: interactive ? 'crosshair' : 'default'
    }
  }));
}
Object.assign(__ds_scope, { generateCandles, CandleChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chart/CandleChart.jsx", error: String((e && e.message) || e) }); }

// components/chart/GoLivePill.jsx
try { (() => {
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
function GoLivePill({
  onClick,
  style,
  children
}) {
  ensurePillStyle();
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ok-golive",
    onClick: onClick,
    style: style
  }, children || 'Go to live', " ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192"));
}
Object.assign(__ds_scope, { GoLivePill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chart/GoLivePill.jsx", error: String((e && e.message) || e) }); }

// components/chart/LegendChip.jsx
try { (() => {
const openklineLegendCss = `
.ok-legend {
  display: inline-flex; align-items: center; gap: var(--space-3);
  font-family: var(--font-mono); font-size: var(--text-sm);
  font-variant-numeric: tabular-nums; color: var(--text-1);
  padding: 2px var(--space-3); border-radius: var(--radius-sm);
}
.ok-legend-dot { width: 8px; height: 8px; border-radius: 2px; flex: none; }
.ok-legend-value { color: var(--text-muted); }
.ok-legend-x {
  background: none; border: none; padding: 0 2px; cursor: pointer;
  color: var(--text-muted); font-size: var(--text-xs); line-height: 1;
  border-radius: 2px; opacity: 0; transition: opacity var(--dur-fast) var(--ease-out);
}
.ok-legend:hover .ok-legend-x { opacity: 1; }
.ok-legend-x:hover { color: var(--text-1); }
`;
function ensureLegendStyle() {
  if (typeof document !== 'undefined' && !document.getElementById('ok-legend-style')) {
    const s = document.createElement('style');
    s.id = 'ok-legend-style';
    s.textContent = openklineLegendCss;
    document.head.appendChild(s);
  }
}
function LegendChip({
  color = 'var(--ind-1)',
  label,
  value,
  onRemove,
  style
}) {
  ensureLegendStyle();
  return /*#__PURE__*/React.createElement("span", {
    className: "ok-legend",
    style: style
  }, /*#__PURE__*/React.createElement("span", {
    className: "ok-legend-dot",
    style: {
      background: color
    }
  }), /*#__PURE__*/React.createElement("span", null, label), value != null ? /*#__PURE__*/React.createElement("span", {
    className: "ok-legend-value"
  }, value) : null, onRemove ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ok-legend-x",
    title: "Remove",
    onClick: onRemove
  }, "\u2715") : null);
}
Object.assign(__ds_scope, { LegendChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chart/LegendChip.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
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
function Badge({
  tone = 'neutral',
  pill = false,
  dot = false,
  style,
  children
}) {
  ensureBadgeStyle();
  const cls = ['ok-badge', tone !== 'neutral' ? `ok-badge--${tone}` : '', pill ? 'ok-badge--pill' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", {
    className: cls,
    style: style
  }, dot ? /*#__PURE__*/React.createElement("span", {
    className: "ok-badge-dot"
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/CodeBlock.jsx
try { (() => {
const {
  useState
} = React;
const openklineCodeBlockCss = `
.ok-code {
  background: var(--bg-canvas); border: var(--border-w) solid var(--border);
  border-radius: var(--radius-md); overflow: hidden;
  text-align: left;
}
[data-theme='light'] .ok-code { background: #f6f8fc; }
.ok-code-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--space-3) var(--space-5);
  border-bottom: var(--border-w) solid var(--border);
  font-family: var(--font-mono); font-size: var(--text-2xs); letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--text-muted);
}
.ok-code pre {
  margin: 0; padding: var(--space-6);
  font-family: var(--font-mono); font-size: var(--text-md); line-height: var(--leading-relaxed);
  color: var(--text-1); overflow-x: auto;
}
.ok-code--sm pre { font-size: var(--text-sm); padding: var(--space-5); }
.ok-code .ok-code-prompt { color: var(--ember); user-select: none; }
.ok-code-copy {
  background: none; border: none; cursor: pointer; padding: 0;
  font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--text-muted); transition: color var(--dur-fast) var(--ease-out);
}
.ok-code-copy:hover { color: var(--text-1); }
.ok-code-copy.is-copied { color: var(--ember); }
`;
function ensureCodeBlockStyle() {
  if (typeof document !== 'undefined' && !document.getElementById('ok-code-style')) {
    const s = document.createElement('style');
    s.id = 'ok-code-style';
    s.textContent = openklineCodeBlockCss;
    document.head.appendChild(s);
  }
}
function CodeBlock({
  title,
  prompt = false,
  size = 'md',
  copy = false,
  copyText,
  style,
  children
}) {
  ensureCodeBlockStyle();
  const [copied, setCopied] = useState(false);
  const text = copyText || (typeof children === 'string' ? children : '');
  function doCopy() {
    if (!text || !navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }, () => {});
  }
  const showHead = title || copy && text;
  return /*#__PURE__*/React.createElement("div", {
    className: `ok-code${size === 'sm' ? ' ok-code--sm' : ''}`,
    style: style
  }, showHead ? /*#__PURE__*/React.createElement("div", {
    className: "ok-code-head"
  }, /*#__PURE__*/React.createElement("span", null, title || 'bash'), copy && text ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `ok-code-copy${copied ? ' is-copied' : ''}`,
    onClick: doCopy
  }, copied ? 'copied ✓' : 'copy') : null) : null, /*#__PURE__*/React.createElement("pre", null, /*#__PURE__*/React.createElement("code", null, prompt ? /*#__PURE__*/React.createElement("span", {
    className: "ok-code-prompt"
  }, "$ ") : null, children)));
}
Object.assign(__ds_scope, { CodeBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/CodeBlock.jsx", error: String((e && e.message) || e) }); }

// components/display/Kbd.jsx
try { (() => {
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
function Kbd({
  style,
  children
}) {
  ensureKbdStyle();
  return /*#__PURE__*/React.createElement("kbd", {
    className: "ok-kbd",
    style: style
  }, children);
}
Object.assign(__ds_scope, { Kbd });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Kbd.jsx", error: String((e && e.message) || e) }); }

// components/display/PriceStat.jsx
try { (() => {
const openklinePriceStatCss = `
.ok-stat { display: inline-flex; flex-direction: column; gap: var(--space-1); }
.ok-stat-label {
  font-family: var(--font-mono); font-size: var(--text-2xs); font-weight: var(--weight-medium);
  letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted);
}
.ok-stat-value {
  font-family: var(--font-mono); font-size: var(--text-xl); font-weight: var(--weight-semibold);
  font-variant-numeric: tabular-nums; color: var(--text-1); line-height: var(--leading-tight);
}
.ok-stat-value--lg { font-size: var(--text-2xl); }
.ok-stat-delta {
  font-family: var(--font-mono); font-size: var(--text-sm);
  font-variant-numeric: tabular-nums;
}
.ok-stat-delta--bull { color: var(--bull); }
.ok-stat-delta--bear { color: var(--bear); }
`;
function ensurePriceStatStyle() {
  if (typeof document !== 'undefined' && !document.getElementById('ok-stat-style')) {
    const s = document.createElement('style');
    s.id = 'ok-stat-style';
    s.textContent = openklinePriceStatCss;
    document.head.appendChild(s);
  }
}
function PriceStat({
  label,
  value,
  delta,
  size = 'md',
  style
}) {
  ensurePriceStatStyle();
  const dir = typeof delta === 'number' ? delta >= 0 ? 'bull' : 'bear' : null;
  const deltaText = typeof delta === 'number' ? `${delta >= 0 ? '▲' : '▼'} ${Math.abs(delta).toFixed(2)}%` : delta;
  return /*#__PURE__*/React.createElement("div", {
    className: "ok-stat",
    style: style
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "ok-stat-label"
  }, label) : null, /*#__PURE__*/React.createElement("span", {
    className: `ok-stat-value${size === 'lg' ? ' ok-stat-value--lg' : ''}`
  }, value), deltaText != null ? /*#__PURE__*/React.createElement("span", {
    className: `ok-stat-delta${dir ? ` ok-stat-delta--${dir}` : ''}`
  }, deltaText) : null);
}
Object.assign(__ds_scope, { PriceStat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/PriceStat.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
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
function Checkbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  style
}) {
  ensureCheckboxStyle();
  return /*#__PURE__*/React.createElement("label", {
    className: `ok-check${disabled ? ' ok-check--disabled' : ''}`,
    style: style
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked)
  }), /*#__PURE__*/React.createElement("span", {
    className: "ok-check-box"
  }, checked ? '✓' : ''), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
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
function SegmentedControl({
  options = [],
  value,
  onChange,
  size = 'md',
  style
}) {
  ensureSegStyle();
  const normalized = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  return /*#__PURE__*/React.createElement("div", {
    className: `ok-seg${size === 'sm' ? ' ok-seg--sm' : ''}`,
    role: "group",
    style: style
  }, normalized.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    className: o.value === value ? 'ok-seg--on' : '',
    onClick: () => onChange && onChange(o.value)
  }, o.label)));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
const openklineSelectCss = `
.ok-select-wrap { display: inline-flex; align-items: center; gap: var(--space-3); }
.ok-select-label { font-family: var(--font-ui); font-size: var(--text-sm); color: var(--text-muted); }
.ok-select {
  font-family: var(--font-ui); font-size: var(--text-sm); color: var(--text-1);
  background: var(--bg-canvas); border: var(--border-w) solid var(--border); border-radius: var(--radius-sm);
  height: var(--control-h-md); padding: 0 var(--space-4); cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out);
}
.ok-select:hover { background: var(--border); }
.ok-select:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
.ok-select--sm { height: var(--control-h-sm); }
`;
function ensureSelectStyle() {
  if (typeof document !== 'undefined' && !document.getElementById('ok-select-style')) {
    const s = document.createElement('style');
    s.id = 'ok-select-style';
    s.textContent = openklineSelectCss;
    document.head.appendChild(s);
  }
}
function Select({
  label,
  value,
  onChange,
  options = [],
  size = 'md',
  style
}) {
  ensureSelectStyle();
  const normalized = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  const select = /*#__PURE__*/React.createElement("select", {
    className: `ok-select${size === 'sm' ? ' ok-select--sm' : ''}`,
    value: value,
    onChange: e => onChange && onChange(e.target.value),
    style: style
  }, normalized.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)));
  if (!label) return select;
  return /*#__PURE__*/React.createElement("label", {
    className: "ok-select-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ok-select-label"
  }, label), select);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// ui_kits/terminal/TerminalApp.jsx
try { (() => {
const {
  useMemo,
  useState
} = React;
const SYMBOLS = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'TON/USDT'];
const BASE = {
  'BTC/USDT': 67000,
  'ETH/USDT': 3100,
  'SOL/USDT': 144,
  'TON/USDT': 7.2
};
const RESOLUTIONS = ['1m', '5m', '15m', '1H', '4H', '1D'];
const IND_META = {
  sma20: {
    label: 'SMA 20',
    color: 'var(--ind-1)'
  },
  ema50: {
    label: 'EMA 50',
    color: 'var(--ind-2)'
  },
  bb: {
    label: 'BB 20·2',
    color: 'var(--ind-3)'
  },
  vwap: {
    label: 'VWAP',
    color: 'var(--ind-4)'
  }
};
const terminalCss = `
.ok-term { display: grid; grid-template-columns: var(--toolrail-w) 1fr; grid-template-rows: var(--toolbar-h) 1fr var(--statusbar-h); grid-template-areas: 'rail toolbar' 'rail chart' 'rail status'; height: 100%; min-height: 0; background: var(--bg-canvas); color: var(--text-1); font-family: var(--font-ui); font-size: var(--text-md); }
.ok-term-toolbar { grid-area: toolbar; display: flex; align-items: center; gap: 10px; padding: 8px 14px; background: var(--surface-panel); border-bottom: var(--hairline); flex-wrap: wrap; }
.ok-term-rail { grid-area: rail; background: var(--surface-panel); border-right: var(--hairline); display: flex; flex-direction: column; align-items: center; padding: 8px 0; gap: 4px; }
.ok-term-rail .spacer { flex: 1; }
.ok-term-chart { grid-area: chart; position: relative; min-height: 0; overflow: hidden; }
.ok-term-status { grid-area: status; display: flex; align-items: center; gap: 16px; background: var(--surface-panel); border-top: var(--hairline); padding: 4px 14px; font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-muted); white-space: nowrap; overflow: hidden; }
.ok-term-status .hint { margin-left: auto; }
.ok-term-legend { position: absolute; left: 10px; top: 16px; display: flex; flex-direction: column; align-items: flex-start; gap: 2px; z-index: 2; pointer-events: none; }
.ok-term-legend > * { pointer-events: auto; }
.ok-term-symlabel { margin-left: auto; font-weight: 600; font-size: var(--text-sm); display: flex; align-items: center; gap: 8px; }
.ok-term-menu { position: relative; }
.ok-term-dropdown { position: absolute; top: 100%; left: 0; margin-top: 4px; background: var(--surface-panel); border: var(--hairline); border-radius: var(--radius-sm); padding: 6px 12px; min-width: 200px; z-index: 10; box-shadow: var(--shadow-menu); display: flex; flex-direction: column; }
.ok-term-pill { position: absolute; right: 70px; bottom: 56px; z-index: 2; }
`;
function ensureTerminalStyle() {
  if (typeof document !== 'undefined' && !document.getElementById('ok-terminal-style')) {
    const s = document.createElement('style');
    s.id = 'ok-terminal-style';
    s.textContent = terminalCss;
    document.head.appendChild(s);
  }
}
function fmt(n) {
  return n >= 1000 ? n.toLocaleString('en-US', {
    maximumFractionDigits: 1
  }) : n.toFixed(2);
}
function TerminalApp({
  height = '100%'
}) {
  ensureTerminalStyle();
  const [symbol, setSymbol] = useState('BTC/USDT');
  const [resolution, setResolution] = useState('1H');
  const [chartType, setChartType] = useState('candles');
  const [transform, setTransform] = useState('none');
  const [inds, setInds] = useState({
    sma20: true,
    ema50: false,
    bb: false,
    vwap: false
  });
  const [tool, setTool] = useState('none');
  const [menuOpen, setMenuOpen] = useState(false);
  const [live, setLive] = useState(false);
  const [dark, setDark] = useState(true);
  const [following, setFollowing] = useState(true);
  const seed = useMemo(() => SYMBOLS.indexOf(symbol) * 31 + RESOLUTIONS.indexOf(resolution) * 7 + 11, [symbol, resolution]);
  const active = Object.keys(inds).filter(k => inds[k]);
  const base = BASE[symbol];
  const last = base * 1.006;
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "ok-term",
    style: {
      height
    },
    "data-screen-label": "openkline terminal"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "ok-term-rail"
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    title: "Select / no tool (Esc)",
    active: tool === 'none',
    onClick: () => setTool('none')
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "pointer",
    size: 18
  })), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    title: "Trend line (T)",
    active: tool === 'trendline',
    onClick: () => setTool('trendline')
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "trendline",
    size: 18
  })), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    title: "Horizontal line (H)",
    active: tool === 'hline',
    onClick: () => setTool('hline')
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "hline",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    title: "Clear all drawings"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "trash",
    size: 18
  })), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    title: "Export chart as PNG"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "camera",
    size: 18
  }))), /*#__PURE__*/React.createElement("header", {
    className: "ok-term-toolbar"
  }, /*#__PURE__*/React.createElement(__ds_scope.Select, {
    label: "Symbol",
    value: symbol,
    onChange: setSymbol,
    options: SYMBOLS
  }), /*#__PURE__*/React.createElement(__ds_scope.Select, {
    label: "TF",
    value: resolution,
    onChange: setResolution,
    options: RESOLUTIONS
  }), /*#__PURE__*/React.createElement(__ds_scope.Select, {
    label: "Type",
    value: chartType,
    onChange: setChartType,
    options: [{
      value: 'candles',
      label: 'Candles'
    }, {
      value: 'line',
      label: 'Line'
    }, {
      value: 'area',
      label: 'Area'
    }, {
      value: 'ohlc',
      label: 'OHLC Bars'
    }]
  }), /*#__PURE__*/React.createElement(__ds_scope.Select, {
    label: "Data",
    value: transform,
    onChange: setTransform,
    options: [{
      value: 'none',
      label: 'Raw'
    }, {
      value: 'heikin-ashi',
      label: 'Heikin Ashi'
    }, {
      value: 'renko',
      label: 'Renko'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    className: "ok-term-menu"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    onClick: () => setMenuOpen(!menuOpen)
  }, "Indicators \u25BE"), menuOpen ? /*#__PURE__*/React.createElement("div", {
    className: "ok-term-dropdown"
  }, /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
    label: "SMA(20)",
    checked: inds.sma20,
    onChange: v => setInds({
      ...inds,
      sma20: v
    })
  }), /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
    label: "EMA(50)",
    checked: inds.ema50,
    onChange: v => setInds({
      ...inds,
      ema50: v
    })
  }), /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
    label: "Bollinger Bands",
    checked: inds.bb,
    onChange: v => setInds({
      ...inds,
      bb: v
    })
  }), /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
    label: "VWAP (session)",
    checked: inds.vwap,
    onChange: v => setInds({
      ...inds,
      vwap: v
    })
  })) : null), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    title: "Toggle theme",
    onClick: toggleTheme
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: dark ? 'moon' : 'sun',
    size: 18
  })), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    active: live,
    onClick: () => setLive(!live)
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "play",
    size: 13
  }), " Live"), /*#__PURE__*/React.createElement("span", {
    className: "ok-term-symlabel"
  }, live ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "bull",
    dot: true,
    pill: true
  }, "Live") : null, symbol, " \xB7 ", resolution)), /*#__PURE__*/React.createElement("main", {
    className: "ok-term-chart"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ok-term-legend"
  }, /*#__PURE__*/React.createElement(__ds_scope.LegendChip, {
    color: "var(--text-1)",
    label: `${symbol} · ${resolution}`
  }), active.map(k => /*#__PURE__*/React.createElement(__ds_scope.LegendChip, {
    key: k,
    color: IND_META[k].color,
    label: IND_META[k].label,
    value: fmt(base * (0.99 + 0.004 * (k.length % 3))),
    onRemove: () => setInds({
      ...inds,
      [k]: false
    })
  }))), /*#__PURE__*/React.createElement(__ds_scope.CandleChart, {
    seed: seed,
    count: 200,
    basePrice: base,
    drift: 0.01,
    height: "100%",
    style: {
      position: 'absolute',
      inset: 0
    },
    indicators: active
  }), !following ? /*#__PURE__*/React.createElement("div", {
    className: "ok-term-pill"
  }, /*#__PURE__*/React.createElement(__ds_scope.GoLivePill, {
    onClick: () => setFollowing(true)
  })) : null), /*#__PURE__*/React.createElement("footer", {
    className: "ok-term-status"
  }, /*#__PURE__*/React.createElement("span", null, "O ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--bull)'
    }
  }, fmt(last * 0.996)), ' ', "H ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--bull)'
    }
  }, fmt(last * 1.004)), ' ', "L ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--bear)'
    }
  }, fmt(last * 0.991)), ' ', "C ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--bull)'
    }
  }, fmt(last)), ' ', "V 1.2K"), /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: 'pointer'
    },
    onClick: () => setFollowing(!following)
  }, "autoFollow: ", following ? 'on' : 'off'), /*#__PURE__*/React.createElement("span", {
    className: "hint"
  }, "Drag pan \xB7 Wheel zoom \xB7 \u2190\u2192 keys \xB7 T trend \xB7 H hline \xB7 Esc cancel \xB7 Dbl-click fit")));
}
Object.assign(__ds_scope, { TerminalApp });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/terminal/TerminalApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/DevPage.jsx
try { (() => {
const {
  useState
} = React;
const QUICKSTART = {
  vanilla: {
    label: 'vanilla.ts',
    code: `import { OHLCVChart } from '@rekurt/openkline';

const chart = new OHLCVChart({
  container: document.getElementById('chart'),
  symbol: 'BTC/USDT',
  resolution: '1H',
  theme: 'auto',                  // follows prefers-color-scheme
  onError: (err) => report(err),  // structured, never swallowed
});

chart.setData(historicalCandles);

// live mode: O(1) per tick, RAF-coalesced
ws.onmessage = (e) => chart.updateLastCandle(parse(e.data));`
  },
  react: {
    label: 'App.tsx',
    code: `import { OHLCVChart } from '@rekurt/openkline-react';

export function App({ candles }) {
  const indicators = useMemo(() => [
    { type: 'sma', period: 20 },
    { type: 'ema', period: 50 },
    { type: 'bb', period: 20, stdDev: 2 },
  ], []);

  return (
    <OHLCVChart
      symbol="BTC/USDT" resolution="1H"
      data={candles} theme="auto"
      indicators={indicators}
      onHover={(info) => setHovered(info)}
    />
  );
}`
  },
  vue: {
    label: 'App.vue',
    code: `<script setup lang="ts">
import { OHLCVChart } from '@rekurt/openkline-vue';

const indicators = ref([
  { type: 'sma', period: 20 },
  { type: 'rsi', period: 14 },
]);
</script>

<template>
  <OHLCVChart
    symbol="BTC/USDT" resolution="1H"
    :data="candles" theme="auto"
    v-model:indicators="indicators"
  />
</template>`
  }
};
const OVERLAYS = ['SMA', 'EMA', 'WMA', 'HMA', 'BollingerBands', 'Keltner', 'Donchian', 'VWAP', 'PivotPoints', 'Ichimoku', 'Supertrend', 'ParabolicSAR', 'ZigZag'];
const SUBPANE = ['RSI', 'MACD', 'Stochastic', 'ATR', 'WilliamsR', 'OBV', 'ADX', 'CCI', 'MFI', 'StochRSI', 'ROC'];
const DRAWINGS = ['TrendLine', 'HorizontalLine', 'VerticalLine', 'Ray', 'Rectangle', 'FibRetracement', 'FibExtension', 'Channel', 'Arrow'];
const KEYMAP = [[['←', '→'], 'Pan left / right'], [['↑', '↓'], 'Zoom in / out (also + / -)'], [['Home', 'End'], 'Jump to oldest / newest candle'], [['0'], 'Reset zoom'], [['F'], 'Fit all visible data'], [['T', 'H'], 'Arm trend line / horizontal line tool'], [['Esc'], 'Cancel active tool or drawing'], [['dbl-click'], 'Fit visible range']];

/**
 * Developers page of the openkline landing — quick start in three frameworks,
 * advantage rows with code proofs, architecture, catalogs, keyboard map, theming.
 */
function DevPage() {
  const [fw, setFw] = useState('vanilla');
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "developers page"
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: 0
    },
    "data-num": "01",
    "data-screen-label": "quick start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seclabel"
  }, "01 \u2014 quick start"), /*#__PURE__*/React.createElement("h2", null, "Same engine, three ways in"), /*#__PURE__*/React.createElement("p", {
    className: "sectionLede"
  }, "The core is pure TypeScript \u2014 the wrappers add nothing but idiomatic bindings. Switch frameworks without touching chart logic."), /*#__PURE__*/React.createElement("div", {
    className: "tl-qs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-qs-head"
  }, /*#__PURE__*/React.createElement(__ds_scope.SegmentedControl, {
    size: "sm",
    options: [{
      value: 'vanilla',
      label: 'Vanilla TS'
    }, {
      value: 'react',
      label: 'React 18/19'
    }, {
      value: 'vue',
      label: 'Vue 3'
    }],
    value: fw,
    onChange: setFw
  }), /*#__PURE__*/React.createElement("span", {
    className: "lab"
  }, QUICKSTART[fw].label, " \xB7 full API parity")), /*#__PURE__*/React.createElement(__ds_scope.CodeBlock, null, QUICKSTART[fw].code))), /*#__PURE__*/React.createElement("section", {
    "data-num": "02",
    "data-screen-label": "developer advantages"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seclabel"
  }, "02 \u2014 why devs pick openkline"), /*#__PURE__*/React.createElement("h2", null, "Every claim, backed by a mechanism"), /*#__PURE__*/React.createElement("p", {
    className: "sectionLede"
  }, "Not adjectives \u2014 data structures, complexity bounds and state machines you can read in the source."), /*#__PURE__*/React.createElement("div", {
    className: "tl-adv"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-advrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "txt"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "realtime path"), /*#__PURE__*/React.createElement("h3", null, "O(1) per tick, no GC churn"), /*#__PURE__*/React.createElement("p", null, "Candles live in a ", /*#__PURE__*/React.createElement("code", null, "Float64Array"), "-backed ring buffer. ", /*#__PURE__*/React.createElement("code", null, "append"), " and", ' ', /*#__PURE__*/React.createElement("code", null, "updateLast"), " are O(1); history pages in via amortized-O(1) ", /*#__PURE__*/React.createElement("code", null, "prepend"), ". Ticks are RAF-coalesced by ", /*#__PURE__*/React.createElement("code", null, "CandleMerger"), ", and a three-layer canvas means a crosshair move never repaints the candles."), /*#__PURE__*/React.createElement("div", {
    className: "metrics"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "O(1)"), " append / updateLast"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "3"), " canvas layers"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "~0 cost"), " static frame"))), /*#__PURE__*/React.createElement("div", {
    className: "proof"
  }, /*#__PURE__*/React.createElement(__ds_scope.CodeBlock, {
    title: "live.ts",
    size: "sm"
  }, `// 500ms ticks, 100k-candle buffer — no rebuilds
setInterval(() => {
  chart.updateLastCandle(latest);   // O(1)
}, 500);

// page in older history on left-edge scroll
new OHLCVChart({
  onLoadMoreHistory: async (buf) => {
    const older = await fetchBefore(buf.firstTime());
    chart.prependHistory(older);    // amortized O(1)
  },
  maxCandles: 50_000,               // bounded memory
});`))), /*#__PURE__*/React.createElement("div", {
    className: "tl-advrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "txt"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "declarative api"), /*#__PURE__*/React.createElement("h3", null, "Indicators are config, not classes"), /*#__PURE__*/React.createElement("p", null, "App code never calls ", /*#__PURE__*/React.createElement("code", null, "new SMA(20)"), ". Pass a config array; the core diffs it (", /*#__PURE__*/React.createElement("code", null, "diffIndicatorConfigs"), ") and reconciles \u2014 reference-stable arrays skip recomputation entirely. The same objects round-trip through ", /*#__PURE__*/React.createElement("code", null, "saveLayoutState"), "."), /*#__PURE__*/React.createElement("div", {
    className: "metrics"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "30+"), " indicator types"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "0"), " manual instances"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "diffed"), " on every render"))), /*#__PURE__*/React.createElement("div", {
    className: "proof"
  }, /*#__PURE__*/React.createElement(__ds_scope.CodeBlock, {
    title: "indicators.ts",
    size: "sm"
  }, `chart.setIndicatorConfigs([
  { type: 'sma', period: 20 },
  { type: 'bb', period: 20, stdDev: 2 },
  { type: 'vwap', anchor: { type: 'anchored', t: anchorTs } },
  { type: 'rsi', period: 14 },   // gets its own sub-pane
  { type: 'macd', fast: 12, slow: 26, signal: 9 },
]);

// custom indicator? subclass Indicator and register.`))), /*#__PURE__*/React.createElement("div", {
    className: "tl-advrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "txt"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "transports"), /*#__PURE__*/React.createElement("h3", null, "Any data source in four methods"), /*#__PURE__*/React.createElement("p", null, "Implement ", /*#__PURE__*/React.createElement("code", null, "DataTransport"), " and you're live. ", /*#__PURE__*/React.createElement("code", null, "DataFeed"), " guards against stale responses with a version counter \u2014 a mid-fetch symbol switch can't render the wrong data. Reconnects use jittered exponential backoff. Errors flow through ", /*#__PURE__*/React.createElement("code", null, "onError"), ", never a silent catch."), /*#__PURE__*/React.createElement("div", {
    className: "metrics"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "4"), " methods to implement"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "jittered"), " backoff built in"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "0"), " silent catches"))), /*#__PURE__*/React.createElement("div", {
    className: "proof"
  }, /*#__PURE__*/React.createElement(__ds_scope.CodeBlock, {
    title: "transport.ts",
    size: "sm"
  }, `class BinanceTransport implements DataTransport {
  async fetchHistory(req) {
    const r = await fetch(klinesUrl(req));
    return r.json();              // ascending by time
  }
  subscribe(cfg, onUpdate) {
    this.ws = new WebSocket(streamUrl(cfg.symbol));
    this.ws.onmessage = (e) => onUpdate([parse(e.data)]);
  }
  unsubscribe() { this.ws?.close(); }
  destroy()     { this.ws?.close(); }
}`))), /*#__PURE__*/React.createElement("div", {
    className: "tl-advrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "txt"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "state"), /*#__PURE__*/React.createElement("h3", null, "The whole chart fits in a URL"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("code", null, "saveLayoutState()"), " serializes symbol, resolution, chart type, theme, indicators and drawings into a compact object. ", /*#__PURE__*/React.createElement("code", null, "loadState"), " validates untrusted input and runs schema migrations, so old links keep working after upgrades. Drawings are anchored in buffer space \u2014 they stick to their candles through pan and zoom."), /*#__PURE__*/React.createElement("div", {
    className: "metrics"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "1"), " query param"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "migrated"), " schemas"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "validated"), " untrusted input"))), /*#__PURE__*/React.createElement("div", {
    className: "proof"
  }, /*#__PURE__*/React.createElement(__ds_scope.CodeBlock, {
    title: "share.ts",
    size: "sm"
  }, `// share
const state = chart.saveLayoutState();
const url = origin + '?state=' +
  btoa(JSON.stringify(state));

// restore — validated + schema-migrated
const param = new URLSearchParams(location.search)
  .get('state');
if (param) chart.loadState(JSON.parse(atob(param)));`))))), /*#__PURE__*/React.createElement("section", {
    "data-num": "03",
    "data-screen-label": "architecture"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seclabel"
  }, "03 \u2014 architecture"), /*#__PURE__*/React.createElement("h2", null, "Three subsystems, no magic"), /*#__PURE__*/React.createElement("div", {
    className: "tl-features cols3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-feature"
  }, /*#__PURE__*/React.createElement("h3", null, "Rendering"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Hi-DPI canvas, three-layer split: chart / UI / interaction"), /*#__PURE__*/React.createElement("li", null, "Dirty-flag RAF \u2014 static chart costs ~0 between frames"), /*#__PURE__*/React.createElement("li", null, "Sub-pixel ", /*#__PURE__*/React.createElement("code", null, "fitAll"), " with per-column conflation"), /*#__PURE__*/React.createElement("li", null, "Multi-pane: sub-pane indicators get auto-sized bands + own Y-axes"), /*#__PURE__*/React.createElement("li", null, "Candles, line, area, OHLC bars, first-class Heikin-Ashi"))), /*#__PURE__*/React.createElement("div", {
    className: "tl-feature"
  }, /*#__PURE__*/React.createElement("h3", null, "Data layer"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("code", null, "CandleBuffer"), " \u2014 ", /*#__PURE__*/React.createElement("code", null, "Float64Array"), ", O(1) append, amortized-O(1) prepend"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("code", null, "CandleMerger"), " \u2014 RAF-coalesced tick merging"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("code", null, "DataFeed"), " \u2014 stale-response version counter"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("code", null, "ExponentialBackoff"), " \u2014 jittered reconnects"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("code", null, "validateCandles"), " \u2014 runtime invariant checks"))), /*#__PURE__*/React.createElement("div", {
    className: "tl-feature"
  }, /*#__PURE__*/React.createElement("h3", null, "Interaction"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("code", null, "KeyboardController"), " \u2014 full keyboard navigation"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("code", null, "autoFollow"), " state machine \u2014 live edge tracking"), /*#__PURE__*/React.createElement("li", null, "Momentum pan that respects ", /*#__PURE__*/React.createElement("code", null, "prefers-reduced-motion")), /*#__PURE__*/React.createElement("li", null, "Trackpad-aware wheel: horizontal pans, vertical zooms"), /*#__PURE__*/React.createElement("li", null, "Touch: one-finger pan, two-finger pinch"))))), /*#__PURE__*/React.createElement("section", {
    "data-num": "04",
    "data-screen-label": "catalog"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seclabel"
  }, "04 \u2014 what's in the box"), /*#__PURE__*/React.createElement("h2", null, "Indicators & drawing tools"), /*#__PURE__*/React.createElement("div", {
    className: "tl-chipgroup"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "overlay \u2014 main pane"), /*#__PURE__*/React.createElement("div", {
    className: "tl-chips"
  }, OVERLAYS.map(n => /*#__PURE__*/React.createElement("span", {
    className: "tl-chip",
    key: n
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: 'var(--ind-1)'
    }
  }), n)))), /*#__PURE__*/React.createElement("div", {
    className: "tl-chipgroup"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "sub-pane \u2014 independent y-axis"), /*#__PURE__*/React.createElement("div", {
    className: "tl-chips"
  }, SUBPANE.map(n => /*#__PURE__*/React.createElement("span", {
    className: "tl-chip",
    key: n
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: 'var(--ind-2)'
    }
  }), n)))), /*#__PURE__*/React.createElement("div", {
    className: "tl-chipgroup",
    style: {
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "drawings \u2014 anchored in buffer space, survive zoom"), /*#__PURE__*/React.createElement("div", {
    className: "tl-chips"
  }, DRAWINGS.map(n => /*#__PURE__*/React.createElement("span", {
    className: "tl-chip",
    key: n
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: 'var(--ember)'
    }
  }), n)), /*#__PURE__*/React.createElement("span", {
    className: "tl-chip",
    style: {
      color: 'var(--text-muted)'
    }
  }, "+ subclass ", /*#__PURE__*/React.createElement("code", null, "Drawing"), " for your own")))), /*#__PURE__*/React.createElement("section", {
    "data-num": "05",
    "data-screen-label": "keyboard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seclabel"
  }, "05 \u2014 keyboard-first"), /*#__PURE__*/React.createElement("h2", null, "Hands stay on the keys"), /*#__PURE__*/React.createElement("p", {
    className: "sectionLede"
  }, "Full chart control without a mouse \u2014 a pillar, not an afterthought. ", /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "bull"
  }, "a11y")), /*#__PURE__*/React.createElement("table", {
    className: "tl-kbdtable"
  }, /*#__PURE__*/React.createElement("tbody", null, KEYMAP.map(([keys, action]) => /*#__PURE__*/React.createElement("tr", {
    key: action
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "keys"
  }, keys.map((k, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: k
  }, i > 0 ? ' ' : '', /*#__PURE__*/React.createElement(__ds_scope.Kbd, null, k))))), /*#__PURE__*/React.createElement("td", null, action)))))), /*#__PURE__*/React.createElement("section", {
    "data-num": "06",
    "data-screen-label": "theming"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seclabel"
  }, "06 \u2014 theming"), /*#__PURE__*/React.createElement("h2", null, "Ten tokens, any brand"), /*#__PURE__*/React.createElement("div", {
    className: "tl-codegrid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "sectionLede",
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("code", null, "dark"), ", ", /*#__PURE__*/React.createElement("code", null, "light"), " or ", /*#__PURE__*/React.createElement("code", null, "auto"), " built in \u2014 or pass a full", ' ', /*#__PURE__*/React.createElement("code", null, "ThemeColors"), " object and the chart is yours. Custom ", /*#__PURE__*/React.createElement("code", null, "priceFormat"), " /", ' ', /*#__PURE__*/React.createElement("code", null, "volumeFormat"), " hooks cover locale and asset quirks."), /*#__PURE__*/React.createElement(__ds_scope.CodeBlock, {
    title: "modes",
    size: "sm"
  }, `chart.setTheme('dark');   // default
chart.setTheme('light');
chart.setTheme('auto');   // prefers-color-scheme`)), /*#__PURE__*/React.createElement(__ds_scope.CodeBlock, {
    title: "custom-theme.ts",
    size: "sm"
  }, `const myTheme: ThemeColors = {
  background: '#0d1117',
  bullCandle: '#26a69a',
  bearCandle: '#ef5350',
  bullVolume: 'rgba(38,166,154,0.5)',
  bearVolume: 'rgba(239,83,80,0.5)',
  grid: '#1c2128', axis: '#30363d',
  text: '#c9d1d9', crosshair: '#8b949e',
  priceLine: '#58a6ff',
};
chart.setTheme(myTheme);`))));
}
Object.assign(__ds_scope, { DevPage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/DevPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/LandingCommunity.jsx
try { (() => {
const DOCS = [['guide', 'Quick start', 'Install, first chart, live data in five lines — vanilla, React or Vue.', 'https://github.com/rekurt/ohlcv-front#install'], ['guide', 'SSR integration', 'Next.js and Nuxt recipes — client-only mounting, hydration gotchas.', 'https://github.com/rekurt/ohlcv-front/blob/master/docs/GUIDES.md#ssr-integration'], ['guide', 'Performance tuning', 'Infinite scroll, maxCandles, gap detection, profiling long frames.', 'https://github.com/rekurt/ohlcv-front/blob/master/docs/GUIDES.md#performance-tuning'], ['guide', 'Theming', 'Built-in modes, custom ThemeColors, price and volume formatting.', 'https://github.com/rekurt/ohlcv-front/blob/master/docs/GUIDES.md#theming--customization'], ['guide', 'Live data & transports', 'DataTransport interface, polling and WebSocket bases, backoff.', 'https://github.com/rekurt/ohlcv-front/blob/master/docs/GUIDES.md#live-data--transports'], ['reference', 'API reference', 'Full TypeDoc — every class, option and event in the core.', 'https://rekurt.github.io/ohlcv-front/api/'], ['reference', 'Indicators', 'Config shapes for all 30+ built-ins, plus the custom-indicator path.', 'https://github.com/rekurt/ohlcv-front/blob/master/docs/GUIDES.md#indicators'], ['reference', 'Drawing tools', 'Nine anchored tools, hit-testing, save/load round-trips.', 'https://github.com/rekurt/ohlcv-front/blob/master/docs/GUIDES.md#drawing-tools'], ['meta', 'Changelog', 'Every release, no surprises — strict semver from 0.1.0.', 'https://github.com/rekurt/ohlcv-front/blob/master/CHANGELOG.md']];

/**
 * Shared bottom of the openkline landing: documentation grid, support
 * (donate / order a feature / suggest), contacts. Rendered on both pages.
 */
function LandingCommunity() {
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "community"
  }, /*#__PURE__*/React.createElement("section", {
    id: "docs",
    "data-num": "docs",
    "data-screen-label": "documentation"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seclabel"
  }, "docs \u2014 read the source's manual"), /*#__PURE__*/React.createElement("h2", null, "Documentation"), /*#__PURE__*/React.createElement("p", {
    className: "sectionLede"
  }, "Guides for the common paths, TypeDoc for everything else. The playground is the fastest way to poke the engine without installing anything."), /*#__PURE__*/React.createElement("div", {
    className: "tl-docs"
  }, DOCS.map(([k, t, d, href]) => /*#__PURE__*/React.createElement("a", {
    className: "tl-doc",
    key: t,
    href: href
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, k), /*#__PURE__*/React.createElement("span", {
    className: "t"
  }, t, " ", /*#__PURE__*/React.createElement("span", {
    className: "arr"
  }, "\u2192")), /*#__PURE__*/React.createElement("p", {
    className: "d"
  }, d))))), /*#__PURE__*/React.createElement("section", {
    id: "support",
    "data-num": "fund",
    "data-screen-label": "support"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seclabel"
  }, "support \u2014 keep the candles printing"), /*#__PURE__*/React.createElement("h2", null, "Fund the roadmap"), /*#__PURE__*/React.createElement("p", {
    className: "sectionLede"
  }, "openkline is MIT and stays MIT. Alerts, replay mode, compare mode and workspaces ship faster when maintenance is funded."), /*#__PURE__*/React.createElement("div", {
    className: "tl-support"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-sup"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "donate"), /*#__PURE__*/React.createElement("h3", null, "Back the project"), /*#__PURE__*/React.createElement("p", null, "One-off or recurring \u2014 every donation goes to maintenance: triage, reviews, and keeping 440+ tests green."), /*#__PURE__*/React.createElement("div", {
    className: "tl-wallet"
  }, /*#__PURE__*/React.createElement("span", {
    className: "net"
  }, "USDT \xB7 TRC-20"), /*#__PURE__*/React.createElement("span", null, "address on request \u2014 see contacts")), /*#__PURE__*/React.createElement("div", {
    className: "act"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ember"
  }, "Sponsor on GitHub"))), /*#__PURE__*/React.createElement("div", {
    className: "tl-sup"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "order a feature"), /*#__PURE__*/React.createElement("h3", null, "Need it before the roadmap?"), /*#__PURE__*/React.createElement("p", null, "Exchange adapters, custom indicators, alerts ahead of schedule \u2014 send a spec, get an estimate. Paid work lands upstream under MIT, so everyone gets it."), /*#__PURE__*/React.createElement("div", {
    className: "act"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    onClick: () => {
      window.location.href = 'mailto:nikitageek@gmail.com?subject=openkline%20feature%20order';
    }
  }, "Email a spec"))), /*#__PURE__*/React.createElement("div", {
    className: "tl-sup"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "suggest"), /*#__PURE__*/React.createElement("h3", null, "Ideas & bug reports"), /*#__PURE__*/React.createElement("p", null, "Open an issue with a repro or a use case. Proposals that survive review get a milestone \u2014 check the M1 design doc for the bar."), /*#__PURE__*/React.createElement("div", {
    className: "act"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    onClick: () => {
      window.location.href = 'https://github.com/rekurt/ohlcv-front/issues';
    }
  }, "Open an issue \u2197"))))), /*#__PURE__*/React.createElement("section", {
    id: "contacts",
    "data-num": "ping",
    "data-screen-label": "contacts"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seclabel"
  }, "contacts \u2014 talk to the maintainer"), /*#__PURE__*/React.createElement("h2", null, "Contacts"), /*#__PURE__*/React.createElement("div", {
    className: "tl-contacts"
  }, /*#__PURE__*/React.createElement("a", {
    className: "tl-contact",
    href: "mailto:nikitageek@gmail.com"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "email"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "nikitageek", /*#__PURE__*/React.createElement("span", {
    className: "at"
  }, "@"), "gmail.com"), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, "Feature orders, commercial questions, security reports")), /*#__PURE__*/React.createElement("a", {
    className: "tl-contact",
    href: "https://github.com/rekurt"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "github"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, /*#__PURE__*/React.createElement("span", {
    className: "at"
  }, "github.com/"), "rekurt"), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, "Issues, PRs, discussions \u2014 the source of truth")), /*#__PURE__*/React.createElement("a", {
    className: "tl-contact",
    href: "https://t.me/nikita_rwhe"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "telegram"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, /*#__PURE__*/React.createElement("span", {
    className: "at"
  }, "@"), "nikita_rwhe"), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, "Quick questions, integration help")))));
}
Object.assign(__ds_scope, { LandingCommunity });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/LandingCommunity.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProductPage.jsx
try { (() => {
/**
 * Product page of the openkline landing — hero, proof strip, the four pillars,
 * developer-advantage highlights, comparison table.
 */
function ProductPage({
  onOpenDev
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "product page"
  }, /*#__PURE__*/React.createElement("header", {
    className: "tl-hero",
    "data-screen-label": "hero"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "badges"
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "ember"
  }, "MIT"), /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "accent"
  }, "TypeScript"), /*#__PURE__*/React.createElement(__ds_scope.Badge, null, "framework-agnostic"), /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "bull",
    dot: true,
    pill: true
  }, "realtime")), /*#__PURE__*/React.createElement("h1", null, "Not ", /*#__PURE__*/React.createElement("em", null, "your"), " engine, not ", /*#__PURE__*/React.createElement("em", null, "your"), " charts."), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "So own it: ", /*#__PURE__*/React.createElement("code", null, "@rekurt/openkline"), " \u2014 a TradingView-grade OHLCV charting engine. Open source, MIT, no vendor lock-in. Candles, 30+ indicators, anchored drawing tools and realtime transports out of the box. One TypeScript core; ", /*#__PURE__*/React.createElement("code", null, "react"), " and ", /*#__PURE__*/React.createElement("code", null, "vue"), " wrappers with full API parity."), /*#__PURE__*/React.createElement("div", {
    className: "cta"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ember",
    size: "lg"
  }, "Open playground"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "lg",
    onClick: onOpenDev
  }, "Read the docs")), /*#__PURE__*/React.createElement(__ds_scope.CodeBlock, {
    prompt: true,
    size: "sm",
    copy: true,
    copyText: "npm install @rekurt/openkline",
    style: {
      maxWidth: 440
    }
  }, "npm install @rekurt/openkline", /*#__PURE__*/React.createElement("span", {
    className: "tl-cursor"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tl-frame"
  }, /*#__PURE__*/React.createElement("span", {
    className: "corner tlc"
  }), /*#__PURE__*/React.createElement("span", {
    className: "corner trc"
  }), /*#__PURE__*/React.createElement("span", {
    className: "corner blc"
  }), /*#__PURE__*/React.createElement("span", {
    className: "corner brc"
  }), /*#__PURE__*/React.createElement("div", {
    className: "tl-frame-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "path"
  }, "BTC/USDT \xB7 1H"), /*#__PURE__*/React.createElement("span", null, "candles + sma20 + ema50"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      color: 'var(--bull)'
    }
  }, "\u25B2 2.31%")), /*#__PURE__*/React.createElement("div", {
    className: "tl-frame-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-frame-legend"
  }, /*#__PURE__*/React.createElement(__ds_scope.LegendChip, {
    color: "var(--ind-1)",
    label: "SMA 20"
  }), /*#__PURE__*/React.createElement(__ds_scope.LegendChip, {
    color: "var(--ind-2)",
    label: "EMA 50"
  })), /*#__PURE__*/React.createElement(__ds_scope.CandleChart, {
    seed: 29,
    count: 150,
    basePrice: 67000,
    drift: 0.03,
    height: 360,
    indicators: ['sma20', 'ema50']
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 60
    },
    "data-screen-label": "proof strip"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "440", /*#__PURE__*/React.createElement("em", null, "+")), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "unit tests")), /*#__PURE__*/React.createElement("div", {
    className: "tl-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "0"), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "lint warnings in CI")), /*#__PURE__*/React.createElement("div", {
    className: "tl-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "~27 ", /*#__PURE__*/React.createElement("em", null, "KB")), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "core, gzipped")), /*#__PURE__*/React.createElement("div", {
    className: "tl-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "30", /*#__PURE__*/React.createElement("em", null, "+")), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "indicators built in")), /*#__PURE__*/React.createElement("div", {
    className: "tl-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "$0"), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "license fees, forever")))), /*#__PURE__*/React.createElement("section", {
    id: "engine",
    "data-num": "01",
    "data-screen-label": "pillars"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seclabel"
  }, "01 \u2014 the engine"), /*#__PURE__*/React.createElement("h2", null, "Batteries included"), /*#__PURE__*/React.createElement("p", {
    className: "sectionLede"
  }, "Teams building trading UIs pick between fast-but-bare and complete-but-licensed. openkline closes all four gaps in one package."), /*#__PURE__*/React.createElement("div", {
    className: "tl-features"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-feature"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, "/01"), /*#__PURE__*/React.createElement("h3", null, "One core, any framework"), /*#__PURE__*/React.createElement("p", null, "Pure TypeScript core with no React or Vue inside. Thin ", /*#__PURE__*/React.createElement("code", null, "@rekurt/openkline-react"), " and", ' ', /*#__PURE__*/React.createElement("code", null, "@rekurt/openkline-vue"), " wrappers with full API parity. Vanilla, React 18/19 or Vue 3 \u2014 same engine, no lock-in.")), /*#__PURE__*/React.createElement("div", {
    className: "tl-feature"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, "/02"), /*#__PURE__*/React.createElement("h3", null, "Built for realtime"), /*#__PURE__*/React.createElement("p", null, "Canvas rendering on ", /*#__PURE__*/React.createElement("code", null, "Float64Array"), " buffers, O(1) ", /*#__PURE__*/React.createElement("code", null, "append"), "/", /*#__PURE__*/React.createElement("code", null, "updateLast"), ", three-layer canvas for cheap crosshair redraws, RAF-coalesced ticks, jittered-backoff reconnect, stale-response protection. Not a report chart \u2014 an engine for a live order book.")), /*#__PURE__*/React.createElement("div", {
    className: "tl-feature"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, "/03"), /*#__PURE__*/React.createElement("h3", null, "30+ indicators, 9 drawing tools"), /*#__PURE__*/React.createElement("p", null, "Overlays from SMA to Ichimoku, Supertrend and anchored VWAP; sub-pane RSI, MACD, Stochastic and more. Trend lines, Fibonacci, channels \u2014 anchored to candles, they never drift on zoom. Heikin-Ashi is a first-class chart type.")), /*#__PURE__*/React.createElement("div", {
    className: "tl-feature"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, "/04"), /*#__PURE__*/React.createElement("h3", null, "UX the competitors skip"), /*#__PURE__*/React.createElement("p", null, "Keyboard-first navigation, ", /*#__PURE__*/React.createElement("code", null, "prefers-reduced-motion"), " respected, an explicit auto-follow state machine, and the whole layout serializes into a query param."), /*#__PURE__*/React.createElement("div", {
    className: "tl-kbdrow"
  }, /*#__PURE__*/React.createElement(__ds_scope.Kbd, null, "\u2190"), /*#__PURE__*/React.createElement(__ds_scope.Kbd, null, "\u2192"), " pan \xB7 ", /*#__PURE__*/React.createElement(__ds_scope.Kbd, null, "+"), /*#__PURE__*/React.createElement(__ds_scope.Kbd, null, "-"), " zoom \xB7 ", /*#__PURE__*/React.createElement(__ds_scope.Kbd, null, "Home"), /*#__PURE__*/React.createElement(__ds_scope.Kbd, null, "End"), " jump \xB7 ", /*#__PURE__*/React.createElement(__ds_scope.Kbd, null, "F"), " fit")))), /*#__PURE__*/React.createElement("section", {
    "data-num": "02",
    "data-screen-label": "for developers teaser"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seclabel"
  }, "02 \u2014 for developers"), /*#__PURE__*/React.createElement("h2", null, "Five lines to first candle"), /*#__PURE__*/React.createElement("p", {
    className: "sectionLede"
  }, "Indicators are config objects, not class instances \u2014 the core reconciles them. The full technical tour with examples lives on the Developers page."), /*#__PURE__*/React.createElement("div", {
    className: "tl-codegrid"
  }, /*#__PURE__*/React.createElement(__ds_scope.CodeBlock, {
    title: "chart.ts"
  }, `import { OHLCVChart } from '@rekurt/openkline';

const chart = new OHLCVChart({
  container, symbol: 'BTC/USDT',
  resolution: '1H', theme: 'auto',
});
chart.setData(candles);`), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.CodeBlock, {
    title: "indicators"
  }, `chart.setIndicatorConfigs([
  { type: 'sma', period: 20 },
  { type: 'ema', period: 50 },
  { type: 'rsi', period: 14 },
]);`), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ember",
    onClick: onOpenDev,
    style: {
      alignSelf: 'flex-start'
    }
  }, "Developers page \u2192")))), /*#__PURE__*/React.createElement("section", {
    id: "compare",
    "data-num": "03",
    "data-screen-label": "compare"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seclabel"
  }, "03 \u2014 the four-way gap"), /*#__PURE__*/React.createElement("h2", null, "Pick all four"), /*#__PURE__*/React.createElement("p", {
    className: "sectionLede"
  }, "Realtime performance + full indicator set + drawing tools + framework freedom. Every alternative makes you drop at least one."), /*#__PURE__*/React.createElement("table", {
    className: "tl-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", {
    className: "openklinecol"
  }, "openkline"), /*#__PURE__*/React.createElement("th", null, "Lightweight Charts"), /*#__PURE__*/React.createElement("th", null, "Highcharts Stock"), /*#__PURE__*/React.createElement("th", null, "ECharts / Chart.js"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Indicators built in"), /*#__PURE__*/React.createElement("td", {
    className: "openklinecol yes"
  }, "30+"), /*#__PURE__*/React.createElement("td", {
    className: "no"
  }, "write your own"), /*#__PURE__*/React.createElement("td", {
    className: "yes"
  }, "yes"), /*#__PURE__*/React.createElement("td", {
    className: "part"
  }, "generic")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Drawing tools"), /*#__PURE__*/React.createElement("td", {
    className: "openklinecol yes"
  }, "9, anchored"), /*#__PURE__*/React.createElement("td", {
    className: "no"
  }, "none"), /*#__PURE__*/React.createElement("td", {
    className: "yes"
  }, "yes"), /*#__PURE__*/React.createElement("td", {
    className: "no"
  }, "none")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Realtime transports"), /*#__PURE__*/React.createElement("td", {
    className: "openklinecol yes"
  }, "built in"), /*#__PURE__*/React.createElement("td", {
    className: "no"
  }, "bring your own"), /*#__PURE__*/React.createElement("td", {
    className: "part"
  }, "partial"), /*#__PURE__*/React.createElement("td", {
    className: "no"
  }, "bring your own")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Keyboard + a11y"), /*#__PURE__*/React.createElement("td", {
    className: "openklinecol yes"
  }, "first-class"), /*#__PURE__*/React.createElement("td", {
    className: "no"
  }, "none"), /*#__PURE__*/React.createElement("td", {
    className: "part"
  }, "partial"), /*#__PURE__*/React.createElement("td", {
    className: "part"
  }, "partial")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "License"), /*#__PURE__*/React.createElement("td", {
    className: "openklinecol yes"
  }, "MIT"), /*#__PURE__*/React.createElement("td", {
    className: "yes"
  }, "Apache-2.0"), /*#__PURE__*/React.createElement("td", {
    className: "no"
  }, "commercial"), /*#__PURE__*/React.createElement("td", {
    className: "yes"
  }, "MIT")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Framework lock-in"), /*#__PURE__*/React.createElement("td", {
    className: "openklinecol yes"
  }, "none"), /*#__PURE__*/React.createElement("td", {
    className: "yes"
  }, "none"), /*#__PURE__*/React.createElement("td", {
    className: "part"
  }, "vendor APIs"), /*#__PURE__*/React.createElement("td", {
    className: "yes"
  }, "none"))))));
}
Object.assign(__ds_scope, { ProductPage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProductPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/LandingPage.jsx
try { (() => {
const {
  useEffect,
  useState
} = React;
const landingCss = `
.tl { background: var(--bg-canvas); color: var(--text-1); font-family: var(--font-ui); min-height: 100%; }
.tl ::selection { background: var(--ember); color: #fff; }
.tl a { color: inherit; }
.tl .shell { max-width: 1120px; margin: 0 auto; padding: 0 32px; }
.tl code { font-family: var(--font-mono); font-size: 0.92em; color: var(--text-1); }

/* ── ticker strip ── */
.tl-ticker { border-bottom: var(--hairline); background: var(--surface-panel); overflow: hidden; }
.tl-ticker-in { display: flex; gap: 28px; align-items: center; height: 30px; font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); white-space: nowrap; font-variant-numeric: tabular-nums; }
.tl-ticker-in .up { color: var(--bull); }
.tl-ticker-in .dn { color: var(--bear); }
.tl-ticker-in .sym { color: var(--text-1); }
.tl-ticker-in .live { color: var(--ember); letter-spacing: 0.12em; }

/* ── nav ── */
.tl nav { display: flex; align-items: center; gap: 18px; height: 64px; border-bottom: var(--hairline); position: sticky; top: 0; z-index: 20; background: var(--bg-canvas); }
.tl .brand { display: flex; align-items: center; gap: 10px; font-family: var(--font-display); font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
.tl .brand .pkg { font-family: var(--font-mono); font-size: 11px; font-weight: 400; color: var(--text-muted); margin-top: 4px; }
.tl-pagetabs { display: flex; border: var(--hairline); background: var(--bg-canvas); }
.tl-pagetabs button { font-family: var(--font-mono); font-size: 12px; padding: 7px 16px; background: transparent; border: 0; color: var(--text-muted); cursor: pointer; border-right: var(--hairline); transition: color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out); }
.tl-pagetabs button:last-child { border-right: 0; }
.tl-pagetabs button:hover { color: var(--text-1); background: var(--surface-raised); }
.tl-pagetabs button.on { color: var(--ember); background: var(--ember-dim); box-shadow: inset 0 -2px 0 var(--ember); }
.tl .navlinks { display: flex; align-items: center; gap: 20px; margin-left: auto; font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); }
.tl .navlinks a { text-decoration: none; transition: color var(--dur-fast) var(--ease-out); }
.tl .navlinks a:hover { color: var(--ember); }

/* ── section scaffolding ── */
.tl section { padding: 60px 0; border-top: var(--hairline); position: relative; scroll-margin-top: 76px; }
.tl section[data-num]::before { content: attr(data-num); position: absolute; top: 44px; right: 0; font-family: var(--font-mono); font-size: 76px; font-weight: 700; line-height: 1; letter-spacing: -0.04em; color: var(--surface-raised); pointer-events: none; user-select: none; }
.tl .seclabel { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ember); margin-bottom: 14px; }
.tl .seclabel::after { content: ''; flex: 0 0 64px; height: 1px; background: var(--ember-deep); opacity: 0.6; }
.tl h2 { margin: 0 0 10px; font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 700; letter-spacing: -0.01em; }
.tl .sectionLede { margin: 0 0 36px; font-size: var(--text-md); line-height: var(--leading-relaxed); color: var(--text-muted); max-width: 64ch; text-wrap: pretty; }

/* ── hero ── */
.tl-hero { display: grid; grid-template-columns: 1.02fr 1fr; gap: 56px; align-items: center; padding: 72px 0 60px; position: relative;
  background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 48px 48px; }
.tl-hero .badges { display: flex; gap: 8px; margin-bottom: 22px; }
.tl-hero h1 { margin: 0 0 18px; font-family: var(--font-display); font-size: var(--text-4xl); font-weight: 700; line-height: var(--leading-tight); letter-spacing: -0.025em; }
.tl-hero h1 em { font-style: normal; color: var(--ember); }
.tl-hero .lede { margin: 0 0 28px; font-size: var(--text-lg); line-height: var(--leading-relaxed); color: var(--text-muted); max-width: 46ch; text-wrap: pretty; }
.tl-hero .cta { display: flex; align-items: center; gap: 12px; margin-bottom: 22px; }
.tl-cursor { display: inline-block; width: 8px; height: 15px; background: var(--ember); vertical-align: -2px; margin-left: 2px; }
@media (prefers-reduced-motion: no-preference) { .tl-cursor { animation: tl-blink 1.1s steps(1) infinite; } }
@keyframes tl-blink { 50% { opacity: 0; } }

/* terminal frame with corner brackets */
.tl-frame { position: relative; border: var(--hairline); background: var(--bg-canvas); }
.tl-frame .corner { position: absolute; width: 14px; height: 14px; border: 2px solid var(--ember); z-index: 3; }
.tl-frame .corner.tlc { top: -2px; left: -2px; border-right: 0; border-bottom: 0; }
.tl-frame .corner.trc { top: -2px; right: -2px; border-left: 0; border-bottom: 0; }
.tl-frame .corner.blc { bottom: -2px; left: -2px; border-right: 0; border-top: 0; }
.tl-frame .corner.brc { bottom: -2px; right: -2px; border-left: 0; border-top: 0; }
.tl-frame-head { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-bottom: var(--hairline); background: var(--surface-panel); font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); }
.tl-frame-head .path { color: var(--text-1); }
.tl-frame-body { position: relative; }
.tl-frame-body::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.014) 0 1px, transparent 1px 3px); }
.tl-frame-legend { position: absolute; left: 10px; top: 12px; z-index: 2; display: flex; flex-direction: column; align-items: flex-start; gap: 2px; }

/* ── stats strip ── */
.tl-stats { display: grid; grid-template-columns: repeat(5, 1fr); border: var(--hairline); background: var(--surface-panel); }
.tl-stat { padding: 18px 20px; border-right: var(--hairline); }
.tl-stat:last-child { border-right: 0; }
.tl-stat .v { font-family: var(--font-mono); font-size: var(--text-2xl); font-weight: 600; font-variant-numeric: tabular-nums; }
.tl-stat .v em { font-style: normal; color: var(--ember); }
.tl-stat .k { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); margin-top: 6px; }

/* ── feature / arch cards ── */
.tl-features { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.tl-features.cols3 { grid-template-columns: repeat(3, 1fr); }
.tl-feature { border: var(--hairline); background: var(--surface-panel); padding: 26px; position: relative; transition: border-color var(--dur-fast) var(--ease-out); }
.tl-feature:hover { border-color: var(--ember-deep); }
.tl-feature .num { position: absolute; top: 22px; right: 24px; font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); }
.tl-feature h3 { margin: 0 0 10px; font-size: var(--text-lg); font-weight: 600; font-family: var(--font-display); }
.tl-feature p { margin: 0; font-size: var(--text-md); line-height: var(--leading-relaxed); color: var(--text-muted); }
.tl-feature ul { margin: 0; padding-left: 16px; color: var(--text-muted); font-size: var(--text-md); line-height: 1.75; }
.tl-feature ul code { font-size: 0.9em; }
.tl-kbdrow { display: flex; align-items: center; gap: 6px; margin-top: 16px; font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); flex-wrap: wrap; }

/* ── advantage rows (dev) ── */
.tl-adv { display: flex; flex-direction: column; gap: 16px; }
.tl-advrow { display: grid; grid-template-columns: 0.92fr 1.08fr; border: var(--hairline); background: var(--surface-panel); }
.tl-advrow .txt { padding: 26px; display: flex; flex-direction: column; }
.tl-advrow .txt .k { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ember); margin-bottom: 10px; }
.tl-advrow h3 { margin: 0 0 10px; font-family: var(--font-display); font-size: var(--text-xl); font-weight: 600; }
.tl-advrow .txt p { margin: 0; font-size: var(--text-md); line-height: var(--leading-relaxed); color: var(--text-muted); flex: 1; }
.tl-advrow .metrics { display: flex; gap: 18px; margin-top: 16px; font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); flex-wrap: wrap; }
.tl-advrow .metrics b { color: var(--text-1); font-weight: 500; }
.tl-advrow .proof { border-left: var(--hairline); display: flex; flex-direction: column; }
.tl-advrow .proof > div { border: 0 !important; border-radius: 0 !important; flex: 1; }

/* ── code & tabs ── */
.tl-codegrid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: start; }
.tl-qs { border: var(--hairline); background: var(--surface-panel); }
.tl-qs-head { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-bottom: var(--hairline); }
.tl-qs-head .lab { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); margin-left: auto; }
.tl-qs > div:last-child { border: 0 !important; border-radius: 0 !important; }

/* ── chips (indicator catalog) ── */
.tl-chipgroup { display: flex; flex-direction: column; gap: 10px; margin-bottom: 22px; }
.tl-chipgroup .k { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); }
.tl-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.tl-chip { font-family: var(--font-mono); font-size: 11px; padding: 5px 10px; border: var(--hairline); background: var(--surface-panel); color: var(--text-1); display: inline-flex; align-items: center; gap: 7px; }
.tl-chip .dot { width: 7px; height: 7px; border-radius: 2px; }

/* ── keyboard table ── */
.tl-kbdtable { width: 100%; border: var(--hairline); border-collapse: collapse; font-size: var(--text-md); }
.tl-kbdtable td { border-bottom: var(--hairline); padding: 10px 16px; color: var(--text-muted); }
.tl-kbdtable tr:last-child td { border-bottom: 0; }
.tl-kbdtable td:first-child { width: 220px; background: var(--surface-panel); border-right: var(--hairline); }
.tl-kbdtable .keys { display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); }

/* ── compare ── */
.tl-table { width: 100%; border-collapse: collapse; font-size: var(--text-md); border: var(--hairline); }
.tl-table th { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-muted); font-weight: 500; text-align: left; padding: 12px 16px; background: var(--surface-panel); border-bottom: var(--hairline); }
.tl-table td { border-bottom: var(--hairline); padding: 12px 16px; color: var(--text-muted); }
.tl-table tr:last-child td { border-bottom: 0; }
.tl-table td:first-child { color: var(--text-1); }
.tl-table .openklinecol { background: var(--ember-dim); border-left: 2px solid var(--ember); border-right: var(--hairline); }
.tl-table th.openklinecol { color: var(--ember); }
.tl-table .yes { color: var(--bull); font-family: var(--font-mono); font-size: 12px; }
.tl-table .no { color: var(--bear); font-family: var(--font-mono); font-size: 12px; }
.tl-table .part { color: var(--text-muted); font-family: var(--font-mono); font-size: 12px; }

/* ── docs ── */
.tl-docs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.tl-doc { border: var(--hairline); background: var(--surface-panel); padding: 20px; text-decoration: none; display: flex; flex-direction: column; gap: 8px; transition: border-color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out); }
.tl-doc:hover { border-color: var(--ember-deep); background: var(--surface-raised); }
.tl-doc .k { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); }
.tl-doc .t { font-size: var(--text-md); font-weight: 600; display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.tl-doc .t .arr { font-family: var(--font-mono); color: var(--ember); font-weight: 400; }
.tl-doc .d { font-size: var(--text-sm); line-height: var(--leading-relaxed); color: var(--text-muted); margin: 0; }

/* ── support ── */
.tl-support { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.tl-sup { border: var(--hairline); background: var(--surface-panel); padding: 26px; display: flex; flex-direction: column; gap: 12px; }
.tl-sup .k { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ember); }
.tl-sup h3 { margin: 0; font-family: var(--font-display); font-size: var(--text-lg); font-weight: 600; }
.tl-sup p { margin: 0; font-size: var(--text-md); line-height: var(--leading-relaxed); color: var(--text-muted); flex: 1; }
.tl-sup .act { display: flex; gap: 10px; flex-wrap: wrap; }
.tl-wallet { display: flex; align-items: center; justify-content: space-between; gap: 10px; border: var(--hairline); background: var(--bg-canvas); padding: 8px 10px; font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); }
.tl-wallet .net { color: var(--text-1); }

/* ── contacts ── */
.tl-contacts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.tl-contact { border: var(--hairline); background: var(--surface-panel); padding: 20px; text-decoration: none; display: flex; flex-direction: column; gap: 6px; transition: border-color var(--dur-fast) var(--ease-out); }
.tl-contact:hover { border-color: var(--ember-deep); }
.tl-contact .k { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); }
.tl-contact .v { font-family: var(--font-mono); font-size: var(--text-md); color: var(--text-1); }
.tl-contact .v .at { color: var(--ember); }
.tl-contact .d { font-size: var(--text-sm); color: var(--text-muted); }

/* ── footer ── */
.tl footer { border-top: var(--hairline); padding: 28px 0 44px; display: flex; align-items: center; gap: 24px; font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); }
.tl footer a { text-decoration: none; }
.tl footer a:hover { color: var(--ember); }
.tl footer .right { margin-left: auto; font-size: 11px; }

@media (max-width: 900px) {
  .tl-hero, .tl-features, .tl-features.cols3, .tl-support, .tl-docs, .tl-contacts, .tl-codegrid, .tl-advrow { grid-template-columns: 1fr; }
  .tl-stats { grid-template-columns: 1fr 1fr; }
  .tl-advrow .proof { border-left: 0; border-top: var(--hairline); }
}
`;
function ensureLandingStyle() {
  if (typeof document === 'undefined') return;
  const prev = document.getElementById('ok-landing-style');
  if (prev && prev.textContent !== landingCss) prev.remove();
  if (!document.getElementById('ok-landing-style')) {
    const s = document.createElement('style');
    s.id = 'ok-landing-style';
    s.textContent = landingCss;
    document.head.appendChild(s);
  }
}
const TICKER = [['BTC/USDT', '67,412.50', 2.31], ['ETH/USDT', '3,108.72', -0.84], ['SOL/USDT', '144.20', 5.02], ['TON/USDT', '7.21', 1.12], ['BNB/USDT', '588.40', -0.22], ['XRP/USDT', '0.5214', 0.67]];
function LandingPage({
  logoSrc = '../../assets/logo-mark.svg'
}) {
  ensureLandingStyle();
  const [page, setPage] = useState(() => typeof window !== 'undefined' && window.location.hash.indexOf('dev') !== -1 ? 'dev' : 'product');
  useEffect(() => {
    try {
      window.history.replaceState(null, '', page === 'dev' ? '#dev' : '#product');
    } catch (e) {
      /* sandboxed iframe */
    }
  }, [page]);
  return /*#__PURE__*/React.createElement("div", {
    className: "tl",
    "data-screen-label": `openkline landing — ${page}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-ticker"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell tl-ticker-in"
  }, /*#__PURE__*/React.createElement("span", {
    className: "live"
  }, "\u25CF LIVE"), TICKER.map(([sym, px, d]) => /*#__PURE__*/React.createElement("span", {
    key: sym
  }, /*#__PURE__*/React.createElement("span", {
    className: "sym"
  }, sym), " ", px, ' ', /*#__PURE__*/React.createElement("span", {
    className: d >= 0 ? 'up' : 'dn'
  }, d >= 0 ? '▲' : '▼', Math.abs(d).toFixed(2), "%"))))), /*#__PURE__*/React.createElement("div", {
    className: "shell"
  }, /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("span", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    width: "28",
    height: "28",
    alt: ""
  }), "openkline", /*#__PURE__*/React.createElement("span", {
    className: "pkg"
  }, "@rekurt/openkline")), /*#__PURE__*/React.createElement(__ds_scope.Badge, null, "v0.1.0"), /*#__PURE__*/React.createElement("div", {
    className: "tl-pagetabs",
    role: "tablist"
  }, /*#__PURE__*/React.createElement("button", {
    className: page === 'product' ? 'on' : '',
    onClick: () => setPage('product')
  }, "Product"), /*#__PURE__*/React.createElement("button", {
    className: page === 'dev' ? 'on' : '',
    onClick: () => setPage('dev')
  }, "Developers")), /*#__PURE__*/React.createElement("div", {
    className: "navlinks"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#docs"
  }, "Docs"), /*#__PURE__*/React.createElement("a", {
    href: "#support"
  }, "Support"), /*#__PURE__*/React.createElement("a", {
    href: "#contacts"
  }, "Contacts"), /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/rekurt/ohlcv-front"
  }, "GitHub \u2197"))), page === 'product' ? /*#__PURE__*/React.createElement(__ds_scope.ProductPage, {
    onOpenDev: () => setPage('dev')
  }) : /*#__PURE__*/React.createElement(__ds_scope.DevPage, null), /*#__PURE__*/React.createElement(__ds_scope.LandingCommunity, null), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/rekurt/ohlcv-front"
  }, "GitHub"), /*#__PURE__*/React.createElement("a", {
    href: "https://rekurt.github.io/ohlcv-front/"
  }, "Playground"), /*#__PURE__*/React.createElement("a", {
    href: "https://rekurt.github.io/ohlcv-front/api/"
  }, "API reference"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:nikitageek@gmail.com"
  }, "nikitageek@gmail.com"), /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/nikita_rwhe"
  }, "@nikita_rwhe"), /*#__PURE__*/React.createElement("span", {
    className: "right"
  }, "MIT \xB7 @rekurt/openkline 0.1.0 \xB7 one maintainer, 440+ tests \xB7 not your keys? not our problem"))));
}
Object.assign(__ds_scope, { LandingPage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/LandingPage.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.CandleChart = __ds_scope.CandleChart;

__ds_ns.GoLivePill = __ds_scope.GoLivePill;

__ds_ns.LegendChip = __ds_scope.LegendChip;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.CodeBlock = __ds_scope.CodeBlock;

__ds_ns.Kbd = __ds_scope.Kbd;

__ds_ns.PriceStat = __ds_scope.PriceStat;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.TerminalApp = __ds_scope.TerminalApp;

__ds_ns.DevPage = __ds_scope.DevPage;

__ds_ns.LandingCommunity = __ds_scope.LandingCommunity;

__ds_ns.LandingPage = __ds_scope.LandingPage;

__ds_ns.ProductPage = __ds_scope.ProductPage;

})();
