import { useEffect } from 'react'
import { SITE_NAME, SITE_URL } from '../config/site'

export interface JsonLdProps {
  data: Record<string, unknown>
}

/** Renders a JSON-LD script tag for structured data. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export interface SeoProps {
  title: string
  description: string
  path?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Sets document title, meta description, canonical, Open Graph and
 * Twitter Card tags on route change (client SPA — no SSR available
 * on GitHub Pages, so these tags are applied at runtime).
 */
export function Seo({ title, description, path = '/', jsonLd }: SeoProps) {
  useEffect(() => {
    document.title = `${title} | ${SITE_NAME}`
    const setMeta = (attr: string, key: string, value: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
    }
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', `${title} | ${SITE_NAME}`)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', `${SITE_URL}${path}`)
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', `${title} | ${SITE_NAME}`)
    setMeta('name', 'twitter:description', description)
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${SITE_URL}${path}`)
  }, [title, description, path])

  if (!jsonLd) return null
  const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
  return (
    <>
      {items.map((item, i) => (
        <JsonLd key={i} data={item} />
      ))}
    </>
  )
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Backlink discovery and indexing services for SEO professionals.',
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}
