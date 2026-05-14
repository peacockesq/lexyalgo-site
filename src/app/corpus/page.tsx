import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllCorpusCases, getCorpusManifest } from '@/lib/corpus'

export const metadata: Metadata = {
  title: 'LexyCorpus QDRO Case Law Library — LexyAlgo',
  description: 'Public QDRO and retirement-division case law with clean opinion text, source links, machine-draft headnotes, annotations, and evidence quotes.',
}

export default function CorpusIndexPage() {
  const manifest = getCorpusManifest()
  const cases = getAllCorpusCases()
  const topCases = cases.slice(0, 250)

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
              <div className="text-3xl font-bold text-slate-950">{manifest?.case_count ?? cases.length}</div>
              <div className="text-sm text-slate-600">public opinion pages in this release</div>
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
        </div>

        <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-slate-950">Highest-signal cases</h2>
              <p className="text-sm text-slate-600">Showing the first 250 by combined QDRO / retirement / family-law relevance. Full static corpus pages are generated and addressable by slug.</p>
            </div>
          </div>
          <div className="divide-y divide-slate-200">
            {topCases.map((item) => (
              <article key={item.slug} className="py-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">
                      <Link className="hover:text-primary-container" href={`/corpus/cases/${item.slug}`}>{item.title}</Link>
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">{item.citation ? `Citation: ${item.citation}` : 'Citation metadata pending'} · {item.status.replaceAll('_', ' ')}</p>
                  </div>
                  <div className="flex shrink-0 gap-2 text-xs font-semibold text-slate-700">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">QDRO {item.strict_qdro_relevance}/5</span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">Retirement {item.retirement_division_relevance}/5</span>
                    <span className="rounded-full bg-purple-50 px-3 py-1 text-purple-700">Family {item.family_law_relevance}/5</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
