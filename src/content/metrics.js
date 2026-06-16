// Metrics schema and offline fallback for the openkline engine.
//
// Live values come from GitHub (see lib/useMetrics.jsx). This module defines
// the shape and the committed fallback so every consumer agrees on field names.
//
// Rule: a value that cannot be confirmed MUST NOT be published as fact.
// When in doubt, omit the field — the UI should handle missing gracefully.

import FALLBACK_DATA from '../data/metrics.json';

/** Canonical field list — useMetrics.jsx uses this to sanitize remote data. */
export const METRIC_FIELDS = [
  'version',
  'coreSizeGzipKb',
  'tests',
  'lintWarnings',
  'indicators',
  'drawingTools',
];

/** Committed offline fallback (first-paint / rate-limited / offline). */
export const FALLBACK_METRICS = FALLBACK_DATA;
