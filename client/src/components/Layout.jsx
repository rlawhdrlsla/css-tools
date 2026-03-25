import { Outlet, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useI18n } from '../i18n/index.jsx'

const LANG_LABELS = { en: 'EN', ko: '한', ja: '日', zh: '中' }

export default function Layout() {
  const { t, lang, setLang, langs } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)

  const tools = [
    { path: '/text-styler', label: t('nav.textStyler') },
    { path: '/box-shadow', label: t('nav.boxShadow') },
    { path: '/border-radius', label: t('nav.borderRadius') },
    { path: '/flexbox', label: t('nav.flexbox') },
    { path: '/button', label: t('nav.button') },
    { path: '/box-model', label: t('nav.boxModel') },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <NavLink to="/" className="font-bold text-lg text-gray-900 hover:text-indigo-600 transition-colors shrink-0">
            CSSKit
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 overflow-x-auto">
            {tools.map((t) => (
              <NavLink
                key={t.path}
                to={t.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-medium'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                {t.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1 shrink-0">
            {/* Language switcher */}
            {langs.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  lang === l ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {LANG_LABELS[l]}
              </button>
            ))}

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 ml-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-2">
            {tools.map((tool) => (
              <NavLink
                key={tool.path}
                to={tool.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm mb-1 ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                {tool.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} CSSKit. {t('footer.copy')}
        </div>
      </footer>
    </div>
  )
}
