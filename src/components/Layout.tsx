import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Link2, Menu, Moon, Sun, X } from 'lucide-react'
import { SITE_NAME } from '../config/site'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/directory', label: 'Backlink Directory' },
  { to: '/services', label: 'Services' },
  { to: '/resources', label: 'SEO Resources' },
  { to: '/contact', label: 'Contact Us' },
]

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const saved = window.localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    if (typeof window.matchMedia === 'function') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  } catch {
    // Storage or media queries unavailable (e.g. restricted browser
    // contexts) — fall back to light mode instead of crashing render.
  }
  return false
}

export function Layout({ children, breadcrumbs }: { children: ReactNode; breadcrumbs?: { label: string; to?: string }[] }) {
  const [dark, setDark] = useState<boolean>(getInitialTheme)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      window.localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      // Ignore storage failures in restricted browser contexts.
    }
  }, [dark])

  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-white text-slate-800 dark:bg-navy-950 dark:text-slate-200">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-2">
        Skip to main content
      </a>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-navy-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2" aria-label="Backlink Indexing Services home">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <Link2 size={20} aria-hidden="true" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-navy-900 dark:text-white">
              Backlink<span className="gradient-text"> Indexing</span>
            </span>
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition hover:bg-slate-100 dark:hover:bg-slate-800 ${
                    isActive ? 'text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-300'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDark((d) => !d)}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="rounded-md border border-slate-200 p-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              {dark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="rounded-md border border-slate-200 p-2 lg:hidden dark:border-slate-700"
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
        {open && (
          <nav aria-label="Mobile" className="border-t border-slate-200 px-4 py-3 lg:hidden dark:border-slate-800">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-5 sm:px-6">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            {breadcrumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-1">
                {i > 0 && <span aria-hidden="true">/</span>}
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-blue-700 dark:hover:text-blue-300">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-slate-700 dark:text-slate-200">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <main id="main-content">{children}</main>

      <footer className="mt-16 border-t border-slate-200 bg-navy-950 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
          <div>
            <p className="text-lg font-extrabold text-white">{SITE_NAME}</p>
            <p className="mt-3 text-sm leading-relaxed">
              Backlink discovery and indexing services for SEO professionals. Organised, crawlable
              directories — with honest expectations about indexing.
            </p>
          </div>
          <nav aria-label="Footer pages">
            <h2 className="text-sm font-bold uppercase tracking-wide text-white">Pages</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer services">
            <h2 className="text-sm font-bold uppercase tracking-wide text-white">Services</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-white">Backlink Indexing</Link></li>
              <li><Link to="/services" className="hover:text-white">URL Discovery</Link></li>
              <li><Link to="/services" className="hover:text-white">Backlink Monitoring</Link></li>
              <li><Link to="/services" className="hover:text-white">Bulk URL Submission</Link></li>
            </ul>
          </nav>
          <nav aria-label="Footer legal">
            <h2 className="text-sm font-bold uppercase tracking-wide text-white">Legal</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms and Conditions</Link></li>
              <li><Link to="/disclaimer" className="hover:text-white">Disclaimer</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </nav>
        </div>
        <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved. Listing a URL does not
          guarantee search engine indexing.
        </div>
      </footer>
    </div>
  )
}
