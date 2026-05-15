'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { CorpusManifestCase } from '@/lib/corpus'

type Props = {
  cases: CorpusManifestCase[]
}

function normalize(value: string | number | null | undefined) {
  return String(value ?? '').toLowerCase()
}

function sourceHost(sourceUrl?: string | null) {
  if (!sourceUrl) return 'source pending'
  try {
    return new URL(sourceUrl).hostname.replace(/^www\./, '')
  } catch {
    return 'source pending'
  }
}

function topicLabel(topic: string) {
  return topic.replaceAll('_', ' ')
}

export default function CorpusExplorer({ cases }: Props) {
  const [query, setQuery] = useState('')
  const [minimumQdro, setMinimumQdro] = useState('0')
  const [minimumRetirement, setMinimumRetirement] = useState('0')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [topicFilter, setTopicFilter] = useState('all')
  const [sortMode, setSortMode] = useState('relevance')

  const sourceOptions = useMemo(() => {
    const hosts = new Set(cases.map((item) => item.source_host ?? sourceHost(item.source_url)).filter((host) => host !== 'source pending'))
    return [...hosts].sort((a, b) => a.localeCompare(b)).slice(0, 25)
  }, [cases])

  const topicOptions = useMemo(() => {
    const topics = new Set(cases.flatMap((item) => item.topic_terms ?? []))
    return [...topics].sort((a, b) => a.localeCompare(b))
  }, [cases])

  const filteredCases = useMemo(() => {
    const queryTokens = normalize(query).trim().split(/\s+/).filter(Boolean)
    const qdroFloor = Number(minimumQdro)
    const retirementFloor = Number(minimumRetirement)

    return cases.filter((item) => {
      if (item.strict_qdro_relevance < qdroFloor) return false
      if (item.retirement_division_relevance < retirementFloor) return false
      if (sourceFilter !== 'all' && (item.source_host ?? sourceHost(item.source_url)) !== sourceFilter) return false
      if (topicFilter !== 'all' && !(item.topic_terms ?? []).includes(topicFilter)) return false
      if (queryTokens.length === 0) return true

      const searchable = [
        item.title,
        item.citation_is_placeholder ? '' : item.citation,
        item.source_url,
        item.source_host,
        item.source_opinion_id,
        item.court,
        item.jurisdiction,
        item.state_code,
        item.citation_year,
        item.plan_legal_category,
        item.search_terms,
        item.status,
        ...(item.topic_terms ?? []),
      ].map(normalize).join(' ')
      return queryTokens.every((token) => searchable.includes(token))
    }).sort((a, b) => {
      if (sortMode === 'date') return (b.citation_year ?? 0) - (a.citation_year ?? 0) || a.title.localeCompare(b.title)
      if (sortMode === 'title') return a.title.localeCompare(b.title)
      if (sortMode === 'qdro' && b.strict_qdro_relevance !== a.strict_qdro_relevance) {
        return b.strict_qdro_relevance - a.strict_qdro_relevance
      }
      if (sortMode === 'retirement' && b.retirement_division_relevance !== a.retirement_division_relevance) {
        return b.retirement_division_relevance - a.retirement_division_relevance
      }
      const scoreA = a.strict_qdro_relevance + a.retirement_division_relevance + a.family_law_relevance
      const scoreB = b.strict_qdro_relevance + b.retirement_division_relevance + b.family_law_relevance
      if (scoreB !== scoreA) return scoreB - scoreA
      return a.title.localeCompare(b.title)
    })
  }, [cases, minimumQdro, minimumRetirement, query, sortMode, sourceFilter, topicFilter])

  const visibleCases = filteredCases.slice(0, 500)

  return (
    <div>
      <div className="grid gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 md:grid-cols-[minmax(0,1fr)_120px_150px_180px_180px_160px]">
        <label className="text-sm font-semibold text-slate-700">
          Search title, citation, source, court, or topic
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
        <label className="text-sm font-semibold text-slate-700">
          Topic
          <select
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-base font-normal text-slate-950 outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
            value={topicFilter}
            onChange={(event) => setTopicFilter(event.target.value)}
          >
            <option value="all">All topics</option>
            {topicOptions.map((topic) => <option key={topic} value={topic}>{topicLabel(topic)}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Sort
          <select
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-base font-normal text-slate-950 outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
            value={sortMode}
            onChange={(event) => setSortMode(event.target.value)}
          >
            <option value="relevance">Combined relevance</option>
            <option value="qdro">QDRO score</option>
            <option value="retirement">Retirement score</option>
            <option value="date">Newest citation/date</option>
            <option value="title">Title A-Z</option>
          </select>
        </label>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
        <button className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 hover:bg-blue-100" type="button" onClick={() => { setMinimumQdro('5'); setMinimumRetirement('0'); setSortMode('qdro') }}>Strict QDRO</button>
        <button className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 hover:bg-emerald-100" type="button" onClick={() => { setMinimumQdro('0'); setMinimumRetirement('5'); setSortMode('retirement') }}>Retirement-heavy</button>
        <button className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-200" type="button" onClick={() => { setQuery('survivor annuity'); setMinimumQdro('0'); setMinimumRetirement('0') }}>Survivor annuity</button>
        <button className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-200" type="button" onClick={() => { setTopicFilter('erisa'); setQuery(''); setMinimumQdro('0'); setMinimumRetirement('0') }}>ERISA</button>
        <button className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-200" type="button" onClick={() => { setQuery(''); setMinimumQdro('0'); setMinimumRetirement('0'); setSourceFilter('all'); setTopicFilter('all'); setSortMode('relevance') }}>Reset</button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
        <p><strong className="text-slate-950">{filteredCases.length.toLocaleString()}</strong> matching public case pages.</p>
        <p>Showing first {visibleCases.length.toLocaleString()} sorted by {sortMode === 'relevance' ? 'combined retrieval relevance' : sortMode}.</p>
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
                  {item.citation && !item.citation_is_placeholder ? `Citation: ${item.citation}` : 'Citation metadata pending'} · {item.court ?? item.jurisdiction ?? item.state_code ?? 'court pending'} · {item.source_host ?? sourceHost(item.source_url)}{item.source_opinion_id ? ` #${item.source_opinion_id}` : ''} · {item.status.replaceAll('_', ' ')}
                </p>
                {(item.topic_terms ?? []).length > 0 ? (
                  <p className="mt-2 flex flex-wrap gap-1 text-xs text-slate-500">
                    {(item.topic_terms ?? []).slice(0, 4).map((topic) => <span key={topic} className="rounded-full bg-slate-100 px-2 py-0.5">{topicLabel(topic)}</span>)}
                  </p>
                ) : null}
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
