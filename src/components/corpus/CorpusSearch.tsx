"use client";

import { useMemo, useState } from "react";
import type { SearchResult } from "@/lib/corpus";
import { SearchResultRow } from "./SearchResultRow";

export function CorpusSearch({ results, dataAsOf }: { results: SearchResult[]; dataAsOf: string }) {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return results;
    return results.filter((result) =>
      `${result.title} ${result.citation} ${result.body} ${result.snippet} ${result.jurisdiction}`.toLowerCase().includes(needle),
    );
  }, [query, results]);

  return (
    <div>
      <div className="border-y border-slate-300 bg-slate-50 px-5 py-6 sm:px-7">
        <label htmlFor="corpus-query" className="block text-sm font-semibold text-slate-900">Search authorities</label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input id="corpus-query" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Citation, title, court, code, or text" className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-700 focus:ring-2 focus:ring-slate-200" />
          {query && <button type="button" onClick={() => setQuery("")} className="rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">Clear</button>}
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600">All grades remain discoverable. Results rank A, B, C, D, then F; D/F carry conspicuous warnings and should not be relied on without verification or correction.</p>
      </div>

      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-slate-800" aria-live="polite">{visible.length} {visible.length === 1 ? "authority" : "authorities"}</p>
        <p className="text-xs text-slate-500">All grades shown · Data as of {dataAsOf}</p>
      </div>

      {visible.length > 0 ? (
        <ul className="mt-5" aria-label="Corpus search results">{visible.map((result) => <SearchResultRow key={result.slug} result={result} />)}</ul>
      ) : (
        <div className="mt-6 border-y border-slate-200 py-14 text-center">
          <h2 className="font-serif text-2xl font-semibold text-slate-950">No matching authorities</h2>
          <p className="mt-2 text-sm text-slate-600">Try another citation, title, court, code, or text phrase.</p>
        </div>
      )}
    </div>
  );
}
