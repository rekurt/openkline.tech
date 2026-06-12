Joined hairline button group for exclusive choices (chart type, timeframes); active segment fills accent blue.

```jsx
<SegmentedControl options={['Candles', 'Line', 'Area', 'OHLC']} value={type} onChange={setType} />
<SegmentedControl size="sm" options={['1m', '15m', '1H', '4H', '1D']} value={tf} onChange={setTf} />
```
