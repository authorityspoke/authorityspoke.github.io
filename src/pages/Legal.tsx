import { Seo, breadcrumbJsonLd } from '../components/Seo'
import type { ReactNode } from 'react'

function LegalShell({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  return (
    <>
      <Seo
        title={title}
        description={`${title} for Backlink Indexing Services.`}
        path={path}
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: title, path }])}
      />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h1 className="text-4xl font-extrabold text-navy-900 dark:text-white">{title}</h1>
        <div className="mt-6 space-y-6 leading-relaxed text-slate-600 dark:text-slate-300">{children}</div>
      </section>
    </>
  )
}

export function Privacy() {
  return (
    <LegalShell title="Privacy Policy" path="/privacy">
      <p>
        This website is a static site hosted on GitHub Pages. We do not operate a database of
        visitor accounts, and we do not sell personal data.
      </p>
      <h2 className="text-xl font-bold text-navy-900 dark:text-white">Information collected</h2>
      <p>
        If you use the contact form, the name, email address, and message you provide are used
        only to respond to your enquiry. The backlink directory contains only URLs supplied via
        the site owner's spreadsheet import; it does not contain visitor personal data.
      </p>
      <h2 className="text-xl font-bold text-navy-900 dark:text-white">Cookies and analytics</h2>
      <p>
        No analytics or advertising cookies are set by this site itself. Your light/dark mode
        preference is stored only in your own browser's local storage. GitHub Pages, as the
        hosting provider, may log standard server information as described in GitHub's own
        privacy documentation.
      </p>
      <h2 className="text-xl font-bold text-navy-900 dark:text-white">Third-party links</h2>
      <p>
        Directory links point to third-party websites with their own privacy practices. We are
        not responsible for their content or data handling.
      </p>
      <h2 className="text-xl font-bold text-navy-900 dark:text-white">Contact</h2>
      <p>
        Privacy questions can be sent via the Contact Us page.
      </p>
    </LegalShell>
  )
}

export function Terms() {
  return (
    <LegalShell title="Terms and Conditions" path="/terms">
      <p>
        By using this website you agree to these terms. If you do not agree, please do not use
        the site.
      </p>
      <h2 className="text-xl font-bold text-navy-900 dark:text-white">Use of the site</h2>
      <p>
        Content is provided for general information about backlink discovery and indexing
        services. You may browse the directory and share links to this site's own pages. You
        must not scrape the site in a way that degrades it for others, misrepresent the
        directory as your own work, or use it for unlawful purposes.
      </p>
      <h2 className="text-xl font-bold text-navy-900 dark:text-white">No guarantees</h2>
      <p>
        Nothing on this site guarantees search engine indexing, rankings, or traffic. Service
        descriptions describe process and deliverables, not outcomes decided by third-party
        search engines.
      </p>
      <h2 className="text-xl font-bold text-navy-900 dark:text-white">External links</h2>
      <p>
        External directory links are provided as supplied by the site owner. We do not endorse,
        control, or accept responsibility for third-party content.
      </p>
      <h2 className="text-xl font-bold text-navy-900 dark:text-white">Changes</h2>
      <p>
        These terms may be updated; the current version published here applies.
      </p>
    </LegalShell>
  )
}

export function Disclaimer() {
  return (
    <LegalShell title="Disclaimer" path="/disclaimer">
      <p>
        The information on this website is provided for general informational purposes about
        backlink discovery and indexing. It is not legal, financial, or professional advice.
      </p>
      <h2 className="text-xl font-bold text-navy-900 dark:text-white">Indexing disclaimer</h2>
      <p>
        Listing, publishing, or submitting a URL does not guarantee that Google, Bing, or any
        other search engine will crawl or index it. Indexing decisions are made solely by the
        search engines, and delays or non-indexing are common. No indexing outcome is claimed
        on this site without verification.
      </p>
      <h2 className="text-xl font-bold text-navy-900 dark:text-white">External URLs are not our pages</h2>
      <p>
        Backlink directory URLs point to third-party websites. They are not pages hosted on
        this website, they are not included in this website's sitemap as hosted pages, and
        nothing on this site is automatically submitted to any indexing API on their behalf.
      </p>
      <h2 className="text-xl font-bold text-navy-900 dark:text-white">Accuracy</h2>
      <p>
        Directory entries reflect the spreadsheet data supplied to the import tool, with exact
        duplicates removed and unparseable rows reported separately. Linked third-party pages
        may change or disappear without notice.
      </p>
    </LegalShell>
  )
}
