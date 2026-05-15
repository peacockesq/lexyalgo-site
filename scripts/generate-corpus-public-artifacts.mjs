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
    citation: item.citation ?? null,
    source_url: item.source_url ?? null,
    source_host: sourceHost(item.source_url),
    court: item.court ?? null,
    jurisdiction: item.jurisdiction ?? null,
    state_code: item.state_code ?? null,
    date_published: item.date_published ?? null,
    plan_legal_category: item.plan_legal_category,
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
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      citation: item.citation ?? null,
      source_url: item.source_url ?? null,
      source_host: sourceHost(item.source_url),
      court: item.court ?? null,
      jurisdiction: item.jurisdiction ?? null,
      state_code: item.state_code ?? null,
      date_published: item.date_published ?? null,
      plan_legal_category: item.plan_legal_category,
      strict_qdro_relevance: item.strict_qdro_relevance,
      retirement_division_relevance: item.retirement_division_relevance,
      family_law_relevance: item.family_law_relevance,
      status: item.status,
      review_status: item.review_status,
      page_url: `https://lexyalgo.com/corpus/cases/${item.slug}`,
    }))
    .sort((a, b) => {
      const scoreA = a.strict_qdro_relevance + a.retirement_division_relevance + a.family_law_relevance
      const scoreB = b.strict_qdro_relevance + b.retirement_division_relevance + b.family_law_relevance
      if (scoreB !== scoreA) return scoreB - scoreA
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

  const chunks = []
  for (const item of cases) {
    const summary = makeChunk(
      item,
      'summary',
      [
        item.title,
        item.citation ? `Citation: ${item.citation}.` : '',
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
    files: [
      {
        path: '/corpus/manifest.json',
        format: 'json',
        description: 'Case-level public metadata and page URLs.',
      },
      {
        path: '/corpus/rag/chunks.jsonl',
        format: 'jsonl',
        description: 'Retrieval-ready summary, holding, and evidence-quote chunks with deterministic IDs.',
      },
    ],
  }
  fs.writeFileSync(path.join(publicRagDir, 'manifest.json'), `${JSON.stringify(ragManifest, null, 2)}\n`)

  console.log(`Generated public corpus artifacts: ${publicManifest.case_count} cases, ${chunks.length} RAG chunks.`)
}

main()
