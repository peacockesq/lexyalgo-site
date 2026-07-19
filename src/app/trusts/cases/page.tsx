import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Key Trust Law Cases — LexyAlgo',
  description: 'Landmark and illustrative trust-law cases selected from Scott and Ascher on Trusts, with citations and practical takeaways.',
}

const cases = [
  {
    name: 'Goodenough v. Union Guardian Trust Co.',
    citation: '267 N.W. 772 (Mich. 1936)',
    topic: 'Nature of a trust relationship',
    takeaway: 'Discusses the relationship between trustee and beneficiary and the property interest each holds.',
  },
  {
    name: "Sec. Nat'l Bank v. Sternberger",
    citation: '178 S.E. 595 (N.C. 1935)',
    topic: 'Trust property and intent',
    takeaway: 'Examines whether a trust relationship was created and what property was subject to it.',
  },
  {
    name: "O'Brien v. Holden",
    citation: '160 A. 192 (Vt. 1932)',
    topic: 'Fiduciary relationship and trust duties',
    takeaway: 'Illustrates the duties owed by a trustee to a beneficiary.',
  },
  {
    name: 'Dunkley v. Peoples Bank \u0026 Trust Co.',
    citation: '728 F. Supp. 547 (W.D. Ark. 1989)',
    topic: 'Constructive and express trusts',
    takeaway: 'Discusses the boundary between express and constructive trust concepts.',
  },
]

export default function TrustCasesPage() {
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
                Primary law
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Key trust-law cases
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Cases selected and summarized from Scott and Ascher on Trusts as part of the LexyAlgo trusts pilot.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {cases.map((c) => (
            <div key={c.name} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-[family-name:var(--font-space)] text-xl font-bold text-slate-900">{c.name}</h2>
              <p className="mt-1 text-sm text-slate-500 font-mono">{c.citation}</p>
              <p className="mt-2 text-sm font-medium text-[#7A5C1E]">{c.topic}</p>
              <p className="mt-3 text-slate-600 leading-relaxed">{c.takeaway}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-amber-100 bg-amber-50/80 p-4 text-sm leading-relaxed text-slate-700">
            These summaries are educational, not legal advice. Full opinions should be read before relying on any case in practice. We are working to add free-source links to each case.
          </div>
        </div>
      </section>
    </>
  )
}
