import { useState, useEffect } from 'react';
import { Button } from '../components/Button.jsx';
import { Badge } from '../components/Badge.jsx';
import { CodeBlock } from '../components/CodeBlock.jsx';
import { DemoChart } from '../components/DemoChart.jsx';
import { useI18n, parseLocale, localePath } from '../i18n/index.jsx';
import { navigate, Link, currentLocale } from '../router.jsx';
import { EXAMPLES, EXAMPLE_BY_ID } from '../content/examples.js';

/**
 * Parse sub-path from /examples/realtime etc.
 * Returns null for /examples (gallery), or the example id for detail pages.
 * Handles locale-prefixed paths like /ru/examples/realtime.
 */
function exampleIdFromPath() {
  if (typeof window === 'undefined') return null;
  const { rest } = parseLocale(window.location.pathname);
  const m = rest.match(/^\/examples\/([a-z-]+)\/?$/);
  return m ? m[1] : null;
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const doCopy = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }, () => {});
  };
  return (
    <button type="button" className="ok-code-copy" onClick={doCopy}>
      {copied ? 'copied \u2713' : 'copy'}
    </button>
  );
}

/** Gallery card for a single example on /examples. */
function ExampleCard({ example, texts }) {
  return (
    <a
      href={localePath(currentLocale(), `/examples/${example.id}`)}
      className="tl-feature tl-example-card"
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        window.history.pushState({}, '', localePath(currentLocale(), `/examples/${example.id}`));
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo({ top: 0, behavior: 'auto' });
      }}
    >
      <h3>{texts.title}</h3>
      <p>{texts.desc}</p>
      <div className="tl-example-tags">
        {example.featureTags.map((tag) => (
          <Badge key={tag} tone="accent">{tag}</Badge>
        ))}
      </div>
    </a>
  );
}

/** Detail view for a single example — live chart + code + links. */
function ExampleDetail({ example, texts }) {
  const { t } = useI18n();
  const ex = t.examples;
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <button
          type="button"
          className="pillar-link"
          onClick={() => {
            window.history.pushState({}, '', localePath(currentLocale(), '/examples'));
            window.dispatchEvent(new PopStateEvent('popstate'));
            window.scrollTo({ top: 0, behavior: 'auto' });
          }}
        >
          &larr; {ex.backToGallery}
        </button>
      </div>

      <div className="seclabel">{ex.label}</div>
      <h2>{texts.title}</h2>
      <p className="sectionLede">{texts.desc}</p>

      <div className="tl-example-tags" style={{ marginBottom: 24 }}>
        {example.featureTags.map((tag) => (
          <Badge key={tag} tone="accent">{tag}</Badge>
        ))}
      </div>

      <DemoChart
        seed={example.chart.seed}
        indicators={example.chart.indicators}
        height={example.chart.height}
        symbol={example.chart.symbol}
        basePrice={example.chart.basePrice}
        drift={example.chart.drift}
      />

      <div style={{ marginTop: 24 }}>
        <CodeBlock title={example.id + (example.id === 'vue' ? '.vue' : '.ts')} copy copyText={example.code}>
          {example.code}
        </CodeBlock>
      </div>

      <div className="tl-example-links">
        {example.docs && (
          <Link to="docs" hash={example.docs.replace('/docs#', '')} className="pillar-link">
            {ex.docsLink} &rarr;
          </Link>
        )}
        {example.source && (
          <a href={example.source} target="_blank" rel="noreferrer" className="pillar-link">
            {ex.sourceLink} &uarr;
          </a>
        )}
      </div>
    </div>
  );
}

/** /examples — gallery listing all examples, or a detail view for /examples/:id. */
export function ExamplesPage() {
  const { t } = useI18n();
  const ex = t.examples;
  const [detailId, setDetailId] = useState(exampleIdFromPath);

  useEffect(() => {
    const onPop = () => setDetailId(exampleIdFromPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Detail view
  if (detailId && EXAMPLE_BY_ID[detailId]) {
    const example = EXAMPLE_BY_ID[detailId];
    const texts = ex.items.find((it) => it.id === detailId) || { title: detailId, desc: '' };
    return (
      <section style={{ paddingTop: 32 }}>
        <ExampleDetail example={example} texts={texts} />
      </section>
    );
  }

  // Gallery view
  return (
    <div>
      <section style={{ paddingTop: 32 }}>
        <div className="seclabel">{ex.label}</div>
        <h2>{ex.h2}</h2>
        <p className="sectionLede">{ex.lede}</p>
        <div className="tl-features">
          {EXAMPLES.map((example) => {
            const texts = ex.items.find((it) => it.id === example.id) || { title: example.id, desc: '' };
            return <ExampleCard key={example.id} example={example} texts={texts} />;
          })}
        </div>
      </section>

      <section className="tl-finalcta">
        <h2>{ex.ctaH2}</h2>
        <p className="sectionLede" style={{ textAlign: 'center', margin: '0 auto 28px' }}>{ex.ctaLede}</p>
        <div className="cta" style={{ justifyContent: 'center' }}>
          <Button variant="ember" size="lg" onClick={() => navigate('playground')}>{ex.ctaPlayground}</Button>
          <Button size="lg" onClick={() => navigate('docs')}>{ex.ctaDocs}</Button>
        </div>
      </section>
    </div>
  );
}
