import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Estate Planning — Free Beta — LexyAlgo',
  description: 'Generate wills, trusts, powers of attorney, and healthcare directives for free. One intake, four documents. State-specific requirements built in.',
}

const DA_INTERVIEW_URL = 'https://doc.lexyalgo.com/interview?i=docassemble.EstatePlanning:data/questions/estate_planning.yml'

const features = [
  { title: 'Last Will and Testament', desc: 'A guided questionnaire produces a state-aware will — asset distribution, guardianship, executor appointment — all in one document.' },
  { title: 'Revocable Living Trust', desc: 'Avoid probate with a properly structured living trust. Fund it during your lifetime, and your assets transfer seamlessly.' },
  { title: 'Durable Power of Attorney', desc: 'Designate someone to handle financial decisions if you can\'t. Effective immediately or springing — your choice.' },
  { title: 'Healthcare Proxy / Advance Directive', desc: 'Make your medical wishes known before they\'re needed. Appoint a healthcare agent and document your preferences.' },
  { title: 'State-Specific Requirements', desc: 'Every state has different rules for witnesses, notarization, and execution. We build those requirements into the document generation.' },
  { title: 'One Intake, Complete Package', desc: 'Answer questions once. Your will, trust, POA, and healthcare directive all pull from the same information — no re-entering data.' },
]

const steps = [
  { step: '1', title: 'Tell us about yourself', desc: 'Single or couple, your state, basic info. The intake adapts to your situation — if you\'re married, we\'ll collect spouse info too.' },
  { step: '2', title: 'Make your choices', desc: 'Who gets what, who makes decisions if you can\'t, who raises your kids. We ask plain questions and translate to legal language.' },
  { step: '3', title: 'Download your documents', desc: 'Living Trust, Pour-Over Will, Durable POA, and Healthcare Directive — all generated as downloadable documents ready for review and signing.' },
]

export default function EstatePlanningPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#FAF2DC] via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#7A5C1E] uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7A5C1E]" />
                Estate Planning
              </span>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                Free Beta
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Generate your estate plan. Free.
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              One intake generates four documents: Living Trust, Pour-Over Will, Durable Power of Attorney, and Healthcare Directive. State-specific signing requirements built in. Works for individuals and couples.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href={DA_INTERVIEW_URL}
                className="inline-flex items-center justify-center bg-[#7A5C1E] text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#573F0E] transition-all shadow-lg shadow-[#7A5C1E]/20 hover:shadow-xl hover:shadow-[#7A5C1E]/30 active:scale-[0.98]"
              >
                Try It Now — FREE
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <Link href="/pricing"
                className="inline-flex items-center justify-center border-2 border-slate-200 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                See pricing
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Beta — documents should be reviewed by a licensed attorney before signing or filing.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-[#D4B868] uppercase tracking-wider">How it works</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-white mt-3">
              Three steps to your estate plan
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
                <span className="text-sm font-semibold uppercase tracking-wider text-[#D4B868]">Step {s.step}</span>
                <h3 className="font-[family-name:var(--font-space)] font-bold text-white mt-4 text-xl">{s.title}</h3>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900 text-center mb-16">Four documents, one intake</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#FAF2DC] flex items-center justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#7A5C1E]" />
                </div>
                <h3 className="font-[family-name:var(--font-space)] font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beta disclaimer */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">Beta</span>
          </div>
          <p className="text-sm text-slate-600">
            This tool generates estate planning document drafts. <strong>These documents should be reviewed by a licensed attorney before signing or filing.</strong> LexyAlgo is a document preparation service, not a law firm. We do not provide legal advice. State-specific signing requirements (witnesses, notarization) are included for 12 major states, but you should verify the requirements for your state.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#FAF2DC] py-16 sm:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">Protect your family. Start now.</h2>
          <p className="mt-4 text-slate-700 max-w-lg mx-auto">Generate your Living Trust, Will, Power of Attorney, and Healthcare Directive — free during beta.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={DA_INTERVIEW_URL}
              className="inline-flex items-center justify-center bg-[#7A5C1E] text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#573F0E] transition-all shadow-lg shadow-[#7A5C1E]/20 active:scale-[0.98]"
            >
              Try It Now — FREE
            </a>
            <Link href="/pricing"
              className="inline-flex items-center justify-center border-2 border-slate-300 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:border-slate-400 hover:bg-white transition-all"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
