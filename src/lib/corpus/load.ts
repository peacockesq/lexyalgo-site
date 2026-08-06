import bundleJson from "@/data/corpus/v1/bundle.json";
import type { AuthorityResponse, CorpusBundle, CorpusEntry, ProofBundle, SearchResult } from "./contract-types";

const bundle = bundleJson as unknown as CorpusBundle;

export function getCorpusBundle(): CorpusBundle {
  return bundle;
}

export function listCorpusEntries(): CorpusEntry[] {
  return bundle.entries;
}

export function listSearchResults(): SearchResult[] {
  const fromBundle = bundle.search_index;
  if (Array.isArray(fromBundle) && fromBundle.length > 0) {
    return fromBundle as SearchResult[];
  }
  return bundle.entries
    .filter((entry) => {
      const grade = entry.response.verification.grade;
      return grade === "A" || grade === "B";
    })
    .map((entry) => {
      const rec = entry.response.record;
      const citation = rec.citation_aliases?.[0]?.display_value || rec.title || entry.slug;
      return {
        slug: entry.slug,
        route: entry.route,
        api_route: entry.api_route,
        title: rec.title || citation,
        citation,
        jurisdiction: rec.jurisdiction,
        authority_type: rec.authority_type,
        grade: entry.response.verification.grade,
        status: entry.response.version.status || "current",
        finality_status: entry.response.version.finality_status || "unknown",
        body: rec.body || rec.heading || "",
        snippet: (entry.response.version.primary_text || "").slice(0, 280),
        snippet_label: "Primary text excerpt",
        reason_code: entry.response.verification.reason_code,
        reason: entry.response.verification.reason || entry.response.verification.reason_code,
        verified_at: entry.response.verification.verified_at,
        limitation: entry.response.verification.limitations?.[0] || null,
        source_url: entry.proof_bundle.artifacts?.[0]?.canonical_url || null,
        fixture: Boolean(entry.fixture_notice),
      };
    });
}

export function loadAuthority(slug: string): AuthorityResponse | null {
  return bundle.entries.find((entry) => entry.slug === slug)?.response ?? null;
}

export function loadAuthorityEntry(slug: string): CorpusEntry | null {
  return bundle.entries.find((entry) => entry.slug === slug) ?? null;
}

export function loadProofBundle(versionId: string): ProofBundle | null {
  return bundle.entries.find((entry) => entry.response.version.version_id === versionId)?.proof_bundle ?? null;
}
