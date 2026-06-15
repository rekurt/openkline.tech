import { INDICATOR_COUNT, DRAWING_TOOL_COUNT } from '../content/features.js';

/* English — the canonical copy. All dictionaries share this exact shape. */
export default {
  nav: {
    product: 'Product',
    dev: 'Developers',
    docs: 'Docs',
    reference: 'Reference',
    support: 'Support',
    contacts: 'Contacts',
    github: 'GitHub ↗',
    light: 'light',
    dark: 'dark',
    themeTitle: 'Toggle theme',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    menuTag: 'menu — pick a direction',
  },
  footer: {
    github: 'GitHub',
    playground: 'Playground',
    api: 'API reference',
    right: 'source is the contract',
  },
  product: {
    badges: { agnostic: 'framework-agnostic', realtime: 'realtime' },
    h1: <>Not <em>your</em> engine, not <em>your</em> charts.</>,
    lede: (
      <>
        So own it: <code>@rekurt/openkline</code> — a TradingView-grade OHLCV charting engine. Open source, MIT, no vendor lock-in.
        Candles, {INDICATOR_COUNT} indicators, anchored drawing tools and realtime transports out of the box.
        One TypeScript core; <code>react</code> and <code>vue</code> wrappers with full API parity.
      </>
    ),
    ctaPlayground: 'Try live demo',
    ctaDocs: 'Documentation',
    stats: [
      { k: 'unit tests' },
      { k: 'lint warnings in CI' },
      { k: 'core, gzipped' },
      { k: 'indicators built in' },
      { k: 'license fees, forever' },
    ],
    live: {
      label: 'live — poke the engine',
      h2: 'Try it right here',
      lede: 'Every chart on this site is the openkline canvas engine running for real. Toggle indicators, scrub the crosshair — no install, no iframe, no screenshots.',
      presetPlain: 'Candles + volume',
      presetBb: 'Bollinger Bands',
      presetVwap: 'Anchored VWAP',
    },
    s01: {
      label: '01 — the engine',
      h2: 'Batteries included',
      lede: 'Teams building trading UIs pick between fast-but-bare and complete-but-licensed. openkline closes all four gaps in one package.',
    },
    features: [
      {
        h: 'One core, any framework',
        p: (
          <>
            Pure TypeScript core with no React or Vue inside. Thin <code>@rekurt/openkline-react</code> and{' '}
            <code>@rekurt/openkline-vue</code> wrappers with full API parity. Vanilla, React 18/19 or Vue 3 —
            same engine, no lock-in.
          </>
        ),
      },
      {
        h: 'Built for realtime',
        p: (
          <>
            Canvas rendering on <code>Float64Array</code> buffers, O(1) <code>append</code>/<code>updateLast</code>,
            three-layer canvas for cheap crosshair redraws, RAF-coalesced ticks, jittered-backoff reconnect,
            stale-response protection. Not a report chart — an engine for a live order book.
          </>
        ),
      },
      {
        h: `${INDICATOR_COUNT} indicators, ${DRAWING_TOOL_COUNT} drawing tools`,
        p: (
          <>
            Overlays from SMA to Ichimoku, Supertrend and anchored VWAP; sub-pane RSI, MACD, Stochastic and more.
            Trend lines, Fibonacci, channels — anchored to candles, they never drift on zoom. Heikin-Ashi is
            a first-class chart type.
          </>
        ),
      },
      {
        h: 'UX the competitors skip',
        p: (
          <>
            Keyboard-first navigation, <code>prefers-reduced-motion</code> respected, an explicit auto-follow
            state machine, and the whole layout serializes into a query param.
          </>
        ),
      },
    ],
    kbd: { pan: 'pan', zoom: 'zoom', jump: 'jump', fit: 'fit' },
    s02: {
      label: '02 — for developers',
      h2: 'Five lines to first candle',
      lede: 'Indicators are config objects, not class instances — the core reconciles them. The full technical tour with examples lives on the Developers page.',
      btn: 'Developers page →',
    },
    s03: {
      label: '03 — the four-way gap',
      h2: 'Pick all four',
      lede: 'Realtime performance + full indicator set + drawing tools + framework freedom. Every alternative makes you drop at least one.',
    },
    table: {
      cols: ['openkline', 'Lightweight Charts', 'Highcharts Stock', 'ECharts / Chart.js'],
      rows: [
        { label: 'Indicators built in', cells: [{ cls: 'yes', text: String(INDICATOR_COUNT) }, { cls: 'no', text: 'write your own' }, { cls: 'yes', text: 'yes' }, { cls: 'part', text: 'generic' }] },
        { label: 'Drawing tools', cells: [{ cls: 'yes', text: `${DRAWING_TOOL_COUNT}, anchored` }, { cls: 'no', text: 'none' }, { cls: 'yes', text: 'yes' }, { cls: 'no', text: 'none' }] },
        { label: 'Realtime transports', cells: [{ cls: 'yes', text: 'built in' }, { cls: 'no', text: 'bring your own' }, { cls: 'part', text: 'partial' }, { cls: 'no', text: 'bring your own' }] },
        { label: 'Keyboard + a11y', cells: [{ cls: 'yes', text: 'first-class' }, { cls: 'no', text: 'none' }, { cls: 'part', text: 'partial' }, { cls: 'part', text: 'partial' }] },
        { label: 'License', cells: [{ cls: 'yes', text: 'MIT' }, { cls: 'yes', text: 'Apache-2.0' }, { cls: 'no', text: 'commercial' }, { cls: 'yes', text: 'MIT' }] },
        { label: 'Framework lock-in', cells: [{ cls: 'yes', text: 'none' }, { cls: 'yes', text: 'none' }, { cls: 'part', text: 'vendor APIs' }, { cls: 'yes', text: 'none' }] },
      ],
    },
    problem: {
      label: 'the problem',
      h2: 'Every charting option makes you give something up',
      lede: 'Teams building trading UIs hit the same four walls. Pick any existing solution — you lose at least one thing that matters.',
      cards: [
        { icon: '🔒', h: 'iframe rent', p: 'Hosted widgets charge per embed. Your data leaves your infra, your UX is someone else\'s roadmap, and the invoice scales with your success.' },
        { icon: '🔗', h: 'Vendor lock-in', p: 'Proprietary APIs mean rewriting everything when you outgrow the vendor. Migrations cost quarters, not sprints.' },
        { icon: '🪨', h: 'Bare-bones open source', p: 'Free charting libs give you a canvas and a prayer. No indicators, no drawings, no realtime — you build it all yourself.' },
        { icon: '📊', h: 'Generic chart libraries', p: 'ECharts and Chart.js are great for dashboards. But OHLCV candles, anchored drawings and tick-level updates aren\'t their job.' },
      ],
      cta: 'Compare alternatives',
    },
    builtFor: {
      label: 'built for',
      h2: 'Who ships with openkline',
      lede: 'Not "for everyone." For teams where chart quality is a product differentiator.',
      segments: [
        { h: 'Trading platforms', pain: 'Need realtime candles, indicators and drawings — without paying per-seat license fees.', features: 'Realtime transports, indicators, drawing tools, state serialization.', cta: 'See live demo', ctaId: 'playground' },
        { h: 'Fintech product teams', pain: 'Need MIT-licensed charts that pass legal review and don\'t create vendor dependency.', features: 'MIT license, no telemetry, full source access, framework wrappers.', cta: 'Read the docs', ctaRoute: 'docs' },
        { h: 'Quant & analytics dashboards', pain: 'Need keyboard-first navigation, URL-serializable state, and sub-pane indicators.', features: 'Keyboard nav, saveLayoutState, multi-pane RSI/MACD/Stochastic, theming API.', cta: 'Developers page', ctaRoute: 'developers' },
        { h: 'Indie devs & startups', pain: 'Need full-featured charts without enterprise budgets or months of custom work.', features: 'Five lines to first candle, zero license fees, React + Vue + vanilla.', cta: 'Quick start', ctaRoute: 'docs' },
      ],
    },
    pillars: {
      label: 'why openkline',
      h2: 'Every claim backed by a mechanism',
      lede: 'Not adjectives — data structures, complexity bounds and state machines you can read in the source.',
      items: [
        {
          claim: 'Realtime without compromise',
          proof: <>O(1) <code>append</code>/<code>updateLast</code> on <code>Float64Array</code> buffers, RAF-coalesced ticks, 3-layer canvas for zero-cost crosshair redraws.</>,
          demo: 'Try the live demo above',
          demoId: 'playground',
          docs: '/docs#live-data',
        },
        {
          claim: `${INDICATOR_COUNT} indicators, config not code`,
          proof: <>Pass a config array — the core diffs it (<code>diffIndicatorConfigs</code>) and reconciles. Reference-stable arrays skip recomputation entirely.</>,
          demo: 'Toggle indicators in the demo',
          demoId: 'playground',
          docs: '/docs#indicators',
        },
        {
          claim: `${DRAWING_TOOL_COUNT} drawing tools, anchored to candles`,
          proof: <>Trend lines, Fibonacci, channels — anchored in buffer space, they never drift on zoom. Hit-testing and save/load built in.</>,
          demo: null,
          docs: '/docs#drawings',
        },
        {
          claim: 'Any data source in four methods',
          proof: <><code>DataTransport</code> interface with jittered exponential backoff, stale-response version counter, explicit <code>onError</code> — no silent catches.</>,
          demo: null,
          docs: '/docs#live-data',
        },
        {
          claim: 'One core, any framework',
          proof: <>Pure TypeScript core. Thin <code>@rekurt/openkline-react</code> and <code>@rekurt/openkline-vue</code> wrappers with full API parity. No lock-in.</>,
          demo: null,
          docs: '/docs#quickstart',
        },
        {
          claim: 'The whole chart fits in a URL',
          proof: <><code>saveLayoutState</code> serializes everything into a compact object. <code>loadState</code> validates untrusted input and runs schema migrations.</>,
          demo: null,
          docs: '/docs#state',
        },
      ],
    },
    useWhen: {
      label: 'when to use what',
      h2: 'Honest guidance',
      lede: 'openkline isn\'t for every chart. Here\'s when it\'s the right call — and when it\'s not.',
      use: {
        h: 'Use openkline when',
        items: [
          'You need OHLCV candles with indicators and drawings',
          'Realtime tick updates matter (order books, live trading)',
          'You want MIT licensing with no per-seat fees',
          'Your data pipeline stays in your infra — no hosted widgets',
          'You need React, Vue, or vanilla — same engine, your choice',
          'Keyboard navigation and accessibility are requirements',
        ],
      },
      other: {
        h: 'Use something else when',
        items: [
          'You need pie charts, bar charts, or generic dashboards — try ECharts or Chart.js',
          'You want a hosted widget with zero setup — TradingView widget may be faster to ship',
          'You need 100+ indicators out of the box today — Highcharts Stock has a larger catalog',
          'You\'re building a static report, not a live trading UI',
        ],
      },
      footnote: 'Comparisons based on publicly available documentation as of the latest openkline release. Features and pricing of third-party products may change.',
    },
    commercialSupport: {
      label: 'support',
      h2: 'Need a faster lane?',
      lede: 'openkline is MIT and stays MIT. Commercial support gets you priority.',
      cta: 'Request integration review',
      features: [
        'Exchange adapter development',
        'Custom indicator implementation',
        'Priority bug fixes and feature requests',
        'Architecture review for your integration',
      ],
    },
    faq: {
      label: 'faq',
      h2: 'Frequently asked questions',
      items: [
        { q: 'Is openkline production-ready?', a: 'The core API is stable and tested. Check the test count in the stats strip — that\'s the live number from CI. The project follows strict semver; breaking changes only land in major versions.' },
        { q: 'How does openkline compare to TradingView?', a: 'TradingView is a hosted platform with a massive feature set. openkline is a self-hosted open-source engine. You get full control over rendering, data, and UX — but you host it yourself. There\'s no built-in data feed or social features.' },
        { q: 'Can I use openkline with my own data source?', a: 'Yes. Implement the DataTransport interface (four methods) and you\'re live. Polling, WebSocket, REST — the engine doesn\'t care where the candles come from.' },
        { q: 'What about mobile support?', a: 'Touch gestures (one-finger pan, two-finger pinch) work out of the box. The canvas is responsive and handles hi-DPI displays. Complex drawing tools may be harder to use on small screens — that\'s a UX constraint, not a bug.' },
        { q: 'Are there planned features like alerts and replay mode?', a: 'Yes — check the roadmap. Alerts, replay mode, compare mode, and workspaces are planned. They\'re not shipped yet, and we don\'t show them as available features.' },
        { q: 'Is there telemetry or tracking?', a: 'No. Zero telemetry, zero phone-home, zero hosted runtime. Your market data stays in your app.' },
        { q: 'Can I use it commercially?', a: 'Yes. MIT license — use it in any project, commercial or not, with no attribution requirement beyond the license file.' },
        { q: 'How do I get support?', a: 'Community support via GitHub issues. Commercial support (priority features, integration reviews, custom indicators) is available — email the maintainer.' },
      ],
    },
    finalCta: {
      h2: 'Own your chart runtime',
      lede: 'Source-controlled, MIT-licensed, no iframe rent. Five lines to first candle.',
      btnDemo: 'Try live demo',
      btnDocs: 'Documentation',
      btnGithub: 'GitHub',
    },
  },
  dev: {
    s01: {
      label: '01 — quick start',
      h2: 'Same engine, three ways in',
      lede: 'The core is pure TypeScript — the wrappers add nothing but idiomatic bindings. Switch frameworks without touching chart logic.',
      parity: 'full API parity',
    },
    s02: {
      label: '02 — why devs pick openkline',
      h2: 'Every claim, backed by a mechanism',
      lede: 'Not adjectives — data structures, complexity bounds and state machines you can read in the source.',
    },
    adv: [
      {
        k: 'realtime path',
        h: 'O(1) per tick, no GC churn',
        p: (
          <>
            Candles live in a <code>Float64Array</code>-backed ring buffer. <code>append</code> and{' '}
            <code>updateLast</code> are O(1); history pages in via amortized-O(1) <code>prepend</code>.
            Ticks are RAF-coalesced by <code>CandleMerger</code>, and a three-layer canvas means a crosshair
            move never repaints the candles.
          </>
        ),
        metrics: [<><b>O(1)</b> append / updateLast</>, <><b>3</b> canvas layers</>, <><b>~0 cost</b> static frame</>],
      },
      {
        k: 'declarative api',
        h: 'Indicators are config, not classes',
        p: (
          <>
            App code never calls <code>new SMA(20)</code>. Pass a config array; the core diffs it
            (<code>diffIndicatorConfigs</code>) and reconciles — reference-stable arrays skip recomputation
            entirely. The same objects round-trip through <code>saveLayoutState</code>.
          </>
        ),
        metrics: [<><b>{INDICATOR_COUNT}</b> indicator types</>, <><b>0</b> manual instances</>, <><b>diffed</b> on every render</>],
      },
      {
        k: 'transports',
        h: 'Any data source in four methods',
        p: (
          <>
            Implement <code>DataTransport</code> and you're live. <code>DataFeed</code> guards against
            stale responses with a version counter — a mid-fetch symbol switch can't render the wrong data.
            Reconnects use jittered exponential backoff. Errors flow through <code>onError</code>, never
            a silent catch.
          </>
        ),
        metrics: [<><b>4</b> methods to implement</>, <><b>jittered</b> backoff built in</>, <><b>0</b> silent catches</>],
      },
      {
        k: 'state',
        h: 'The whole chart fits in a URL',
        p: (
          <>
            <code>saveLayoutState()</code> serializes symbol, resolution, chart type, theme, indicators and
            drawings into a compact object. <code>loadState</code> validates untrusted input and runs schema
            migrations, so old links keep working after upgrades. Drawings are anchored in buffer space —
            they stick to their candles through pan and zoom.
          </>
        ),
        metrics: [<><b>1</b> query param</>, <><b>migrated</b> schemas</>, <><b>validated</b> untrusted input</>],
      },
    ],
    s03: { label: '03 — architecture', h2: 'Three subsystems, no magic' },
    arch: [
      {
        h: 'Rendering',
        items: [
          <>Hi-DPI canvas, three-layer split: chart / UI / interaction</>,
          <>Dirty-flag RAF — static chart costs ~0 between frames</>,
          <>Sub-pixel <code>fitAll</code> with per-column conflation</>,
          <>Multi-pane: sub-pane indicators get auto-sized bands + own Y-axes</>,
          <>Candles, line, area, OHLC bars, first-class Heikin-Ashi</>,
        ],
      },
      {
        h: 'Data layer',
        items: [
          <><code>CandleBuffer</code> — <code>Float64Array</code>, O(1) append, amortized-O(1) prepend</>,
          <><code>CandleMerger</code> — RAF-coalesced tick merging</>,
          <><code>DataFeed</code> — stale-response version counter</>,
          <><code>ExponentialBackoff</code> — jittered reconnects</>,
          <><code>validateCandles</code> — runtime invariant checks</>,
        ],
      },
      {
        h: 'Interaction',
        items: [
          <><code>KeyboardController</code> — full keyboard navigation</>,
          <><code>autoFollow</code> state machine — live edge tracking</>,
          <>Momentum pan that respects <code>prefers-reduced-motion</code></>,
          <>Trackpad-aware wheel: horizontal pans, vertical zooms</>,
          <>Touch: one-finger pan, two-finger pinch</>,
        ],
      },
    ],
    s04: {
      label: "04 — what's in the box",
      h2: 'Indicators & drawing tools',
      overlay: 'overlay — main pane',
      subpane: 'sub-pane — independent y-axis',
      drawings: 'drawings — anchored in buffer space, survive zoom',
      custom: <>+ subclass <code>Drawing</code> for your own</>,
    },
    s05: {
      label: '05 — keyboard-first',
      h2: 'Hands stay on the keys',
      lede: 'Full chart control without a mouse — a pillar, not an afterthought.',
    },
    keymap: [
      'Pan left / right',
      'Zoom in / out (also + / -)',
      'Jump to oldest / newest candle',
      'Reset zoom',
      'Fit all visible data',
      'Arm trend line / horizontal line tool',
      'Cancel active tool or drawing',
      'Fit visible range',
    ],
    s06: {
      label: '06 — theming',
      h2: 'Ten tokens, any brand',
      p: (
        <>
          <code>dark</code>, <code>light</code> or <code>auto</code> built in — or pass a full{' '}
          <code>ThemeColors</code> object and the chart is yours. Custom <code>priceFormat</code> /{' '}
          <code>volumeFormat</code> hooks cover locale and asset quirks.
        </>
      ),
    },
  },
  community: {
    docs: {
      label: "docs — read the source's manual",
      h2: 'Documentation',
      lede: 'Guides for the common paths, TypeDoc for everything else. The playground is the fastest way to poke the engine without installing anything.',
      cards: [
        { k: 'guide', t: 'Quick start', d: 'Install, first chart, live data in five lines — vanilla, React or Vue.' },
        { k: 'guide', t: 'SSR integration', d: 'Next.js and Nuxt recipes — client-only mounting, hydration gotchas.' },
        { k: 'guide', t: 'Performance tuning', d: 'Infinite scroll, maxCandles, gap detection, profiling long frames.' },
        { k: 'guide', t: 'Theming', d: 'Built-in modes, custom ThemeColors, price and volume formatting.' },
        { k: 'guide', t: 'Live data & transports', d: 'DataTransport interface, polling and WebSocket bases, backoff.' },
        { k: 'reference', t: 'API reference', d: 'Full TypeDoc — every class, option and event in the core.' },
        { k: 'reference', t: 'Indicators', d: `Config shapes for all ${INDICATOR_COUNT} built-ins, plus the custom-indicator path.` },
        { k: 'reference', t: 'Drawing tools', d: `${DRAWING_TOOL_COUNT} anchored tools, hit-testing, save/load round-trips.` },
        { k: 'meta', t: 'Changelog', d: 'Every release, no surprises — strict semver from 0.1.0.' },
      ],
    },
    support: {
      label: 'support — keep the candles printing',
      h2: 'Commercial & community support',
      lede: 'openkline is MIT and stays MIT. Need a faster lane? Commercial support gets you priority.',
      order: {
        k: 'commercial support',
        h: 'Integration review & priority features',
        p: 'Exchange adapters, custom indicators, alerts ahead of schedule — send a spec, get an estimate. Paid work lands upstream under MIT, so everyone gets it.',
        btn: 'Request integration review',
      },
      suggest: {
        k: 'community',
        h: 'Ideas & bug reports',
        p: 'Open an issue with a repro or a use case. Proposals that survive review get a milestone — check the M1 design doc for the bar.',
        btn: 'Open an issue ↗',
      },
      donate: {
        k: 'sponsor',
        h: 'Back the project',
        p: 'One-off or recurring — every contribution goes to maintenance: triage, reviews, and keeping the test suite green.',
        wallet: '',
        btn: 'Sponsor on GitHub',
      },
    },
    contacts: {
      label: 'contacts — talk to the maintainer',
      h2: 'Contacts',
      email: { k: 'email', d: 'Feature orders, commercial questions, security reports' },
      github: { k: 'github', d: 'Issues, PRs, discussions — the source of truth' },
      telegram: { k: 'telegram', d: 'Quick questions, integration help' },
    },
  },
  examples: {
    label: 'examples',
    h2: 'Examples',
    lede: 'Every example runs the real openkline engine — live canvas, not screenshots. Pick a topic, read the code, copy and ship.',
    backToGallery: 'All examples',
    docsLink: 'Docs',
    sourceLink: 'Source on GitHub',
    ctaH2: 'Want to experiment?',
    ctaLede: 'Open the playground — tweak symbols, indicators and themes, then copy the config straight into your project.',
    ctaPlayground: 'Open playground',
    ctaDocs: 'Documentation',
    items: [
      { id: 'realtime', title: 'Realtime data', desc: 'O(1) append and updateLast — live ticks without recomputation.' },
      { id: 'indicators', title: 'Indicators', desc: 'Config-driven indicators: SMA, EMA, Bollinger, RSI and more — diffed, not instantiated.' },
      { id: 'drawings', title: 'Drawing tools', desc: 'Trend lines, Fibonacci, channels — anchored to candles, not pixels.' },
      { id: 'state', title: 'State serialization', desc: 'Save the entire chart layout to a URL. Restore with validation and schema migrations.' },
      { id: 'theming', title: 'Theming', desc: 'Dark, light, auto or fully custom ThemeColors. Price and volume format hooks included.' },
      { id: 'react', title: 'React wrapper', desc: 'Thin React binding with full API parity. Same engine, idiomatic props.' },
      { id: 'vue', title: 'Vue wrapper', desc: 'Vue 3 component with full API parity. Same engine, composition API friendly.' },
      { id: 'ssr', title: 'SSR recipes', desc: 'Next.js and Nuxt client-only mounting — no hydration mismatch.' },
    ],
  },
  playground: {
    label: 'playground',
    h2: 'Playground',
    lede: 'Tweak the chart live — pick a symbol, toggle indicators, switch themes. Copy the generated config into your project when you are done.',
    symbol: 'Symbol',
    resolution: 'Resolution',
    chartType: 'Chart type',
    theme: 'Theme',
    indicators: 'Indicators',
    share: 'Share URL',
    reset: 'Reset',
    browseExamples: 'Browse examples',
    readDocs: 'Documentation',
    chartTypes: { candle: 'Candles', line: 'Line', area: 'Area' },
    themes: { dark: 'Dark', light: 'Light' },
  },
};
