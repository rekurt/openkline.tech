import './docs.css';
import { Badge } from '../components/Badge.jsx';
import { Link } from '../router.jsx';
import { useMetrics } from '../lib/useMetrics.jsx';
import { API, KIND_COLOR, OVERLAYS, SUBPANES, TOOLS } from '../docs/content.js';

const GROUPS = [
  { kind: 'constructor', title: 'Constructor' },
  { kind: 'method', title: 'Methods' },
  { kind: 'option', title: 'Options' },
  { kind: 'helper', title: 'Helpers' },
  { kind: 'interface', title: 'Interfaces' },
];

export function ReferencePage() {
  const { metrics } = useMetrics();
  return (
    <div className="dx">
      <header className="dx-topbar">
        <div className="shell dx-topbar-in">
          <Link to="docs" className="dx-brand">
            <img src="/logo-mark.svg" width="26" height="26" alt="" />
            <span className="name">openkline</span>
            <span className="path">/ reference</span>
          </Link>
          <div className="dx-badges">
            <Badge>v{metrics.version}</Badge>
            <Badge tone="ember">MIT</Badge>
          </div>
          <nav className="dx-toplinks">
            <Link to="docs">docs</Link>
            <Link to="product">site</Link>
            <a href="https://github.com/rekurt/openkline" target="_blank" rel="noreferrer">source →</a>
          </nav>
        </div>
      </header>

      <div className="shell dx-ref">
        <div className="dx-ref-head">
          <div className="seclabel">api reference</div>
          <h1>Every method, option and type</h1>
          <p className="dx-lede">
            The complete public surface of <code>@rekurt/openkline-core</code>. For exhaustive TypeDoc — generated from
            the source — see the <a href="https://github.com/rekurt/openkline" target="_blank" rel="noreferrer" className="dx-inline">engine source</a>.
            New here? Start with the <Link to="docs" className="dx-inline">guides</Link>.
          </p>
        </div>

        {GROUPS.map((g) => {
          const rows = API.filter((a) => a.kind === g.kind);
          if (!rows.length) return null;
          return (
            <section className="dx-ref-group" key={g.kind}>
              <h2><span className="dot" style={{ background: KIND_COLOR[g.kind] }}></span>{g.title}</h2>
              <div className="dx-api">
                {rows.map((a) => (
                  <div className="dx-apirow" key={a.name}>
                    <span className="kind" style={{ color: KIND_COLOR[a.kind] }}>{a.kind}</span>
                    <code className="name">{a.name}</code>
                    <code className="sig">{a.sig}</code>
                    <p className="desc">{a.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <section className="dx-ref-group">
          <h2><span className="dot" style={{ background: 'var(--ind-1)' }}></span>Indicator catalog</h2>
          <div className="dx-catgroup">
            <span className="k">overlays — main pane</span>
            <div className="dx-chips">{OVERLAYS.map((n) => <span className="dx-chip" key={n}><span className="dot" style={{ background: 'var(--ind-1)' }}></span>{n}</span>)}</div>
          </div>
          <div className="dx-catgroup">
            <span className="k">sub-pane — own y-axis</span>
            <div className="dx-chips">{SUBPANES.map((n) => <span className="dx-chip" key={n}><span className="dot" style={{ background: 'var(--ind-2)' }}></span>{n}</span>)}</div>
          </div>
          <div className="dx-catgroup">
            <span className="k">drawing tools</span>
            <div className="dx-chips">{TOOLS.map((n) => <span className="dx-chip" key={n}><span className="dot" style={{ background: 'var(--ember)' }}></span>{n}</span>)}</div>
          </div>
        </section>

        <footer className="dx-foot">
          MIT · openkline {metrics.version} · <Link to="docs" className="dx-inline">back to docs</Link> · <Link to="product" className="dx-inline">back to site</Link>
        </footer>
      </div>
    </div>
  );
}
