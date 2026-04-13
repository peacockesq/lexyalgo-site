import Link from 'next/link'
import type { Metadata } from 'next'
import { formatPostDate, getAllPosts } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Blog — LexyAlgo',
  description:
    'Guides, tips, and insights on divorce document preparation, asset division, co-parenting, and support calculations.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-space)] text-4xl font-bold text-slate-900 sm:text-5xl">Blog</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Practical guides on divorce document preparation, asset division, co-parenting, and support calculations — written by an attorney, not a content farm.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-slate-100 bg-white p-8 transition-all duration-300 hover:border-slate-200 hover:shadow-lg"
            >
              <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span>{formatPostDate(post.date)}</span>
                <span>·</span>
                <span>{post.author}</span>
              </div>
              <h2 className="font-[family-name:var(--font-space)] text-xl font-bold text-slate-900 transition-colors group-hover:text-slate-700 sm:text-2xl">
                {post.title}
              </h2>
              {post.excerpt ? <p className="mt-3 leading-relaxed text-slate-600">{post.excerpt}</p> : null}
              <div className="mt-5">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-primary-container hover:underline"
                >
                  Read more
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
