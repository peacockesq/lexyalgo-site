import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trusts & Estates — LexyAlgo',
  description: 'A plain-English guide to trusts: what they are, how they work, and why they matter in estate planning. From LexyAlgo.',
}

const concepts = [
  {
    title: 'Grantor',
    desc: 'The person who creates the trust and transfers property into it. Also called the settlor or trustor.',
  },
  {
    title: 'Trustee',
    desc: 'The person or institution responsible for managing trust property according to the trust document.',
  },
  {
    title: 'Beneficiary',
    desc: 'The person or people who receive income, principal, or other benefits from the trust.',
  },
  {
    title: 'Revocable vs. Irrevocable',
    desc: 'A revocable trust can usually be changed or canceled during life. An irrevocable trust generally cannot.',
  },
  {
    title: 'Living Trust',
    desc: 'Created and funded during the grantor\'s lifetime. Often used to avoid probate and manage assets.',
  },
  {
    title: 'Testamentary Trust',
    desc: 'Created by a will and takes effect after death, often for minors or specific bequests.',
  },
]

const relatedLaw = [
  {
    title: 'Uniform Trust Code',
    desc: 'A model law adopted in many states that governs the creation, administration, and termination of trusts.',
    href: '#uniform-trust-code',
  },
  {
    title: 'Restatement (Third) of Trusts',
    desc: 'A scholarly synthesis of common-law trust principles used by courts and practitioners.',
    href: '#restatement-of-trusts',
  },
  {
    title: 'Key cases',
    desc: 'Landmark trust-law cases will be summarized here with citations and practical takeaways.',
    href: '#key-cases',
  },
]

export default function TrustsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#FAF2DC] via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#7A5C1E] uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7A5C1E]" />
                Trusts & Estates
              </span>
              <span className="bg-sky-100 text-sky-700 text-xs font-semibold px-3 py-1 rounded-full">
                Pilot
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Trusts explained in plain English
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Trusts are one of the most useful tools in estate planning — and one of the most misunderstood. This pilot breaks down the key ideas, terms, and tradeoffs so you can decide whether a trust makes sense for you.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/trusts/what-is-a-trust"
                className="inline-flex items-center justify-center bg-[#7A5C1E] text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#573F0E] transition-all shadow-lg shadow-[#7A5C1E]/20 hover:shadow-xl hover:shadow-[#7A5C1E]/30 active:scale-[0.98]"
              >
                Start with the basics
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link
                href="/products/estate-planning"
                className="inline-flex items-center justify-center border-2 border-slate-200 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                Try the free estate-planning tool
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-[#7A5C1E] uppercase tracking-wider">Key concepts</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900 mt-3">
              The building blocks of a trust
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {concepts.map((c) => (
              <div key={c.title} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#FAF2DC] flex items-center justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#7A5C1E]" />
                </div>
                <h3 className="font-[family-name:var(--font-space)] font-bold text-slate-900">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-[#D4B868] uppercase tracking-wider">Related law</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-white mt-3">
              Cases, statutes, and sources
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedLaw.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group block bg-slate-900/50 rounded-2xl border border-slate-800 p-8 transition-colors hover:bg-slate-900"
              >
                <h3 className="font-[family-name:var(--font-space)] font-bold text-white text-xl group-hover:text-[#D4B868] transition-colors">{item.title}</h3>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-[#D4B868]">
                  Read more
                  <svg className="ml-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-[#7A5C1E] uppercase tracking-wider">Podcast</span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900 mt-3">
            Listen: trusts in real life
          </h2>
          <p className="mt-4 text-slate-600">
            A podcast episode embed will appear here. It will cover when a trust is worth considering, common mistakes, and questions to ask a lawyer.
          </p>
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 sm:p-12">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#FAF2DC] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#7A5C1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </div>
            <p className="text-sm font-medium text-slate-900">Episode placeholder</p>
            <p className="mt-1 text-xs text-slate-500">Embed code goes here.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF2DC] py-16 sm:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">Get the documents to match the plan</h2>
          <p className="mt-4 text-slate-700 max-w-lg mx-auto">
            Once you understand how a trust fits in, generate a revocable living trust, will, power of attorney, and healthcare directive for free.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products/estate-planning"
              className="inline-flex items-center justify-center bg-[#7A5C1E] text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#573F0E] transition-all shadow-lg shadow-[#7A5C1E]/20 active:scale-[0.98]"
            >
              Try estate planning free
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-slate-300 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:border-slate-400 hover:bg-white transition-all"
            >
              Questions? Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
