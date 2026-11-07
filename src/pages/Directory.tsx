import { Seo, breadcrumbJsonLd } from '../components/Seo'
import { BacklinkDirectory } from '../components/BacklinkDirectory'
import { IndexingDisclaimer } from '../components/Shared'
import data from '../data/backlinks.json'
import suppliedData from '../data/supplied-links.json'
import type { BacklinkData } from '../data/types'

const backlinks = data as unknown as BacklinkData
const suppliedLinks = suppliedData as unknown as BacklinkData

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
          Below the verified KitQuarter directory, a second section lists client links supplied
          by the site owner.
        </p>
        <div className="mt-8">
          <BacklinkDirectory data={backlinks} showHeader={false} />
        </div>

        <div className="mt-16 border-t border-slate-200 pt-10 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white">Supplied client links</h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            {suppliedLinks.totalUrls} links supplied by the site owner for Render My Jewellery,
            InvitoAi, and KodeAlam, listed as provided and grouped by brand. These are{' '}
            <strong>not part of the verified KitQuarter directory above</strong> and have not all
            been independently checked as live — statuses shown (Live, Pending approval) are as
            supplied, and entries without a status are listed as supplied only.
          </p>
          <div className="mt-6">
            <BacklinkDirectory data={suppliedLinks} showHeader={false} />
          </div>
        </div>

        <div className="mt-10">
          <IndexingDisclaimer />
        </div>
      </section>
    </>
  )
}
