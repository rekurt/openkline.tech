import { INDICATOR_COUNT, DRAWING_TOOL_COUNT } from '../content/features.js';

/* 简体中文。结构与 en.jsx 完全一致。 */
export default {
  nav: {
    product: '产品',
    dev: '开发者',
    docs: '文档',
    reference: '参考',
    support: '支持',
    contacts: '联系',
    github: 'GitHub ↗',
    light: '浅色',
    dark: '深色',
    themeTitle: '切换主题',
    menuOpen: '打开菜单',
    menuClose: '关闭菜单',
    menuTag: '菜单 — 选个方向',
  },
  footer: {
    github: 'GitHub',
    playground: 'Playground',
    api: 'API 参考',
    right: '源码即契约',
  },
  product: {
    badges: { agnostic: '框架无关', realtime: '实时' },
    h1: <>不是<em>你的</em>引擎，就不是<em>你的</em>图表。</>,
    lede: (
      <>
        那就拥有它：<code>@rekurt/openkline</code> —— TradingView 级的 OHLCV 图表引擎。开源、MIT、无厂商锁定。
        K线、{INDICATOR_COUNT} 指标、锚定绘图工具与实时传输开箱即用。一个 TypeScript 核心；<code>react</code> 与{' '}
        <code>vue</code> 封装，API 完全对等。
      </>
    ),
    ctaPlayground: '试用 live demo',
    ctaDocs: '文档',
    stats: [
      { k: '单元测试' },
      { k: 'CI 中 lint 警告' },
      { k: '核心体积（gzip）' },
      { k: '内置指标' },
      { k: '许可费用，永久' },
    ],
    live: {
      label: '实时 — 上手引擎',
      h2: '就在这里试试',
      lede: '本站每张图都是真正运行的 openkline canvas 引擎。切换指标、拖动十字光标 —— 无需安装，无需 iframe，不是截图。',
      presetPlain: 'K线 + 成交量',
      presetBb: '布林带',
      presetVwap: '锚定 VWAP',
    },
    s01: {
      label: '01 — 引擎',
      h2: '电池全配',
      lede: '做交易 UI 的团队总在「快但简陋」与「全但收费」之间二选一。openkline 用一个包补齐全部四个缺口。',
    },
    features: [
      {
        h: '一个核心，任意框架',
        p: (
          <>
            纯 TypeScript 核心，内部没有 React 或 Vue。轻薄的 <code>@rekurt/openkline-react</code> 与{' '}
            <code>@rekurt/openkline-vue</code> 封装，API 完全对等。Vanilla、React 18/19 或 Vue 3 ——
            同一引擎，毫无锁定。
          </>
        ),
      },
      {
        h: '为实时而生',
        p: (
          <>
            基于 <code>Float64Array</code> 缓冲区的 Canvas 渲染，O(1) <code>append</code>/<code>updateLast</code>，
            三层画布让十字光标重绘几乎零成本，RAF 合并行情、抖动退避重连、过期响应防护。
            这不是报表图，而是为实时盘口打造的引擎。
          </>
        ),
      },
      {
        h: `${INDICATOR_COUNT} 指标，${DRAWING_TOOL_COUNT} 种绘图工具`,
        p: (
          <>
            主图叠加覆盖从 SMA 到一目均衡表、Supertrend 与锚定 VWAP；副图有 RSI、MACD、随机指标等。
            趋势线、斐波那契、通道 —— 锚定在K线上，缩放不漂移。Heikin-Ashi 是一等公民图表类型。
          </>
        ),
      },
      {
        h: '竞品忽略的体验',
        p: (
          <>
            键盘优先导航、尊重 <code>prefers-reduced-motion</code>、显式的自动跟随状态机，
            整个布局可序列化进一个查询参数。
          </>
        ),
      },
    ],
    kbd: { pan: '平移', zoom: '缩放', jump: '跳转', fit: '适配' },
    s02: {
      label: '02 — 写给开发者',
      h2: '五行代码到第一根K线',
      lede: '指标是配置对象而非类实例 —— 核心负责调和。完整的技术导览与示例在开发者页。',
      btn: '开发者页 →',
    },
    s03: {
      label: '03 — 四难全的缺口',
      h2: '四项全拿',
      lede: '实时性能 + 完整指标 + 绘图工具 + 框架自由。任何替代品都至少让你放弃一项。',
    },
    table: {
      cols: ['openkline', 'Lightweight Charts', 'Highcharts Stock', 'ECharts / Chart.js'],
      rows: [
        { label: '内置指标', cells: [{ cls: 'yes', text: String(INDICATOR_COUNT) }, { cls: 'no', text: '自己实现' }, { cls: 'yes', text: '有' }, { cls: 'part', text: '通用' }] },
        { label: '绘图工具', cells: [{ cls: 'yes', text: `${DRAWING_TOOL_COUNT} 种，锚定` }, { cls: 'no', text: '无' }, { cls: 'yes', text: '有' }, { cls: 'no', text: '无' }] },
        { label: '实时传输', cells: [{ cls: 'yes', text: '内置' }, { cls: 'no', text: '自行接入' }, { cls: 'part', text: '部分' }, { cls: 'no', text: '自行接入' }] },
        { label: '键盘 + 无障碍', cells: [{ cls: 'yes', text: '一等支持' }, { cls: 'no', text: '无' }, { cls: 'part', text: '部分' }, { cls: 'part', text: '部分' }] },
        { label: '许可证', cells: [{ cls: 'yes', text: 'MIT' }, { cls: 'yes', text: 'Apache-2.0' }, { cls: 'no', text: '商业' }, { cls: 'yes', text: 'MIT' }] },
        { label: '框架锁定', cells: [{ cls: 'yes', text: '无' }, { cls: 'yes', text: '无' }, { cls: 'part', text: '厂商 API' }, { cls: 'yes', text: '无' }] },
      ],
    },
    problem: {
      label: '问题',
      h2: '每种图表方案都让你牺牲某样东西',
      lede: '构建交易 UI 的团队总撞上同样四面墙。选任何现有方案——至少丢掉一样重要的东西。',
      cards: [
        { icon: '🔒', h: 'iframe 租金', p: '托管控件按嵌入数收费。数据离开你的基础设施，UX 由别人的路线图决定，账单随你的成功同步增长。' },
        { icon: '🔗', h: '厂商锁定', p: '私有 API 意味着当你超出厂商能力时需要全部重写。迁移花费的是季度，而非冲刺。' },
        { icon: '🪨', h: '裸体开源', p: '免费图表库给你一块画布和一个祈祷。没有指标、没有绘图、没有实时——全都自己造。' },
        { icon: '📊', h: '通用图表库', p: 'ECharts 和 Chart.js 做仪表盘很棒。但 OHLCV K线、锚定绘图和逐笔更新不是它们的活。' },
      ],
      cta: '对比替代方案',
    },
    builtFor: {
      label: '适合谁',
      h2: '谁用 openkline 出货',
      lede: '不是「适合所有人」。而是图表质量决定产品竞争力的团队。',
      segments: [
        { h: '交易平台', pain: '需要实时K线、指标和绘图——不想按席位付许可费。', features: '实时传输、指标、绘图工具、状态序列化。', cta: '查看 live demo', ctaId: 'playground' },
        { h: '金融科技产品团队', pain: '需要通过法务审查的 MIT 图表，不产生厂商依赖。', features: 'MIT 许可、零遥测、完整源码访问、框架封装。', cta: '阅读文档', ctaRoute: 'docs' },
        { h: '量化与分析仪表盘', pain: '需要键盘优先导航、URL 可序列化状态和副图指标。', features: '键盘导航、saveLayoutState、多窗格 RSI/MACD/随机指标、主题 API。', cta: '开发者页', ctaRoute: 'developers' },
        { h: '独立开发者与初创团队', pain: '需要全功能图表，但没有企业预算，也等不了数月的定制开发。', features: '五行代码到第一根K线，零许可费，React + Vue + vanilla。', cta: '快速开始', ctaRoute: 'docs' },
      ],
    },
    pillars: {
      label: '为什么选 openkline',
      h2: '每个说法都有机制背书',
      lede: '不是形容词，而是你能在源码里读到的数据结构、复杂度界限与状态机。',
      items: [
        {
          claim: '实时无妥协',
          proof: <>在 <code>Float64Array</code> 缓冲区上 O(1) <code>append</code>/<code>updateLast</code>，RAF 合并行情，3 层画布让十字光标重绘零成本。</>,
          demo: '试试上方 live demo',
          demoId: 'playground',
          docs: '/docs#live-data',
        },
        {
          claim: `${INDICATOR_COUNT} 指标，配置而非代码`,
          proof: <>传入配置数组——核心做 diff（<code>diffIndicatorConfigs</code>）并调和。引用稳定的数组直接跳过重算。</>,
          demo: '在 demo 中切换指标',
          demoId: 'playground',
          docs: '/docs#indicators',
        },
        {
          claim: `${DRAWING_TOOL_COUNT} 种绘图工具，锚定在K线上`,
          proof: <>趋势线、斐波那契、通道——锚定在缓冲区坐标系，缩放不漂移。命中测试与保存/加载内置。</>,
          demo: null,
          docs: '/docs#drawings',
        },
        {
          claim: '四个方法接入任何数据源',
          proof: <><code>DataTransport</code> 接口带抖动指数退避、版本计数器防过期响应、显式 <code>onError</code>——零静默 catch。</>,
          demo: null,
          docs: '/docs#live-data',
        },
        {
          claim: '一个核心，任意框架',
          proof: <>纯 TypeScript 核心。轻薄的 <code>@rekurt/openkline-react</code> 与 <code>@rekurt/openkline-vue</code> 封装，API 完全对等。毫无锁定。</>,
          demo: null,
          docs: '/docs#quickstart',
        },
        {
          claim: '整张图装进一个 URL',
          proof: <><code>saveLayoutState</code> 把一切序列化为紧凑对象。<code>loadState</code> 校验不可信输入并执行 schema 迁移。</>,
          demo: null,
          docs: '/docs#state',
        },
      ],
    },
    useWhen: {
      label: '何时选什么',
      h2: '诚实指南',
      lede: 'openkline 不适合所有图表。以下是合适与不合适的场景。',
      use: {
        h: '使用 openkline 当',
        items: [
          '需要 OHLCV K线配合指标与绘图',
          '实时逐笔更新很重要（盘口、实盘交易）',
          '想要 MIT 许可，零按席位收费',
          '数据管道留在自己的基础设施——不用托管控件',
          '需要 React、Vue 或 vanilla——同一引擎，你来选',
          '键盘导航和无障碍是刚需',
        ],
      },
      other: {
        h: '使用其他方案当',
        items: [
          '需要饼图、柱状图或通用仪表盘——试试 ECharts 或 Chart.js',
          '想要零配置的托管控件——TradingView 控件可能上线更快',
          '需要 100+ 开箱即用的指标——Highcharts Stock 目录更大',
          '在做静态报表，而非实时交易 UI',
        ],
      },
      footnote: '对比基于 openkline 最新发布时的公开文档。第三方产品的功能和定价可能变化。',
    },
    commercialSupport: {
      label: '支持',
      h2: '需要快速通道？',
      lede: 'openkline 是 MIT，并将一直是 MIT。商业支持享有优先。',
      cta: '申请集成评审',
      features: [
        '交易所适配器开发',
        '自定义指标实现',
        '优先修复 bug 和功能请求',
        '集成架构评审',
      ],
    },
    faq: {
      label: '常见问题',
      h2: '常见问题解答',
      items: [
        { q: 'openkline 可以用于生产环境吗？', a: '核心 API 稳定且经过测试。统计条中的测试数量是 CI 的实时数据。项目遵循严格 semver；破坏性变更仅在主版本中出现。' },
        { q: 'openkline 与 TradingView 有何区别？', a: 'TradingView 是功能丰富的托管平台。openkline 是自托管的开源引擎。你获得对渲染、数据和 UX 的完全控制——但需要自己托管。没有内置数据源或社交功能。' },
        { q: '可以接入自己的数据源吗？', a: '可以。实现 DataTransport 接口（四个方法）即上线。轮询、WebSocket、REST——引擎不关心K线从哪来。' },
        { q: '移动端支持如何？', a: '触摸手势（单指平移、双指捏合）开箱即用。画布自适应且支持 hi-DPI。复杂绘图工具在小屏上可能不太方便——这是 UX 限制，不是 bug。' },
        { q: '有告警和回放模式等计划功能吗？', a: '有——请查看路线图。告警、回放模式、对比模式和工作区已列入计划。尚未发布，我们不会将其展示为已有功能。' },
        { q: '有遥测或追踪吗？', a: '没有。零遥测、零回传、零托管运行时。你的行情数据留在你的应用里。' },
        { q: '可以商用吗？', a: '可以。MIT 许可——在任何项目中使用，商业或非商业，除许可文件外无归属要求。' },
        { q: '如何获取支持？', a: '社区支持通过 GitHub issues。商业支持（优先功能、集成评审、自定义指标）可用——联系维护者。' },
      ],
    },
    finalCta: {
      h2: '掌控你的图表运行时',
      lede: '源码可控、MIT 许可、无 iframe 租金。五行代码到第一根K线。',
      btnDemo: '试用 live demo',
      btnDocs: '文档',
      btnGithub: 'GitHub',
    },
  },
  dev: {
    s01: {
      label: '01 — 快速开始',
      h2: '同一引擎，三种接入',
      lede: '核心是纯 TypeScript —— 封装只添加符合习惯的绑定。换框架不动图表逻辑。',
      parity: 'API 完全对等',
    },
    s02: {
      label: '02 — 开发者为何选 openkline',
      h2: '每个说法都有机制背书',
      lede: '不是形容词，而是你能在源码里读到的数据结构、复杂度界限与状态机。',
    },
    adv: [
      {
        k: '实时路径',
        h: '每个 tick O(1)，不折腾 GC',
        p: (
          <>
            K线存放在 <code>Float64Array</code> 环形缓冲区中。<code>append</code> 与{' '}
            <code>updateLast</code> 为 O(1)；历史通过摊还 O(1) 的 <code>prepend</code> 翻页。
            <code>CandleMerger</code> 按 RAF 合并行情，三层画布意味着移动十字光标永不重绘K线。
          </>
        ),
        metrics: [<><b>O(1)</b> append / updateLast</>, <><b>3</b> 层画布</>, <><b>~0 成本</b> 静态帧</>],
      },
      {
        k: '声明式 API',
        h: '指标是配置，不是类',
        p: (
          <>
            应用代码从不调用 <code>new SMA(20)</code>。传入配置数组，核心做 diff
            （<code>diffIndicatorConfigs</code>）并调和 —— 引用稳定的数组直接跳过重算。
            同一批对象可经 <code>saveLayoutState</code> 往返。
          </>
        ),
        metrics: [<><b>{INDICATOR_COUNT}</b> 指标类型</>, <><b>0</b> 手动实例</>, <><b>每次渲染</b> diff</>],
      },
      {
        k: '传输层',
        h: '四个方法接入任何数据源',
        p: (
          <>
            实现 <code>DataTransport</code> 即上线。<code>DataFeed</code> 用版本计数器防御过期响应 ——
            请求中途切换交易对不会渲染错误数据。重连采用带抖动的指数退避。
            错误一律流经 <code>onError</code>，绝不静默吞掉。
          </>
        ),
        metrics: [<><b>4</b> 个待实现方法</>, <><b>内置</b>抖动退避</>, <><b>0</b> 静默 catch</>],
      },
      {
        k: '状态',
        h: '整张图装进一个 URL',
        p: (
          <>
            <code>saveLayoutState()</code> 把交易对、周期、图表类型、主题、指标与绘图序列化为紧凑对象。
            <code>loadState</code> 校验不可信输入并执行 schema 迁移，旧链接升级后依然可用。
            绘图锚定在缓冲区坐标系 —— 平移缩放都贴着K线。
          </>
        ),
        metrics: [<><b>1</b> 个查询参数</>, <><b>可迁移</b> schema</>, <><b>已校验</b>的输入</>],
      },
    ],
    s03: { label: '03 — 架构', h2: '三个子系统，没有魔法' },
    arch: [
      {
        h: '渲染',
        items: [
          <>Hi-DPI 画布，三层分离：图表 / UI / 交互</>,
          <>脏标记 + RAF —— 静态图每帧 ~0 成本</>,
          <>亚像素 <code>fitAll</code>，逐列合并</>,
          <>多窗格：副图指标自动分配高度与独立 Y 轴</>,
          <>K线、折线、面积、OHLC 柱，一等 Heikin-Ashi</>,
        ],
      },
      {
        h: '数据层',
        items: [
          <><code>CandleBuffer</code> —— <code>Float64Array</code>，O(1) append，摊还 O(1) prepend</>,
          <><code>CandleMerger</code> —— RAF 合并行情</>,
          <><code>DataFeed</code> —— 版本计数器防过期响应</>,
          <><code>ExponentialBackoff</code> —— 抖动重连</>,
          <><code>validateCandles</code> —— 运行时不变量校验</>,
        ],
      },
      {
        h: '交互',
        items: [
          <><code>KeyboardController</code> —— 完整键盘导航</>,
          <><code>autoFollow</code> 状态机 —— 跟踪最新K线</>,
          <>尊重 <code>prefers-reduced-motion</code> 的惯性平移</>,
          <>区分触控板的滚轮：横向平移，纵向缩放</>,
          <>触屏：单指平移，双指捏合</>,
        ],
      },
    ],
    s04: {
      label: '04 — 开箱有什么',
      h2: '指标与绘图工具',
      overlay: '主图叠加',
      subpane: '副图 — 独立 Y 轴',
      drawings: '绘图 — 锚定缓冲区坐标，缩放不漂移',
      custom: <>+ 继承 <code>Drawing</code> 自定义</>,
    },
    s05: {
      label: '05 — 键盘优先',
      h2: '双手不离键盘',
      lede: '不碰鼠标也能完全控制图表 —— 这是支柱，不是事后补丁。',
    },
    keymap: [
      '左右平移',
      '放大 / 缩小（也可 + / -）',
      '跳到最旧 / 最新K线',
      '重置缩放',
      '适配全部可见数据',
      '启用趋势线 / 水平线工具',
      '取消当前工具或绘图',
      '适配可见区间',
    ],
    s06: {
      label: '06 — 主题',
      h2: '十个令牌，任何品牌',
      p: (
        <>
          内置 <code>dark</code>、<code>light</code> 或 <code>auto</code> —— 或传入完整{' '}
          <code>ThemeColors</code>，图表就是你的。自定义 <code>priceFormat</code> /{' '}
          <code>volumeFormat</code> 钩子覆盖本地化与资产差异。
        </>
      ),
    },
  },
  community: {
    docs: {
      label: 'docs — 阅读源码的说明书',
      h2: '文档',
      lede: '常见路径有指南，其余一切有 TypeDoc。Playground 是不装任何东西就能把玩引擎的最快方式。',
      cards: [
        { k: '指南', t: '快速开始', d: '安装、第一张图、五行接入实时数据 —— vanilla、React 或 Vue。' },
        { k: '指南', t: 'SSR 集成', d: 'Next.js 与 Nuxt 配方 —— 仅客户端挂载、水合陷阱。' },
        { k: '指南', t: '性能调优', d: '无限滚动、maxCandles、缺口检测、长帧剖析。' },
        { k: '指南', t: '主题', d: '内置模式、自定义 ThemeColors、价格与成交量格式化。' },
        { k: '指南', t: '实时数据与传输', d: 'DataTransport 接口、轮询与 WebSocket 基类、退避。' },
        { k: '参考', t: 'API 参考', d: '完整 TypeDoc —— 核心的每个类、选项与事件。' },
        { k: '参考', t: '指标', d: `全部 ${INDICATOR_COUNT} 内置指标的配置形态，以及自定义指标之路。` },
        { k: '参考', t: '绘图工具', d: `${DRAWING_TOOL_COUNT} 种锚定工具、命中测试、保存/加载往返。` },
        { k: '杂项', t: '更新日志', d: '每个版本零惊喜 —— 自 0.1.0 起严格 semver。' },
      ],
    },
    support: {
      label: 'support — 让K线继续打印',
      h2: '商业与社区支持',
      lede: 'openkline 是 MIT，并将一直是 MIT。需要快速通道？商业支持享有优先。',
      order: {
        k: '商业支持',
        h: '集成评审与优先功能',
        p: '交易所适配器、自定义指标、提前交付的告警 —— 发来规格说明，拿到报价。付费工作以 MIT 进上游，所有人受益。',
        btn: '申请集成评审',
      },
      suggest: {
        k: '社区',
        h: '想法与缺陷报告',
        p: '带复现或场景开 issue。通过评审的提案会获得里程碑 —— 标准见 M1 设计文档。',
        btn: '打开 issue ↗',
      },
      donate: {
        k: '赞助',
        h: '支持项目',
        p: '一次性或定期 —— 每笔贡献都用于维护：分诊、评审、让测试保持绿色。',
        wallet: '',
        btn: '在 GitHub 上赞助',
      },
    },
    contacts: {
      label: 'contacts — 找维护者聊聊',
      h2: '联系方式',
      email: { k: '邮箱', d: '功能定制、商务合作、安全报告' },
      github: { k: 'github', d: 'Issues、PR、讨论 —— 唯一事实来源' },
      telegram: { k: '电报', d: '快速提问、集成协助' },
    },
  },
  examples: {
    label: '示例',
    h2: '示例',
    lede: '每个示例都运行真正的 openkline 引擎 —— 实时 canvas，不是截图。选择主题、阅读代码、复制并发布。',
    backToGallery: '所有示例',
    docsLink: '文档',
    sourceLink: 'GitHub 源码',
    ctaH2: '想要实验？',
    ctaLede: '打开 Playground —— 调整交易对、指标和主题，然后将配置直接复制到你的项目中。',
    ctaPlayground: '打开 Playground',
    ctaDocs: '文档',
    items: [
      { id: 'realtime', title: '实时数据', desc: 'O(1) append 和 updateLast —— 实时 tick 无需重新计算。' },
      { id: 'indicators', title: '指标', desc: '配置驱动的指标：SMA、EMA、布林带、RSI 等 —— diff 对比，非实例化。' },
      { id: 'drawings', title: '绘图工具', desc: '趋势线、斐波那契、通道 —— 锚定在K线上，而非像素。' },
      { id: 'state', title: '状态序列化', desc: '将整个图表布局保存到 URL。支持验证和 schema 迁移的恢复。' },
      { id: 'theming', title: '主题', desc: '深色、浅色、自动或完全自定义 ThemeColors。包含价格和成交量格式化钩子。' },
      { id: 'react', title: 'React 封装', desc: '轻量 React 绑定，完整 API 对等。相同引擎，地道的 props。' },
      { id: 'vue', title: 'Vue 封装', desc: 'Vue 3 组件，完整 API 对等。相同引擎，组合式 API 友好。' },
      { id: 'ssr', title: 'SSR 方案', desc: 'Next.js 和 Nuxt 仅客户端挂载 —— 无水合不匹配。' },
    ],
  },
  playground: {
    label: 'playground',
    h2: 'Playground',
    lede: '实时调整图表 —— 选择交易对、切换指标、更换主题。准备好后，将生成的配置复制到你的项目中。',
    symbol: '交易对',
    resolution: '时间周期',
    chartType: '图表类型',
    theme: '主题',
    indicators: '指标',
    share: '分享链接',
    reset: '重置',
    browseExamples: '浏览示例',
    readDocs: '文档',
    chartTypes: { candle: 'K线', line: '折线', area: '面积' },
    themes: { dark: '深色', light: '浅色' },
  },
  roadmap: {
    label: '路线图',
    h1: '路线图',
    lede: 'openkline 图表引擎的功能状态。已有功能已发布并记录文档。计划功能在规划中但尚未实现。',
    disclaimer: '无时间表或资源估算。计划功能在准备就绪后发布。',
    statusLabels: {
      available: '可用',
      experimental: '实验性',
      planned: '计划中',
      sponsored: '赞助',
    },
    sections: {
      available: {
        h2: '现已可用',
        lede: '已发布、已记录、已测试。立即使用。',
      },
      experimental: {
        h2: '实验性',
        lede: '可以使用，但 API 可能在次版本间变更。欢迎反馈。',
      },
      planned: {
        h2: '计划中',
        lede: '在路线图中。尚未实现——无在线 CTA，无时间表。',
      },
      sponsored: {
        h2: '赞助',
        lede: '可供赞助。资助某个功能，它将以 MIT 许可进入上游——所有人受益。',
      },
    },
    docsLink: '文档',
    exampleLink: '示例',
    sponsorCta: '赞助此功能',
    designDocs: {
      h2: '设计文档',
      lede: '每个更改公共 API 的计划功能在实现前都需要设计文档。',
      required: ['alerts', 'replay-mode', 'compare-mode', 'workspaces', 'exchange-adapters', 'custom-indicators', 'export'],
      note: '设计文档位于 docs/design/<feature-id>.md，遵循标准模板。',
    },
    ctaH2: '试用现有功能',
    ctaLede: 'Playground 运行的是真正的引擎——体验已发布的功能。',
    ctaPlayground: '打开 Playground',
    ctaDocs: '文档',
  },
  benchmarks: {
    label: '基准测试',
    h1: '基准测试',
    lede: 'openkline OHLCV 图表引擎的实测性能。每个数字来自真实浏览器运行——无合成估算。',
    emptyState: '基准测试套件正在接入 CI。尚无已发布的数据。',
    emptySub: '当测试工具就绪后，结果将自动出现在此——附带环境元数据、commit SHA 和运行日期。',
    staleWarning: '这些结果已超过 90 天，可能不反映当前性能。',
    s01Label: '01 — 测量内容',
    s01H2: '操作',
    s01Lede: '每个操作在预热后独立测量。每次运行记录延迟百分位数（p50 / p95 / p99）和内存增量。',
    s02Label: '02 — 数据集规模',
    s02H2: '数据集',
    s03Label: '03 — 最新结果',
    s03H2: '最新运行',
    s04Label: '04 — 方法论',
    s04H2: '方法论',
    s04Lede: '我们如何测量——不走捷径，不造假数据。',
    methWarmup: '每次测量前进行预热，以消除 JIT 方差。',
    methIsolation: '每个操作独立运行——测量间无共享状态。',
    methPercentiles: '延迟记录为 p50、p95、p99、mean、min、max（毫秒）。',
    methEnv: '环境元数据（浏览器、操作系统、设备、包版本、commit SHA）附加到每次运行。',
    methReproducible: '测试工具将发布在引擎仓库中——任何人都可以在本地复现。',
    s05Label: '05 — 原始数据',
    s05H2: '原始 JSON',
    s05Lede: '完整的基准测试负载，未格式化。可用于您自己的分析或 CI 集成。',
    rawToggle: '显示原始 JSON',
    s06Label: '06 — 历史',
    s06H2: '历史运行',
    s06HasData: '用于趋势比较的历史基准测试运行。',
    s06Empty: '尚无历史运行。随着 CI 工具发布结果，历史数据将逐步积累。',
    envBrowser: '浏览器',
    envOs: '操作系统',
    envDevice: '设备',
    envVersion: '包版本',
    envCommit: '提交',
    envDate: '日期',
    colOperation: '操作',
    colMemory: '内存',
    ctaH2: '亲自体验引擎',
    ctaLede: '数字只是故事的一部分。Playground 让您亲身感受性能。',
    ctaPlayground: '打开 Playground',
    ctaDocs: '文档',
  },
  support: {
    label: '支持',
    h1: '支持',
    lede: 'openkline 是 MIT，并将一直是 MIT。无论您需要商业优先还是社区帮助——以下是联系方式。',
    commercial: {
      h2: '商业支持',
      lede: '优先修复缺陷、交易所适配器、自定义指标和架构评审。付费工作以 MIT 进上游——所有人受益。',
      features: [
        '交易所适配器开发',
        '自定义指标实现',
        '优先缺陷修复和功能请求',
        '集成架构评审',
      ],
      cta: '申请集成评审',
    },
    community: {
      h2: '社区',
      lede: '带复现或场景开 issue。通过评审的提案会获得里程碑。',
      github: '在 GitHub 上打开 issue',
      telegram: '在 Telegram 中快速提问',
    },
    security: {
      h2: '安全',
      lede: '发现漏洞？请私下报告。',
      email: '邮件联系维护者',
      pgp: 'PGP 密钥可应要求提供。',
      promises: [
        '零遥测——无分析、无回拨、无托管运行时。',
        '您的市场数据留在您的应用中——openkline 永远看不到。',
        '引擎不加载任何第三方脚本。',
      ],
    },
    contact: {
      h2: '联系方式',
      email: { k: '邮箱', d: '功能定制、商务合作、安全报告' },
      github: { k: 'github', d: 'Issues、PR、讨论——唯一事实来源' },
      telegram: { k: '电报', d: '快速提问、集成协助' },
    },
    donate: {
      h2: '赞助项目',
      lede: '一次性或定期——每笔贡献都用于维护：分诊、评审、让测试保持绿色。',
      cta: '在 GitHub 上赞助',
    },
    ctaH2: '准备好集成了吗？',
    ctaLede: 'Playground 运行的是真正的引擎。试用后将配置复制到您的项目中。',
    ctaPlayground: '打开 Playground',
    ctaDocs: '文档',
  },
};
