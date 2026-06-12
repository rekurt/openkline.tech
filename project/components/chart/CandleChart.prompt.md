Token-driven canvas candlestick chart recreating the openkline engine: candles, alpha volume, grid, mono axes, overlay indicators, last-price chip, snap crosshair. The chart IS the brand's imagery — use it wherever a openkline surface needs a visual.

```jsx
<CandleChart seed={7} height={360} indicators={['sma20', 'ema50']} />
<CandleChart seed={3} height={180} showAxes={false} showVolume={false} interactive={false} drift={0.06} />
```

Same `seed` ⇒ same market. `drift` > 0 trends up (good for hero shots). Colors come from CSS tokens so it follows `[data-theme='light']` automatically. Also exports `generateCandles` for custom data.
