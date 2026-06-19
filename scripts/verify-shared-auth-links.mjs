#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sharedAuthPath = path.join(repoRoot, "src/lib/shared-auth-links.ts");

const EXPECTED_ATLAS_LOGIN_ORIGIN = "https://atlas.lexyalgo.com";
const EXPECTED_ATLAS_LOGIN_PATH = "/login";
const EXPECTED_CALLBACKS = {
  divorceAlpha: "https://app.lexyalgo.com",
  estatePlanning: "https://doc.lexyalgo.com/interview?i=docassemble.LexyAlgo:data/questions/estate_planning.yml",
  qdro: "https://doc-v2.lexyalgo.com/interview?i=docassemble.LexyAlgoQDROV2:data/questions/qdro_v2_router.yml",
};
const FORBIDDEN_QDRO_CALLBACKS = [
  "https://doc.lexyalgo.com/interview?i=docassemble.LexyAlgo:data/questions/qdro_router.yml",
  "docassemble.LexyAlgo:data/questions/qdro_router.yml",
];
const PRODUCT_PAGES = {
  divorceAlpha: "src/app/products/divorce/page.tsx",
  estatePlanning: "src/app/products/estate-planning/page.tsx",
  qdro: "src/app/products/qdro/page.tsx",
};

function fail(message, details = {}) {
  console.error(JSON.stringify({ ok: false, error: message, ...details }, null, 2));
  process.exit(1);
}

function assertAtlasLoginUrl(label, href, expectedCallback) {
  let url;
  try {
    url = new URL(href);
  } catch (error) {
    fail(`${label} is not a valid URL`, { href, error: String(error) });
  }

  if (url.origin !== EXPECTED_ATLAS_LOGIN_ORIGIN || url.pathname !== EXPECTED_ATLAS_LOGIN_PATH) {
    fail(`${label} must point at Atlas login`, { href, origin: url.origin, pathname: url.pathname });
  }

  const callbackUrl = url.searchParams.get("callbackUrl");
  if (callbackUrl !== expectedCallback) {
    fail(`${label} callbackUrl mismatch`, { href, expectedCallback, actualCallback: callbackUrl });
  }
}

function extractHrefFromLine(source, key) {
  const linePattern = new RegExp(`${key}:\\s*atlasLoginUrl\\(([^)]+)\\)`);
  const match = source.match(linePattern);
  if (!match) {
    fail(`Missing sharedAuthLinks.${key}`);
  }
  return match[1].trim();
}

function literalValue(source, expression) {
  const raw = expression.trim();
  if ((raw.startsWith("'") && raw.endsWith("'")) || (raw.startsWith('"') && raw.endsWith('"'))) {
    return raw.slice(1, -1);
  }

  const interviewMatch = raw.match(/^docassembleInterviews\.([A-Za-z0-9_]+)$/);
  if (!interviewMatch) {
    fail(`Unsupported callback expression in shared auth link`, { expression: raw });
  }

  const interviewKey = interviewMatch[1];
  const interviewDirectPattern = new RegExp(`${interviewKey}:\\s*([A-Z0-9_]+)`);
  const interviewDirectMatch = source.match(interviewDirectPattern);
  if (interviewDirectMatch) {
    const constName = interviewDirectMatch[1];
    const constMatch = source.match(new RegExp(`const\\s+${constName}\\s*=\\s*['\"]([^'\"]+)['\"]`));
    if (!constMatch) {
      fail(`Missing ${constName} constant for docassembleInterviews.${interviewKey}`);
    }
    return constMatch[1];
  }

  const literalInterviewPattern = new RegExp(`${interviewKey}:\\s*['\"]([^'\"]+)['\"]`);
  const literalInterviewMatch = source.match(literalInterviewPattern);
  if (literalInterviewMatch) {
    return literalInterviewMatch[1];
  }

  const interviewPattern = new RegExp(`${interviewKey}:\\s*` + "`\\$\\{DOCASSEMBLE_ORIGIN\\}([^`]+)`");
  const interviewValueMatch = source.match(interviewPattern);
  if (!interviewValueMatch) {
    fail(`Missing docassembleInterviews.${interviewKey}`);
  }

  return `https://doc.lexyalgo.com${interviewValueMatch[1]}`;
}

async function assertProductPageUsesSharedLink(key, pagePath) {
  const source = await readFile(path.join(repoRoot, pagePath), "utf8");
  if (!source.includes("sharedAuthLinks")) {
    fail(`${pagePath} must import sharedAuthLinks`);
  }
  if (source.includes("https://atlas.lexyalgo.com/login") || source.includes("https://doc.lexyalgo.com/interview")) {
    fail(`${pagePath} must not hard-code Atlas/Docassemble auth destinations`);
  }

  const member = key === "divorceAlpha" ? "divorceAlpha" : key;
  if (!source.includes(`sharedAuthLinks.${member}`)) {
    fail(`${pagePath} must use sharedAuthLinks.${member}`);
  }

  if (key === "qdro") {
    if (source.includes("doc.lexyalgo.com")) {
      fail(`${pagePath} must not advertise the legacy Docassemble host in visible copy`);
    }
    for (const forbiddenCallback of FORBIDDEN_QDRO_CALLBACKS) {
      if (source.includes(forbiddenCallback)) {
        fail(`${pagePath} must not contain the legacy QDRO V1 callback`, { forbiddenCallback });
      }
    }
  }
}

async function verifyLivePages(baseUrl) {
  const source = await readFile(sharedAuthPath, "utf8");
  for (const [key, expectedCallback] of Object.entries(EXPECTED_CALLBACKS)) {
    const expression = extractHrefFromLine(source, key);
    const actualCallback = literalValue(source, expression);
    const expectedHref = new URL(EXPECTED_ATLAS_LOGIN_PATH, EXPECTED_ATLAS_LOGIN_ORIGIN);
    expectedHref.searchParams.set("callbackUrl", actualCallback);
    assertAtlasLoginUrl(key, expectedHref.toString(), expectedCallback);
  }

  const livePaths = {
    divorceAlpha: "/products/divorce",
    estatePlanning: "/products/estate-planning",
    qdro: "/products/qdro",
  };

  const requestedLiveKeys = (process.env.LEXYSITE_CHECK_PRODUCTS || Object.keys(livePaths).join(","))
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  for (const key of requestedLiveKeys) {
    const pathname = livePaths[key];
    if (!pathname) {
      fail(`Unknown live product key`, { key, allowed: Object.keys(livePaths) });
    }
    const response = await fetch(new URL(pathname, baseUrl), {
      headers: { "user-agent": "lexyalgo-shared-auth-link-check/1.0" },
    });
    const html = await response.text();
    if (!response.ok) {
      fail(`Live page did not load`, { key, status: response.status, pathname });
    }

    const expectedHref = new URL(EXPECTED_ATLAS_LOGIN_PATH, EXPECTED_ATLAS_LOGIN_ORIGIN);
    expectedHref.searchParams.set("callbackUrl", EXPECTED_CALLBACKS[key]);
    const encodedHref = expectedHref.toString().replaceAll("&", "&amp;");
    if (!html.includes(expectedHref.toString()) && !html.includes(encodedHref)) {
      fail(`Live page missing expected shared-auth CTA`, {
        key,
        pathname,
        expectedHref: expectedHref.toString(),
      });
    }
  }
}

async function main() {
  const source = await readFile(sharedAuthPath, "utf8");
  for (const forbiddenCallback of FORBIDDEN_QDRO_CALLBACKS) {
    if (source.includes(forbiddenCallback)) {
      fail(`Shared auth source must not contain the legacy QDRO V1 callback`, { forbiddenCallback });
    }
  }

  for (const [key, expectedCallback] of Object.entries(EXPECTED_CALLBACKS)) {
    const expression = extractHrefFromLine(source, key);
    const callbackUrl = literalValue(source, expression);
    if (callbackUrl !== expectedCallback) {
      fail(`Source callback mismatch for ${key}`, { expectedCallback, actualCallback: callbackUrl });
    }
    const href = new URL(EXPECTED_ATLAS_LOGIN_PATH, EXPECTED_ATLAS_LOGIN_ORIGIN);
    href.searchParams.set("callbackUrl", callbackUrl);
    assertAtlasLoginUrl(key, href.toString(), expectedCallback);
    await assertProductPageUsesSharedLink(key, PRODUCT_PAGES[key]);
  }

  const liveBaseUrl = process.env.LEXYSITE_CHECK_BASE_URL?.trim();
  if (liveBaseUrl) {
    await verifyLivePages(liveBaseUrl);
  }

  console.log(JSON.stringify({
    ok: true,
    checked: Object.keys(EXPECTED_CALLBACKS),
    liveBaseUrl: liveBaseUrl || null,
  }, null, 2));
}

main().catch((error) => fail("Unhandled verifier error", { error: String(error?.stack || error) }));
