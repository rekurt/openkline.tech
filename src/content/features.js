// Feature catalog with statuses and proof pointers.
//
// FeatureStatus values:
//   'available'    — shipped, documented, tested
//   'experimental' — usable but API may change
//   'planned'      — on roadmap, not yet implemented
//   'sponsored'    — planned, available for sponsorship
//
// Rules:
//   - A planned feature MUST NOT appear in hero claims or comparison "yes" cells.
//   - A feature without docs/example links MUST NOT link to them.
//   - Indicator and drawing-tool counts come from the engine catalogs below.

/** Overlay indicators shipped in @rekurt/openkline-core. */
export const OVERLAYS = [
  'SMA', 'EMA', 'WMA', 'HMA',
  'BollingerBands', 'Keltner', 'Donchian',
  'VWAP', 'PivotPoints', 'Ichimoku',
  'Supertrend', 'ParabolicSAR', 'ZigZag',
];

/** Sub-pane indicators shipped in @rekurt/openkline-core. */
export const SUBPANE_INDICATORS = [
  'RSI', 'MACD', 'Stochastic', 'ATR',
  'WilliamsR', 'OBV', 'ADX', 'CCI',
  'MFI', 'StochRSI', 'ROC',
];

/** Drawing tools shipped in @rekurt/openkline-core. */
export const DRAWING_TOOLS = [
  'TrendLine', 'HorizontalLine', 'VerticalLine',
  'Ray', 'Rectangle', 'FibRetracement',
  'FibExtension', 'Channel', 'Arrow',
];

/** Derived counts — use these in UI instead of hardcoding "30+" or "9". */
export const INDICATOR_COUNT = OVERLAYS.length + SUBPANE_INDICATORS.length;
export const DRAWING_TOOL_COUNT = DRAWING_TOOLS.length;

/** Full feature list with status and proof. */
export const FEATURES = [
  {
    id: 'realtime',
    status: 'available',
    proof: 'O(1) append/updateLast, RAF-coalesced ticks, 3-layer canvas',
    docs: '/docs#live-data',
    example: null,
  },
  {
    id: 'indicators',
    status: 'available',
    proof: `${INDICATOR_COUNT} built-in (${OVERLAYS.length} overlay + ${SUBPANE_INDICATORS.length} sub-pane)`,
    docs: '/docs#indicators',
    example: null,
  },
  {
    id: 'drawings',
    status: 'available',
    proof: `${DRAWING_TOOL_COUNT} anchored tools, hit-testing, save/load`,
    docs: '/docs#drawings',
    example: null,
  },
  {
    id: 'data-transports',
    status: 'available',
    proof: 'DataTransport interface, jittered backoff, stale-response guard',
    docs: '/docs#live-data',
    example: null,
  },
  {
    id: 'framework-wrappers',
    status: 'available',
    proof: 'Core + React + Vue wrappers with full API parity',
    docs: '/docs#quickstart',
    example: null,
  },
  {
    id: 'state-sharing',
    status: 'available',
    proof: 'saveLayoutState/loadState, schema migrations, URL serialization',
    docs: '/docs#state',
    example: null,
  },
  {
    id: 'theming',
    status: 'available',
    proof: 'dark/light/auto + custom ThemeColors, priceFormat/volumeFormat hooks',
    docs: '/docs#theming',
    example: null,
  },
  {
    id: 'keyboard-a11y',
    status: 'available',
    proof: 'Full keyboard nav, prefers-reduced-motion, explicit state machine',
    docs: '/docs#shortcuts',
    example: null,
  },
  {
    id: 'ssr-recipes',
    status: 'available',
    proof: 'Next.js and Nuxt client-only mounting recipes',
    docs: '/docs#ssr',
    example: null,
  },
  // Planned / sponsored — not shipped yet
  {
    id: 'alerts',
    status: 'planned',
    proof: null,
    docs: null,
    example: null,
  },
  {
    id: 'replay-mode',
    status: 'planned',
    proof: null,
    docs: null,
    example: null,
  },
  {
    id: 'compare-mode',
    status: 'planned',
    proof: null,
    docs: null,
    example: null,
  },
  {
    id: 'workspaces',
    status: 'planned',
    proof: null,
    docs: null,
    example: null,
  },
  {
    id: 'exchange-adapters',
    status: 'sponsored',
    proof: null,
    docs: null,
    example: null,
  },
  {
    id: 'volume-profile',
    status: 'planned',
    proof: null,
    docs: null,
    example: null,
  },
  {
    id: 'png-svg-export',
    status: 'planned',
    proof: null,
    docs: null,
    example: null,
  },
  {
    id: 'custom-indicator-registry',
    status: 'planned',
    proof: null,
    docs: null,
    example: null,
  },
];
