// Resolution presets for the demo feed — id is the engine's resolution string,
// seconds drives the candle bucket spacing in the generator.
export const RESOLUTIONS = [
  { id: '1m', seconds: 60 },
  { id: '5m', seconds: 300 },
  { id: '15m', seconds: 900 },
  { id: '1H', seconds: 3600 },
  { id: '4H', seconds: 14400 },
  { id: '1D', seconds: 86400 },
];

export function resolutionById(id) {
  return RESOLUTIONS.find((r) => r.id === id) || RESOLUTIONS[3];
}
