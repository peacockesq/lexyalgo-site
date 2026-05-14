import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { formatCorpusDate, getCorpusCaseBySlug, getCorpusCaseSlugs } from '@/lib/corpus'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getCorpusCaseSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = getCorpusCaseBySlug(slug)
  if (!item) return {}
  return {
    title: `${item.title} — LexyCorpus`,
    description: item.generated_headnote.slice(0, 155),
  }
}

export default async function CorpusCasePage({ params }: Props) {
  const { slug } = await params
  const item = getCorpusCaseBySlug(slug)
  if (!item) notFound()

  const sourceLabel = item.source_url ? new URL(item.source_url).hostname.replace(/^www\./, '') : 'source link pending'

  return (
    <section className="bg-white py-12 sm:py-16">
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link href="/corpus" className="text-sm font-semibold text-primary-container hover:underline">← LexyCorpus index</Link>
        <div className="mt-6 border-b border-slate-200 pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-container">LexyCorpus case page</p>
          <h1 className="mt-3 font-[family-name:var(--font-space)] text-4xl font-bold text-slate-950 sm:text-5xl">{item.title}</h1>
          <p className="mt-4 text-slate-600">
            {item.citation ? <><strong>Citation:</strong> {item.citation} · </> : null}
            {formatCorpusDate(item.date_published)} · {item.court ?? item.jurisdiction ?? 'Court metadata pending'}
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">QDRO relevance {item.strict_qdro_relevance}/5</span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">Retirement relevance {item.retirement_division_relevance}/5</span>
            <span className="rounded-full bg-purple-50 px-3 py-1 text-purple-700">Family-law relevance {item.family_law_relevance}/5</span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">{item.review_status.replaceAll('_', ' ')}</span>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-amber-50 p-5 text-sm text-amber-900 ring-1 ring-amber-200">
          <strong>Research-use warning:</strong> This page contains machine-draft public annotations generated from public opinion text. The headnote is not Willie-approved gold-label work product and is not legal advice. Verify the full opinion and current law before relying on it.
        </div>

        <section className="mt-8 space-y-5">
          <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-slate-950">Machine-draft headnote</h2>
          <p className="text-lg leading-8 text-slate-700">{item.generated_headnote}</p>
          <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <h3 className="font-semibold text-slate-950">Retrieval annotation</h3>
            <p className="mt-2 text-slate-700">{item.generated_holding}</p>
            <p className="mt-2 text-sm text-slate-500">Category: {item.plan_legal_category}</p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-slate-950">Evidence quotes</h2>
          <div className="mt-4 space-y-4">
            {item.evidence_quotes.map((quote, index) => (
              <blockquote key={`${quote.label}-${index}`} className="rounded-2xl border-l-4 border-primary-container bg-slate-50 p-5 text-slate-700">
                <div className="mb-2 text-sm font-semibold text-slate-950">{quote.label}</div>
                <p>“{quote.quote}”</p>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
          <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-slate-950">Source and provenance</h2>
          <dl className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
            <div><dt className="font-semibold text-slate-950">Source type</dt><dd>{item.source_type}</dd></div>
            <div><dt className="font-semibold text-slate-950">Permissions posture</dt><dd>{item.source_permissions}</dd></div>
            <div><dt className="font-semibold text-slate-950">Generated status</dt><dd>{item.status.replaceAll('_', ' ')}</dd></div>
            <div><dt className="font-semibold text-slate-950">Generated at</dt><dd>{formatCorpusDate(item.generated_at)}</dd></div>
          </dl>
          {item.source_url ? (
            <a href={item.source_url} className="mt-4 inline-block font-semibold text-primary-container hover:underline" rel="nofollow noreferrer" target="_blank">
              View public source on {sourceLabel}
            </a>
          ) : null}
        </section>

        <section className="mt-10">
          <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-slate-950">Clean opinion text</h2>
          <pre className="mt-4 max-h-[80vh] overflow-auto whitespace-pre-wrap rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-slate-100 ring-1 ring-slate-800">
            {item.full_text}
          </pre>
        </section>
      </article>
    </section>
  )
}
