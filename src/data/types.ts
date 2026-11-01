export interface BacklinkEntry {
  url: string
  anchor: string
  category: string
  sourceRow: number
}

export interface BacklinkData {
  generatedAt: string | null
  totalUrls: number
  totalCategories: number
  categories: string[]
  entries: BacklinkEntry[]
}
