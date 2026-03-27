import Link from 'next/link'
import type { Metadata } from 'next'
import { WaitlistForm } from '@/components/WaitlistForm'

export const metadata: Metadata = {
  title: 'Pricing — LexyAlgo',
  description: 'Free calculators. Premium document generation. Co-parenting tools. See LexyAlgo pricing.',
}

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to understand your numbers.',
    features: [
      'Child support calculators (all states)',
      'Retirement division calculators',
      'Future value timelines',
      'Coverture fraction calculations',
      'Plain-English explanations',
      'PDF export of calculations',
    ],
    cta: 'Start Calculating',
    ctaHref: '/calculator',
    highlight: false,
    available: true,
  },
  {
    name: 'Premium',
    price: '$50',
    period: 'one-time',
    description: 'Full document generation and asset division tools.',
    features: [
      'Everything in Free',
      'Asset inventory dashboard',
      'Drag-and-drop property division',
      'Fairness scoring',
      'Court-ready document generation',
      'Unlimited assets & debts',
      'PDF export of all documents',
      '"How to explain this" cards',
    ],
    cta: 'Join Waitlist',
    ctaHref: '#waitlist',
    highlight: true,
    available: false,
  },
  {
    name: 'Co-Parent',
    price: 'TBD',
    period: '',
    description: 'Shared calendar, expenses, and communication.',
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

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface to-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900">
            Simple, honest pricing
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Free calculators — no account required. Premium tools when you&rsquo;re ready.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div key={tier.name}
              className={`rounded-2xl p-8 ${
                tier.highlight
                  ? 'bg-slate-950 text-white ring-2 ring-primary-container'
                  : 'bg-white border border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-[family-name:var(--font-space)] font-bold text-xl">{tier.name}</h3>
                {!tier.available && (
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    tier.highlight ? 'bg-primary-container/20 text-[#FFB4A3]' : 'bg-slate-100 text-slate-600'
                  }`}>Coming Soon</span>
                )}
                {tier.available && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700">Available</span>
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
                    <svg className={`w-5 h-5 flex-shrink-0 ${tier.highlight ? 'text-[#FFB4A3]' : 'text-teal'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className={`text-sm ${tier.highlight ? 'text-slate-300' : 'text-slate-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                {tier.available ? (
                  <Link href={tier.ctaHref}
                    className="block text-center font-semibold py-3 px-6 rounded-xl transition-all active:scale-[0.98] bg-teal text-white hover:bg-[#12434D] shadow-sm"
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

      {/* QDRO pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm font-semibold text-green-700">Available Now</span>
          </div>
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">
            QDRO Services
          </h2>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
            Attorney-prepared Qualified Domestic Relations Orders. Flat-fee pricing, 33 plan-specific templates, revisions until approved.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Legal Pro Review',
              price: '$300',
              desc: 'For attorneys who draft their own QDROs — we review for plan compliance and TPA formatting.',
              features: ['Plan compliance review', 'TPA formatting check', 'Written feedback with corrections'],
              highlight: false,
            },
            {
              name: 'Flat Rate QDRO',
              price: '$900',
              desc: 'Full QDRO preparation for most private-sector retirement plans. One flat fee.',
              features: ['Full QDRO preparation', 'Plan-specific template', 'TPA-formatted', 'Pre-approval submission', 'Revisions until approved'],
              highlight: true,
            },
            {
              name: 'Federal / Military',
              price: '$1,200',
              desc: 'FERS, CSRS, military SBP — complex requirements handled correctly.',
              features: ['FERS / CSRS division', 'Military SBP orders', 'OPM / DFAS formatting', 'Revisions until approved'],
              highlight: false,
            },
          ].map((tier) => (
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
              <p className={`mt-3 text-sm ${tier.highlight ? 'text-slate-300' : 'text-slate-600'}`}>{tier.desc}</p>
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
        <p className="text-center text-sm text-slate-500 mt-6">
          <Link href="/products/qdro" className="text-ember hover:underline">Learn more about QDRO Services →</Link>
        </p>
      </section>

      {/* Waitlist section */}
      <section id="waitlist" className="bg-peach py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">Get notified at launch</h2>
          <p className="mt-4 text-slate-700 max-w-lg mx-auto">Premium and Co-Parent tools are coming soon. Join the waitlist — no spam, just launch updates.</p>
          <div className="mt-8 max-w-xl mx-auto">
            <WaitlistForm product="LexyAlgo Premium" accentColor="#B02700" accentHover="#861B00" compact />
          </div>
        </div>
      </section>

      {/* Disclaimer */}
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
