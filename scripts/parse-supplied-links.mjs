// Parse the user-supplied client links list (data/supplied-links-raw.txt) into
// src/data/supplied-links.json in the same BacklinkData shape used by the site.
// These links are listed AS SUPPLIED — they are not the verified KitQuarter
// directory and are not independently checked as live here.
// Usage: node scripts/parse-supplied-links.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const rawPath = path.join(root, 'data', 'supplied-links-raw.txt')
const outPath = path.join(root, 'src', 'data', 'supplied-links.json')

const NAMES = {
  'coub.com': 'Coub',
  'myanimelist.net': 'MyAnimeList',
  'wakelet.com': 'Wakelet',
  'pixabay.com': 'Pixabay',
  'kktix.com': 'KKTIX',
  'producthunt.com': 'Product Hunt',
  'lite.link': 'Lite.link',
  'spreaker.com': 'Spreaker',
  'wegotaguy.net': 'WeGotAGuy',
  'connectifyph.com': 'ConnectifyPH',
  'connectgalaxy.com': 'ConnectGalaxy',
  'cybo.com': 'Cybo',
  'yplocal.com': 'YP Local',
  'woll2woll.com': 'Woll2Woll',
  'wireanium.com': 'Wireanium',
  'westsidedancept.com': 'Westside Dance PT',
  'uzahighstreet.com': 'Uza Highstreet',
  'tact2.com': 'Tact2',
  'bestloveweddingstudio.com': 'Best Love Wedding Studio',
  'bonback.com': 'Bonback',
  'dideadesign.com': 'Dideadesign',
  'driedsquidathome.com': 'Dried Squid At Home',
  'ekdarun.com': 'Ekdarun',
  'fw-follow.com': 'FW Follow',
  'natthadon-sanengineering.com': 'Natthadon Sanengineering',
  'navacool.com': 'Navacool',
  'nongkhaempolice.com': 'Nongkhaem Police',
  'rueanmaihom.net': 'Rueanmaihom',
  'bit.ly': 'Bit.ly',
  'wikidot.com': 'Wikidot',
  'talkshoe.com': 'TalkShoe',
  'ticketgateway.com': 'TicketGateway',
  'rendermyjewelry.com': 'Render My Jewellery',
  'linkmate.mn.co': 'Linkmate',
  'pastelink.net': 'Pastelink',
  'aveli.link': 'Aveli.link',
  'ekonty.com': 'Ekonty',
  'carrieconnects.com': 'CarrieConnects',
  'smartseoarticle.com': 'Smart SEO Article',
  'smartseobacklink.com': 'Smart SEO Backlink',
  'webdirectorylink.com': 'Web Directory Link',
  'webseobacklink.com': 'Web SEO Backlink',
  'directory-web.com': 'Directory Web',
  'substack.com': 'Substack',
  'abletkddenville.com': 'Ablet KD DenVille',
  'thetechcounter.com': 'The Tech Counter',
  'ganjingworld.com': 'Ganjing World',
  'xpressurway.com': 'XpressUrWay',
  'create.piktochart.com': 'Piktochart',
  'piktochart.com': 'Piktochart',
  'peatix.com': 'Peatix',
  'magcloud.com': 'MagCloud',
  'kiva.org': 'Kiva',
  'manta.com': 'Manta',
  'devpost.com': 'Devpost',
  'kongregate.com': 'Kongregate',
  'medium.com': 'Medium',
  'backlinksmasterpro.blogspot.com': 'Backlinks Master Pro',
  'mewe.com': 'MeWe',
  'mastodon.social': 'Mastodon',
  'flipboard.com': 'Flipboard',
  'hackernoon.com': 'HackerNoon',
  'huggingface.co': 'Hugging Face',
  'sourceforge.net': 'SourceForge',
  'codeberg.org': 'Codeberg',
  'npmjs.com': 'npm',
  'pypi.org': 'PyPI',
  'leetcode.com': 'LeetCode',
  'panchit.com': 'Panchit',
  'stardust.run': 'Stardust',
  'komoot.com': 'Komoot',
  'phoenixpearltea.com': 'Phoenix Pearl Tea',
  'botitmobal.wixsite.com': 'Wixsite',
  'multiversal.co.in': 'Multiversal',
  'app.samsungfood.com': 'Samsung Food',
  'samsungfood.com': 'Samsung Food',
  'kick.com': 'Kick',
  'pledgeme.co.nz': 'PledgeMe',
  'globaldemocracy.com': 'Global Democracy',
  'app.parler.com': 'Parler',
  'parler.com': 'Parler',
  'participate.oidp.net': 'OIDP',
  'ornamentsbyclaudia.com': 'Ornaments by Claudia',
  'globaltradehubs.com': 'Global Trade Hubs',
  'socialsocial.social': 'SocialSocial',
  'orpetron.com': 'Orpetron',
  'soniamittal110006.mn.co': 'Mighty Networks',
  'robustdirectory.com': 'Robust Directory',
  'rendermyjewellery.curious.page': 'Curious.page',
  'disqus.com': 'Disqus',
  'fanpage.to': 'Fanpage.to',
  'linkee.io': 'Linkee',
  'ming.ly': 'Ming.ly',
  'zenn.dev': 'Zenn',
  'givesendgo.com': 'GiveSendGo',
  'plaza.rakuten.co.jp': 'Rakuten Plaza',
  'idol.st': 'Idol.st',
  'xn--jxanabrb4asmv3b4a.cybo.com': 'Cybo',
}

const BRAND_RMJ = 'Render My Jewellery'
const BRAND_INVITO = 'InvitoAi'
const BRAND_KODEALAM = 'KodeAlam'

function displayName(rawUrl) {
  let host = ''
  try {
    host = new URL(rawUrl).hostname.replace(/^www\./, '')
  } catch {
    return rawUrl
  }
  if (NAMES[host]) return NAMES[host]
  const parts = host.split('.')
  if (parts.length > 2 && NAMES[parts.slice(1).join('.')]) return NAMES[parts.slice(1).join('.')]
  const base = parts[0]
  return base.charAt(0).toUpperCase() + base.slice(1)
}

function brandFor(rawUrl, sectionBrand) {
  const u = rawUrl.toLowerCase()
  if (u.includes('invitoai')) return BRAND_INVITO
  if (u.includes('kodealam')) return BRAND_KODEALAM
  if (u.includes('ozilkhan') || u.includes('oz_il') || u.includes('oz-il')) return BRAND_INVITO
  if (
    u.includes('rendermy') ||
    u.includes('rendermj') ||
    u.includes('rmj') ||
    u.includes('jewellery') ||
    u.includes('jewllery') ||
    u.includes('jadoon') ||
    u.includes('hamza')
  )
    return BRAND_RMJ
  return sectionBrand
}

function normalizeUrl(cell) {
  let url = cell.trim()
  if (!url) return null
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url
  let parsed
  try {
    parsed = new URL(url)
  } catch {
    return null
  }
  parsed.hash = ''
  if (parsed.search === '?') parsed.search = ''
  return parsed.toString()
}

function dedupeKey(url) {
  const parsed = new URL(url)
  const host = parsed.hostname.replace(/^www\./, '').toLowerCase()
  const p = parsed.pathname.replace(/\/$/, '')
  return host + p + parsed.search
}

const lines = readFileSync(rawPath, 'utf8').split(/\r?\n/)
// Hosts of the KodeAlam forum topics: their bare homepages, pasted right after
// the topics, belong to the same group.
const kodealamHosts = new Set()
for (const line of lines) {
  if (line.toLowerCase().includes('kodealam')) {
    for (const cell of line.split('\t')) {
      try {
        kodealamHosts.add(new URL(cell.trim()).hostname.replace(/^www\./, ''))
      } catch {
        // not a URL
      }
    }
  }
}

const entries = []
const seen = new Set()
let sectionBrand = BRAND_RMJ
let skipped = 0

lines.forEach((line, idx) => {
  const row = idx + 1
  if (!line.trim()) return
  const cells = line.split('\t').map((c) => c.trim())
  const lower = line.trim().toLowerCase()
  if (lower === 'rmj') {
    sectionBrand = BRAND_RMJ
    return
  }
  if (lower === 'invitoai' || lower === 'invitao') {
    sectionBrand = BRAND_INVITO
    return
  }
  if (lower === 'jewelry rendering services') {
    sectionBrand = BRAND_RMJ
    return
  }
  const status = /pending admin approval/i.test(line)
    ? 'Pending'
    : /\bLive\b/.test(line)
      ? 'Live'
      : 'Supplied'
  for (const cell of cells) {
    if (!cell) continue
    if (/^(rmj|invitoai|invitao|jewelry rendering services)$/i.test(cell)) continue
    if (/^(pending admin approval|live)$/i.test(cell)) continue
    if (!cell.includes('.')) continue
    const url = normalizeUrl(cell)
    if (!url) {
      skipped++
      continue
    }
    const key = dedupeKey(url)
    if (seen.has(key)) continue
    seen.add(key)
    let brand = brandFor(url, sectionBrand)
    try {
      const host = new URL(url).hostname.replace(/^www\./, '')
      if (kodealamHosts.has(host) && new URL(url).pathname.replace(/\/$/, '') === '') {
        brand = BRAND_KODEALAM
      }
    } catch {
      // keep brand
    }
    entries.push({
      url,
      anchor: displayName(url),
      category: brand,
      sourceRow: row,
      status,
    })
  }
})

const order = { [BRAND_RMJ]: 0, [BRAND_INVITO]: 1, [BRAND_KODEALAM]: 2 }
entries.sort(
  (a, b) => order[a.category] - order[b.category] || a.anchor.localeCompare(b.anchor),
)
const categories = [...new Set(entries.map((e) => e.category))]

const out = {
  generatedAt: new Date().toISOString(),
  totalUrls: entries.length,
  totalCategories: categories.length,
  categories,
  entries,
}
writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n')

const byBrand = {}
const byStatus = {}
for (const e of entries) {
  byBrand[e.category] = (byBrand[e.category] || 0) + 1
  byStatus[e.status] = (byStatus[e.status] || 0) + 1
}
console.log(`Parsed ${entries.length} unique links (${skipped} skipped)`)
console.log('By brand:', JSON.stringify(byBrand))
console.log('By status:', JSON.stringify(byStatus))
