import { useI18n } from '../i18n/index.jsx';
import { Link } from '../router.jsx';
import { FEATURES, featuresByStatus, STATUS_ORDER } from '../content/features.js';
import { PROJECT } from '../content/project.js';

function StatusBadge({ status, t }) {
  const labels = t.roadmap.statusLabels;
  return <span className={`rm-badge rm-badge--${status}`}>{labels[status]}</span>;
}

function FeatureCard({ feature, t }) {
  const labels = t.roadmap;
  return (
    <div className="rm-card">
      <div className="rm-card-head">
        <code className="rm-card-id">{feature.id}</code>
        <StatusBadge status={feature.status} t={t} />
      </div>
      {feature.proof && <p className="rm-card-proof">{feature.proof}</p>}
      <div className="rm-card-links">
        {feature.docs && <a href={feature.docs}>{labels.docsLink}</a>}
        {feature.example && <Link to={`examples/${feature.id}`}>{labels.exampleLink}</Link>}
        {feature.status === 'sponsored' && (
          <a href={`mailto:${PROJECT.contacts.email}?subject=Sponsor: ${feature.id}`} className="btn btn-sm">
            {labels.sponsorCta}
          </a>
        )}
      </div>
    </div>
  );
}

function StatusSection({ status, features, t }) {
  if (features.length === 0) return null;
  const section = t.roadmap.sections[status];
  return (
    <section className="rm-section">
      <h2>{section.h2}</h2>
      <p className="rm-section-lede">{section.lede}</p>
      <div className="rm-grid">
        {features.map((f) => (
          <FeatureCard key={f.id} feature={f} t={t} />
        ))}
      </div>
    </section>
  );
}

export function RoadmapPage() {
  const { t } = useI18n();

  return (
    <article className="rm-page">
      <header className="rm-header">
        <span className="seclabel">{t.roadmap.label}</span>
        <h1>{t.roadmap.h1}</h1>
        <p className="rm-lede">{t.roadmap.lede}</p>
        <p className="rm-disclaimer">{t.roadmap.disclaimer}</p>
      </header>

      {STATUS_ORDER.map((status) => {
        const features = featuresByStatus(status);
        return <StatusSection key={status} status={status} features={features} t={t} />;
      })}

      <section className="rm-design-docs">
        <h2>{t.roadmap.designDocs.h2}</h2>
        <p>{t.roadmap.designDocs.lede}</p>
        <ul className="rm-dd-list">
          {t.roadmap.designDocs.required.map((id) => (
            <li key={id}><code>{id}</code></li>
          ))}
        </ul>
        <p className="rm-dd-note">{t.roadmap.designDocs.note}</p>
      </section>

      <section className="rm-cta">
        <h2>{t.roadmap.ctaH2}</h2>
        <p>{t.roadmap.ctaLede}</p>
        <div className="rm-cta-actions">
          <Link to="playground" className="btn">{t.roadmap.ctaPlayground}</Link>
          <Link to="docs" className="btn btn-outline">{t.roadmap.ctaDocs}</Link>
        </div>
      </section>
    </article>
  );
}
