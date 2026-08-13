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
  category?: "judicial" | "statutory" | "constitutional" | "administrative" | string;
  issuing_body?: string | null;
  grade: Grade;
  reason_code: string;
  reason: string;
  source_url: string | null;
  record_id: string;
  version_id: string;
  decision_date?: string | null;
  warning?: LiveWarning | null;
  canonical_path?: string;
  match?: {
    field?: string | null;
    snippet?: string | null;
    passage_locator?: string | null;
  } | null;
  snippet?: string | null;
  match_field?: string | null;
  passage_locator?: string | null;
};

export type LiveSearchResponse = {
  contract_version: string;
  policy_version: string;
  query: string;
  grades: Grade[];
  results: LiveSearchRow[];
  page?: number;
  page_size?: number;
  total?: number;
  total_is_exact?: boolean;
  total_pages?: number;
  pages?: number;
  has_previous?: boolean;
  has_next?: boolean;
  next_page?: number | null;
  previous_page?: number | null;
  facets?: Record<string, Array<{ value: string; count: number }> | Record<string, number>>;
  facets_are_exact?: boolean;
  facet_count_unit?: "authorities" | "indexed_passages" | string;
  search_scope?: "full_text" | "title_and_citation_only" | string;
  search_mode?: "full_text" | "hybrid" | "metadata" | string;
  semantic_search?: "enabled" | "disabled" | "unavailable" | string;
  degraded_reason?: string | null;
  search_available?: boolean;
  limitation?: string | null;
};

export type AuthorityStructure = {
  collection?: string | null;
  code_name?: string | null;
  title_number?: string | null;
  title_name?: string | null;
  chapter?: string | null;
  chapter_name?: string | null;
  section_number?: string | null;
  breadcrumb?: string[] | string | null;
  display_path?: string | null;
};

export type AuthorityParagraph = {
  id?: string | null;
  ordinal?: number | null;
  label?: string | null;
  text: string;
  pinpoint?: string | null;
  page?: string | number | null;
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
    category?: "judicial" | "statutory" | "constitutional" | "administrative" | string;
    body: string;
    issuing_body?: string | null;
    structure?: AuthorityStructure | null;
    title: string;
    citation_aliases: CitationAlias[];
  };
  version: {
    version_id: string;
    primary_text: string;
    normalized_text_sha256: string;
    decision_date?: string | null;
    publication_date?: string | null;
    effective_date?: string | null;
    current_through?: string | null;
    paragraphs?: AuthorityParagraph[] | null;
    structure?: AuthorityStructure | null;
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
