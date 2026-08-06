export function authorityRoute(jurisdiction: string, authorityType: string, slug: string): string {
  return `/corpus/authority/${encodeURIComponent(jurisdiction)}/${encodeURIComponent(authorityType)}/${encodeURIComponent(slug)}/`;
}

export function authorityApiRoute(slug: string): string {
  return `/corpus/api/v1/authorities/${encodeURIComponent(slug)}.json`;
}

export function fsSafeId(value: string): string {
  return value.replace(/["<>:|?*\r\n]/g, "__");
}

export function proofApiRoute(versionId: string): string {
  return `/corpus/api/v1/proof-bundles/${encodeURIComponent(fsSafeId(versionId))}.json`;
}
