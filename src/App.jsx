import { useEffect, useState } from 'react';
import './components/components.css';
import './pages/landing.css';
import { Badge } from './components/Badge.jsx';
import { ProductPage } from './pages/ProductPage.jsx';
import { DevPage } from './pages/DevPage.jsx';
import { LandingCommunity } from './pages/LandingCommunity.jsx';

const TICKER = [
  ['BTC/USDT', '67,412.50', 2.31],
  ['ETH/USDT', '3,108.72', -0.84],
  ['SOL/USDT', '144.20', 5.02],
  ['TON/USDT', '7.21', 1.12],
  ['BNB/USDT', '588.40', -0.22],
  ['XRP/USDT', '0.5214', 0.67],
];

function readPage(prev = 'product') {
  if (typeof window === 'undefined') return 'product';
  const hash = window.location.hash.replace('#', '');
  if (hash === 'dev' || hash === 'product') return hash;
  // Section anchors (#docs/#support/#contacts) or no hash: keep the current
  // tab so the navbar links can scroll to the shared footer sections.
  return prev;
}

function initialTheme() {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = window.localStorage.getItem('ok-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* ignore */
  }
  return 'dark';
}

export default function App() {
  const [page, setPage] = useState(readPage);
  const [theme, setTheme] = useState(initialTheme);

  // Explicit tab navigation always writes the tab hash, replacing any section
  // anchor so the address bar and the visible tab can never disagree.
  const goToPage = (p) => {
    try {
      window.history.replaceState(null, '', `#${p}`);
    } catch {
      /* ignore */
    }
    setPage(p);
  };

  useEffect(() => {
    // Anchor navigation and back/forward: derive the tab from the hash, keeping
    // the current tab for #docs/#support/#contacts so their scroll is preserved.
    const onHash = () => setPage((prev) => readPage(prev));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem('ok-theme', theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  return (
    <div className="tl">
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
            <img src="/logo-mark.svg" width="28" height="28" alt="" />
            openkline
            <span className="pkg">@rekurt/openkline</span>
          </span>
          <Badge>v0.1.0</Badge>
          <div className="tl-pagetabs" role="tablist">
            <button type="button" role="tab" aria-selected={page === 'product'} className={page === 'product' ? 'on' : ''} onClick={() => goToPage('product')}>Product</button>
            <button type="button" role="tab" aria-selected={page === 'dev'} className={page === 'dev' ? 'on' : ''} onClick={() => goToPage('dev')}>Developers</button>
          </div>
          <div className="navlinks">
            <a href="#docs">Docs</a>
            <a href="#support">Support</a>
            <a href="#contacts">Contacts</a>
            <a href="https://github.com/rekurt/ohlcv-front" target="_blank" rel="noreferrer">GitHub ↗</a>
            <button
              type="button"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              title="Toggle theme"
              style={{
                background: 'transparent',
                border: 'var(--hairline)',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                padding: '4px 8px',
                cursor: 'pointer',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              {theme === 'dark' ? 'light' : 'dark'}
            </button>
          </div>
        </nav>

        {page === 'product' ? <ProductPage onOpenDev={() => goToPage('dev')} /> : <DevPage />}

        <LandingCommunity />

        <footer>
          <a href="https://github.com/rekurt/ohlcv-front" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://rekurt.github.io/ohlcv-front/" target="_blank" rel="noreferrer">Playground</a>
          <a href="https://rekurt.github.io/ohlcv-front/api/" target="_blank" rel="noreferrer">API reference</a>
          <a href="mailto:nikitageek@gmail.com">nikitageek@gmail.com</a>
          <a href="https://t.me/nikita_rwhe" target="_blank" rel="noreferrer">@nikita_rwhe</a>
          <span className="right">MIT · @rekurt/openkline 0.1.0 · one maintainer, 440+ tests · not your keys? not our problem</span>
        </footer>
      </div>
    </div>
  );
}
