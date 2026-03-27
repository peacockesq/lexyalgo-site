import Link from 'next/link'
import Image from 'next/image'
import { WaitlistForm } from '@/components/WaitlistForm'

const allProducts = [
  {
    name: 'Divorce Forms',
    description: 'Full uncontested divorce document generation. One guided intake → court-form-driven documents for your state. CT and CA launching first.',
    href: '/products/divorce',
    color: '#2B4580',
    lightBg: '#E8EEF8',
    icon: '📄',
    badge: 'Coming Soon',
    live: false,
  },
  {
    name: 'QDRO Services',
    description: 'Qualified Domestic Relations Order preparation — 33 plan-specific templates, attorney-prepared, flat-fee pricing. Already serving clients.',
    href: '/products/qdro',
    color: '#8B5E3C',
    lightBg: '#F5EDE5',
    icon: '📋',
    badge: 'Live',
    live: true,
  },
  {
    name: 'Support Calculator',
    description: 'Free child support and retirement division calculators — state-specific, future-value aware, plain-English explanations alongside every formula.',
    href: '/calculator',
    color: '#1E5F6C',
    lightBg: '#E4F3F6',
    icon: '📊',
    badge: 'Live',
    live: true,
  },
  {
    name: 'Asset Divider',
    description: 'Visual drag-and-drop property division with fairness scoring. Every trade-off framed as a gain, not a loss.',
    href: '/products/asset-divider',
    color: '#B02700',
    lightBg: '#FFEDE8',
    icon: '⚖️',
    badge: 'Coming Soon',
    live: false,
  },
  {
    name: 'Co-Parent',
    description: 'Shared calendar, expense tracking, and communication tools designed around positive parenting time — not conflict.',
    href: '/products/co-parent',
    color: '#2E6B4F',
    lightBg: '#E6F5EC',
    icon: '📅',
    badge: 'Coming Soon',
    live: false,
  },
  {
    name: 'Estate Planning',
    description: 'Generate your Living Trust, Will, Power of Attorney, and Healthcare Directive — free during beta.',
    href: '/products/estate-planning',
    color: '#7A5C1E',
    lightBg: '#FAF2DC',
    icon: '🛡️',
    badge: 'Free Beta',
    live: true,
  },
  {
    name: 'LexyFiling',
    description: 'E-filing integration that submits your completed documents directly to the court. No printing, no mailing, no courthouse lines.',
    href: '/products/filing',
    color: '#4B3D7A',
    lightBg: '#EDE9F8',
    icon: '📁',
    badge: 'Coming Soon',
    live: false,
  },
]

const trustBadges = [
  { label: '8-State Attorney', detail: 'Built by a licensed attorney' },
  { label: 'Court-Form Driven', detail: 'Uses actual court forms' },
  { label: 'Attorney-Built', detail: 'Licensed in 8 states' },
  { label: 'Free Calculators', detail: 'No account required' },
]

const steps = [
  { num: '01', title: 'Pick Your State', desc: 'Select your jurisdiction. We load that state\'s guidelines, formulas, and court-form requirements.' },
  { num: '02', title: 'Enter Your Numbers', desc: 'Income, overnights, retirement accounts — plain-English questions, no legal jargon.' },
  { num: '03', title: 'See the Full Picture', desc: 'Support calculations with future-value timelines. What $30K today means at age 62.' },
  { num: '04', title: 'Download Results', desc: 'Export calculation summaries as PDFs for your attorney, mediator, or records.' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero — Calculator-first */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-light/40 via-white to-peach/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-teal-light px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold text-teal">Live Now — Free Calculators</span>
            </div>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Divorce is hard.<br />
              <span className="text-teal">Your tools shouldn&rsquo;t be.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
              Free child support and retirement division calculators — built by an attorney licensed in 8 states. State-specific formulas, future-value timelines, and plain-English explanations. More tools coming soon.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/calculator"
                className="inline-flex items-center justify-center bg-teal text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#12434D] transition-all shadow-lg shadow-teal/20 hover:shadow-xl hover:shadow-teal/30 active:scale-[0.98]"
              >
                Try the Calculators — Free
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/products/divorce"
                className="inline-flex items-center justify-center border-2 border-slate-200 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                See What&rsquo;s Coming
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="text-center">
                <p className="font-[family-name:var(--font-space)] font-bold text-slate-900">{badge.label}</p>
                <p className="text-sm text-slate-500 mt-1">{badge.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live product — Calculator highlight */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-light px-3 py-1 rounded-full mb-4">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs font-semibold text-teal uppercase tracking-wider">Available Now</span>
              </div>
              <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-slate-900">
                Support &amp; Retirement Calculators
              </h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                State-specific child support guidelines. Retirement division with coverture fractions. Future value timelines that show what your money becomes — not just what it&rsquo;s worth today.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  'Child support guideline calculations by state',
                  'Retirement division with QDRO-ready numbers',
                  'Future value at ages 55, 62, and 67',
                  'Plain-English explanations alongside every formula',
                  'Export results as PDF',
                ].map((item) => (
                  <div key={item} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/calculator"
                className="inline-flex items-center justify-center mt-8 bg-teal text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#12434D] transition-all shadow-lg shadow-teal/20 active:scale-[0.98]"
              >
                Open Calculator
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200/60">
              <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 border-b border-slate-200">
                <div className="w-2 h-2 rounded-full bg-red-400/80" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                <div className="w-2 h-2 rounded-full bg-green-400/80" />
                <div className="ml-3 h-4 rounded bg-white border border-slate-200 flex items-center px-2 flex-1 max-w-[200px]">
                  <span className="text-[10px] text-slate-400">lexyalgo.com/calculator</span>
                </div>
              </div>
              <Image
                src="/screenshots/calculator-ct.png"
                alt="Connecticut child support calculator — state-specific guidelines and future-value timeline"
                width={800}
                height={600}
                className="w-full h-auto block"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works — dark section */}
      <section className="bg-slate-950 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-white">
              How it works
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Four steps from confused to confident. No law degree required.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="relative">
                <span className="font-[family-name:var(--font-space)] text-5xl font-bold text-slate-800">{step.num}</span>
                <h3 className="font-[family-name:var(--font-space)] text-lg font-bold text-white mt-4">{step.title}</h3>
                <p className="mt-2 text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All products */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-primary-container uppercase tracking-wider">The Platform</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-slate-900 mt-3">
              The full divorce &amp; legal toolkit
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Calculators and QDROs are live today. We&rsquo;re building a complete platform — from first document to final filing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map((product) => (
              <Link key={product.name} href={product.href}
                className="group relative bg-white rounded-2xl border border-slate-100 p-8 hover:shadow-lg hover:border-slate-200 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: product.lightBg }}>
                    {product.icon}
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    product.live ? 'bg-green-100 text-green-700' : 'bg-violet-100 text-violet-700'
                  }`}>
                    {product.badge}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-space)] text-xl font-bold text-slate-900 mt-5 group-hover:text-slate-700 transition-colors">
                  {product.name}
                </h3>
                <p className="mt-3 text-slate-600 leading-relaxed text-sm">{product.description}</p>
                <div className="mt-5 flex items-center text-sm font-semibold transition-colors" style={{ color: product.color }}>
                  {product.live ? 'Get started' : 'Join waitlist'}
                  <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* See it in action — product screenshots showcase */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold text-teal uppercase tracking-wider">Product Previews</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-slate-900 mt-3">
              See it in action
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We&rsquo;re building real tools, not slide decks. Here&rsquo;s what&rsquo;s taking shape.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* V2 App — Divorce Forms & Asset Divider */}
            <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200/80">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 border-b border-slate-200">
                <div className="w-2 h-2 rounded-full bg-red-400/80" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                <div className="w-2 h-2 rounded-full bg-green-400/80" />
                <div className="ml-2 h-4 rounded bg-white border border-slate-200 flex items-center px-2 flex-1 max-w-[200px]">
                  <span className="text-[10px] text-slate-400">app.lexyalgo.com</span>
                </div>
              </div>
              <Image
                src="/screenshots/v2-app-homepage.png"
                alt="LexyAlgo V2 App — Divorce Forms and Asset Divider"
                width={800}
                height={540}
                className="w-full h-auto block"
              />
              <div className="bg-white px-4 py-2 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-700">Divorce Forms &amp; Asset Divider</p>
              </div>
            </div>
            {/* Calculator */}
            <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200/80">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 border-b border-slate-200">
                <div className="w-2 h-2 rounded-full bg-red-400/80" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                <div className="w-2 h-2 rounded-full bg-green-400/80" />
                <div className="ml-2 h-4 rounded bg-white border border-slate-200 flex items-center px-2 flex-1 max-w-[200px]">
                  <span className="text-[10px] text-slate-400">lexyalgo.com/calculator</span>
                </div>
              </div>
              <Image
                src="/screenshots/calculator-ct.png"
                alt="Connecticut child support calculator"
                width={800}
                height={540}
                className="w-full h-auto block"
              />
              <div className="bg-white px-4 py-2 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-700">Support Calculator</p>
              </div>
            </div>
            {/* Co-Parent App */}
            <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200/80">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 border-b border-slate-200">
                <div className="w-2 h-2 rounded-full bg-red-400/80" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                <div className="w-2 h-2 rounded-full bg-green-400/80" />
                <div className="ml-2 h-4 rounded bg-white border border-slate-200 flex items-center px-2 flex-1 max-w-[200px]">
                  <span className="text-[10px] text-slate-400">kid.lexyalgo.com</span>
                </div>
              </div>
              <Image
                src="/screenshots/coparent-app.png"
                alt="Co-Parent App — login and dashboard at kid.lexyalgo.com"
                width={800}
                height={540}
                className="w-full h-auto block"
              />
              <div className="bg-white px-4 py-2 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-700">Co-Parent</p>
              </div>
            </div>
            {/* E-Filing App */}
            <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200/80">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 border-b border-slate-200">
                <div className="w-2 h-2 rounded-full bg-red-400/80" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                <div className="w-2 h-2 rounded-full bg-green-400/80" />
                <div className="ml-2 h-4 rounded bg-white border border-slate-200 flex items-center px-2 flex-1 max-w-[200px]">
                  <span className="text-[10px] text-slate-400">filing.lexyalgo.com</span>
                </div>
              </div>
              <Image
                src="/screenshots/filing-app.png"
                alt="LexyFiling E-Filing App — court submission portal"
                width={800}
                height={540}
                className="w-full h-auto block"
              />
              <div className="bg-white px-4 py-2 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-700">LexyFiling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Waitlist CTA */}
      <section className="bg-peach">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-slate-900">
            Get notified when new tools launch
          </h2>
          <p className="mt-4 text-lg text-slate-700 max-w-xl mx-auto">
            Free calculators are live today. Join the waitlist for Asset Divider, Co-Parent, document generation, and e-filing.
          </p>
          <div className="mt-8 max-w-xl mx-auto">
            <WaitlistForm product="LexyAlgo — All Products" accentColor="#B02700" accentHover="#861B00" compact />
          </div>
        </div>
      </section>
    </>
  )
}
