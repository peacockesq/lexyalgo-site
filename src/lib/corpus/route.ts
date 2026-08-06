export function authorityRoute(jurisdiction: string, authorityType: string, slug: string): string {
  return `/corpus/authority/${encodeURIComponent(jurisdiction)}/${encodeURIComponent(authorityType)}/${encodeURIComponent(slug)}/`;
}

export function authorityApiRoute(slug: string): string {
  return `/corpus/api/v1/authorities/${encodeURIComponent(slug)}.json`;
}

export function proofApiRoute(versionId: string): string {
  return `/corpus/api/v1/proof-bundles/${encodeURIComponent(versionId)}.json`;
}
