# openkline — Design System

**openkline** (`@rekurt/openkline`) is a TradingView-grade exchange-charting engine — open source, MIT, framework-agnostic. Candles, 30+ indicators, drawing tools, and realtime "out of the box." One pure-TypeScript core, thin React and Vue wrappers with full API parity, no vendor lock-in.

> **"Not your engine, not your charts."** — a riff on "not your keys, not your coins": if the engine isn't yours (commercial license, vendor lock-in), the charts aren't either. openkline is MIT — own the whole stack.

The product sits between TradingView Lightweight Charts (fast but bare) and commercial Highcharts Stock / DevExpress (expensive, vendor-locked): commercial-grade features + realtime engineering + accessibility, minus the license. Built for crypto/fintech teams, exchanges, brokers, bot authors, and dashboard builders.

## Sources

This system was derived from the real product code. Explore these to build better openkline designs:

- **github.com/rekurt/ohlcv-front** — the core monorepo (`@rekurt/ohlcv-core`): engine source, canvas constants, the canonical dark/light chart themes, the vanilla demo shell, and the playground app. Local snapshots of the key files live in `reference/ohlcv-front/`.
- **github.com/rekurt/ohlcv-react** / **github.com/rekurt/ohlcv-vue** — wrapper repos (`<OHLCVChart>` component + hook/composable).
- Playground: https://rekurt.github.io/ohlcv-front/ · API reference: https://rekurt.github.io/ohlcv-front/api/

Key reference files copied into this project:
- `reference/ohlcv-front/constants.ts` — canvas layout constants, fonts, `DARK_THEME`/`LIGHT_THEME` (the source of truth for every color token here)
- `reference/ohlcv-front/demo-index.html` — the vanilla demo app shell (toolbar / tool rail / status bar layout and styles)
- `reference/ohlcv-front/GUIDES.md` — official docs prose (the voice reference)

## Products / surfaces

1. **The terminal** — the chart application itself (playground/demo shell): toolbar, drawing-tool rail, chart canvas, indicator menu, status bar. Recreated in `ui_kits/terminal/`.
2. **The website** — marketing/landing surface for the open-source project (hero, features, code, comparison). Built on brand foundations in `ui_kits/website/`.

---

## CONTENT FUNDAMENTALS

**Language.** Product and docs are written in English. (The company communicates in Russian internally; user-facing copy is English.)

**Voice: a staff engineer explaining their own code.** Precise, technical, confident, zero fluff. Claims are always backed by a mechanism or a number:
- "O(1) `append`/`updateLast`, backing `Float64Array`"
- "440+ unit tests, strict TypeScript including `noUncheckedIndexedAccess`, 0 lint warnings in CI"
- "stale-response protection via version counter"

**One streak of irreverence.** The brand allows exactly one register break — the tagline *"Not your engine, not your charts."* (a "not your keys, not your coins" riff) and similar crypto-native winks. Use it in hero/marketing moments only, never in docs or UI chrome. never in docs or UI chrome.

**Casing & punctuation.**
- Sentence case everywhere: headings, buttons, labels ("Go to live", "Clear all drawings"). Never Title Case, never ALL CAPS except tiny mono labels (badges, axis tags).
- Inline code in backticks-style mono for every identifier: `updateLastCandle`, `prefers-reduced-motion`.
- Middle dots (`·`) separate compact metadata: `BTC/USDT · 1H`.
- Hint strings are terse mono chains: `Drag pan · Wheel zoom · ←→ keys · Esc cancel`.

**You/we.** Docs address the reader as "you" with imperatives ("Pass `preserveView: true`", "Give the container an explicit height"). "We" is rare; the library itself is the subject ("The chart already serializes…").

**Numbers are content.** Prices, percentages, counts are first-class copy — always monospace, always tabular-nums, colored bull/bear only when they encode direction.

**Emoji.** Never. Not in UI, not in marketing, not in docs. The original repo used a few as toolbar glyphs and doc markers — the design system replaces all of them with the openkline stroke icon set (`Icon` component). Unicode affordances in copy (`→`, `▾`, `·`, `▲`, `▼`) remain.

---

## VISUAL FOUNDATIONS

**Dark-first.** The default surface is the chart's own `#131722` night-blue slate. Light theme exists (`[data-theme='light']`) and mirrors the engine's `LIGHT_THEME`, but every design decision starts dark.

**Color system** (all values verbatim from `constants.ts` / the demo shell):
- Surfaces: canvas `#131722` → panel `#1e222d` → raised `#262b38`. Depth is communicated by *lighter* surfaces, not shadows.
- Hairlines: `#363a45` 1px borders delineate everything (toolbar, rail, status bar, controls).
- Text: `#d1d4dc` primary, `#758696` muted/hints.
- **Market pair (sacred):** bull `#26a69a` teal, bear `#ef5350` red. These mean up/down and *nothing else*. Volume = same hues at 30% alpha.
- **Interactive accent:** `#2962ff` blue — active tools, selected states, primary buttons, focus rings.
- **Brand ember:** `#ff6b2c` — the burning wick from the logo mark. Logo, marketing highlights, hero moments only. Never used for data, never competes with bull/bear.
- Indicator overlays cycle: gold `#f5c344`, sky `#58a6ff`, violet `#c084fc`, rose `#f97583`, green `#56d364`.

**Typography.**
- UI chrome: system stack (`-apple-system … sans-serif`) at 12–13px. The app is dense; body never exceeds 13px inside the terminal.
- Data & code: JetBrains Mono (substitute for the engine's `ui-monospace`/`SF Mono`/`Menlo` stack) with `tabular-nums`. Every number on screen is mono.
- Display: Space Grotesk 600/700 for marketing headlines only (new brand choice — flagged; no display face exists in the repo).
- Canvas text is tiny and fixed: 11px axes, 12px legend, 10px markers.

**Spacing & layout.** 4px-ish micro scale (2/4/6/8/12/16…); the app shell is a fixed grid: 56px toolbar, 48px tool rail, 28px status bar, 80px price axis, 30px time axis. Controls are compact (26–36px); marketing breathes at 48–64px rhythm.

**Corners.** 4px on controls and menus, 6px on cards, full pill for the "Go to live" pill and badges. Nothing above 10px — the brand is square-ish and instrumental.

**Borders & elevation.** 1px hairline borders do the structural work; shadows are reserved for floating layers only (dropdown `0 8px 24px rgba(0,0,0,.4)`, modal heavier). No inner shadows, no glows except `*-dim` alpha washes for selected/tinted states.

**Backgrounds & imagery.** No photography, no illustration, no patterns. The chart itself is the imagery — every marketing surface earns its visual interest from a live or rendered candle chart. Flat fills only; the single permitted gradient is the area-chart fill under a line and the ember flame in the logo.

**Hover.** Background swap (transparent → `--surface-raised`/`--border`), 120ms ease-out. No transforms, no scale.
**Press/active.** Accent fill (`--accent` bg + white text) for toggled tools; pressed buttons darken to `--accent-hover`.
**Focus.** 2px `--accent` ring, offset 2px. Keyboard-first is a product pillar — never suppress focus styles.

**Motion.** Fast and functional: 120ms hover, 200ms menus, ease-out. The engine honors `prefers-reduced-motion` (pan momentum disables) — all UI motion must too. No bounces, no decorative loops, no parallax.

**Transparency & blur.** Alpha used only for volume bars (30%) and tint washes (`--accent-dim`, `--ember-dim`). No backdrop blur anywhere.

**Cards.** Panel background + 1px hairline + 6px radius, no shadow. Content padding 16–24px.

---

## ICONOGRAPHY

- **The openkline stroke icon set (`components/actions/Icon.jsx`) is the only approved icon source.** 24px grid, 1.75px stroke, round caps, `currentColor` — Lucide-style outline geometry (flagged substitution: the repo ships no icon assets; its demo used unicode/emoji glyphs, which this system bans). 18 glyphs: pointer, crosshair, trendline, hline, rect, fib, channel, trash, camera, moon, sun, play, check, x, arrowRight, plus, minus, zoomIn.
- **Emoji: never.** Anywhere.
- Arrows/affordances in copy stay unicode: `→`, `←`, `▾`, `·`, `▲`, `▼`, `✕`, `✓`.
- In the tool rail: `<IconButton><Icon name="trendline" size={18} /></IconButton>`. Icons inherit text color — never hardcode fills.
- If a glyph is missing, extend `Icon.jsx` with matching geometry (or pull the equivalent Lucide path) — do not mix in another set at a different stroke weight.
- The only logo asset is `assets/logo-mark.svg` (+ `logo-mark-light-bg.svg`) — a DRAFT mark drawn for this system (bull candle with a burning wick). Replace with the real brand asset when one exists.

---

## INDEX

```
styles.css                 ← single global-CSS entry (import this)
tokens/                    ← colors, typography, spacing, motion, fonts
assets/                    ← logo marks (draft)
guidelines/                ← foundation specimen cards (Design System tab)
components/
  actions/                 ← Button, IconButton
  forms/                   ← Select, Checkbox, SegmentedControl
  display/                 ← Badge, Kbd, PriceStat, CodeBlock
  chart/                   ← CandleChart, GoLivePill, LegendChip
ui_kits/
  terminal/                ← the chart app (interactive recreation)
  website/                 ← marketing landing page
templates/
  terminal/                ← seed template: full terminal app shell
  landing-page/            ← seed template: marketing page
reference/ohlcv-front/     ← snapshots of the source repo's key files
SKILL.md                   ← agent skill entry point
```

**Components** (use via `window.<Namespace>` from `_ds_bundle.js`): `Button`, `IconButton`, `Icon`, `Select`, `Checkbox`, `SegmentedControl`, `Badge`, `Kbd`, `PriceStat`, `CodeBlock`, `CandleChart`, `GoLivePill`, `LegendChip`.

**Rules of thumb when designing for openkline:**
1. Start dark. `#131722`, hairlines, mono numbers.
2. Bull/bear colors are data-only. Ember is brand-only. Blue is interaction-only.
3. The chart is the hero — never decorate around it, let it fill.
4. Dense app chrome (12–13px), generous marketing (Space Grotesk + 48px+ rhythm).
5. Every claim in copy needs a number or a mechanism.
