import { useEffect, useMemo, useRef, useState } from 'react';
import './docs.css';
import { Badge } from '../components/Badge.jsx';
import { Kbd } from '../components/Kbd.jsx';
import { CodeBlock } from '../components/CodeBlock.jsx';
import { DemoChart } from '../components/DemoChart.jsx';
import { Link, navigate } from '../router.jsx';
import { DOCS_NAV, S, API, KIND_COLOR, OVERLAYS, SUBPANES, TOOLS, KEYS } from '../docs/content.js';

const FLAT = DOCS_NAV.flatMap((g) => g.items);

function jumpTo(id) {
  const el = document.getElementById('sec-' + id);
  if (!el) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: Math.max(0, el.offsetTop - 84), behavior: reduced ? 'auto' : 'smooth' });
  try {
    window.history.replaceState(null, '', '/docs#' + id);
  } catch {
    /* ignore */
  }
}

function TopBar({ onSearch }) {
  return (
    <header className="dx-topbar">
      <div className="shell dx-topbar-in">
        <Link to="docs" className="dx-brand">
          <img src="/logo-mark.svg" width="26" height="26" alt="" />
          <span className="name">openkline</span>
          <span className="path">/ docs</span>
        </Link>
        <div className="dx-badges">
          <Badge>v0.1.0</Badge>
          <Badge tone="ember">MIT</Badge>
        </div>
        <button type="button" className="dx-searchbtn" onClick={onSearch}>
          <span>Search the docs</span>
          <span className="keys"><Kbd>⌘</Kbd><Kbd>K</Kbd></span>
        </button>
        <nav className="dx-toplinks">
          <Link to="reference">reference</Link>
          <Link to="product">site</Link>
          <a href="https://github.com/rekurt/openkline" target="_blank" rel="noreferrer">github →</a>
        </nav>
      </div>
    </header>
  );
}

function SideNav({ active }) {
  return (
    <nav className="dx-nav" aria-label="Documentation sections">
      {DOCS_NAV.map((g) => (
        <div className="dx-navgroup" key={g.group}>
          <span className="g">{g.group}</span>
          {g.items.map((it) => (
            <a
              key={it.id}
              className={'dx-navlink' + (active === it.id ? ' on' : '')}
              href={'/docs#' + it.id}
              onClick={(e) => { e.preventDefault(); jumpTo(it.id); }}
            >
              <span>{it.title}</span>
              <span className="n">{it.num}</span>
            </a>
          ))}
        </div>
      ))}
    </nav>
  );
}

function SearchPalette({ onClose }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const items = useMemo(() => {
    const idx = [];
    FLAT.forEach((it) => idx.push({ kind: 'section', id: it.id, label: it.title, sub: 'docs' }));
    API.forEach((a) => idx.push({ kind: a.kind, id: 'api', label: a.name, sub: a.desc }));
    const t = q.trim().toLowerCase();
    const hit = t ? idx.filter((i) => (i.label + ' ' + i.sub).toLowerCase().includes(t)) : idx;
    return hit.slice(0, 12);
  }, [q]);

  const pick = (item) => {
    if (item) jumpTo(item.id);
    onClose();
  };
  const onKey = (e) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, items.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    else if (e.key === 'Enter') pick(items[sel]);
  };

  return (
    <div className="dx-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="dx-palette" role="dialog" aria-label="Search the docs">
        <input
          ref={inputRef}
          value={q}
          placeholder="Sections, methods, options…"
          onChange={(e) => { setQ(e.target.value); setSel(0); }}
          onKeyDown={onKey}
        />
        <div className="res">
          {items.map((it, i) => (
            <div
              key={it.label + i}
              className={'dx-resitem' + (i === sel ? ' sel' : '')}
              onMouseEnter={() => setSel(i)}
              onClick={() => pick(it)}
            >
              <span className="k">{it.kind}</span>
              <span className="l">{it.label}</span>
              <span className="s">{it.sub}</span>
            </div>
          ))}
          {items.length === 0 ? (
            <div className="dx-resitem"><span className="k">—</span><span className="s">No matches.</span></div>
          ) : null}
        </div>
        <div className="dx-palette-foot">
          <span>↑↓ move</span>·<span>↵ open</span>·<span>esc close</span>
        </div>
      </div>
    </div>
  );
}

function Sec({ id, num, title, children }) {
  const meta = FLAT.find((s) => s.id === id);
  return (
    <section className="dx-sec" id={'sec-' + id}>
      <div className="dx-sec-head">
        <span className="num">{num || (meta && meta.num)}</span>
        <h2>{title || (meta && meta.title)}</h2>
      </div>
      {children}
    </section>
  );
}

export function DocsPage() {
  const [active, setActive] = useState(FLAT[0].id);
  const [searchOpen, setSearchOpen] = useState(false);

  // scrollspy
  useEffect(() => {
    const onScroll = () => {
      let cur = FLAT[0].id;
      for (const it of FLAT) {
        const el = document.getElementById('sec-' + it.id);
        if (el && el.offsetTop - 130 <= window.scrollY) cur = it.id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ⌘K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((s) => !s);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // deep link /docs#section on first mount
  useEffect(() => {
    const h = window.location.hash.replace('#', '');
    if (h && FLAT.some((s) => s.id === h)) {
      setTimeout(() => jumpTo(h), 60);
    }
  }, []);

  return (
    <div className="dx">
      <TopBar onSearch={() => setSearchOpen(true)} />
      <div className="shell dx-shell">
        <SideNav active={active} />
        <main className="dx-main">
          <Sec id="overview">
            <p className="dx-lede">
              openkline (<code>@rekurt/openkline-core</code>) is a TradingView-grade OHLCV charting engine:
              open source, MIT, framework-agnostic. One pure-TypeScript core with thin React and Vue wrappers
              at full API parity. Every demo on this page is the engine running live.
            </p>
            <DemoChart seed={11} indicators={['sma20', 'ema50']} height={320} />
            <div className="dx-cards">
              <Link to="docs" hash="quickstart" className="dx-card"><span className="k">01</span><b>Quick start</b><p>Five lines to the first candle.</p></Link>
              <Link to="docs" hash="live-data" className="dx-card"><span className="k">03</span><b>Live data</b><p>Implement a transport, go realtime.</p></Link>
              <Link to="reference" className="dx-card"><span className="k">api</span><b>Reference</b><p>Every method, option and type.</p></Link>
            </div>
          </Sec>

          <Sec id="quickstart">
            <p className="dx-lede">Install the core, mount a chart, push data. The wrappers add nothing but idiomatic bindings.</p>
            <CodeBlock prompt size="sm" copy copyText={S.install}>{S.install}</CodeBlock>
            <div className="dx-grid2">
              <CodeBlock title="vanilla.ts">{S.vanilla}</CodeBlock>
              <DemoChart seed={3} indicators={['sma20']} height={260} toggles={false} />
            </div>
            <div className="dx-tabs2">
              <CodeBlock title="App.tsx — React">{S.react}</CodeBlock>
              <CodeBlock title="App.vue — Vue 3">{S.vue}</CodeBlock>
            </div>
          </Sec>

          <Sec id="ssr">
            <p className="dx-lede">The engine is a client-only canvas. Mount it after hydration — never on the server.</p>
            <div className="dx-tabs2">
              <CodeBlock title="Next.js">{S.next}</CodeBlock>
              <CodeBlock title="Nuxt">{S.nuxt}</CodeBlock>
            </div>
          </Sec>

          <Sec id="live-data">
            <p className="dx-lede">
              Implement <code>DataTransport</code> and you are live. <code>DataFeed</code> guards against stale
              responses with a version counter; reconnects use jittered exponential backoff; errors flow through
              <code> onError</code>, never a silent catch.
            </p>
            <CodeBlock title="transport.ts">{S.transport}</CodeBlock>
            <CodeBlock title="infinite history">{S.prepend}</CodeBlock>
          </Sec>

          <Sec id="indicators">
            <p className="dx-lede">
              Indicators are config objects, not class instances — pass an array, the core diffs and reconciles.
              Toggle them live below.
            </p>
            <DemoChart seed={21} indicators={['sma20', 'ema50', 'bb']} height={320} />
            <CodeBlock title="indicators.ts">{S.indicators}</CodeBlock>
            <div className="dx-catalog">
              <div className="dx-catgroup">
                <span className="k">overlays — main pane</span>
                <div className="dx-chips">{OVERLAYS.map((n) => <span className="dx-chip" key={n}><span className="dot" style={{ background: 'var(--ind-1)' }}></span>{n}</span>)}</div>
              </div>
              <div className="dx-catgroup">
                <span className="k">sub-pane — own y-axis</span>
                <div className="dx-chips">{SUBPANES.map((n) => <span className="dx-chip" key={n}><span className="dot" style={{ background: 'var(--ind-2)' }}></span>{n}</span>)}</div>
              </div>
            </div>
          </Sec>

          <Sec id="drawings">
            <p className="dx-lede">
              Nine anchored tools. Drawings live in buffer space — they stick to their candles through pan and zoom.
            </p>
            <CodeBlock title="drawing.ts">{S.drawing}</CodeBlock>
            <div className="dx-chips">{TOOLS.map((n) => <span className="dx-chip" key={n}><span className="dot" style={{ background: 'var(--ember)' }}></span>{n}</span>)}</div>
          </Sec>

          <Sec id="theming">
            <p className="dx-lede">
              Three built-in modes or a full <code>ThemeColors</code> object. Toggle the site theme (top-right) and
              every chart on this page repaints instantly.
            </p>
            <DemoChart seed={42} indicators={['vwap']} height={260} toggles={false} />
            <div className="dx-tabs2">
              <CodeBlock title="modes">{S.themeModes}</CodeBlock>
              <CodeBlock title="custom-theme.ts">{S.themeCustom}</CodeBlock>
            </div>
            <CodeBlock title="formatting">{S.format}</CodeBlock>
          </Sec>

          <Sec id="state">
            <p className="dx-lede">
              <code>saveLayoutState()</code> serializes symbol, resolution, theme, indicators and drawings into a
              compact object. <code>loadState</code> validates untrusted input and migrates old schemas — shared
              links keep working after upgrades.
            </p>
            <CodeBlock title="share.ts">{S.persist}</CodeBlock>
          </Sec>

          <Sec id="performance">
            <p className="dx-lede">
              A <code>Float64Array</code> ring buffer, O(1) <code>append</code>/<code>updateLast</code>, RAF-coalesced
              ticks and a three-layer canvas. Page in history on the left edge; cap memory with <code>maxCandles</code>.
            </p>
            <CodeBlock title="gaps.ts">{S.gaps}</CodeBlock>
          </Sec>

          <Sec id="api">
            <p className="dx-lede">The essentials. The full surface — every type, option and parameter — lives in the <Link to="reference" className="dx-inline">reference</Link>.</p>
            <div className="dx-api">
              {API.slice(0, 12).map((a) => (
                <div className="dx-apirow" key={a.name}>
                  <span className="kind" style={{ color: KIND_COLOR[a.kind] }}>{a.kind}</span>
                  <code className="name">{a.name}</code>
                  <code className="sig">{a.sig}</code>
                  <p className="desc">{a.desc}</p>
                </div>
              ))}
            </div>
            <button type="button" className="ok-btn ok-btn--ember" onClick={() => navigate('reference')}>Full API reference →</button>
          </Sec>

          <Sec id="shortcuts">
            <p className="dx-lede">Full chart control without a mouse. <Badge tone="bull">a11y</Badge></p>
            <table className="dx-keys">
              <tbody>
                {KEYS.map((k) => (
                  <tr key={k.does}>
                    <td>{k.keys.map((key) => <Kbd key={key}>{key}</Kbd>)}</td>
                    <td>{k.does}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Sec>

          <footer className="dx-foot">
            MIT · openkline 0.1.0 · one maintainer, 440+ tests · every demo here runs on the engine's own primitives
          </footer>
        </main>
      </div>
      {searchOpen ? <SearchPalette onClose={() => setSearchOpen(false)} /> : null}
    </div>
  );
}
