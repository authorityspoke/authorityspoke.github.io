import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Directory } from './pages/Directory'
import { Services } from './pages/Services'
import { Resources } from './pages/Resources'
import { Contact } from './pages/Contact'
import { Disclaimer, Privacy, Terms } from './pages/Legal'

const CRUMBS: Record<string, { label: string; to?: string }[]> = {
  '/about': [{ label: 'Home', to: '/' }, { label: 'About Us' }],
  '/directory': [{ label: 'Home', to: '/' }, { label: 'Backlink Directory' }],
  '/services': [{ label: 'Home', to: '/' }, { label: 'Services' }],
  '/resources': [{ label: 'Home', to: '/' }, { label: 'SEO Resources' }],
  '/contact': [{ label: 'Home', to: '/' }, { label: 'Contact Us' }],
  '/privacy': [{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }],
  '/terms': [{ label: 'Home', to: '/' }, { label: 'Terms and Conditions' }],
  '/disclaimer': [{ label: 'Home', to: '/' }, { label: 'Disclaimer' }],
}

function Shell() {
  const location = useLocation()
  return (
    <Layout breadcrumbs={CRUMBS[location.pathname]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/services" element={<Services />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route
          path="*"
          element={
            <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
              <h1 className="text-4xl font-extrabold text-navy-900 dark:text-white">Page not found</h1>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                The page you are looking for does not exist. Return to the homepage or explore
                the backlink directory.
              </p>
              <p className="mt-6">
                <a href="#/" className="font-semibold text-blue-700 hover:underline dark:text-blue-300">
                  Go to Home →
                </a>
              </p>
            </section>
          }
        />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  )
}
