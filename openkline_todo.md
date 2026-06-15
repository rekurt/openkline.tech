# OpenKline.tech — TODO для ИИ‑агента

## Контекст задачи

Нужно улучшить сайт `openkline.tech` и связанные публичные материалы проекта.

**Приоритеты владельца проекта:**

1. Повысить конверсию сайта.
2. Добавить и показать бенчмарки.
3. Лучше раскрыть существующие фичи и подготовить основу для будущих.
4. Не оценивать сроки.
5. Не оценивать ресурсы.
6. Локали сайта: `ru / sn / zh`.

Главная цель: превратить сайт из технической витрины в продающий devtool landing для open‑source OHLCV charting engine.

Сайт должен продавать не просто список фич, а решение:

```
OpenKline — source‑controlled OHLCV runtime для команд,
которые не хотят iframe, vendor lock‑in и чёрный ящик в трейдинговом UI.
```

Тональность:

```
professional‑punk
```

Это значит:

```
no iframe rent
no vendor lock‑in
own the chart runtime
source is the contract
MIT means ship it
```

Не значит:

```
crypto‑мемы
агрессивный хайп
“TradingView killer”
неподтверждённый enterprise‑grade
донаты в основной воронке
```

## Жёсткие правила

- Не добавлять фейковые цифры.
- Не добавлять неподтверждённые claims.
- Не писать `production‑ready`, если это не подтверждено статусом API, тестами и релизами.
- Не писать `TradingView replacement`, `TradingView killer`.
- Не использовать `TradingView‑grade` без блока доказательств.
- Не показывать roadmap‑фичи как уже готовые.
- Не добавлять лого клиентов, кейсы, отзывы, если их нет.
- Не добавлять внешнюю аналитику без отдельного решения владельца.
- Не ставить donation / USDT / crypto‑support в основной conversion path.
- Не менять публичный API движка без отдельного design doc.
- Не плодить дубли данных. Все версии, числа и статусы должны иметь source of truth.
- Не использовать длинные предложения в таблицах.
- Все CTA должны вести туда, куда обещают.
- Все demo должны использовать реальный openkline, а не скриншоты.

## Целевое позиционирование

Основная формула:

```
Не арендуй график. Владей движком.
```

Расширенная формула:

```
OpenKline — MIT OHLCV engine для трейдинговых UI:
realtime canvas, индикаторы, якорные drawing tools,
data transports и единое API для Vanilla, React и Vue.

Без iframe. Без vendor lock‑in. Твой data pipeline остаётся твоим.
```

Английский вариант для brand voice:

```
Own the chart runtime.
No iframe rent. No vendor lock. Your data pipeline stays yours.
```

## Известные проблемы, которые нужно исправить

- Hero сейчас перегружен списком фич.
- Сайт больше отвечает на вопрос «что умеет», чем «кому и зачем это нужно».
- CTA на первом экране нужно проверить и исправить: `Playground` должен вести в playground/live demo, `Docs` — в docs.
- Версии и метрики нужно синхронизировать между сайтом, README, package metadata и docs.
- Claims по количеству индикаторов и drawing tools нужно привести к единой правде.
- Roadmap‑фичи нужно отделить от готовых фич.
- Секцию поддержки нужно переделать из donation‑first в commercial‑support‑first.
- Крипто‑донаты убрать из основного landing flow.
- Footer‑мем заменить на professional‑punk формулировку.
- Comparison table сделать честной, не карикатурной.
- Добавить use‑case секции: для кого openkline.
- Добавить benchmarks page.
- Добавить examples gallery.
- Добавить feature status / roadmap page.
- Добавить locale routing для `ru / sn / zh`.
- Добавить нормальные OG images.
- Добавить security contact / `security.txt`.

---

## 1. Stabilize facts

### 1.1. Создать единый source of truth

Создать или привести к единой структуре:

```
src/content/project.ts
src/content/metrics.ts
src/content/features.ts
src/content/routes.ts
```

#### `src/content/project.ts`

- Добавить имя проекта.
- Добавить package names.
- Добавить GitHub URLs.
- Добавить license.
- Добавить install‑команды.
- Добавить contact URLs.
- Не хардкодить эти значения в компонентах.

Пример структуры:

```ts
export const project = {
  name: 'openkline',
  license: 'MIT',
  packages: {
    core: '@rekurt/openkline-core',
    react: '@rekurt/openkline-react',
    vue: '@rekurt/openkline-vue',
  },
  repos: {
    core: 'https://github.com/rekurt/openkline',
    react: 'https://github.com/rekurt/openkline-react',
    vue: 'https://github.com/rekurt/openkline-vue',
  },
  install: {
    core: 'npm install @rekurt/openkline-core',
    react: 'npm install @rekurt/openkline-core @rekurt/openkline-react',
    vue: 'npm install @rekurt/openkline-core @rekurt/openkline-vue',
  },
};
```

#### `src/content/metrics.ts`

- Хранить версию.
- Хранить число тестов.
- Хранить bundle size.
- Хранить число индикаторов.
- Хранить число drawing tools.
- Хранить число runtime dependencies.
- Если значение нельзя подтвердить — не публиковать как факт.

Пример:

```ts
export const metrics = {
  version: '0.2.0',
  tests: 440,
  lintWarnings: 0,
  coreSizeGzipKb: 27,
  indicators: 30,
  drawingTools: 9,
  runtimeDependenciesCore: 0,
};
```

#### `src/content/features.ts`

- Каждая фича должна иметь статус.
- Каждая фича должна иметь proof.
- Roadmap‑фичи не должны попадать в hero как готовые.

Статусы:

```ts
export type FeatureStatus =
  | 'available'
  | 'experimental'
  | 'planned'
  | 'sponsored';
```

Минимальный список фич:

```
realtime
indicators
drawings
data transports
framework wrappers
state sharing
theming
keyboard/a11y
SSR recipes
benchmarks
alerts
replay mode
compare mode
workspaces
exchange adapters
```

---

## 2. Conversion rebuild

### 2.1. Hero

Переделать первый экран.

- Переписать H1.
- Переписать lede.
- Добавить proof strip.
- Исправить CTA.
- Добавить кнопку копирования install‑команды.
- Добавить GitHub CTA.
- Оставить live chart справа.
- Убрать неподтверждённые claims.
- Сделать mobile layout без поломок.

**Рекомендуемый RU‑текст**:

```
Не арендуй график. Владей движком.

OpenKline — MIT OHLCV engine для трейдинговых UI:
realtime canvas, индикаторы, якорные инструменты рисования,
data transports и единое API для Vanilla, React и Vue.

Без iframe. Без vendor lock‑in. Твой data pipeline остаётся твоим.
```

**CTA**:

```
[Потрогать live demo]
[Скопировать npm install]
[Документация]
[GitHub]
```

**Proof strip** — использовать только подтверждённые данные:

```
MIT
0 runtime deps
strict TypeScript
440+ tests
27 KB gzip
React / Vue / Vanilla
no telemetry
```

### 2.2. Problem section

Добавить секцию сразу после hero.

**Смысл**: показать, против какой боли существует openkline.

**RU‑текст**:

```
Большинство графических библиотек заставляют выбирать.

Лёгкая — но голая.
Полная — но коммерческая.
Универсальная — но не trading‑native.
Hosted widget — но с vendor lock‑in.

OpenKline даёт trading UI primitives как TypeScript‑код,
которым владеет ваша команда.
```

**TODO**:

- Добавить 4 trade‑off карточки.
- Добавить CTA `Сравнить варианты` — ведёт к comparison section.
- Не атаковать конкурентов напрямую.
- Не использовать длинные предложения в карточках.

### 2.3. Built for section

Добавить секцию «Для кого».

**Сегменты**:

```
Криптобиржи
Брокерские кабинеты
Трейдинговые терминалы
Backtesting UI
Market‑data tools
Финтех‑админки
```

**TODO**:

- Создать карточку для каждого сегмента.
- В каждой карточке показать боль.
- В каждой карточке показать релевантные фичи openkline.
- В каждой карточке добавить CTA на пример или docs.
- Не писать «для всех».

### 2.4. Feature pillars

Пересобрать текущие фичи по модели:

```
Claim → Proof → Demo / Docs
```

#### Pillar : Realtime

- Заголовок: `Realtime is the default path`.
- Показать `Float64Array`.
- Показать `O(1) updateLast`.
- Показать `RAF tick coalescing`.
- Показать `3 canvas layers`.
- Добавить live mini panel.
- CTA на `/examples/realtime`.

#### Pillar : Indicators

- Заголовок: `Indicators are configs, not ceremony`.
- Показать API `chart.setIndicatorConfigs`.
- Показать chips индикаторов.
- Добавить live toggles.
- CTA на `/docs#indicators`.

#### Pillar : Drawings

- Заголовок: `Drawings stick to candles, not pixels`.
- Показать anchored drawings.
- Добавить pan/zoom demo.
- Показать state serialization.
- CTA на `/examples/drawings`.

#### Pillar : Data transports

- Заголовок: `Bring your own market data`.
- Показать интерфейс `DataTransport`.
- Показать REST history.
- Показать WebSocket ticks.
- Показать reconnect/backoff (если это есть).
- CTA на `/docs#live-data`.

#### Pillar : Framework wrappers

- Заголовок: `One engine. Three entry points`.
- Tabs: Vanilla / React / Vue.
- Один смысл, три API.
- CTA на `/developers`.

#### Pillar : State / theming / a11y

- Показать `saveLayoutState`.
- Показать `loadState`.
- Показать theme tokens.
- Показать keyboard navigation.
- Не делать это главным selling pillar.
- CTA на `/docs#state`.

### 2.5. Comparison section

Переделать сравнение.

- Оставить таблицу, но сделать её проще.
- Добавить блок `Use openkline when`.
- Добавить блок `Use something else when`.
- Добавить footnotes для спорных сравнений.
- Не изображать конкурентов глупыми.
- Проверить claims по конкурирующим библиотекам.
- На mobile таблица должна скроллиться горизонтально.

**Use openkline when**:

```
you need OHLCV / candlestick UI
you own market data
you need indicators and drawings
you need MIT / source control
you want React / Vue / Vanilla parity
```

**Use something else when**:

```
you need generic dashboard charts
you need hosted widgets
you need enterprise SLA today
you need non‑trading visualizations
```

### 2.6. Commercial support

Заменить donation‑first messaging.

- Создать основной блок `Commercial support`.
- Описать услуги.
- Добавить CTA `Request integration review`.
- Community support оставить ниже.
- Крипто‑донаты убрать из основного блока.
- Donation options оставить только вторичным блоком.

**RU‑текст**:

```
Встраиваете openkline в production?

Поможем с интеграцией, кастомными индикаторами,
адаптерами бирж, performance profiling,
white‑label темами и приоритетными фиксам.
```

**CTA**:

```
[Запросить integration review]
[Открыть issue]
[Посмотреть roadmap]
```

### 2.7. Final CTA

Добавить финальный продающий блок перед footer.

**RU‑текст**:

```
Владей графиком. Владей runtime.

Поставь openkline, подключи свои данные,
собери трейдинговый UI без iframe и vendor lock‑in.
```

**CTA**:

```
[Скопировать npm install]
[Открыть docs]
[GitHub]
```

---

## 3. Новый route structure

Привести к структуре:

```
/
 /developers
 /docs
 /reference
 /examples
 /benchmarks
 /roadmap
 /support
 /playground
```

С локалями:

```
/ru
/ru/developers
/ru/docs
/ru/reference
/ru/examples
/ru/benchmarks
/ru/roadmap
/ru/support
/ru/playground

/sn
/sn/developers
/sn/docs
/sn/reference
/sn/examples
/sn/benchmarks
/sn/roadmap
/sn/support
/sn/playground

/zh
/zh/developers
/zh/docs
/zh/reference
/zh/examples
/zh/benchmarks
/zh/roadmap
/zh/support
/zh/playground
```

Важно:

- `sn` считать требуемой локалью владельца.
- Не заменять `sn` на `en` без подтверждения владельца.
- Если текущий сайт уже имеет `en`, не удалять его без явного решения.
- Для всех локалей структура routes должна совпадать.

---

## 4. Examples gallery

Создать route:

```
/examples
```

И дочерние примеры:

```
/examples/realtime
/examples/indicators
/examples/drawings
/examples/state
/examples/theming
/examples/react
/examples/vue
/examples/ssr
```

Для каждой локали аналогично.

### Для каждого примера

- Live chart.
- Code block.
- Copy button.
- Link to docs.
- Link to GitHub source.
- Feature tags.
- Работает на mobile.
- Не показывает недоступные фичи.

### Примеры

- **Realtime** — live update demo, `updateLastCandle`, buffer stats, code snippet.
- **Indicators** — SMA, EMA, Bollinger Bands, RSI, MACD, live toggles.
- **Drawings** — trendline, rectangle, Fibonacci, pan/zoom persistence, save/load state.
- **State** — `saveLayoutState`, `loadState`, URL state, shareable link.
- **Theming** — Dark, Light, Custom, Price/volume formatters.
- **React** — React wrapper example, controlled indicators, ref API, error handling.
- **Vue** — Vue wrapper example, v-model indicators (если есть), composable/ref API.
- **SSR** — Next.js/Nuxt recipes, client‑only mount, hydration caveats.

---

## 5. Playground

Создать route:

```
/playground
```

На landing оставить embedded mini‑demo.

### Playground features

- Symbol selector.
- Resolution selector.
- Chart type selector.
- Indicator toggles.
- Drawing tools.
- Theme switch.
- Save state.
- Load state.
- Share URL.
- Copy current config as code.
- Reset.
- Error boundary.

### Acceptance

- Playground открывается по прямой ссылке.
- State сохраняется в URL.
- Copy code даёт рабочий snippet.
- Не используется iframe.
- Ошибки demo не ломают сайт.
- На mobile доступен read‑only режим или упрощённый editor.

---

## 6. Benchmarks

Создать route:

```
/benchmarks
```

### 6.1. Benchmark data contract

Создать структуру:

```
src/content/benchmarks/
  latest.json
  history.json
  methodology.md
```

### 6.2. Что измерять

- `setData` на 10k свечей.
- `setData` на 50k свечей.
- `setData` на 100k свечей.
- `updateLastCandle`.
- `append`.
- `prependHistory`.
- `pan`.
- `zoom`.
- `crosshair move`.
- `indicator recompute`.
- `saveLayoutState`.
- `loadState`.

### 6.3. Метрики

- `p50`.
- `p95`.
- `p99`.
- `mean`.
- `min`.
- `max`.
- `memory`.
- `bundle gzip`.
- `browser`.
- `OS`.
- `device`.
- `package version`.
- `commit SHA`.
- `date`.

### 6.4. Benchmarks page sections

```
01. What is measured
02. Dataset sizes
03. Latest results
04. Methodology
05. Raw JSON
06. History
```

### 6.5. Правила публикации

- Не публиковать фейковые benchmark numbers.
- Если данных нет, честно показать empty state.
- Empty state текст:
  
  ```
  Benchmark suite is being wired to CI.
  No published numbers yet.
  ```

- Каждый результат должен иметь environment metadata.
- Каждый результат должен иметь commit SHA.
- Сайт должен показывать дату benchmark run.
- Сайт должен предупреждать, если данные устарели.

---

## 7. Roadmap / feature status

Создать route:

```
/roadmap
```

### Секции

```
Available now
Experimental
Planned
Sponsored
```

### TODO

- Подключить `features.ts`.
- Для каждой фичи показать статус.
- Для готовых фич показать docs/example links.
- Для experimental фич показать caveats.
- Для planned фич не показывать live CTA.
- Для sponsored фич добавить CTA `Sponsor this feature`.
- Не обещать сроки.
- Не оценивать ресурсы.

### Planned фичи

Использовать как roadmap items, если они ещё не готовы:

```
alerts
replay mode
compare mode
workspaces
exchange adapters
volume profile
PNG/SVG export
custom indicator registry
```

---

## 8. Design docs для будущих фич

Для каждой новой engine‑фичи создавать design doc перед реализацией.

**Шаблон**:

```
docs/design/<feature-id>.md
```

**Структура**:

```
# <Feature Name>

## Problem

## User stories

## Public API

## Internal architecture

## Data model

## Serialization

## Error handling

## Tests

## Docs impact

## Demo impact

## Bundle size impact

## Open questions
```

**Обязательные design docs**:

- `alerts`.
- `replay-mode`.
- `compare-mode`.
- `workspaces`.
- `exchange-adapters`.
- `custom-indicators`.
- `export`.

---

## 9. Localization

### 9.1. Locale routing

- Перенести язык в URL.
- Поддержать `ru / sn / zh`.
- Сохранить language switcher.
- `localStorage` может хранить предпочтение, но canonical URL должен быть локализован.
- HTML `lang` должен соответствовать текущей локали.
- Missing translation должен ломать build или явно подсвечиваться в dev mode.

### 9.2. Файлы

```
src/i18n/schema.ts
src/i18n/ru.ts
src/i18n/sn.ts
src/i18n/zh.ts
```

Если текущие словари `.jsx`, можно оставить формат, но привести к строгой схеме.

### 9.3. Что перевести

- Navigation.
- Hero.
- CTA.
- Problem section.
- Built for section.
- Feature pillars.
- Examples.
- Benchmarks.
- Roadmap.
- Support.
- FAQ.
- Footer.
- SEO meta.
- OG text.

---

## 10. SEO

### 10.1. Meta для каждого route

Для каждого route и locale:

- `title`.
- `description`.
- `canonical`.
- `og:title`.
- `og:description`.
- `og:url`.
- `og:image`.
- `og:image:alt`.
- `twitter:card`.
- `twitter:title`.
- `twitter:description`.
- `twitter:image`.

### 10.2. Hreflang

Добавить для всех локалей:

```
ru
sn
zh
x-default
```

### 10.3. Sitemap

- Все основные routes.
- Все locale routes.
- Examples routes.
- Benchmarks.
- Roadmap.
- Support.

### 10.4. OG images

Создать:

```
public/og/ru.png
public/og/sn.png
public/og/zh.png
public/og/examples.png
public/og/benchmarks.png
public/og/roadmap.png
```

Требования:

- 1200×630.
- Dark chart background.
- OpenKline logo.
- Короткий slogan.
- Proof strip.
- Текст читается.
- Не использовать только SVG logo как OG image.

---

## 11. Professional‑punk brand

Создать документ:

```
docs/brand-tone.md
```

### Разрешённые формулы

```
No iframe rent.
Own the chart runtime.
Your data pipeline stays yours.
Source is the contract.
MIT means ship it.
Realtime is not a plugin.
Indicators are configs, not ceremony.
Drawings stick to candles, not pixels.
```

### Запрещённые формулы

```
TradingView killer
лучший график
enterprise-grade без доказательств
не твои ключи? не наши проблемы
USDT в основном support-блоке
любой хайп без proof
```

### Visual direction

Сохранить:

- dark canvas.
- grid.
- mono labels.
- ember accent.
- thin borders.
- terminal/code blocks.
- bull/bear только для market data.

Добавить:

- stamps: `NO IFRAME`, `MIT`, `ZERO DEPS`, `NO VENDOR LOCK`.
- proof panels.
- benchmark cards.
- feature status tags.
- route-specific hero visuals.

---

## 12. Support

Создать или переделать route:

```
/support
```

### Основные секции

```
Commercial support
Community support
Security
Contact
```

### Commercial support

- Integration review.
- Custom indicators.
- Exchange adapters.
- Performance profiling.
- White‑label themes.
- Priority fixes.
- Migration help.

### Community support

- GitHub issues.
- Discussions.
- Sponsors.
- Donation options as secondary.

### Security

- Добавить security contact.
- Добавить `.well-known/security.txt`.
- Добавить текст `no telemetry`.
- Добавить текст `no hosted runtime`.
- Добавить текст `your market data stays in your app`.

---

## 13. FAQ

Добавить FAQ на landing и/или отдельный блок в docs.

**Вопросы**:

- Is openkline free for commercial use?
- Does openkline send data anywhere?
- Can I use my own market data?
- Does it work with React?
- Does it work with Vue?
- Does it work with SSR?
- Can I add custom indicators?
- Can I add custom drawing tools?
- How stable is the API?
- What browsers are supported?
- How is it different from Lightweight Charts?
- Is it a hosted widget?

**Правила**:

- Ответы короткие.
- Без маркетинговой воды.
- Если фича planned — так и писать.
- Если ответ зависит от версии — ссылаться на docs/roadmap.

---

## 14. QA

### Build

Агент должен запускать:

```bash
npm install
npm run build
```

Если доступны:

```bash
npm run lint
npm run typecheck
npm test
```

Если скриптов нет:

- Не ломать существующие scripts.
- Добавлять новые scripts только если они нужны.
- Не внедрять тяжёлую инфраструктуру без необходимости.

### Responsive QA

Проверить:

- desktop 1440px.
- laptop 1024px.
- tablet 768px.
- mobile 390px.
- dark theme.
- light theme.
- long code blocks.
- wide tables.
- menu.
- language switcher.
- copy buttons.
- playground.

### Accessibility QA

Проверить:

- keyboard navigation.
- focus states.
- aria labels.
- color contrast.
- reduced motion.
- no keyboard traps.
- charts have useful surrounding text.

### Link QA

Проверить:

- GitHub.
- Docs.
- Reference.
- Examples.
- Benchmarks.
- Roadmap.
- Support.
- Mailto.
- Telegram.
- Sitemap URLs.
- Locale switch links.

### Content QA

Проверить:

- Версии синхронизированы.
- Метрики синхронизированы.
- Количество индикаторов синхронизировано.
- Количество drawing tools синхронизировано.
- Нет roadmap‑фич в hero как готовых.
- Нет fake benchmarks.
- Нет неподтверждённых сравнений.
- Нет crypto donation в основной воронке.
- Footer соответствует professional‑punk tone.

---

## 15. Порядок реализации

### Phase 1 — Facts and broken conversion

1. Найти все хардкоды версии, метрик, install‑команд.
2. Создать source of truth: `project.ts`, `metrics.ts`, `features.ts`.
3. Синхронизировать версии и метрики по сайту и README.
4. Исправить hero CTA.
5. Переписать hero.
6. Исправить footer.
7. Убрать donation‑first блок.
8. Build.

### Phase 2 — Landing conversion

1. Добавить problem section.
2. Добавить built‑for section.
3. Пересобрать feature pillars.
4. Переделать comparison.
5. Добавить commercial support.
6. Добавить FAQ.
7. Добавить final CTA.
8. Responsive QA.

### Phase 3 — Examples and playground

1. Создать `/examples` и дочерние routes.
2. Создать `/examples/realtime`.
3. Создать `/examples/indicators`.
4. Создать `/examples/drawings`.
5. Создать `/examples/state`.
6. Создать `/examples/theming`.
7. Создать `/examples/react`.
8. Создать `/examples/vue`.
9. Создать `/examples/ssr`.
10. Создать `/playground`.
11. Подключить CTA с landing.
12. Проверить copy snippets.

### Phase 4 — Benchmarks

1. Создать benchmark data contract.
2. Создать `/benchmarks`.
3. Добавить empty state без фейковых чисел.
4. Добавить methodology.
5. Добавить raw JSON link.
6. Подготовить benchmark harness, если доступен engine repo.
7. Подготовить CI hook, если доступен CI.
8. Build.

### Phase 5 — Roadmap and feature status

1. Создать `/roadmap`.
2. Подключить `features.ts`.
3. Разнести фичи по статусам.
4. Добавить sponsored CTA.
5. Добавить design doc template.
6. Убрать planned‑фичи из основных claims.

### Phase 6 — Localization and SEO

1. Реализовать locale routes `ru / sn / zh`.
2. Добавить locale dictionaries.
3. Добавить strict translation schema.
4. Добавить hreflang.
5. Обновить sitemap.
6. Добавить route meta.
7. Добавить OG images.
8. Проверить language switcher.

### Phase 7 — Final hardening

1. Build.
2. Lint.
3. Typecheck.
4. Tests.
5. Responsive QA.
6. A11y QA.
7. Link QA.
8. Content QA.
9. Подготовить PR summary.
10. Подготовить manual verification checklist.

---

## 16. Definition of Done

Работа готова, когда:

- Главная страница продаёт openkline за первые 10 секунд.
- Пользователь понимает, для кого продукт.
- Пользователь понимает, почему не iframe / hosted widget / generic chart.
- Hero CTA корректны.
- Есть working live demo.
- Есть `/examples`.
- Есть `/playground`.
- Есть `/benchmarks`.
- Есть `/roadmap`.
- Есть `/support`.
- Фичи имеют статусы.
- Метрики имеют source of truth.
- Нет противоречий между сайтом, docs и README.
- Нет фейковых benchmarks.
- Нет неподтверждённых claims.
- Есть locale routes для `ru / sn / zh`.
- Есть SEO meta для всех важных routes.
- Есть hreflang.
- Есть sitemap.
- Есть нормальные OG images.
- Есть professional commercial support path.
- Crypto donations не находятся в основной воронке.
- Footer соответствует brand tone.
- Build проходит.
- Сайт работает на mobile.
- Сайт сохраняет professional‑punk визуальный стиль.

---

## 17. Единственное уточнение перед стартом

Подтвердить, что `sn` — это действительно нужная локаль. Если это опечатка вместо `en`, заменить locale plan на `ru / en / zh`.
