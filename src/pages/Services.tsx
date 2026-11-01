import { Link } from 'react-router-dom'
import { Seo, breadcrumbJsonLd } from '../components/Seo'
import { IndexingDisclaimer, SERVICES } from '../components/Shared'

export function Services() {
  return (
    <>
      <Seo
        title="Backlink Indexing Services"
        description="Backlink indexing, URL discovery, monitoring, bulk submission, technical SEO, and indexing consultation — with honest expectations."
        path="/services"
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])}
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h1 className="text-4xl font-extrabold text-navy-900 dark:text-white">Backlink Indexing Services</h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
          Six focused services covering the full lifecycle of a backlink list: discovery,
          organisation, publication, monitoring, and technical support. Every service is scoped
          honestly — we report what we did and what search engines did, separately.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article key={service.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover dark:border-slate-700 dark:bg-slate-900">
              <h2 className="text-xl font-bold text-navy-900 dark:text-white">{service.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{service.description}</p>
              <h3 className="mt-4 text-sm font-semibold text-navy-900 dark:text-white">What you get</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                A documented, repeatable deliverable — an updated directory, a monitoring report,
                or a written recommendation — never a vague guarantee.
              </p>
            </article>
          ))}
        </div>
        <div className="mt-12">
          <IndexingDisclaimer />
        </div>
        <p className="mt-8">
          <Link to="/contact" className="font-semibold text-blue-700 hover:underline dark:text-blue-300">
            Discuss your project with us →
          </Link>
        </p>
      </section>
    </>
  )
}
