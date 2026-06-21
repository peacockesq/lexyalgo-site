#!/usr/bin/env node

import { copyFile, mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const qdroRoutes = ['qdro', 'products/qdro']

function fail(message, details = {}) {
  console.error(JSON.stringify({ ok: false, error: message, ...details }, null, 2))
  process.exit(1)
}

for (const route of qdroRoutes) {
  const source = path.join(repoRoot, 'out', `${route}.html`)
  const destinationDir = path.join(repoRoot, 'out', route)
  const destination = path.join(destinationDir, 'index.html')

  try {
    await stat(source)
  } catch (error) {
    fail('Missing source HTML for QDRO static trailing-slash route repair.', {
      route,
      source,
      errorDetail: error instanceof Error ? error.message : String(error),
    })
  }

  await mkdir(destinationDir, { recursive: true })
  await copyFile(source, destination)
}

console.log(JSON.stringify({
  ok: true,
  repairedRoutes: qdroRoutes.map((route) => `/${route}/`),
}, null, 2))
