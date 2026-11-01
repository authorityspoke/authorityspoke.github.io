import { AlertTriangle } from 'lucide-react'

export function IndexingDisclaimer() {
  return (
    <aside
      aria-label="Indexing disclaimer"
      className="rounded-xl border border-amber-300 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/40"
    >
      <h2 className="flex items-center gap-2 text-base font-bold text-navy-900 dark:text-white">
        <AlertTriangle size={20} aria-hidden="true" className="text-amber-600" />
        Honest indexing disclaimer
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        Listing or submitting a URL does <strong>not guarantee Google indexing</strong>. Search
        engines decide independently what to crawl and index, and delays or non-indexing are
        common. The external backlink URLs listed on this site are <strong>not pages hosted on
        this website</strong> — they are links to third-party destinations. Nothing on this site
        is automatically submitted to any search engine indexing API, and no indexing outcome is
        claimed without verification.
      </p>
    </aside>
  )
}

export const SERVICES = [
  {
    title: 'Backlink Indexing',
    description:
      'Structured, crawlable listings that help search engines discover the backlinks you already own, without inflated promises.',
  },
  {
    title: 'URL Discovery',
    description:
      'Systematic extraction and organisation of URL collections from spreadsheets into searchable, categorised directories.',
  },
  {
    title: 'Backlink Monitoring',
    description:
      'Regular checks of listed URLs so broken, redirected, or removed links are spotted early and reported clearly.',
  },
  {
    title: 'Bulk URL Submission',
    description:
      'Efficient handling of large URL lists — deduplicated, categorised, and published in an SEO-friendly format.',
  },
  {
    title: 'Technical SEO',
    description:
      'Site structure, metadata, sitemaps, and crawlability reviews that support discovery of your own pages.',
  },
  {
    title: 'Website Indexing Consultation',
    description:
      'Practical advice on crawl budget, internal linking, and realistic timelines for new or updated pages.',
  },
]

export const FAQS = [
  {
    question: 'What is backlink indexing?',
    answer:
      'Backlink indexing is the process by which a search engine discovers a link pointing to your site, crawls the linking page, and records that link. A link only passes value once the search engine has found and processed it.',
  },
  {
    question: 'Why are some backlinks not indexed?',
    answer:
      'Common reasons include low crawl priority for the linking page, robots restrictions, removed or changed links, slow or blocked pages, and duplicate or low-quality content. Search engines also simply take time to process large volumes of new pages.',
  },
  {
    question: 'How long does Google crawling usually take?',
    answer:
      'It varies widely — from hours for well-linked, frequently crawled pages to weeks or longer for obscure pages. There is no guaranteed timeframe, and anyone promising instant indexing should be treated with caution.',
  },
  {
    question: 'Does listing a URL here guarantee it will be indexed?',
    answer:
      'No. Listing a URL makes it publicly discoverable in a crawlable format, which can support discovery, but indexing remains entirely at the search engine’s discretion. This site never claims an indexing outcome without verification.',
  },
  {
    question: 'What are the limitations of indexing services?',
    answer:
      'No service can force Google or Bing to index a page, override robots or noindex directives, or restore a removed link. Realistic services focus on discovery, hygiene, and monitoring — not guarantees.',
  },
  {
    question: 'Are the backlink URLs on this site pages hosted here?',
    answer:
      'No. External backlink URLs link to third-party websites. Only the pages of this website itself (Home, About, Directory, Services, Resources, Contact, and legal pages) are hosted here and included in this site’s sitemap.',
  },
]
