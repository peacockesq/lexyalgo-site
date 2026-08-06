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
  return bundle.search_index;
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
