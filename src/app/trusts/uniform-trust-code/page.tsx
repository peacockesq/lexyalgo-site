import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Uniform Trust Code — LexyAlgo',
  description: 'A plain-English guide to the Uniform Trust Code, the model law that governs trusts in many states.',
}

const sections = [
  {
    id: 'overview',
    title: 'What is the Uniform Trust Code?',
    content: `The Uniform Trust Code (UTC) is a model law drafted by the Uniform Law Commission. Many states have adopted it, often with local changes. It governs how trusts are created, administered, modified, and terminated. If your state has adopted the UTC, it is usually the first place courts look when a trust dispute arises.`,
  },
  {
    id: 'definitions',
    title: 'Key definitions',
    content: `UTC § 102 defines the core vocabulary: beneficiary, terms of the trust, trustee, trust property, and other terms used throughout the code. These definitions do not replace the trust document, but they provide the default rules when the document is silent or unclear.`,
  },
  {
    id: 'creation',
    title: 'Creating a trust',
    content: `UTC § 401 lists the methods: a trust may be created by transfer to another person, by declaration that the settlor holds property as trustee, by exercise of a power of appointment, by court order, or by statute. UTC § 402 then sets the requirements: a settlor with capacity, intent, a definite beneficiary (with exceptions), and duties for the trustee.`,
  },
  {
    id: 'duties',
    title: 'Trustee duties',
    content: `UTC § 801 requires the trustee to administer the trust in good faith, in accordance with its terms and purposes, and in the interests of the beneficiaries. Later sections cover duties of loyalty, impartiality, prudent administration, and recordkeeping.`,
  },
  {
    id: 'adoption',
    title: 'State adoption',
    content: `Not every state has adopted the UTC, and states that adopted it may have made significant changes. Always check your state's current version before relying on UTC rules for a real trust decision.`,
  },
]

const citationLinks = [
  { label: 'Uniform Law Commission — Trust Code', href: 'https://www.uniformlaws.org/act/1216' },
  { label: 'UTC adoptions by state', href: 'https://www.uniformlaws.org/committees/community-home?CommunityKey=1932748b-9459-4a75-805b-9e1e0f912f60' },
]

export default function UniformTrustCodePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#FAF2DC] via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <Link
              href="/trusts"
              className="inline-flex items-center text-sm font-medium text-[#7A5C1E] hover:text-[#573F0E] mb-6"
            >
              <svg className="mr-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back to Trusts & Estates
            </Link>
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#7A5C1E] uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7A5C1E]" />
                Source law
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Uniform Trust Code
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              A model law adopted in many states that sets default rules for creating and running a trust.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {sections.map((s) => (
            <div key={s.id} id={s.id}>
              <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900 mb-4">{s.title}</h2>
              <p className="text-slate-600 leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900 mb-6">Official sources</h2>
          <ul className="space-y-3">
            {citationLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#7A5C1E] hover:text-[#573F0E] font-medium"
                >
                  {link.label}
                  <svg className="ml-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
