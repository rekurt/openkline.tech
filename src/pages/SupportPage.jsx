import { useI18n } from '../i18n/index.jsx';
import { Link } from '../router.jsx';
import { PROJECT } from '../content/project.js';

export function SupportPage() {
  const { t } = useI18n();
  const s = t.support;

  return (
    <article className="sp-page">
      <header className="sp-header">
        <span className="seclabel">{s.label}</span>
        <h1>{s.h1}</h1>
        <p className="sp-lede">{s.lede}</p>
      </header>

      {/* Commercial support */}
      <section className="sp-section">
        <h2>{s.commercial.h2}</h2>
        <p>{s.commercial.lede}</p>
        <ul className="sp-features">
          {s.commercial.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
        <a
          href={`mailto:${PROJECT.contacts.email}?subject=openkline%20integration%20review`}
          className="ok-btn ok-btn--ember"
        >
          {s.commercial.cta}
        </a>
      </section>

      {/* Community */}
      <section className="sp-section">
        <h2>{s.community.h2}</h2>
        <p>{s.community.lede}</p>
        <div className="sp-community-links">
          <a href={PROJECT.urls.issues} target="_blank" rel="noreferrer" className="ok-btn">
            {s.community.github}
          </a>
          <a href={PROJECT.contacts.telegramUrl} target="_blank" rel="noreferrer" className="ok-btn">
            {s.community.telegram}
          </a>
        </div>
      </section>

      {/* Security */}
      <section className="sp-section">
        <h2>{s.security.h2}</h2>
        <p>{s.security.lede}</p>
        <a
          href={`mailto:${PROJECT.contacts.email}?subject=openkline%20security%20report`}
          className="ok-btn"
        >
          {s.security.email}
        </a>
        <p className="sp-pgp">{s.security.pgp}</p>
        <ul className="sp-promises">
          {s.security.promises.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section className="sp-section">
        <h2>{s.contact.h2}</h2>
        <div className="sp-contacts">
          <a className="sp-contact" href={`mailto:${PROJECT.contacts.email}`}>
            <span className="k">{s.contact.email.k}</span>
            <span className="v">{PROJECT.contacts.email}</span>
            <span className="d">{s.contact.email.d}</span>
          </a>
          <a className="sp-contact" href={PROJECT.contacts.githubProfile} target="_blank" rel="noreferrer">
            <span className="k">{s.contact.github.k}</span>
            <span className="v"><span className="at">github.com/</span>{PROJECT.repoOrg}</span>
            <span className="d">{s.contact.github.d}</span>
          </a>
          <a className="sp-contact" href={PROJECT.contacts.telegramUrl} target="_blank" rel="noreferrer">
            <span className="k">{s.contact.telegram.k}</span>
            <span className="v">{PROJECT.contacts.telegram}</span>
            <span className="d">{s.contact.telegram.d}</span>
          </a>
        </div>
      </section>

      {/* Donate — secondary block */}
      <section className="sp-section sp-donate">
        <h2>{s.donate.h2}</h2>
        <p>{s.donate.lede}</p>
        <a href={PROJECT.urls.sponsors} target="_blank" rel="noreferrer" className="ok-btn">
          {s.donate.cta}
        </a>
      </section>

      {/* CTA */}
      <section className="sp-cta">
        <h2>{s.ctaH2}</h2>
        <p>{s.ctaLede}</p>
        <div className="sp-cta-actions">
          <Link to="playground" className="ok-btn ok-btn--ember">{s.ctaPlayground}</Link>
          <Link to="docs" className="ok-btn">{s.ctaDocs}</Link>
        </div>
      </section>
    </article>
  );
}
