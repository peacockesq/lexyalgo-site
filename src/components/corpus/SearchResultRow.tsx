import Link from "next/link";
import type { SearchResult } from "@/lib/corpus";
import { GradeBadge } from "./GradeBadge";

export function SearchResultRow({ result }: { result: SearchResult }) {
  const warning = result.grade === "D" || result.grade === "F";
  return (
    <li className={`border-b py-7 first:border-t ${warning ? "border-red-300 bg-red-50/60 px-4" : "border-slate-200"}`}>
      <article>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span>{result.authority_type}</span><span aria-hidden="true">·</span><span>{result.jurisdiction}</span><span aria-hidden="true">·</span><span className="capitalize">{(result.status || "current").replaceAll("_", " ")}</span>
            </div>
            <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight text-slate-950">
              <Link href={result.route} className="underline decoration-transparent underline-offset-4 transition hover:decoration-slate-400">{result.title}</Link>
            </h2>
            <p className="mt-2 font-mono text-sm font-semibold text-slate-700">{result.citation}</p>
            <p className="mt-2 text-sm text-slate-600">{result.body}</p>
          </div>
          <GradeBadge grade={result.grade} compact />
        </div>
        <div className="mt-5 border-l-2 border-slate-200 pl-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{result.snippet_label}</p>
          <p className="mt-2 line-clamp-3 font-serif text-sm leading-6 text-slate-700">{result.snippet}</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600">
          <span className={warning ? "font-bold text-red-900" : ""}>{result.reason}</span>
          <span>Verified: {result.verified_at ?? "not official"}</span>
          {result.limitation && <span className="font-semibold text-amber-800">{result.limitation}</span>}
          {result.source_url && <a href={result.source_url} target="_blank" rel="noreferrer" className="font-semibold text-slate-800 underline underline-offset-4">Official source</a>}
        </div>
      </article>
    </li>
  );
}
