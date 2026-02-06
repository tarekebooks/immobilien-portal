import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { languageOptions, translations, type Language } from './translations'

type I18nContextValue = {
  lang: Language
  dir: 'ltr' | 'rtl'
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

const getNestedValue = (obj: unknown, path: string[]): string | undefined => {
  let current: unknown = obj
  for (const key of path) {
    if (!current || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[key]
  }
  return typeof current === 'string' ? current : undefined
}

const getInitialLang = (): Language => {
  const stored = window.localStorage.getItem('lang')
  if (stored && ['de', 'en', 'fr', 'ar'].includes(stored)) {
    return stored as Language
  }
  const browser = navigator.language.toLowerCase()
  if (browser.startsWith('fr')) return 'fr'
  if (browser.startsWith('ar')) return 'ar'
  if (browser.startsWith('en')) return 'en'
  return 'de'
}

export const I18nProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(getInitialLang)
  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr'

  const setLang = (next: Language) => {
    setLangState(next)
    window.localStorage.setItem('lang', next)
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  const t = useMemo(() => {
    return (key: string) => {
      const path = key.split('.')
      const value = getNestedValue(translations[lang], path)
      if (value) return value
      const fallback = getNestedValue(translations.de, path)
      return fallback ?? key
    }
  }, [lang])

  const value = useMemo(() => ({ lang, dir, setLang, t }), [lang, dir])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useI18n = (): I18nContextValue => {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return ctx
}

export { languageOptions }
