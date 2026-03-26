import Link from 'next/link'
import type { Metadata } from 'next'
import { WaitlistForm } from '@/components/WaitlistForm'

export const metadata: Metadata = {
  title: 'Asset Divider — Coming Soon — LexyAlgo',
  description: 'Visual asset division with drag-and-drop allocation, fairness scoring, and behavioral design. Coming soon.',
}

const features = [
  { title: 'Visual Asset Inventory', desc: 'See every asset and debt in one dashboard — house, cars, retirement, bank accounts, personal property.' },
  { title: 'Drag-and-Drop Division', desc: 'Allocate assets between parties with intuitive controls. Every move updates the fairness score in real time.' },
  { title: 'Fairness Indicator', desc: 'Settlement parity percentage with a center snap line — not "who got more," but "how balanced is this?"' },
  { title: 'Court-Ready Documents', desc: 'Generate state-specific property settlement agreements, financial declarations, and asset schedules.' },
  { title: 'Retirement Division', desc: 'QDRO-ready calculations with future value projections. See what $30K today means at age 62.' },
  { title: 'PDF Export', desc: 'Download everything as court-formatted PDFs. Print, sign, file.' },
]

const behavioralHighlights = [
  { title: 'Hedonic Editing', desc: 'Losses are bundled into one net settlement figure. Gains are itemised with individual checkmarks. You see what you\'re receiving, not what you\'re losing.', icon: '📋' },
  { title: '"How to Explain This" Cards', desc: 'Every scenario includes a plain-English script: "I traded X for Y, which is worth more because Z." No competitor does this.', icon: '💬' },
  { title: 'Future Value Timelines', desc: 'Don\'t just see present value. See animated growth curves showing what retirement assets become at 55, 62, and 67.', icon: '📈' },
]

export default function AssetDividerPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-ember-light via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-ember uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-ember" />
                Asset Divider — Coming Soon
              </span>
              <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 mt-4 leading-tight">
                Divide property without the heartache
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                A visual workspace that turns the most stressful part of divorce — splitting everything you built together — into clear, fair decisions. Every trade-off framed as a gain.
              </p>
              <div className="mt-6">
                <Link href="/calculator"
                  className="inline-flex items-center text-sm font-semibold text-teal hover:underline"
                >
                  Try our free calculators while you wait →
                </Link>
              </div>
            </div>
            <WaitlistForm product="Asset Divider" accentColor="#B02700" accentHover="#861B00" />
          </div>
        </div>
      </section>

      {/* Screenshot placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-20">
        <div className="bg-[#B02700] rounded-2xl aspect-[16/9] sm:aspect-[2.2/1] flex items-center justify-center shadow-2xl shadow-ember/10">
          <div className="text-center p-8">
            <p className="text-white/80 text-lg font-medium font-[family-name:var(--font-space)]">Asset Division Workspace</p>
            <p className="text-white/50 text-sm mt-2">Drag-and-drop interface with fairness indicator and live equity calculations</p>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900 text-center mb-16">What&rsquo;s coming</h2>
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

      {/* Behavioral design section */}
      <section className="bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-[#FFB4A3] uppercase tracking-wider">Behavioral Design</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-white mt-3">
              Built on how people actually decide
            </h2>
            <p className="mt-4 text-slate-400">
              Every screen asks: &ldquo;What bias is the user feeling right now, and how do I reframe the information to help?&rdquo;
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {behavioralHighlights.map((h) => (
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
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">Don&rsquo;t miss the launch</h2>
          <p className="mt-4 text-slate-700 max-w-lg mx-auto">Join the waitlist and be first to divide property with confidence.</p>
          <div className="mt-8 max-w-xl mx-auto">
            <WaitlistForm product="Asset Divider" accentColor="#B02700" accentHover="#861B00" compact />
          </div>
        </div>
      </section>
    </>
  )
}
