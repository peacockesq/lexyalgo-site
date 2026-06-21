#!/usr/bin/env node

import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const expectedCanonical = 'https://www.lexyalgo.com/products/qdro'
const expectedCallback = 'https://doc-v2.lexyalgo.com/interview?i=docassemble.LexyAlgoQDROV2:data/questions/qdro_v2_router.yml'
const expectedAtlasHref = new URL('/login', 'https://atlas.lexyalgo.com')
expectedAtlasHref.searchParams.set('callbackUrl', expectedCallback)

function fail(message, details = {}) {
  console.error(JSON.stringify({ ok: false, error: message, ...details }, null, 2))
  process.exit(1)
}

async function readOutHtml(routePath) {
  const normalizedRoute = routePath.replace(/^\//, '').replace(/\/$/, '')
  const htmlPath = routePath.endsWith('/')
    ? path.join(repoRoot, 'out', normalizedRoute, 'index.html')
    : path.join(repoRoot, 'out', `${normalizedRoute}.html`)
  try {
    await stat(htmlPath)
  } catch (error) {
    fail('Missing exported route HTML. Run npm run build before this verifier.', {
      routePath,
      htmlPath,
      errorDetail: error instanceof Error ? error.message : String(error),
    })
  }
  return { htmlPath, html: await readFile(htmlPath, 'utf8') }
}

function assertIncludes(html, needle, label, htmlPath) {
  if (!html.includes(needle)) {
    fail(`Exported ${label} is missing expected content`, { htmlPath, needle })
  }
}

const aliasSourcePath = path.join(repoRoot, 'src/app/qdro/page.tsx')
const aliasSource = await readFile(aliasSourcePath, 'utf8')
if (!aliasSource.includes("../products/qdro/page") || !aliasSource.includes('qdroMetadata')) {
  fail('Public /qdro alias must reuse the canonical /products/qdro page and metadata', { aliasSourcePath })
}

const canonicalPageSource = await readFile(path.join(repoRoot, 'src/app/products/qdro/page.tsx'), 'utf8')
if (!canonicalPageSource.includes(`canonical: '${expectedCanonical}'`)) {
  fail('Canonical QDRO page metadata must publish the canonical /products/qdro URL', {
    expectedCanonical,
  })
}

const checkedRoutes = {
  alias: await readOutHtml('/qdro'),
  aliasTrailingSlash: await readOutHtml('/qdro/'),
  canonical: await readOutHtml('/products/qdro'),
  canonicalTrailingSlash: await readOutHtml('/products/qdro/'),
}
const encodedHref = expectedAtlasHref.toString().replaceAll('&', '&amp;')

for (const [label, artifact] of Object.entries(checkedRoutes)) {
  assertIncludes(artifact.html, 'Generate your QDRO', label, artifact.htmlPath)
  assertIncludes(artifact.html, expectedCanonical, label, artifact.htmlPath)
  if (!artifact.html.includes(expectedAtlasHref.toString()) && !artifact.html.includes(encodedHref)) {
    fail(`Exported ${label} is missing approved Atlas -> QDRO V2 callback`, {
      htmlPath: artifact.htmlPath,
      expectedHref: expectedAtlasHref.toString(),
    })
  }
}

console.log(JSON.stringify({
  ok: true,
  checked: {
    routes: ['/qdro', '/qdro/', '/products/qdro', '/products/qdro/'],
    canonical: expectedCanonical,
    qdroCallback: expectedCallback,
    files: Object.values(checkedRoutes).map((artifact) => artifact.htmlPath),
  },
}, null, 2))
