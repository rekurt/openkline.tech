// Minimal history-based router — real URLs (/developers, /docs, /reference),
// not hash anchors. A SPA 404.html fallback (see vite.config.js) lets GitHub
// Pages deep-link straight into any of these paths.
//
// Locale-aware: /ru/docs, /sn/examples, /zh/playground etc.
// Non-prefixed paths default to the en locale.
import { useEffect, useState } from 'react';
import { PATH_TO_ROUTE, ROUTE_TO_PATH } from './content/routes.js';
import { parseLocale, localePath } from './i18n/index.jsx';

const ROUTES = PATH_TO_ROUTE;
export const PATH_OF = ROUTE_TO_PATH;

export function routeFromPath(pathname) {
  if (typeof pathname !== 'string') return 'product';
  const { rest } = parseLocale(pathname);
  const clean = rest.replace(/\/+$/, '') || '/';
  if (ROUTES[clean]) return ROUTES[clean];
  // /examples/:id sub-routes resolve to the examples route
  if (/^\/examples\/[a-z-]+$/.test(clean)) return 'examples';
  return 'product';
}

export function currentRoute() {
  if (typeof window === 'undefined') return 'product';
  return routeFromPath(window.location.pathname);
}

/** Get the current locale from the URL. */
export function currentLocale() {
  if (typeof window === 'undefined') return 'en';
  return parseLocale(window.location.pathname).locale;
}

/** Navigate to a page (pushState) and optionally scroll to a #section. */
export function navigate(page, hash) {
  const locale = currentLocale();
  const routePath = PATH_OF[page] || '/';
  const path = localePath(locale, routePath);
  const url = path + (hash ? `#${hash}` : '');
  if (window.location.pathname + window.location.hash !== url) {
    window.history.pushState({ page }, '', url);
  }
  window.dispatchEvent(new PopStateEvent('popstate'));
  if (!hash) window.scrollTo({ top: 0, behavior: 'auto' });
}

/** Navigate to a specific locale, keeping the current route. */
export function navigateToLocale(locale) {
  const route = currentRoute();
  const routePath = PATH_OF[route] || '/';
  const path = localePath(locale, routePath);
  const hash = window.location.hash;
  const url = path + hash;
  if (window.location.pathname + window.location.hash !== url) {
    window.history.pushState({ route }, '', url);
  }
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function useRoute() {
  const [route, setRoute] = useState(currentRoute);
  useEffect(() => {
    const onPop = () => setRoute(currentRoute());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return route;
}

/** Anchor that routes internally via pushState, falling back to a real href. */
export function Link({ to, hash, className, children, onNavigate, ...rest }) {
  const locale = currentLocale();
  const routePath = (PATH_OF[to] || '/');
  const href = localePath(locale, routePath) + (hash ? `#${hash}` : '');
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
        e.preventDefault();
        navigate(to, hash);
        if (onNavigate) onNavigate();
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
