'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { CorpusManifestCase } from '@/lib/corpus'

type Props = {
  cases: CorpusManifestCase[]
}

function normalize(value: string | null | undefined) {
  return (value ?? '').toLowerCase()
}

function sourceHost(sourceUrl?: string | null) {
  if (!sourceUrl) return 'source pending'
  try {
    return new URL(sourceUrl).hostname.replace(/^www\./, '')
  } catch {
    return 'source pending'
  }
}

export default function CorpusExplorer({ cases }: Props) {
  const [query, setQuery] = useState('')
  const [minimumQdro, setMinimumQdro] = useState('0')
  const [minimumRetirement, setMinimumRetirement] = useState('0')
  const [sourceFilter, setSourceFilter] = useState('all')

  const sourceOptions = useMemo(() => {
    const hosts = new Set(cases.map((item) => sourceHost(item.source_url)).filter((host) => host !== 'source pending'))
    return [...hosts].sort((a, b) => a.localeCompare(b)).slice(0, 25)
  }, [cases])

  const filteredCases = useMemo(() => {
    const q = normalize(query).trim()
    const qdroFloor = Number(minimumQdro)
    const retirementFloor = Number(minimumRetirement)

    return cases.filter((item) => {
      if (item.strict_qdro_relevance < qdroFloor) return false
      if (item.retirement_division_relevance < retirementFloor) return false
      if (sourceFilter !== 'all' && sourceHost(item.source_url) !== sourceFilter) return false
      if (!q) return true

      const searchable = [item.title, item.citation, item.source_url, item.status].map(normalize).join(' ')
      return searchable.includes(q)
    })
  }, [cases, minimumQdro, minimumRetirement, query, sourceFilter])

  const visibleCases = filteredCases.slice(0, 500)

  return (
    <div>
      <div className="grid gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 md:grid-cols-[minmax(0,1fr)_160px_190px_220px]">
        <label className="text-sm font-semibold text-slate-700">
          Search title, citation, or source
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-normal text-slate-950 outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Example: survivor annuity, ERISA, Mahmud"
          />
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Min QDRO
          <select
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-base font-normal text-slate-950 outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
            value={minimumQdro}
            onChange={(event) => setMinimumQdro(event.target.value)}
          >
            {[0, 1, 2, 3, 4, 5].map((score) => <option key={score} value={score}>{score}+</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Min retirement
          <select
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-base font-normal text-slate-950 outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
            value={minimumRetirement}
            onChange={(event) => setMinimumRetirement(event.target.value)}
          >
            {[0, 1, 2, 3, 4, 5].map((score) => <option key={score} value={score}>{score}+</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Public source
          <select
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-base font-normal text-slate-950 outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
            value={sourceFilter}
            onChange={(event) => setSourceFilter(event.target.value)}
          >
            <option value="all">All sources</option>
            {sourceOptions.map((host) => <option key={host} value={host}>{host}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
        <p><strong className="text-slate-950">{filteredCases.length.toLocaleString()}</strong> matching public case pages.</p>
        <p>Showing first {visibleCases.length.toLocaleString()} sorted by combined retrieval relevance.</p>
      </div>

      <div className="mt-4 divide-y divide-slate-200">
        {visibleCases.map((item) => (
          <article key={item.slug} className="py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">
                  <Link className="hover:text-primary-container" href={`/corpus/cases/${item.slug}`}>{item.title}</Link>
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {item.citation ? `Citation: ${item.citation}` : 'Citation metadata pending'} · {sourceHost(item.source_url)} · {item.status.replaceAll('_', ' ')}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2 text-xs font-semibold text-slate-700 sm:justify-end">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">QDRO {item.strict_qdro_relevance}/5</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">Retirement {item.retirement_division_relevance}/5</span>
                <span className="rounded-full bg-purple-50 px-3 py-1 text-purple-700">Family {item.family_law_relevance}/5</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
