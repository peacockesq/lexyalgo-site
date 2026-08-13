import type { AuthorityViewModel } from "@/lib/corpus";
import { GradeBadge } from "./GradeBadge";

function formatDate(value: string | null) {
  if (!value) return "Not officially verified";
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

export function VerificationCard({ vm }: { vm: AuthorityViewModel }) {
  const { verification } = vm.response;
  return (
    <section aria-labelledby="verification-heading" className="border-y border-slate-300 bg-slate-50 px-5 py-7 sm:px-7">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Verification</p>
          <h2 id="verification-heading" className="font-serif text-2xl font-semibold text-slate-950">{vm.gradeLabel}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">{vm.gradeDescription}</p>
        </div>
        <div className="shrink-0 text-left sm:text-right">
          <GradeBadge grade={verification.grade} />
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Verified on</p>
          <p className="mt-1 text-sm font-semibold text-slate-800">{formatDate(verification.verified_at)}</p>
        </div>
      </div>
      <div className="mt-6 border-t border-slate-200 pt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Source record{vm.sourceArtifacts.length === 1 ? "" : "s"}</p>
        <ul className="mt-2 space-y-2 text-sm">
          {vm.sourceArtifacts.map((artifact, index) => (
            <li key={artifact.artifact_id} className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {artifact.canonical_url
                ? <a href={artifact.canonical_url} className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-800" target="_blank" rel="noreferrer">View source record {index + 1}</a>
                : <span className="text-slate-600">Source link {index + 1} is not yet available.</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
