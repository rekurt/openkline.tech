import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { I18nProvider } from './i18n/index.jsx';
import { MetricsProvider } from './lib/useMetrics.jsx';
import { AnalyticsProvider } from './lib/useAnalytics.jsx';
import App from './App.jsx';
import { initialContent } from './initial-content.jsx';
import { currentRoute } from './router.jsx';

async function start() {
const route = currentRoute();
const content = await initialContent(route);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider>
      <MetricsProvider>
        <AnalyticsProvider>
          <App initialRoute={route} staticContent={content} />
        </AnalyticsProvider>
      </MetricsProvider>
    </I18nProvider>
  </StrictMode>,
);

}
start();
