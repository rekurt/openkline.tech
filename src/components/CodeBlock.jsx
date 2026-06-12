import { useState } from 'react';

export function CodeBlock({ title, prompt = false, size = 'md', copy = false, copyText, style, children }) {
  const [copied, setCopied] = useState(false);
  const text = copyText || (typeof children === 'string' ? children : '');
  function doCopy() {
    if (!text || !navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(
      () => {
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
      <pre>
        <code>
          {prompt ? <span className="ok-code-prompt">$ </span> : null}
          {children}
        </code>
      </pre>
    </div>
  );
}
