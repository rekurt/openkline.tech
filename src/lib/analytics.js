// Privacy-first analytics core: Umami only (cookieless web analytics, no PII,
// no Sentry, no Yandex). The Umami script is head-loaded in index.html and
// auto-tracks pageviews (incl. SPA route changes via the History API), so this
// module only exposes a safe custom-event `track()`. Every function is safe to
// call with missing config — it no-ops instead of throwing, in the
// graceful-fallback spirit of useMetrics.jsx.
const ENV = import.meta.env;

export const CONFIG = {
  umamiId: ENV.VITE_UMAMI_WEBSITE_ID || '',
  umamiSrc: ENV.VITE_UMAMI_SRC || '',
};

// Analytics only runs in a production build. Dev / preview-without-keys → no-op,
// so local work never pollutes the dashboard. Vite tree-shakes the dead branch.
export function isEnabled(env = ENV) {
  return !!env.PROD;
}

export function umamiConfigured(cfg = CONFIG) {
  return !!(cfg.umamiId && cfg.umamiSrc);
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
