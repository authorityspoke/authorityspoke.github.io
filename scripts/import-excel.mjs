#!/usr/bin/env node
/**
 * Import backlink URLs from an .xls / .xlsx spreadsheet — or a .csv file in the same
 * format — into src/data/backlinks.json.
 *
 * Usage:
 *   npm run import:excel                 # reads data/backlinks.xlsx
 *   npm run import:excel -- data/my.xlsx # reads a custom path (also: node scripts/import-excel.mjs data/my.xlsx)
 *   npm run import:excel -- data/kitquarter-live-links.csv  # CSV format: Platform, Live URL, ...
 *
 * Behaviour (no invented URLs, no silent discards):
 * - Auto-detects the URL column: a header containing url/link/href, or — if there is no
 *   header row — the first column containing http(s) values.
 * - Auto-detects a category column (header containing categor) and an anchor-text column
 *   (header containing anchor/text/title/name) when present. Rows without a category go to "General".
 * - Extracts EVERY valid http/https URL, preserving the original URL string exactly.
 * - Removes exact duplicates (case-sensitive URL string) and reports how many were removed.
 * - Rows with no valid URL are listed separately in src/data/import-report.json with
 *   their spreadsheet row number and a reason — they are never silently dropped.
 *
 * Output:
 * - src/data/backlinks.json: { generatedAt, totalUrls, totalCategories, categories, entries: [{url, anchor, category, sourceRow}] }
 * - src/data/import-report.json: { sourceFile, generatedAt, totalRowsSeen, validUrls, duplicatesRemoved, unparseableRows: [{row, reason, raw}] }
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as XLSX from 'xlsx'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const inputArg = process.argv[2]
const inputPath = path.resolve(root, inputArg || 'data/backlinks.xlsx')
const outData = path.join(root, 'src', 'data', 'backlinks.json')
const outReport = path.join(root, 'src', 'data', 'import-report.json')

function isValidUrl(value) {
  if (typeof value !== 'string') return false
  const trimmed = value.trim()
  if (!/^https?:\/\//i.test(trimmed)) return false
  try {
    new URL(trimmed)
    return true
  } catch {
    return false
  }
}

function normaliseCell(value) {
  if (value === null || value === undefined) return ''
  return String(value).trim()
}

/** Minimal RFC-4180-style CSV parser (quoted fields, doubled quotes, embedded commas/newlines). */
function parseCsvRows(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  const pushField = () => {
    row.push(field)
    field = ''
  }
  const pushRow = () => {
    pushField()
    rows.push(row)
    row = []
  }
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      pushField()
    } else if (ch === '\n') {
      pushRow()
    } else if (ch !== '\r') {
      field += ch
    }
  }
  if (field !== '' || row.length > 0) pushRow()
  return rows.filter((r) => !(r.length === 1 && r[0] === ''))
}

function main() {
  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`)
    console.error('Place your spreadsheet at data/backlinks.xlsx or pass a path: npm run import:excel -- data/your-file.xlsx')
    process.exit(1)
  }

  const isCsv = inputPath.toLowerCase().endsWith('.csv')
  const sheets = isCsv
    ? [{ name: 'csv', rows: parseCsvRows(fs.readFileSync(inputPath, 'utf8')) }]
    : (() => {
        const workbook = XLSX.readFile(inputPath)
        return workbook.SheetNames.map((sheetName) => ({
          name: sheetName,
          rows: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, defval: '', raw: false }),
        }))
      })()
  const entries = []
  const seen = new Set()
  const unparseableRows = []
  let duplicatesRemoved = 0
  let totalRowsSeen = 0

  for (const { name: sheetName, rows } of sheets) {
    if (rows.length === 0) continue

    // Detect a header row: any cell containing url/link/href/category/anchor.
    const firstRow = rows[0].map((c) => normaliseCell(c).toLowerCase())
    const hasHeader = firstRow.some((c) => /url|link|href|categor|anchor|title|name/.test(c))
    const dataStart = hasHeader ? 1 : 0

    let urlCol = -1
    let categoryCol = -1
    let anchorCol = -1
    if (hasHeader) {
      urlCol = firstRow.findIndex((c) => /url|link|href/.test(c))
      categoryCol = firstRow.findIndex((c) => /categor/.test(c))
      anchorCol = firstRow.findIndex((c) => /anchor|anchor text|title|name|platform/.test(c))
      if (anchorCol === urlCol) anchorCol = -1
    }
    if (urlCol === -1) {
      // Fallback: first column (scanning the first 50 data rows) containing http values.
      const colCount = Math.max(...rows.map((r) => r.length))
      for (let col = 0; col < colCount; col++) {
        const hits = rows.slice(dataStart, dataStart + 50).filter((r) => isValidUrl(normaliseCell(r[col])))
        if (hits.length > 0) {
          urlCol = col
          break
        }
      }
    }

    for (let i = dataStart; i < rows.length; i++) {
      const row = rows[i]
      const rowNumber = i + 1 // 1-based spreadsheet row
      totalRowsSeen++
      if (row.every((c) => normaliseCell(c) === '')) continue // blank row: not an entry, not an error

      if (urlCol === -1) {
        unparseableRows.push({ sheet: sheetName, row: rowNumber, reason: 'No URL column could be detected in this sheet.', raw: row.map(normaliseCell).join(' | ').slice(0, 200) })
        continue
      }

      const rawUrl = normaliseCell(row[urlCol])
      if (!isValidUrl(rawUrl)) {
        unparseableRows.push({ sheet: sheetName, row: rowNumber, reason: `Cell in URL column is not a valid http/https URL: "${rawUrl}".`, raw: row.map(normaliseCell).join(' | ').slice(0, 200) })
        continue
      }

      if (seen.has(rawUrl)) {
        duplicatesRemoved++
        continue
      }
      seen.add(rawUrl)
      const categoryRaw = categoryCol >= 0 ? normaliseCell(row[categoryCol]) : ''
      const anchorRaw = anchorCol >= 0 ? normaliseCell(row[anchorCol]) : ''
      entries.push({
        url: rawUrl,
        anchor: anchorRaw || rawUrl,
        category: categoryRaw || 'General',
        sourceRow: rowNumber,
      })
    }
  }

  const categories = [...new Set(entries.map((e) => e.category))].sort((a, b) => a.localeCompare(b))
  const generatedAt = new Date().toISOString()
  const dataOut = {
    generatedAt,
    totalUrls: entries.length,
    totalCategories: categories.length,
    categories,
    entries,
  }
  const reportOut = {
    sourceFile: path.relative(root, inputPath),
    generatedAt,
    totalRowsSeen,
    validUrls: entries.length,
    duplicatesRemoved,
    unparseableRows,
  }

  fs.mkdirSync(path.dirname(outData), { recursive: true })
  fs.writeFileSync(outData, JSON.stringify(dataOut, null, 2) + '\n')
  fs.writeFileSync(outReport, JSON.stringify(reportOut, null, 2) + '\n')

  console.log(`Imported ${entries.length} URLs across ${categories.length} categories from ${inputPath}`)
  console.log(`Duplicates removed: ${duplicatesRemoved}`)
  console.log(`Unparseable rows: ${unparseableRows.length} (see src/data/import-report.json)`)
  console.log(`Wrote ${path.relative(root, outData)} and ${path.relative(root, outReport)}`)
}

main()
