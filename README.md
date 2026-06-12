# openkline.tech

Marketing site for **[openkline](https://github.com/rekurt/ohlcv-front)** (`@rekurt/openkline`) — a
TradingView-grade, open-source (MIT), framework-agnostic OHLCV charting engine. Candles, 30+
indicators, anchored drawing tools and realtime transports out of the box.

> **Not your engine, not your charts.** — a riff on *not your keys, not your coins*: if the engine
> isn't yours (commercial license, vendor lock-in), the charts aren't either. openkline is MIT — own
> the whole stack.

This repo is the Vite + React implementation of the **openkline Design System** landing page. It
renders two views (Product / Developers) plus shared Documentation, Support and Contacts sections,
on the system's dark-first, hairline, mono-numeric foundations.

## Stack

- **Vite 5** + **React 18** — single-page app, no router (page state lives in the URL hash).
- **CSS custom properties** — every color, type, spacing and motion value is a design-system token in
  `src/index.css`. No CSS framework, no CSS-in-JS.
- **Canvas chart** — `CandleChart` is an honest mini-recreation of the real engine's canvas (candles,
  volume, grid, axes, overlay indicators, last-price line, crosshair) with a seeded RNG so every
  render is deterministic.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build
```

## Deploy

Pushing to `main` builds and publishes to **GitHub Pages** via `.github/workflows/deploy.yml`. The
custom domain `openkline.tech` is set in `public/CNAME`. Enable Pages → "GitHub Actions" in the repo
settings for the workflow to publish.

## Structure

```
index.html                 ← Vite entry
src/
  main.jsx                 ← React mount
  index.css                ← all design-system tokens + reset
  App.jsx                  ← shell: ticker, nav, page switch, footer
  components/              ← design-system primitives (Button, Badge, Kbd,
                             CodeBlock, SegmentedControl, LegendChip, CandleChart)
  components/components.css ← primitive styles (.ok-*)
  pages/
    ProductPage.jsx        ← hero, proof strip, pillars, compare table
    DevPage.jsx            ← quick start, advantage rows, architecture,
                             catalog, keyboard map, theming
    LandingCommunity.jsx   ← Documentation, Support, Contacts (shared)
    landing.css            ← page styles (.tl-*)
public/
  logo-mark.svg            ← brand mark (draft — see below)
  CNAME                    ← openkline.tech
```

## Design system

The full design system this site is built from — tokens, component specs, voice and visual
guidelines, UI kits — lives under `project/`. It was exported from Claude Design and derived from the
real product code:

- **github.com/rekurt/ohlcv-front** — the core monorepo (`@rekurt/ohlcv-core`): engine source, canvas
  constants, the canonical dark/light themes, the vanilla demo shell, the playground.
- **github.com/rekurt/ohlcv-react** / **github.com/rekurt/ohlcv-vue** — framework wrappers.
- Playground: https://rekurt.github.io/ohlcv-front/ · API reference: https://rekurt.github.io/ohlcv-front/api/

## Contacts

- Email — [nikitageek@gmail.com](mailto:nikitageek@gmail.com)
- GitHub — [github.com/rekurt](https://github.com/rekurt)
- Telegram — [@nikita_rwhe](https://t.me/nikita_rwhe)

## Caveats

- **Logo is a draft.** `public/logo-mark.svg` is a placeholder mark (bull candle with a burning wick)
  drawn for the design system. Replace it with the real brand asset when one exists.
- **Fonts are Google-Fonts substitutes** — JetBrains Mono (data/code) and Space Grotesk (display
  headlines). The product itself ships system stacks only.
- **Donation wallet** is a placeholder ("address on request"). Wire in a real USDT/BTC/TON address
  when you have one.

## License

MIT.
