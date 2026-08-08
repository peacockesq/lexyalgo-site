import type { AuthorityResponse, CorpusEntry, Grade, ProofBundle } from "./contract-types";

export const gradeLabels: Record<Grade, string> = {
  A: "Officially verified",
  B: "Previously verified — stale",
  C: "Lawful baseline — verification pending",
  D: "Warning — suspected issue",
  F: "Warning — confirmed material defect",
};

export const gradeDescriptions: Record<Grade, string> = {
  A: "Official diff match, clean, with no unresolved defect, verified within 365 days.",
  B: "This rendition previously qualified for A, but its verification is older than 365 days.",
  C: "Lawful usable public-primary-law baseline awaiting official diff verification.",
  D: "A suspected issue or user report remains unresolved. Verify against the official publisher before use.",
  F: "A material defect is confirmed. The rendition remains discoverable for transparency but should not be relied on.",
};

export type AuthorityViewModel = {
  entry: CorpusEntry;
  response: AuthorityResponse;
  proof: ProofBundle;
  citation: string;
  title: string;
  gradeLabel: string;
  gradeDescription: string;
  verifiedLabel: string;
  statusLabel: string;
  sourceArtifacts: ProofBundle["artifacts"];
  canShowPrimaryText: boolean;
  candidateWarning: string | null;
  fixtureNotice: string | null;
};

export function buildAuthorityViewModel(entry: CorpusEntry): AuthorityViewModel {
  const { response, proof_bundle: proof } = entry;
  const grade = response.verification.grade;
  const finality = (response.version.finality_status || "unknown").replaceAll("_", " ");
  const status = (response.version.status || "unknown").replaceAll("_", " ");
  const warning = grade === "C"
    ? "Official verification pending. Confirm this lawful baseline against the official publisher before relying on it."
    : grade === "D"
      ? "Warning: a suspected issue or user report is unresolved. Do not rely on this rendition without official verification."
      : grade === "F"
        ? "Warning: a material defect is confirmed. This rendition is shown for transparency and should not be relied on."
        : null;
  return {
    entry,
    response,
    proof,
    citation: response.record.citation_aliases?.[0]?.display_value || response.record.title || "Uncited authority",
    title: response.record.title ?? response.record.heading ?? "Untitled authority",
    gradeLabel: gradeLabels[grade],
    gradeDescription: gradeDescriptions[grade],
    verifiedLabel: response.verification.verified_at ?? "Not officially verified",
    statusLabel: `${status} · ${finality}`,
    sourceArtifacts: proof.artifacts || [],
    canShowPrimaryText: true,
    candidateWarning: warning,
    fixtureNotice: entry.fixture_notice,
  };
}
