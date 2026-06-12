36px square glyph button for the drawing-tool rail and toolbar utilities; ghost at rest, hairline on hover, accent-filled when armed.

```jsx
<IconButton title="Trend line (T)" active><Icon name="trendline" size={18} /></IconButton>
<IconButton title="Clear all drawings"><Icon name="trash" size={18} /></IconButton>
```

The glyph is always an `<Icon>` from the openkline stroke set — never emoji. Always pass `title`; it doubles as aria-label.
