import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { formatPostDate, getAllPosts, getPostBySlug, renderMarkdownParagraphs } from '@/lib/content'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.seo?.title ?? `${post.title} — LexyAlgo`,
    description: post.seo?.description ?? post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const paragraphs = renderMarkdownParagraphs(post.body)

  return (
    <section className="bg-white py-20">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 border-b border-slate-200 pb-8">
          <p className="text-sm text-slate-500">
            {formatPostDate(post.date)} · {post.author}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-space)] text-4xl font-bold text-slate-900 sm:text-5xl">
            {post.title}
          </h1>
          {post.excerpt ? <p className="mt-4 text-lg text-slate-600">{post.excerpt}</p> : null}
        </div>

        <div className="space-y-6 text-lg leading-8 text-slate-700">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </section>
  )
}
