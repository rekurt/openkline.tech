import { EXAMPLES } from "./examples.js";
import { ROUTE_TO_PATH } from "./routes.js";

export const ORIGIN = "https://openkline.tech";
export const INDEXED_LOCALES = ["en", "ru", "zh"];
const META = {
  "product": {
    "en": {
      "title": "OpenKline — TypeScript candlestick charts for React and Vue",
      "desc": "Open-source OHLCV charts with 24 indicators, drawing tools and realtime data. MIT-licensed TypeScript core with React and Vue adapters."
    },
    "ru": {
      "title": "OpenKline — Свечные графики для TypeScript, React и Vue",
      "desc": "Свечные OHLCV-графики с 24 индикаторами, рисованием и данными в реальном времени. TypeScript-ядро под MIT и адаптеры React и Vue."
    },
    "zh": {
      "title": "OpenKline — TypeScript、React 和 Vue K 线图",
      "desc": "开源 OHLCV 图表，提供 24 种指标、绘图工具和实时数据。MIT 许可的 TypeScript 核心，支持 React 和 Vue。"
    }
  },
  "developers": {
    "en": {
      "title": "OpenKline developers — TypeScript, React and Vue integration",
      "desc": "Install OpenKline and create your first chart in TypeScript, React or Vue. Configure indicators, drawing tools, themes and keyboard controls."
    },
    "ru": {
      "title": "OpenKline — Интеграция с TypeScript, React и Vue",
      "desc": "Установка OpenKline и первый график на TypeScript, React или Vue. Настройка индикаторов, рисования, тем и управления клавиатурой."
    },
    "zh": {
      "title": "OpenKline — TypeScript、React 和 Vue 集成",
      "desc": "安装 OpenKline 并用 TypeScript、React 或 Vue 创建第一个图表。配置指标、绘图工具、主题和键盘操作。"
    }
  },
  "docs": {
    "en": {
      "title": "OpenKline documentation — charts, indicators and live data",
      "desc": "OpenKline integration guides: first chart, live data transports, indicators, drawings, saved layouts, theming, performance and SSR."
    },
    "ru": {
      "title": "OpenKline — Документация по графикам и данным",
      "desc": "Руководства OpenKline: первый график, потоковые данные, индикаторы, рисование, сохранение состояния, темы, производительность и SSR."
    },
    "zh": {
      "title": "OpenKline — 图表与实时数据文档",
      "desc": "OpenKline 集成指南：首个图表、实时数据传输、指标、绘图、状态保存、主题、性能和 SSR。"
    }
  },
  "reference": {
    "en": {
      "title": "OpenKline API reference — chart methods and configuration",
      "desc": "Reference for @rekurt/openkline-core: chart methods, options, types, technical indicators and candle-anchored drawing tools."
    },
    "ru": {
      "title": "OpenKline — Справочник API графиков",
      "desc": "Методы, параметры и типы @rekurt/openkline-core, технические индикаторы и инструменты рисования с привязкой к свечам."
    },
    "zh": {
      "title": "OpenKline — 图表 API 参考",
      "desc": "@rekurt/openkline-core 的方法、选项与类型，以及技术指标和锚定 K 线的绘图工具。"
    }
  },
  "examples": {
    "en": {
      "title": "OpenKline examples — realtime charts, indicators and SSR",
      "desc": "Explore working OHLCV chart examples for live data, indicators, drawing tools, layout state, themes, React, Vue and server-side rendering."
    },
    "ru": {
      "title": "OpenKline — Примеры графиков, индикаторов и SSR",
      "desc": "Рабочие примеры OHLCV-графиков: потоковые данные, индикаторы, рисование, сохранение состояния, темы, React, Vue и SSR."
    },
    "zh": {
      "title": "OpenKline — 实时图表、指标和 SSR 示例",
      "desc": "浏览可运行的 OHLCV 图表示例：实时数据、指标、绘图、布局状态、主题、React、Vue 和服务端渲染。"
    }
  },
  "playground": {
    "en": {
      "title": "OpenKline playground — interactive OHLCV chart demo",
      "desc": "Try OpenKline in your browser: choose a symbol and timeframe, switch chart types and indicators, then copy the generated TypeScript configuration."
    },
    "ru": {
      "title": "OpenKline — Интерактивная демоверсия OHLCV-графиков",
      "desc": "Попробуйте OpenKline в браузере: выберите инструмент и таймфрейм, измените тип графика и индикаторы, скопируйте TypeScript-конфигурацию."
    },
    "zh": {
      "title": "OpenKline — 交互式 OHLCV 图表演示",
      "desc": "在浏览器中试用 OpenKline：选择交易对和周期，切换图表类型和指标，然后复制 TypeScript 配置。"
    }
  },
  "benchmarks": {
    "en": {
      "title": "OpenKline benchmarks — chart rendering performance",
      "desc": "OpenKline benchmark measurements for loading candles, incremental updates, panning, zooming and indicator computation."
    },
    "ru": {
      "title": "OpenKline — Тесты производительности графиков",
      "desc": "Измерения производительности OpenKline: загрузка свечей, потоковые обновления, прокрутка, масштабирование и расчёт индикаторов."
    },
    "zh": {
      "title": "OpenKline — 图表性能基准测试",
      "desc": "OpenKline 性能测量：加载 K 线、增量更新、平移、缩放和指标计算。"
    }
  },
  "roadmap": {
    "en": {
      "title": "OpenKline roadmap — chart features and planned work",
      "desc": "Review available, experimental and planned OpenKline features, including chart types, data integration and analysis tools."
    },
    "ru": {
      "title": "OpenKline — Планы развития графиков",
      "desc": "Доступные, экспериментальные и запланированные возможности OpenKline: типы графиков, подключение данных и инструменты анализа."
    },
    "zh": {
      "title": "OpenKline — 图表功能路线图",
      "desc": "查看 OpenKline 已有、实验性与计划中的图表、数据集成和分析功能。"
    }
  },
  "support": {
    "en": {
      "title": "OpenKline support — integration help and community",
      "desc": "Get OpenKline integration help, report a bug on GitHub, contact the maintainer about commercial work or support the open-source project."
    },
    "ru": {
      "title": "OpenKline — Поддержка и помощь с интеграцией",
      "desc": "Помощь с интеграцией OpenKline, сообщения об ошибках на GitHub, коммерческие работы и поддержка открытого проекта."
    },
    "zh": {
      "title": "OpenKline — 集成帮助与社区支持",
      "desc": "获取 OpenKline 集成帮助，在 GitHub 报告问题，联系维护者讨论商业开发或支持开源项目。"
    }
  }
};

export function canonicalPath(route, locale = "en", exampleId) {
 const path = route === "examples" && exampleId ? `/examples/${exampleId}` : ROUTE_TO_PATH[route] || "/";
 const prefix = locale === "en" ? "" : `/${locale}`;
 return path === "/" ? `${prefix}/` : `${prefix}${path}/`;
}
export function routeLocales(route) {
 // The detailed guides and API reference currently have English body copy.
 return ['docs', 'reference'].includes(route) ? ['en'] : INDEXED_LOCALES;
}
export function seoMeta(route, locale = "en", example) {
 const language = routeLocales(route).includes(locale) ? locale : "en";
 const base = (META[route] || META.product)[language];
 const m = example ? {title: `OpenKline — ${example.title}`, desc: example.desc} : base;
 return { ...m, language, canonical: ORIGIN + canonicalPath(route, language, example?.id),
   noindex: !routeLocales(route).includes(locale), ogLocale: {en:"en_US",ru:"ru_RU",zh:"zh_CN"}[language] };
}
export function seoAlternates(route, exampleId) {
 return [...routeLocales(route).map(locale => ({lang: locale === "zh" ? "zh-CN" : locale, url: ORIGIN + canonicalPath(route, locale, exampleId)})),
 {lang:"x-default", url: ORIGIN + canonicalPath(route, "en", exampleId)}];
}
export function seoSitemap() {
 const routes = [...Object.keys(META).map(route => ({route})), ...EXAMPLES.map(example => ({route:"examples",exampleId:example.id}))];
 const entries = routes.flatMap(({route,exampleId}) => routeLocales(route).map(locale => {
  const links = seoAlternates(route,exampleId).map(a => `<xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.url}"/>`).join("");
  return `<url><loc>${ORIGIN + canonicalPath(route, locale, exampleId)}</loc>${links}</url>`;
 })).join("\n");
 return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>\n`;
}
