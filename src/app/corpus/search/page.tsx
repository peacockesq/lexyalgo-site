import type { Metadata } from "next";
import Link from "next/link";
import { CorpusSearch } from "@/components/corpus/CorpusSearch";
import { getCorpusBundle, listSearchResults } from "@/lib/corpus";

export const metadata: Metadata = {
  title: "Search Primary Law | LexyAlgo Corpus",
  description: "Search primary law with explicit source evidence, verification grades, limitations, and integrity hashes.",
};

export default function CorpusSearchPage() {
  const bundle = getCorpusBundle();
  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500"><Link href="/corpus/" className="hover:text-slate-900">Corpus</Link> <span aria-hidden="true">/</span> <span aria-current="page" className="text-slate-700">Search</span></nav>
        <header className="mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">National-law corpus</p>
          <h1 className="mt-3 text-pretty font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Search primary law with the proof attached.</h1>
          <p className="mt-5 text-base leading-7 text-slate-600">Every result exposes its source, verification grade, currentness or finality limitation, and integrity record. Grades A and B are shown by default.</p>
        </header>
        <CorpusSearch results={listSearchResults()} dataAsOf={bundle.data_as_of} />
      </div>
    </div>
  );
}
