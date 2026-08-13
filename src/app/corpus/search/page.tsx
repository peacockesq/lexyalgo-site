import type { Metadata } from "next";
import Link from "next/link";
import { CorpusSearch } from "@/components/corpus/CorpusSearch";
import { getCorpusBundle, getLexyCorpusApiUrl, listSearchResults } from "@/lib/corpus";

export const metadata: Metadata = {
  title: "Search Primary Law | LexyCorpus",
  description: "Search judicial opinions, statutes, constitutions, and administrative materials with clear verification grades.",
};

export default function CorpusSearchPage() {
  const bundle = getCorpusBundle();
  const apiBaseUrl = getLexyCorpusApiUrl();
  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500"><Link href="/corpus/" className="hover:text-slate-900">LexyCorpus</Link> <span aria-hidden="true">/</span> <span aria-current="page" className="text-slate-700">Search</span></nav>
        <header className="mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Free legal research</p>
          <h1 className="mt-3 text-pretty font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Search the law.</h1>
          <p className="mt-5 text-base leading-7 text-slate-600">Find public authorities and see, in plain language, whether each text has been checked against an official source.</p>
        </header>
        <CorpusSearch results={listSearchResults()} dataAsOf={bundle.data_as_of} apiBaseUrl={apiBaseUrl} />
      </div>
    </div>
  );
}
