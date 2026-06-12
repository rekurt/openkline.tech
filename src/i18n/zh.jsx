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
    right: 'MIT · @rekurt/openkline 0.1.0 · 一位维护者 · 440+ 测试 · 不是你的密钥？与我们无关',
  },
  product: {
    badges: { agnostic: '框架无关', realtime: '实时' },
    h1: <>不是<em>你的</em>引擎，就不是<em>你的</em>图表。</>,
    lede: (
      <>
        那就拥有它：<code>@rekurt/openkline</code> —— TradingView 级的 OHLCV 图表引擎。开源、MIT、无厂商锁定。
        K线、30+ 指标、锚定绘图工具与实时传输开箱即用。一个 TypeScript 核心；<code>react</code> 与{' '}
        <code>vue</code> 封装，API 完全对等。
      </>
    ),
    ctaPlayground: '打开 Playground',
    ctaDocs: '阅读文档',
    stats: [
      { v: <>440<em>+</em></>, k: '单元测试' },
      { v: <>0</>, k: 'CI 中 lint 警告' },
      { v: <>~27 <em>KB</em></>, k: '核心体积（gzip）' },
      { v: <>30<em>+</em></>, k: '内置指标' },
      { v: <>$0</>, k: '许可费用，永久' },
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
        h: '30+ 指标，9 种绘图工具',
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
        { label: '内置指标', cells: [{ cls: 'yes', text: '30+' }, { cls: 'no', text: '自己实现' }, { cls: 'yes', text: '有' }, { cls: 'part', text: '通用' }] },
        { label: '绘图工具', cells: [{ cls: 'yes', text: '9 种，锚定' }, { cls: 'no', text: '无' }, { cls: 'yes', text: '有' }, { cls: 'no', text: '无' }] },
        { label: '实时传输', cells: [{ cls: 'yes', text: '内置' }, { cls: 'no', text: '自行接入' }, { cls: 'part', text: '部分' }, { cls: 'no', text: '自行接入' }] },
        { label: '键盘 + 无障碍', cells: [{ cls: 'yes', text: '一等支持' }, { cls: 'no', text: '无' }, { cls: 'part', text: '部分' }, { cls: 'part', text: '部分' }] },
        { label: '许可证', cells: [{ cls: 'yes', text: 'MIT' }, { cls: 'yes', text: 'Apache-2.0' }, { cls: 'no', text: '商业' }, { cls: 'yes', text: 'MIT' }] },
        { label: '框架锁定', cells: [{ cls: 'yes', text: '无' }, { cls: 'yes', text: '无' }, { cls: 'part', text: '厂商 API' }, { cls: 'yes', text: '无' }] },
      ],
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
        metrics: [<><b>30+</b> 指标类型</>, <><b>0</b> 手动实例</>, <><b>每次渲染</b> diff</>],
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
        { k: '参考', t: '指标', d: '全部 30+ 内置指标的配置形态，以及自定义指标之路。' },
        { k: '参考', t: '绘图工具', d: '九种锚定工具、命中测试、保存/加载往返。' },
        { k: '杂项', t: '更新日志', d: '每个版本零惊喜 —— 自 0.1.0 起严格 semver。' },
      ],
    },
    support: {
      label: 'support — 让K线继续打印',
      h2: '资助路线图',
      lede: 'openkline 是 MIT，并将一直是 MIT。告警、回放模式、对比模式与工作区 —— 维护有了资金就来得更快。',
      donate: {
        k: '捐助',
        h: '支持项目',
        p: '一次性或定期 —— 每笔捐助都用于维护：分诊、评审、让 440+ 测试保持绿色。',
        wallet: '地址私聊 —— 见联系方式',
        btn: '在 GitHub 上赞助',
      },
      order: {
        k: '定制功能',
        h: '等不及路线图？',
        p: '交易所适配器、自定义指标、提前交付的告警 —— 发来规格说明，拿到报价。付费工作以 MIT 进上游，所有人受益。',
        btn: '发送规格说明',
      },
      suggest: {
        k: '建议',
        h: '想法与缺陷报告',
        p: '带复现或场景开 issue。通过评审的提案会获得里程碑 —— 标准见 M1 设计文档。',
        btn: '打开 issue ↗',
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
};
