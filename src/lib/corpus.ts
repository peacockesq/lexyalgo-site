import fs from 'node:fs'
import path from 'node:path'

export type CorpusCase = {
  document_id: string
  slug: string
  title: string
  citation?: string | null
  source_url?: string | null
  source_type: string
  source_permissions: string
  jurisdiction?: string | null
  state_code?: string | null
  court?: string | null
  date_published?: string | null
  strict_qdro_relevance: number
  retirement_division_relevance: number
  family_law_relevance: number
  plan_legal_category: string
  signals: Record<string, number>
  generated_headnote: string
  generated_holding: string
  evidence_quotes: Array<{ label: string; quote: string }>
  full_text: string
  status: string
  review_status: string
  generated_at: string
}

export type CorpusManifestCase = Pick<
  CorpusCase,
  | 'slug'
  | 'title'
  | 'citation'
  | 'source_url'
  | 'strict_qdro_relevance'
  | 'retirement_division_relevance'
  | 'family_law_relevance'
  | 'status'
>

export type CorpusManifest = {
  generated_at: string
  run_name: string
  run_id: string
  case_count: number
  cases: CorpusManifestCase[]
}

const corpusDirectory = path.join(process.cwd(), 'content', 'corpus')
const casesDirectory = path.join(corpusDirectory, 'cases')
const manifestPath = path.join(corpusDirectory, 'manifest.json')

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T
}

export function getCorpusManifest(): CorpusManifest | null {
  if (!fs.existsSync(manifestPath)) return null
  return readJson<CorpusManifest>(manifestPath)
}

export function getAllCorpusCases(): CorpusManifestCase[] {
  const manifest = getCorpusManifest()
  if (!manifest) return []
  return [...manifest.cases].sort((a, b) => {
    const scoreA = a.strict_qdro_relevance + a.retirement_division_relevance + a.family_law_relevance
    const scoreB = b.strict_qdro_relevance + b.retirement_division_relevance + b.family_law_relevance
    if (scoreB !== scoreA) return scoreB - scoreA
    return a.title.localeCompare(b.title)
  })
}

export function getCorpusCaseBySlug(slug: string): CorpusCase | null {
  const safeSlug = slug.replace(/[^a-z0-9-]/g, '')
  const filePath = path.join(casesDirectory, `${safeSlug}.json`)
  if (!fs.existsSync(filePath)) return null
  return readJson<CorpusCase>(filePath)
}

export function getCorpusCaseSlugs(): string[] {
  if (!fs.existsSync(casesDirectory)) return []
  return fs
    .readdirSync(casesDirectory)
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.replace(/\.json$/, ''))
}

export function formatCorpusDate(date?: string | null) {
  if (!date) return 'Date unknown'
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(parsed)
}
