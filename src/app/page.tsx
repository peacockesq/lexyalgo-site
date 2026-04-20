import Link from 'next/link'
import Image from 'next/image'
import { WaitlistForm } from '@/components/WaitlistForm'

const divorceProducts = [
  {
    name: 'Divorce Forms',
    description: 'Full uncontested divorce document generation is now public alpha. One guided intake leads to court-form-driven documents for your state, with CT and CA first.',
    href: '/products/divorce',
    color: '#2B4580',
    lightBg: '#E8EEF8',
    icon: '📄',
    badge: 'Public Alpha',
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
    name: 'Calculators',
    description: 'Free child support and retirement division calculators with state-specific logic, future-value context, and plain-English explanations.',
    href: '/calculator',
    color: '#1E5F6C',
    lightBg: '#E4F3F6',
    icon: '📊',
    badge: 'Live',
    live: true,
  },
  {
    name: 'Asset Divider',
    description: 'Visual drag-and-drop property division with fairness scoring, now exposed on the site as a public alpha.',
    href: '/products/asset-divider',
    color: '#B02700',
    lightBg: '#FFEDE8',
    icon: '⚖️',
    badge: 'Public Alpha',
    live: false,
  },
  {
    name: 'Co-Parent',
    description: 'Shared calendar, expense tracking, and communication tools designed around positive parenting time, now visible as a public alpha.',
    href: '/products/co-parent',
    color: '#2E6B4F',
    lightBg: '#E6F5EC',
    icon: '📅',
    badge: 'Public Alpha',
    live: false,
  },
  {
    name: 'LexyFiling',
    description: 'E-filing integration is planned, but not started yet. It stays on the roadmap as a coming-soon product.',
    href: '/products/filing',
    color: '#4B3D7A',
    lightBg: '#EDE9F8',
    icon: '📁',
    badge: 'Coming Soon',
    live: false,
  },
]

const estatePlanningProduct = {
  name: 'Estate Planning',
  description: 'Generate your Living Trust, Will, Power of Attorney, and Healthcare Directive with the same plain-English guidance — free during beta.',
  href: '/products/estate-planning',
  color: '#7A5C1E',
  lightBg: '#FAF2DC',
  icon: '🛡️',
  badge: 'Free Beta',
}

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

function ProductCard({
  product,
}: {
  product: {
    name: string
    description: string
    href: string
    color: string
    lightBg: string
    icon: string
    badge: string
    live: boolean
  }
}) {
  return (
    <Link
      href={product.href}
      className="group relative rounded-2xl border border-slate-100 bg-white p-8 transition-all duration-300 hover:border-slate-200 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl" style={{ backgroundColor: product.lightBg }}>
          {product.icon}
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${product.live ? 'bg-green-100 text-green-700' : product.badge === 'Free Beta' ? 'bg-amber-100 text-amber-700' : product.badge === 'Public Alpha' ? 'bg-sky-100 text-sky-700' : 'bg-violet-100 text-violet-700'}`}>
          {product.badge}
        </span>
      </div>
      <h3 className="mt-5 font-[family-name:var(--font-space)] text-xl font-bold text-slate-900 transition-colors group-hover:text-slate-700">
        {product.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{product.description}</p>
      <div className="mt-5 flex items-center text-sm font-semibold transition-colors" style={{ color: product.color }}>
        {product.live ? 'Get started' : product.badge === 'Public Alpha' ? 'Open public alpha' : product.badge === 'Free Beta' ? 'Open free beta' : 'Learn more'}
        <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </div>
    </Link>
  )
}

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-light/40 via-white to-peach/20" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-teal-light px-4 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-sm font-semibold text-teal">Live Now — Free Calculators</span>
            </div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-1.5 text-sky-700">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              <span className="text-sm font-semibold">Public alpha across the broader platform</span>
            </div>
            <h1 className="font-[family-name:var(--font-space)] text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Divorce is hard.<br />
              <span className="text-teal">Your tools shouldn&rsquo;t be.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              Free child support and retirement division calculators are live now. The broader platform is public alpha, so visitors can see what is shipping next while we tighten the workflows in public.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#products"
                className="inline-flex items-center justify-center rounded-2xl bg-primary-container px-8 py-4 font-semibold text-white shadow-lg shadow-primary-container/20 transition-all hover:bg-primary hover:shadow-xl hover:shadow-primary-container/30 active:scale-[0.98]"
              >
                Find your solution
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center rounded-2xl border-2 border-slate-200 px-8 py-4 font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
              >
                Open calculators
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="text-center">
                <p className="font-[family-name:var(--font-space)] font-bold text-slate-900">{badge.label}</p>
                <p className="mt-1 text-sm text-slate-500">{badge.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-light px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-teal">Available Now</span>
            </div>
            <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900 sm:text-4xl">
              Support &amp; Retirement Calculators
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
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
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal/10">
                    <svg className="h-3 w-3 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            <Link
              href="/calculator"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-teal px-8 py-4 font-semibold text-white shadow-lg shadow-teal/20 transition-all hover:bg-[#12434D] active:scale-[0.98]"
            >
              Open calculators
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-slate-200/60">
            <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-4 py-2">
              <div className="h-2 w-2 rounded-full bg-red-400/80" />
              <div className="h-2 w-2 rounded-full bg-yellow-400/80" />
              <div className="h-2 w-2 rounded-full bg-green-400/80" />
              <div className="ml-3 flex h-4 max-w-[200px] flex-1 items-center rounded border border-slate-200 bg-white px-2">
                <span className="text-[10px] text-slate-400">lexyalgo.com/calculator</span>
              </div>
            </div>
            <Image
              src="/screenshots/calculator-ct.png"
              alt="Connecticut child support calculator — state-specific guidelines and future-value timeline"
              width={800}
              height={600}
              className="block h-auto w-full"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-white sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Four steps from confused to confident. No law degree required.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.num} className="relative">
                <span className="font-[family-name:var(--font-space)] text-5xl font-bold text-slate-800">{step.num}</span>
                <h3 className="mt-4 font-[family-name:var(--font-space)] text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-container">The Platform</span>
            <h2 className="mt-3 font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900 sm:text-4xl">
              Find the right path for your legal work
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Calculators and QDROs are live today. Divorce Forms, Asset Divider, and Co-Parent are shown publicly as alpha surfaces while we keep shipping. LexyFiling remains a coming-soon roadmap item.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50/70 p-6 sm:p-8">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">Divorce &amp; family law</span>
              <h3 className="mt-3 font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900 sm:text-3xl">
                One place for forms, calculations, negotiation, and filing
              </h3>
              <p className="mt-3 text-slate-600">
                Start with calculators, move into QDRO work, then keep going through documents, asset division, co-parenting, and filing.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {divorceProducts.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-[color:rgba(122,92,30,.18)] bg-[color:rgba(122,92,30,.06)]">
            <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-[color:#7A5C1E]">Estate planning</span>
                <h3 className="mt-3 font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900 sm:text-3xl">
                  A separate lane for wills, trusts, and directives
                </h3>
                <p className="mt-4 max-w-2xl text-slate-700">
                  Estate planning isn&rsquo;t a divorce add-on. It&rsquo;s its own product line for families who need trusts, wills, powers of attorney, and healthcare directives handled cleanly.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-700">
                  {['Living Trust', 'Will', 'Power of Attorney', 'Healthcare Directive'].map((item) => (
                    <span key={item} className="rounded-full border border-[color:rgba(122,92,30,.2)] bg-white/80 px-3 py-1.5">
                      {item}
                    </span>
                  ))}
                </div>
                <Link
                  href={estatePlanningProduct.href}
                  className="mt-8 inline-flex items-center justify-center rounded-2xl bg-[color:#7A5C1E] px-6 py-3 font-semibold text-white transition-colors hover:bg-[color:#573F0E] active:scale-[0.98]"
                >
                  Explore estate planning
                </Link>
              </div>

              <div className="rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl" style={{ backgroundColor: estatePlanningProduct.lightBg }}>
                    {estatePlanningProduct.icon}
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                    {estatePlanningProduct.badge}
                  </span>
                </div>
                <h4 className="mt-5 font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900">
                  {estatePlanningProduct.name}
                </h4>
                <p className="mt-3 leading-relaxed text-slate-600">
                  {estatePlanningProduct.description}
                </p>
                <div className="mt-6 border-l-4 border-[color:#7A5C1E] bg-[color:rgba(122,92,30,.08)] px-4 py-3 text-sm text-slate-700">
                  Free beta access is live now, with the same plain-English clarity and guided workflow as the rest of LexyAlgo.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-teal">Product Previews</span>
            <h2 className="mt-3 font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900 sm:text-4xl">
              See it in action
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We&rsquo;re building real tools, not slide decks. Here&rsquo;s what&rsquo;s taking shape.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200/80">
              <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-red-400/80" />
                <div className="h-2 w-2 rounded-full bg-yellow-400/80" />
                <div className="h-2 w-2 rounded-full bg-green-400/80" />
                <div className="ml-2 flex h-4 max-w-[200px] flex-1 items-center rounded border border-slate-200 bg-white px-2">
                  <span className="text-[10px] text-slate-400">app.lexyalgo.com</span>
                </div>
              </div>
              <Image
                src="/screenshots/v2-app-homepage.png"
                alt="LexyAlgo V2 App — Divorce Forms and Asset Divider"
                width={800}
                height={540}
                className="block h-auto w-full"
              />
              <div className="border-t border-slate-100 bg-white px-4 py-2">
                <p className="text-xs font-semibold text-slate-700">Divorce Forms &amp; Asset Divider</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200/80">
              <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-red-400/80" />
                <div className="h-2 w-2 rounded-full bg-yellow-400/80" />
                <div className="h-2 w-2 rounded-full bg-green-400/80" />
                <div className="ml-2 flex h-4 max-w-[200px] flex-1 items-center rounded border border-slate-200 bg-white px-2">
                  <span className="text-[10px] text-slate-400">lexyalgo.com/calculator</span>
                </div>
              </div>
              <Image
                src="/screenshots/calculator-ct.png"
                alt="Connecticut child support calculator"
                width={800}
                height={540}
                className="block h-auto w-full"
              />
              <div className="border-t border-slate-100 bg-white px-4 py-2">
                <p className="text-xs font-semibold text-slate-700">Calculators</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200/80">
              <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-red-400/80" />
                <div className="h-2 w-2 rounded-full bg-yellow-400/80" />
                <div className="h-2 w-2 rounded-full bg-green-400/80" />
                <div className="ml-2 flex h-4 max-w-[200px] flex-1 items-center rounded border border-slate-200 bg-white px-2">
                  <span className="text-[10px] text-slate-400">kid.lexyalgo.com</span>
                </div>
              </div>
              <Image
                src="/screenshots/coparent-app.png"
                alt="Co-Parent App — login and dashboard at kid.lexyalgo.com"
                width={800}
                height={540}
                className="block h-auto w-full"
              />
              <div className="border-t border-slate-100 bg-white px-4 py-2">
                <p className="text-xs font-semibold text-slate-700">Co-Parent</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200/80">
              <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-red-400/80" />
                <div className="h-2 w-2 rounded-full bg-yellow-400/80" />
                <div className="h-2 w-2 rounded-full bg-green-400/80" />
                <div className="ml-2 flex h-4 max-w-[200px] flex-1 items-center rounded border border-slate-200 bg-white px-2">
                  <span className="text-[10px] text-slate-400">filing.lexyalgo.com</span>
                </div>
              </div>
              <Image
                src="/screenshots/filing-app.png"
                alt="LexyFiling E-Filing App — court submission portal"
                width={800}
                height={540}
                className="block h-auto w-full"
              />
              <div className="border-t border-slate-100 bg-white px-4 py-2">
                <p className="text-xs font-semibold text-slate-700">LexyFiling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-peach">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900 sm:text-4xl">
            Explore the platform as it ships
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-700">
            Free calculators are live today. Divorce Forms, Asset Divider, and Co-Parent are exposed on the main site for public testing, while LexyFiling stays marked coming soon.
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <WaitlistForm product="LexyAlgo — All Products" accentColor="#B02700" accentHover="#861B00" compact />
          </div>
        </div>
      </section>
    </>
  )
}
