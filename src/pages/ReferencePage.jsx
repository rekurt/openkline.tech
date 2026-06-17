import './docs.css';
import { Link } from '../router.jsx';
import { CodeBlock } from '../components/CodeBlock.jsx';
import { useMetrics } from '../lib/useMetrics.jsx';
import { API, KIND_COLOR, OVERLAYS, SUBPANES, TOOLS } from '../docs/content.js';

const GROUPS = [
  { kind: 'constructor', title: 'Constructor' },
  { kind: 'method', title: 'Methods' },
  { kind: 'option', title: 'Options' },
  { kind: 'helper', title: 'Helpers' },
  { kind: 'interface', title: 'Interfaces' },
];

// One API entry rendered as a teaching block: signature, parameter table,
// return value, a runnable example, a note and cross-links.
function ApiEntry({ a }) {
  return (
    <article className="dx-api-entry" id={a.anchor ? `api-${a.anchor}` : undefined}>
      <div className="dx-api-entry-head">
        <span className="kind" style={{ color: KIND_COLOR[a.kind] }}>{a.kind}</span>
        <code className="name">{a.name}</code>
        {a.anchor ? (
          <a className="dx-anchor" href={`#api-${a.anchor}`} aria-label={`Link to ${a.name}`}>#</a>
        ) : null}
      </div>
      <code className="dx-api-sig">{a.sig}</code>
      {a.desc ? <p className="dx-api-desc">{a.desc}</p> : null}

      {a.params?.length ? (
        <table className="dx-params">
          <thead>
            <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            {a.params.map((p) => (
              <tr key={p.name}>
                <td><code>{p.name}</code>{p.required ? <span className="req" title="required">*</span> : null}</td>
                <td><code className="ty">{p.type}</code></td>
                <td>{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      {a.returns ? (
        <p className="dx-returns"><span className="lbl">Returns</span> <code className="ty">{a.returns.type}</code>{a.returns.desc ? <> — {a.returns.desc}</> : null}</p>
      ) : null}

      {a.example ? <CodeBlock size="sm" copy title="example">{a.example}</CodeBlock> : null}

      {a.notes ? <p className="dx-note">{a.notes}</p> : null}

      {a.seeAlso?.length ? (
        <p className="dx-seealso"><span className="lbl">See also</span>{a.seeAlso.map((s) => (
          <a key={s} href={`#api-${s}`}><code>{s}</code></a>
        ))}</p>
      ) : null}
    </article>
  );
}

export function ReferencePage() {
  const { metrics } = useMetrics();
  return (
    <div className="dx">
      <div className="shell dx-ref">
        <div className="dx-ref-head">
          <div className="seclabel">api reference</div>
          <h1>Every method, option and type</h1>
          <p className="dx-lede">
            The complete public surface of <code>@rekurt/openkline-core</code> — with parameters, return values
            and copy-paste examples. For exhaustive TypeDoc generated from the source, see the{' '}
            <a href="https://github.com/rekurt/openkline" target="_blank" rel="noreferrer" className="dx-inline">engine source</a>.
            New here? Start with the <Link to="docs" className="dx-inline">guides</Link>.
          </p>
        </div>

        {GROUPS.map((g) => {
          const rows = API.filter((a) => a.kind === g.kind);
          if (!rows.length) return null;
          return (
            <section className="dx-ref-group" key={g.kind}>
              <h2><span className="dot" style={{ background: KIND_COLOR[g.kind] }}></span>{g.title}</h2>
              <div className="dx-api-entries">
                {rows.map((a) => <ApiEntry key={a.name} a={a} />)}
              </div>
            </section>
          );
        })}

        <section className="dx-ref-group">
          <h2><span className="dot" style={{ background: 'var(--ind-1)' }}></span>Indicator &amp; tool catalog</h2>
          <div className="dx-catgroup">
            <span className="k">overlays — main pane</span>
            <div className="dx-chips">{OVERLAYS.map((n) => <span className="dx-chip" key={n}><span className="dot" style={{ background: 'var(--ind-1)' }}></span>{n}</span>)}</div>
          </div>
          <div className="dx-catgroup">
            <span className="k">sub-pane — own y-axis</span>
            <div className="dx-chips">{SUBPANES.map((n) => <span className="dx-chip" key={n}><span className="dot" style={{ background: 'var(--ind-2)' }}></span>{n}</span>)}</div>
          </div>
          <div className="dx-catgroup">
            <span className="k">drawing tools — anchored in buffer space</span>
            <div className="dx-chips">{TOOLS.map((n) => <span className="dx-chip" key={n}><span className="dot" style={{ background: 'var(--ember)' }}></span>{n}</span>)}</div>
          </div>
        </section>

        <p className="dx-foot">openkline {metrics.version} · the full TypeDoc lives in the <Link to="docs" className="dx-inline">guides</Link></p>
      </div>
    </div>
  );
}
