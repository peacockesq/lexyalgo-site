import type { AuthorityViewModel } from "@/lib/corpus";
import { GradeBadge } from "./GradeBadge";

export function AuthorityHero({ vm }: { vm: AuthorityViewModel }) {
  const { response } = vm;
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
      <p className="mt-3 text-sm text-slate-600">{response.record.body} · {vm.statusLabel}</p>
      {vm.fixtureNotice && (
        <p className="mt-6 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-950">
          {vm.fixtureNotice}
        </p>
      )}
      {vm.candidateWarning && (
        <p className="mt-6 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-950">
          {vm.candidateWarning}
        </p>
      )}
    </header>
  );
}
