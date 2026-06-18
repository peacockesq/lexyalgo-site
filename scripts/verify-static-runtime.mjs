#!/usr/bin/env node
import dns from "node:dns/promises";

const DEFAULT_URLS = [
  "https://lexyalgo.com/",
  "https://www.lexyalgo.com/",
  "https://staging.lexyalgo.com/",
  "https://lexyalgo.com/products/asset-divider",
  "https://staging.lexyalgo.com/products/asset-divider",
];

const urls = (process.env.LEXYALGO_RUNTIME_URLS || process.argv.slice(2).join(",") || DEFAULT_URLS.join(","))
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const expectedTextByPath = new Map([
  ["/", ["LexyAlgo", "Divorce Tools"]],
  ["/products/asset-divider", ["Asset Divider"]],
]);

async function resolveHost(hostname) {
  try {
    const records = await dns.lookup(hostname, { all: true, family: 4 });
    return records.map((record) => record.address).sort();
  } catch (error) {
    return [`DNS_ERROR:${error.message}`];
  }
}

async function verifyUrl(rawUrl) {
  const url = new URL(rawUrl);
  const addresses = await resolveHost(url.hostname);
  const response = await fetch(url, { redirect: "manual" });
  const body = await response.text();
  const requiredText = expectedTextByPath.get(url.pathname.endsWith("/") && url.pathname !== "/" ? url.pathname.slice(0, -1) : url.pathname) || ["LexyAlgo"];
  const missingText = requiredText.filter((needle) => !body.includes(needle));

  return {
    url: url.toString(),
    dnsA: addresses,
    status: response.status,
    server: response.headers.get("server") || "",
    contentLength: Number(response.headers.get("content-length") || body.length),
    requiredText,
    missingText,
    ok: response.status === 200 && missingText.length === 0,
  };
}

const results = [];
let failed = false;

for (const url of urls) {
  try {
    const result = await verifyUrl(url);
    results.push(result);
    if (!result.ok) failed = true;
  } catch (error) {
    failed = true;
    results.push({ url, ok: false, error: error instanceof Error ? error.message : String(error) });
  }
}

console.log(JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2));

if (failed) {
  process.exitCode = 1;
}
