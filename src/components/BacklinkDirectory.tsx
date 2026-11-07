import { useMemo, useState } from 'react'
import { Check, Copy, Search } from 'lucide-react'
import type { BacklinkData } from '../data/types'

const PAGE_SIZE = 25

export function BacklinkDirectory({ data, showHeader = true }: { data: BacklinkData; showHeader?: boolean }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('All')
  const [sortAZ, setSortAZ] = useState(false)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [copied, setCopied] = useState<string | null>(null)

  const categories = useMemo(() => ['All', ...data.categories], [data.categories])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let rows = data.entries.filter((entry) => {
      if (category !== 'All' && entry.category !== category) return false
      if (!q) return true
      return (
        entry.url.toLowerCase().includes(q) ||
        entry.anchor.toLowerCase().includes(q) ||
        entry.category.toLowerCase().includes(q)
      )
    })
    if (sortAZ) {
      rows = [...rows].sort((a, b) => a.url.localeCompare(b.url))
    }
    return rows
  }, [data.entries, query, category, sortAZ])

  const visible = filtered.slice(0, visibleCount)
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(totalPages, Math.ceil(visibleCount / PAGE_SIZE))

  const copyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = url
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(url)
    window.setTimeout(() => setCopied((c) => (c === url ? null : c)), 2000)
  }

  return (
    <section aria-label="Backlink directory">
      {showHeader && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white">Backlink Directory</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Every imported URL is listed below as a plain, crawlable HTML link. Use search,
            category filters, or A–Z sorting to narrow the list.
          </p>
        </div>
      )}

      {data.entries.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-900" role="status">
          <p className="text-lg font-semibold text-navy-900 dark:text-white">
            No backlink data imported yet — run npm run import:excel with your spreadsheet
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Place your .xls or .xlsx file at <code>data/backlinks.xlsx</code> (or pass a path),
            run <code>npm run import:excel</code>, then rebuild. No URLs have been invented or
            added as placeholders.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <label className="relative flex-1 min-w-[220px]">
              <span className="sr-only">Search by URL or keyword</span>
              <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setVisibleCount(PAGE_SIZE)
                }}
                placeholder="Search by URL or keyword…"
                aria-label="Search by URL or keyword"
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm dark:border-slate-700 dark:bg-slate-900"
              />
            </label>
            <button
              type="button"
              onClick={() => setSortAZ((v) => !v)}
              aria-pressed={sortAZ}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Sort A–Z {sortAZ ? 'On' : 'Off'}
            </button>
            <p className="text-sm text-slate-600 dark:text-slate-300" role="status">
              Showing {visible.length} of {filtered.length} URLs
              {filtered.length !== data.totalUrls ? ` (${data.totalUrls} total listed)` : ` total`}
            </p>
          </div>

          <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setCategory(cat)
                  setVisibleCount(PAGE_SIZE)
                }}
                aria-pressed={category === cat}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  category === cat
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'border border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="rounded-lg border border-slate-200 p-6 text-center text-slate-600 dark:border-slate-700 dark:text-slate-300" role="status">
              No URLs match your search. Try a different keyword or category.
            </p>
          ) : (
            <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card dark:divide-slate-800 dark:border-slate-700 dark:bg-slate-900">
              {visible.map((entry, i) => (
                <li key={`${entry.url}-${i}`} className="flex flex-wrap items-center gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noopener"
                      className="block truncate font-medium text-blue-700 hover:underline dark:text-blue-300"
                    >
                      {entry.anchor || entry.url}
                    </a>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">{entry.url}</p>
                    <p className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span>Category: {entry.category}</span>
                      {entry.status && (
                        <span
                          className={`rounded-full px-2 py-0.5 font-semibold ${
                            entry.status === 'Live'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
                              : entry.status === 'Pending'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {entry.status === 'Pending' ? 'Pending approval' : entry.status}
                        </span>
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyLink(entry.url)}
                    aria-label={`Copy link for ${entry.anchor || entry.url}`}
                    className="flex items-center gap-1 rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    {copied === entry.url ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                    {copied === entry.url ? 'Copied' : 'Copy link'}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600 dark:text-slate-300" aria-live="polite">
              Page {currentPage} of {totalPages} · {PAGE_SIZE} per page
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={visibleCount <= PAGE_SIZE}
                onClick={() => setVisibleCount((c) => Math.max(PAGE_SIZE, c - PAGE_SIZE))}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium disabled:opacity-50 dark:border-slate-700"
              >
                Previous page
              </button>
              <button
                type="button"
                disabled={visibleCount >= filtered.length}
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium disabled:opacity-50 dark:border-slate-700"
              >
                Next page
              </button>
              {visibleCount < filtered.length && (
                <button
                  type="button"
                  onClick={() => setVisibleCount(filtered.length)}
                  className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Load more
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  )
}
