import type { AuthorityViewModel } from "@/lib/corpus";
import { GradeBadge } from "./GradeBadge";

export function AuthorityHero({ vm }: { vm: AuthorityViewModel }) {
  const { response } = vm;
  const severeWarning = response.verification.grade === "D" || response.verification.grade === "F";
  return (
    <header className="border-b border-slate-200 pb-10">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <GradeBadge grade={response.verification.grade} />
        <span className="text-sm font-medium capitalize text-slate-600">{response.record.authority_type}</span>
        <span className="text-sm text-slate-400" aria-hidden="true">•</span>
        <span className="text-sm text-slate-600">{response.record.jurisdiction}</span>
      </div>
      <h1 className="max-w-4xl text-pretty font-serif text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
        {vm.title}
      </h1>
      <p className="mt-5 font-mono text-base font-semibold text-slate-700">{vm.citation}</p>
      <dl className="mt-5 grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
        <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Issuing body</dt><dd className="mt-1 font-semibold">{response.record.issuing_body || response.record.body || "Not reported"}</dd></div>
        <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Relevant date</dt><dd className="mt-1 font-semibold">{response.version.decision_date || response.version.effective_date || response.version.publication_date || "Not reported"}</dd></div>
      </dl>
      {vm.fixtureNotice && (
        <p className="mt-6 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-950">
          {vm.fixtureNotice}
        </p>
      )}
      {vm.candidateWarning && (
        <p className={`mt-6 border-l-4 px-4 py-3 text-sm font-semibold ${severeWarning ? "border-red-700 bg-red-50 text-red-950" : "border-amber-500 bg-amber-50 text-amber-950"}`}>
          {vm.candidateWarning}
        </p>
      )}
    </header>
  );
}
