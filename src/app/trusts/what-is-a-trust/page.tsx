import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What Is a Trust? — LexyAlgo',
  description: 'A plain-English explanation of what a trust is, how it works, and the main reasons people create one.',
}

const sections = [
  {
    id: 'simplest-version',
    title: 'The simplest version',
    content: `A trust is a legal arrangement in which one person (the grantor, also called the settlor or trustor) transfers property to another person or institution (the trustee) to manage for the benefit of someone else (the beneficiary).`,
  },
  {
    id: 'three-categories',
    title: 'The three main categories',
    content: `Trusts fall into three broad categories: express trusts (created intentionally, such as revocable living trusts and charitable trusts), resulting trusts (imposed by law when property is transferred without intended beneficial ownership), and constructive trusts (court-imposed remedies to prevent unjust enrichment).`,
  },
  {
    id: 'people-involved',
    title: 'The people involved',
    content: `The grantor creates the trust and usually transfers property into it. The trustee holds legal title and manages the property according to the trust document and state law. The beneficiary receives the benefits. A trust can have one beneficiary or many.`,
  },
  {
    id: 'why-create',
    title: 'Why people create trusts',
    content: `Common reasons include avoiding probate, planning for incapacity, controlling when and how beneficiaries receive money, protecting assets (in limited circumstances), and keeping estate details private.`,
  },
  {
    id: 'what-it-is-not',
    title: 'What a trust is not',
    content: `A trust is not a magic shield, a tax elimination tool, or a substitute for a will. Most people with a revocable living trust still need a pour-over will. And a trust only works if it is funded — the assets must actually be retitled into the trust's name.`,
  },
  {
    id: 'how-created',
    title: 'How a trust is created',
    content: `Common methods include a written trust agreement, a declaration of trust, a transfer in trust, a promise in trust, or a court order or statute. For most estate planning, the trust is created by a written agreement followed by a transfer of assets into the trust.`,
  },
]

const glossary = [
  { term: 'Grantor / settlor / trustor', def: 'The person who creates the trust and usually transfers property into it.' },
  { term: 'Trustee', def: 'The person or institution that holds legal title and manages trust property for beneficiaries.' },
  { term: 'Beneficiary', def: 'The person who receives benefits from the trust.' },
  { term: 'Fiduciary', def: 'Someone with a legal duty to act for another person’s benefit within a specific relationship.' },
  { term: 'Express trust', def: 'A trust created intentionally by the grantor.' },
  { term: 'Resulting trust', def: 'A trust imposed by law when property was transferred without intended beneficial ownership.' },
  { term: 'Constructive trust', def: 'A court-imposed remedy to prevent unjust enrichment or redress wrongdoing.' },
  { term: 'Revocable trust', def: 'A trust the grantor can usually change or cancel during life.' },
  { term: 'Irrevocable trust', def: 'A trust that generally cannot be changed once established.' },
  { term: 'Testamentary trust', def: 'A trust created by a will and effective after death.' },
  { term: 'Living trust / inter vivos trust', def: 'A trust created during the grantor’s lifetime.' },
  { term: 'Trust property / res / corpus', def: 'The asset or assets held in the trust.' },
  { term: 'Beneficial interest', def: 'The right to benefit from trust property.' },
  { term: 'Probate', def: 'The court-supervised process for distributing a deceased person’s estate.' },
  { term: 'Pour-over will', def: 'A will that transfers leftover assets into a living trust at death.' },
  { term: 'Equity', def: 'The body of law focused on fairness, from which trusts developed.' },
]

export default function WhatIsATrustPage() {
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
                Trusts 101
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              What is a trust?
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              At its simplest, a trust is a legal arrangement where one person gives property to another to manage for the benefit of someone else. This guide breaks down the key ideas, terms, and tradeoffs in plain English.
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

      <section className="bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-[#D4B868] uppercase tracking-wider">Glossary</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-white mt-3">
              Key terms
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {glossary.map((item) => (
              <div key={item.term} className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
                <h3 className="font-[family-name:var(--font-space)] font-bold text-white text-lg">{item.term}</h3>
                <p className="mt-2 text-slate-400 text-sm leading-relaxed">{item.def}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-[#7A5C1E] uppercase tracking-wider">Podcast</span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900 mt-3">
            Listen: What is a trust?
          </h2>
          <p className="mt-4 text-slate-600">
            A deep-dive conversation between a trusts attorney and a legal educator. Coming soon.
          </p>
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 sm:p-12">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#FAF2DC] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#7A5C1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </div>
            <p className="text-sm font-medium text-slate-900">Episode in production</p>
            <p className="mt-1 text-xs text-slate-500">Audio file and transcript will appear here once generation completes.</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900 mb-6">Related law</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/trusts/uniform-trust-code" className="block rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
              <h3 className="font-[family-name:var(--font-space)] font-bold text-slate-900">Uniform Trust Code</h3>
              <p className="mt-2 text-sm text-slate-600">Model law adopted in many states governing trust creation, administration, and duties.</p>
            </Link>
            <Link href="/trusts/cases" className="block rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
              <h3 className="font-[family-name:var(--font-space)] font-bold text-slate-900">Key cases</h3>
              <p className="mt-2 text-sm text-slate-600">Landmark and illustrative trust-law cases with citations and practical takeaways.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF2DC] py-16 sm:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">Ready to build a trust?</h2>
          <p className="mt-4 text-slate-700 max-w-lg mx-auto">
            Generate a revocable living trust, will, power of attorney, and healthcare directive for free with LexyAlgo's estate-planning tool.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products/estate-planning"
              className="inline-flex items-center justify-center bg-[#7A5C1E] text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#573F0E] transition-all shadow-lg shadow-[#7A5C1E]/20 active:scale-[0.98]"
            >
              Try it now free
            </Link>
            <Link
              href="/trusts"
              className="inline-flex items-center justify-center border-2 border-slate-300 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:border-slate-400 hover:bg-white transition-all"
            >
              Browse trust topics
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
