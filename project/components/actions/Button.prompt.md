Compact dark button for openkline surfaces — toolbar variant matches the terminal's chrome; primary is accent blue; ember is the brand CTA for marketing only.

```jsx
<Button onClick={fit}>Fit all</Button>
<Button variant="primary">Share</Button>
<Button variant="ember" size="lg">npm install @rekurt/openkline</Button>
<Button active>▶ Live</Button>
```

Variants: `toolbar` (default), `primary`, `ember`, `ghost`. Sizes `sm`/`md`/`lg`. `active` renders the accent-filled toggled state (armed tool / live mode). Never use `ember` inside the terminal app.
