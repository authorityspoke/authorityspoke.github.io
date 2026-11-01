# Backlink Indexing Services

## Featured project

**[KitQuarter](https://kitquarter.com)** — free online tools for everyday life: free
calculators that just work, with accurate answers in seconds and the formulas shown.

A complete, production-quality static website for backlink discovery and indexing
services, built with **React + Vite + TypeScript + Tailwind CSS + lucide-react** and
deployed to **GitHub Pages** via GitHub Actions. Routing uses `HashRouter`, which works
without any server-side configuration on GitHub Pages.

## Pages

- Home (`#/`) — hero, live statistics, backlink directory, services, How It Works, FAQ, CTA
- About Us (`#/about`)
- Backlink Directory (`#/directory`)
- Backlink Indexing Services (`#/services`)
- SEO Resources (`#/resources`)
- Contact Us (`#/contact`)
- Privacy Policy (`#/privacy`), Terms and Conditions (`#/terms`), Disclaimer (`#/disclaimer`)

All pages share a top navigation, footer, breadcrumbs on inner pages, and a persisted
light/dark mode toggle (class-based, stored in `localStorage`).

## Quick start

```bash
npm install
npm run dev      # local development
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Importing your Excel backlink file

The directory is populated from a real imported file — no invented URLs. The current
data comes from the KitQuarter verified live-links file, copied into this project for
provenance at `data/kitquarter-live-links.csv` (87 lines = header + 86 verified rows)
and imported with:

```bash
npm run import:excel -- data/kitquarter-live-links.csv
```

Result: **86 URLs, 1 category ("General"), 0 duplicates removed, 0 unparseable rows**
(see `src/data/import-report.json`). Anchor text is the Platform value from the CSV
(e.g. Blogger, Rentry, Flickr); each entry's URL is the page's Live URL exactly as
written in the CSV — these are the pages that link to kitquarter.com, not
kitquarter.com itself.

To import a different file, place your spreadsheet at `data/backlinks.xlsx` (or any
`.xls`/`.xlsx`/`.csv` file) and run `npm run import:excel` (or pass a path as above),
then rebuild and redeploy. The empty-state message still applies if the data file is
ever reset to an empty array.

### How the import works (`scripts/import-excel.mjs`, using the `xlsx` package)

- **URL column auto-detection:** a header containing `url`, `link`, or `href`; otherwise the
  first column containing `http(s)` values in the first 50 data rows.
- **Category column:** a header containing `categor`, if present; otherwise every entry
  goes into the `"General"` category.
- **Anchor-text column:** a header containing `anchor`, `title`, or `name`, if present;
  otherwise the URL itself is used as the anchor text.
- **Every valid http/https URL is extracted**, preserving the original URL string exactly.
- **Exact duplicates** (case-sensitive URL string) are removed and the count is reported.
- **Unparseable rows are never silently discarded:** they are listed in
  `src/data/import-report.json` with sheet name, spreadsheet row number, reason, and raw
  content. Check that file after every import.
- Output files: `src/data/backlinks.json`
  (`{ generatedAt, totalUrls, totalCategories, categories, entries: [{url, anchor, category, sourceRow}] }`)
  and `src/data/import-report.json`.

### Updating the data later

Re-run the import, commit the regenerated `src/data/backlinks.json`, and push — the
deploy workflow rebuilds the site automatically.

## Deployment to GitHub Pages — user site: authorityspoke.github.io (step by step)

**Do not push from this build machine.** The main agent will create the
`authorityspoke.github.io` repository and push with the authorityspoke GitHub login.
The steps below describe that deployment; the GitHub Actions workflow in
`.github/workflows/deploy.yml` runs automatically on push.

1. **Create the repository** named exactly `authorityspoke.github.io` under the
   `authorityspoke` account, and push this project to its `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/authorityspoke/authorityspoke.github.io.git
   git push -u origin main
   ```
2. **Enable Pages:** Repository → Settings → Pages → under "Build and deployment",
   choose **Source: GitHub Actions**. The workflow in `.github/workflows/deploy.yml`
   (checkout → setup-node → `npm ci` → `npm run build` → upload-pages-artifact →
   deploy-pages, with `pages: write` and `id-token: write` permissions) runs on every
   push to `main`, and the site is served at `https://authorityspoke.github.io/`.
3. **Base path:** this is a user site, so `vite.config.ts` defaults to `VITE_BASE=/`.
   Only change it if you ever convert this to a project site
   (`VITE_BASE=/<repo-name>/ npm run build`).
4. **Production domain:** already set to `https://authorityspoke.github.io` in
   `src/config/site.ts` (`SITE_URL`), `public/sitemap.xml`, and `public/robots.txt`.
   If the domain ever changes, update those three places and redeploy. Canonical URLs,
   Open Graph URLs, and the sitemap all derive from it.
5. **Data is already imported** (86 KitQuarter live links — see above). To update it
   later, re-run the import, commit the regenerated `src/data/backlinks.json`, and push.
6. **Submit the sitemap:**
   - Google Search Console: add your property, then Sitemaps → submit
     `https://authorityspoke.github.io/sitemap.xml`.
   - Bing Webmaster Tools: add your site, then Sitemaps → submit the same URL.

## Technical SEO notes

- Per-page `<title>` and unique meta description, canonical link, Open Graph and Twitter
  Card tags are set on route change by the `Seo` component (`src/components/Seo.tsx`).
  Note: because GitHub Pages serves a static SPA, these tags are applied at runtime in
  the browser, not at crawl time from the server. The static `index.html` carries the
  homepage title and description for the initial load.
- JSON-LD: `Organization` and `WebSite` on the homepage, `BreadcrumbList` on inner
  pages, and `FAQPage` on the homepage FAQ only.
- `public/sitemap.xml` lists **only the 9 pages hosted on this website**. External
  backlink directory URLs are deliberately **not** in the sitemap, because they are not
  pages hosted here.
- `public/robots.txt` allows crawling of public content and points to the sitemap.
- `public/404.html` redirects unknown paths to the matching hash route for the SPA.
- The contact form is a front-end demonstration: connect it to a form service
  (e.g. Formspree) to receive messages; see the note on the Contact page.

## Honest indexing disclaimer

Listing or submitting a URL does **not** guarantee Google indexing. External backlink
URLs are **not** pages hosted on this website, and nothing on this site is
automatically submitted to any indexing API. This disclaimer appears on the Home,
Services, and Directory pages and in full on the Disclaimer page.

## Project structure

```
public/                  # copied verbatim to dist/: sitemap.xml, robots.txt, humans.txt,
                         # site.webmanifest, favicon.svg, 404.html
scripts/import-excel.mjs # spreadsheet -> src/data/backlinks.json
src/
  config/site.ts         # SITE_URL placeholder — replace with your real domain
  data/backlinks.json    # generated directory data (86 KitQuarter live links, imported)
  data/import-report.json# generated import report (0 unparseable rows for the current import)
  components/            # Seo, Layout, BacklinkDirectory, Shared (services, FAQ, disclaimer)
  pages/                 # Home, About, Directory, Services, Resources, Contact, Legal
src/App.tsx              # HashRouter routes (9 pages + 404 fallback)
.github/workflows/deploy.yml
```

## Performance and accessibility

- No stock photos: visuals are CSS/SVG only, fonts load with `display=swap` and
  preconnect, and JavaScript is limited to React + router + icons.
- Interactive controls carry `aria-label`/`aria-pressed` attributes, filters are
  keyboard-accessible, landmarks (`header`, `nav`, `main`, `footer`) are semantic,
  and `prefers-reduced-motion` disables animations.
