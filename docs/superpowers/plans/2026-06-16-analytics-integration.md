# Analytics Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a cookieless analytics + error-tracking + search-indexing stack to production on openkline.tech.

**Architecture:** A thin `AnalyticsProvider` (mirroring `useMetrics.jsx`) loads Umami (cookieless web analytics) and Sentry (errors only) **only in production builds**, and emits a Umami pageview on every SPA route change via the existing `popstate` signal. Pure logic lives in `src/lib/analytics.js` (unit-tested); the React lifecycle lives in `src/lib/useAnalytics.jsx`. Public keys arrive via `VITE_*` env, injected at build time from GitHub Secrets. Search Console / Yandex verification go in `index.html` meta tags.

**Tech Stack:** Vite + React 18, `@sentry/browser`, Umami Cloud, Vitest + jsdom (new, for the core module), GitHub Actions → GitHub Pages.

**Legend:** 🔵 **[YOU]** = your action in a service dashboard (returns a key to me). 🟢 **[ME]** = code I write. Phases 🔵A and 🟢B/C run in parallel — code uses env placeholders, so it is not blocked waiting for keys.

---

## File Structure

| File | Responsibility | Action |
|---|---|---|
| `src/lib/analytics.js` | Pure config + safe `track`/`loadUmami`/`initSentry`/`trackPageview` | Create |
| `src/lib/analytics.test.js` | Unit tests for the pure logic | Create |
| `src/lib/useAnalytics.jsx` | `AnalyticsProvider` lifecycle + `useAnalytics()` hook | Create |
| `src/main.jsx` | Wrap `<App/>` in `<AnalyticsProvider>` | Modify |
| `src/components/CodeBlock.jsx` | Fire `copy` event in `doCopy()` | Modify |
| `src/App.jsx` | Fire `github-click` (nav/footer/menu) + `lang-change` | Modify |
| `index.html` | `google-site-verification` + `yandex-verification` meta | Modify |
| `.env.example` | Document public env vars | Create |
| `vite.config.js` | Add Vitest `test` block | Modify |
| `package.json` | Add deps + `test` script | Modify |
| `.github/workflows/deploy.yml` | Inject `VITE_*` env into the build step | Modify |

---

## 🔵 Phase A — Accounts & keys (YOU, in parallel; hand me each value)

These do not block my code. Do them whenever; give me the values when ready.

### Task A1: Umami Cloud (web analytics)
- [ ] Sign up at **https://cloud.umami.is/signup** (free tier).
- [ ] **Settings → Websites → Add website**: Name `openkline`, Domain `openkline.tech`.
- [ ] Open the new website → **Edit / Tracking code**. Copy two things:
  - **Website ID** (a UUID) → this becomes `VITE_UMAMI_WEBSITE_ID`.
  - The script `src` from the snippet (US: `https://cloud.umami.is/script.js`, EU: `https://eu.umami.is/script.js`) → `VITE_UMAMI_SRC`.
- [ ] **Give me:** the Website ID and which region (US/EU).

### Task A2: Sentry (JS errors)
- [ ] Sign up at **https://sentry.io/signup/** (free Developer tier).
- [ ] **Create project → Platform: Browser JavaScript** (plain, not React) → name `openkline-tech`.
- [ ] On the setup screen copy the **DSN** (looks like `https://abc123@o000.ingest.sentry.io/000`) → `VITE_SENTRY_DSN`.
- [ ] **Give me:** the DSN.

### Task A3: Google Search Console
- [ ] Open **https://search.google.com/search-console** → **Add property → URL prefix** → `https://openkline.tech`.
- [ ] Choose verification method **HTML tag**. Copy only the `content="..."` token from the shown `<meta name="google-site-verification" content="...">`.
- [ ] **Give me:** that token. (Do NOT click "Verify" yet — verify after we deploy in Phase F.)

### Task A4: Yandex Webmaster
- [ ] Open **https://webmaster.yandex.com/** (or `webmaster.yandex.ru`) → **Add site** → `https://openkline.tech`.
- [ ] Verification method **Meta tag**. Copy only the `content="..."` token from `<meta name="yandex-verification" content="...">`.
- [ ] **Give me:** that token. (Verify after deploy in Phase F.)

---

## 🟢 Phase B — Analytics core + provider (ME, TDD)

### Task B1: Add dependencies and test tooling

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install runtime + dev deps**

Run:
```bash
npm install @sentry/browser
npm install -D vitest jsdom
```

- [ ] **Step 2: Add a `test` script to `package.json`**

In the `"scripts"` block, add:
```json
    "test": "vitest run",
    "test:watch": "vitest"
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add @sentry/browser and vitest"
```

### Task B2: Configure Vitest (jsdom)

**Files:**
- Modify: `vite.config.js:1` and the `defineConfig` export

- [ ] **Step 1: Switch the import so the `test` field is typed**

Change line 1 from:
```js
import { defineConfig } from 'vite';
```
to:
```js
import { defineConfig } from 'vitest/config';
```

- [ ] **Step 2: Add a `test` block to the config object**

In the `defineConfig({ ... })` object (alongside `plugins` and `base`), add:
```js
  test: {
    environment: 'jsdom',
  },
```

- [ ] **Step 3: Commit**

```bash
git add vite.config.js
git commit -m "test: configure vitest with jsdom"
```

### Task B3: Write the failing test for the analytics core

**Files:**
- Create: `src/lib/analytics.test.js`

- [ ] **Step 1: Write the failing test**

```js
import { describe, it, expect, vi, afterEach } from 'vitest';
import { isEnabled, umamiConfigured, track } from './analytics.js';

afterEach(() => {
  delete window.umami;
});

describe('analytics core', () => {
  it('isEnabled is true only for production builds', () => {
    expect(isEnabled({ PROD: true })).toBe(true);
    expect(isEnabled({ PROD: false })).toBe(false);
    expect(isEnabled({})).toBe(false);
  });

  it('umamiConfigured requires both id and src', () => {
    expect(umamiConfigured({ umamiId: 'x', umamiSrc: 'y' })).toBe(true);
    expect(umamiConfigured({ umamiId: '', umamiSrc: 'y' })).toBe(false);
    expect(umamiConfigured({ umamiId: 'x', umamiSrc: '' })).toBe(false);
  });

  it('track is a no-op (never throws) when umami is absent', () => {
    delete window.umami;
    expect(() => track('install', { manager: 'npm' })).not.toThrow();
  });

  it('track forwards event + props to window.umami.track', () => {
    const spy = vi.fn();
    window.umami = { track: spy };
    track('github-click', { location: 'nav' });
    expect(spy).toHaveBeenCalledWith('github-click', { location: 'nav' });
  });

  it('track swallows errors thrown by umami', () => {
    window.umami = { track: () => { throw new Error('boom'); } };
    expect(() => track('x')).not.toThrow();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./analytics.js"` (file does not exist yet).

### Task B4: Implement the analytics core

**Files:**
- Create: `src/lib/analytics.js`

- [ ] **Step 1: Write the implementation**

```js
// Privacy-first analytics core: Umami (cookieless web analytics) + Sentry
// (errors only). Every function is safe to call with missing config — it
// no-ops instead of throwing, in the graceful-fallback spirit of useMetrics.js.
const ENV = import.meta.env;

export const CONFIG = {
  umamiId: ENV.VITE_UMAMI_WEBSITE_ID || '',
  umamiSrc: ENV.VITE_UMAMI_SRC || '',
  sentryDsn: ENV.VITE_SENTRY_DSN || '',
};

// Analytics only runs in a production build. Dev / preview-without-keys → no-op,
// so local work never pollutes the dashboard. Vite tree-shakes the dead branch.
export function isEnabled(env = ENV) {
  return !!env.PROD;
}

export function umamiConfigured(cfg = CONFIG) {
  return !!(cfg.umamiId && cfg.umamiSrc);
}

let umamiPromise = null;
export function loadUmami(cfg = CONFIG) {
  if (typeof document === 'undefined' || !umamiConfigured(cfg)) return null;
  if (umamiPromise) return umamiPromise;
  umamiPromise = new Promise((resolve) => {
    const s = document.createElement('script');
    s.async = true;
    s.defer = true;
    s.src = cfg.umamiSrc;
    s.setAttribute('data-website-id', cfg.umamiId);
    // We send route-change pageviews ourselves (SPA), so disable auto-track.
    s.setAttribute('data-auto-track', 'false');
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.head.appendChild(s);
  });
  return umamiPromise;
}

export async function initSentry(cfg = CONFIG) {
  if (!cfg.sentryDsn) return null;
  const Sentry = await import('@sentry/browser');
  Sentry.init({
    dsn: cfg.sentryDsn,
    sendDefaultPii: false, // no IP / PII
    tracesSampleRate: 0,   // errors only, no performance tracing, no replay
  });
  return Sentry;
}

// Safe custom-event tracker. No-op until the Umami script has loaded (or if it
// was blocked). Never throws — analytics must never break the app.
export function track(event, props) {
  if (typeof window === 'undefined') return;
  const u = window.umami;
  if (!u || typeof u.track !== 'function') return;
  try {
    if (props) u.track(event, props);
    else u.track(event);
  } catch {
    /* swallow — analytics is best-effort */
  }
}

// Explicit SPA pageview for the current path (called after each route change).
export function trackPageview() {
  if (typeof window === 'undefined') return;
  const u = window.umami;
  if (!u || typeof u.track !== 'function') return;
  try {
    u.track((p) => ({ ...p, url: window.location.pathname + window.location.search }));
  } catch {
    /* no-op */
  }
}
```

- [ ] **Step 2: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS — all 5 assertions in `analytics.test.js` green.

- [ ] **Step 3: Commit**

```bash
git add src/lib/analytics.js src/lib/analytics.test.js
git commit -m "feat: cookieless analytics core (umami + sentry)"
```

### Task B5: Create the AnalyticsProvider

**Files:**
- Create: `src/lib/useAnalytics.jsx`

- [ ] **Step 1: Write the provider + hook**

```jsx
import { createContext, useContext, useEffect } from 'react';
import { isEnabled, loadUmami, initSentry, track, trackPageview } from './analytics.js';

const AnalyticsContext = createContext({ track: () => {} });

export function AnalyticsProvider({ children }) {
  useEffect(() => {
    if (!isEnabled()) return undefined; // dev / preview → nothing loads

    loadUmami();
    initSentry();

    // The router pushState's BEFORE dispatching popstate, so window.location is
    // already current here — emit one pageview per real path change.
    let last = window.location.pathname;
    const onNav = () => {
      const path = window.location.pathname;
      if (path !== last) {
        last = path;
        trackPageview();
      }
    };
    window.addEventListener('popstate', onNav);
    return () => window.removeEventListener('popstate', onNav);
  }, []);

  return <AnalyticsContext.Provider value={{ track }}>{children}</AnalyticsContext.Provider>;
}

export function useAnalytics() {
  return useContext(AnalyticsContext);
}
```

- [ ] **Step 2: Sanity build (no test — side effects verified on prod)**

Run: `npm run build`
Expected: build succeeds, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/useAnalytics.jsx
git commit -m "feat: AnalyticsProvider with SPA pageview on route change"
```

### Task B6: Wire the provider into the app

**Files:**
- Modify: `src/main.jsx`

- [ ] **Step 1: Import and wrap**

Replace the full contents of `src/main.jsx` with:
```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { I18nProvider } from './i18n/index.jsx';
import { MetricsProvider } from './lib/useMetrics.jsx';
import { AnalyticsProvider } from './lib/useAnalytics.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider>
      <MetricsProvider>
        <AnalyticsProvider>
          <App />
        </AnalyticsProvider>
      </MetricsProvider>
    </I18nProvider>
  </StrictMode>,
);
```

- [ ] **Step 2: Commit**

```bash
git add src/main.jsx
git commit -m "feat: mount AnalyticsProvider"
```

---

## 🟢 Phase C — Event tracking (ME; 4 core events)

### Task C1: `copy` event in CodeBlock

**Files:**
- Modify: `src/components/CodeBlock.jsx` (import + `doCopy`, ~lines 1-2 and 26-35)

- [ ] **Step 1: Add the import** (after line 2, the `highlight` import)

```js
import { useAnalytics } from '../lib/useAnalytics.jsx';
```

- [ ] **Step 2: Read the hook inside the component** (just after `const [copied, setCopied] = useState(false);`)

```js
  const { track } = useAnalytics();
```

- [ ] **Step 3: Fire the event on successful copy**

In `doCopy()`, change the success callback:
```js
    navigator.clipboard.writeText(text).then(
      () => {
        track('copy', { title: title || 'bash', lang: language });
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      },
      () => {},
    );
```
(Install commands are distinguishable in Umami by `title` — e.g. `npm`, `pnpm`, `bash`.)

- [ ] **Step 4: Build sanity**

Run: `npm run build`
Expected: success.

- [ ] **Step 5: Commit**

```bash
git add src/components/CodeBlock.jsx
git commit -m "feat(analytics): track code/install copies"
```

### Task C2: `github-click` + `lang-change` in App.jsx

**Files:**
- Modify: `src/App.jsx` (import ~line 11; `LangSwitch` ~lines 55-66; GitHub `<a>` at ~190, ~211, ~245)

- [ ] **Step 1: Add the import** (after the `useRoute` import, ~line 10)

```js
import { useAnalytics } from './lib/useAnalytics.jsx';
```

- [ ] **Step 2: Track `lang-change` inside `LangSwitch`**

Replace the `LangSwitch` function with:
```jsx
function LangSwitch() {
  const { lang, setLang } = useI18n();
  const { track } = useAnalytics();
  return (
    <div className="tl-langs" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          className={lang === l.code ? 'on' : ''}
          onClick={() => { setLang(l.code); track('lang-change', { lang: l.code }); }}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Read the hook in `App()`** (just after `const route = useRoute();`)

```js
  const { track } = useAnalytics();
```

- [ ] **Step 4: Add `onClick` to the three GitHub links**

Nav link (~line 190):
```jsx
            <a href={REPO} target="_blank" rel="noreferrer" onClick={() => track('github-click', { location: 'nav' })}>{t.nav.github}</a>
```
Footer link (~line 211):
```jsx
          <a href={REPO} target="_blank" rel="noreferrer" onClick={() => track('github-click', { location: 'footer' })}>{t.footer.github}</a>
```
Mobile-menu link (~line 245):
```jsx
          <a className="tl-menu-item" href={REPO} target="_blank" rel="noreferrer" onClick={() => { track('github-click', { location: 'menu' }); closeMenu(); }}>
            <span className="num">05</span>GitHub<span className="arr">↗</span>
          </a>
```

- [ ] **Step 5: Build sanity**

Run: `npm run build`
Expected: success.

- [ ] **Step 6: Commit**

```bash
git add src/App.jsx
git commit -m "feat(analytics): track github clicks and language switches"
```

---

## 🟢🔵 Phase D — SEO verification meta + env docs

### Task D1: Add verification meta tags to index.html

**Files:**
- Modify: `index.html` (in `<head>`, after the `<meta name="robots" ...>` line ~8)

- [ ] **Step 1: Add the two meta tags** (with placeholder tokens YOU will supply from A3/A4)

```html
    <meta name="google-site-verification" content="REPLACE_WITH_GSC_TOKEN" />
    <meta name="yandex-verification" content="REPLACE_WITH_YANDEX_TOKEN" />
```
(The vite `spaSeoShells` plugin copies these into `404.html` and every per-route shell automatically, so all pages stay verified.)

- [ ] **Step 2: Replace placeholders once YOU give me the A3/A4 tokens**

When you provide them, swap `REPLACE_WITH_GSC_TOKEN` and `REPLACE_WITH_YANDEX_TOKEN` for the real values.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "seo: add Search Console + Yandex verification meta"
```

### Task D2: Document env vars

**Files:**
- Create: `.env.example`

- [ ] **Step 1: Write the example file**

```bash
# Public analytics keys — safe to expose in a static build.
# Set these as GitHub Actions secrets (Settings → Secrets → Actions) for prod.
# Leave empty locally: analytics is a no-op in dev anyway.
VITE_UMAMI_WEBSITE_ID=
VITE_UMAMI_SRC=https://cloud.umami.is/script.js
VITE_SENTRY_DSN=
```
(If A1 returned the EU region, change `VITE_UMAMI_SRC` to `https://eu.umami.is/script.js`.)

- [ ] **Step 2: Commit**

```bash
git add .env.example
git commit -m "docs: document analytics env vars"
```

---

## 🟢🔵 Phase E — CI secrets + deploy

### Task E1: Inject env into the build step

**Files:**
- Modify: `.github/workflows/deploy.yml:27`

- [ ] **Step 1: Add `env` to the build run**

Change:
```yaml
      - run: npm run build
```
to:
```yaml
      - run: npm run build
        env:
          VITE_UMAMI_WEBSITE_ID: ${{ secrets.VITE_UMAMI_WEBSITE_ID }}
          VITE_UMAMI_SRC: ${{ secrets.VITE_UMAMI_SRC }}
          VITE_SENTRY_DSN: ${{ secrets.VITE_SENTRY_DSN }}
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: inject analytics env into the Pages build"
```

### Task E2: 🔵 [YOU] Add the GitHub Secrets
- [ ] In the repo on GitHub: **Settings → Secrets and variables → Actions → New repository secret**. Add three:
  - `VITE_UMAMI_WEBSITE_ID` = (Website ID from A1)
  - `VITE_UMAMI_SRC` = `https://cloud.umami.is/script.js` (or the EU URL)
  - `VITE_SENTRY_DSN` = (DSN from A2)
- [ ] **Tell me** when done.

### Task E3: Deploy
- [ ] **Step 1: Push to master** (triggers the Pages workflow)

Run:
```bash
git push origin master
```

- [ ] **Step 2: Watch the deploy**

Run: `gh run watch` (or check the Actions tab)
Expected: build + deploy jobs green; site updates at https://openkline.tech

---

## ✅ Phase F — Verify on production

### Task F1: Umami receives data
- [ ] Open https://openkline.tech in a normal (non-adblock) browser; click between Product / Developers / Docs / Reference; copy an install command; click a GitHub link; switch language.
- [ ] In Umami Cloud dashboard → website `openkline` → confirm pageviews appear and the **Events** panel shows `copy`, `github-click`, `lang-change`.

### Task F2: Sentry receives an error
- [ ] On https://openkline.tech open the browser console and run:
```js
setTimeout(() => { throw new Error('openkline sentry smoke test'); });
```
- [ ] In Sentry → project `openkline-tech` → Issues → confirm the test error appears, then resolve/ignore it.

### Task F3: Verify search panels
- [ ] Google Search Console (A3) → click **Verify** (meta tag is now live) → then **Sitemaps** → submit `sitemap.xml`.
- [ ] Yandex Webmaster (A4) → click **Verify** → then add the sitemap `https://openkline.tech/sitemap.xml`.

**Done when:** Umami shows pageviews + 3 events, Sentry shows the smoke-test error, and both Search Console and Yandex report the domain verified.

---

## Optional follow-up (not required for "all counters live")

Two extra Umami events from the spec need reading `src/pages/ProductPage.jsx`, `src/pages/DevPage.jsx`, and `src/components/DemoChart.jsx` first to find the exact handlers:

- `code-tab-switch` — add an optional `track` prop to `SegmentedControl` (or call `track('code-tab-switch', { target })` in the consuming `onChange`).
- `demo-interact` — call `track('demo-interact')` on first interaction with `DemoChart`.

Defer until the core stack is verified in production.
