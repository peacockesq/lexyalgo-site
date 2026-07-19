import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What Is a Trust? — LexyAlgo',
  description: 'A simple, plain-English explanation of what a trust is, how it works, and the main reasons people create one.',
}

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
              At its simplest, a trust is a legal arrangement where one person (the grantor) gives another person or institution (the trustee) the right to hold and manage property for the benefit of someone else (the beneficiary).
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900 mb-6">The basic idea</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            A trust separates ownership and benefit. The trustee owns the legal title; the beneficiary gets the practical benefit. That separation makes trusts useful for everything from avoiding probate to protecting assets to controlling how and when someone receives an inheritance.
          </p>

          <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900 mb-6">Common reasons people create a trust</h2>
          <ul className="space-y-4 text-slate-600">
            <li className="flex gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-[#7A5C1E] shrink-0" />
              <span><strong className="text-slate-900">Avoid probate.</strong> Assets held in a properly funded revocable living trust generally pass outside of probate, which can save time and court costs.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-[#7A5C1E] shrink-0" />
              <span><strong className="text-slate-900">Plan for incapacity.</strong> A successor trustee can step in and manage your affairs if you become unable to do so yourself.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-[#7A5C1E] shrink-0" />
              <span><strong className="text-slate-900">Control distributions.</strong> You can set rules about when and how beneficiaries receive money — for example, at certain ages or for specific purposes.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-[#7A5C1E] shrink-0" />
              <span><strong className="text-slate-900">Protect assets.</strong> Some trusts can shield assets from creditors, lawsuits, or divorce — though this depends heavily on the type of trust and state law.</span>
            </li>
          </ul>

          <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900 mb-6 mt-12">What a trust is not</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            A trust is not a magic shield and it is not a substitute for a will. Most people with a revocable living trust still need a "pour-over" will to catch any assets they forgot to transfer into the trust. And a trust only works if it is properly funded — the assets actually have to be retitled into the trust\'s name.
          </p>

          <div className="mt-10 rounded-2xl border border-amber-100 bg-amber-50/80 p-4 text-sm leading-relaxed text-slate-700">
            This page is a pilot overview, not legal advice. Trusts vary widely by state and by situation, and you should review any trust document with a licensed attorney before signing or funding it.
          </div>
        </div>
      </section>

      <section className="bg-[#FAF2DC] py-16 sm:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">Ready to build a trust?</h2>
          <p className="mt-4 text-slate-700 max-w-lg mx-auto">
            Generate a revocable living trust, will, power of attorney, and healthcare directive for free with LexyAlgo\'s estate-planning tool.
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
