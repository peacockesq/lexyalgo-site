import { access, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = join(root, "public", "corpus");
const outputRoot = join(root, "out", "corpus");
const bundle = JSON.parse(await readFile(join(publicRoot, "bundle.json"), "utf8"));
const manifest = JSON.parse(await readFile(join(publicRoot, "api", "v1", "manifest.json"), "utf8"));
const search = JSON.parse(await readFile(join(publicRoot, "api", "v1", "search-index.json"), "utf8"));

const fail = (message) => { throw new Error(message); };
const entries = bundle.entries;
if (entries.length < 6) fail(`Expected at least six vertical-slice records, found ${entries.length}`);
const grades = new Set(entries.map((entry) => entry.response.verification.grade));
for (const g of ["A", "B", "C", "D", "F"]) {
  if (!grades.has(g)) fail(`Missing grade ${g} coverage`);
}
if (search.results.some((result) => ["C", "D", "F"].includes(result.grade))) fail("Default search leaked candidate or suppressed records");
if (manifest.contract_version !== "1.0.0-draft.1") fail("Contract version drifted");

for (const entry of entries) {
  const slug = entry.slug;
  const versionId = entry.response.version.version_id;
  const authorityApi = join(publicRoot, "api", "v1", "authorities", `${slug}.json`);
  const authorityMcp = join(publicRoot, "mcp", "v1", "corpus_get_authority", `${slug}.json`);
  const safeVersionId = versionId.replace(/["<>:|?*\r\n]/g, "__");
  const proofApi = join(publicRoot, "api", "v1", "proof-bundles", `${safeVersionId}.json`);
  const proofMcp = join(publicRoot, "mcp", "v1", "corpus_get_proof_bundle", `${safeVersionId}.json`);
  if (!Buffer.from(await readFile(authorityApi)).equals(Buffer.from(await readFile(authorityMcp)))) fail(`Authority API/MCP drift for ${slug}`);
  if (!Buffer.from(await readFile(proofApi)).equals(Buffer.from(await readFile(proofMcp)))) fail(`Proof API/MCP drift for ${slug}`);

  const route = entry.route.replace(/^\/corpus\//, "").replace(/\/$/, "");
  const htmlPath = join(outputRoot, route, "index.html");
  await access(htmlPath);
  const html = await readFile(htmlPath, "utf8");
  if (!html.includes('id="verification"')) fail(`Missing verification footer for ${slug}`);
  if (!html.includes(entry.response.version.normalized_text_sha256)) fail(`Missing full normalized hash for ${slug}`);
  if (!html.includes(entry.response.verification.reason_code)) fail(`Missing verification reason code for ${slug}`);
  if (entry.response.verification.grade === "F") {
    if (!html.includes("Primary text suppressed")) fail(`F record not suppressed for ${slug}`);
    if (html.includes(entry.response.version.primary_text)) fail(`F primary text leaked for ${slug}`);
  } else if (!html.includes("Primary text")) {
    fail(`Primary text heading missing for ${slug}`);
  }
}

const brown = entries.find((entry) => entry.slug === "brown-v-board-347-us-483");
if (!brown) fail("Brown record missing");
const brownText = brown.response.version.primary_text;
if (!brownText.includes("In each instance, they had been denied admission")) fail("Brown opinion reading order is broken");
if (brownText.includes("sion to white") || brownText.includes("Ple88y")) fail("Brown OCR column artifacts remain");
if (brown.proof_bundle.artifacts.length !== 2) fail("Brown must retain NARA transcript and U.S. Reports PDF proof");

console.log(JSON.stringify({
  ok: true,
  contract: bundle.contract_version,
  records: entries.length,
  grades: [...new Set(entries.map((entry) => entry.response.verification.grade))].sort(),
  authorityParity: entries.length,
  proofParity: entries.length,
  brownReadingOrder: "verified",
}, null, 2));
