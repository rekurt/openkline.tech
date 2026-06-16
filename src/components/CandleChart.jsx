import { useEffect, useMemo, useRef } from 'react';

/* Seeded RNG so every render of a given seed draws the same market */
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateCandles({ seed = 42, count = 180, basePrice = 100, drift = 0.02, volatility = 0.012 }) {
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
    candles.push({ t: start + i * 3600, o, h, l, c, v });
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
  return { mid, up, lo };
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

/**
 * Decorative-but-honest recreation of the openkline chart canvas: candles,
 * volume, grid, axes, overlay indicators, last-price line, crosshair.
 */
export function CandleChart({
  seed = 42,
  count = 180,
  basePrice = 100,
  drift = 0.02,
  height = 360,
  indicators = [],
  type = 'candle',
  theme,
  showVolume = true,
  showGrid = true,
  showAxes = true,
  showLastPrice = true,
  interactive = true,
  data,
  style,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef(null);

  const candles = useMemo(
    () => data || generateCandles({ seed, count, basePrice, drift }),
    [data, seed, count, basePrice, drift],
  );

  const series = useMemo(() => {
    const s = {};
    if (indicators.includes('sma20')) s.sma20 = sma(candles, 20);
    if (indicators.includes('ema50')) s.ema50 = ema(candles, 50);
    if (indicators.includes('bb')) s.bb = bollinger(candles, 20, 2);
    if (indicators.includes('vwap')) s.vwap = vwap(candles);
    return s;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        ind4: cssVar(wrap, '--ind-4', '#f97583'),
        accent: cssVar(wrap, '--accent', '#2962ff'),
        accentDim: cssVar(wrap, '--accent-dim', 'rgba(41, 98, 255, 0.16)'),
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
      const xAt = (i) => i * slot + slot / 2;
      const yAt = (p) => ((max - p) / (max - min)) * (plotH - volH);

      /* grid */
      if (showGrid) {
        ctx.strokeStyle = col.grid;
        ctx.lineWidth = 1;
        const rows = 5;
        for (let r = 0; r <= rows; r++) {
          const y = Math.round((r / rows) * (plotH - volH)) + 0.5;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(plotW, y);
          ctx.stroke();
        }
        const colsN = Math.max(2, Math.floor(plotW / 120));
        for (let cI = 0; cI <= colsN; cI++) {
          const x = Math.round((cI / colsN) * plotW) + 0.5;
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
          const vh = (c.v / maxVol) * volH;
          ctx.fillStyle = c.c >= c.o ? col.bullVol : col.bearVol;
          ctx.fillRect(xAt(i) - bodyW / 2, plotH - vh, bodyW, vh);
        }
      }

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

      /* price series — candles, or a close-price line / area */
      if (type === 'line' || type === 'area') {
        const closes = candles.map((c) => c.c);
        if (type === 'area') {
          ctx.beginPath();
          ctx.moveTo(xAt(0), yAt(closes[0]));
          for (let i = 1; i < n; i++) ctx.lineTo(xAt(i), yAt(closes[i]));
          ctx.lineTo(xAt(n - 1), plotH - volH);
          ctx.lineTo(xAt(0), plotH - volH);
          ctx.closePath();
          ctx.fillStyle = col.accentDim;
          ctx.fill();
        }
        line(closes, col.accent, 1.5);
      } else {
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
          const y = (r / rows) * (plotH - volH);
          const p = max - (r / rows) * (max - min);
          ctx.fillText(p >= 1000 ? p.toFixed(0) : p.toFixed(2), plotW + 8, y);
        }
        const colsN = Math.max(2, Math.floor(plotW / 120));
        ctx.textAlign = 'center';
        for (let cI = 1; cI < colsN; cI++) {
          const i = Math.floor((cI / colsN) * n);
          const d = new Date(candles[i].t * 1000);
          ctx.fillText(
            `${String(d.getUTCDate()).padStart(2, '0')} ${String(d.getUTCHours()).padStart(2, '0')}:00`,
            (cI / colsN) * plotW,
            plotH + 11,
          );
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
          const p = max - (m.y / (plotH - volH)) * (max - min);
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
      onMove = (e) => {
        const r = canvas.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
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
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      ro.disconnect();
      mo.disconnect();
      if (onMove) canvas.removeEventListener('mousemove', onMove);
      if (onLeave) canvas.removeEventListener('mouseleave', onLeave);
    };
  }, [candles, series, height, type, theme, showVolume, showGrid, showAxes, showLastPrice, interactive]);

  return (
    <div
      ref={wrapRef}
      data-theme={theme || undefined}
      style={{ position: 'relative', width: '100%', height, ...style }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', cursor: interactive ? 'crosshair' : 'default' }}></canvas>
    </div>
  );
}
