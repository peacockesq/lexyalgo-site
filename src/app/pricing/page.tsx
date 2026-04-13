import Link from 'next/link'
import type { Metadata } from 'next'
import { WaitlistForm } from '@/components/WaitlistForm'

export const metadata: Metadata = {
  title: 'Pricing — LexyAlgo',
  description: 'Free tier for calculators, Asset Divider, and estate planning beta. Premium reserved for valuation tools and deeper analysis.',
}

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'The core LexyAlgo access tier for people who need clarity before they need expensive help.',
    features: [
      'Child support calculators (all states)',
      'Retirement division calculators',
      'Asset Divider access',
      'Future value timelines',
      'Coverture fraction calculations',
      'Plain-English explanations',
      'PDF export of calculations',
      'Estate planning beta access',
    ],
    cta: 'Start Free',
    ctaHref: '/calculator',
    highlight: true,
    available: true,
  },
  {
    name: 'Premium Valuation',
    price: '$50+',
    period: 'starting price',
    description: 'Reserved for valuation-heavy workflows where deeper financial analysis creates real value.',
    features: [
      'Everything in Free',
      'Advanced business / asset valuation workflows',
      'Premium retirement valuation tools',
      'Scenario comparison for higher-complexity assets',
      'Attorney-ready export packages',
      'Priority access to new valuation releases',
    ],
    cta: 'Join Waitlist',
    ctaHref: '#waitlist',
    highlight: false,
    available: false,
  },
  {
    name: 'Co-Parent',
    price: 'TBD',
    period: '',
    description: 'Shared calendar, expenses, and communication — a separate product track for ongoing family coordination.',
    features: [
      'Parenting time calendar',
      'Expense tracking & splitting',
      'In-app messaging',
      'Holiday scheduling',
      'Decision tracking',
      'Document storage',
    ],
    cta: 'Contact Us',
    ctaHref: '/contact',
    highlight: false,
    available: false,
  },
]

const estatePlanningUrl = 'https://doc.lexyalgo.com/interview?i=docassemble.EstatePlanning:data/questions/estate_planning.yml'

export default function PricingPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900">
            Simple pricing that starts with free
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Asset Divider is now in the free tier. Premium is reserved for valuation tools and deeper analysis — not for basic access to clarity.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div key={tier.name}
              className={`rounded-2xl p-8 ${
                tier.highlight
                  ? 'bg-slate-950 text-white ring-2 ring-primary-container shadow-2xl shadow-primary-container/10'
                  : 'bg-white border border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-[family-name:var(--font-space)] font-bold text-xl">{tier.name}</h3>
                {!tier.available && (
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    tier.highlight ? 'bg-primary-container/20 text-[#FFB4A3]' : 'bg-slate-100 text-slate-600'
                  }`}>Coming Soon</span>
                )}
                {tier.available && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#FFB4A3]/20 text-[#FFB4A3]">Available</span>
                )}
              </div>
              <div className="mt-4">
                <span className="font-[family-name:var(--font-space)] text-4xl font-bold">{tier.price}</span>
                {tier.period && <span className={`ml-1 text-sm ${tier.highlight ? 'text-slate-400' : 'text-slate-500'}`}>/{tier.period}</span>}
              </div>
              <p className={`mt-3 text-sm ${tier.highlight ? 'text-slate-300' : 'text-slate-600'}`}>{tier.description}</p>
              <ul className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-3 items-start">
                    <svg className={`w-5 h-5 flex-shrink-0 ${tier.highlight ? 'text-[#FFB4A3]' : 'text-primary-container'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className={`text-sm ${tier.highlight ? 'text-slate-300' : 'text-slate-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                {tier.available ? (
                  <Link href={tier.ctaHref}
                    className="block text-center font-semibold py-3 px-6 rounded-xl transition-all active:scale-[0.98] bg-primary-container text-white hover:bg-primary shadow-sm"
                  >
                    {tier.cta}
                  </Link>
                ) : (
                  <Link href={tier.ctaHref}
                    className={`block text-center font-semibold py-3 px-6 rounded-xl transition-all active:scale-[0.98] ${
                      tier.highlight
                        ? 'bg-primary-container text-white hover:bg-primary'
                        : 'border-2 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-3xl border border-[#E3BEB6] bg-[#FFEDE8] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-container">Prominently free right now</p>
              <h2 className="mt-3 font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">
                Try LexyAlgo estate planning on Docassemble
              </h2>
              <p className="mt-4 text-slate-700 max-w-2xl">
                Generate a living trust, will, power of attorney, and healthcare directive during beta at no cost. It&rsquo;s one of the fastest ways to experience the platform today.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <a href={estatePlanningUrl} className="inline-flex items-center justify-center rounded-2xl bg-primary-container px-8 py-4 font-semibold text-white transition-all hover:bg-primary active:scale-[0.98]">
                Try it now free
              </a>
              <Link href="/products/estate-planning" className="inline-flex items-center justify-center rounded-2xl border-2 border-white bg-white/70 px-8 py-4 font-semibold text-slate-700 transition-all hover:bg-white">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm font-semibold text-green-700">Available Now</span>
          </div>
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">
            QDRO Generator
          </h2>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
            Generate a Qualified Domestic Relations Order for retirement plan division in divorce. Supports nearly one million plans nationwide.
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <div className="rounded-2xl bg-slate-950 text-white p-10 text-center ring-2 ring-ember">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700">Available Now</span>
            <div className="mt-6">
              <span className="font-[family-name:var(--font-space)] text-5xl font-bold">$100</span>
              <span className="ml-1 text-sm text-slate-400">per order</span>
            </div>
            <p className="mt-4 text-slate-300 text-sm">
              Answer the intake questions, we generate the order for your retirement plan.
            </p>
            <ul className="mt-6 space-y-3 text-left max-w-xs mx-auto">
              {['Supports nearly 1 million plans', 'Defined benefit & defined contribution', 'Answer questions, get your order', 'Download as PDF'].map((f) => (
                <li key={f} className="flex gap-3 items-start">
                  <svg className="w-5 h-5 flex-shrink-0 text-[#FFB4A3]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-sm text-slate-300">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a href="https://doc.lexyalgo.com" className="block text-center font-semibold py-3 px-6 rounded-xl bg-ember text-white hover:bg-[#861B00] transition-all active:scale-[0.98]">
                Generate a QDRO
              </a>
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-slate-500 mt-6">
          <Link href="/products/qdro" className="text-ember hover:underline">Learn more about QDRO Generator →</Link>
        </p>
      </section>

      <section id="waitlist" className="bg-peach py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">Get notified at launch</h2>
          <p className="mt-4 text-slate-700 max-w-lg mx-auto">Premium valuation tools and Co-Parent are coming soon. Join the waitlist — no spam, just launch updates.</p>
          <div className="mt-8 max-w-xl mx-auto">
            <WaitlistForm product="LexyAlgo Premium" accentColor="#B02700" accentHover="#861B00" compact />
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
