import { useI18n } from '../i18n/index.jsx';
import { Link } from '../router.jsx';
import {
  BENCHMARK_LATEST,
  BENCHMARK_HISTORY,
  BENCHMARK_OPERATIONS,
  BENCHMARK_DATASETS,
  RESULT_FIELDS,
  hasResults,
  isStale,
} from '../content/benchmarks.js';

function EmptyState({ t }) {
  return (
    <div className="bench-empty">
      <div className="bench-empty-icon" aria-hidden="true">⏳</div>
      <p className="bench-empty-msg">{t.benchmarks.emptyState}</p>
      <p className="bench-empty-sub">{t.benchmarks.emptySub}</p>
    </div>
  );
}

function StaleWarning({ date, t }) {
  if (!date || !isStale(date)) return null;
  return (
    <div className="bench-stale" role="alert">
      {t.benchmarks.staleWarning}
    </div>
  );
}

function EnvironmentMeta({ env, commitSha, packageVersion, date, t }) {
  if (!env) return null;
  return (
    <dl className="bench-env">
      <dt>{t.benchmarks.envBrowser}</dt><dd>{env.browser}</dd>
      <dt>{t.benchmarks.envOs}</dt><dd>{env.os}</dd>
      <dt>{t.benchmarks.envDevice}</dt><dd>{env.device}</dd>
      <dt>{t.benchmarks.envVersion}</dt><dd>{packageVersion}</dd>
      <dt>{t.benchmarks.envCommit}</dt><dd><code>{commitSha}</code></dd>
      <dt>{t.benchmarks.envDate}</dt><dd>{date}</dd>
    </dl>
  );
}

function ResultsTable({ results, t }) {
  if (!results || results.length === 0) return null;
  return (
    <div className="bench-table-wrap">
      <table className="bench-table">
        <thead>
          <tr>
            <th>{t.benchmarks.colOperation}</th>
            {RESULT_FIELDS.map((f) => (
              <th key={f}>{f}</th>
            ))}
            <th>{t.benchmarks.colMemory}</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.operation}>
              <td className="bench-op">{r.operation}</td>
              {RESULT_FIELDS.map((f) => (
                <td key={f}>{typeof r[f] === 'number' ? `${r[f].toFixed(2)} ms` : '—'}</td>
              ))}
              <td>{r.memoryDeltaBytes != null ? `${(r.memoryDeltaBytes / 1024).toFixed(0)} KB` : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function BenchmarksPage() {
  const { t } = useI18n();
  const published = hasResults();
  const latest = BENCHMARK_LATEST;
  const history = BENCHMARK_HISTORY;

  return (
    <article className="bench-page">
      <header className="bench-header">
        <span className="seclabel">{t.benchmarks.label}</span>
        <h1>{t.benchmarks.h1}</h1>
        <p className="bench-lede">{t.benchmarks.lede}</p>
      </header>

      {/* 01 — What is measured */}
      <section className="bench-section">
        <span className="seclabel">{t.benchmarks.s01Label}</span>
        <h2>{t.benchmarks.s01H2}</h2>
        <p>{t.benchmarks.s01Lede}</p>
        <div className="bench-ops">
          {BENCHMARK_OPERATIONS.map((op) => (
            <div key={op.id} className="bench-op-card">
              <code>{op.label}</code>
              {op.datasetSize != null && (
                <span className="bench-op-size">{(op.datasetSize / 1000).toFixed(0)}k candles</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 02 — Dataset sizes */}
      <section className="bench-section">
        <span className="seclabel">{t.benchmarks.s02Label}</span>
        <h2>{t.benchmarks.s02H2}</h2>
        <div className="bench-datasets">
          {BENCHMARK_DATASETS.map((ds) => (
            <div key={ds.label} className="bench-ds-card">
              <span className="bench-ds-count">{ds.count.toLocaleString()}</span>
              <span className="bench-ds-label">{ds.label}</span>
              <span className="bench-ds-desc">{ds.description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 03 — Latest results */}
      <section className="bench-section">
        <span className="seclabel">{t.benchmarks.s03Label}</span>
        <h2>{t.benchmarks.s03H2}</h2>
        {published ? (
          <>
            <StaleWarning date={latest.date} t={t} />
            <EnvironmentMeta
              env={latest.environment}
              commitSha={latest.commitSha}
              packageVersion={latest.packageVersion}
              date={latest.date}
              t={t}
            />
            <ResultsTable results={latest.results} t={t} />
          </>
        ) : (
          <EmptyState t={t} />
        )}
      </section>

      {/* 04 — Methodology */}
      <section className="bench-section">
        <span className="seclabel">{t.benchmarks.s04Label}</span>
        <h2>{t.benchmarks.s04H2}</h2>
        <p>{t.benchmarks.s04Lede}</p>
        <ul className="bench-method-list">
          <li>{t.benchmarks.methWarmup}</li>
          <li>{t.benchmarks.methIsolation}</li>
          <li>{t.benchmarks.methPercentiles}</li>
          <li>{t.benchmarks.methEnv}</li>
          <li>{t.benchmarks.methReproducible}</li>
        </ul>
      </section>

      {/* 05 — Raw JSON */}
      <section className="bench-section">
        <span className="seclabel">{t.benchmarks.s05Label}</span>
        <h2>{t.benchmarks.s05H2}</h2>
        <p>{t.benchmarks.s05Lede}</p>
        <details className="bench-raw">
          <summary>{t.benchmarks.rawToggle}</summary>
          <pre><code>{JSON.stringify(latest, null, 2)}</code></pre>
        </details>
      </section>

      {/* 06 — History */}
      <section className="bench-section">
        <span className="seclabel">{t.benchmarks.s06Label}</span>
        <h2>{t.benchmarks.s06H2}</h2>
        {history.runs.length > 0 ? (
          <p>{t.benchmarks.s06HasData}</p>
        ) : (
          <p className="bench-empty-msg">{t.benchmarks.s06Empty}</p>
        )}
      </section>

      {/* CTA */}
      <section className="bench-cta">
        <h2>{t.benchmarks.ctaH2}</h2>
        <p>{t.benchmarks.ctaLede}</p>
        <div className="bench-cta-actions">
          <Link to="playground" className="btn">{t.benchmarks.ctaPlayground}</Link>
          <Link to="docs" className="btn btn-outline">{t.benchmarks.ctaDocs}</Link>
        </div>
      </section>
    </article>
  );
}
