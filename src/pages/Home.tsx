import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, CheckCircle2, FolderTree, Globe, Search } from 'lucide-react'
import { Seo, organizationJsonLd, websiteJsonLd } from '../components/Seo'
import { BacklinkDirectory } from '../components/BacklinkDirectory'
import { FAQS, IndexingDisclaimer, SERVICES } from '../components/Shared'
import data from '../data/backlinks.json'
import type { BacklinkData } from '../data/types'

const backlinks = data as unknown as BacklinkData
const RESOURCES_COUNT = 6

const STEPS = [
  {
    title: '1. Import your URLs',
    description:
      'Upload a spreadsheet of backlink URLs. The import tool detects the URL column, preserves every original destination, and removes only exact duplicates.',
  },
  {
    title: '2. Organise into categories',
    description:
      'URLs are grouped by the categories in your file — or into a single organised directory when no categories are supplied.',
  },
  {
    title: '3. Publish crawlable listings',
    description:
      'Each URL is published as a plain HTML link that search engines and visitors can follow, with search, filters, and pagination.',
  },
  {
    title: '4. Monitor and maintain',
    description:
      'Re-run the import as your link profile changes, and keep the directory accurate instead of letting it go stale.',
  },
]

export function Home() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <Seo
        title="Professional Backlink Indexing Services"
        description="Helping SEO professionals improve backlink discovery and monitor URL indexing. Explore a crawlable, categorised backlink directory."
        path="/"
        jsonLd={[organizationJsonLd(), websiteJsonLd(), faqJsonLd]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-navy-50 via-white to-white dark:from-navy-950 dark:via-navy-950 dark:to-navy-950">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <p className="animate-fade-up text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">
            Backlink discovery · Indexing support · Monitoring
          </p>
          <h1 className="animate-fade-up mx-auto mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-navy-900 dark:text-white sm:text-5xl">
            Professional Backlink Indexing Services
          </h1>
          <p className="animate-fade-up mx-auto mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Helping SEO professionals improve backlink discovery and monitor URL indexing.
          </p>
          <div className="animate-fade-up mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/directory"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:shadow-card-hover"
            >
              Explore Backlinks <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section aria-label="Directory statistics" className="mx-auto max-w-7xl px-4 sm:px-6">
        <dl className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-card dark:border-slate-700 dark:bg-slate-900">
            <dt className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
              <Globe size={16} aria-hidden="true" /> Total backlinks listed
            </dt>
            <dd className="mt-2 text-4xl font-extrabold text-navy-900 dark:text-white">{backlinks.totalUrls}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-card dark:border-slate-700 dark:bg-slate-900">
            <dt className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
              <FolderTree size={16} aria-hidden="true" /> Total categories
            </dt>
            <dd className="mt-2 text-4xl font-extrabold text-navy-900 dark:text-white">{backlinks.totalCategories}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-card dark:border-slate-700 dark:bg-slate-900">
            <dt className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
              <BarChart3 size={16} aria-hidden="true" /> Total indexing resources
            </dt>
            <dd className="mt-2 text-4xl font-extrabold text-navy-900 dark:text-white">{RESOURCES_COUNT}</dd>
          </div>
        </dl>
        <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
          Statistics are calculated automatically from the imported data file. Resource count
          reflects the guides published on the SEO Resources page.
        </p>
      </section>

      {/* Directory */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6" aria-label="Homepage backlink directory">
        <BacklinkDirectory data={backlinks} />
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          Looking for the full directory experience?{' '}
          <Link to="/directory" className="font-semibold text-blue-700 hover:underline dark:text-blue-300">
            Open the dedicated Backlink Directory page
          </Link>
          .
        </p>
      </section>

      {/* Services */}
      <section aria-label="SEO services" className="bg-slate-50 py-14 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-navy-900 dark:text-white">SEO Services</h2>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
            Practical services built around discovery, hygiene, and monitoring — not guarantees.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <article
                key={service.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover dark:border-slate-700 dark:bg-slate-900"
              >
                <h3 className="text-lg font-bold text-navy-900 dark:text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{service.description}</p>
                <Link to="/services" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline dark:text-blue-300">
                  Learn more <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section aria-label="How it works" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-3xl font-bold text-navy-900 dark:text-white">How It Works</h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <li key={step.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-900">
              <h3 className="text-base font-bold text-navy-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section aria-label="Frequently asked questions" className="bg-slate-50 py-14 dark:bg-slate-900/40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-navy-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-4">
            {FAQS.map((faq) => (
              <details key={faq.question} className="rounded-xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-slate-900">
                <summary className="cursor-pointer text-base font-semibold text-navy-900 dark:text-white">
                  {faq.question}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer + CTA */}
      <section className="mx-auto max-w-7xl space-y-8 px-4 py-14 sm:px-6">
        <IndexingDisclaimer />
        <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-purple-700 px-8 py-12 text-center text-white shadow-card">
          <h2 className="text-3xl font-bold">Explore the backlink directory</h2>
          <p className="mx-auto mt-3 max-w-xl text-blue-100">
            Browse the full directory, filter by category, and find the links you need — or get in
            touch to discuss your indexing goals.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/directory" className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-navy-900">
              <Search size={16} aria-hidden="true" /> Explore Backlinks
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg border border-white/60 px-6 py-3 text-sm font-semibold text-white">
              <CheckCircle2 size={16} aria-hidden="true" /> Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
