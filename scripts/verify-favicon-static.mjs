#!/usr/bin/env node
import { access, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requiredFiles = [
  path.join(repoRoot, "public", "favicon.ico"),
  path.join(repoRoot, "public", "favicon.png"),
];
const exportedFavicon = path.join(repoRoot, "out", "favicon.ico");

function fail(message, details = {}) {
  console.error(JSON.stringify({ ok: false, error: message, ...details }, null, 2));
  process.exit(1);
}

async function assertIco(filePath) {
  const data = await readFile(filePath);
  if (data.length < 6) {
    fail("Favicon ICO is too small", { filePath, bytes: data.length });
  }

  const reserved = data.readUInt16LE(0);
  const type = data.readUInt16LE(2);
  const imageCount = data.readUInt16LE(4);
  if (reserved !== 0 || type !== 1 || imageCount < 1) {
    fail("Favicon is not a valid ICO container", {
      filePath,
      reserved,
      type,
      imageCount,
      headerHex: data.subarray(0, 6).toString("hex"),
    });
  }

  return { filePath: path.relative(repoRoot, filePath), bytes: data.length, imageCount };
}

const checked = [];
for (const filePath of requiredFiles) {
  try {
    const info = await stat(filePath);
    if (!info.isFile() || info.size === 0) {
      fail("Required favicon asset is missing or empty", { filePath, size: info.size });
    }
    checked.push({ filePath: path.relative(repoRoot, filePath), bytes: info.size });
  } catch (error) {
    fail("Required favicon asset is missing", { filePath, error: String(error) });
  }
}

checked.push(await assertIco(path.join(repoRoot, "public", "favicon.ico")));

try {
  await access(exportedFavicon);
  checked.push(await assertIco(exportedFavicon));
} catch {
  checked.push({ filePath: "out/favicon.ico", skipped: "run npm run build first to verify exported static asset" });
}

const liveUrls = (process.env.LEXYALGO_FAVICON_URLS || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

for (const rawUrl of liveUrls) {
  const response = await fetch(rawUrl, {
    redirect: "manual",
    headers: { "user-agent": "lexyalgo-favicon-check/1.0" },
  });
  const arrayBuffer = await response.arrayBuffer();
  if (!response.ok) {
    fail("Live favicon URL did not return a successful response", {
      url: rawUrl,
      status: response.status,
      contentType: response.headers.get("content-type") || "",
    });
  }
  checked.push({
    url: rawUrl,
    status: response.status,
    contentType: response.headers.get("content-type") || "",
    bytes: arrayBuffer.byteLength,
  });
}

console.log(JSON.stringify({ ok: true, checked }, null, 2));
