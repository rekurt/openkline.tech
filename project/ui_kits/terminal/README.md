# UI kit: openkline terminal

High-fidelity interactive recreation of the chart application shell from `rekurt/ohlcv-front` (`examples/core/index.html` + `examples/core/src/main.ts`).

Layout is the demo's exact grid: 48px tool rail · 56px toolbar · chart area · 28px status bar. Toolbar = Symbol/TF/Type/Data selects + indicator dropdown + theme + Live. Tool rail uses the openkline stroke icon set (`Icon` component — never emoji). Status bar shows the mono OHLCV readout and the hint chain.

Interactive: switch symbol/timeframe (chart reseeds), toggle indicators (lines draw + legend chips appear), arm drawing tools, toggle dark/light theme, toggle Live. Click "autoFollow: on" in the status bar to disengage and reveal the "Go to live" pill.

`TerminalApp` composes the system components: `Select`, `Button`, `IconButton`, `Checkbox`, `CandleChart`, `LegendChip`, `GoLivePill`, `Badge`.
