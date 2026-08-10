"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CORPUS_JURISDICTIONS, listCorpusEntries, type Grade, type LiveManifest, type LiveSearchResponse, type LiveSearchRow } from "@/lib/corpus";
import { atlasLoginUrl } from "@/lib/shared-auth-links";
import { GradeBadge } from "./GradeBadge";

type HomeRecord = {
  slug: string;
  route: string;
  title: string;
  citation: string;
  authorityType: string;
  jurisdiction: string;
  body: string;
  grade: Grade;
};

const gradeGuide: Array<{ grade: Grade; label: string; detail: string }> = [
  { grade: "A", label: "Official match", detail: "Clean official-source diff, verified within 365 days." },
  { grade: "B", label: "Stale official match", detail: "Previously A; official verification is now older than 365 days." },
  { grade: "C", label: "Lawful baseline", detail: "Usable public primary law awaiting official-source verification." },
  { grade: "D", label: "Suspected issue", detail: "Still searchable, ranked lower, with a conspicuous warning." },
  { grade: "F", label: "Confirmed defect", detail: "Still searchable, ranked last, with a do-not-rely warning." },
];

export function CorpusHome({ apiBaseUrl, mcpUrl }: { apiBaseUrl: string; mcpUrl: string }) {
  const fallbackEntries = listCorpusEntries().filter((entry) => !entry.fixture_notice);
  const fallbackRecords: HomeRecord[] = fallbackEntries.slice(0, 3).map((entry) => ({
    slug: entry.slug,
    route: entry.route,
    title: entry.response.record.title || entry.slug,
    citation: entry.response.record.citation_aliases?.[0]?.display_value || entry.response.record.title || entry.slug,
    authorityType: entry.response.record.authority_type,
    jurisdiction: entry.response.record.jurisdiction,
    body: entry.response.record.body || entry.response.record.heading || "Primary law",
    grade: entry.response.verification.grade,
  }));
  const [manifest, setManifest] = useState<LiveManifest | null>(null);
  const [records, setRecords] = useState<HomeRecord[]>([]);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [researchMode, setResearchMode] = useState<"search" | "ask">("search");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("mode") === "ask") setResearchMode("ask");
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const [manifestResponse, searchResponse] = await Promise.all([
          fetch(`${apiBaseUrl}/v1/manifest`, { headers: { Accept: "application/json" }, signal: controller.signal }),
          fetch(`${apiBaseUrl}/v1/search?limit=6`, { headers: { Accept: "application/json" }, signal: controller.signal }),
        ]);
        if (!manifestResponse.ok) throw new Error(`Manifest returned ${manifestResponse.status}`);
        if (!searchResponse.ok) throw new Error(`Search returned ${searchResponse.status}`);
        setManifest((await manifestResponse.json()) as LiveManifest);
        const search = (await searchResponse.json()) as LiveSearchResponse;
        setRecords(search.results.map(toHomeRecord));
        setLiveError(null);
      } catch (error) {
        if (controller.signal.aborted) return;
        setRecords(fallbackRecords);
        setLiveError(error instanceof Error ? error.message : "The live corpus is temporarily unavailable.");
      }
    })();
    return () => controller.abort();
  }, [apiBaseUrl]);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-[color:var(--color-surface)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div className="order-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[color:var(--color-ember-light)] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--color-primary)]">LexyCorpus</span>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Live public corpus</span>
              </div>
              <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">Primary law, with its source attached.</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">Search published judicial opinions, statutes, and constitutions across federal and state jurisdictions. Every result includes its verification grade, canonical version, source link, and integrity record.</p>
            </div>
            <div className="order-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:order-2">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Coverage now</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{manifest ? manifest.authority_count.toLocaleString() : "Loading…"}</p>
              <p className="mt-1 text-sm text-slate-500">published primary-law authorities</p>
              <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5 text-sm">
                <div><dt className="text-slate-400">Jurisdictions</dt><dd className="mt-1 font-semibold text-slate-800">53</dd></div>
                <div><dt className="text-slate-400">Source class</dt><dd className="mt-1 font-semibold text-slate-800">Primary law</dd></div>
                <div><dt className="text-slate-400">Current grade</dt><dd className="mt-1 font-semibold text-slate-800">Mostly C baseline</dd></div>
                <div><dt className="text-slate-400">Secondary sources</dt><dd className="mt-1 font-semibold text-slate-500">Coming later</dd></div>
              </dl>
            </div>

          <div className="order-2 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5 sm:p-6 lg:order-3 lg:col-span-2">
            <div className="inline-flex rounded-xl bg-slate-100 p-1" role="tablist" aria-label="Research mode">
              <button type="button" role="tab" aria-selected={researchMode === "search"} onClick={() => setResearchMode("search")} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${researchMode === "search" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>Search law</button>
              <button type="button" role="tab" aria-selected={researchMode === "ask"} onClick={() => setResearchMode("ask")} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${researchMode === "ask" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>Ask a question <span className="rounded-full bg-[color:var(--color-ember-light)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[color:var(--color-primary)]">Beta</span></button>
            </div>
            {researchMode === "search" ? (
              <form action="/corpus/search/" method="get" className="mt-5" role="tabpanel">
                <label htmlFor="corpus-home-query" className="text-sm font-semibold text-slate-800">Search the live corpus</label>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 focus-within:border-slate-600 focus-within:ring-2 focus-within:ring-slate-100">
                    <SearchIcon />
                    <input id="corpus-home-query" name="q" type="search" placeholder="Citation, case name, code section, court, or phrase" className="min-w-0 flex-1 bg-transparent py-4 text-base outline-none placeholder:text-slate-400" />
                  </div>
                  <button type="submit" className="rounded-xl bg-[color:var(--color-brand-primary-container)] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[color:var(--color-brand-primary)]">Search primary law</button>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <FilterSelect label="Jurisdiction" name="jurisdiction" defaultValue="" options={[["", "All jurisdictions"], ...CORPUS_JURISDICTIONS]} />
                  <FilterSelect label="Material type" name="authority_type" defaultValue="" options={[["", "All primary law"], ["opinion", "Judicial opinions"], ["statute", "Statutes"], ["constitution", "Constitutions"]]} />
                  <FilterSelect label="Source class" name="source_class" defaultValue="primary" options={[["primary", "Primary law"], ["secondary", "Secondary — coming later"]]} disabledOptions={["secondary"]} />
                  <FilterSelect label="Practice area" name="practice_area" defaultValue="" options={[["", "Coming later"]]} disabled />
                </div>
              </form>
            ) : (
              <div className="mt-5" role="tabpanel">
                <label htmlFor="corpus-home-question" className="text-sm font-semibold text-slate-800">Ask LexyCorpus</label>
                <textarea id="corpus-home-question" rows={3} placeholder="Ask a legal research question in ordinary language…" className="mt-3 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-base leading-7 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-600 focus:ring-2 focus:ring-slate-100" />
                <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <p className="max-w-2xl text-xs leading-5 text-slate-500">Account required. Beta plan: five completed answers per month for free users. Answers will use LexyCorpus authorities, cite their sources, and preserve grade and defect warnings.</p>
                  <a href={atlasLoginUrl("https://lexyalgo.com/corpus/?mode=ask")} className="shrink-0 rounded-xl bg-[color:var(--color-brand-primary-container)] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[color:var(--color-brand-primary)]">Sign in for beta access</a>
                </div>
              </div>
            )}
          </div>
          </div>
          {liveError && <p className="mt-4 border-l-4 border-amber-600 bg-amber-50 p-4 text-sm font-semibold text-amber-950" role="alert">Live service unavailable ({liveError}). Showing the reviewed fallback records below.</p>}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="coverage-heading">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--color-primary)]">What is covered</p>
          <h2 id="coverage-heading" className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">A national primary-law baseline.</h2>
          <p className="mt-5 text-base leading-7 text-slate-600">The current corpus covers federal, all 50 states, the District of Columbia, and Puerto Rico. Coverage is not the same as official verification: baseline records publish as grade C until the text is matched against the responsible government publisher.</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          <CoverageCard title="Judicial opinions" text="Federal and state opinions with court, decision date, citations, primary text, and the source used for the baseline." status="Live" />
          <CoverageCard title="Statutes and constitutions" text="Section-level text across the national Open US Law snapshot, with canonical identifiers and publisher links preserved." status="Live" />
          <CoverageCard title="Secondary sources" text="Practice guides, commentary, headnotes, and proprietary editorial content are not part of the current product." status="Later" muted />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[color:var(--color-surface)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--color-primary)]">How currentness is checked</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Baseline first. Official verification next.</h2>
              <p className="mt-5 text-base leading-7 text-slate-600">We keep acquisition, normalization, and verification separate. That lets us publish lawful usable law now without pretending every record has already been checked against its official publisher.</p>
              <Link href="https://github.com/peacockesq/corpus/blob/main/data/source_registry/v1/source-registry.json" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-primary)] underline underline-offset-4">View the national source registry <ArrowIcon /></Link>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              <FreshnessStep number="1" title="Acquire a lawful baseline" text="CourtListener bulk case law and the Open US Law national statute/constitution snapshot establish broad public coverage." links={[["CourtListener bulk data", "https://www.courtlistener.com/api/bulk-info/"], ["Open US Law", "https://github.com/vaquill/open-law"]]} />
              <FreshnessStep number="2" title="Preserve the exact source" text="Raw hashes, retrieval facts, parser versions, normalized hashes, and immutable object locations become the proof record." />
              <FreshnessStep number="3" title="Compare with official publishers" text="Official court and legislature sources are checked jurisdiction by jurisdiction. A clean diff can move a record from C to A." links={[["U.S. Supreme Court", "https://www.supremecourt.gov/opinions/opinions.aspx"], ["GovInfo", "https://www.govinfo.gov/developers"], ["Connecticut opinions", "https://www.jud.ct.gov/external/supapp/Cases.htm"]]} />
              <FreshnessStep number="4" title="Monitor changes and defects" text="Publisher indexes, release dates, correction windows, and content hashes drive rechecks. Suspected and confirmed defects remain visible as D or F." />
            </ol>
          </div>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600">
            <span className="font-semibold text-slate-900">A note on links:</span> the registry tracks 270 source definitions across 53 jurisdictions, including official court, legislature, code, and federal publication endpoints. A listed source is not automatically approved for automated collection; access methods are reviewed separately and fail closed.
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--color-primary)]">Verification grades</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">The grade tells you what has been checked.</h2>
            <p className="mt-5 text-base leading-7 text-slate-600">It is not a quality score or an AI confidence number. It describes the record’s relationship to an official source and any known defect.</p>
          </div>
          <ol className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            {gradeGuide.map((item, index) => <li key={item.grade} className={`grid grid-cols-[auto_1fr] gap-4 p-5 sm:grid-cols-[auto_12rem_1fr] sm:items-center ${index ? "border-t border-slate-100" : ""}`}><GradeBadge grade={item.grade} compact /><p className="font-semibold text-slate-900">{item.label}</p><p className="col-start-2 text-sm leading-6 text-slate-600 sm:col-start-3">{item.detail}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[color:var(--color-surface)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--color-primary)]">Live records</p><h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">From the public index.</h2></div><Link href="/corpus/search/" className="text-sm font-semibold text-slate-800 underline underline-offset-4">Search all authorities</Link></div>
          {records.length ? <ul className="mt-8 grid gap-4 md:grid-cols-3">{records.slice(0, 3).map((record) => <AuthorityCard key={record.slug} record={record} />)}</ul> : <div className="mt-8 grid gap-4 md:grid-cols-3" role="status">{[0, 1, 2].map((key) => <div key={key} className="h-64 animate-pulse rounded-3xl bg-white" />)}</div>}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="rounded-3xl bg-[color:var(--color-brand-primary)] px-6 py-10 text-white sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--color-brand-on-primary-container)]">For developers and agents</p><h2 className="mt-3 text-3xl font-semibold">The same contract on the web, API, and MCP.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">Canonical IDs, versions, citations, grades, reasons, defects, and proof bundles mean the same thing in every interface.</p></div>
          <div className="mt-7 flex shrink-0 flex-wrap gap-3 lg:mt-0"><a href={`${apiBaseUrl}/v1/manifest`} className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900">API manifest</a><a href={mcpUrl} className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white">Remote MCP</a></div>
        </div>
      </section>
    </main>
  );
}

function toHomeRecord(row: LiveSearchRow): HomeRecord { return { slug: row.slug, route: `/corpus/live-authority/?slug=${encodeURIComponent(row.slug)}`, title: row.title, citation: row.citation || row.title, authorityType: row.authority_type, jurisdiction: row.jurisdiction, body: row.body, grade: row.grade }; }
function CoverageCard({ title, text, status, muted = false }: { title: string; text: string; status: string; muted?: boolean }) { return <article className={`rounded-3xl border p-6 ${muted ? "border-dashed border-slate-300 bg-slate-50" : "border-slate-200 bg-white shadow-sm"}`}><div className="flex items-center justify-between gap-3"><h3 className="text-xl font-semibold text-slate-950">{title}</h3><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${muted ? "bg-slate-200 text-slate-600" : "bg-emerald-100 text-emerald-700"}`}>{status}</span></div><p className="mt-4 text-sm leading-6 text-slate-600">{text}</p></article>; }
function FreshnessStep({ number, title, text, links = [] }: { number: string; title: string; text: string; links?: Array<[string, string]> }) { return <li className="rounded-3xl border border-slate-200 bg-white p-6"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--color-brand-primary-fixed)] text-xs font-bold text-[color:var(--color-brand-primary)]">{number}</span><h3 className="mt-5 text-lg font-semibold text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>{links.length > 0 && <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">{links.map(([label, href]) => <a key={href} href={href} className="text-xs font-semibold text-[color:var(--color-primary)] underline underline-offset-4">{label}</a>)}</div>}</li>; }
function AuthorityCard({ record }: { record: HomeRecord }) { return <li className="flex min-h-64 flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-start justify-between gap-3"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{record.authorityType} · {jurisdictionLabel(record.jurisdiction)}</p><GradeBadge grade={record.grade} compact /></div><h3 className="mt-5 line-clamp-3 text-xl font-semibold leading-snug text-slate-950"><Link href={record.route} className="hover:text-[color:var(--color-primary)]">{record.title}</Link></h3><p className="mt-3 font-mono text-xs font-semibold text-slate-600">{record.citation}</p><p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">{record.body}</p><Link href={record.route} className="mt-auto pt-5 text-sm font-semibold text-slate-800">Read authority →</Link></li>; }
function FilterSelect({ label, name, options, defaultValue, disabled = false, disabledOptions = [] }: { label: string; name: string; options: ReadonlyArray<readonly [string, string]>; defaultValue: string; disabled?: boolean; disabledOptions?: string[] }) { return <label className="block"><span className="text-xs font-semibold text-slate-500">{label}</span><select name={name} defaultValue={defaultValue} disabled={disabled} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-500 disabled:cursor-not-allowed disabled:text-slate-400">{options.map(([value, text]) => <option key={`${name}-${value}`} value={value} disabled={disabledOptions.includes(value)}>{text}</option>)}</select></label>; }
function jurisdictionLabel(value: string): string { return CORPUS_JURISDICTIONS.find(([code]) => code === value)?.[1] || value; }
function SearchIcon() { return <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.4-3.4" /></svg>; }
function ArrowIcon() { return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>; }
