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
  qdro: "https://doc.lexyalgo.com/interview?i=docassemble.LexyAlgo:data/questions/qdro_router.yml",
};
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

  for (const [key, pathname] of Object.entries(livePaths)) {
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
