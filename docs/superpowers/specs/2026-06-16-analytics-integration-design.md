# Analytics integration — design spec

- **Date:** 2026-06-16
- **Project:** openkline.tech (landing for the open-source OHLCV charting engine)
- **Status:** Approved (brainstorming), pending implementation plan

## Goal

Add a privacy-first analytics + observability stack to the landing page and ship
it to production (GitHub Pages) so we get traffic, conversion events, JS-error
visibility and search indexing — without a cookie banner.

## Context (as discovered)

- **Stack:** Vite + React 18, pure SPA, custom history router (`src/router.jsx`)
  that dispatches `popstate` on every navigation.
- **Hosting:** GitHub Pages (`CNAME` → `openkline.tech`, `www` → `rekurt.github.io`,
  `vite.config.js` emits `404.html` + per-route SEO shells). No backend.
- **DNS:** reg.ru (not Cloudflare) → Cloudflare Web Analytics not used.
- **Audience:** developers, three markets — ru / en / zh.
- **Existing pattern to follow:** `src/lib/useMetrics.jsx` — Context Provider +
  `useEffect` + localStorage cache + graceful fallback, wired in `main.jsx`.
- **Clean slate:** no analytics scripts present today.

## Decisions

| Layer | Tool | Cookies | Notes |
|---|---|---|---|
| Web analytics (traffic/sources) | **Umami Cloud** (free, hosted) | no | Plausible ($9) is a drop-in fallback later |
| JS errors | **Sentry** (`@sentry/browser`, errors only, no replay) | no | `sendDefaultPii: false` |
| Search indexing | **Google Search Console + Yandex Webmaster** | no | verification meta tags + sitemap |

Web-analytics hosting: **hosted, no own infra**. Privacy posture: **cookieless,
no consent banner**.

## Architecture (Approach A — thin provider)

- `src/lib/useAnalytics.jsx` — new `AnalyticsProvider` + `useAnalytics()` hook.
  - On mount, **only when `import.meta.env.PROD`**: inject Umami script with
    `data-website-id`; call `Sentry.init()`.
  - Subscribe to `popstate` (same signal as `useRoute`) → send a Umami pageview
    on `pathname` change.
  - Export `track(event, props)` → Umami custom event; **no-op** in dev or when
    keys are absent (mirrors `useMetrics` graceful fallback).
- `src/main.jsx` — wrap `<App/>` in `<AnalyticsProvider>` alongside `MetricsProvider`.
- Call sites for `track(...)`: `CodeBlock.jsx`, GitHub links (`App.jsx` /
  `LandingCommunity.jsx` / `ProductPage.jsx`), `SegmentedControl.jsx`, `DemoChart.jsx`.
- `index.html` — add `google-site-verification` + `yandex-verification` meta tags.
- `.env.example` — document the public env vars.
- `package.json` — add `@sentry/browser`.

## Events

| Event | Where | Props | Phase |
|---|---|---|---|
| `pageview` | provider, on popstate | path | v1 |
| `install-copy` | CodeBlock | manager (npm/pnpm/yarn) | v1 |
| `github-click` | GitHub links | location | v1 |
| `lang-change` | language switcher | lang (ru/en/zh) | v1 |
| `demo-interact` | DemoChart | — | v1 |
| `code-tab-switch` | SegmentedControl | target (vanilla/react/vue) | v1 |

## Config (public keys, fine for static build)

- `VITE_UMAMI_WEBSITE_ID` — Umami site UUID
- `VITE_UMAMI_SRC` — Umami Cloud script URL
- `VITE_SENTRY_DSN` — Sentry DSN
- Injected as env in the GitHub Actions build. Absent → provider is a silent
  no-op (never throws, never blocks first paint).

## SEO panels (manual, not bundle code)

1. Google Search Console: add property `openkline.tech`, take the
   `google-site-verification` token → into `index.html` meta.
2. Yandex Webmaster: add site, take `yandex-verification` token → into
   `index.html` meta.
3. Submit `sitemap.xml` in both (generate if missing).

## Privacy

- Collected: page path, referrer, country-level geo, device class (aggregated,
  cookieless via Umami).
- NOT collected: cookies, precise IP, PII, session recordings.
- Sentry: stack traces only, `sendDefaultPii: false`.
- No consent banner required.

## Testing

- Provider is a no-op without keys → unit-testable by mocking `import.meta.env`.
- Verify: nothing loads in `dev`; `track()` never throws offline / without keys;
  pageview fires on route change in a `PROD` preview build.

## Out of scope (explicitly rejected)

- Microsoft Clarity / heatmaps / session replay (would need cookies + banner).
- Cookie-consent banner.
- Google Tag Manager.
- Self-hosting Umami/Plausible on a VPS.
- Google Analytics 4 (adblock + blocked in China + GDPR banner).

## Done criteria

On production (`openkline.tech`): Umami records pageviews and the 6 custom
events; Sentry receives a test error; Search Console and Yandex Webmaster both
show the domain as verified.

## External dependencies (require the user / account access)

- Umami Cloud account → website id + script src.
- Sentry account → project DSN.
- Google Search Console → verification token.
- Yandex Webmaster → verification token.
- GitHub repo settings → add the `VITE_*` build secrets.
