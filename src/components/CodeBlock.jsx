import { useEffect, useState } from 'react';
import { highlight, inferLang } from '../lib/highlight.js';
import { useAnalytics } from '../lib/useAnalytics.jsx';

export function CodeBlock({ title, prompt = false, size = 'md', copy = false, copyText, lang, style, children }) {
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState(null);
  const { track } = useAnalytics();
  const text = copyText || (typeof children === 'string' ? children : '');
  const isString = typeof children === 'string';
  const language = lang || inferLang(title, prompt);

  // Highlight string code blocks once Prism has loaded (dynamic import).
  useEffect(() => {
    if (!isString) {
      setHtml(null);
      return undefined;
    }
    let cancelled = false;
    highlight(children, language).then((out) => {
      if (!cancelled && out != null) setHtml(out);
    });
    return () => {
      cancelled = true;
    };
  }, [children, isString, language]);

  function doCopy() {
    if (!text || !navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(
      () => {
        track('copy', { title: title || 'bash', lang: language });
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      },
      () => {},
    );
  }

  const showHead = title || (copy && text);
  return (
    <div className={`ok-code${size === 'sm' ? ' ok-code--sm' : ''}`} style={style}>
      {showHead ? (
        <div className="ok-code-head">
          <span>{title || 'bash'}</span>
          {copy && text ? (
            <button type="button" className={`ok-code-copy${copied ? ' is-copied' : ''}`} onClick={doCopy}>
              {copied ? 'copied ✓' : 'copy'}
            </button>
          ) : null}
        </div>
      ) : null}
      <pre className={`language-${language}`}>
        <code className={`language-${language}`}>
          {prompt ? <span className="ok-code-prompt">$ </span> : null}
          {isString && html != null ? <span dangerouslySetInnerHTML={{ __html: html }} /> : children}
        </code>
      </pre>
    </div>
  );
}
