import React, { useState } from 'react';

const openklineCodeBlockCss = `
.ok-code {
  background: var(--bg-canvas); border: var(--border-w) solid var(--border);
  border-radius: var(--radius-md); overflow: hidden;
  text-align: left;
}
[data-theme='light'] .ok-code { background: #f6f8fc; }
.ok-code-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--space-3) var(--space-5);
  border-bottom: var(--border-w) solid var(--border);
  font-family: var(--font-mono); font-size: var(--text-2xs); letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--text-muted);
}
.ok-code pre {
  margin: 0; padding: var(--space-6);
  font-family: var(--font-mono); font-size: var(--text-md); line-height: var(--leading-relaxed);
  color: var(--text-1); overflow-x: auto;
}
.ok-code--sm pre { font-size: var(--text-sm); padding: var(--space-5); }
.ok-code .ok-code-prompt { color: var(--ember); user-select: none; }
.ok-code-copy {
  background: none; border: none; cursor: pointer; padding: 0;
  font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--text-muted); transition: color var(--dur-fast) var(--ease-out);
}
.ok-code-copy:hover { color: var(--text-1); }
.ok-code-copy.is-copied { color: var(--ember); }
`;

function ensureCodeBlockStyle() {
  if (typeof document !== 'undefined' && !document.getElementById('ok-code-style')) {
    const s = document.createElement('style');
    s.id = 'ok-code-style';
    s.textContent = openklineCodeBlockCss;
    document.head.appendChild(s);
  }
}

export function CodeBlock({ title, prompt = false, size = 'md', copy = false, copyText, style, children }) {
  ensureCodeBlockStyle();
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
