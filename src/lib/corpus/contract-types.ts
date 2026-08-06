export type Grade = "A" | "B" | "C" | "D" | "F";

export type CitationAlias = {
  scheme: string;
  normalized_value: string;
  display_value: string;
  source_id: string;
  confidence: number;
};

export type AuthorityRecord = {
  schema_version: string;
  kind: "authority_record";
  record_id: string;
  jurisdiction: string;
  authority_type: "statute" | "opinion" | string;
  body: string;
  canonical_key: Record<string, string>;
  identity_state: string;
  citation_aliases: CitationAlias[];
  title: string | null;
  heading: string | null;
  created_at: string;
};

export type AuthorityVersion = {
  schema_version: string;
  kind: "authority_version";
  version_id: string;
  record_id: string;
  primary_text: string;
  normalized_text_sha256: string;
  structure_sha256: string;
  status: string;
  source_locators: Array<{ artifact_id: string; locator: string; quote_sha256: string }>;
  text_scope: { excludes: string[] };
  publication_date: string | null;
  decision_date: string | null;
  effective_date: string | null;
  current_through: string | null;
  finality_status: string;
  publication_status: string;
  observed_at: string;
  parser_id: string;
  parser_version: string;
  normalization_warnings: string[];
};

export type Verification = {
  schema_version: string;
  kind: "verification";
  version_id: string;
  grade: Grade;
  reason_code: string;
  reason: string;
  policy_version: string;
  verified_at: string | null;
  computed_at: string;
  as_of: string;
  input_sha256: string;
  currentness: string | null;
  source_classes: string[];
  official_receipts: Array<{ artifact_id: string; locator: string; quote_sha256: string }>;
  active_defect_ids: string[];
  limitations: string[];
};

export type AuthorityResponse = {
  contract_version: string;
  data_as_of: string;
  record: AuthorityRecord;
  version: AuthorityVersion;
  verification: Verification;
};

export type RawArtifact = {
  artifact_id: string;
  source_id: string;
  canonical_url: string | null;
  final_url: string;
  retrieved_at: string;
  retrieval_method: string;
  mime_type: string;
  byte_length: number;
  raw_sha256: string;
  privacy_class: string;
};

export type Defect = {
  defect_id: string;
  classification: string;
  material: boolean;
  verified: boolean;
  status: string;
  description?: string;
  correction: string | null;
  opened_at: string;
};

export type ProofBundle = {
  schema_version: string;
  kind: "proof_bundle";
  contract_version: string;
  record: AuthorityRecord;
  version: AuthorityVersion;
  verification: Verification;
  artifacts: RawArtifact[];
  reconciliations: unknown[];
  defects: Defect[];
  graph_edges: unknown[];
  data_as_of: string;
};

export type SearchResult = {
  slug: string;
  route: string;
  api_route: string;
  title: string;
  citation: string;
  jurisdiction: string;
  body: string;
  authority_type: string;
  status: string;
  finality_status: string;
  grade: Grade;
  reason_code: string;
  reason: string;
  verified_at: string | null;
  limitation: string | null;
  source_url: string | null;
  snippet_label: string;
  snippet: string;
  fixture: boolean;
};

export type CorpusEntry = {
  slug: string;
  route: string;
  api_route: string;
  proof_route: string;
  mcp_route: string;
  mcp_proof_route: string;
  fixture_notice: string | null;
  response: AuthorityResponse;
  proof_bundle: ProofBundle;
};

export type CorpusBundle = {
  contract_version: string;
  policy_version: string;
  data_as_of: string;
  default_grades: Grade[];
  entries: CorpusEntry[];
  search_index: SearchResult[];
};
