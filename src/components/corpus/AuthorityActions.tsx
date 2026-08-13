"use client";

import { useState } from "react";

export function AuthorityActions({
  slug,
  primaryText,
  citation,
  sourceUrl,
  apiRoute,
  proofRoute,
}: {
  slug: string;
  primaryText: string;
  citation: string;
  sourceUrl: string | null;
  apiRoute: string;
  proofRoute: string;
}) {
  const [copied, setCopied] = useState(false);
  const [citationCopied, setCitationCopied] = useState(false);

  async function copyText() {
    await navigator.clipboard.writeText(primaryText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function copyCitation() {
    await navigator.clipboard.writeText(citation);
    setCitationCopied(true);
    window.setTimeout(() => setCitationCopied(false), 1800);
  }

  function downloadText() {
    const blob = new Blob([primaryText], { type: "text/plain;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `${slug}.txt`;
    link.click();
    URL.revokeObjectURL(href);
  }

  return (
    <section aria-label="Authority actions" className="flex flex-wrap gap-3 border-t border-slate-200 py-8">
      <button type="button" onClick={copyText} className="rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">{copied ? "Copied" : "Copy primary text"}</button>
      <button type="button" onClick={copyCitation} className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-500 hover:bg-slate-50">{citationCopied ? "Citation copied" : "Copy citation"}</button>
      <button type="button" onClick={downloadText} className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-500 hover:bg-slate-50">Download text</button>
      {sourceUrl && <a href={sourceUrl} target="_blank" rel="noreferrer" className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-500 hover:bg-slate-50">View source record</a>}
      <a href="#verification" className="px-2 py-2.5 text-sm font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-800">Verification details</a>
      <details className="w-full pt-2 text-sm">
        <summary className="cursor-pointer font-semibold text-slate-600">Developer data</summary>
        <div className="mt-3 flex flex-wrap gap-3">
          <a href={apiRoute} className="rounded-md border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-800 transition hover:border-slate-500 hover:bg-slate-50">Authority JSON</a>
          <a href={proofRoute} className="rounded-md border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-800 transition hover:border-slate-500 hover:bg-slate-50">Proof bundle</a>
        </div>
      </details>
    </section>
  );
}
