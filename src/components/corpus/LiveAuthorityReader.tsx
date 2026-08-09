"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { LiveAuthorityResponse, LiveProofBundle } from "@/lib/corpus";
import { GradeBadge } from "./GradeBadge";

export function LiveAuthorityReader({ apiBaseUrl }: { apiBaseUrl: string | null }) {
  const slug = useSearchParams().get("slug") || "";
  const [authority, setAuthority] = useState<LiveAuthorityResponse | null>(null);
  const [proof, setProof] = useState<LiveProofBundle | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!apiBaseUrl || !slug) return;
    const controller = new AbortController();
    (async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/v1/authorities/${encodeURIComponent(slug)}`, {
          headers: { Accept: "application/json" }, signal: controller.signal,
        });
        if (!response.ok) throw new Error(response.status === 404 ? "Authority not found." : `LexyCorpus API returned ${response.status}.`);
        const value = (await response.json()) as LiveAuthorityResponse;
        setAuthority(value);
        const proofResponse = await fetch(`${apiBaseUrl}/v1/proof-bundles/${encodeURIComponent(value.version.version_id)}`, {
          headers: { Accept: "application/json" }, signal: controller.signal,
        });
        if (!proofResponse.ok) throw new Error(`Proof service returned ${proofResponse.status}.`);
        setProof((await proofResponse.json()) as LiveProofBundle);
        setError(null);
      } catch (caught) {
        if (!controller.signal.aborted) setError(caught instanceof Error ? caught.message : "The live authority could not be loaded.");
      }
    })();
    return () => controller.abort();
  }, [apiBaseUrl, slug]);

  if (!apiBaseUrl) return <Unavailable message="This build has no live LexyCorpus API endpoint configured." />;
  if (!slug) return <Unavailable message="No authority was selected." />;
  if (error) return <Unavailable message={error} />;
  if (!authority) return <p className="py-20 text-center text-sm font-semibold text-slate-600" role="status">Loading the live canonical authority…</p>;

  const warning = authority.verification.grade === "D" || authority.verification.grade === "F";
  return (
    <article>
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
        <Link href="/corpus/" className="hover:text-slate-900">LexyCorpus</Link> <span aria-hidden="true">/</span>{" "}
        <Link href="/corpus/search/" className="hover:text-slate-900">Search</Link> <span aria-hidden="true">/</span>{" "}
        <span aria-current="page" className="text-slate-700">Live authority</span>
      </nav>

      {warning && (
        <div className="mb-8 border-2 border-red-700 bg-red-50 p-5 text-red-950" role="alert">
          <p className="text-xs font-bold uppercase tracking-[0.18em]">{authority.verification.grade === "F" ? "Confirmed material defect" : "Suspected issue"}</p>
          <p className="mt-2 font-semibold">Do not rely on this record without checking the official publisher or a corrected version.</p>
          <p className="mt-2 text-sm">{authority.verification.reason}</p>
        </div>
      )}

      <header className="border-b border-slate-300 pb-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{authority.record.authority_type} · {authority.record.jurisdiction}</p>
            <h1 className="mt-3 text-pretty font-serif text-4xl font-semibold text-slate-950 sm:text-5xl">{authority.record.title}</h1>
            <p className="mt-3 text-sm text-slate-600">{authority.record.body}</p>
            {authority.record.citation_aliases.length > 0 && (
              <p className="mt-4 font-mono text-sm font-semibold text-slate-800">
                {authority.record.citation_aliases.map((alias) => alias.display_value).join(" · ")}
              </p>
            )}
          </div>
          <GradeBadge grade={authority.verification.grade} />
        </div>
      </header>

      <section className="border-b border-slate-200 py-7" aria-labelledby="verification-heading">
        <h2 id="verification-heading" className="font-serif text-2xl font-semibold text-slate-950">Verification</h2>
        <p className={`mt-3 font-semibold ${warning ? "text-red-900" : "text-slate-800"}`}>{authority.verification.reason}</p>
        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
          <Detail label="Reason code" value={authority.verification.reason_code} />
          <Detail label="Policy" value={authority.verification.policy_version} />
          <Detail label="Officially verified" value={authority.verification.verified_at || "Pending"} />
          <Detail label="Version" value={authority.version.version_id} />
          <Detail label="Decision date" value={authority.version.decision_date || "Not reported"} />
          <Detail label="Normalized text SHA-256" value={authority.version.normalized_text_sha256} mono />
        </dl>
      </section>

      <section className="py-8" aria-labelledby="primary-text-heading">
        <h2 id="primary-text-heading" className="font-serif text-3xl font-semibold text-slate-950">Primary text</h2>
        <pre className="mt-6 whitespace-pre-wrap font-serif text-base leading-8 text-slate-900">{authority.version.primary_text}</pre>
      </section>

      <section className="border-t border-slate-300 py-8" aria-labelledby="proof-heading">
        <h2 id="proof-heading" className="font-serif text-2xl font-semibold text-slate-950">Integrity proof</h2>
        {proof ? (
          <div className="mt-5 space-y-5 text-sm text-slate-700">
            {proof.artifacts.map((artifact) => (
              <dl key={artifact.object_uri} className="grid gap-3 border-l-2 border-slate-300 pl-4 sm:grid-cols-2">
                <Detail label="Artifact" value={artifact.kind} />
                <Detail label="Bytes" value={artifact.byte_length.toLocaleString()} />
                <Detail label="SHA-256" value={artifact.sha256} mono />
                <Detail label="Verified by" value={artifact.verification_method} />
              </dl>
            ))}
            <details>
              <summary className="cursor-pointer font-semibold text-slate-900">Source snapshot provenance</summary>
              <pre className="mt-3 overflow-x-auto whitespace-pre-wrap bg-slate-50 p-4 font-mono text-xs leading-5">{JSON.stringify(proof.source_snapshot || {}, null, 2)}</pre>
            </details>
            <a href={`${apiBaseUrl}/v1/authorities/${encodeURIComponent(slug)}`} className="inline-block font-semibold underline underline-offset-4">Open canonical API response</a>
          </div>
        ) : <p className="mt-3 text-sm text-slate-600">Loading proof…</p>}
      </section>
    </article>
  );
}

function Detail({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</dt><dd className={`mt-1 break-all ${mono ? "font-mono text-xs" : ""}`}>{value}</dd></div>;
}

function Unavailable({ message }: { message: string }) {
  return (
    <div className="py-20 text-center">
      <h1 className="font-serif text-3xl font-semibold text-slate-950">Live authority unavailable</h1>
      <p className="mt-3 text-sm text-slate-600">{message}</p>
      <Link href="/corpus/search/" className="mt-6 inline-block font-semibold underline underline-offset-4">Return to corpus search</Link>
    </div>
  );
}
