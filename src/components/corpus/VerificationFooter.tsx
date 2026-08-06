import type { AuthorityViewModel } from "@/lib/corpus";
import { GradeBadge } from "./GradeBadge";

export function VerificationFooter({ vm }: { vm: AuthorityViewModel }) {
  const { response, proof } = vm;
  return (
    <footer id="verification" className="scroll-mt-24 border-t-4 border-slate-900 bg-slate-100 px-5 py-10 sm:px-8" aria-labelledby="verification-footer-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Verification footer</p>
          <h2 id="verification-footer-heading" className="mt-2 font-serif text-2xl font-semibold text-slate-950">Source and integrity record</h2>
        </div>
        <GradeBadge grade={response.verification.grade} />
      </div>

      <dl className="mt-8 grid gap-x-8 gap-y-6 text-sm sm:grid-cols-2">
        <div><dt className="font-semibold text-slate-500">Contract</dt><dd className="mt-1 font-mono text-xs text-slate-900">{response.contract_version}</dd></div>
        <div><dt className="font-semibold text-slate-500">Data as of</dt><dd className="mt-1 text-slate-900">{response.data_as_of}</dd></div>
        <div><dt className="font-semibold text-slate-500">Version</dt><dd className="mt-1 break-all font-mono text-xs text-slate-900">{response.version.version_id}</dd></div>
        <div><dt className="font-semibold text-slate-500">Reason code</dt><dd className="mt-1 font-mono text-xs text-slate-900">{response.verification.reason_code}</dd></div>
      </dl>

      <div className="mt-8 border-t border-slate-300 pt-6">
        <h3 className="font-semibold text-slate-950">Official source links</h3>
        <ul className="mt-3 space-y-2 text-sm">
          {proof.artifacts.map((artifact) => (
            <li key={artifact.artifact_id}>
              {artifact.canonical_url ? <a className="font-semibold text-slate-900 underline decoration-slate-400 underline-offset-4 hover:decoration-slate-900" href={artifact.canonical_url} target="_blank" rel="noreferrer">{artifact.source_id}</a> : <span>{artifact.source_id}</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 border-t border-slate-300 pt-6">
        <h3 className="font-semibold text-slate-950">Integrity hashes</h3>
        <dl className="mt-3 space-y-4 text-xs">
          <div><dt className="font-semibold text-slate-600">Normalized text SHA-256</dt><dd><code className="mt-1 block break-all rounded bg-white p-3 text-slate-900">{response.version.normalized_text_sha256}</code></dd></div>
          <div><dt className="font-semibold text-slate-600">Structure SHA-256</dt><dd><code className="mt-1 block break-all rounded bg-white p-3 text-slate-900">{response.version.structure_sha256}</code></dd></div>
          {proof.artifacts.map((artifact) => <div key={artifact.artifact_id}><dt className="font-semibold text-slate-600">Raw artifact SHA-256 · {artifact.source_id}</dt><dd><code className="mt-1 block break-all rounded bg-white p-3 text-slate-900">{artifact.raw_sha256}</code></dd></div>)}
        </dl>
      </div>

      {response.version.normalization_warnings.length > 0 && (
        <div className="mt-8 border-t border-slate-300 pt-6 text-sm leading-6 text-slate-700">
          <h3 className="font-semibold text-slate-950">Normalization notes</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5">{response.version.normalization_warnings.map((note) => <li key={note}>{note}</li>)}</ul>
        </div>
      )}
    </footer>
  );
}
