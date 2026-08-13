"use client";

import { useEffect, useMemo, useState } from "react";
import { CORPUS_JURISDICTIONS, type LiveSearchResponse, type SearchResult } from "@/lib/corpus";
import { SearchResultRow } from "./SearchResultRow";

const PAGE_SIZE = 25;

export function CorpusSearch({ results, dataAsOf, apiBaseUrl }: { results: SearchResult[]; dataAsOf: string; apiBaseUrl: string | null }) {
  const [query, setQuery] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [category, setCategory] = useState("");
  const [titleNumber, setTitleNumber] = useState("");
  const [chapter, setChapter] = useState("");
  const [page, setPage] = useState(1);
  const [live, setLive] = useState<LiveSearchResponse | null>(null);
  const [liveResults, setLiveResults] = useState<SearchResult[] | null>(null);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(apiBaseUrl));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") || "");
    setJurisdiction(params.get("jurisdiction") || "");
    setCategory(params.get("category") || legacyCategory(params.get("authority_type")));
    setTitleNumber(params.get("title_number") || "");
    setChapter(params.get("chapter") || "");
    setPage(Math.max(1, Number(params.get("page")) || 1));
  }, []);

  useEffect(() => {
    if (!apiBaseUrl) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ q: query.trim(), page: String(page), page_size: String(PAGE_SIZE) });
        if (jurisdiction) params.set("jurisdiction", jurisdiction);
        if (category) params.set("category", category);
        const authorityType = categoryToLegacyType(category);
        if (authorityType) params.set("authority_type", authorityType);
        if (titleNumber) params.set("title_number", titleNumber);
        if (chapter) params.set("chapter", chapter);
        const response = await fetch(`${apiBaseUrl}/v1/search?${params}`, { headers: { Accept: "application/json" }, signal: controller.signal });
        if (!response.ok) throw new Error(response.status === 503 ? "Full-text search is temporarily unavailable." : `Search returned ${response.status}.`);
        const payload = (await response.json()) as LiveSearchResponse;
        if (payload.search_available === false) throw new Error(payload.limitation || "Full-text search is temporarily unavailable.");
        setLive(payload);
        setLiveResults(payload.results.map((row) => ({
          slug: row.slug,
          route: row.canonical_path || `/corpus/live-authority/?slug=${encodeURIComponent(row.slug)}`,
          api_route: `${apiBaseUrl}/v1/authorities/${encodeURIComponent(row.slug)}`,
          title: row.title,
          citation: row.citation || row.title,
          jurisdiction: row.jurisdiction,
          body: row.issuing_body || row.body,
          authority_type: row.authority_type,
          category: row.category,
          status: "current",
          finality_status: "unknown",
          grade: row.grade,
          reason_code: row.reason_code,
          reason: row.reason,
          verified_at: null,
          limitation: row.grade === "D" || row.grade === "F" ? "Verify this record before relying on it." : null,
          source_url: row.source_url,
          snippet_label: humanMatchField(row.match?.field || row.match_field),
          snippet: row.match?.snippet || row.snippet || fallbackSnippet(row.decision_date),
          match_field: row.match?.field || row.match_field,
          passage_locator: row.match?.passage_locator || row.passage_locator,
          fixture: false,
        })));
        setLiveError(null);
      } catch (error) {
        if (controller.signal.aborted) return;
        setLive(null);
        setLiveResults(null);
        setLiveError(error instanceof Error ? error.message : "Search is temporarily unavailable.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);
    return () => { controller.abort(); window.clearTimeout(timer); };
  }, [apiBaseUrl, category, chapter, jurisdiction, page, query, titleNumber]);

  const staticVisible = useMemo(() => {
    if (apiBaseUrl) return [];
    const needle = query.trim().toLowerCase();
    return results.filter((result) => {
      if (jurisdiction && result.jurisdiction !== jurisdiction) return false;
      if (category && (result.category || legacyCategory(result.authority_type)) !== category) return false;
      if (!needle) return true;
      return `${result.title} ${result.citation} ${result.body}`.toLowerCase().includes(needle);
    });
  }, [apiBaseUrl, category, jurisdiction, query, results]);
  const visible = apiBaseUrl ? (liveResults || []) : staticVisible;
  const exactTotal = live?.total;
  const totalPages = live?.total_pages || live?.pages || (exactTotal !== undefined && live?.total_is_exact !== false ? Math.max(1, Math.ceil(exactTotal / (live?.page_size || PAGE_SIZE))) : undefined);
  const currentPage = live?.page || page;
  const searchScope = live?.search_scope || live?.search_mode || "title_citation";
  const fullText = searchScope === "full_text" || searchScope === "hybrid";

  return (
    <div>
      <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 sm:px-7">
        <label htmlFor="corpus-query" className="block text-sm font-semibold text-slate-900">Search authorities</label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input id="corpus-query" type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Citation, case name, code section, or phrase" className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-700 focus:ring-2 focus:ring-slate-200" />
          {query && <button type="button" onClick={() => { setQuery(""); setPage(1); }} className="rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">Clear</button>}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Filter label="Jurisdiction"><select value={jurisdiction} onChange={(event) => { setJurisdiction(event.target.value); setPage(1); }} className={selectClass}><option value="">All jurisdictions</option>{CORPUS_JURISDICTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Filter>
          <Filter label="Material type"><select value={category} onChange={(event) => { setCategory(event.target.value); setPage(1); }} className={selectClass}><option value="">All primary law</option><option value="judicial">Judicial opinions</option><option value="statutory">Statutes</option><option value="constitutional">Constitutions</option><option value="administrative">Administrative & agency materials</option></select></Filter>
          <Filter label="Title"><input value={titleNumber} onChange={(event) => { setTitleNumber(event.target.value); setPage(1); }} placeholder="Any title" className={selectClass} /></Filter>
          <Filter label="Chapter"><input value={chapter} onChange={(event) => { setChapter(event.target.value); setPage(1); }} placeholder="Any chapter" className={selectClass} /></Filter>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600">Verification grades describe whether text has been checked against an official source. Potential and known problems remain visible with warnings.</p>
        {apiBaseUrl ? (
          <p className={`mt-3 text-sm font-semibold ${liveError ? "text-red-800" : fullText ? "text-emerald-800" : "text-amber-800"}`} role="status">
            {loading ? "Searching LexyCorpus…" : liveError ? liveError : fullText ? "Searching titles, citations, and authority text." : "Current search covers titles and citations only. Full-text search is being added."}
          </p>
        ) : <p className="mt-3 text-sm font-semibold text-slate-600">This offline preview searches titles and citations in the reviewed sample only.</p>}
      </div>

      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-slate-800" aria-live="polite">{resultCountLabel(visible.length, exactTotal, live?.total_is_exact, apiBaseUrl)}</p>
        <p className="text-xs text-slate-500">{apiBaseUrl ? (fullText ? "Full-text search" : "Title/citation search") : `Sample data as of ${dataAsOf}`}</p>
      </div>

      {loading && apiBaseUrl && !liveResults ? <SearchMessage title="Searching the corpus…" text="Checking published authorities." />
        : liveError ? <SearchMessage title="Search temporarily unavailable" text="Please try again shortly. We are not substituting a narrower search without telling you." />
        : visible.length ? <><ul className="mt-5" aria-label="Corpus search results">{visible.map((result) => <SearchResultRow key={result.slug} result={result} />)}</ul>{totalPages && totalPages > 1 && <Pagination page={currentPage} totalPages={totalPages} onPage={setPage} />}</>
        : <SearchMessage title="No matching authorities" text="Try another citation, title, jurisdiction, or phrase." />}
    </div>
  );
}

const selectClass = "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-500";
function Filter({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><span className="text-xs font-semibold text-slate-500">{label}</span>{children}</label>; }
function SearchMessage({ title, text }: { title: string; text: string }) { return <div className="mt-6 border-y border-slate-200 py-14 text-center"><h2 className="font-serif text-2xl font-semibold text-slate-950">{title}</h2><p className="mt-2 text-sm text-slate-600">{text}</p></div>; }
function Pagination({ page, totalPages, onPage }: { page: number; totalPages: number; onPage: (page: number) => void }) {
  const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, index) => Math.max(1, Math.min(totalPages - 6, page - 3)) + index).filter((value) => value <= totalPages);
  return <nav aria-label="Search result pages" className="mt-8 flex flex-wrap items-center justify-center gap-2"><button type="button" disabled={page <= 1} onClick={() => onPage(page - 1)} className="rounded-md border px-3 py-2 text-sm font-semibold disabled:opacity-40">Previous</button>{pages.map((number) => <button key={number} type="button" aria-current={number === page ? "page" : undefined} onClick={() => onPage(number)} className={`min-w-10 rounded-md border px-3 py-2 text-sm font-semibold ${number === page ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300"}`}>{number}</button>)}<button type="button" disabled={page >= totalPages} onClick={() => onPage(page + 1)} className="rounded-md border px-3 py-2 text-sm font-semibold disabled:opacity-40">Next</button></nav>;
}
function legacyCategory(value: string | null) { return ({ opinion: "judicial", statute: "statutory", constitution: "constitutional" } as Record<string, string>)[value || ""] || ""; }
function categoryToLegacyType(value: string) { return ({ judicial: "opinion", statutory: "statute", constitutional: "constitution" } as Record<string, string>)[value] || ""; }
function fallbackSnippet(date?: string | null) { return date ? `Decision date: ${date}. Open the authority to read its text.` : "Open the authority to read its text."; }
function humanMatchField(field?: string | null) { return ({ primary_text: "Matching authority text", title: "Matching title", citation: "Matching citation" } as Record<string, string>)[field || ""] || "Search match"; }
function resultCountLabel(length: number, total: number | undefined, totalIsExact: boolean | undefined, apiBaseUrl: string | null) {
  if (total !== undefined && totalIsExact !== false) return `${total.toLocaleString()} ${total === 1 ? "authority" : "authorities"}`;
  if (total !== undefined) return `${total.toLocaleString()}+ authorities`;
  if (apiBaseUrl) return length >= 50 ? "First 50+ authorities" : `First ${length} ${length === 1 ? "authority" : "authorities"}`;
  return `${length} sample ${length === 1 ? "authority" : "authorities"}`;
}
