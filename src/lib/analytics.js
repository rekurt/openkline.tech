// Privacy-first analytics core: Umami (cookieless web analytics) + Sentry
// (errors only). Every function is safe to call with missing config — it
// no-ops instead of throwing, in the graceful-fallback spirit of useMetrics.jsx.
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
