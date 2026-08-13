import type { CitationAlias, Grade } from "./contract-types";

export type LiveWarning = {
  severity: "warning" | "critical";
  grade: "D" | "F";
  message: string;
  do_not_rely_without_official_verification: true;
};

export type LiveSearchRow = {
  slug: string;
  title: string;
  citation: string | null;
  jurisdiction: string;
  body: string;
  authority_type: string;
  grade: Grade;
  reason_code: string;
  reason: string;
  source_url: string | null;
  record_id: string;
  version_id: string;
  decision_date?: string | null;
  warning?: LiveWarning | null;
  canonical_path?: string;
};

export type LiveSearchResponse = {
  contract_version: string;
  policy_version: string;
  query: string;
  grades: Grade[];
  results: LiveSearchRow[];
};

export type LiveManifest = {
  contract_version: string;
  policy_version: string;
  default_grades: Grade[];
  defective_records_discoverable: boolean;
  authority_count: number;
  data_as_of: string;
  grade_counts: Partial<Record<Grade, number>>;
  artifact_storage: string;
};

export type LiveAuthorityResponse = {
  contract_version: string;
  record: {
    record_id: string;
    jurisdiction: string;
    authority_type: string;
    body: string;
    title: string;
    citation_aliases: CitationAlias[];
  };
  version: {
    version_id: string;
    primary_text: string;
    normalized_text_sha256: string;
    decision_date?: string | null;
    status?: string;
  };
  verification: {
    version_id?: string;
    grade: Grade;
    reason_code: string;
    reason: string;
    policy_version: string;
    verified_at: string | null;
    active_defect_ids?: string[];
    limitations?: string[];
  };
  warning: LiveWarning | null;
  canonical_path?: string;
};

export type LivePathResponse = {
  contract_version: string;
  requested_path: string;
  canonical_path: string;
  redirect_required: boolean;
  authority: LiveSearchRow;
};

export type LiveProofBundle = {
  contract_version: string;
  version_id: string;
  artifacts: Array<{
    kind: string;
    object_uri: string;
    sha256: string;
    byte_length: number;
    verified_at: string;
    verification_method: string;
  }>;
  source_snapshot?: Record<string, unknown>;
};
