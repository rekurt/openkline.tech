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
