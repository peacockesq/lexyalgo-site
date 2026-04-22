import Link from 'next/link'
import type { Metadata } from 'next'
import { RealScreenshot } from '@/components/RealScreenshot'

export const metadata: Metadata = {
  title: 'Asset Divider Workspace — LexyAlgo',
  description: 'Visual asset division workspace with drag-and-drop allocation, balanced settlement guidance, and court-ready outputs.',
}

const WORKSPACE_URL = 'https://app.lexyalgo.com'

const features = [
  { title: 'Visual Asset Inventory', desc: 'See every asset and debt in one dashboard — house, cars, retirement, bank accounts, personal property.' },
  { title: 'Drag-and-Drop Division', desc: 'Allocate assets between parties with intuitive controls. Every move updates the balance view in real time.' },
  { title: 'Balanced Settlement Guidance', desc: 'Settlement parity percentage with a center snap line — not "who got more," but "how balanced is this?"' },
  { title: 'Court-Ready Documents', desc: 'Generate state-specific property settlement agreements, financial declarations, and asset schedules.' },
  { title: 'Retirement Division', desc: 'QDRO-ready calculations with future value projections. See what $30K today means at age 62.' },
  { title: 'PDF Export', desc: 'Download everything as court-formatted PDFs. Print, sign, file.' },
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
                Asset Divider Workspace
              </span>
              <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 mt-4 leading-tight">
                Divide property without the heartache
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                A visual workspace that turns the most stressful part of divorce, splitting everything you built together, into clear, balanced decisions. Every trade-off framed as a gain.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href={WORKSPACE_URL}
                  className="inline-flex items-center justify-center bg-ember text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#861B00] transition-all shadow-lg shadow-ember/20 active:scale-[0.98]"
                >
                  Open case workspace
                </a>
                <Link href="/calculator"
                  className="inline-flex items-center justify-center border-2 border-slate-200 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all"
                >
                  Open calculators
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-ember/10 bg-white p-8 shadow-xl shadow-ember/10">
              <div className="inline-flex items-center gap-2 rounded-full bg-ember-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ember">
                Workspace Access
              </div>
              <h2 className="mt-5 font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900">
                Open the real Asset Divider workspace
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Launch directly into the Asset Divider workspace from here instead of a testing or placeholder surface.
              </p>
              <a href={WORKSPACE_URL}
                className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-ember px-6 py-4 text-center font-semibold text-white transition-all hover:bg-[#861B00] active:scale-[0.98]"
              >
                Launch Asset Divider
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Product Screenshot */}
      <RealScreenshot
        src="/screenshots/v2-app-homepage.png"
        alt="LexyAlgo V2 App — asset division workspace"
        accentColor="#B02700"
        label="Product Preview"
        url="app.lexyalgo.com"
      />

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



      {/* Bottom CTA */}
      <section className="bg-peach py-16 sm:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">Open Asset Divider now</h2>
          <p className="mt-4 text-slate-700 max-w-lg mx-auto">Get into the real workspace for property division, allocation review, and attorney-ready outputs.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WORKSPACE_URL}
              className="inline-flex items-center justify-center bg-ember text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#861B00] transition-all shadow-lg shadow-ember/20 active:scale-[0.98]"
            >
              Open case workspace
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
