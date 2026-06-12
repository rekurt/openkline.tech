// Real project metrics, sourced from GitHub so the site updates itself.
//
// Source of truth: metrics.json in the engine repo (rekurt/openkline). Edit it
// there — a new release size, test count, version — and this site reflects it
// within the cache window. GitHub repo API adds a live star count. A committed
// copy (src/data/metrics.json) is the offline / first-paint / rate-limited
// fallback, so the numbers are never empty.
import { createContext, useContext, useEffect, useState } from 'react';
import FALLBACK from '../data/metrics.json';

const METRICS_URL = 'https://raw.githubusercontent.com/rekurt/openkline/master/metrics.json';
const REPO_URL = 'https://api.github.com/repos/rekurt/openkline';
const RELEASE_URL = 'https://api.github.com/repos/rekurt/openkline/releases/latest';

const CACHE_KEY = 'ok_metrics_v1';
const TTL_MS = 60 * 60 * 1000; // 1h between network calls
const RECHECK_MS = 10 * 60 * 1000;

const FIELDS = ['version', 'coreSizeGzipKb', 'tests', 'lintWarnings', 'indicators', 'drawingTools'];

function clean(obj) {
  // keep only known numeric/version fields with sane values
  const out = {};
  if (!obj || typeof obj !== 'object') return out;
  for (const f of FIELDS) {
    const v = obj[f];
    if (f === 'version' && typeof v === 'string' && v) out.version = v.replace(/^v/, '');
    else if (typeof v === 'number' && Number.isFinite(v) && v >= 0) out[f] = v;
  }
  return out;
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    const obj = raw ? JSON.parse(raw) : null;
    return obj && typeof obj.ts === 'number' && obj.data ? obj : null;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    /* quota / private mode — run without cache */
  }
}

async function fetchJson(url) {
  const r = await fetch(url, { headers: { accept: 'application/json' } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

// → { ...metrics, stars } merged over the committed fallback, or null on total failure.
async function fetchMetrics() {
  const [m, repo, release] = await Promise.allSettled([
    fetchJson(METRICS_URL),
    fetchJson(REPO_URL),
    fetchJson(RELEASE_URL),
  ]);
  const any = [m, repo, release].some((x) => x.status === 'fulfilled');
  if (!any) return null;

  const data = { ...clean(FALLBACK) };
  if (m.status === 'fulfilled') Object.assign(data, clean(m.value));
  // version: prefer the latest GitHub release tag when present (most "live")
  if (release.status === 'fulfilled' && typeof release.value?.tag_name === 'string') {
    data.version = release.value.tag_name.replace(/^v/, '');
  }
  if (repo.status === 'fulfilled' && typeof repo.value?.stargazers_count === 'number') {
    data.stars = repo.value.stargazers_count;
  }
  return data;
}

const MetricsContext = createContext({ metrics: clean(FALLBACK), live: false });

export function MetricsProvider({ children }) {
  const [state, setState] = useState(() => {
    const cached = readCache();
    return { metrics: { ...clean(FALLBACK), ...(cached?.data || {}) }, live: !!cached };
  });

  useEffect(() => {
    let cancelled = false;

    const tick = async () => {
      const cached = readCache();
      if (cached && Date.now() - cached.ts < TTL_MS) {
        if (!cancelled) setState({ metrics: { ...clean(FALLBACK), ...cached.data }, live: true });
        return;
      }
      try {
        const data = await fetchMetrics();
        if (!data) throw new Error('no data');
        writeCache(data);
        if (!cancelled) setState({ metrics: { ...clean(FALLBACK), ...data }, live: true });
      } catch {
        if (cached && !cancelled) setState({ metrics: { ...clean(FALLBACK), ...cached.data }, live: true });
      }
    };

    tick();
    const iv = setInterval(tick, RECHECK_MS);
    return () => {
      cancelled = true;
      clearInterval(iv);
    };
  }, []);

  return <MetricsContext.Provider value={state}>{children}</MetricsContext.Provider>;
}

export function useMetrics() {
  return useContext(MetricsContext);
}
