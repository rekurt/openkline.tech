// Demo symbols for the deterministic mock feed — mirrors the engine repo's
// examples/_shared. Each symbol carries a PRNG seed so its generated chart is
// reproducible across reloads.
export const SYMBOLS = [
  { id: 'BTCUSDT', label: 'BTC/USDT', seed: 1, basePrice: 42000 },
  { id: 'ETHUSDT', label: 'ETH/USDT', seed: 2, basePrice: 2500 },
  { id: 'SOLUSDT', label: 'SOL/USDT', seed: 3, basePrice: 140 },
];

export function symbolByLabel(label) {
  return SYMBOLS.find((s) => s.label === label) || SYMBOLS[0];
}
