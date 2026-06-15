import { createContext, useContext, useEffect, useState } from 'react';
import en from './en.jsx';
import ru from './ru.jsx';
import zh from './zh.jsx';
import sn from './sn.jsx';

const DICTS = { en, ru, zh, sn };

/** Locale codes that get a URL prefix (e.g. /ru/docs). en has no prefix. */
export const LOCALE_PREFIXES = ['ru', 'sn', 'zh'];

export const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'sn', label: 'SN' },
  { code: 'zh', label: '中文' },
];

/** Extract locale prefix from a pathname. Returns { locale, rest }. */
export function parseLocale(pathname) {
  if (typeof pathname !== 'string') return { locale: 'en', rest: '/' };
  const clean = pathname.replace(/\/+$/, '') || '/';
  for (const prefix of LOCALE_PREFIXES) {
    if (clean === `/${prefix}`) return { locale: prefix, rest: '/' };
    if (clean.startsWith(`/${prefix}/`)) return { locale: prefix, rest: clean.slice(prefix.length + 1) };
  }
  return { locale: 'en', rest: clean };
}

/** Build a locale-prefixed path. en gets no prefix. */
export function localePath(locale, path) {
  const base = path === '/' ? '' : path;
  if (locale === 'en') return path;
  return `/${locale}${base}`;
}

function initialLang() {
  if (typeof window === 'undefined') return 'en';
  const { locale } = parseLocale(window.location.pathname);
  if (DICTS[locale]) return locale;
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
