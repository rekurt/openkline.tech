import { createContext, useContext, useEffect, useState } from 'react';
import en from './en.jsx';
import ru from './ru.jsx';
import zh from './zh.jsx';

const DICTS = { en, ru, zh };

export const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'zh', label: '中文' },
];

function initialLang() {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = window.localStorage.getItem('ok-lang');
    if (saved && DICTS[saved]) return saved;
  } catch {
    /* ignore */
  }
  const nav = (window.navigator.language || 'en').toLowerCase();
  if (nav.startsWith('ru')) return 'ru';
  if (nav.startsWith('zh')) return 'zh';
  return 'en';
}

const I18nContext = createContext({ lang: 'en', setLang: () => {}, t: en });

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    try {
      window.localStorage.setItem('ok-lang', lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  return <I18nContext.Provider value={{ lang, setLang, t: DICTS[lang] }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
