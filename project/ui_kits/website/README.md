# UI kit: openkline website

Marketing site for the open-source project — two pages in one landing, switched by the Product / Developers tabs in the nav (state also mirrored to `#product` / `#dev` hash). No marketing site exists in the repo — this surface is built strictly from the brand foundations (dark slate, hairlines, mono data, Space Grotesk display, ember accent, fintech-crypto-punk details: ticker strip, corner-bracketed terminal frames, mono section labels).

Files:
- `LandingPage.jsx` — shell: ticker strip, nav with page tabs, shared CSS, footer
- `ProductPage.jsx` — hero + proof strip + four pillars + code teaser + comparison table
- `DevPage.jsx` — quick start (vanilla/React/Vue tabs), advantage rows with code proofs, architecture, indicator/drawing catalogs, keyboard map, theming
- `LandingCommunity.jsx` — shared bottom: documentation grid, support (donate / order a feature / suggest), contacts (email · GitHub · Telegram)

Composes: `Button`, `Badge`, `CodeBlock`, `Kbd`, `SegmentedControl`, `CandleChart`, `LegendChip`.
