export interface BacklinkEntry {
  url: string
  anchor: string
  category: string
  sourceRow: number
  /** As-supplied status (e.g. Live / Pending / Supplied). Absent for verified imports. */
  status?: string
}

export interface BacklinkData {
  generatedAt: string | null
  totalUrls: number
  totalCategories: number
  categories: string[]
  entries: BacklinkEntry[]
}
