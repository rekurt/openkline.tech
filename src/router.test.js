import { describe, it, expect } from 'vitest';
import { navigateToLocale } from './router.jsx';

// Locale switching must keep the full subpath and query string, otherwise
// example-detail pages and shareable playground URLs break on language change.
describe('navigateToLocale', () => {
  it('preserves the subpath and query when adding a locale prefix', () => {
    window.history.replaceState({}, '', '/examples/realtime?s=ETH%2FUSDT');
    navigateToLocale('ru');
    expect(window.location.pathname).toBe('/ru/examples/realtime');
    expect(window.location.search).toBe('?s=ETH%2FUSDT');
  });

  it('drops the prefix (and keeps the query) when switching back to en', () => {
    window.history.replaceState({}, '', '/ru/playground?s=BTC');
    navigateToLocale('en');
    expect(window.location.pathname).toBe('/playground');
    expect(window.location.search).toBe('?s=BTC');
  });
});
