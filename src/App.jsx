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

function readPage() {
  if (typeof window === 'undefined') return 'product';
  return window.location.hash.indexOf('dev') !== -1 ? 'dev' : 'product';
}

export default function App() {
  const [page, setPage] = useState(readPage);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const onHash = () => setPage(readPage());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (window.location.hash.replace('#', '') !== page) {
      try {
        window.history.replaceState(null, '', page === 'dev' ? '#dev' : '#product');
      } catch {
        /* ignore */
      }
    }
  }, [page]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
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
            <button className={page === 'product' ? 'on' : ''} onClick={() => setPage('product')}>Product</button>
            <button className={page === 'dev' ? 'on' : ''} onClick={() => setPage('dev')}>Developers</button>
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

        {page === 'product' ? <ProductPage onOpenDev={() => setPage('dev')} /> : <DevPage />}

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
