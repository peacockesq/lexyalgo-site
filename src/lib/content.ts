import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type SeoFields = {
  title?: string
  description?: string
}

export type Post = {
  slug: string
  title: string
  date: string
  author: string
  excerpt?: string
  body: string
  seo?: SeoFields
  draft?: boolean
}

const postsDirectory = path.join(process.cwd(), 'content', 'posts')

function readMarkdownFile(filePath: string) {
  const source = fs.readFileSync(filePath, 'utf8')
  return matter(source)
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(postsDirectory, file)
      const { data, content } = readMarkdownFile(filePath)
      const slug = file.replace(/\.mdx?$/, '')

      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ''),
        author: String(data.author ?? ''),
        excerpt: data.excerpt ? String(data.excerpt) : undefined,
        body: content.trim(),
        seo: data.seo && typeof data.seo === 'object'
          ? {
              title: typeof data.seo.title === 'string' ? data.seo.title : undefined,
              description: typeof data.seo.description === 'string' ? data.seo.description : undefined,
            }
          : undefined,
        draft: data.draft === true,
      }
    })
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug)
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

