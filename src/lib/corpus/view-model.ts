import type { AuthorityResponse, CorpusEntry, Grade, ProofBundle } from "./contract-types";

export const gradeLabels: Record<Grade, string> = {
  A: "Officially verified",
  B: "Usable with caution",
  C: "Candidate — independently corroborated",
  D: "Candidate — single source",
  F: "Suppressed — material defect",
};

export const gradeDescriptions: Record<Grade, string> = {
  A: "Matched to an official publisher under the current verification policy.",
  B: "Usable only with the displayed finality or currentness limitation.",
  C: "Two independent candidate sources agree, but no official comparison is recorded.",
  D: "Only one candidate source is recorded. Verify against an official publisher before use.",
  F: "A verified material defect is open. The primary text is suppressed.",
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
  const finality = response.version.finality_status.replaceAll("_", " ");
  return {
    entry,
    response,
    proof,
    citation: response.record.citation_aliases[0]?.display_value ?? "Uncited authority",
    title: response.record.title ?? response.record.heading ?? "Untitled authority",
    gradeLabel: gradeLabels[grade],
    gradeDescription: gradeDescriptions[grade],
    verifiedLabel: response.verification.verified_at ?? "Not officially verified",
    statusLabel: `${response.version.status.replaceAll("_", " ")} · ${finality}`,
    sourceArtifacts: proof.artifacts,
    canShowPrimaryText: grade !== "F",
    candidateWarning: grade === "C" || grade === "D"
      ? "Candidate authority. Confirm the text against an official publisher before relying on it."
      : null,
    fixtureNotice: entry.fixture_notice,
  };
}
