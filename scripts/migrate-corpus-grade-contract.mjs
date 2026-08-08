import { createHash } from "node:crypto";
import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = join(root, "public", "corpus");
const dataRoot = join(root, "src", "data", "corpus", "v1");
const CONTRACT = "1.0.0-draft.2";
const POLICY = "grade-policy-v2";
const GRADES = ["A", "B", "C", "D", "F"];
const rank = Object.fromEntries(GRADES.map((grade, index) => [grade, index]));

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const jsonBytes = (value) => Buffer.from(`${JSON.stringify(value, null, 2)}\n`);

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function migrateVerification(value) {
  const oldCode = value.reason_code;
  if (oldCode === "material_defect" || oldCode === "confirmed_material_defect") {
    Object.assign(value, { grade: "F", reason_code: "confirmed_material_defect", reason: "A material defect is confirmed. This rendition remains discoverable for transparency and should not be relied on.", limitations: ["Do not rely on this rendition until the defect is resolved."] });
  } else if (oldCode === "official_case_revision_sensitive" || oldCode === "revision_sensitive") {
    Object.assign(value, { grade: "D", reason_code: "revision_sensitive", reason: "Official text matched, but the rendition remains revision-sensitive.", limitations: ["A later official rendition may supersede this text."] });
  } else if (["courtlistener_public_full_text_unverified_against_official_reporter", "independent_corroboration_pending_official", "single_candidate_source", "lawful_baseline_pending_official"].includes(oldCode)) {
    Object.assign(value, { grade: "C", reason_code: "lawful_baseline_pending_official", reason: "Lawful usable public-primary-law baseline awaiting official diff verification.", verified_at: null, limitations: ["No current official diff-match receipt."] });
  } else if (["official_change_pending", "parser_recertification_pending", "identity_incomplete", "validation_failed"].includes(oldCode)) {
    Object.assign(value, { grade: "D", reason_code: "suspected_issue", reason: "A suspected issue remains unresolved.", limitations: ["Verify against the official publisher before use."] });
  } else if (oldCode === "official_final_case") {
    Object.assign(value, { grade: "A", reason_code: "official_verified_current", reason: "Official source diff matched with no unresolved defect and was verified within 365 days." });
  }
  value.schema_version = CONTRACT;
  value.policy_version = POLICY;
  const input = {
    authority_type: value.authority_type ?? "unknown",
    identity_state: "complete",
    validation_passed: !["D", "F"].includes(value.grade),
    active_verified_material_defects: value.grade === "F" ? value.active_defect_ids ?? [] : [],
    active_suspected_issues: value.grade === "D" ? [value.reason_code] : [],
    official_verification: ["A", "B"].includes(value.grade) ? { matched: true, verified_at: value.verified_at } : null,
    independent_source_classes: value.source_classes ?? [],
    as_of: value.as_of,
  };
  value.input_sha256 = sha256(canonical(input));
}

function migrate(value) {
  if (Array.isArray(value)) return value.map(migrate);
  if (!value || typeof value !== "object") return value;
  for (const [key, child] of Object.entries(value)) {
    if (key === "contract_version" && typeof child === "string") value[key] = CONTRACT;
    else if (key === "schema_version" && child === "1.0.0-draft.1") value[key] = CONTRACT;
    else if (key === "policy_version" && typeof child === "string" && child.startsWith("grade-policy")) value[key] = POLICY;
    else value[key] = migrate(child);
  }
  if (value.kind === "verification") migrateVerification(value);
  if (Array.isArray(value.default_grades)) value.default_grades = [...GRADES];
  return value;
}

function searchResult(entry) {
  const { response } = entry;
  const citation = response.record.citation_aliases?.[0]?.display_value || response.record.title || entry.slug;
  const verification = response.verification;
  return {
    slug: entry.slug, route: entry.route, api_route: entry.api_route,
    title: response.record.title || citation, citation,
    jurisdiction: response.record.jurisdiction, body: response.record.body,
    authority_type: response.record.authority_type, status: response.version.status,
    finality_status: response.version.finality_status, grade: verification.grade,
    reason_code: verification.reason_code, reason: verification.reason,
    verified_at: verification.verified_at, limitation: verification.limitations?.[0] ?? null,
    source_url: entry.proof_bundle.artifacts?.find((artifact) => artifact.canonical_url)?.canonical_url ?? null,
    snippet_label: ["D", "F"].includes(verification.grade) ? "Warning — primary text follows" : "Primary text",
    snippet: response.version.primary_text.slice(0, 260).trim(), fixture: Boolean(entry.fixture_notice),
  };
}

async function jsonFiles(folder) {
  const output = [];
  for (const item of await readdir(folder, { withFileTypes: true })) {
    const path = join(folder, item.name);
    if (item.isDirectory()) output.push(...await jsonFiles(path));
    else if (item.name.endsWith(".json")) output.push(path);
  }
  return output;
}

for (const folder of [publicRoot, dataRoot]) {
  for (const path of await jsonFiles(folder)) {
    if (path === join(publicRoot, "manifest.json")) continue;
    const value = migrate(JSON.parse(await readFile(path, "utf8")));
    await writeFile(path, jsonBytes(value));
  }
}

const bundle = migrate(JSON.parse(await readFile(join(dataRoot, "bundle.json"), "utf8")));
bundle.default_grades = [...GRADES];
bundle.entries.sort((a, b) => rank[a.response.verification.grade] - rank[b.response.verification.grade] || (a.response.record.title ?? "").localeCompare(b.response.record.title ?? ""));
bundle.search_index = bundle.entries.map(searchResult);
for (const path of [join(dataRoot, "bundle.json"), join(publicRoot, "bundle.json")]) await writeFile(path, jsonBytes(bundle));

const search = { contract_version: CONTRACT, data_as_of: bundle.data_as_of, default_grades: [...GRADES], results: bundle.search_index };
for (const path of [join(dataRoot, "search-index.json"), join(publicRoot, "api", "v1", "search-index.json")]) await writeFile(path, jsonBytes(search));

for (const entry of bundle.entries) {
  const paths = [entry.api_route, entry.mcp_route].map((route) => join(root, "public", route.replace(/^\/corpus\//, "corpus/")));
  for (const path of paths) await writeFile(path, jsonBytes(entry.response));
  const proofPaths = [entry.proof_route, entry.mcp_proof_route].map((route) => join(root, "public", route.replace(/^\/corpus\//, "corpus/")));
  for (const path of proofPaths) await writeFile(path, jsonBytes(entry.proof_bundle));
}

const manifestPath = join(publicRoot, "manifest.json");
const apiManifestPath = join(publicRoot, "api", "v1", "manifest.json");
const manifest = migrate(JSON.parse(await readFile(manifestPath, "utf8")));
manifest.contract_version = CONTRACT;
manifest.policy_version = POLICY;
manifest.default_grades = [...GRADES];
manifest.files = [];
for (const path of await jsonFiles(publicRoot)) {
  if (path === manifestPath || path === apiManifestPath) continue;
  const bytes = await readFile(path);
  manifest.files.push({ path: relative(publicRoot, path).replaceAll("\\", "/"), sha256: sha256(bytes), bytes: (await stat(path)).size });
}
manifest.files.sort((a, b) => a.path.localeCompare(b.path));
await writeFile(apiManifestPath, jsonBytes(manifest));
await writeFile(join(dataRoot, "manifest.json"), jsonBytes(manifest));
const apiManifestBytes = await readFile(apiManifestPath);
manifest.files.push({ path: "api/v1/manifest.json", sha256: sha256(apiManifestBytes), bytes: apiManifestBytes.length });
manifest.files.sort((a, b) => a.path.localeCompare(b.path));
await writeFile(manifestPath, jsonBytes(manifest));

console.log(JSON.stringify({ contract: CONTRACT, policy: POLICY, records: bundle.entries.length, grades: Object.fromEntries(GRADES.map((grade) => [grade, bundle.entries.filter((entry) => entry.response.verification.grade === grade).length])) }, null, 2));
