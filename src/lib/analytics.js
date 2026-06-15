// Observability layer on top of the head-loaded counters.
// Umami (cookieless) and Yandex.Metrika (with Webvisor) are loaded directly in
// index.html. This module adds Sentry (errors only) and a safe `track()` that
// forwards conversion events to BOTH counters. Every call no-ops when a counter
// is absent (blocked / not yet loaded) and never throws — analytics is
// best-effort and must never break the app.
const ENV = import.meta.env;

export const CONFIG = {
  sentryDsn: ENV.VITE_SENTRY_DSN || '',
  yandexId: 109875855, // matches the Metrika counter in index.html
};

// Sentry only runs in a production build; dev → no-op (no noise, no network).
export function isEnabled(env = ENV) {
  return !!env.PROD;
}

export async function initSentry(cfg = CONFIG) {
  if (!cfg.sentryDsn) return null;
  const Sentry = await import('@sentry/browser');
  Sentry.init({
    dsn: cfg.sentryDsn,
    sendDefaultPii: false, // no IP / PII
    tracesSampleRate: 0, // errors only — no performance tracing, no replay
  });
  return Sentry;
}

// Forward a conversion event to every counter present. Safe + silent.
export function track(event, props) {
  if (typeof window === 'undefined') return;
  // Umami custom event
  try {
    if (window.umami && typeof window.umami.track === 'function') {
      if (props) window.umami.track(event, props);
      else window.umami.track(event);
    }
  } catch {
    /* no-op */
  }
  // Yandex.Metrika goal (so conversions show up in Metrika too)
  try {
    if (typeof window.ym === 'function') {
      window.ym(CONFIG.yandexId, 'reachGoal', event, props || {});
    }
  } catch {
    /* no-op */
  }
}
