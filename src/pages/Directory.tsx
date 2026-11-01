import { Seo, breadcrumbJsonLd } from '../components/Seo'
import { BacklinkDirectory } from '../components/BacklinkDirectory'
import { IndexingDisclaimer } from '../components/Shared'
import data from '../data/backlinks.json'
import type { BacklinkData } from '../data/types'

const backlinks = data as unknown as BacklinkData

export function Directory() {
  return (
    <>
      <Seo
        title="Backlink Directory"
        description="Search, filter, and browse every imported backlink URL by category, with A-Z sorting and pagination."
        path="/directory"
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Backlink Directory', path: '/directory' }])}
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h1 className="text-4xl font-extrabold text-navy-900 dark:text-white">Backlink Directory</h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
          The complete directory of imported backlink URLs. Each entry is a plain HTML link to the
          original destination — these are external websites, not pages hosted on this site.
          Search by URL or keyword, filter by category, sort A–Z, and page through the results.
        </p>
        <div className="mt-8">
          <BacklinkDirectory data={backlinks} showHeader={false} />
        </div>
        <div className="mt-10">
          <IndexingDisclaimer />
        </div>
      </section>
    </>
  )
}
