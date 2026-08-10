"use client";

import { useEffect, useMemo, useState } from "react";
import { CORPUS_JURISDICTIONS, type LiveSearchResponse, type SearchResult } from "@/lib/corpus";
import { SearchResultRow } from "./SearchResultRow";

export function CorpusSearch({
  results,
  dataAsOf,
  apiBaseUrl,
}: {
  results: SearchResult[];
  dataAsOf: string;
  apiBaseUrl: string | null;
}) {
  const [query, setQuery] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [authorityType, setAuthorityType] = useState("");
  const [liveResults, setLiveResults] = useState<SearchResult[] | null>(null);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(apiBaseUrl));

  useEffect(() => {
    const initialQuery = new URLSearchParams(window.location.search).get("q");
    const initialJurisdiction = new URLSearchParams(window.location.search).get("jurisdiction");
    const initialAuthorityType = new URLSearchParams(window.location.search).get("authority_type");
    if (initialQuery) setQuery(initialQuery);
    if (initialJurisdiction) setJurisdiction(initialJurisdiction);
    if (initialAuthorityType) setAuthorityType(initialAuthorityType);
  }, []);

  useEffect(() => {
    if (!apiBaseUrl) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ q: query.trim(), limit: "50" });
        if (jurisdiction) params.set("jurisdiction", jurisdiction);
        if (authorityType) params.set("authority_type", authorityType);
        const response = await fetch(`${apiBaseUrl}/v1/search?${params}`, {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`LexyCorpus API returned ${response.status}`);
        const payload = (await response.json()) as LiveSearchResponse;
        setLiveResults(payload.results.map((row) => ({
          slug: row.slug,
          route: `/corpus/live-authority/?slug=${encodeURIComponent(row.slug)}`,
          api_route: `${apiBaseUrl}/v1/authorities/${encodeURIComponent(row.slug)}`,
          title: row.title,
          citation: row.citation || row.title,
          jurisdiction: row.jurisdiction,
          body: row.body,
          authority_type: row.authority_type,
          status: "current",
          finality_status: "unknown",
          grade: row.grade,
          reason_code: row.reason_code,
          reason: row.reason,
          verified_at: null,
          limitation: row.grade === "D" || row.grade === "F"
            ? "Do not rely without official verification or correction."
            : null,
          source_url: row.source_url,
          snippet_label: "Live canonical record",
          snippet: row.decision_date
            ? `Decision date: ${row.decision_date}. Open the authority to read its primary text and proof.`
            : "Open the authority to read its primary text and proof.",
          fixture: false,
        })));
        setLiveError(null);
      } catch (error) {
        if (controller.signal.aborted) return;
        setLiveResults(null);
        setLiveError(error instanceof Error ? error.message : "The live LexyCorpus API is unavailable.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [apiBaseUrl, authorityType, jurisdiction, query]);

  const visible = useMemo(() => {
    if (liveResults) return liveResults;
    if (apiBaseUrl && loading && !liveError) return [];
    const needle = query.trim().toLowerCase();
    if (!needle) return results;
    return results.filter((result) =>
      `${result.title} ${result.citation} ${result.body} ${result.snippet} ${result.jurisdiction}`.toLowerCase().includes(needle),
    );
  }, [apiBaseUrl, liveError, liveResults, loading, query, results]);

  return (
    <div>
      <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 sm:px-7">
        <label htmlFor="corpus-query" className="block text-sm font-semibold text-slate-900">Search authorities</label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input id="corpus-query" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Citation, title, court, code, or text" className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-700 focus:ring-2 focus:ring-slate-200" />
          {query && <button type="button" onClick={() => setQuery("")} className="rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">Clear</button>}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block"><span className="text-xs font-semibold text-slate-500">Jurisdiction</span><select value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-500"><option value="">All jurisdictions</option>{CORPUS_JURISDICTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          <label className="block"><span className="text-xs font-semibold text-slate-500">Material type</span><select value={authorityType} onChange={(event) => setAuthorityType(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-500"><option value="">All primary law</option><option value="opinion">Judicial opinions</option><option value="statute">Statutes</option><option value="constitution">Constitutions</option></select></label>
          <label className="block"><span className="text-xs font-semibold text-slate-500">Source class</span><select value="primary" disabled className="mt-1.5 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-500"><option value="primary">Primary law</option><option value="secondary">Secondary — coming later</option></select></label>
          <label className="block"><span className="text-xs font-semibold text-slate-500">Practice area</span><select value="" disabled className="mt-1.5 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-400"><option value="">Coming later</option></select></label>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600">All grades remain discoverable. Results rank A, B, C, D, then F; D/F carry conspicuous warnings and should not be relied on without verification or correction.</p>
        {apiBaseUrl ? (
          <p className={`mt-3 text-sm font-semibold ${liveError ? "text-amber-800" : "text-emerald-800"}`} role="status">
            {loading
              ? "Searching the live LexyCorpus service…"
              : liveError
                ? `${liveError} Showing the reviewed static fallback.`
                : "Live API results and verification semantics are active."}
          </p>
        ) : (
          <p className="mt-3 text-sm font-semibold text-slate-600">Reviewed static corpus slice. Live service endpoint is not configured for this build.</p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-slate-800" aria-live="polite">{visible.length} {visible.length === 1 ? "authority" : "authorities"}</p>
        <p className="text-xs text-slate-500">All grades shown · {liveResults ? "Live service" : `Data as of ${dataAsOf}`}</p>
      </div>

      {loading && apiBaseUrl && !liveResults && !liveError ? (
        <div className="mt-6 border-y border-slate-200 py-14 text-center">
          <h2 className="font-serif text-2xl font-semibold text-slate-950">Searching the live corpus…</h2>
          <p className="mt-2 text-sm text-slate-600">Connecting to published statutes, constitutions, and judicial opinions.</p>
        </div>
      ) : visible.length > 0 ? (
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
