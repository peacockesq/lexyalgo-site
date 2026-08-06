import type { AuthorityViewModel } from "@/lib/corpus";

export function EvidenceDisclosure({ vm }: { vm: AuthorityViewModel }) {
  const { version, verification } = vm.response;
  return (
    <section aria-labelledby="evidence-heading" className="border-t border-slate-200 py-10">
      <h2 id="evidence-heading" className="font-serif text-2xl font-semibold text-slate-950">Evidence and limitations</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Inspect the source artifacts, normalization scope, and verification limitations used for this version.</p>
      <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
        <details className="group py-4">
          <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:hidden">Source artifacts <span className="float-right text-slate-400 group-open:rotate-45">+</span></summary>
          <ul className="mt-4 space-y-4 text-sm text-slate-700">
            {vm.sourceArtifacts.map((artifact) => (
              <li key={artifact.artifact_id}>
                <p className="font-semibold">{artifact.source_id}</p>
                <p className="mt-1">Retrieved {artifact.retrieved_at} · {artifact.mime_type} · {artifact.byte_length.toLocaleString("en-US")} bytes</p>
                <code className="mt-2 block break-all rounded bg-slate-100 p-2 text-xs">SHA-256 {artifact.raw_sha256}</code>
              </li>
            ))}
          </ul>
        </details>
        <details className="group py-4">
          <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:hidden">Text scope and normalization <span className="float-right text-slate-400 group-open:rotate-45">+</span></summary>
          <div className="mt-4 text-sm leading-6 text-slate-700">
            <p>Parser: <code>{version.parser_id}@{version.parser_version}</code></p>
            <p className="mt-2">Excluded: {version.text_scope.excludes.join(", ")}.</p>
            {version.normalization_warnings.length > 0 && (
              <ul className="mt-3 list-disc space-y-1 pl-5">{version.normalization_warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul>
            )}
          </div>
        </details>
        <details className="group py-4">
          <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:hidden">Verification limitations <span className="float-right text-slate-400 group-open:rotate-45">+</span></summary>
          <div className="mt-4 text-sm leading-6 text-slate-700">
            {verification.limitations.length > 0 ? (
              <ul className="list-disc space-y-1 pl-5">{verification.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}</ul>
            ) : <p>No additional limitations are recorded by the current grade policy.</p>}
          </div>
        </details>
      </div>
    </section>
  );
}
