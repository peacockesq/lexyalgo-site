import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const corpusDir = path.join(root, 'content', 'corpus')
const casesDir = path.join(corpusDir, 'cases')
const sourceManifestPath = path.join(corpusDir, 'manifest.json')
const publicCorpusDir = path.join(root, 'public', 'corpus')
const publicRagDir = path.join(publicCorpusDir, 'rag')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function cleanText(value) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
}

function sourceHost(sourceUrl) {
  if (!sourceUrl) return null
  try {
    return new URL(sourceUrl).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

function sourceOpinionId(sourceUrl) {
  if (!sourceUrl) return null
  try {
    const url = new URL(sourceUrl)
    if (!url.hostname.includes('courtlistener.com')) return null
    const match = url.pathname.match(/\/opinion\/(\d+)\//)
    return match?.[1] ?? null
  } catch {
    return null
  }
}

function isPlaceholderCitation(value) {
  const normalized = cleanText(value).toLowerCase()
  return !normalized || ['qdro', 'pension', 'erisa', 'retirement benefits'].includes(normalized)
}

function citationYear(item) {
  const candidates = [item.date_published, item.citation, item.title].filter(Boolean).map(String)
  for (const value of candidates) {
    const match = value.match(/\b(18|19|20)\d{2}\b/)
    if (match) return Number(match[0])
  }
  return null
}

const topicPatterns = [
  ['survivor_annuity', /survivor\s+annuity|survivorship/i],
  ['erisa', /\bERISA\b|29\s+U\.S\.C\.?\s*§?\s*1056|1056\(d\)\(3\)/i],
  ['pension', /\bpension\b|defined\s+benefit/i],
  ['401k', /401\s*\(?k\)?|defined\s+contribution/i],
  ['military_retirement', /military\s+retirement|USFSPA|uniformed\s+services/i],
  ['public_employee_retirement', /public\s+employee|PERS|CalPERS|teacher'?s?\s+retirement/i],
  ['post_judgment_enforcement', /post[-\s]judgment|contempt|enforce|modif/i],
  ['present_value', /present\s+value|valuation|coverture|marital\s+portion/i],
]

function topicTerms(item) {
  const haystack = cleanText([
    item.title,
    item.citation,
    item.court,
    item.jurisdiction,
    item.plan_legal_category,
    item.generated_headnote,
    item.generated_holding,
    ...(item.evidence_quotes ?? []).map((quote) => `${quote.label} ${quote.quote}`),
  ].filter(Boolean).join(' '))
  return topicPatterns.filter(([, pattern]) => pattern.test(haystack)).map(([topic]) => topic)
}

function relevanceTotal(item) {
  return (item.strict_qdro_relevance ?? 0) + (item.retirement_division_relevance ?? 0) + (item.family_law_relevance ?? 0)
}

function searchTerms(item, topics = topicTerms(item)) {
  return cleanText([
    item.title,
    isPlaceholderCitation(item.citation) ? '' : item.citation,
    item.court,
    item.jurisdiction,
    item.state_code,
    item.plan_legal_category,
    sourceHost(item.source_url),
    sourceOpinionId(item.source_url),
    ...topics,
  ].filter(Boolean).join(' ')).toLowerCase()
}

function csvCell(value) {
  const text = Array.isArray(value) ? value.join('|') : String(value ?? '')
  return `"${text.replaceAll('"', '""')}"`
}

function countBy(items, keyFn) {
  const counts = new Map()
  for (const item of items) {
    const key = keyFn(item)
    if (key === null || key === undefined || key === '') continue
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || String(a.value).localeCompare(String(b.value)))
}

function chunkId(slug, kind, index = 0) {
  return `${slug}::${kind}::${index}`
}

function makeChunk(item, kind, text, index = 0) {
  const normalizedText = cleanText(text)
  if (!normalizedText) return null
  return {
    id: chunkId(item.slug, kind, index),
    corpus_version: 'public_v0',
    document_id: item.document_id,
    slug: item.slug,
    title: item.title,
    citation: isPlaceholderCitation(item.citation) ? null : (item.citation ?? null),
    citation_is_placeholder: isPlaceholderCitation(item.citation),
    source_url: item.source_url ?? null,
    source_host: sourceHost(item.source_url),
    source_opinion_id: sourceOpinionId(item.source_url),
    court: item.court ?? null,
    jurisdiction: item.jurisdiction ?? null,
    state_code: item.state_code ?? null,
    date_published: item.date_published ?? null,
    citation_year: item.citation_year ?? citationYear(item),
    plan_legal_category: item.plan_legal_category,
    topic_terms: item.topic_terms ?? topicTerms(item),
    relevance_total: relevanceTotal(item),
    strict_qdro_relevance: item.strict_qdro_relevance,
    retirement_division_relevance: item.retirement_division_relevance,
    family_law_relevance: item.family_law_relevance,
    kind,
    text: normalizedText,
  }
}

function main() {
  if (!fs.existsSync(sourceManifestPath) || !fs.existsSync(casesDir)) {
    console.log('Corpus content not present; skipping public corpus artifact generation.')
    return
  }

  ensureDir(publicCorpusDir)
  ensureDir(publicRagDir)

  const manifest = readJson(sourceManifestPath)
  const caseFiles = fs
    .readdirSync(casesDir)
    .filter((file) => file.endsWith('.json'))
    .sort((a, b) => a.localeCompare(b))

  const cases = caseFiles.map((file) => readJson(path.join(casesDir, file)))
  const publicManifestCases = cases
    .map((item) => {
      const year = citationYear(item)
      const topics = topicTerms(item)
      const placeholderCitation = isPlaceholderCitation(item.citation)
      return {
        slug: item.slug,
        title: item.title,
        citation: item.citation ?? null,
        citation_is_placeholder: placeholderCitation,
        source_url: item.source_url ?? null,
        source_host: sourceHost(item.source_url),
        source_opinion_id: sourceOpinionId(item.source_url),
        court: item.court ?? null,
        jurisdiction: item.jurisdiction ?? null,
        state_code: item.state_code ?? null,
        date_published: item.date_published ?? null,
        citation_year: year,
        plan_legal_category: item.plan_legal_category,
        topic_terms: topics,
        relevance_total: relevanceTotal(item),
        search_terms: searchTerms(item, topics),
        strict_qdro_relevance: item.strict_qdro_relevance,
        retirement_division_relevance: item.retirement_division_relevance,
        family_law_relevance: item.family_law_relevance,
        status: item.status,
        review_status: item.review_status,
        page_url: `https://lexyalgo.com/corpus/cases/${item.slug}`,
      }
    })
    .sort((a, b) => {
      if (b.relevance_total !== a.relevance_total) return b.relevance_total - a.relevance_total
      return a.title.localeCompare(b.title)
    })

  const publicManifest = {
    generated_at: manifest.generated_at,
    artifact_generated_at: new Date().toISOString(),
    run_name: manifest.run_name,
    run_id: manifest.run_id,
    corpus_version: 'public_v0',
    case_count: publicManifestCases.length,
    source_permissions: 'Public/official-source opinion text and machine-draft annotations only; no Westlaw/Lexis proprietary editorial material.',
    cases: publicManifestCases,
  }

  fs.writeFileSync(path.join(publicCorpusDir, 'manifest.json'), `${JSON.stringify(publicManifest, null, 2)}\n`)

  const searchIndex = publicManifestCases.map((item) => ({
    slug: item.slug,
    title: item.title,
    citation: item.citation_is_placeholder ? null : item.citation,
    citation_year: item.citation_year,
    source_host: item.source_host,
    source_opinion_id: item.source_opinion_id,
    court: item.court,
    jurisdiction: item.jurisdiction,
    state_code: item.state_code,
    plan_legal_category: item.plan_legal_category,
    topic_terms: item.topic_terms,
    strict_qdro_relevance: item.strict_qdro_relevance,
    retirement_division_relevance: item.retirement_division_relevance,
    family_law_relevance: item.family_law_relevance,
    relevance_total: item.relevance_total,
    page_url: item.page_url,
    search_terms: item.search_terms,
  }))
  fs.writeFileSync(path.join(publicCorpusDir, 'search-index.json'), `${JSON.stringify({
    generated_at: publicManifest.artifact_generated_at,
    corpus_version: publicManifest.corpus_version,
    case_count: searchIndex.length,
    description: 'Compact static search index for LexyCorpus public case pages. Public-source metadata and machine-draft annotations only.',
    cases: searchIndex,
  }, null, 2)}\n`)

  const facets = {
    generated_at: publicManifest.artifact_generated_at,
    corpus_version: publicManifest.corpus_version,
    case_count: publicManifest.case_count,
    source_hosts: countBy(publicManifestCases, (item) => item.source_host),
    topic_terms: countBy(publicManifestCases.flatMap((item) => (item.topic_terms ?? []).map((topic) => ({ topic }))), (item) => item.topic),
    plan_legal_categories: countBy(publicManifestCases, (item) => item.plan_legal_category),
    citation_years: countBy(publicManifestCases, (item) => item.citation_year).sort((a, b) => Number(b.value) - Number(a.value)),
    qdro_scores: countBy(publicManifestCases, (item) => item.strict_qdro_relevance).sort((a, b) => Number(b.value) - Number(a.value)),
    retirement_scores: countBy(publicManifestCases, (item) => item.retirement_division_relevance).sort((a, b) => Number(b.value) - Number(a.value)),
  }
  fs.writeFileSync(path.join(publicCorpusDir, 'facets.json'), `${JSON.stringify(facets, null, 2)}\n`)

  const csvHeaders = ['slug', 'title', 'citation', 'citation_is_placeholder', 'citation_year', 'source_host', 'source_opinion_id', 'source_url', 'court', 'jurisdiction', 'state_code', 'plan_legal_category', 'topic_terms', 'strict_qdro_relevance', 'retirement_division_relevance', 'family_law_relevance', 'relevance_total', 'page_url']
  const csvRows = publicManifestCases.map((item) => csvHeaders.map((header) => csvCell(item[header])).join(','))
  fs.writeFileSync(path.join(publicCorpusDir, 'cases.csv'), `${csvHeaders.join(',')}\n${csvRows.join('\n')}\n`)

  const chunks = []
  for (const item of cases) {
    item.citation_year = citationYear(item)
    item.topic_terms = topicTerms(item)
    const summary = makeChunk(
      item,
      'summary',
      [
        item.title,
        isPlaceholderCitation(item.citation) ? '' : (item.citation ? `Citation: ${item.citation}.` : ''),
        item.court ? `Court: ${item.court}.` : '',
        item.date_published ? `Date: ${item.date_published}.` : '',
        item.generated_headnote,
      ].filter(Boolean).join(' '),
    )
    if (summary) chunks.push(summary)

    const holding = makeChunk(item, 'holding', item.generated_holding)
    if (holding) chunks.push(holding)

    for (const [index, quote] of (item.evidence_quotes ?? []).entries()) {
      const evidence = makeChunk(item, 'evidence_quote', `${quote.label}: ${quote.quote}`, index)
      if (evidence) chunks.push(evidence)
    }
  }

  const chunkLines = chunks.map((chunk) => JSON.stringify(chunk)).join('\n')
  fs.writeFileSync(path.join(publicRagDir, 'chunks.jsonl'), `${chunkLines}\n`)

  const ragManifest = {
    generated_at: publicManifest.artifact_generated_at,
    corpus_version: publicManifest.corpus_version,
    case_count: publicManifest.case_count,
    chunk_count: chunks.length,
    chunk_kinds: [...new Set(chunks.map((chunk) => chunk.kind))].sort(),
    metadata_fields: ['citation_is_placeholder', 'citation_year', 'court', 'jurisdiction', 'plan_legal_category', 'relevance_total', 'source_host', 'source_opinion_id', 'state_code', 'topic_terms'],
    files: [
      {
        path: '/corpus/manifest.json',
        format: 'json',
        description: 'Case-level public metadata and page URLs.',
      },
      {
        path: '/corpus/search-index.json',
        format: 'json',
        description: 'Compact static client/search ingestion index with normalized terms and deterministic metadata.',
      },
      {
        path: '/corpus/facets.json',
        format: 'json',
        description: 'Precomputed source, topic, category, year, and relevance-score facet counts.',
      },
      {
        path: '/corpus/cases.csv',
        format: 'csv',
        description: 'Spreadsheet-friendly public case metadata export.',
      },
      {
        path: '/corpus/rag/chunks.jsonl',
        format: 'jsonl',
        description: 'Retrieval-ready summary, holding, and evidence-quote chunks with deterministic IDs and filter metadata.',
      },
    ],
  }
  fs.writeFileSync(path.join(publicRagDir, 'manifest.json'), `${JSON.stringify(ragManifest, null, 2)}\n`)

  console.log(`Generated public corpus artifacts: ${publicManifest.case_count} cases, ${chunks.length} RAG chunks.`)
}

main()
