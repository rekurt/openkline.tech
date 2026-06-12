Compact toolbar select with a muted inline label — the symbol/TF/type pickers of the terminal.

```jsx
<Select label="Symbol" value={sym} onChange={setSym} options={['BTC/USDT', 'ETH/USDT']} />
<Select label="TF" value={tf} onChange={setTf} options={['1m', '15m', '1H', '4H', '1D']} />
```

Options accept plain strings or `{value, label}`. Omit `label` for a bare control.
