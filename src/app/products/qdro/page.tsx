import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QDRO Generator — LexyAlgo',
  description: 'Generate a Qualified Domestic Relations Order (QDRO) for retirement plan division in divorce. Starting at $100 per order. Supports nearly one million plans nationwide.',
}

export default function QdroPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-bronze-light via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-bronze uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-bronze" />
                QDRO Generator
              </span>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                Live
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Generate your QDRO. $100 per order.
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              A Qualified Domestic Relations Order divides retirement accounts in divorce. Our generator supports nearly one million plans across the country. Answer a few questions, and we generate the order for your plan.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="https://doc.lexyalgo.com"
                className="inline-flex items-center justify-center bg-bronze text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#6F4A2E] transition-all shadow-lg shadow-bronze/20 hover:shadow-xl hover:shadow-bronze/30 active:scale-[0.98]"
              >
                Generate a QDRO
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <Link href="/pricing"
                className="inline-flex items-center justify-center border-2 border-slate-200 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* No screenshot — QDRO generator lives at doc.lexyalgo.com (Docassemble) */}
      <section className="py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#F5EDE5] border border-[#8B5E3C]/15 p-8 text-center">
            <p className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wider mb-2">Available Now</p>
            <p className="text-slate-700 leading-relaxed">
              The QDRO generator is live at{' '}
              <a href="https://doc.lexyalgo.com" className="font-semibold text-[#8B5E3C] underline underline-offset-2 hover:text-[#6F4A2E]">
                doc.lexyalgo.com
              </a>
              . Start your order there.
            </p>
          </div>
        </div>
      </section>

      {/* Simple pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-xl mx-auto">
          <div className="rounded-2xl bg-slate-950 text-white p-10 text-center ring-2 ring-bronze">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700">Available Now</span>
            <div className="mt-6">
              <span className="font-[family-name:var(--font-space)] text-5xl font-bold">$100</span>
              <span className="ml-1 text-sm text-slate-400">per order</span>
            </div>
            <p className="mt-4 text-slate-300 text-sm">
              One QDRO. One flat price. Answer the intake questions, we generate the order for your retirement plan.
            </p>
            <ul className="mt-6 space-y-3 text-left max-w-xs mx-auto">
              {[
                'Supports nearly 1 million plans',
                'Defined benefit & defined contribution',
                'Answer questions, get your order',
                'Download as PDF',
              ].map((feature) => (
                <li key={feature} className="flex gap-3 items-start">
                  <svg className="w-5 h-5 flex-shrink-0 text-[#C9A07A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-sm text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a href="https://doc.lexyalgo.com"
                className="block text-center font-semibold py-3 px-6 rounded-xl bg-bronze text-white hover:bg-[#6F4A2E] transition-all active:scale-[0.98]"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is a QDRO */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900 text-center mb-16">What is a QDRO?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Divides Retirement in Divorce', desc: 'A QDRO is a court order that tells a retirement plan how to divide benefits between divorcing spouses. Without one, the plan won\'t release funds.', icon: '⚖️' },
              { title: 'Required for Most Plans', desc: '401(k)s, pensions, 403(b)s, 457 plans — if a retirement account was earned during the marriage, you likely need a QDRO to divide it.', icon: '📋' },
              { title: 'Plan-Specific Language', desc: 'Every plan has its own rules and required language. A generic order often gets rejected. Our generator uses plan-specific formatting.', icon: '✅' },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="font-[family-name:var(--font-space)] font-bold text-slate-900 mt-4">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-[#C9A07A] uppercase tracking-wider">How it works</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-white mt-3">
              Three steps to your QDRO
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Tell us about the plan', desc: 'Enter the plan name, type, and basic details. Our system covers nearly one million retirement plans nationwide.' },
              { step: '2', title: 'Answer the intake questions', desc: 'We\'ll ask about the marriage dates, division method, and any special provisions your divorce decree requires.' },
              { step: '3', title: 'Download your QDRO', desc: 'We generate the order with plan-specific language. Download the PDF and file it with your court.' },
            ].map((s) => (
              <div key={s.step} className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
                <span className="text-sm font-semibold uppercase tracking-wider text-[#C9A07A]">Step {s.step}</span>
                <h3 className="font-[family-name:var(--font-space)] font-bold text-white mt-4 text-xl">{s.title}</h3>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-slate-500">
            LexyAlgo is a document preparation service, not a law firm. Generated QDROs are based on the information you provide and should be reviewed by a licensed attorney before filing. We do not provide legal advice. Results may vary depending on your plan&apos;s specific requirements.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-bronze-light py-16 sm:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">Ready to divide the retirement plan?</h2>
          <p className="mt-4 text-slate-700 max-w-lg mx-auto">$100 per order. Answer the questions, get your QDRO.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://doc.lexyalgo.com"
              className="inline-flex items-center justify-center bg-bronze text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#6F4A2E] transition-all shadow-lg shadow-bronze/20 active:scale-[0.98]"
            >
              Generate a QDRO
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
