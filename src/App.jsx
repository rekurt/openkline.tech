import { lazy, Suspense, useEffect, useState } from 'react';
import './components/components.css';
import './pages/landing.css';
import { Badge } from './components/Badge.jsx';
import { ProductPage } from './pages/ProductPage.jsx';
import { DevPage } from './pages/DevPage.jsx';
import { LandingCommunity } from './pages/LandingCommunity.jsx';
import { useI18n, LANGS, LOCALE_PREFIXES, localePath } from './i18n/index.jsx';
import { useMetrics } from './lib/useMetrics.jsx';
import { useRoute, navigate, Link, navigateToLocale } from './router.jsx';
import { useLiveRates } from './lib/useLiveRates.js';
import { PROJECT } from './content/project.js';
import { INDICATOR_COUNT } from './content/features.js';

// Heavy routes (Prism, long content, the engine) load on demand — they stay off
// the landing bundle. Every page renders INSIDE the shared shell below, so the
// nav/footer/mobile menu are identical everywhere (docs included).
const DocsPage = lazy(() => import('./pages/DocsPage.jsx').then((m) => ({ default: m.DocsPage })));
const ReferencePage = lazy(() => import('./pages/ReferencePage.jsx').then((m) => ({ default: m.ReferencePage })));
const ExamplesPage = lazy(() => import('./pages/ExamplesPage.jsx').then((m) => ({ default: m.ExamplesPage })));
const PlaygroundPage = lazy(() => import('./pages/PlaygroundPage.jsx').then((m) => ({ default: m.PlaygroundPage })));
const BenchmarksPage = lazy(() => import('./pages/BenchmarksPage.jsx').then((m) => ({ default: m.BenchmarksPage })));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage.jsx').then((m) => ({ default: m.RoadmapPage })));
const SupportPage = lazy(() => import('./pages/SupportPage.jsx').then((m) => ({ default: m.SupportPage })));

const REPO = PROJECT.urls.github;

// docs/reference own a full-width sidebar layout (.dx-shell), so they render
// directly inside .tl (between the shared nav and footer) without the centered
// .shell wrapper the other pages use.
const FULL_WIDTH_ROUTES = new Set(['docs', 'reference']);

// Per-route <title> + meta description (the social/SEO source is the static
// per-route HTML shells from vite.config; this keeps the live SPA correct too).
const META = {
  product: { title: 'openkline — open-source OHLCV charting engine', desc: `OHLCV charting engine. MIT, framework-agnostic — candles, ${INDICATOR_COUNT} indicators, drawing tools and realtime out of the box.` },
  developers: { title: 'Developers — openkline', desc: 'Quick start in vanilla, React and Vue, architecture, indicators, drawing tools, theming and keyboard shortcuts for the openkline charting engine.' },
  docs: { title: 'Documentation — openkline', desc: 'openkline documentation: guides, live examples and an API quick reference for the OHLCV charting engine.' },
  reference: { title: 'API reference — openkline', desc: 'Every method, option and type in @rekurt/openkline-core, plus the indicator and drawing-tool catalogs.' },
  examples: { title: 'Examples — openkline', desc: `Live examples for the openkline OHLCV charting engine: realtime data, ${INDICATOR_COUNT} indicators, drawing tools, state serialization, theming, React, Vue and SSR.` },
  playground: { title: 'Playground — openkline', desc: 'Interactive playground for the openkline charting engine. Pick a symbol, toggle indicators, switch themes and copy the generated config.' },
  benchmarks: { title: 'Benchmarks — openkline', desc: 'Performance benchmarks for the openkline OHLCV charting engine: setData, append, pan, zoom, indicator recompute and more.' },
  roadmap: { title: 'Roadmap — openkline', desc: 'Feature roadmap for the openkline OHLCV charting engine: available, experimental, planned and sponsored features.' },
  support: { title: 'Support — openkline', desc: 'Commercial support, community help, security contact and sponsorship for the openkline OHLCV charting engine.' },
};

const ORIGIN = 'https://openkline.tech';

function applyMeta(route, locale) {
  const m = META[route] || META.product;
  document.title = m.title;
  let desc = document.querySelector('meta[name="description"]');
  if (!desc) {
    desc = document.createElement('meta');
    desc.setAttribute('name', 'description');
    document.head.appendChild(desc);
  }
  desc.setAttribute('content', m.desc);

  const routePath = route === 'product' ? '/' : `/${route}`;
  const canonUrl = `${ORIGIN}${localePath(locale, routePath)}`;
  let canon = document.querySelector('link[rel="canonical"]');
  if (canon) canon.setAttribute('href', canonUrl);

  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', canonUrl);

  // Manage hreflang links
  document.querySelectorAll('link[data-hreflang]').forEach((el) => el.remove());
  const allLocales = ['en', ...LOCALE_PREFIXES];
  for (const loc of allLocales) {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', loc);
    link.setAttribute('href', `${ORIGIN}${localePath(loc, routePath)}`);
    link.setAttribute('data-hreflang', 'true');
    document.head.appendChild(link);
  }
  const xdef = document.createElement('link');
  xdef.setAttribute('rel', 'alternate');
  xdef.setAttribute('hreflang', 'x-default');
  xdef.setAttribute('href', `${ORIGIN}${routePath}`);
  xdef.setAttribute('data-hreflang', 'true');
  document.head.appendChild(xdef);
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
  const switchLang = (code) => {
    setLang(code);
    navigateToLocale(code);
  };
  return (
    <div className="tl-langs" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button key={l.code} type="button" className={lang === l.code ? 'on' : ''} onClick={() => switchLang(l.code)}>
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

// Route → page content (without the shared chrome).
function RouteContent({ route }) {
  switch (route) {
    case 'docs': return <Suspense fallback={null}><DocsPage /></Suspense>;
    case 'reference': return <Suspense fallback={null}><ReferencePage /></Suspense>;
    case 'examples': return <Suspense fallback={null}><ExamplesPage /></Suspense>;
    case 'playground': return <Suspense fallback={null}><PlaygroundPage /></Suspense>;
    case 'benchmarks': return <Suspense fallback={null}><BenchmarksPage /></Suspense>;
    case 'roadmap': return <Suspense fallback={null}><RoadmapPage /></Suspense>;
    case 'support': return <Suspense fallback={null}><SupportPage /></Suspense>;
    case 'developers': return <><DevPage /><LandingCommunity /></>;
    default: return <><ProductPage onOpenDev={() => navigate('developers')} /><LandingCommunity /></>;
  }
}

export default function App() {
  const { t, lang } = useI18n();
  const route = useRoute();
  const { metrics } = useMetrics();
  const version = metrics.version;
  const [theme, setTheme] = useState(initialTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  const onLanding = route === 'product' || route === 'developers';
  const page = route === 'developers' ? 'developers' : 'product';

  // Keep the document title / description / canonical / hreflang correct as routes or locale change.
  useEffect(() => {
    applyMeta(route, lang);
  }, [route, lang]);

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
    if (onLanding && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 40);
    }
  }, [route, onLanding]);

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

  const closeMenu = () => setMenuOpen(false);
  const navLink = (to, label) => <Link to={to} className={route === to ? 'on' : ''}>{label}</Link>;

  const content = <RouteContent route={route} />;

  return (
    <div className="tl">
      <Ticker />

      <div className="shell">
        <nav>
          <Link to="product" className="brand">
            <img src="/logo-mark.svg" width="28" height="28" alt="" />
            openkline
            <span className="pkg">{PROJECT.packages.core}</span>
          </Link>
          <Badge>v{version}</Badge>
          {/* page tabs stay visible on every viewport — they never hide in the menu */}
          <div className="tl-pagetabs" role="tablist">
            <button type="button" role="tab" aria-selected={onLanding && page === 'product'} className={onLanding && page === 'product' ? 'on' : ''} onClick={() => navigate('product')}>{t.nav.product}</button>
            <button type="button" role="tab" aria-selected={onLanding && page === 'developers'} className={onLanding && page === 'developers' ? 'on' : ''} onClick={() => navigate('developers')}>{t.nav.dev}</button>
          </div>
          <div className="navlinks">
            {navLink('examples', 'Examples')}
            {navLink('playground', 'Playground')}
            {navLink('docs', t.nav.docs)}
            {navLink('reference', t.nav.reference)}
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
      </div>

      {FULL_WIDTH_ROUTES.has(route) ? content : <div className="shell">{content}</div>}

      <div className="shell">
        <footer>
          <a href={REPO} target="_blank" rel="noreferrer">{t.footer.github}</a>
          <a href={PROJECT.urls.reactRepo} target="_blank" rel="noreferrer">React</a>
          <a href={PROJECT.urls.vueRepo} target="_blank" rel="noreferrer">Vue</a>
          <Link to="examples">Examples</Link>
          <Link to="playground">{t.footer.playground}</Link>
          <Link to="benchmarks">Benchmarks</Link>
          <Link to="roadmap">Roadmap</Link>
          <Link to="support">{t.nav.support}</Link>
          <Link to="docs">{t.nav.docs}</Link>
          <Link to="reference">{t.nav.reference}</Link>
          <a href={`mailto:${PROJECT.contacts.email}`}>{PROJECT.contacts.email}</a>
          <a href={PROJECT.contacts.telegramUrl} target="_blank" rel="noreferrer">{PROJECT.contacts.telegram}</a>
          <span className="right">{PROJECT.license} · {PROJECT.packages.core} {version} · {t.footer.right}</span>
        </footer>
      </div>

      {/* full-screen mobile menu — shared by every route */}
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
          <Link to="playground" className="tl-menu-item" onNavigate={closeMenu}>
            <span className="num">01</span>Playground<span className="arr">→</span>
          </Link>
          <Link to="docs" className="tl-menu-item" onNavigate={closeMenu}>
            <span className="num">02</span>{t.nav.docs}<span className="arr">→</span>
          </Link>
          <Link to="reference" className="tl-menu-item" onNavigate={closeMenu}>
            <span className="num">03</span>{t.nav.reference}<span className="arr">→</span>
          </Link>
          <Link to="support" className="tl-menu-item" onNavigate={closeMenu}>
            <span className="num">04</span>{t.nav.support}<span className="arr">→</span>
          </Link>
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
