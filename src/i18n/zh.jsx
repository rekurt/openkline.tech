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
    menuTag: '导航',
  },
  footer: {
    github: 'GitHub',
    playground: 'Playground',
    api: 'API 参考',
    right: 'TypeScript 图表 · MIT',
  },
  product: {
    badges: { agnostic: '框架无关', realtime: '实时' },
    h1: <>为交易应用提供 <em>OHLCV 图表</em>。</>,
    lede: (
      <>
        <code>@rekurt/openkline-core</code> 在你的应用中渲染行情数据，采用 MIT 许可证。
        接入自己的数据源，添加 K 线、{INDICATOR_COUNT} 个指标和绘图工具。一个 TypeScript 核心；<code>react</code> 与{' '}
        <code>vue</code> 封装，API 完全对等。
      </>
    ),
    ctaPlayground: '打开演示',
    ctaDocs: '文档',
    stats: [
      { k: '单元测试' },
      { k: 'CI 中 lint 警告' },
      { k: '核心体积（gzip）' },
      { k: '内置指标' },
      { k: 'MIT 许可费用' },
    ],
    live: {
      label: '实时 — 上手引擎',
      h2: '就在这里试试',
      lede: '在浏览器中试用 Canvas 引擎：切换指标、平移缩放，并查看 K 线数值。',
      presetPlain: 'K线 + 成交量',
      presetBb: '布林带',
      presetVwap: '锚定 VWAP',
    },
    s01: {
      label: '01 — 引擎',
      h2: 'K 线、指标与绘图工具',
      lede: '直接使用 TypeScript 核心，或接入 React、Vue 封装。历史 K 线和实时更新由你选择的数据源提供。',
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
            三层画布分别处理图表与十字光标重绘，RAF 合并行情、抖动退避重连、过期响应防护。
            将这些组件连接到自己的 K 线数据流。
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
        h: '键盘操作与布局保存',
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
      h2: '创建第一张 K 线图',
      lede: '指标是配置对象而非类实例 —— 核心负责调和。完整的技术导览与示例在开发者页。',
      btn: '开发者页 →',
    },
    s03: {
      label: '03 — 接入方式',
      h2: '选择接入方式',
      lede: '核心负责渲染和交互，框架封装负责组件生命周期；行情数据由你的应用提供。',
    },
    table: {
      cols: ["TypeScript 核心","React","Vue","你的应用"],
      rows: [
        { label: "指标", cells: [{ cls: 'yes', text: "内置" }, { cls: 'yes', text: "核心 API" }, { cls: 'yes', text: "核心 API" }, { cls: 'yes', text: "选择配置" }] },
        { label: "绘图工具", cells: [{ cls: 'yes', text: "绑定 K 线坐标" }, { cls: 'yes', text: "核心 API" }, { cls: 'yes', text: "核心 API" }, { cls: 'yes', text: "保存绘图" }] },
        { label: "行情数据", cells: [{ cls: 'yes', text: "传输接口" }, { cls: 'yes', text: "核心 API" }, { cls: 'yes', text: "核心 API" }, { cls: 'yes', text: "连接数据供应商" }] },
        { label: "图表导航", cells: [{ cls: 'yes', text: "键盘与指针" }, { cls: 'yes', text: "核心 API" }, { cls: 'yes', text: "核心 API" }, { cls: 'yes', text: "配置操作" }] },
        { label: "许可证", cells: [{ cls: 'yes', text: "MIT" }, { cls: 'yes', text: "MIT" }, { cls: 'yes', text: "MIT" }, { cls: 'yes', text: "查看许可条款" }] },
        { label: "集成", cells: [{ cls: 'yes', text: "直接调用 API" }, { cls: 'yes', text: "React 绑定" }, { cls: 'yes', text: "Vue 绑定" }, { cls: 'yes', text: "挂载与销毁" }] },
      ],
    },
    problem: {
      label: '问题',
      h2: '规划图表集成',
      lede: '先确定四项需求：数据访问、前端框架、分析工具和图表状态保存。',
      cards: [
        { icon: '🔒', h: '行情数据', p: '接入历史 K 线和实时更新。应用负责数据访问及供应商凭证管理。' },
        { icon: '🔗', h: '框架绑定', p: '直接使用 TypeScript 核心，或通过 React、Vue 组件挂载同一个引擎。' },
        { icon: '🪨', h: '分析工具', p: '通过图表 API 配置指标，以及与 K 线坐标绑定的绘图对象。' },
        { icon: '📊', h: '布局保存', p: '保存图表设置和绘图对象，在用户再次打开时恢复。' },
      ],
      cta: '对比接入方式',
    },
    builtFor: {
      label: '适合谁',
      h2: 'openkline 的使用场景',
      lede: '适用于需要可编程 OHLCV 图表的交易界面、行情分析面板和产品原型。',
      segments: [
        { h: '交易平台', pain: '需要实时K线、指标和绘图——不想按席位付许可费。', features: '实时传输、指标、绘图工具、状态序列化。', cta: '查看 live demo', ctaId: 'playground' },
        { h: '金融科技产品团队', pain: '需要查看、修改图表源码，并将其随产品一起分发。', features: 'MIT 许可、零遥测、完整源码访问、框架封装。', cta: '阅读文档', ctaRoute: 'docs' },
        { h: '量化与分析仪表盘', pain: '需要键盘优先导航、URL 可序列化状态和副图指标。', features: '键盘导航、saveLayoutState、多窗格 RSI/MACD/随机指标、主题 API。', cta: '开发者页', ctaRoute: 'developers' },
        { h: '独立开发者与初创团队', pain: '需要在现有 React、Vue 或 TypeScript 应用中试用 K 线和指标。', features: '创建第一张 K 线图，零许可费，React + Vue + vanilla。', cta: '快速开始', ctaRoute: 'docs' },
      ],
    },
    pillars: {
      label: '为什么选 openkline',
      h2: '渲染、数据与状态',
      lede: '引擎将 K 线存储、渲染、数据传输和用户交互分为独立组件。',
      items: [
        {
          claim: '增量更新 K 线',
          proof: <>在 <code>Float64Array</code> 缓冲区上 O(1) <code>append</code>/<code>updateLast</code>，RAF 合并行情，3 层画布分别处理图表与十字光标重绘。</>,
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
          claim: '保存和恢复图表布局',
          proof: <><code>saveLayoutState</code> 序列化图表设置和绘图对象。<code>loadState</code> 校验不可信输入并执行 schema 迁移。</>,
          demo: null,
          docs: '/docs#state',
        },
      ],
    },
    useWhen: {
      label: '何时选什么',
      h2: '集成需求',
      lede: '根据应用需求，检查图表类型、数据连接和交互工具是否适用。',
      use: {
        h: '使用 openkline 当',
        items: [
          '需要 OHLCV K线配合指标与绘图',
          '需要追加 K 线和更新最新 K 线',
          '想要 MIT 许可，零按席位收费',
          '数据管道留在自己的基础设施——不用托管控件',
          '需要 React、Vue 或 vanilla——同一引擎，你来选',
          '键盘导航和无障碍是刚需',
        ],
      },
      other: {
        h: '使用其他方案当',
        items: [
          '主要需求是饼图、柱状图或通用分析面板',
          '需要自带行情数据源的托管控件',
          '需要当前指标目录以外的指标',
          '在做静态报表，而非实时交易 UI',
        ],
      },
      footnote: '请查看所用版本的 API 参考和集成示例。',
    },
    commercialSupport: {
      label: '支持',
      h2: '集成支持',
      lede: '联系维护者，讨论数据适配器、自定义指标或集成评审。',
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
        { q: 'openkline 可以用于生产环境吗？', a: '请使用目标数据量、设备和错误处理流程评估所选版本。API 文档、测试和更新日志描述了当前实现。' },
        { q: 'openkline 与 TradingView 有何区别？', a: 'openkline 是在应用内部运行的图表库。你提供行情数据、部署环境和产品界面。源码采用 MIT 许可证。' },
        { q: '可以接入自己的数据源吗？', a: '可以。实现 DataTransport 接口（四个方法）即上线。轮询、WebSocket、REST——引擎不关心K线从哪来。' },
        { q: '移动端支持如何？', a: '触摸手势（单指平移、双指捏合）开箱即用。画布自适应且支持 hi-DPI。复杂绘图工具在小屏上可能不太方便——这是 UX 限制，不是 bug。' },
        { q: '有告警和回放模式等计划功能吗？', a: '请查看所用版本的路线图和 API 参考。引擎包已提供的功能可能与本网站展示的功能不同。' },
        { q: '有遥测或追踪吗？', a: '引擎不发送遥测数据。行情数据源和网络请求由你的应用决定。' },
        { q: '可以商用吗？', a: '可以。MIT 许可——在任何项目中使用，商业或非商业，除许可文件外无归属要求。' },
        { q: '如何获取支持？', a: '社区支持通过 GitHub issues。商业支持（优先功能、集成评审、自定义指标）可用——联系维护者。' },
      ],
    },
    finalCta: {
      h2: '用自己的数据试用 openkline',
      lede: '先体验演示，再按照 TypeScript、React 或 Vue 集成指南接入。',
      btnDemo: '打开演示',
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
      h2: '渲染、数据与状态',
      lede: '引擎将 K 线存储、渲染、数据传输和用户交互分为独立组件。',
    },
    adv: [
      {
        k: '实时路径',
        h: 'K 线的增量存储',
        p: (
          <>
            K线存放在 <code>Float64Array</code> 环形缓冲区中。<code>append</code> 与{' '}
            <code>updateLast</code> 为 O(1)；历史通过摊还 O(1) 的 <code>prepend</code> 翻页。
            <code>CandleMerger</code> 按 RAF 合并行情，三层画布意味着移动十字光标永不重绘K线。
          </>
        ),
        metrics: [<><b>O(1)</b> append / updateLast</>, <><b>3</b> 层画布</>, <><b>按状态变更</b>重绘</>],
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
        h: '保存和恢复图表布局',
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
    s03: { label: '03 — 架构', h2: '渲染、数据与交互' },
    arch: [
      {
        h: '渲染',
        items: [
          <>Hi-DPI 画布，三层分离：图表 / UI / 交互</>,
          <>脏标记与 RAF 在图表状态变化时安排重绘</>,
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
      h2: '键盘导航',
      lede: '使用快捷键平移、缩放、调整可见范围和选择绘图工具。',
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
      h2: '配置颜色和数值格式',
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
      label: '文档',
      h2: '文档',
      lede: '先阅读集成指南，再通过 TypeDoc 查阅 API 细节。可在演示中检查图表交互。',
      cards: [
        { k: '指南', t: '快速开始', d: '安装、第一张图、五行接入实时数据 —— vanilla、React 或 Vue。' },
        { k: '指南', t: 'SSR 集成', d: 'Next.js 与 Nuxt 配方 —— 仅客户端挂载、水合陷阱。' },
        { k: '指南', t: '性能调优', d: '无限滚动、maxCandles、缺口检测、长帧剖析。' },
        { k: '指南', t: '主题', d: '内置模式、自定义 ThemeColors、价格与成交量格式化。' },
        { k: '指南', t: '实时数据与传输', d: 'DataTransport 接口、轮询与 WebSocket 基类、退避。' },
        { k: '参考', t: 'API 参考', d: '完整 TypeDoc —— 核心的每个类、选项与事件。' },
        { k: '参考', t: '指标', d: `全部 ${INDICATOR_COUNT} 内置指标的配置形态，以及自定义指标之路。` },
        { k: '参考', t: '绘图工具', d: `${DRAWING_TOOL_COUNT} 种锚定工具、命中测试、保存/加载往返。` },
        { k: '杂项', t: '更新日志', d: '版本记录与 API 变更。' },
      ],
    },
    support: {
      label: '支持',
      h2: '商业与社区支持',
      lede: '联系维护者，讨论数据适配器、自定义指标或集成评审。',
      order: {
        k: '商业支持',
        h: '集成评审与优先功能',
        p: '描述所需的适配器、指标或集成，与维护者讨论工作范围及可安排的时间。',
        btn: '申请集成评审',
      },
      suggest: {
        k: '社区',
        h: '想法与缺陷报告',
        p: '创建 issue，提供问题复现步骤，或描述新功能要支持的使用场景。',
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
    lede: '查看带源码的图表示例：数据源、指标、绘图和框架集成。',
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
    lede: '在 GitHub 报告问题，或联系维护者讨论集成工作。',
    commercial: {
      h2: '商业支持',
      lede: '与维护者讨论交易所适配器、自定义指标、缺陷修复或架构评审。',
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
      lede: '创建 issue，提供问题复现步骤或描述使用场景。',
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
