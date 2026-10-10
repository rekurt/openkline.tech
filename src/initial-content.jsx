import { ProductPage } from './pages/ProductPage.jsx';
import { DevPage } from './pages/DevPage.jsx';
import { LandingCommunity } from './pages/LandingCommunity.jsx';

// Keep prerendered content visible until the first route's JS is ready.
const loaders = {
 docs: () => import('./pages/DocsPage.jsx'),
 reference: () => import('./pages/ReferencePage.jsx'),
 examples: () => import('./pages/ExamplesPage.jsx'),
 playground: () => import('./pages/PlaygroundPage.jsx'),
 benchmarks: () => import('./pages/BenchmarksPage.jsx'),
 roadmap: () => import('./pages/RoadmapPage.jsx'),
 support: () => import('./pages/SupportPage.jsx'),
};
const names = {docs:'DocsPage',reference:'ReferencePage',examples:'ExamplesPage',playground:'PlaygroundPage',benchmarks:'BenchmarksPage',roadmap:'RoadmapPage',support:'SupportPage'};
export async function initialContent(route) {
 if (loaders[route]) { const module = await loaders[route](); const Page=module[names[route]]; return <Page />; }
 return route === 'developers' ? <><DevPage /><LandingCommunity /></> : <><ProductPage /><LandingCommunity /></>;
}
