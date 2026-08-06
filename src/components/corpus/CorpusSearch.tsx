"use client";

import { useMemo, useState } from "react";
import type { SearchResult } from "@/lib/corpus";
import { SearchResultRow } from "./SearchResultRow";

export function CorpusSearch({ results, dataAsOf }: { results: SearchResult[]; dataAsOf: string }) {
  const [query, setQuery] = useState("");
  const [includeCandidates, setIncludeCandidates] = useState(false);
  const [includeDefects, setIncludeDefects] = useState(false);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return results.filter((result) => {
      const allowed = result.grade === "A" || result.grade === "B"
        || (includeCandidates && (result.grade === "C" || result.grade === "D"))
        || (includeDefects && result.grade === "F");
      if (!allowed) return false;
      if (!needle) return true;
      return `${result.title} ${result.citation} ${result.body} ${result.snippet} ${result.jurisdiction}`.toLowerCase().includes(needle);
    });
  }, [includeCandidates, includeDefects, query, results]);

  return (
    <div>
      <div className="border-y border-slate-300 bg-slate-50 px-5 py-6 sm:px-7">
        <label htmlFor="corpus-query" className="block text-sm font-semibold text-slate-900">Search authorities</label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            id="corpus-query"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Citation, title, court, code, or text"
            className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-700 focus:ring-2 focus:ring-slate-200"
          />
          {query && <button type="button" onClick={() => setQuery("")} className="rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">Clear</button>}
        </div>
        <details className="mt-5 border-t border-slate-200 pt-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-800">Advanced evidence filters</summary>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <label className="flex cursor-pointer items-start gap-3 rounded-md border border-slate-200 bg-white p-4">
              <input type="checkbox" checked={includeCandidates} onChange={(event) => setIncludeCandidates(event.target.checked)} className="mt-0.5 size-4 accent-slate-900" />
              <span><strong className="block text-slate-900">Include candidate records (C/D)</strong><span className="mt-1 block text-slate-600">Not officially verified. Confirm before relying on them.</span></span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 rounded-md border border-red-200 bg-red-50 p-4">
              <input type="checkbox" checked={includeDefects} onChange={(event) => setIncludeDefects(event.target.checked)} className="mt-0.5 size-4 accent-red-700" />
              <span><strong className="block text-red-950">Include suppressed defects (F)</strong><span className="mt-1 block text-red-800">Material defects are hidden by default.</span></span>
            </label>
          </div>
        </details>
      </div>

      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-slate-800" aria-live="polite">{visible.length} {visible.length === 1 ? "authority" : "authorities"}</p>
        <p className="text-xs text-slate-500">A/B shown by default · Data as of {dataAsOf}</p>
      </div>

      {visible.length > 0 ? (
        <ul className="mt-5" aria-label="Corpus search results">{visible.map((result) => <SearchResultRow key={result.slug} result={result} />)}</ul>
      ) : (
        <div className="mt-6 border-y border-slate-200 py-14 text-center">
          <h2 className="font-serif text-2xl font-semibold text-slate-950">No matching authorities</h2>
          <p className="mt-2 text-sm text-slate-600">Try another citation or enable an advanced evidence filter.</p>
        </div>
      )}
    </div>
  );
}
