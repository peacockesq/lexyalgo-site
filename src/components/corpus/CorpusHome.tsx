"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { LiveManifest, LiveSearchResponse, LiveSearchRow } from "@/lib/corpus";
import { listCorpusEntries } from "@/lib/corpus";
import { GradeBadge } from "./GradeBadge";

type HomeRecord = {
  slug: string;
  route: string;
  title: string;
  citation: string;
  authorityType: string;
  jurisdiction: string;
  grade: "A" | "B" | "C" | "D" | "F";
  reason: string;
};

export function CorpusHome({ apiBaseUrl, mcpUrl }: { apiBaseUrl: string; mcpUrl: string }) {
  const fallbackEntries = listCorpusEntries().filter((entry) => !entry.fixture_notice);
  const fallbackRecords: HomeRecord[] = fallbackEntries.slice(0, 24).map((entry) => ({
    slug: entry.slug,
    route: entry.route,
    title: entry.response.record.title || entry.slug,
    citation: entry.response.record.citation_aliases?.[0]?.display_value || entry.response.record.title || entry.slug,
    authorityType: entry.response.record.authority_type,
    jurisdiction: entry.response.record.jurisdiction,
    grade: entry.response.verification.grade,
    reason: entry.response.verification.reason || entry.response.verification.reason_code,
  }));
  const [manifest, setManifest] = useState<LiveManifest | null>(null);
  const [records, setRecords] = useState<HomeRecord[]>([]);
  const [liveError, setLiveError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const [manifestResponse, searchResponse] = await Promise.all([
          fetch(`${apiBaseUrl}/v1/manifest`, { headers: { Accept: "application/json" }, signal: controller.signal }),
          fetch(`${apiBaseUrl}/v1/search?limit=24`, { headers: { Accept: "application/json" }, signal: controller.signal }),
        ]);
        if (!manifestResponse.ok) throw new Error(`Manifest returned ${manifestResponse.status}`);
        if (!searchResponse.ok) throw new Error(`Search returned ${searchResponse.status}`);
        const liveManifest = (await manifestResponse.json()) as LiveManifest;
        const liveSearch = (await searchResponse.json()) as LiveSearchResponse;
        setManifest(liveManifest);
        setRecords(liveSearch.results.map(toHomeRecord));
        setLiveError(null);
      } catch (error) {
        if (controller.signal.aborted) return;
        setRecords(fallbackRecords);
        setLiveError(error instanceof Error ? error.message : "The live corpus is temporarily unavailable.");
      }
    })();
    return () => controller.abort();
  }, [apiBaseUrl]);

  const gradeCounts = manifest?.grade_counts || {};
  const total = manifest?.authority_count;

  return (
    <div className="min-h-screen bg-white px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <header className="max-w-4xl border-b border-slate-300 pb-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">LexyCorpus</p>
          <h1 className="mt-4 text-pretty font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-7xl">Primary law, with proof you can inspect.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">Search millions of published statutes, constitutions, and judicial opinions. Every authority carries its verification grade, canonical version, source provenance, and integrity proof.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/corpus/search/" className="rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">Search the live corpus</Link>
            <a href={`${apiBaseUrl}/v1/manifest`} className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">Live API manifest</a>
            <a href={mcpUrl} className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">Remote MCP endpoint</a>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3" aria-live="polite">
            <Stat label="Published authorities" value={total === undefined ? "Loading…" : total.toLocaleString()} />
            <Stat label="Lawful baselines (C)" value={total === undefined ? "Loading…" : (gradeCounts.C || 0).toLocaleString()} />
            <Stat label="Data current through" value={manifest ? new Date(manifest.data_as_of).toLocaleDateString(undefined, { timeZone: "UTC" }) : "Loading…"} />
          </div>
          {liveError && <p className="mt-5 border-l-4 border-amber-600 bg-amber-50 p-4 text-sm font-semibold text-amber-950" role="alert">Live service unavailable ({liveError}). Showing the reviewed demonstration fallback below.</p>}
        </header>

        <section className="py-12" aria-labelledby="live-records-heading">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Public authorities</p>
              <h2 id="live-records-heading" className="mt-2 font-serif text-3xl font-semibold text-slate-950">{liveError ? "Demonstration fallback" : "Live corpus records"}</h2>
            </div>
            <p className="text-sm text-slate-500">{total === undefined ? "Connecting to the live index…" : `${total.toLocaleString()} published records`}</p>
          </div>
          {records.length > 0 ? (
            <ul className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
              {records.map((record) => {
                const warning = record.grade === "D" || record.grade === "F";
                return (
                  <li key={record.slug} className={`py-6 ${warning ? "bg-red-50 px-4" : ""}`}>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{record.authorityType} · {record.jurisdiction}</p>
                        <h3 className="mt-2 font-serif text-2xl font-semibold text-slate-950"><Link className="underline decoration-transparent underline-offset-4 hover:decoration-slate-400" href={record.route}>{record.title}</Link></h3>
                        <p className="mt-2 font-mono text-sm font-semibold text-slate-700">{record.citation}</p>
                        <p className={`mt-3 max-w-2xl text-sm leading-6 ${warning ? "font-bold text-red-900" : "text-slate-600"}`}>{record.reason}</p>
                      </div>
                      <GradeBadge grade={record.grade} compact />
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="mt-7 border-y border-slate-200 py-14 text-center text-sm font-semibold text-slate-600" role="status">Loading live statutes, constitutions, and opinions…</div>
          )}
          <p className="mt-6 text-sm text-slate-600">Use <Link className="font-semibold underline" href="/corpus/search/">live search</Link> to find an authority by citation, title, court, code, or text.</p>
        </section>

        <section className="border-t border-slate-300 py-10 text-sm leading-6 text-slate-600">
          <h2 className="font-serif text-2xl font-semibold text-slate-950">Evidence grades are usage controls</h2>
          <p className="mt-3 max-w-3xl">A is a clean official diff match verified within 365 days. B is previously A but stale. C is a lawful baseline awaiting official verification. D and F remain discoverable, rank last, and carry conspicuous suspected-issue or confirmed-defect warnings.</p>
        </section>

        <section className="border-t border-slate-300 py-10 text-sm leading-6 text-slate-600" aria-labelledby="developer-heading">
          <h2 id="developer-heading" className="font-serif text-2xl font-semibold text-slate-950">One contract, three live interfaces</h2>
          <p className="mt-3 max-w-3xl">The research website, read-only HTTP API, and remote MCP server expose the same canonical authority, immutable version, verification grade and reason, proof bundle, defect warning, and citation-resolution semantics.</p>
          <div className="mt-5 flex flex-wrap gap-4">
            <a className="font-semibold text-slate-900 underline underline-offset-4" href={`${apiBaseUrl}/v1/manifest`}>Live HTTP API</a>
            <a className="font-semibold text-slate-900 underline underline-offset-4" href={mcpUrl}>Remote MCP server</a>
          </div>
        </section>
      </div>
    </div>
  );
}

function toHomeRecord(row: LiveSearchRow): HomeRecord {
  return {
    slug: row.slug,
    route: `/corpus/live-authority/?slug=${encodeURIComponent(row.slug)}`,
    title: row.title,
    citation: row.citation || row.title,
    authorityType: row.authority_type,
    jurisdiction: row.jurisdiction,
    grade: row.grade,
    reason: row.reason,
  };
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="border-l-2 border-slate-300 pl-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 font-serif text-2xl font-semibold text-slate-950">{value}</p></div>;
}
