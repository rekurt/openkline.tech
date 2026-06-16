# openkline — Brand Tone Guide

## Voice

Professional-punk: direct, technical, proof-backed. We respect the reader's intelligence — no hype, no hand-waving, no unearned superlatives.

## Allowed formulas

- "No iframe rent."
- "Own the chart runtime."
- "Your data pipeline stays yours."
- "Source is the contract."
- "MIT means ship it."
- "Realtime is not a plugin."
- "Indicators are configs, not ceremony."
- "Drawings stick to candles, not pixels."
- "Five lines to first candle."
- "Zero telemetry, zero phone-home, zero hosted runtime."

## Forbidden formulas

- "TradingView killer" / "TradingView replacement"
- "Best chart library" / "лучший график"
- "Enterprise-grade" (without proof: test suite size, stability track record, API semver)
- Crypto memes, moon/rocket imagery, WAGMI-style language
- USDT / crypto donation CTAs in the main conversion funnel
- "For everyone" — openkline is for teams where chart quality is a product differentiator
- Any claim about features that are `planned` or `sponsored` presented as available
- Fake benchmark numbers or unverified performance claims
- Client logos, testimonials, or case studies that don't exist

## Claims require proof

Every claim on the site follows the pattern: **Claim → Proof → Demo/Docs link**.

- A claim without a mechanism is marketing copy — don't ship it.
- A number without a source (CI, benchmark harness, package.json) is a guess — don't show it.
- A feature without a status tag (`available` / `experimental` / `planned` / `sponsored`) is ambiguous — tag it.

## Visual direction

- **Preserve**: dark canvas background, grid lines, monospace labels, ember accent color, thin borders, terminal/code blocks
- **Bull/bear colors**: only for actual market data, never for decorative UI
- **Stamps**: NO IFRAME, MIT, ZERO DEPS, NO VENDOR LOCK — used sparingly as visual anchors
- **Proof panels**: benchmark cards, feature status tags, test count badges — always backed by real data
- **Route-specific hero visuals**: each page gets a contextual header, not a copy of the landing hero
- **OG images**: 1200x630, dark chart background, OpenKline logo, short slogan, proof strip, readable text

## Tone by context

| Context | Tone |
|---------|------|
| Hero / H1 | Punchy, one-liner, no fluff |
| Feature descriptions | Technical, mechanism-first |
| Comparison tables | Factual, footnoted, no attacks |
| FAQ answers | Short, direct, link to proof |
| Error / empty states | Honest ("not yet"), helpful |
| CTA buttons | Action verb, destination-honest |
| Footer | Minimal, professional-punk tagline |

## Languages

All content ships in three locales: `ru`, `sn`, `zh`. The tone adapts to language conventions but the rules above apply universally. No locale gets marketing claims that another locale doesn't.
