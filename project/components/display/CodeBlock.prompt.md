Dark hairline code panel for install commands and snippets, with optional uppercase title bar and ember `$` prompt.

```jsx
<CodeBlock prompt>npm install @rekurt/openkline</CodeBlock>
<CodeBlock title="chart.ts">{`const chart = new OHLCVChart({ container, symbol: 'BTC/USDT' });`}</CodeBlock>
```

Children can be a string or styled `<span>`s for manual syntax tinting (use `--ind-*` / `--bull` tokens sparingly).
