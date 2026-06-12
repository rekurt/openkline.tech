import { useEffect, useState } from 'react';
import './components/components.css';
import './pages/landing.css';
import { Badge } from './components/Badge.jsx';
import { ProductPage } from './pages/ProductPage.jsx';
import { DevPage } from './pages/DevPage.jsx';
import { LandingCommunity } from './pages/LandingCommunity.jsx';
import { useI18n, LANGS } from './i18n/index.jsx';

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

function LangSwitch() {
  const { lang, setLang } = useI18n();
  return (
    <div className="tl-langs" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button key={l.code} type="button" className={lang === l.code ? 'on' : ''} onClick={() => setLang(l.code)}>
          {l.label}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const { t } = useI18n();
  const [page, setPage] = useState(readPage);
  const [theme, setTheme] = useState(initialTheme);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Open menu: Escape closes it, the page behind it stops scrolling.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  // Growing past the mobile breakpoint dismisses the menu.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)');
    const onChange = (e) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const navTo = (p) => {
    goToPage(p);
    setMenuOpen(false);
  };
  const closeMenu = () => setMenuOpen(false);

  const themeButton = (
    <button
      type="button"
      className="tl-themebtn"
      onClick={() => setTheme((cur) => (cur === 'dark' ? 'light' : 'dark'))}
      title={t.nav.themeTitle}
    >
      {theme === 'dark' ? t.nav.light : t.nav.dark}
    </button>
  );

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
          {/* page tabs stay visible on every viewport — they never hide in the menu */}
          <div className="tl-pagetabs" role="tablist">
            <button type="button" role="tab" aria-selected={page === 'product'} className={page === 'product' ? 'on' : ''} onClick={() => navTo('product')}>{t.nav.product}</button>
            <button type="button" role="tab" aria-selected={page === 'dev'} className={page === 'dev' ? 'on' : ''} onClick={() => navTo('dev')}>{t.nav.dev}</button>
          </div>
          <div className="navlinks">
            <a href="#docs">{t.nav.docs}</a>
            <a href="#support">{t.nav.support}</a>
            <a href="#contacts">{t.nav.contacts}</a>
            <a href="https://github.com/rekurt/ohlcv-front" target="_blank" rel="noreferrer">{t.nav.github}</a>
            <LangSwitch />
            {themeButton}
          </div>
          <button
            type="button"
            className="tl-burger"
            aria-label={t.nav.menuOpen}
            aria-expanded={menuOpen}
            aria-controls="tl-menu"
            onClick={() => setMenuOpen(true)}
          >
            <span></span><span></span><span></span>
          </button>
        </nav>

        {page === 'product' ? <ProductPage onOpenDev={() => goToPage('dev')} /> : <DevPage />}

        <LandingCommunity />

        <footer>
          <a href="https://github.com/rekurt/ohlcv-front" target="_blank" rel="noreferrer">{t.footer.github}</a>
          <a href="https://rekurt.github.io/ohlcv-front/" target="_blank" rel="noreferrer">{t.footer.playground}</a>
          <a href="https://rekurt.github.io/ohlcv-front/api/" target="_blank" rel="noreferrer">{t.footer.api}</a>
          <a href="mailto:nikitageek@gmail.com">nikitageek@gmail.com</a>
          <a href="https://t.me/nikita_rwhe" target="_blank" rel="noreferrer">@nikita_rwhe</a>
          <span className="right">{t.footer.right}</span>
        </footer>
      </div>

      {/* full-screen mobile menu — section links + theme + language; tabs live in the nav */}
      <div id="tl-menu" className={`tl-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label={t.nav.menuOpen}>
        <div className="shell tl-menu-bar">
          <span className="brand">
            <img src="/logo-mark.svg" width="28" height="28" alt="" />
            openkline
          </span>
          <button type="button" className="tl-burger is-x" aria-label={t.nav.menuClose} onClick={closeMenu}>
            <span></span><span></span><span></span>
          </button>
        </div>
        <div className="shell tl-menu-list">
          <div className="seclabel">{t.nav.menuTag}</div>
          <a className="tl-menu-item" href="#docs" onClick={closeMenu}>
            <span className="num">01</span>{t.nav.docs}<span className="arr">→</span>
          </a>
          <a className="tl-menu-item" href="#support" onClick={closeMenu}>
            <span className="num">02</span>{t.nav.support}<span className="arr">→</span>
          </a>
          <a className="tl-menu-item" href="#contacts" onClick={closeMenu}>
            <span className="num">03</span>{t.nav.contacts}<span className="arr">→</span>
          </a>
          <a className="tl-menu-item" href="https://github.com/rekurt/ohlcv-front" target="_blank" rel="noreferrer" onClick={closeMenu}>
            <span className="num">04</span>GitHub<span className="arr">↗</span>
          </a>
        </div>
        <div className="shell tl-menu-foot">
          <LangSwitch />
          {themeButton}
          <span className="meta">MIT · v0.1.0</span>
        </div>
      </div>
    </div>
  );
}
