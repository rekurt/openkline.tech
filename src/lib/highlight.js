// Syntax highlighting via Prism, dynamically imported so it stays off the
// critical bundle — code blocks render plain first, then upgrade once Prism
// (and the grammars we use) have loaded.
let prismPromise = null;

function loadPrism() {
  if (!prismPromise) {
    prismPromise = (async () => {
      const Prism = (await import('prismjs')).default;
      Prism.manual = true;
      // core ships markup/css/clike/javascript; add the rest we use
      await import('prismjs/components/prism-typescript');
      await import('prismjs/components/prism-jsx');
      await import('prismjs/components/prism-tsx');
      await import('prismjs/components/prism-bash');
      return Prism;
    })();
  }
  return prismPromise;
}

/** Guess a Prism language from a code block's title / prompt flag. */
export function inferLang(title, isPrompt) {
  if (isPrompt) return 'bash';
  const t = String(title || '').toLowerCase();
  if (t.endsWith('.vue')) return 'markup';
  if (t.endsWith('.tsx') || t.endsWith('.jsx')) return 'tsx';
  if (t.endsWith('.ts') || t.endsWith('.js')) return 'typescript';
  if (t.includes('install') || t.includes('npm') || t.includes('bash') || t.includes('sh')) return 'bash';
  return 'typescript';
}

/** Returns highlighted HTML for `code`, or null if Prism/grammar unavailable. */
export async function highlight(code, lang) {
  try {
    const Prism = await loadPrism();
    const grammar = Prism.languages[lang] || Prism.languages.typescript || Prism.languages.markup;
    if (!grammar) return null;
    return Prism.highlight(code, grammar, lang);
  } catch {
    return null;
  }
}
