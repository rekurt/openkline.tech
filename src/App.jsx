import { lazy, Suspense, useEffect, useState } from 'react';
import './components/components.css';
import './pages/landing.css';
import { Badge } from './components/Badge.jsx';
import { ProductPage } from './pages/ProductPage.jsx';
import { DevPage } from './pages/DevPage.jsx';
import { LandingCommunity } from './pages/LandingCommunity.jsx';
import { useI18n, LANGS } from './i18n/index.jsx';
import { useMetrics } from './lib/useMetrics.jsx';
import { useRoute, navigate, Link } from './router.jsx';
import { useLiveRates } from './lib/useLiveRates.js';

// Docs / reference are heavy (Prism, long content) — keep them off the landing
// bundle and load on demand.
const DocsPage = lazy(() => import('./pages/DocsPage.jsx').then((m) => ({ default: m.DocsPage })));
const ReferencePage = lazy(() => import('./pages/ReferencePage.jsx').then((m) => ({ default: m.ReferencePage })));

const REPO = 'https://github.com/rekurt/openkline';

// Per-route <title> + meta description (the social/SEO source is the static
// per-route HTML shells from vite.config; this keeps the live SPA correct too).
const META = {
  product: { title: 'openkline — open-source OHLCV charting engine', desc: 'TradingView-grade OHLCV charting engine. MIT, framework-agnostic — candles, 30+ indicators, drawing tools and realtime out of the box.' },
  developers: { title: 'Developers — openkline', desc: 'Quick start in vanilla, React and Vue, architecture, indicators, drawing tools, theming and keyboard shortcuts for the openkline charting engine.' },
  docs: { title: 'Documentation — openkline', desc: 'openkline documentation: guides, live examples and an API quick reference for the OHLCV charting engine.' },
  reference: { title: 'API reference — openkline', desc: 'Every method, option and type in @rekurt/openkline-core, plus the indicator and drawing-tool catalogs.' },
};

function applyMeta(route) {
  const m = META[route] || META.product;
  document.title = m.title;
  let desc = document.querySelector('meta[name="description"]');
  if (!desc) {
    desc = document.createElement('meta');
    desc.setAttribute('name', 'description');
    document.head.appendChild(desc);
  }
  desc.setAttribute('content', m.desc);
  const path = route === 'product' ? '/' : `/${route}`;
  let canon = document.querySelector('link[rel="canonical"]');
  if (canon) canon.setAttribute('href', `https://openkline.tech${path}`);
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

function Ticker() {
  const { rows, live } = useLiveRates();
  return (
    <div className="tl-ticker">
      <div className="shell tl-ticker-in">
        <span className="live">{live ? '● LIVE' : '○ LIVE'}</span>
        {rows.map(([sym, px, d]) => (
          <span key={sym}>
            <span className="sym">{sym}</span> {px}{' '}
            <span className={d >= 0 ? 'up' : 'dn'}>
              {d >= 0 ? '▲' : '▼'}{Math.abs(d).toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const { t } = useI18n();
  const route = useRoute();
  const { metrics } = useMetrics();
  const version = metrics.version;
  const [theme, setTheme] = useState(initialTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  // Keep the document title / description / canonical correct as routes change.
  useEffect(() => {
    applyMeta(route);
  }, [route]);

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

  // Scroll to a landing section when arriving with a hash (e.g. /#support).
  useEffect(() => {
    if ((route === 'product' || route === 'developers') && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 40);
    }
  }, [route]);

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

  // Dedicated full-page routes render their own chrome.
  if (route === 'docs') return <Suspense fallback={null}><DocsPage /></Suspense>;
  if (route === 'reference') return <Suspense fallback={null}><ReferencePage /></Suspense>;

  const page = route === 'developers' ? 'developers' : 'product';
  const closeMenu = () => setMenuOpen(false);
  const goSection = (id) => {
    closeMenu();
    // defer until the menu's scroll-lock (body overflow:hidden) is released,
    // otherwise scrollIntoView is a no-op
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  return (
    <div className="tl">
      <Ticker />

      <div className="shell">
        <nav>
          <Link to="product" className="brand">
            <img src="/logo-mark.svg" width="28" height="28" alt="" />
            openkline
            <span className="pkg">@rekurt/openkline</span>
          </Link>
          <Badge>v{version}</Badge>
          {/* page tabs stay visible on every viewport — they never hide in the menu */}
          <div className="tl-pagetabs" role="tablist">
            <button type="button" role="tab" aria-selected={page === 'product'} className={page === 'product' ? 'on' : ''} onClick={() => navigate('product')}>{t.nav.product}</button>
            <button type="button" role="tab" aria-selected={page === 'developers'} className={page === 'developers' ? 'on' : ''} onClick={() => navigate('developers')}>{t.nav.dev}</button>
          </div>
          <div className="navlinks">
            <Link to="docs">{t.nav.docs}</Link>
            <Link to="reference">{t.nav.reference}</Link>
            <a href={REPO} target="_blank" rel="noreferrer">{t.nav.github}</a>
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

        {page === 'product' ? <ProductPage onOpenDev={() => navigate('developers')} /> : <DevPage />}

        <LandingCommunity />

        <footer>
          <a href={REPO} target="_blank" rel="noreferrer">{t.footer.github}</a>
          <Link to="docs">{t.nav.docs}</Link>
          <Link to="reference">{t.nav.reference}</Link>
          <a href="mailto:nikitageek@gmail.com">nikitageek@gmail.com</a>
          <a href="https://t.me/nikita_rwhe" target="_blank" rel="noreferrer">@nikita_rwhe</a>
          <span className="right">MIT · @rekurt/openkline {version} · {t.footer.right}</span>
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
          <Link to="docs" className="tl-menu-item" onNavigate={closeMenu}>
            <span className="num">01</span>{t.nav.docs}<span className="arr">→</span>
          </Link>
          <Link to="reference" className="tl-menu-item" onNavigate={closeMenu}>
            <span className="num">02</span>{t.nav.reference}<span className="arr">→</span>
          </Link>
          <button type="button" className="tl-menu-item" onClick={() => goSection('support')}>
            <span className="num">03</span>{t.nav.support}<span className="arr">→</span>
          </button>
          <button type="button" className="tl-menu-item" onClick={() => goSection('contacts')}>
            <span className="num">04</span>{t.nav.contacts}<span className="arr">→</span>
          </button>
          <a className="tl-menu-item" href={REPO} target="_blank" rel="noreferrer" onClick={closeMenu}>
            <span className="num">05</span>GitHub<span className="arr">↗</span>
          </a>
        </div>
        <div className="shell tl-menu-foot">
          <LangSwitch />
          {themeButton}
          <span className="meta">MIT · v{version}</span>
        </div>
      </div>
    </div>
  );
}
