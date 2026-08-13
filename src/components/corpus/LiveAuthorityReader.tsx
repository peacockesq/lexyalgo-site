"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { gradeDescriptions, gradeLabels, type LiveAuthorityResponse, type LivePathResponse } from "@/lib/corpus";
import { AuthorityBreadcrumbs } from "./AuthorityBreadcrumbs";
import { AuthorityTextReader } from "./AuthorityTextReader";
import { GradeBadge } from "./GradeBadge";

export function LiveAuthorityReader({ apiBaseUrl }: { apiBaseUrl: string | null }) {
  const querySlug = useSearchParams().get("slug") || "";
  const pathname = usePathname();
  const canonicalRequestPath = /^\/corpus\/(cases|statutes|constitutions)\//.test(pathname) ? pathname : "";
  const [authority, setAuthority] = useState<LiveAuthorityResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [citationCopied, setCitationCopied] = useState(false);

  useEffect(() => {
    if (!apiBaseUrl || (!querySlug && !canonicalRequestPath)) return;
    const controller = new AbortController();
    (async () => {
      try {
        setAuthority(null);
        setError(null);
        let slug = querySlug;
        if (canonicalRequestPath) {
          const encodedPath = canonicalRequestPath.split("/").filter(Boolean).map(encodeURIComponent).join("/");
          const pathResponse = await fetch(`${apiBaseUrl}/v1/paths/${encodedPath}`, { headers: { Accept: "application/json" }, signal: controller.signal });
          if (!pathResponse.ok) throw new Error(pathResponse.status === 404 ? "Authority not found." : `LexyCorpus path service returned ${pathResponse.status}.`);
          const resolved = (await pathResponse.json()) as LivePathResponse;
          slug = resolved.authority.slug;
          if (resolved.redirect_required && resolved.canonical_path !== pathname) {
            window.location.replace(resolved.canonical_path);
            return;
          }
        }
        const response = await fetch(`${apiBaseUrl}/v1/authorities/${encodeURIComponent(slug)}`, { headers: { Accept: "application/json" }, signal: controller.signal });
        if (!response.ok) throw new Error(response.status === 404 ? "Authority not found." : `LexyCorpus returned ${response.status}.`);
        const value = (await response.json()) as LiveAuthorityResponse;
        setAuthority(value);
        if (!canonicalRequestPath && value.canonical_path) window.history.replaceState(window.history.state, "", value.canonical_path);
        const canonicalPath = value.canonical_path || canonicalRequestPath;
        if (canonicalPath) setCanonicalDocumentMetadata(value, canonicalPath);
        setError(null);
      } catch (caught) {
        if (!controller.signal.aborted) setError(caught instanceof Error ? caught.message : "The live authority could not be loaded.");
      }
    })();
    return () => controller.abort();
  }, [apiBaseUrl, canonicalRequestPath, pathname, querySlug]);

  if (!apiBaseUrl) return <Unavailable message="This build has no live LexyCorpus endpoint configured." />;
  if (!querySlug && !canonicalRequestPath) return <Unavailable message="No authority was selected." />;
  if (error) return <Unavailable message={error} />;
  if (!authority) return <p className="py-20 text-center text-sm font-semibold text-slate-600" role="status">Loading authority…</p>;

  const grade = authority.verification.grade;
  const warning = grade === "D" || grade === "F";
  const citation = authority.record.citation_aliases[0]?.display_value || authority.record.title;
  const relevantDate = authority.version.decision_date || authority.version.effective_date || authority.version.publication_date || authority.version.current_through;
  const category = authority.record.category || categoryFor(authority.record.authority_type);
  const issuingBody = authority.record.issuing_body || authority.record.body;
  const structure = authority.record.structure || authority.version.structure;

  async function copyCitation() {
    await navigator.clipboard.writeText(citation);
    setCitationCopied(true);
    window.setTimeout(() => setCitationCopied(false), 1800);
  }

  return (
    <article>
      <AuthorityBreadcrumbs title={authority.record.title} jurisdiction={authority.record.jurisdiction} authorityType={authority.record.authority_type} structure={structure} />
      {warning && (
        <div className="mb-8 border-2 border-red-700 bg-red-50 p-5 text-red-950" role="alert">
          <p className="text-xs font-bold uppercase tracking-[0.18em]">Grade {grade}: {gradeLabels[grade]}</p>
          <p className="mt-2 font-semibold">{grade === "F" ? "A known problem affects this record. Do not rely on it." : "A potential problem affects this record. Verify it before relying on it."}</p>
        </div>
      )}

      <header className="border-b border-slate-300 pb-9">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{humanCategory(category)} · {authority.record.jurisdiction}</p>
        <h1 className="mt-3 text-pretty font-serif text-4xl font-semibold text-slate-950 sm:text-5xl">{authority.record.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="font-mono text-sm font-semibold text-slate-800">{citation}</p>
          <button type="button" onClick={copyCitation} className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500">{citationCopied ? "Citation copied" : "Copy citation"}</button>
        </div>
        <dl className="mt-6 grid gap-5 text-sm sm:grid-cols-2">
          <Detail label="Issuing body" value={issuingBody || "Not reported"} />
          <Detail label="Relevant date" value={relevantDate || "Not reported"} />
        </dl>
      </header>

      <section className={`my-8 rounded-2xl border p-6 ${warning ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"}`} aria-labelledby="verification-heading">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Text verification</p>
            <h2 id="verification-heading" className="mt-2 font-serif text-2xl font-semibold text-slate-950">{gradeLabels[grade]}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-700">{gradeDescriptions[grade]}</p>
            {authority.verification.verified_at && <p className="mt-2 text-sm text-slate-600">Last checked: {authority.verification.verified_at}</p>}
          </div>
          <GradeBadge grade={grade} />
        </div>
      </section>

      <AuthorityTextReader primaryText={authority.version.primary_text} paragraphs={authority.version.paragraphs} title={authority.record.title} citation={citation} authorityType={authority.record.authority_type} sectionNumber={structure?.section_number} />
    </article>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</dt><dd className="mt-1 font-semibold text-slate-800">{value}</dd></div>;
}

function categoryFor(authorityType: string) {
  if (authorityType === "opinion") return "judicial";
  if (authorityType === "statute") return "statutory";
  if (authorityType === "constitution") return "constitutional";
  return "administrative";
}

function humanCategory(category: string) {
  return ({ judicial: "Judicial opinion", statutory: "Statute", constitutional: "Constitution", administrative: "Administrative & agency material" } as Record<string, string>)[category] || category.replaceAll("_", " ");
}

function setCanonicalDocumentMetadata(authority: LiveAuthorityResponse, canonicalPath: string) {
  document.title = `${authority.record.title} | LexyCorpus`;
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = new URL(canonicalPath, window.location.origin).href;
}

function Unavailable({ message }: { message: string }) {
  return <div className="py-20 text-center"><h1 className="font-serif text-3xl font-semibold text-slate-950">Authority unavailable</h1><p className="mt-3 text-sm text-slate-600">{message}</p><Link href="/corpus/search/" className="mt-6 inline-block font-semibold underline underline-offset-4">Return to search</Link></div>;
}
