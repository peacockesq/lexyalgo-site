import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QDRO Services — Live — LexyAlgo',
  description: 'Qualified Domestic Relations Order preparation for retirement plan division in divorce. 33 plan-specific templates. Attorney-prepared.',
}

const pricingTiers = [
  {
    name: 'Legal Pro Review',
    price: '$300',
    description: 'For attorneys who draft their own QDROs — we review for plan compliance, TPA formatting requirements, and common rejection issues.',
    features: [
      'Plan compliance review',
      'TPA formatting check',
      'Rejection risk assessment',
      'Written feedback with corrections',
    ],
  },
  {
    name: 'Flat Rate QDRO',
    price: '$900',
    description: 'Full QDRO preparation for most private-sector retirement plans. One flat fee — no hourly billing, no surprises.',
    features: [
      'Full QDRO preparation',
      'Plan-specific template (not generic)',
      'TPA-formatted for your plan administrator',
      'Pre-approval submission where accepted',
      'Revisions until approved',
    ],
    highlight: true,
  },
  {
    name: 'Federal / Military QDRO',
    price: '$1,200',
    description: 'FERS, CSRS, military SBP — these have unique rules, specific agencies, and complex requirements that most attorneys get wrong.',
    features: [
      'FERS / CSRS retirement division',
      'Military SBP orders',
      'OPM / DFAS formatting requirements',
      'Agency-specific compliance',
      'Revisions until approved',
    ],
  },
]

const features = [
  { title: '33 Plan-Specific Templates', desc: 'Not one-size-fits-all. Each template is tailored to the specific plan type — defined benefit, defined contribution, deferred comp, federal, and military.' },
  { title: 'All Plan Types Covered', desc: '401(k), pension, 403(b), 457, FERS, CSRS, military — if it\'s a retirement plan that needs dividing in divorce, we handle it.' },
  { title: 'TPA-Specific Formatting', desc: 'Fidelity, Vanguard, TIAA, Empower, and dozens more. Each TPA has formatting preferences — we know them and write to them.' },
  { title: 'Pre-Approval Submission', desc: 'Where plan administrators accept pre-approval review, we submit directly. Catch issues before you\'re in front of a judge.' },
  { title: 'Attorney-Prepared', desc: 'Every QDRO is prepared by Willie Peacock — licensed in 8 states, focused exclusively on retirement division in divorce.' },
  { title: 'Revisions Until Approved', desc: 'If the plan administrator rejects the order, we revise and resubmit. The flat fee covers revisions until the QDRO is approved.' },
]

export default function QdroPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-ember-light via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-ember uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-ember" />
                QDRO Services
              </span>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                Live — Accepting Clients
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Retirement division, done right the first time
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Qualified Domestic Relations Order preparation for retirement plan division in divorce. 33 plan-specific templates covering defined benefit, defined contribution, deferred comp, federal, and military plans. Attorney-prepared, TPA-formatted, revisions until approved.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="https://doc.lexyalgo.com"
                className="inline-flex items-center justify-center bg-ember text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#861B00] transition-all shadow-lg shadow-ember/20 hover:shadow-xl hover:shadow-ember/30 active:scale-[0.98]"
              >
                Get Started
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <Link href="/contact"
                className="inline-flex items-center justify-center border-2 border-slate-200 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => (
            <div key={tier.name}
              className={`rounded-2xl p-8 ${
                tier.highlight
                  ? 'bg-slate-950 text-white ring-2 ring-ember'
                  : 'bg-white border border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-[family-name:var(--font-space)] font-bold text-xl">{tier.name}</h3>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700">Available</span>
              </div>
              <div className="mt-4">
                <span className="font-[family-name:var(--font-space)] text-4xl font-bold">{tier.price}</span>
                <span className={`ml-1 text-sm ${tier.highlight ? 'text-slate-400' : 'text-slate-500'}`}>/flat fee</span>
              </div>
              <p className={`mt-3 text-sm ${tier.highlight ? 'text-slate-300' : 'text-slate-600'}`}>{tier.description}</p>
              <ul className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-3 items-start">
                    <svg className={`w-5 h-5 flex-shrink-0 ${tier.highlight ? 'text-[#FFB4A3]' : 'text-ember'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className={`text-sm ${tier.highlight ? 'text-slate-300' : 'text-slate-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a href="https://doc.lexyalgo.com"
                  className={`block text-center font-semibold py-3 px-6 rounded-xl transition-all active:scale-[0.98] ${
                    tier.highlight
                      ? 'bg-ember text-white hover:bg-[#861B00]'
                      : 'border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Get Started
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900 text-center mb-16">Why LexyAlgo QDROs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-ember-light flex items-center justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-ember" />
                </div>
                <h3 className="font-[family-name:var(--font-space)] font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Attorney section */}
      <section className="bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-[#FFB4A3] uppercase tracking-wider">Attorney-Prepared</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-white mt-3">
              Not a form generator — a QDRO practice
            </h2>
            <p className="mt-4 text-slate-400">
              Every QDRO is prepared by an attorney licensed in 8 states who has focused exclusively on retirement division in divorce. This isn&rsquo;t a sideline — it&rsquo;s the entire practice.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: '8-State Bar Admission', desc: 'Licensed in CA, NY, NJ, KS, MO, IA, ND, and CT. QDROs are federal instruments — state admission enables nationwide service.', icon: '⚖️' },
              { title: '33 Plan-Specific Templates', desc: 'Built from years of TPA feedback, plan document review, and rejection analysis. Every template reflects what actually gets approved.', icon: '📋' },
              { title: 'Revisions Until Approved', desc: 'If a plan administrator sends it back, we fix it and resubmit. The flat fee covers the entire process — no hourly billing for revisions.', icon: '🔄' },
            ].map((h) => (
              <div key={h.title} className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
                <span className="text-3xl">{h.icon}</span>
                <h3 className="font-[family-name:var(--font-space)] font-bold text-white mt-4">{h.title}</h3>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-peach py-16 sm:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">Ready to divide the retirement plan?</h2>
          <p className="mt-4 text-slate-700 max-w-lg mx-auto">Get started today. Flat-fee pricing, attorney-prepared, revisions until approved.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://doc.lexyalgo.com"
              className="inline-flex items-center justify-center bg-ember text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#861B00] transition-all shadow-lg shadow-ember/20 active:scale-[0.98]"
            >
              Get Started
            </a>
            <Link href="/contact"
              className="inline-flex items-center justify-center border-2 border-slate-300 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:border-slate-400 hover:bg-white transition-all"
            >
              Questions? Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
