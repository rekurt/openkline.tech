import en from './i18n/en.jsx';
import ru from './i18n/ru.jsx';
import zh from './i18n/zh.jsx';
import sn from './i18n/sn.jsx';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { I18nProvider } from './i18n/index.jsx';
import { MetricsProvider } from './lib/useMetrics.jsx';
import { AnalyticsProvider } from './lib/useAnalytics.jsx';
import { ProductPage } from './pages/ProductPage.jsx';
import { DevPage } from './pages/DevPage.jsx';
import { LandingCommunity } from './pages/LandingCommunity.jsx';
import { DocsPage } from './pages/DocsPage.jsx';
import { ReferencePage } from './pages/ReferencePage.jsx';
import { ExamplesPage } from './pages/ExamplesPage.jsx';
import { PlaygroundPage } from './pages/PlaygroundPage.jsx';
import { BenchmarksPage } from './pages/BenchmarksPage.jsx';
import { RoadmapPage } from './pages/RoadmapPage.jsx';
import { SupportPage } from './pages/SupportPage.jsx';

const pages = {docs: DocsPage, reference: ReferencePage, examples: ExamplesPage,
 playground: PlaygroundPage, benchmarks: BenchmarksPage, roadmap: RoadmapPage, support: SupportPage};

export function exampleMeta(locale,id) {
 return ({en,ru,zh,sn}[locale] || en).examples.items.find(item => item.id === id);
}
export function render(route, locale, exampleId) {
 const Page = pages[route];
 const content = Page ? <Page initialExampleId={exampleId} /> : route === 'developers' ? <><DevPage /><LandingCommunity /></> : <><ProductPage /><LandingCommunity /></>;
 return renderToString(<I18nProvider initialLocale={locale}><MetricsProvider><AnalyticsProvider>
   <App initialRoute={route} staticContent={content} />
 </AnalyticsProvider></MetricsProvider></I18nProvider>);
}
