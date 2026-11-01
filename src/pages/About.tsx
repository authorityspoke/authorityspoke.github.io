import { Link } from 'react-router-dom'
import { Seo, breadcrumbJsonLd, organizationJsonLd } from '../components/Seo'

export function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn about our backlink indexing service: organised discovery, honest reporting, and realistic expectations about search engine indexing."
        path="/about"
        jsonLd={[organizationJsonLd(), breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }])]}
      />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h1 className="text-4xl font-extrabold text-navy-900 dark:text-white">About Us</h1>
        <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
          We build organised, crawlable backlink directories for SEO professionals. Our work starts
          with a simple observation: many backlinks exist but are never discovered by search
          engines, because the pages linking to a site are obscure, poorly linked, or buried in
          large data exports that nobody publishes in a usable format.
        </p>
        <h2 className="mt-10 text-2xl font-bold text-navy-900 dark:text-white">What we do</h2>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          We take URL collections — typically spreadsheets — and turn them into structured,
          searchable directories. Every URL is preserved exactly as supplied, duplicates are
          removed, and categories are kept where the source data provides them. The result is a
          public, crawlable page that visitors and search engines can actually use.
        </p>
        <h2 className="mt-10 text-2xl font-bold text-navy-900 dark:text-white">What we will not promise</h2>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          We do not promise Google indexing, rankings, or traffic from any individual link.
          Indexing is decided by search engines, not by us, and any service claiming otherwise
          should be questioned. What we do promise is accuracy: the directory reflects the data
          supplied, unparseable rows are reported separately, and nothing is invented to pad the
          numbers.
        </p>
        <h2 className="mt-10 text-2xl font-bold text-navy-900 dark:text-white">Who this is for</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-300">
          <li>SEO professionals managing large backlink profiles.</li>
          <li>Agencies that need a shareable, organised view of client links.</li>
          <li>Site owners auditing where their links actually live.</li>
        </ul>
        <p className="mt-8">
          <Link to="/directory" className="font-semibold text-blue-700 hover:underline dark:text-blue-300">
            Browse the Backlink Directory →
          </Link>
        </p>
      </section>
    </>
  )
}
