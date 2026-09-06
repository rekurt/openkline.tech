import { INDICATOR_COUNT, DRAWING_TOOL_COUNT } from '../content/features.js';

/* sn locale — mirrors en until the owner confirms which language "sn" represents.
   See plan §17: do not replace with en without explicit owner decision. */
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
    right: 'TypeScript charting · MIT',
  },
  product: {
    badges: { agnostic: 'framework-agnostic', realtime: 'realtime' },
    h1: <><em>OHLCV charts</em> for trading applications.</>,
    lede: (
      <>
        <code>@rekurt/openkline-core</code> renders market data in your application under the MIT license.
        Add candlesticks, {INDICATOR_COUNT} indicators, drawing tools, and your own data feed.
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
      { k: 'license fees under MIT' },
    ],
    live: {
      label: 'interactive demo',
      h2: 'Try it right here',
      lede: 'Try the canvas engine in your browser: switch indicators, pan, zoom, and inspect candle values.',
      presetPlain: 'Candles + volume',
      presetBb: 'Bollinger Bands',
      presetVwap: 'Anchored VWAP',
    },
    s01: {
      label: '01 — the engine',
      h2: 'Candles, indicators, and drawing tools',
      lede: 'Use the TypeScript core directly or add React and Vue bindings. Connect historical candles and streaming updates through your own data source.',
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
            stale-response protection. Connect these components to your candle feed.
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
        h: 'Keyboard navigation and saved layouts',
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
      h2: 'Create your first chart',
      lede: 'Indicators are config objects, not class instances — the core reconciles them. The full technical tour with examples lives on the Developers page.',
      btn: 'Developers page →',
    },
    s03: {
      label: '03 — integration',
      h2: 'Choose an integration',
      lede: 'The core handles chart rendering and interaction. Framework bindings connect it to your component lifecycle; your application provides market data.',
    },
    table: {
      cols: ["TypeScript core","React","Vue","Your application"],
      rows: [
        { label: "Indicators", cells: [{ cls: 'yes', text: "Built in" }, { cls: 'yes', text: "Core API" }, { cls: 'yes', text: "Core API" }, { cls: 'yes', text: "Choose configurations" }] },
        { label: "Drawing tools", cells: [{ cls: 'yes', text: "Candle-anchored" }, { cls: 'yes', text: "Core API" }, { cls: 'yes', text: "Core API" }, { cls: 'yes', text: "Save drawings" }] },
        { label: "Market data", cells: [{ cls: 'yes', text: "Transport interface" }, { cls: 'yes', text: "Core API" }, { cls: 'yes', text: "Core API" }, { cls: 'yes', text: "Connect a provider" }] },
        { label: "Chart navigation", cells: [{ cls: 'yes', text: "Keyboard and pointer" }, { cls: 'yes', text: "Core API" }, { cls: 'yes', text: "Core API" }, { cls: 'yes', text: "Configure controls" }] },
        { label: "License", cells: [{ cls: 'yes', text: "MIT" }, { cls: 'yes', text: "MIT" }, { cls: 'yes', text: "MIT" }, { cls: 'yes', text: "Review license terms" }] },
        { label: "Integration", cells: [{ cls: 'yes', text: "Direct API" }, { cls: 'yes', text: "React bindings" }, { cls: 'yes', text: "Vue bindings" }, { cls: 'yes', text: "Mount and dispose" }] },
      ],
    },
    problem: {
      label: 'the problem',
      h2: 'Plan the chart integration',
      lede: 'Start with four decisions: data access, framework, analysis tools, and chart state.',
      cards: [
        { icon: '🔒', h: 'Market data', p: 'Connect your historical candles and updates. Data access and provider credentials stay under application control.' },
        { icon: '🔗', h: 'Framework bindings', p: 'Use the TypeScript core directly, or mount the same engine through React and Vue components.' },
        { icon: '🪨', h: 'Analysis tools', p: 'Configure indicators and candle-anchored drawings through the chart API.' },
        { icon: '📊', h: 'Saved layouts', p: 'Save chart settings and drawings, then restore them when the user returns.' },
      ],
      cta: 'Compare integrations',
    },
    builtFor: {
      label: 'built for',
      h2: 'Where to use openkline',
      lede: 'Trading interfaces, market dashboards, and prototypes that need programmable OHLCV charts.',
      segments: [
        { h: 'Trading platforms', pain: 'Need realtime candles, indicators and drawings — without paying per-seat license fees.', features: 'Realtime transports, indicators, drawing tools, state serialization.', cta: 'See live demo', ctaId: 'playground' },
        { h: 'Fintech product teams', pain: 'Need source access to review, customize, and distribute the chart with your product.', features: 'MIT license, no telemetry, full source access, framework wrappers.', cta: 'Read the docs', ctaRoute: 'docs' },
        { h: 'Quant & analytics dashboards', pain: 'Need keyboard-first navigation, URL-serializable state, and sub-pane indicators.', features: 'Keyboard nav, saveLayoutState, multi-pane RSI/MACD/Stochastic, theming API.', cta: 'Developers page', ctaRoute: 'developers' },
        { h: 'Indie devs & startups', pain: 'Need to prototype with candles and indicators in an existing React, Vue, or TypeScript app.', features: 'Create your first chart, zero license fees, React + Vue + vanilla.', cta: 'Quick start', ctaRoute: 'docs' },
      ],
    },
    pillars: {
      label: 'why openkline',
      h2: 'Rendering, data, and state',
      lede: 'The engine separates candle storage, rendering, data transport, and user interaction.',
      items: [
        {
          claim: 'Incremental candle updates',
          proof: <>O(1) <code>append</code>/<code>updateLast</code> on <code>Float64Array</code> buffers, RAF-coalesced ticks, 3-layer canvas for separate crosshair redraws.</>,
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
          claim: 'Save and restore chart layouts',
          proof: <><code>saveLayoutState</code> serializes chart settings and drawings. <code>loadState</code> validates untrusted input and runs schema migrations.</>,
          demo: null,
          docs: '/docs#state',
        },
      ],
    },
    useWhen: {
      label: 'when to use what',
      h2: 'Integration requirements',
      lede: 'Check the chart types, data connection, and interaction tools against your application requirements.',
      use: {
        h: 'Use openkline when',
        items: [
          'You need OHLCV candles with indicators and drawings',
          'You need to append candles and update the latest candle',
          'You want MIT licensing with no per-seat fees',
          'Your data pipeline stays in your infra — no hosted widgets',
          'You need React, Vue, or vanilla — same engine, your choice',
          'Keyboard navigation and accessibility are requirements',
        ],
      },
      other: {
        h: 'Use something else when',
        items: [
          'Your primary requirement is pie charts or general dashboard charts',
          'You need a hosted widget with a bundled market data feed',
          'You need indicators that are outside the current catalog',
          'You\'re building a static report, not a live trading UI',
        ],
      },
      footnote: 'Review the API reference and examples for the version you plan to integrate.',
    },
    commercialSupport: {
      label: 'support',
      h2: 'Integration support',
      lede: 'Contact the maintainer to discuss adapter development, custom indicators, or an integration review.',
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
        { q: 'Is openkline production-ready?', a: 'Evaluate the version you plan to use with your data volume, target devices, and error handling. The API reference, tests, and changelog describe the current implementation.' },
        { q: 'How does openkline compare to TradingView?', a: 'openkline is a charting library that runs inside your application. You provide market data, hosting, and the surrounding product interface. The source is available under MIT.' },
        { q: 'Can I use openkline with my own data source?', a: 'Yes. Implement the DataTransport interface (four methods) and you\'re live. Polling, WebSocket, REST — the engine doesn\'t care where the candles come from.' },
        { q: 'What about mobile support?', a: 'Touch gestures (one-finger pan, two-finger pinch) work out of the box. The canvas is responsive and handles hi-DPI displays. Complex drawing tools may be harder to use on small screens — that\'s a UX constraint, not a bug.' },
        { q: 'Are there planned features like alerts and replay mode?', a: 'Check the roadmap and API reference for the version you are using. Feature availability can differ between the engine package and this site.' },
        { q: 'Is there telemetry or tracking?', a: 'The engine does not send telemetry. Your application chooses market data sources and controls network requests.' },
        { q: 'Can I use it commercially?', a: 'Yes. MIT license — use it in any project, commercial or not, with no attribution requirement beyond the license file.' },
        { q: 'How do I get support?', a: 'Community support via GitHub issues. Commercial support (priority features, integration reviews, custom indicators) is available — email the maintainer.' },
      ],
    },
    finalCta: {
      h2: 'Try openkline with your data',
      lede: 'Explore the demo, then follow the TypeScript, React, or Vue integration guide.',
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
      h2: 'Rendering, data, and state',
      lede: 'The engine separates candle storage, rendering, data transport, and user interaction.',
    },
    adv: [
      {
        k: 'realtime path',
        h: 'Incremental candle storage',
        p: (
          <>
            Candles live in a <code>Float64Array</code>-backed ring buffer. <code>append</code> and{' '}
            <code>updateLast</code> are O(1); history pages in via amortized-O(1) <code>prepend</code>.
            Ticks are RAF-coalesced by <code>CandleMerger</code>, and a three-layer canvas means a crosshair
            move never repaints the candles.
          </>
        ),
        metrics: [<><b>O(1)</b> append / updateLast</>, <><b>3</b> canvas layers</>, <><b>dirty-flag</b> rendering</>],
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
        h: 'Save and restore chart layouts',
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
    s03: { label: '03 — architecture', h2: 'Rendering, data, and interaction' },
    arch: [
      {
        h: 'Rendering',
        items: [
          <>Hi-DPI canvas, three-layer split: chart / UI / interaction</>,
          <>Dirty-flag RAF schedules redraws when chart state changes</>,
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
      h2: 'Navigate with the keyboard',
      lede: 'Pan, zoom, fit the visible range, and select drawing tools using keyboard shortcuts.',
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
      h2: 'Configure colors and number formats',
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
      label: "documentation",
      h2: 'Documentation',
      lede: 'Start with the integration guides. Use TypeDoc for API details and the playground to inspect chart behavior.',
      cards: [
        { k: 'guide', t: 'Quick start', d: 'Install, first chart, live data in five lines — vanilla, React or Vue.' },
        { k: 'guide', t: 'SSR integration', d: 'Next.js and Nuxt recipes — client-only mounting, hydration gotchas.' },
        { k: 'guide', t: 'Performance tuning', d: 'Infinite scroll, maxCandles, gap detection, profiling long frames.' },
        { k: 'guide', t: 'Theming', d: 'Built-in modes, custom ThemeColors, price and volume formatting.' },
        { k: 'guide', t: 'Live data & transports', d: 'DataTransport interface, polling and WebSocket bases, backoff.' },
        { k: 'reference', t: 'API reference', d: 'Full TypeDoc — every class, option and event in the core.' },
        { k: 'reference', t: 'Indicators', d: `Config shapes for all ${INDICATOR_COUNT} built-ins, plus the custom-indicator path.` },
        { k: 'reference', t: 'Drawing tools', d: `${DRAWING_TOOL_COUNT} anchored tools, hit-testing, save/load round-trips.` },
        { k: 'meta', t: 'Changelog', d: 'Version history and API changes.' },
      ],
    },
    support: {
      label: 'support',
      h2: 'Commercial & community support',
      lede: 'Report bugs and propose changes on GitHub. For integration work, contact the maintainer to discuss scope and availability.',
      order: {
        k: 'commercial support',
        h: 'Integration review & priority features',
        p: 'Describe the adapter, indicator, or integration you need. Contact the maintainer to discuss scope and availability.',
        btn: 'Request integration review',
      },
      suggest: {
        k: 'community',
        h: 'Ideas & bug reports',
        p: 'Open an issue with reproduction steps or describe the workflow your feature would support.',
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
    lede: 'Explore working chart examples with source code for data feeds, indicators, drawings, and framework integration.',
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
  roadmap: {
    label: 'roadmap',
    h1: 'Roadmap',
    lede: 'Feature status of the openkline charting engine. Available features are shipped and documented. Planned features are on the radar but not yet implemented.',
    disclaimer: 'No timelines or resource estimates. Planned features ship when they are ready.',
    statusLabels: {
      available: 'Available',
      experimental: 'Experimental',
      planned: 'Planned',
      sponsored: 'Sponsored',
    },
    sections: {
      available: {
        h2: 'Available now',
        lede: 'Shipped, documented and tested. Use these today.',
      },
      experimental: {
        h2: 'Experimental',
        lede: 'Usable but the API may change between minor versions. Feedback welcome.',
      },
      planned: {
        h2: 'Planned',
        lede: 'On the roadmap. Not yet implemented — no live CTA, no timelines.',
      },
      sponsored: {
        h2: 'Sponsored',
        lede: 'Available for sponsorship. Fund a feature and it ships upstream under MIT — everyone gets it.',
      },
    },
    docsLink: 'Docs',
    exampleLink: 'Example',
    sponsorCta: 'Sponsor this feature',
    designDocs: {
      h2: 'Design docs',
      lede: 'Every planned feature that changes the public API requires a design doc before implementation begins.',
      required: ['alerts', 'replay-mode', 'compare-mode', 'workspaces', 'exchange-adapters', 'custom-indicators', 'export'],
      note: 'Design docs live in docs/design/<feature-id>.md and follow a standard template.',
    },
    ctaH2: 'Try what is available today',
    ctaLede: 'The playground runs the real engine — poke the features that are already shipped.',
    ctaPlayground: 'Open playground',
    ctaDocs: 'Documentation',
  },
  benchmarks: {
    label: 'benchmarks',
    h1: 'Benchmarks',
    lede: 'Measured performance of the openkline OHLCV charting engine. Every number comes from a real browser run — no synthetic estimates.',
    emptyState: 'Benchmark suite is being wired to CI. No published numbers yet.',
    emptySub: 'When the harness lands, results will appear here automatically — with environment metadata, commit SHA and run date.',
    staleWarning: 'These results are older than 90 days and may not reflect current performance.',
    s01Label: '01 — what is measured',
    s01H2: 'Operations',
    s01Lede: 'Each operation is measured in isolation after a warm-up pass. Latency percentiles (p50 / p95 / p99) and memory deltas are recorded per run.',
    s02Label: '02 — dataset sizes',
    s02H2: 'Datasets',
    s03Label: '03 — latest results',
    s03H2: 'Latest run',
    s04Label: '04 — methodology',
    s04H2: 'Methodology',
    s04Lede: 'Measurement setup, environment details, and recorded metrics.',
    methWarmup: 'Warm-up pass before every measurement to eliminate JIT variance.',
    methIsolation: 'Each operation runs in isolation — no shared state between measurements.',
    methPercentiles: 'Latency recorded as p50, p95, p99, mean, min, max (milliseconds).',
    methEnv: 'Environment metadata (browser, OS, device, package version, commit SHA) attached to every run.',
    methReproducible: 'Harness will be published in the engine repo — anyone can reproduce locally.',
    s05Label: '05 — raw data',
    s05H2: 'Raw JSON',
    s05Lede: 'The full benchmark payload, unformatted. Use it for your own analysis or CI integration.',
    rawToggle: 'Show raw JSON',
    s06Label: '06 — history',
    s06H2: 'Historical runs',
    s06HasData: 'Previous benchmark runs for trend comparison.',
    s06Empty: 'No historical runs yet. History will build up as the CI harness publishes results.',
    envBrowser: 'Browser',
    envOs: 'OS',
    envDevice: 'Device',
    envVersion: 'Package',
    envCommit: 'Commit',
    envDate: 'Date',
    colOperation: 'Operation',
    colMemory: 'Memory',
    ctaH2: 'See the engine in action',
    ctaLede: 'Test panning, zooming, and indicator changes in the playground.',
    ctaPlayground: 'Open playground',
    ctaDocs: 'Documentation',
  },
  support: {
    label: 'support',
    h1: 'Support',
    lede: 'Report a bug on GitHub or contact the maintainer about integration work.',
    commercial: {
      h2: 'Commercial support',
      lede: 'Discuss exchange adapters, custom indicators, bug fixes, and architecture reviews with the maintainer.',
      features: [
        'Exchange adapter development',
        'Custom indicator implementation',
        'Priority bug fixes and feature requests',
        'Architecture review for your integration',
      ],
      cta: 'Request integration review',
    },
    community: {
      h2: 'Community',
      lede: 'Open an issue with reproduction steps or a description of your use case.',
      github: 'Open an issue on GitHub',
      telegram: 'Quick questions in Telegram',
    },
    security: {
      h2: 'Security',
      lede: 'Found a vulnerability? Report it privately.',
      email: 'Email the maintainer',
      pgp: 'PGP key available on request.',
      promises: [
        'Zero telemetry — no analytics, no phone-home, no hosted runtime.',
        'Your market data stays in your app — openkline never sees it.',
        'No third-party scripts loaded by the engine.',
      ],
    },
    contact: {
      h2: 'Contact',
      email: { k: 'email', d: 'Feature orders, commercial questions, security reports' },
      github: { k: 'github', d: 'Issues, PRs, discussions — the source of truth' },
      telegram: { k: 'telegram', d: 'Quick questions, integration help' },
    },
    donate: {
      h2: 'Sponsor the project',
      lede: 'One-off or recurring — every contribution goes to maintenance: triage, reviews, and keeping the test suite green.',
      cta: 'Sponsor on GitHub',
    },
    ctaH2: 'Ready to integrate?',
    ctaLede: 'The playground runs the real engine. Try it, then copy the config into your project.',
    ctaPlayground: 'Open playground',
    ctaDocs: 'Documentation',
  },
};
