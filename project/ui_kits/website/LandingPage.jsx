import React, { useEffect, useState } from 'react';
import { Badge } from '../../components/display/Badge.jsx';
import { ProductPage } from './ProductPage.jsx';
import { DevPage } from './DevPage.jsx';
import { LandingCommunity } from './LandingCommunity.jsx';

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

const TICKER = [
  ['BTC/USDT', '67,412.50', 2.31],
  ['ETH/USDT', '3,108.72', -0.84],
  ['SOL/USDT', '144.20', 5.02],
  ['TON/USDT', '7.21', 1.12],
  ['BNB/USDT', '588.40', -0.22],
  ['XRP/USDT', '0.5214', 0.67],
];

export function LandingPage({ logoSrc = '../../assets/logo-mark.svg' }) {
  ensureLandingStyle();
  const [page, setPage] = useState(() =>
    typeof window !== 'undefined' && window.location.hash.indexOf('dev') !== -1 ? 'dev' : 'product',
  );
  useEffect(() => {
    try {
      window.history.replaceState(null, '', page === 'dev' ? '#dev' : '#product');
    } catch (e) {
      /* sandboxed iframe */
    }
  }, [page]);

  return (
    <div className="tl" data-screen-label={`openkline landing — ${page}`}>
      <div className="tl-ticker">
        <div className="shell tl-ticker-in">
          <span className="live">● LIVE</span>
          {TICKER.map(([sym, px, d]) => (
            <span key={sym}>
              <span className="sym">{sym}</span> {px}{' '}
              <span className={d >= 0 ? 'up' : 'dn'}>
                {d >= 0 ? '▲' : '▼'}{Math.abs(d).toFixed(2)}%
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="shell">
        <nav>
          <span className="brand">
            <img src={logoSrc} width="28" height="28" alt="" />
            openkline
            <span className="pkg">@rekurt/openkline</span>
          </span>
          <Badge>v0.1.0</Badge>
          <div className="tl-pagetabs" role="tablist">
            <button className={page === 'product' ? 'on' : ''} onClick={() => setPage('product')}>Product</button>
            <button className={page === 'dev' ? 'on' : ''} onClick={() => setPage('dev')}>Developers</button>
          </div>
          <div className="navlinks">
            <a href="#docs">Docs</a>
            <a href="#support">Support</a>
            <a href="#contacts">Contacts</a>
            <a href="https://github.com/rekurt/ohlcv-front">GitHub ↗</a>
          </div>
        </nav>

        {page === 'product' ? <ProductPage onOpenDev={() => setPage('dev')} /> : <DevPage />}

        <LandingCommunity />

        <footer>
          <a href="https://github.com/rekurt/ohlcv-front">GitHub</a>
          <a href="https://rekurt.github.io/ohlcv-front/">Playground</a>
          <a href="https://rekurt.github.io/ohlcv-front/api/">API reference</a>
          <a href="mailto:nikitageek@gmail.com">nikitageek@gmail.com</a>
          <a href="https://t.me/nikita_rwhe">@nikita_rwhe</a>
          <span className="right">MIT · @rekurt/openkline 0.1.0 · one maintainer, 440+ tests · not your keys? not our problem</span>
        </footer>
      </div>
    </div>
  );
}
