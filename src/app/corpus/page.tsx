import type { Metadata } from 'next'
import { getAllCorpusCases, getCorpusManifest } from '@/lib/corpus'
import CorpusExplorer from '@/components/corpus/CorpusExplorer'

export const metadata: Metadata = {
  title: 'LexyCorpus QDRO Case Law Library — LexyAlgo',
  description: 'Public QDRO and retirement-division case law with clean opinion text, source links, machine-draft headnotes, annotations, and evidence quotes.',
  alternates: { canonical: '/corpus' },
  keywords: ['QDRO case law', 'retirement division cases', 'ERISA divorce', 'pension division opinions', 'public legal corpus'],
}

export default function CorpusIndexPage() {
  const manifest = getCorpusManifest()
  const cases = getAllCorpusCases()

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-container">LexyCorpus</p>
          <h1 className="mt-4 font-[family-name:var(--font-space)] text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            QDRO and retirement-division case law library
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-700">
            A public working corpus of QDRO, pension, retirement-account, ERISA, and divorce property-division opinions. Each case page includes source provenance, clean text, machine-draft annotations, evidence quotes, and retrieval-focused relevance scores.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-100 p-5">
              <div className="text-3xl font-bold text-slate-950">{cases.length.toLocaleString()}</div>
              <div className="text-sm text-slate-600">unique public opinion pages in this release</div>
            </div>
            <div className="rounded-2xl bg-slate-100 p-5">
              <div className="text-3xl font-bold text-slate-950">$0</div>
              <div className="text-sm text-slate-600">frontier-model cost for v0 annotations</div>
            </div>
            <div className="rounded-2xl bg-slate-100 p-5">
              <div className="text-3xl font-bold text-slate-950">Draft</div>
              <div className="text-sm text-slate-600">gold-label legal review still pending</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-slate-500">
            Generated from run <code>{manifest?.run_name ?? 'unknown'}</code>. These are machine-draft research annotations, not legal advice and not a substitute for attorney review.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
            <a className="rounded-full bg-slate-950 px-4 py-2 text-white hover:bg-slate-800" href="/corpus/manifest.json">Download metadata JSON</a>
            <a className="rounded-full bg-slate-100 px-4 py-2 text-slate-800 hover:bg-slate-200" href="/corpus/rag/manifest.json">RAG artifact manifest</a>
            <a className="rounded-full bg-slate-100 px-4 py-2 text-slate-800 hover:bg-slate-200" href="/corpus/rag/chunks.jsonl">RAG chunks JSONL</a>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-slate-950">Search the public corpus</h2>
              <p className="text-sm text-slate-600">Filter the complete static manifest by title, citation, source, and retrieval scores. Every result links to a generated public case page.</p>
            </div>
          </div>
          <CorpusExplorer cases={cases} />
        </div>
      </div>
    </section>
  )
}
