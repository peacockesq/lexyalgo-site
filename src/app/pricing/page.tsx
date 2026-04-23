import Link from 'next/link'
import type { Metadata } from 'next'
import { WaitlistForm } from '@/components/WaitlistForm'

export const metadata: Metadata = {
  title: 'Pricing — LexyAlgo',
  description: 'Most of LexyAlgo is free: divorce tools, calculators, estate planning, and CoParent. Premium pricing only appears when you need deeper financial analysis.',
}

const freeProducts = [
  {
    name: 'Divorce tools',
    description: 'Guided divorce workflows, forms, and core planning tools are designed to be free because basic clarity should not sit behind a paywall.',
    points: [
      'Core divorce workflow access',
      'Guided forms and planning tools',
      'Data-driven decision support',
    ],
  },
  {
    name: 'Calculators',
    description: 'Child support, retirement division, coverture fractions, and future-value context stay free.',
    points: [
      'State-specific child support estimates',
      'Retirement division math',
      'Plain-English explanations and exports',
    ],
  },
  {
    name: 'Estate planning',
    description: 'Wills, trusts, powers of attorney, and healthcare directives are free. Period.',
    points: [
      'Living trust',
      'Will',
      'Power of attorney and healthcare directive',
    ],
  },
  {
    name: 'CoParent',
    description: 'Shared parenting coordination is intended to stay free for families who need less friction, not another bill.',
    points: [
      'Calendar and scheduling tools',
      'Expense and communication workflow',
      'Built to reduce conflict, not add to it',
    ],
  },
]

const premiumFeatures = [
  'Secure account and statement gathering when a case needs it',
  'Premium financial valuation workflows',
  'Higher-complexity asset analysis and scenario support',
  'One-time case-based pricing instead of a subscription loop',
]

export default function PricingPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm font-semibold text-green-700">As free as we can make it</span>
          </div>
          <h1 className="mt-6 font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900">
            Most of LexyAlgo is free.
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            The core tools people actually need should be accessible. So divorce tools are free. Calculators are free. Estate planning is free. CoParent is free. We only charge where the work gets materially more complex.
          </p>
          <div className="mt-6 max-w-3xl mx-auto rounded-2xl border border-sky-100 bg-sky-50/80 px-6 py-5 text-sm leading-relaxed text-slate-700">
            The pricing story is simple: everyday legal clarity should be accessible, and premium pricing should only show up when a case truly needs deeper financial work.
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {freeProducts.map((product) => (
            <div key={product.name} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Free
              </div>
              <h2 className="mt-4 font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900">{product.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{product.description}</p>
              <ul className="mt-6 space-y-3">
                {product.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-sm text-slate-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-3xl border border-[#E3BEB6] bg-[#FFEDE8] p-8 sm:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-container">Premium only where it earns its place</p>
            <h2 className="mt-3 font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">
              Pay once for deeper financial analysis
            </h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Some cases need more than forms and calculators. When you need deeper financial analysis and higher-lift support, that belongs in a one-time premium workflow — not a forever monthly bill.
            </p>
            <ul className="mt-6 space-y-3">
              {premiumFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-container" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-sm text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-white/70 bg-white/70 px-5 py-4 text-sm text-slate-700">
              Premium is for heavier-lift financial work, not for access to the basics.
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/products/asset-divider" className="inline-flex items-center justify-center rounded-2xl bg-primary-container px-8 py-4 font-semibold text-white transition-all hover:bg-primary active:scale-[0.98]">
                Explore premium analysis
              </Link>
              <Link href="/#products" className="inline-flex items-center justify-center rounded-2xl border-2 border-slate-300 px-8 py-4 font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-white">
                Explore free tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-3xl border border-[#E3BEB6] bg-[#FFEDE8] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-container">Always free</p>
              <h2 className="mt-3 font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">
                Estate planning is free
              </h2>
              <p className="mt-4 text-slate-700 max-w-2xl">
                Create a living trust, will, power of attorney, and healthcare directive without paying just to get the basics in place. No limited-time catch.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link href="/products/estate-planning" className="inline-flex items-center justify-center rounded-2xl bg-primary-container px-8 py-4 font-semibold text-white transition-all hover:bg-primary active:scale-[0.98]">
                Try it free
              </Link>
              <Link href="/products/estate-planning" className="inline-flex items-center justify-center rounded-2xl border-2 border-white bg-white/70 px-8 py-4 font-semibold text-slate-700 transition-all hover:bg-white">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">
            Want to hear when premium analysis launches?
          </h2>
          <p className="mt-4 text-slate-700">
            Leave your email for updates on deeper financial analysis features. The rest of the platform is built to stay free-first.
          </p>
          <div className="mt-8 max-w-xl mx-auto">
            <WaitlistForm product="LexyAlgo Premium Financial Valuation" accentColor="#B02700" accentHover="#861B00" compact />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-slate-400">
            LexyAlgo provides document preparation assistance and calculation tools only. It does not constitute legal advice. Consult a licensed attorney for legal guidance specific to your situation.
          </p>
        </div>
      </section>
    </>
  )
}
