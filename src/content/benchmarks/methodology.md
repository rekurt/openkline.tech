# Benchmark Methodology

## What is measured

All benchmarks target the `@rekurt/openkline-core` canvas engine running in a real browser (Chromium via Playwright). Each operation is measured in isolation after a warm-up pass to eliminate JIT variance.

### Operations

| Operation | Description |
|-----------|-------------|
| `setData 10k` | Load 10 000 candles into an empty chart |
| `setData 50k` | Load 50 000 candles into an empty chart |
| `setData 100k` | Load 100 000 candles into an empty chart |
| `updateLastCandle` | Update the last candle (single tick) |
| `append` | Append one new candle to the buffer |
| `prependHistory` | Prepend a page of 500 candles (infinite scroll) |
| `pan` | Programmatic pan by 100 candles |
| `zoom` | Programmatic zoom in by 2x |
| `crosshairMove` | Move the crosshair to a new position |
| `indicatorRecompute` | Recompute all active indicators after a config change |
| `saveLayoutState` | Serialize the full chart layout |
| `loadState` | Deserialize and restore a saved layout |

## Dataset sizes

- **Small**: 10 000 candles (typical intraday session)
- **Medium**: 50 000 candles (multi-day history)
- **Large**: 100 000 candles (stress test / infinite scroll)

## Metrics collected

For each operation, we record:

- **p50, p95, p99** — latency percentiles (ms)
- **mean, min, max** — summary statistics (ms)
- **memory** — heap delta before/after (bytes), where applicable

## Environment metadata

Every benchmark run records:

- **Browser**: name and version (e.g. Chromium 128)
- **OS**: name and version (e.g. macOS 14.5)
- **Device**: CPU model, core count, RAM
- **Package version**: `@rekurt/openkline-core` semver
- **Commit SHA**: exact git commit of the measured code
- **Date**: ISO 8601 timestamp of the run
- **Bundle size**: gzip size of the core package (bytes)

## Staleness policy

Results older than 90 days or more than 5 minor versions behind the latest release are flagged as potentially stale. The flag does not remove the data — it adds a visible warning.

## Reproducibility

The benchmark harness will be published in the engine repository under `benchmarks/`. Anyone can clone the repo and run the suite locally. CI integration will publish results automatically on tagged releases.

Until the harness is wired to CI, this page shows an honest empty state — no fabricated numbers.
