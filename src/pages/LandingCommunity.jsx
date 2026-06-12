import { Button } from '../components/Button.jsx';
import { useI18n } from '../i18n/index.jsx';
import { Link } from '../router.jsx';

/* Card order matches t.community.docs.cards in every dictionary. Each one now
   lands on a real destination — the in-app docs/reference or the repo. */
const DOC_TARGETS = [
  { to: 'docs', hash: 'quickstart' },
  { to: 'docs', hash: 'ssr' },
  { to: 'docs', hash: 'performance' },
  { to: 'docs', hash: 'theming' },
  { to: 'docs', hash: 'live-data' },
  { to: 'reference' },
  { to: 'docs', hash: 'indicators' },
  { to: 'docs', hash: 'drawings' },
  { href: 'https://github.com/rekurt/openkline/releases' },
];

/**
 * Shared bottom of the openkline landing: documentation grid, support
 * (donate / order a feature / suggest), contacts. Rendered on both pages.
 */
export function LandingCommunity() {
  const { t } = useI18n();
  const c = t.community;
  return (
    <div>
      <section id="docs" data-num="docs">
        <div className="seclabel">{c.docs.label}</div>
        <h2>{c.docs.h2}</h2>
        <p className="sectionLede">{c.docs.lede}</p>
        <div className="tl-docs">
          {c.docs.cards.map((card, i) => {
            const tgt = DOC_TARGETS[i];
            const inner = (
              <>
                <span className="k">{card.k}</span>
                <span className="t">{card.t} <span className="arr">→</span></span>
                <p className="d">{card.d}</p>
              </>
            );
            return tgt.href ? (
              <a className="tl-doc" key={i} href={tgt.href} target="_blank" rel="noreferrer">{inner}</a>
            ) : (
              <Link className="tl-doc" key={i} to={tgt.to} hash={tgt.hash}>{inner}</Link>
            );
          })}
        </div>
      </section>

      <section id="support" data-num="fund">
        <div className="seclabel">{c.support.label}</div>
        <h2>{c.support.h2}</h2>
        <p className="sectionLede">{c.support.lede}</p>
        <div className="tl-support">
          <div className="tl-sup">
            <span className="k">{c.support.donate.k}</span>
            <h3>{c.support.donate.h}</h3>
            <p>{c.support.donate.p}</p>
            <div className="tl-wallet">
              <span className="net">USDT · TRC-20</span>
              <span>{c.support.donate.wallet}</span>
            </div>
            <div className="act">
              <Button variant="ember" onClick={() => window.open('https://github.com/sponsors/rekurt', '_blank')}>{c.support.donate.btn}</Button>
            </div>
          </div>
          <div className="tl-sup">
            <span className="k">{c.support.order.k}</span>
            <h3>{c.support.order.h}</h3>
            <p>{c.support.order.p}</p>
            <div className="act">
              <Button variant="primary" onClick={() => { window.location.href = 'mailto:nikitageek@gmail.com?subject=openkline%20feature%20order'; }}>
                {c.support.order.btn}
              </Button>
            </div>
          </div>
          <div className="tl-sup">
            <span className="k">{c.support.suggest.k}</span>
            <h3>{c.support.suggest.h}</h3>
            <p>{c.support.suggest.p}</p>
            <div className="act">
              <Button onClick={() => { window.open('https://github.com/rekurt/openkline/issues', '_blank'); }}>
                {c.support.suggest.btn}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" data-num="ping">
        <div className="seclabel">{c.contacts.label}</div>
        <h2>{c.contacts.h2}</h2>
        <div className="tl-contacts">
          <a className="tl-contact" href="mailto:nikitageek@gmail.com">
            <span className="k">{c.contacts.email.k}</span>
            <span className="v">nikitageek<span className="at">@</span>gmail.com</span>
            <span className="d">{c.contacts.email.d}</span>
          </a>
          <a className="tl-contact" href="https://github.com/rekurt" target="_blank" rel="noreferrer">
            <span className="k">{c.contacts.github.k}</span>
            <span className="v"><span className="at">github.com/</span>rekurt</span>
            <span className="d">{c.contacts.github.d}</span>
          </a>
          <a className="tl-contact" href="https://t.me/nikita_rwhe" target="_blank" rel="noreferrer">
            <span className="k">{c.contacts.telegram.k}</span>
            <span className="v"><span className="at">@</span>nikita_rwhe</span>
            <span className="d">{c.contacts.telegram.d}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
