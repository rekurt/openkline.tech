# OpenKline.tech — продающий devtool-лендинг для OHLCV-движка

## Overview

Цель — превратить сайт `openkline.tech` из технической витрины в продающий devtool-landing для open-source OHLCV charting engine. Сайт должен продавать не список фич, а решение: «source-controlled OHLCV runtime для команд, которые не хотят iframe, vendor lock-in и чёрный ящик в трейдинговом UI».

Приоритеты владельца: (1) повысить конверсию, (2) добавить и показать бенчмарки, (3) лучше раскрыть существующие фичи и подготовить основу для будущих. Сроки и ресурсы не оцениваются. Локали сайта: `ru / sn / zh`. Тональность — professional-punk (no iframe rent, own the chart runtime, source is the contract, MIT means ship it), без крипто-мемов, агрессивного хайпа и неподтверждённого enterprise-grade.

Работа охватывает: стабилизацию фактов (единый source of truth), пересборку конверсии лендинга, examples gallery + playground на реальном openkline, страницы benchmarks и roadmap, локализацию и SEO, дедицированный support, и финальное QA с проверкой Definition of Done.

## Context

- Затрагиваемые области сайта: hero, footer, секции лендинга (problem / built-for / feature pillars / comparison / commercial support / FAQ / final CTA); новые маршруты `/examples`, `/playground`, `/benchmarks`, `/roadmap`, `/support`, `/developers`, `/docs`, `/reference`; контентные модули `src/content/*`; локализация `src/i18n/*`; SEO meta, sitemap, OG images; `.well-known/security.txt`.
- Packages (MIT): `@rekurt/openkline-core`, `@rekurt/openkline-react`, `@rekurt/openkline-vue`.
- Жёсткие правила (должны соблюдаться на всём протяжении):
  - Никаких фейковых цифр и неподтверждённых claims.
  - Не писать `production-ready` без подтверждения статусом API, тестами и релизами.
  - Не писать `TradingView killer` / `TradingView replacement`; `TradingView-grade` — только с блоком доказательств.
  - Roadmap-фичи не показывать как уже готовые.
  - Без лого клиентов, кейсов, отзывов, если их нет.
  - Без внешней аналитики без отдельного решения владельца.
  - Donation / USDT / crypto-support убрать из основной воронки конверсии.
  - Публичный API движка не менять без отдельного design doc.
  - Единый source of truth для всех версий, чисел и статусов — без дублей данных.
  - Короткие формулировки в таблицах; все CTA ведут туда, куда обещают; все demo на реальном openkline, а не на скриншотах.
- Adopted from `openkline_todo.md` (generic task-list, 1221 строка, 17 секций). Порядок Task'ов следует §15 «Порядок реализации»; финальная проверка — Definition of Done из §16.

## Development Approach

- Testing approach: regular (исходник не требует строгого TDD).
- Полностью завершать каждый Task перед переходом к следующему (как предписывает §15).
- Обновлять этот план при изменении scope в ходе реализации.
- Не ломать существующие npm scripts; новые добавлять только при необходимости, без тяжёлой инфраструктуры.

## Testing Strategy

- Для каждого кода-изменяющего Task — соответствующие тесты, где это применимо для контентного/UI-сайта: unit для логики source-of-truth и строгой i18n-схемы; QA-проверки для UI и контента.
- После каждого Task прогонять сборку и доступные проверки проекта: `npm run build`, и если есть — `npm run lint`, `npm run typecheck`, `npm test`. Должны проходить перед началом следующего Task.
- Responsive / a11y / link / content QA — по чек-листам §14.

## Progress Tracking

- Отмечать выполненные пункты `[x]` сразу по завершении.
- Обновлять план, если реализация отклоняется от исходного scope.

## Technical Details

### Source of truth (§1)

- `src/content/project.ts` — name, license, packages, repos, install commands, contact URLs. Не хардкодить эти значения в компонентах.
- `src/content/metrics.ts` — version, tests, lintWarnings, coreSizeGzipKb, indicators, drawingTools, runtimeDependenciesCore. Значение, которое нельзя подтвердить, не публикуется как факт.
- `src/content/features.ts` — у каждой фичи есть статус и proof. `FeatureStatus = 'available' | 'experimental' | 'planned' | 'sponsored'`.
- `src/content/routes.ts` — определения маршрутов.
- Минимальный список фич: realtime, indicators, drawings, data transports, framework wrappers, state sharing, theming, keyboard/a11y, SSR recipes, benchmarks, alerts, replay mode, compare mode, workspaces, exchange adapters.

### Route structure (§3)

- Дерево: `/`, `/developers`, `/docs`, `/reference`, `/examples`, `/benchmarks`, `/roadmap`, `/support`, `/playground` — зеркально под `/ru`, `/sn`, `/zh`. Структура маршрутов одинакова для всех локалей.
- `sn` — требуемая локаль владельца; не заменять на `en` без подтверждения. Существующий `en` (если он есть) не удалять без явного решения владельца.

### Examples (§4)

- Дочерние маршруты: `/examples/realtime|indicators|drawings|state|theming|react|vue|ssr` (для каждой локали аналогично).
- Каждый пример: live chart, code block, copy button, link to docs, link to GitHub source, feature tags, работает на mobile, не показывает недоступные фичи.

### Playground (§5)

- Symbol / resolution / chart-type selectors, indicator toggles, drawing tools, theme switch, save/load state, share URL, copy current config as code, reset, error boundary.
- Acceptance: открывается по прямой ссылке; state в URL; copy code даёт рабочий snippet; без iframe; ошибки demo не ломают сайт; на mobile read-only или упрощённый editor.

### Benchmarks contract (§6)

- `src/content/benchmarks/{latest.json, history.json, methodology.md}`.
- Измерять: setData 10k/50k/100k, updateLastCandle, append, prependHistory, pan, zoom, crosshair move, indicator recompute, saveLayoutState, loadState.
- Метрики: p50, p95, p99, mean, min, max, memory, bundle gzip, browser, OS, device, package version, commit SHA, date.
- Page sections: 01 What is measured, 02 Dataset sizes, 03 Latest results, 04 Methodology, 05 Raw JSON, 06 History.
- Без фейковых чисел: честный empty state («Benchmark suite is being wired to CI. No published numbers yet.»); environment metadata + commit SHA на каждый результат; дата прогона; предупреждение об устаревании данных.

### Roadmap / feature status (§7)

- Секции: Available now / Experimental / Planned / Sponsored.
- Planned (если не готовы): alerts, replay mode, compare mode, workspaces, exchange adapters, volume profile, PNG/SVG export, custom indicator registry.
- Sponsored → CTA «Sponsor this feature». Без сроков и оценки ресурсов.

### Design docs (§8)

- Шаблон `docs/design/<feature-id>.md`: Problem / User stories / Public API / Internal architecture / Data model / Serialization / Error handling / Tests / Docs impact / Demo impact / Bundle size impact / Open questions.
- Обязательны для: alerts, replay-mode, compare-mode, workspaces, exchange-adapters, custom-indicators, export.

### Localization (§9)

- `src/i18n/{schema.ts, ru.ts, sn.ts, zh.ts}`. Язык в URL, canonical локализован, HTML `lang` соответствует текущей локали, missing translation ломает build или явно подсвечивается в dev.
- Перевести: navigation, hero, CTA, problem, built-for, feature pillars, examples, benchmarks, roadmap, support, FAQ, footer, SEO meta, OG text.

### SEO (§10)

- Per route + locale: title, description, canonical, og:title/description/url/image/image:alt, twitter:card/title/description/image.
- Hreflang: ru, sn, zh, x-default. Sitemap: все основные + locale routes + examples + benchmarks + roadmap + support.
- OG images `public/og/{ru,sn,zh,examples,benchmarks,roadmap}.png`: 1200×630, dark chart background, OpenKline logo, короткий slogan, proof strip, читаемый текст; не использовать только SVG logo.

### Brand tone (§11) → `docs/brand-tone.md`

- Разрешено: «No iframe rent.», «Own the chart runtime.», «Your data pipeline stays yours.», «Source is the contract.», «MIT means ship it.», «Realtime is not a plugin.», «Indicators are configs, not ceremony.», «Drawings stick to candles, not pixels.»
- Запрещено: «TradingView killer», «лучший график», enterprise-grade без доказательств, крипто-мемы, USDT в support-блоке, любой хайп без proof.
- Visual: сохранить dark canvas, grid, mono labels, ember accent, thin borders, terminal/code blocks, bull/bear только для market data; добавить stamps (NO IFRAME, MIT, ZERO DEPS, NO VENDOR LOCK), proof panels, benchmark cards, feature status tags, route-specific hero visuals.

### Hero и секции лендинга (§2)

- Hero: H1 + lede (одобренный RU-текст), proof strip только из подтверждённых данных, copy-install кнопка, GitHub CTA, live chart справа, mobile без поломок.
- CTA hero: [Потрогать live demo] [Скопировать npm install] [Документация] [GitHub] — каждый ведёт туда, куда обещает.
- Feature pillars по модели Claim → Proof → Demo/Docs.
- Comparison: проще, блоки «Use openkline when» / «Use something else when», footnotes для спорных сравнений, на mobile горизонтальный скролл.
- Commercial-support messaging вместо donation-first.

## Implementation Steps

### Task 1: Phase 1 — стабилизация фактов и сломанная конверсия

- [x] найти все хардкоды версии, метрик и install-команд в компонентах
- [x] создать единый source of truth: `src/content/project.ts`, `metrics.ts`, `features.ts` (+ `routes.ts`)
- [x] синхронизировать версии и метрики между сайтом, README и package metadata
- [x] привести claims по числу индикаторов и drawing tools к единой правде
- [x] исправить hero CTA: `Playground` → playground/live demo, `Docs` → docs
- [x] переписать hero (H1, lede, proof strip, copy-install, GitHub CTA, live chart справа, mobile без поломок, убрать неподтверждённые claims)
- [x] заменить footer-мем на professional-punk формулировку
- [x] убрать donation-first блок и crypto-донаты из основной воронки
- [x] написать тесты для source-of-truth модулей (project / metrics / features)
- [x] прогнать сборку и тесты проекта (`npm run build` + доступные lint/typecheck/test) — должны проходить перед следующим Task

### Task 2: Phase 2 — конверсия лендинга

- [x] добавить problem section (4 trade-off карточки, CTA «Сравнить варианты», без прямых атак на конкурентов, короткие формулировки)
- [x] добавить built-for section (карточки сегментов: боль + релевантные фичи + CTA на пример/docs; без «для всех»)
- [x] пересобрать feature pillars по модели Claim → Proof → Demo/Docs (Realtime, Indicators, Drawings, Data transports, Framework wrappers, State/theming/a11y)
- [x] переделать comparison: проще, блоки «Use openkline when» / «Use something else when», footnotes, mobile horizontal scroll, проверить claims по конкурентам
- [x] добавить commercial-support блок (CTA «Запросить integration review»), community-support оставить ниже
- [x] добавить FAQ (вопросы §13, короткие ответы без воды, planned-фичи помечать как planned)
- [x] добавить final CTA блок перед footer
- [x] провести responsive QA лендинга
- [x] написать/обновить тесты для новой/изменённой функциональности
- [x] прогнать сборку и тесты проекта — должны проходить перед следующим Task

### Task 3: Phase 3 — examples и playground

- [x] создать route `/examples` (gallery) и подключить локали
- [x] создать `/examples/realtime`, `/examples/indicators`, `/examples/drawings`, `/examples/state`
- [x] создать `/examples/theming`, `/examples/react`, `/examples/vue`, `/examples/ssr`
- [x] для каждого примера: live chart, code block, copy button, docs link, GitHub source link, feature tags, mobile, без недоступных фич
- [x] создать `/playground` (selectors, indicator toggles, drawing tools, theme, save/load/share state, copy config as code, reset, error boundary)
- [x] оставить embedded mini-demo на лендинге; подключить CTA с лендинга в examples/playground
- [x] проверить, что copy snippets дают рабочий код; playground без iframe и не ломает сайт при ошибках
- [x] написать тесты для логики examples/playground (где применимо)
- [x] прогнать сборку и тесты проекта — должны проходить перед следующим Task

### Task 4: Phase 4 — benchmarks

- [x] создать benchmark data contract: `src/content/benchmarks/{latest.json, history.json, methodology.md}`
- [x] создать route `/benchmarks` с секциями 01–06 (What is measured … History)
- [x] добавить честный empty state без фейковых чисел («Benchmark suite is being wired to CI…»)
- [x] добавить methodology и raw JSON link; показывать дату прогона и предупреждение об устаревании
- [x] требовать environment metadata + commit SHA на каждый результат
- [x] подготовить benchmark harness, если доступен engine repo; CI hook, если доступен CI
- [x] написать тесты для benchmark data contract / рендера (где применимо)
- [x] прогнать сборку и тесты проекта — должны проходить перед следующим Task

### Task 5: Phase 5 — roadmap и статусы фич

- [ ] создать route `/roadmap` с секциями Available now / Experimental / Planned / Sponsored
- [ ] подключить `features.ts`: статус каждой фичи, docs/example links для готовых, caveats для experimental
- [ ] для planned не показывать live CTA; для sponsored добавить CTA «Sponsor this feature»; без сроков и ресурсов
- [ ] убрать planned-фичи из основных claims и hero
- [ ] добавить design doc template `docs/design/<feature-id>.md` и зафиксировать список обязательных design docs
- [ ] написать тесты для маппинга статусов фич (где применимо)
- [ ] прогнать сборку и тесты проекта — должны проходить перед следующим Task

### Task 6: Phase 6 — локализация и SEO

- [ ] реализовать locale routes `ru / sn / zh` с единой структурой; язык в URL, canonical локализован, HTML `lang` корректен
- [ ] подтвердить у владельца, что `sn` — нужная локаль (иначе заменить на `en` per §17); существующий `en` не удалять без решения
- [ ] добавить locale dictionaries `src/i18n/{schema.ts, ru.ts, sn.ts, zh.ts}` со строгой схемой; missing translation ломает build / подсвечивается в dev
- [ ] перевести весь перечень контента (nav, hero, CTA, problem, built-for, pillars, examples, benchmarks, roadmap, support, FAQ, footer, SEO meta, OG text)
- [ ] добавить per route+locale meta (title/description/canonical/og:*/twitter:*) и hreflang (ru, sn, zh, x-default)
- [ ] обновить sitemap (все routes + locale + examples + benchmarks + roadmap + support)
- [ ] создать OG images `public/og/{ru,sn,zh,examples,benchmarks,roadmap}.png` (1200×630, dark chart bg, logo, slogan, proof strip)
- [ ] проверить language switcher и корректность locale switch links
- [ ] написать тесты для i18n-схемы и locale routing (где применимо)
- [ ] прогнать сборку и тесты проекта — должны проходить перед следующим Task

### Task 7: Phase 7 — support, security и финальное укрепление

- [ ] создать/переделать `/support` (Commercial / Community / Security / Contact); donation-options только вторичным блоком
- [ ] добавить security contact и `.well-known/security.txt` + тексты «no telemetry» / «no hosted runtime» / «your market data stays in your app»
- [ ] создать `docs/brand-tone.md` (разрешённые/запрещённые формулы, visual direction)
- [ ] прогнать responsive QA (1440 / 1024 / 768 / 390, dark/light, длинные code blocks, широкие таблицы, меню, switcher, copy buttons, playground)
- [ ] прогнать a11y QA (keyboard nav, focus states, aria labels, contrast, reduced motion, no keyboard traps, текст вокруг графиков)
- [ ] прогнать link QA (GitHub, Docs, Reference, Examples, Benchmarks, Roadmap, Support, mailto, Telegram, sitemap, locale switch)
- [ ] прогнать content QA (версии/метрики/числа синхронизированы, нет roadmap-фич в hero, нет fake benchmarks, нет неподтверждённых сравнений, нет crypto donation в воронке, footer в tone)
- [ ] подготовить PR summary и manual verification checklist
- [ ] написать/обновить тесты для изменённой функциональности
- [ ] прогнать сборку и тесты проекта — должны проходить перед следующим Task

### Task 8: Verify acceptance criteria

- [ ] verify all requirements from Overview are implemented (Definition of Done §16): лендинг продаёт за первые 10 секунд; понятно, для кого продукт и почему не iframe/hosted widget/generic chart; hero CTA корректны; есть working live demo; есть `/examples`, `/playground`, `/benchmarks`, `/roadmap`, `/support`; фичи имеют статусы; метрики имеют source of truth; нет противоречий сайт/docs/README; нет фейковых benchmarks и неподтверждённых claims; есть locale routes `ru / sn / zh`; есть SEO meta, hreflang, sitemap, нормальные OG images; есть professional commercial-support path; crypto donations вне основной воронки; footer в professional-punk tone; mobile работает; визуальный стиль сохранён
- [ ] run full project test suite (`npm run build` + `npm test` / lint / typecheck где доступны) — всё должно проходить
- [ ] run project linter — все проблемы должны быть исправлены

## Post-Completion

*Items requiring manual intervention - no checkboxes, informational only*

- Решение владельца по локали `sn` vs `en` (§17) — продуктовое подтверждение вне автоматизации.
- Решение владельца по внешней аналитике — по умолчанию не подключать (§ Жёсткие правила).
- Любое изменение публичного API движка — только через отдельный design doc (§8), вне рамок этого плана.
- Реальные benchmark numbers публикуются только после фактического прогона harness/CI; до этого — честный empty state.
- Live demo и examples используют реальный openkline (не скриншоты); требуется доступ к рабочему движку/данным.
