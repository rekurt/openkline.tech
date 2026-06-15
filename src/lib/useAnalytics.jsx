import { createContext, useContext, useEffect } from 'react';
import { isEnabled, initSentry, track } from './analytics.js';

const AnalyticsContext = createContext({ track: () => {} });

export function AnalyticsProvider({ children }) {
  useEffect(() => {
    if (!isEnabled()) return; // dev → no Sentry noise

    initSentry();
    // Umami + Yandex.Metrika are loaded in index.html and auto-track pageviews
    // (including SPA route changes via the History API), so no manual pageview
    // wiring is needed here.
  }, []);

  return <AnalyticsContext.Provider value={{ track }}>{children}</AnalyticsContext.Provider>;
}

export function useAnalytics() {
  return useContext(AnalyticsContext);
}
