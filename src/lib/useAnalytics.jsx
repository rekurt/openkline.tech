import { createContext, useContext } from 'react';
import { track } from './analytics.js';

// Umami is head-loaded in index.html and auto-tracks pageviews, so there is no
// init step here — the provider just exposes the safe `track()` for conversion
// events. No Sentry, no Yandex: privacy-first, zero session replay.
const AnalyticsContext = createContext({ track: () => {} });

export function AnalyticsProvider({ children }) {
  return <AnalyticsContext.Provider value={{ track }}>{children}</AnalyticsContext.Provider>;
}

export function useAnalytics() {
  return useContext(AnalyticsContext);
}
