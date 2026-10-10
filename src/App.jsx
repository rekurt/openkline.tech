import { lazy, Suspense, useEffect, useState } from 'react';
import './components/components.css';
import './pages/landing.css';
import { Badge } from './components/Badge.jsx';
import { ProductPage } from './pages/ProductPage.jsx';
import { DevPage } from './pages/DevPage.jsx';
import { LandingCommunity } from './pages/LandingCommunity.jsx';
import { useI18n, LANGS, parseLocale } from './i18n/index.jsx';
import { useMetrics } from './lib/useMetrics.jsx';
import { useRoute, navigate, Link, navigateToLocale } from './router.jsx';
import { useLiveRates } from './lib/useLiveRates.js';
import { PROJECT } from './content/project.js';
import { seoMeta, seoAlternates } from './content/seo.js';
import { ROUTE_DEFS } from './content/routes.js';

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

function applyMeta(route, locale, examples) {
 const { rest } = parseLocale(window.location.pathname);
 const exampleId = rest.match(/^\/examples\/([a-z-]+)\/?$/)?.[1];
 const example = examples?.find(item => item.id === exampleId);
 const m = seoMeta(route, locale, example);
 document.title = m.title;
 const set = (selector, value, attr = 'content') => document.querySelector(selector)?.setAttribute(attr, value);
 set('meta[name="description"]', m.desc);
 set('link[rel="canonical"]', m.canonical, 'href');
 set('meta[property="og:url"]', m.canonical);
 for (const name of ['og:title','twitter:title']) set(`meta[${name.startsWith('og:') ? 'property' : 'name'}="${name}"]`, m.title);
 for (const name of ['og:description','twitter:description']) set(`meta[${name.startsWith('og:') ? 'property' : 'name'}="${name}"]`, m.desc);
 set('meta[property="og:locale"]', m.ogLocale);
 let pageSchema = document.querySelector('script[data-page-schema]');
 if (!pageSchema) { pageSchema = document.createElement('script'); pageSchema.type = 'application/ld+json'; pageSchema.setAttribute('data-page-schema',''); document.head.appendChild(pageSchema); }
 pageSchema.textContent = JSON.stringify({'@context':'https://schema.org','@type':'WebPage','@id':m.canonical+'#webpage',url:m.canonical,name:m.title,description:m.desc,inLanguage:m.language,isPartOf:{'@id':'https://openkline.tech/#website'}});
 const clean = rest.replace(/\/+$/, '') || '/';
 const known = ROUTE_DEFS.some(r => r.path === clean || r.aliases?.includes(clean)) || Boolean(example);
 set('meta[name="robots"]', m.noindex || !known ? 'noindex, follow' : 'index, follow, max-image-preview:large');
 document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
 for (const a of seoAlternates(route, example?.id)) {
  const link = document.createElement('link');
  link.rel = 'alternate'; link.hreflang = a.lang; link.href = a.url;
  document.head.appendChild(link);
 }
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

export default function App({ initialRoute, staticContent } = {}) {
  const { t, lang } = useI18n();
  const current = useRoute();
  const route = initialRoute || current;
  const { metrics } = useMetrics();
  const version = metrics.version;
  const [theme, setTheme] = useState(initialTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  const onLanding = route === 'product' || route === 'developers';
  const page = route === 'developers' ? 'developers' : 'product';

  // Keep the document title / description / canonical / hreflang correct as routes or locale change.
  useEffect(() => {
    const updateMeta = () => applyMeta(route, lang, t.examples.items);
    updateMeta();
    window.addEventListener('popstate', updateMeta);
    const familyLink = document.querySelector('.project-family-nav a:last-child');
    if (familyLink) {
      familyLink.textContent = ({ en: 'All projects ↗', ru: 'Все проекты ↗', zh: '全部项目 ↗', sn: 'Zvirongwa zvese ↗' })[lang] || 'All projects ↗';
      const prefix = lang === 'ru' ? 'ru/' : lang === 'zh' ? 'zh-cn/' : '';
      familyLink.setAttribute('href', `https://rekurt.github.io/openkline/${prefix}projects/`);
    }
    return () => window.removeEventListener("popstate", updateMeta);
  }, [route, lang, t]);

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
    const previousFocus = document.activeElement;
    const menu = document.getElementById('tl-menu');
    menu.querySelector('button')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
      if (e.key === 'Tab') {
        const controls = [...menu.querySelectorAll('a[href], button:not([disabled])')];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previousFocus?.focus();
    };
  }, [menuOpen]);

  // Growing past the mobile breakpoint dismisses the menu.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1101px)');
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

  const content = staticContent || <RouteContent route={route} />;

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

      {/* Compact mobile/tablet navigation — shared by every route. */}
      <div id="tl-menu" className={`tl-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label={t.nav.menuOpen}
        aria-hidden={!menuOpen} inert={menuOpen ? undefined : ''}
        onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}>
        <div className="tl-menu-panel">
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
            <Link to="playground" className="tl-menu-item" aria-current={route === 'playground' ? 'page' : undefined} onNavigate={closeMenu}>
              <span className="num">01</span>Playground<span className="arr">→</span>
            </Link>
            <Link to="docs" className="tl-menu-item" aria-current={route === 'docs' ? 'page' : undefined} onNavigate={closeMenu}>
              <span className="num">02</span>{t.nav.docs}<span className="arr">→</span>
            </Link>
            <Link to="reference" className="tl-menu-item" aria-current={route === 'reference' ? 'page' : undefined} onNavigate={closeMenu}>
              <span className="num">03</span>{t.nav.reference}<span className="arr">→</span>
            </Link>
            <Link to="support" className="tl-menu-item" aria-current={route === 'support' ? 'page' : undefined} onNavigate={closeMenu}>
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
    </div>
  );
}
