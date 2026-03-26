import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — LexyAlgo',
  description: 'Guides, tips, and insights on divorce document preparation, asset division, co-parenting, and support calculations.',
}

const posts = [
  {
    slug: 'understanding-asset-division',
    title: 'Understanding Asset Division: What You Need to Know Before You Start',
    excerpt: 'A practical guide to marital property vs. separate property, community property vs. equitable distribution states, and the three biggest mistakes people make when dividing assets.',
    date: 'March 22, 2026',
    readTime: '8 min read',
    category: 'Asset Division',
    categoryColor: '#B02700',
  },
  {
    slug: 'retirement-accounts-divorce',
    title: 'Retirement Accounts in Divorce: Why $30K Today Isn\'t the Same as $30K in a 401(k)',
    excerpt: 'Hyperbolic discounting makes people trade retirement assets for cash — even when the retirement is worth far more. Here\'s how to think about it, with real numbers.',
    date: 'March 18, 2026',
    readTime: '6 min read',
    category: 'Calculators',
    categoryColor: '#1E5F6C',
  },
  {
    slug: 'coparenting-communication-tips',
    title: '5 Communication Strategies That Actually Reduce Co-Parenting Conflict',
    excerpt: 'Research-backed approaches to co-parenting communication — from framing expenses as "contributions" to using structured messaging instead of open-ended texts.',
    date: 'March 14, 2026',
    readTime: '5 min read',
    category: 'Co-Parenting',
    categoryColor: '#2E6B4F',
  },
]

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface to-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900">Blog</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl">
            Practical guides on divorce document preparation, asset division, co-parenting, and support calculations — written by an attorney, not a content farm.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group bg-white rounded-2xl border border-slate-100 p-8 hover:shadow-lg hover:border-slate-200 transition-all duration-300">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ backgroundColor: post.categoryColor }}>
                  {post.category}
                </span>
                <span className="text-xs text-slate-400">{post.date}</span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-400">{post.readTime}</span>
              </div>
              <h2 className="font-[family-name:var(--font-space)] text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                {post.title}
              </h2>
              <p className="mt-3 text-slate-600 leading-relaxed">{post.excerpt}</p>
              <div className="mt-5">
                <span className="text-sm font-semibold text-primary-container group-hover:underline inline-flex items-center">
                  Read more
                  <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
