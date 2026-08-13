import type { Metadata } from "next";
import { Suspense } from "react";
import { LiveAuthorityReader } from "@/components/corpus/LiveAuthorityReader";
import { getLexyCorpusApiUrl } from "@/lib/corpus";

export const metadata: Metadata = {
  title: "Live Primary Law | LexyCorpus",
  description: "Read a LexyCorpus authority with its citation, issuing body, relevant date, and clear verification status.",
};

export default function LiveAuthorityPage() {
  const apiBaseUrl = getLexyCorpusApiUrl();
  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <Suspense fallback={<p className="py-20 text-center text-sm font-semibold text-slate-600">Loading the live canonical authority…</p>}>
          <LiveAuthorityReader apiBaseUrl={apiBaseUrl} />
        </Suspense>
      </div>
    </main>
  );
}
