import Link from "next/link";
import { listCorpusEntries } from "@/lib/corpus";
import { GradeBadge } from "./GradeBadge";

export function CorpusHome() {
  const entries = listCorpusEntries();
  const official = entries.filter((entry) => !entry.fixture_notice);
  return (
    <div className="min-h-screen bg-white px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <header className="max-w-4xl border-b border-slate-300 pb-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">LexyAlgo Corpus</p>
          <h1 className="mt-4 text-pretty font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-7xl">Primary law, with proof you can inspect.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">A contract-first national-law corpus. Read source-native text, see the verification grade before relying on it, and inspect every source and integrity hash.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/corpus/search/" className="rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">Search the corpus</Link>
            <a href="/corpus/api/v1/manifest.json" className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">API manifest</a>
          </div>
        </header>

        <section className="py-12" aria-labelledby="verified-samples-heading">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Rights-reviewed vertical slice</p><h2 id="verified-samples-heading" className="mt-2 font-serif text-3xl font-semibold text-slate-950">Verified public authorities</h2></div>
            <p className="text-sm text-slate-500">{official.length} official records</p>
          </div>
          <ul className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
            {official.map((entry) => {
              const response = entry.response;
              return (
                <li key={entry.slug} className="py-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{response.record.authority_type} · {response.record.jurisdiction}</p>
                      <h3 className="mt-2 font-serif text-2xl font-semibold text-slate-950"><Link className="underline decoration-transparent underline-offset-4 hover:decoration-slate-400" href={entry.route}>{response.record.title}</Link></h3>
                      <p className="mt-2 font-mono text-sm font-semibold text-slate-700">{response.record.citation_aliases[0]?.display_value}</p>
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{response.verification.reason}</p>
                    </div>
                    <GradeBadge grade={response.verification.grade} compact />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="border-t border-slate-300 py-10 text-sm leading-6 text-slate-600">
          <h2 className="font-serif text-2xl font-semibold text-slate-950">Evidence grades are usage controls</h2>
          <p className="mt-3 max-w-3xl">A means officially verified. B exposes a currentness or finality caveat. C and D are candidate records and remain opt-in. F is suppressed unless a user explicitly asks to inspect defects.</p>
        </section>
      </div>
    </div>
  );
}
