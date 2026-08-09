import Link from "next/link";
import { listCorpusEntries } from "@/lib/corpus";
import { GradeBadge } from "./GradeBadge";

export function CorpusHome({ apiBaseUrl, mcpUrl }: { apiBaseUrl: string | null; mcpUrl: string | null }) {
  const entries = listCorpusEntries();
  const official = entries.filter((entry) => !entry.fixture_notice);
  const gradeA = official.filter((entry) => entry.response.verification.grade === "A");
  const gradeB = official.filter((entry) => entry.response.verification.grade === "B");
  const featured = official.slice(0, 24);
  return (
    <div className="min-h-screen bg-white px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <header className="max-w-4xl border-b border-slate-300 pb-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">LexyCorpus</p>
          <h1 className="mt-4 text-pretty font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-7xl">Primary law, with proof you can inspect.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">A contract-first national-law corpus. Read source-native text, see the verification grade before relying on it, and inspect every source and integrity hash.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/corpus/search/" className="rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">Search the corpus</Link>
            <a href={apiBaseUrl ? `${apiBaseUrl}/v1/manifest` : "/corpus/api/v1/manifest.json"} className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">{apiBaseUrl ? "Live API manifest" : "Static API manifest"}</a>
            {mcpUrl && <a href={mcpUrl} className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">Remote MCP endpoint</a>}
          </div>
        </header>

        <section className="py-12" aria-labelledby="verified-samples-heading">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Public authorities</p>
              <h2 id="verified-samples-heading" className="mt-2 font-serif text-3xl font-semibold text-slate-950">Browseable corpus records</h2>
            </div>
            <p className="text-sm text-slate-500">{official.length} public records · {gradeA.length} grade A · {gradeB.length} grade B</p>
          </div>
          <ul className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
            {featured.map((entry) => {
              const response = entry.response;
              const citation = response.record.citation_aliases?.[0]?.display_value
                || response.record.title
                || entry.slug;
              const reason = response.verification.reason
                || response.verification.reason_code
                || gradeLabelsFallback(response.verification.grade);
              return (
                <li key={entry.slug} className="py-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{response.record.authority_type} · {response.record.jurisdiction}</p>
                      <h3 className="mt-2 font-serif text-2xl font-semibold text-slate-950"><Link className="underline decoration-transparent underline-offset-4 hover:decoration-slate-400" href={entry.route}>{response.record.title || citation}</Link></h3>
                      <p className="mt-2 font-mono text-sm font-semibold text-slate-700">{citation}</p>
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{reason}</p>
                    </div>
                    <GradeBadge grade={response.verification.grade} compact />
                  </div>
                </li>
              );
            })}
          </ul>
          {official.length > featured.length ? (
            <p className="mt-6 text-sm text-slate-600">
              Showing {featured.length} of {official.length}. Use <Link className="underline" href="/corpus/search/">search</Link> for the full index.
            </p>
          ) : null}
        </section>

        <section className="border-t border-slate-300 py-10 text-sm leading-6 text-slate-600">
          <h2 className="font-serif text-2xl font-semibold text-slate-950">Evidence grades are usage controls</h2>
          <p className="mt-3 max-w-3xl">A is a clean official diff match verified within 365 days. B is previously A but stale. C is a lawful baseline awaiting official verification. D and F remain discoverable, rank last, and carry conspicuous suspected-issue or confirmed-defect warnings.</p>
        </section>

        <section className="border-t border-slate-300 py-10 text-sm leading-6 text-slate-600" aria-labelledby="developer-heading">
          <h2 id="developer-heading" className="font-serif text-2xl font-semibold text-slate-950">One contract, three interfaces</h2>
          <p className="mt-3 max-w-3xl">The research website, read-only HTTP API, and remote MCP server expose the same canonical authority, immutable version, verification grade and reason, proof bundle, defect warning, and citation-resolution semantics.</p>
          <div className="mt-5 flex flex-wrap gap-4">
            <a className="font-semibold text-slate-900 underline underline-offset-4" href={apiBaseUrl ? `${apiBaseUrl}/v1/manifest` : "/corpus/api/v1/manifest.json"}>{apiBaseUrl ? "Live HTTP API" : "Reviewed static API fixture"}</a>
            {mcpUrl ? <a className="font-semibold text-slate-900 underline underline-offset-4" href={mcpUrl}>Remote MCP server</a> : <span>Remote MCP endpoint is not configured for this build.</span>}
          </div>
        </section>
      </div>
    </div>
  );
}

function gradeLabelsFallback(grade: string): string {
  if (grade === "A") return "Officially verified.";
  if (grade === "B") return "Usable with caution.";
  return "See verification footer.";
}
