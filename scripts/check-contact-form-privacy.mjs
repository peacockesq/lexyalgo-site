import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const repoRoot = process.cwd()
const recipient = ['he', 'llo', '@', 'lexy', 'algo', '.', 'com'].join('')
const directProviderPath = ['formsubmit.co/', recipient].join('')
const checkedRoots = ['src', 'docs', '.next/server', '.next/static']
const ignoredDirs = new Set(['.git', 'node_modules', '.next/cache'])
const textExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.mjs',
  '.md',
  '.rsc',
  '.txt',
  '.ts',
  '.tsx',
])

function extensionOf(filePath) {
  const basename = filePath.split('/').pop() ?? ''
  const dotIndex = basename.lastIndexOf('.')
  return dotIndex === -1 ? '' : basename.slice(dotIndex)
}

function* walk(dir) {
  if (!existsSync(dir)) return

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name)
    const relativePath = relative(repoRoot, fullPath)

    if (entry.isDirectory()) {
      if (!ignoredDirs.has(relativePath) && !ignoredDirs.has(entry.name)) {
        yield* walk(fullPath)
      }
      continue
    }

    if (entry.isFile() && textExtensions.has(extensionOf(fullPath))) {
      yield fullPath
    }
  }
}

const failures = []
for (const root of checkedRoots) {
  for (const filePath of walk(join(repoRoot, root))) {
    const content = readFileSync(filePath, 'utf8')
    const relativePath = relative(repoRoot, filePath)

    for (const forbidden of [recipient, directProviderPath]) {
      if (content.includes(forbidden)) {
        failures.push(`${relativePath}: contains ${forbidden}`)
      }
    }
  }
}

const contactForm = readFileSync(join(repoRoot, 'src/components/ContactForm.tsx'), 'utf8')
const contactPage = readFileSync(join(repoRoot, 'src/app/contact/page.tsx'), 'utf8')
const thanksPage = readFileSync(join(repoRoot, 'src/app/contact/thanks/page.tsx'), 'utf8')

if (!contactForm.includes('fetch(contactEndpoint')) {
  failures.push('ContactForm does not submit through the AJAX endpoint fetch path')
}

if (!contactForm.includes("role=\"alert\"")) {
  failures.push('ContactForm does not expose an accessible visible failure alert')
}

if (!contactPage.includes('<ContactForm />')) {
  failures.push('Contact page is not using the client ContactForm component')
}

if (thanksPage.includes(recipient)) {
  failures.push('Thank-you page still exposes the destination mailbox')
}

const buildStaticDir = join(repoRoot, '.next/static')
if (existsSync(buildStaticDir) && statSync(buildStaticDir).isDirectory()) {
  console.log('Checked built static output for contact recipient leaks.')
} else {
  console.log('Build output not present; checked source and docs only.')
}

if (failures.length > 0) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log('Contact form privacy checks passed.')
