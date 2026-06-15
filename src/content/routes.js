// Route definitions for the openkline site.
// router.jsx consumes these — add new pages here, not in the router.

export const ROUTE_DEFS = [
  { id: 'product', path: '/', aliases: ['/product'] },
  { id: 'developers', path: '/developers' },
  { id: 'docs', path: '/docs' },
  { id: 'reference', path: '/reference' },
  { id: 'examples', path: '/examples' },
  { id: 'playground', path: '/playground' },
  // Future routes (uncomment when pages are created):
  // { id: 'benchmarks', path: '/benchmarks' },
  // { id: 'roadmap', path: '/roadmap' },
  // { id: 'support', path: '/support' },
];

/** path → route id lookup (includes aliases). */
export const PATH_TO_ROUTE = Object.fromEntries(
  ROUTE_DEFS.flatMap((r) => [
    [r.path, r.id],
    ...(r.aliases || []).map((a) => [a, r.id]),
  ]),
);

/** route id → canonical path lookup. */
export const ROUTE_TO_PATH = Object.fromEntries(
  ROUTE_DEFS.map((r) => [r.id, r.path]),
);
