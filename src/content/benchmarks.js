// Benchmark data contract for the openkline engine.
//
// Data files live in src/content/benchmarks/:
//   latest.json  — most recent benchmark run (or empty state)
//   history.json — historical runs for trend comparison
//   methodology.md — human-readable methodology document
//
// Rules:
//   - No fake numbers. If status is "pending", the page shows an empty state.
//   - Every published result MUST have environment metadata + commitSha + date.
//   - Results older than STALENESS_DAYS are flagged as potentially stale.

import LATEST_DATA from './benchmarks/latest.json';
import HISTORY_DATA from './benchmarks/history.json';

/** Operations measured by the benchmark suite. */
export const BENCHMARK_OPERATIONS = [
  { id: 'setData-10k', label: 'setData 10k', datasetSize: 10_000 },
  { id: 'setData-50k', label: 'setData 50k', datasetSize: 50_000 },
  { id: 'setData-100k', label: 'setData 100k', datasetSize: 100_000 },
  { id: 'updateLastCandle', label: 'updateLastCandle', datasetSize: null },
  { id: 'append', label: 'append', datasetSize: null },
  { id: 'prependHistory', label: 'prependHistory', datasetSize: null },
  { id: 'pan', label: 'pan', datasetSize: null },
  { id: 'zoom', label: 'zoom', datasetSize: null },
  { id: 'crosshairMove', label: 'crosshairMove', datasetSize: null },
  { id: 'indicatorRecompute', label: 'indicatorRecompute', datasetSize: null },
  { id: 'saveLayoutState', label: 'saveLayoutState', datasetSize: null },
  { id: 'loadState', label: 'loadState', datasetSize: null },
];

/** Dataset sizes used in benchmarks. */
export const BENCHMARK_DATASETS = [
  { label: '10k', count: 10_000, description: 'Typical intraday session' },
  { label: '50k', count: 50_000, description: 'Multi-day history' },
  { label: '100k', count: 100_000, description: 'Stress test / infinite scroll' },
];

/** Required fields on every published benchmark result. */
export const RESULT_FIELDS = ['p50', 'p95', 'p99', 'mean', 'min', 'max'];

/** Required environment metadata fields. */
export const ENV_FIELDS = ['browser', 'os', 'device'];

/** Days after which results are flagged as potentially stale. */
export const STALENESS_DAYS = 90;

/** Latest benchmark data (or empty state). */
export const BENCHMARK_LATEST = LATEST_DATA;

/** Historical benchmark runs. */
export const BENCHMARK_HISTORY = HISTORY_DATA;

/** Check if the latest run has published results. */
export function hasResults() {
  return BENCHMARK_LATEST.status === 'published' && BENCHMARK_LATEST.results.length > 0;
}

/** Check if a run date is stale (older than STALENESS_DAYS). */
export function isStale(dateString) {
  if (!dateString) return false;
  const runDate = new Date(dateString);
  const now = new Date();
  const diffMs = now - runDate;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays > STALENESS_DAYS;
}

/** Validate that a result object has all required fields. */
export function validateResult(result) {
  if (!result || typeof result !== 'object') return false;
  return RESULT_FIELDS.every((f) => typeof result[f] === 'number');
}

/** Validate that environment metadata has all required fields. */
export function validateEnvironment(env) {
  if (!env || typeof env !== 'object') return false;
  return ENV_FIELDS.every((f) => typeof env[f] === 'string' && env[f].length > 0);
}
