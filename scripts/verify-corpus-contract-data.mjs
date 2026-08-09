import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = join(root, "public", "corpus");
const bundle = JSON.parse(await readFile(join(publicRoot, "bundle.json"), "utf8"));
const search = JSON.parse(await readFile(join(publicRoot, "api", "v1", "search-index.json"), "utf8"));
const manifest = JSON.parse(await readFile(join(publicRoot, "manifest.json"), "utf8"));
const fail = (message) => { throw new Error(message); };
const rank = { A: 0, B: 1, C: 2, D: 3, F: 4 };

if (bundle.contract_version !== "1.0.0-draft.2" || bundle.policy_version !== "grade-policy-v2") fail("Contract version drift");
if (bundle.entries.length !== 39 || search.results.length !== bundle.entries.length) fail("Authority loss or search suppression");
if (search.results.some((item, index) => index && rank[search.results[index - 1].grade] > rank[item.grade])) fail("Grade rank drift");

for (const entry of bundle.entries) {
  const authorityPaths = [entry.api_route, entry.mcp_route].map((route) => join(root, "public", route.replace(/^\/corpus\//, "corpus/")));
  const proofPaths = [entry.proof_route, entry.mcp_proof_route].map((route) => join(root, "public", route.replace(/^\/corpus\//, "corpus/")));
  if (!Buffer.from(await readFile(authorityPaths[0])).equals(Buffer.from(await readFile(authorityPaths[1])))) fail(`Authority API/MCP drift: ${entry.slug}`);
  if (!Buffer.from(await readFile(proofPaths[0])).equals(Buffer.from(await readFile(proofPaths[1])))) fail(`Proof API/MCP drift: ${entry.slug}`);
  const verification = entry.response.verification;
  if (verification.policy_version !== "grade-policy-v2" || !verification.reason || !verification.reason_code) fail(`Verification semantics missing: ${entry.slug}`);
  if (["D", "F"].includes(verification.grade) && !(verification.limitations?.length)) fail(`D/F warning missing: ${entry.slug}`);
  if (!entry.response.version.primary_text) fail(`Discoverable primary text missing: ${entry.slug}`);
}

for (const item of manifest.files) {
  const bytes = await readFile(join(publicRoot, item.path));
  if (bytes.length !== item.bytes || createHash("sha256").update(bytes).digest("hex") !== item.sha256) fail(`Manifest receipt drift: ${item.path}`);
}

console.log(JSON.stringify({ ok: true, contract: bundle.contract_version, records: bundle.entries.length, searchable: search.results.length, apiMcpParity: bundle.entries.length, proofParity: bundle.entries.length }, null, 2));
