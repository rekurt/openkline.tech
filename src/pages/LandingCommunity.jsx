import { Button } from '../components/Button.jsx';

const DOCS = [
  ['guide', 'Quick start', 'Install, first chart, live data in five lines — vanilla, React or Vue.', 'https://github.com/rekurt/ohlcv-front#install'],
  ['guide', 'SSR integration', 'Next.js and Nuxt recipes — client-only mounting, hydration gotchas.', 'https://github.com/rekurt/ohlcv-front/blob/master/docs/GUIDES.md#ssr-integration'],
  ['guide', 'Performance tuning', 'Infinite scroll, maxCandles, gap detection, profiling long frames.', 'https://github.com/rekurt/ohlcv-front/blob/master/docs/GUIDES.md#performance-tuning'],
  ['guide', 'Theming', 'Built-in modes, custom ThemeColors, price and volume formatting.', 'https://github.com/rekurt/ohlcv-front/blob/master/docs/GUIDES.md#theming--customization'],
  ['guide', 'Live data & transports', 'DataTransport interface, polling and WebSocket bases, backoff.', 'https://github.com/rekurt/ohlcv-front/blob/master/docs/GUIDES.md#live-data--transports'],
  ['reference', 'API reference', 'Full TypeDoc — every class, option and event in the core.', 'https://rekurt.github.io/ohlcv-front/api/'],
  ['reference', 'Indicators', 'Config shapes for all 30+ built-ins, plus the custom-indicator path.', 'https://github.com/rekurt/ohlcv-front/blob/master/docs/GUIDES.md#indicators'],
  ['reference', 'Drawing tools', 'Nine anchored tools, hit-testing, save/load round-trips.', 'https://github.com/rekurt/ohlcv-front/blob/master/docs/GUIDES.md#drawing-tools'],
  ['meta', 'Changelog', 'Every release, no surprises — strict semver from 0.1.0.', 'https://github.com/rekurt/ohlcv-front/blob/master/CHANGELOG.md'],
];

/**
 * Shared bottom of the openkline landing: documentation grid, support
 * (donate / order a feature / suggest), contacts. Rendered on both pages.
 */
export function LandingCommunity() {
  return (
    <div>
      <section id="docs" data-num="docs">
        <div className="seclabel">docs — read the source's manual</div>
        <h2>Documentation</h2>
        <p className="sectionLede">
          Guides for the common paths, TypeDoc for everything else. The playground is the fastest way
          to poke the engine without installing anything.
        </p>
        <div className="tl-docs">
          {DOCS.map(([k, t, d, href]) => (
            <a className="tl-doc" key={t} href={href} target="_blank" rel="noreferrer">
              <span className="k">{k}</span>
              <span className="t">{t} <span className="arr">→</span></span>
              <p className="d">{d}</p>
            </a>
          ))}
        </div>
      </section>

      <section id="support" data-num="fund">
        <div className="seclabel">support — keep the candles printing</div>
        <h2>Fund the roadmap</h2>
        <p className="sectionLede">
          openkline is MIT and stays MIT. Alerts, replay mode, compare mode and workspaces ship faster
          when maintenance is funded.
        </p>
        <div className="tl-support">
          <div className="tl-sup">
            <span className="k">donate</span>
            <h3>Back the project</h3>
            <p>
              One-off or recurring — every donation goes to maintenance: triage, reviews,
              and keeping 440+ tests green.
            </p>
            <div className="tl-wallet">
              <span className="net">USDT · TRC-20</span>
              <span>address on request — see contacts</span>
            </div>
            <div className="act">
              <Button variant="ember" onClick={() => window.open('https://github.com/sponsors/rekurt', '_blank')}>Sponsor on GitHub</Button>
            </div>
          </div>
          <div className="tl-sup">
            <span className="k">order a feature</span>
            <h3>Need it before the roadmap?</h3>
            <p>
              Exchange adapters, custom indicators, alerts ahead of schedule — send a spec,
              get an estimate. Paid work lands upstream under MIT, so everyone gets it.
            </p>
            <div className="act">
              <Button variant="primary" onClick={() => { window.location.href = 'mailto:nikitageek@gmail.com?subject=openkline%20feature%20order'; }}>
                Email a spec
              </Button>
            </div>
          </div>
          <div className="tl-sup">
            <span className="k">suggest</span>
            <h3>Ideas & bug reports</h3>
            <p>
              Open an issue with a repro or a use case. Proposals that survive review get a
              milestone — check the M1 design doc for the bar.
            </p>
            <div className="act">
              <Button onClick={() => { window.open('https://github.com/rekurt/ohlcv-front/issues', '_blank'); }}>
                Open an issue ↗
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" data-num="ping">
        <div className="seclabel">contacts — talk to the maintainer</div>
        <h2>Contacts</h2>
        <div className="tl-contacts">
          <a className="tl-contact" href="mailto:nikitageek@gmail.com">
            <span className="k">email</span>
            <span className="v">nikitageek<span className="at">@</span>gmail.com</span>
            <span className="d">Feature orders, commercial questions, security reports</span>
          </a>
          <a className="tl-contact" href="https://github.com/rekurt" target="_blank" rel="noreferrer">
            <span className="k">github</span>
            <span className="v"><span className="at">github.com/</span>rekurt</span>
            <span className="d">Issues, PRs, discussions — the source of truth</span>
          </a>
          <a className="tl-contact" href="https://t.me/nikita_rwhe" target="_blank" rel="noreferrer">
            <span className="k">telegram</span>
            <span className="v"><span className="at">@</span>nikita_rwhe</span>
            <span className="d">Quick questions, integration help</span>
          </a>
        </div>
      </section>
    </div>
  );
}
