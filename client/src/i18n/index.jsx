import { useState, useEffect, createContext, useContext } from 'react'
import en from './locales/en.json'
import ko from './locales/ko.json'
import ja from './locales/ja.json'
import zh from './locales/zh.json'

const locales = { en, ko, ja, zh }

function detectLang() {
  const saved = localStorage.getItem('lang')
  if (saved && locales[saved]) return saved
  const browser = navigator.language.slice(0, 2)
  return locales[browser] ? browser : 'en'
}

function get(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

export const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(detectLang)

  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  function t(path) {
    return get(locales[lang], path) ?? get(locales.en, path) ?? path
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t, langs: Object.keys(locales) }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
