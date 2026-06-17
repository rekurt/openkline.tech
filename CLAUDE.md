# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install deps (use npm, not pnpm — CI uses npm ci)
npm run dev       # dev server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build locally
npm run test      # run tests once (vitest)
npm run test:watch  # vitest in watch mode
```

Vitest tests use `jsdom`. Only `src/lib/analytics.test.js` exists today. To run a single file:
```bash
npx vitest run src/lib/analytics.test.js
```

## Architecture

**SPA without a router library.** `src/router.jsx` implements pushState navigation manually. Routes: `product` (`/`), `developers` (`/developers`), `docs` (`/docs`), `reference` (`/reference`). `DocsPage` and `ReferencePage` are lazy-loaded (code-split).

**Provider tree** (`src/main.jsx`):
```
I18nProvider → MetricsProvider → AnalyticsProvider → App
```

**CSS conventions.** No CSS framework, no CSS-in-JS. All design-system tokens live in `src/index.css`. Component styles use the `.ok-*` prefix (`src/components/components.css`); page/layout styles use `.tl-*` (`src/pages/landing.css`, `src/pages/docs.css`).

**Analytics layer** (`src/lib/analytics.js`). Umami (cookieless) and Yandex.Metrika are loaded inline in `index.html`. Sentry is dynamically imported only in production builds (`import.meta.env.PROD`). The `track(event, props)` helper forwards to both Umami and Metrika and is safe to call unconditionally — it no-ops if either counter is absent or blocked. `useAnalytics` context (`src/lib/useAnalytics.jsx`) wraps this for components.

**i18n** — `src/i18n/` (en, ru, zh). Use the `useI18n()` hook; never hardcode UI strings.

**SEO / GH Pages fallback** — `vite.config.js` includes a `spaSeoShells()` plugin that runs post-build. It writes `dist/404.html` (SPA deep-link fallback) and per-route `dist/<route>/index.html` shells with correct title/description for crawlers.

## Environment

Copy `.env.example` → `.env.local`. The only variable is `VITE_SENTRY_DSN` (Sentry is a no-op in dev without it). In CI/production it is set as a GitHub Actions secret.

## Deploy

Push to `master` triggers `.github/workflows/deploy.yml` → GitHub Pages. CI uses `npm ci` + `npm run build`. The custom domain is in `public/CNAME`.

## Package manager note

`package.json` declares `packageManager: pnpm@...` but the current working setup (and CI) uses **npm** with `package-lock.json`. A pnpm migration is in progress; until it lands, use `npm`.
