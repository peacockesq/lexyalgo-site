import Link from 'next/link'
import type { Metadata } from 'next'
import { WaitlistForm } from '@/components/WaitlistForm'
import { RealScreenshot } from '@/components/RealScreenshot'

export const metadata: Metadata = {
  title: 'Co-Parent — Coming Soon — LexyAlgo',
  description: 'Shared calendar, expense tracking, and communication tools designed around positive parenting time. Coming soon.',
}

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
                Co-Parent — Coming Soon
              </span>
              <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 mt-4 leading-tight">
                Parenting together, separately
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                A co-parenting platform built around positive parenting time — not conflict. Shared calendars, expense tracking, and communication tools that keep the focus on your children.
              </p>
              <div className="mt-6">
                <Link href="/calculator"
                  className="inline-flex items-center text-sm font-semibold text-teal hover:underline"
                >
                  Try our free calculators while you wait →
                </Link>
              </div>
            </div>
            <WaitlistForm product="Co-Parent" accentColor="#2E6B4F" accentHover="#1F4D38" />
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
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">Don&rsquo;t miss the launch</h2>
          <p className="mt-4 text-slate-700 max-w-lg mx-auto">Join the waitlist and be first to co-parent with better tools.</p>
          <div className="mt-8 max-w-xl mx-auto">
            <WaitlistForm product="Co-Parent" accentColor="#2E6B4F" accentHover="#1F4D38" compact />
          </div>
        </div>
      </section>
    </>
  )
}
