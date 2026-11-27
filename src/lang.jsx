import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { strings } from './i18n.js'

const LangCtx = createContext(null)

function detectLang() {
  try {
    const saved = localStorage.getItem('af-lang')
    if (saved === 'en' || saved === 'ar') return saved
  } catch {
    /* ignore */
  }
  return typeof navigator !== 'undefined' &&
    navigator.language &&
    navigator.language.toLowerCase().startsWith('ar')
    ? 'ar'
    : 'en'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(detectLang)

  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try {
      localStorage.setItem('af-lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const value = useMemo(() => {
    const isAr = lang === 'ar'
    return {
      lang,
      isAr,
      setLang,
      dir: isAr ? 'rtl' : 'ltr',
      t: strings[lang],
      /** Localised thousands separator: 1,300 → ١٬٣٠٠ in Arabic */
      fmt: (n) =>
        Number(n).toLocaleString(isAr ? 'ar-EG' : 'en-US', { maximumFractionDigits: 0 }),
      /** Currency word: EGP / جنيه */
      cur: isAr ? 'جنيه' : 'EGP',
    }
  }, [lang])

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>
}

export function useLang() {
  const ctx = useContext(LangCtx)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}
