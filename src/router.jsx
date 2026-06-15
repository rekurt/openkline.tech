// Minimal history-based router — real URLs (/developers, /docs, /reference),
// not hash anchors. A SPA 404.html fallback (see vite.config.js) lets GitHub
// Pages deep-link straight into any of these paths.
import { useEffect, useState } from 'react';
import { PATH_TO_ROUTE, ROUTE_TO_PATH } from './content/routes.js';

const ROUTES = PATH_TO_ROUTE;
export const PATH_OF = ROUTE_TO_PATH;

export function routeFromPath(pathname) {
  if (typeof pathname !== 'string') return 'product';
  const clean = pathname.replace(/\/+$/, '') || '/';
  return ROUTES[clean] || 'product';
}

export function currentRoute() {
  if (typeof window === 'undefined') return 'product';
  return routeFromPath(window.location.pathname);
}

/** Navigate to a page (pushState) and optionally scroll to a #section. */
export function navigate(page, hash) {
  const path = PATH_OF[page] || '/';
  const url = path + (hash ? `#${hash}` : '');
  if (window.location.pathname + window.location.hash !== url) {
    window.history.pushState({ page }, '', url);
  }
  window.dispatchEvent(new PopStateEvent('popstate'));
  if (!hash) window.scrollTo({ top: 0, behavior: 'auto' });
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
  const href = (PATH_OF[to] || '/') + (hash ? `#${hash}` : '');
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
