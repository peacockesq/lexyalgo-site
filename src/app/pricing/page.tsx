import Link from 'next/link'
import type { Metadata } from 'next'
import { WaitlistForm } from '@/components/WaitlistForm'

export const metadata: Metadata = {
  title: 'Pricing — LexyAlgo',
  description: 'Free calculators, live QDRO pricing, and honest rollout pricing for the rest of the LexyAlgo product line.',
}

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Start here for calculators, core planning tools, and estate-planning beta access.',
    features: [
      'Child support calculators (all states)',
      'Retirement division calculators',
      'Asset Divider preview access',
      'Future value timelines',
      'Coverture fraction calculations',
      'Plain-English explanations',
      'PDF export of calculations',
      'Estate planning beta access',
    ],
    cta: 'Start free',
    ctaHref: '/calculator',
    highlight: true,
    available: true,
  },
  {
    name: 'Premium valuation',
    price: 'TBD',
    period: '',
    description: 'Reserved for higher-complexity valuation workflows. We are not publishing a fixed public price until that release is final.',
    features: [
      'Everything in Free',
      'Advanced business and asset valuation workflows',
      'Premium retirement valuation tools',
      'Scenario comparison for higher-complexity assets',
      'Attorney-ready export packages',
      'Priority access to new valuation releases',
    ],
    cta: 'Join waitlist',
    ctaHref: '#waitlist',
    highlight: false,
    available: false,
  },
  {
    name: 'Co-Parent',
    price: 'TBD',
    period: '',
    description: 'Shared calendar, expenses, and communication for ongoing family coordination.',
    features: [
      'Parenting time calendar',
      'Expense tracking and splitting',
      'In-app messaging',
      'Holiday scheduling',
      'Decision tracking',
      'Document storage',
    ],
    cta: 'Explore product',
    ctaHref: '/products/co-parent',
    highlight: false,
    available: false,
  },
]

const estatePlanningUrl = 'https://doc.lexyalgo.com/interview?i=docassemble.EstatePlanning:data/questions/estate_planning.yml'

export default function PricingPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-space)] text-4xl font-bold text-slate-900 sm:text-5xl">
            Straightforward pricing, with free where it should be free
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
            Use calculators and estate-planning beta without paying for basic clarity. When a product has live pricing, we show it plainly. When it does not, we say that too.
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-8 mb-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.name}
              className={`rounded-2xl p-8 ${
                tier.highlight
                  ? 'bg-slate-950 text-white ring-2 ring-primary-container shadow-2xl shadow-primary-container/10'
                  : 'border border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-[family-name:var(--font-space)] text-xl font-bold">{tier.name}</h3>
                {!tier.available && (
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    tier.highlight ? 'bg-primary-container/20 text-[#FFB4A3]' : 'bg-slate-100 text-slate-600'
                  }`}>Coming soon</span>
                )}
                {tier.available && (
                  <span className="rounded-full bg-[#FFB4A3]/20 px-2.5 py-1 text-xs font-medium text-[#FFB4A3]">Available</span>
                )}
              </div>
              <div className="mt-4">
                <span className="font-[family-name:var(--font-space)] text-4xl font-bold">{tier.price}</span>
                {tier.period && <span className={`ml-1 text-sm ${tier.highlight ? 'text-slate-400' : 'text-slate-500'}`}>/{tier.period}</span>}
              </div>
              <p className={`mt-3 text-sm ${tier.highlight ? 'text-slate-300' : 'text-slate-600'}`}>{tier.description}</p>
              <ul className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg className={`h-5 w-5 flex-shrink-0 ${tier.highlight ? 'text-[#FFB4A3]' : 'text-primary-container'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className={`text-sm ${tier.highlight ? 'text-slate-300' : 'text-slate-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href={tier.ctaHref}
                  className={`block rounded-xl px-6 py-3 text-center font-semibold transition-all active:scale-[0.98] ${
                    tier.highlight
                      ? 'bg-primary-container text-white shadow-sm hover:bg-primary'
                      : tier.available
                        ? 'bg-primary-container text-white hover:bg-primary'
                        : 'border-2 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#E3BEB6] bg-[#FFEDE8] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-container">Free right now</p>
              <h2 className="mt-3 font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">
                Try LexyAlgo estate planning on Docassemble
              </h2>
              <p className="mt-4 max-w-2xl text-slate-700">
                Generate a living trust, will, power of attorney, and healthcare directive during beta at no cost. It is one of the clearest ways to experience the product today.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <a href={estatePlanningUrl} className="inline-flex items-center justify-center rounded-2xl bg-primary-container px-8 py-4 font-semibold text-white transition-all hover:bg-primary active:scale-[0.98]">
                Try it free
              </a>
              <Link href="/products/estate-planning" className="inline-flex items-center justify-center rounded-2xl border-2 border-white bg-white/70 px-8 py-4 font-semibold text-slate-700 transition-all hover:bg-white">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm font-semibold text-green-700">Available now</span>
          </div>
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">
            QDRO Generator
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
            Generate a Qualified Domestic Relations Order for retirement plan division in divorce. Supports nearly one million plans nationwide.
          </p>
        </div>
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl bg-slate-950 p-10 text-center text-white ring-2 ring-ember">
            <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">Available now</span>
            <div className="mt-6">
              <span className="font-[family-name:var(--font-space)] text-5xl font-bold">$100</span>
              <span className="ml-1 text-sm text-slate-400">per order</span>
            </div>
            <p className="mt-4 text-sm text-slate-300">
              One order, one flat price. Answer the intake questions and generate the document for your plan.
            </p>
            <ul className="mx-auto mt-6 max-w-xs space-y-3 text-left">
              {['Supports nearly 1 million plans', 'Defined benefit and defined contribution', 'Answer questions, get your order', 'Download as PDF'].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <svg className="h-5 w-5 flex-shrink-0 text-[#FFB4A3]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-sm text-slate-300">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a href="https://doc.lexyalgo.com" className="block rounded-xl bg-ember px-6 py-3 text-center font-semibold text-white transition-all hover:bg-[#861B00] active:scale-[0.98]">
                Generate a QDRO
              </a>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          <Link href="/products/qdro" className="text-ember hover:underline">Learn more about QDRO Generator →</Link>
        </p>
      </section>

      <section id="waitlist" className="bg-peach py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">Get notified when new paid tools launch</h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-700">Premium valuation tools and the full Co-Parent release are still coming soon. Join the waitlist for launch updates only.</p>
          <div className="mx-auto mt-8 max-w-xl">
            <WaitlistForm product="LexyAlgo Premium" accentColor="#B02700" accentHover="#861B00" compact />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs text-slate-400">
            LexyAlgo provides document preparation assistance and calculation tools only. It does not constitute legal advice. Consult a licensed attorney for legal guidance specific to your situation.
          </p>
        </div>
      </section>
    </>
  )
}
