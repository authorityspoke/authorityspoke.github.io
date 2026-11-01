import { Seo, breadcrumbJsonLd } from '../components/Seo'

const RESOURCES = [
  {
    title: 'How search engines discover backlinks',
    description:
      'Crawling starts from known pages and follows links. A backlink is only useful once the linking page itself is crawled — which is why obscure linking pages often go unnoticed.',
  },
  {
    title: 'Why indexing takes time',
    description:
      'Crawl budgets, page quality signals, robots rules, and sheer volume all affect timing. New or rarely linked pages sit at the back of the queue, and that is normal.',
  },
  {
    title: 'Checking whether a page is indexed',
    description:
      'Use Search Console coverage reports for your own pages, and site: searches only as a rough signal. For third-party linking pages, check that the page loads, is not blocked, and still contains your link.',
  },
  {
    title: 'Internal linking for discovery',
    description:
      'Your own internal links are the most reliable discovery mechanism you control. Important pages should be reachable within a few clicks of the homepage and included in your sitemap.',
  },
  {
    title: 'Sitemaps done correctly',
    description:
      'A sitemap should list only pages hosted on your own site, with accurate last-modified dates. Never list external backlink URLs in your sitemap as if they were your pages.',
  },
  {
    title: 'When a link disappears',
    description:
      'Links are removed, pages are deleted, and sites change ownership. Periodic monitoring catches these changes before they quietly erode a link profile.',
  },
]

export function Resources() {
  return (
    <>
      <Seo
        title="SEO Resources"
        description="Practical guides on backlink discovery, Google crawling, indexing delays, sitemaps, and link monitoring."
        path="/resources"
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'SEO Resources', path: '/resources' }])}
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h1 className="text-4xl font-extrabold text-navy-900 dark:text-white">SEO Resources</h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
          Six short guides covering the topics our clients ask about most. Each guide states what
          is known, what is uncertain, and what you can actually control.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((resource) => (
            <article key={resource.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-900">
              <h2 className="text-lg font-bold text-navy-900 dark:text-white">{resource.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{resource.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
