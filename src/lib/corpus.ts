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
  extracted_docket_number?: string | null
  extracted_reporter_citation?: string | null
  extracted_case_name?: string | null
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
  | 'court'
  | 'jurisdiction'
  | 'state_code'
  | 'date_published'
  | 'plan_legal_category'
  | 'strict_qdro_relevance'
  | 'retirement_division_relevance'
  | 'family_law_relevance'
  | 'status'
  | 'review_status'
> & {
  citation_is_placeholder?: boolean
  display_name?: string | null
  extracted_docket_number?: string | null
  extracted_reporter_citation?: string | null
  source_host?: string | null
  source_opinion_id?: string | null
  citation_year?: number | null
  topic_terms?: string[]
  relevance_total?: number
  search_terms?: string
  page_url?: string
}

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
  const uniqueCases = [...new Map(manifest.cases.map((item) => [item.slug, item])).values()]
  return uniqueCases.sort((a, b) => {
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

function tokenize(value: string | null | undefined) {
  return new Set(
    (value ?? '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((token) => token.length > 3 && !['matter', 'estate', 'court', 'appeal', 'appellant', 'respondent'].includes(token)),
  )
}

function sharedTokenCount(left: Set<string>, right: Set<string>) {
  let count = 0
  for (const token of left) {
    if (right.has(token)) count += 1
  }
  return count
}

function cleanText(value: unknown) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function firstMatch(value: string | null | undefined, patterns: RegExp[]) {
  const text = cleanText(value)
  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match?.[1] || match?.[0]) return cleanText(match[1] ?? match[0]).replace(/[,.]+$/, '')
  }
  return null
}

export function isPlaceholderCitation(value: string | null | undefined) {
  const normalized = cleanText(value).toLowerCase()
  return !normalized || ['qdro', 'qualified domestic relations order', 'pension', 'erisa', 'retirement benefits'].includes(normalized)
}

export function extractCorpusDocketNumber(item: Pick<CorpusCase, 'full_text'>) {
  return firstMatch(item.full_text, [
    /\b(?:No\.|Nos\.|NUMBER)\s+([A-Z0-9][A-Z0-9 .:\-–/]{2,60}?)(?=\s{2,}|\s(?:COURT|IN THE|Appeal|Filed|$))/i,
    /\bDocket\s+(?:No\.|Nos\.)?\s*([A-Z0-9][A-Z0-9 .:\-–/]{2,50})/i,
  ])
}

export function extractCorpusReporterCitation(item: Pick<CorpusCase, 'citation' | 'full_text'>) {
  if (!isPlaceholderCitation(item.citation)) return item.citation ?? null
  return firstMatch(item.full_text, [
    /\b(\d{1,4}\s+(?:F\.?\s?(?:Supp\.?\s?\d*d?|App'?x|\d+d)|U\.S\.|S\.\s?Ct\.|L\.\s?Ed\.\s?\d+d|Cal\.\s?(?:App\.)?\s?\d*[a-z]*|N\.Y\.S\.\d+d|S\.W\.\d+d|N\.E\.\d+d|N\.W\.\d+d|P\.\d+d|A\.\d+d|So\.\d+d)\s+\d{1,5})\b/i,
  ])
}

export function extractCorpusCaseName(item: Pick<CorpusCase, 'title' | 'full_text'>) {
  const title = cleanText(item.title)
  if (title && !/^CourtListener opinion \d+$/i.test(title) && !isPlaceholderCitation(title)) return title
  return firstMatch(item.full_text, [
    /\b([A-Z][A-Z.'’&\- ]{2,80}\s+v\.\s+[A-Z][A-Z.'’&\- ]{2,80})\b/,
    /\b(In re (?:the )?(?:Marriage|Estate|Matter) of [A-Z][A-Za-z.'’&\- ]{2,80})\b/i,
  ])
}

export function getRelatedCorpusCases(item: CorpusCase, limit = 6): CorpusManifestCase[] {
  const currentTokens = tokenize(`${item.title} ${item.citation ?? ''} ${item.plan_legal_category}`)
  const currentTopics = new Set((item as CorpusCase & { topic_terms?: string[] }).topic_terms ?? [])
  const currentYear = item.date_published ? Number.parseInt(item.date_published.slice(0, 4), 10) : null

  return getAllCorpusCases()
    .filter((candidate) => candidate.slug !== item.slug)
    .map((candidate) => {
      const candidateTokens = tokenize(`${candidate.title} ${candidate.citation ?? ''} ${candidate.plan_legal_category} ${(candidate.topic_terms ?? []).join(' ')}`)
      const sharedTopics = (candidate.topic_terms ?? []).filter((topic) => currentTopics.has(topic)).length
      const textScore = sharedTokenCount(currentTokens, candidateTokens) * 3
      const topicScore = sharedTopics * 5
      const yearScore = currentYear && candidate.citation_year ? Math.max(0, 4 - Math.floor(Math.abs(candidate.citation_year - currentYear) / 5)) : 0
      const sourceScore = candidate.source_host && item.source_url?.includes(candidate.source_host) ? 2 : 0
      const relevanceScore =
        Math.max(0, 5 - Math.abs(candidate.strict_qdro_relevance - item.strict_qdro_relevance)) +
        Math.max(0, 5 - Math.abs(candidate.retirement_division_relevance - item.retirement_division_relevance)) +
        Math.max(0, 5 - Math.abs(candidate.family_law_relevance - item.family_law_relevance))
      return { candidate, score: textScore + topicScore + yearScore + sourceScore + relevanceScore }
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return a.candidate.title.localeCompare(b.candidate.title)
    })
    .slice(0, limit)
    .map(({ candidate }) => candidate)
}

export function formatCorpusDate(date?: string | null) {
  if (!date) return 'Date unknown'
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(parsed)
}
