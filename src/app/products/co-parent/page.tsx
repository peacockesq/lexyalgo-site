import Link from 'next/link'
import type { Metadata } from 'next'
import { RealScreenshot } from '@/components/RealScreenshot'

export const metadata: Metadata = {
  title: 'Co-Parent — Public Alpha — LexyAlgo',
  description: 'Shared calendar, expense tracking, and communication tools designed around positive parenting time, now visible as a public alpha.',
}

const PUBLIC_ALPHA_URL = 'https://kid.lexyalgo.com/login'

const features = [
  { title: 'Shared Calendar', desc: 'Visual parenting time calendar showing both parents\' schedules in positive, distinct colors. See your time — not what you\'re "missing."' },
  { title: 'Expense Tracking', desc: 'Log and split child-related expenses as "contributions to [child\'s name]" — not payments to your ex.' },
  { title: 'Communication Hub', desc: 'In-app messaging that keeps everything documented and civil. No more he-said-she-said.' },
  { title: 'Holiday Scheduling', desc: 'Alternating holiday planner with preset templates. Your Thanksgiving ✅, their Christmas ✅, your spring break ✅.' },
  { title: 'Decision Tracking', desc: 'Medical, educational, and extracurricular decisions framed as "areas where you lead" — not "areas you control."' },
  { title: 'Document Storage', desc: 'Upload and share school records, medical info, and activity schedules. Both parents, one source of truth.' },
]

export default function CoParentPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-sage-light via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-sage uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-sage" />
                Co-Parent — Public Alpha
              </span>
              <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 mt-4 leading-tight">
                Parenting together, separately
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                A co-parenting platform built around positive parenting time, not conflict. It is now visible as a public alpha, with shared calendars, expense tracking, and communication tools that keep the focus on your children.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href={PUBLIC_ALPHA_URL}
                  className="inline-flex items-center justify-center bg-sage text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#1F4D38] transition-all shadow-lg shadow-sage/20 active:scale-[0.98]"
                >
                  Open Public Alpha
                </a>
                <Link href="/calculator"
                  className="inline-flex items-center justify-center border-2 border-slate-200 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all"
                >
                  Open calculators
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-sage/10 bg-white p-8 shadow-xl shadow-sage/10">
              <div className="inline-flex items-center gap-2 rounded-full bg-sage-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sage">
                Public Alpha Access
              </div>
              <h2 className="mt-5 font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900">
                Co-Parent is exposed from the site
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Visitors can now reach the current co-parenting alpha directly from the product page instead of hitting a waitlist wall first.
              </p>
              <a href={PUBLIC_ALPHA_URL}
                className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-sage px-6 py-4 text-center font-semibold text-white transition-all hover:bg-[#1F4D38] active:scale-[0.98]"
              >
                Launch Co-Parent Alpha
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Product Screenshot */}
      <RealScreenshot
        src="/screenshots/coparent-app.png"
        alt="Co-Parent App — login and sidebar navigation at kid.lexyalgo.com"
        accentColor="#2E6B4F"
        label="Product Preview"
        url="kid.lexyalgo.com"
      />

      {/* Positive framing callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-sage-light rounded-2xl p-8 sm:p-12 border border-sage/10">
          <div className="flex gap-4 items-start">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-[family-name:var(--font-space)] font-bold text-slate-900 text-lg">Why &ldquo;parenting time,&rdquo; not &ldquo;custody&rdquo;</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">
                Research shows that framing matters. We never use &ldquo;losing time with children&rdquo; — because both parents gain parenting time. The calendar shows two positive, color-coded schedules. Expense sharing is framed as &ldquo;contributions to your child&rdquo; — not payments to an ex. This isn&rsquo;t just feel-good language; it measurably reduces conflict.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900 text-center mb-16">What&rsquo;s coming</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-sage" />
                </div>
                <h3 className="font-[family-name:var(--font-space)] font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-peach py-16 sm:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">Test Co-Parent now</h2>
          <p className="mt-4 text-slate-700 max-w-lg mx-auto">The current alpha is reachable from the site. Open it, log in, and pressure-test the parenting workflow.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PUBLIC_ALPHA_URL}
              className="inline-flex items-center justify-center bg-sage text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#1F4D38] transition-all shadow-lg shadow-sage/20 active:scale-[0.98]"
            >
              Open Public Alpha
            </a>
            <Link href="/contact"
              className="inline-flex items-center justify-center border-2 border-slate-300 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:border-slate-400 hover:bg-white transition-all"
            >
              Send feedback
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
