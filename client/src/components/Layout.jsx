import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'

const tools = [
  { path: '/text-styler', label: 'Text Styler' },
  { path: '/box-shadow', label: 'Box Shadow' },
  { path: '/border-radius', label: 'Border Radius' },
  { path: '/flexbox', label: 'Flexbox Builder' },
  { path: '/button', label: 'Button Generator' },
  { path: '/box-model', label: 'Box Model' },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <NavLink to="/" className="font-bold text-lg text-gray-900 hover:text-indigo-600 transition-colors">
            CSSKit
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {tools.map((t) => (
              <NavLink
                key={t.path}
                to={t.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm transition-colors ${
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

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
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

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-2">
            {tools.map((t) => (
              <NavLink
                key={t.path}
                to={t.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm mb-1 ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                {t.label}
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
          © {new Date().getFullYear()} CSSKit. Free CSS generator tools.
        </div>
      </footer>
    </div>
  )
}
