// Live crypto rates for the ticker — ported from the docs bundle's live-rates.js.
// CoinGecko, free, no key, CORS-friendly. Hits the network at most once an hour
// (localStorage-cached); falls back to the static seed if the network/cache is
// unavailable, so the strip is never empty.
import { useEffect, useState } from 'react';

const ENDPOINT =
  'https://api.coingecko.com/api/v3/simple/price' +
  '?ids=bitcoin,ethereum,solana,the-open-network,binancecoin,ripple' +
  '&vs_currencies=usd&include_24hr_change=true';
const CACHE_KEY = 'ok_rates_v2';
const TTL_MS = 60 * 60 * 1000; // 1h between network calls
const RECHECK_MS = 5 * 60 * 1000;

const COINS = [
  { id: 'bitcoin', sym: 'BTC/USDT' },
  { id: 'ethereum', sym: 'ETH/USDT' },
  { id: 'solana', sym: 'SOL/USDT' },
  { id: 'the-open-network', sym: 'TON/USDT' },
  { id: 'binancecoin', sym: 'BNB/USDT' },
  { id: 'ripple', sym: 'XRP/USDT' },
];

// [sym, priceStr, changePct] — same shape the ticker already renders.
const SEED = [
  ['BTC/USDT', '67,412.50', 2.31],
  ['ETH/USDT', '3,108.72', -0.84],
  ['SOL/USDT', '144.20', 5.02],
  ['TON/USDT', '7.21', 1.12],
  ['BNB/USDT', '588.40', -0.22],
  ['XRP/USDT', '0.5214', 0.67],
];

function fmt(n) {
  const digits = n >= 100 ? 2 : n >= 1 ? 2 : 4;
  return Number(n).toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

function toRows(data) {
  return COINS.map((c) => {
    const d = data[c.id] || {};
    if (d.usd == null) return null;
    return [c.sym, fmt(d.usd), Number(d.usd_24h_change || 0)];
  }).filter(Boolean);
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

export function useLiveRates() {
  const [rows, setRows] = useState(SEED);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const apply = (data) => {
      const next = toRows(data);
      if (!cancelled && next.length) {
        setRows(next);
        setLive(true);
      }
    };

    const tick = async () => {
      const cached = readCache();
      if (cached && Date.now() - cached.ts < TTL_MS) {
        apply(cached.data);
        return;
      }
      try {
        const r = await fetch(ENDPOINT, { headers: { accept: 'application/json' } });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        writeCache(data);
        apply(data);
      } catch {
        if (cached) apply(cached.data); // serve stale rather than nothing
      }
    };

    tick();
    const iv = setInterval(tick, RECHECK_MS);
    return () => {
      cancelled = true;
      clearInterval(iv);
    };
  }, []);

  return { rows, live };
}
