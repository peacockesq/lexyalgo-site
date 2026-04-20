import Link from 'next/link'
import type { Metadata } from 'next'
import { WaitlistForm } from '@/components/WaitlistForm'
import { RealScreenshot } from '@/components/RealScreenshot'

export const metadata: Metadata = {
  title: 'LexyFiling — Coming Soon — LexyAlgo',
  description: 'LexyFiling is planned e-filing infrastructure for future LexyAlgo workflows. It is not built yet.',
}

export default function FilingPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-violet-light via-white to-white min-h-[70vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-violet uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-violet" />
                LexyFiling — Coming Soon
              </span>
              <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 mt-4 leading-tight">
                Filing is on the roadmap, not in production
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                LexyFiling is the planned e-filing layer for future LexyAlgo workflows, but we have not started building it yet. The public site should reflect that honestly.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/calculator"
                  className="inline-flex items-center justify-center bg-teal text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#12434D] transition-all shadow-lg shadow-teal/20 active:scale-[0.98]"
                >
                  Open calculators
                </Link>
                <Link href="/products/divorce"
                  className="inline-flex items-center justify-center border-2 border-slate-200 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all"
                >
                  View divorce forms alpha
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-violet/10 bg-white p-8 shadow-xl shadow-violet/10">
              <div className="inline-flex items-center gap-2 rounded-full bg-violet-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet">
                Coming Soon
              </div>
              <h2 className="mt-5 font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900">
                Not released yet
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                We have not started the e-filing build. For now, this page is a roadmap marker, not a live product entry point.
              </p>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto lg:max-w-none">
            {[
              { title: 'Court Submission Layer', desc: 'Future work to connect completed document sets to filing workflows.' },
              { title: 'Status Tracking', desc: 'Future visibility into acceptance, rejection, and processing.' },
              { title: 'State Rollout', desc: 'Will depend on court-specific filing rules and integrations.' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-violet-light flex items-center justify-center mx-auto mb-3">
                  <div className="w-3 h-3 rounded-full bg-violet" />
                </div>
                <h4 className="font-[family-name:var(--font-space)] font-bold text-slate-900 text-sm">{item.title}</h4>
                <p className="mt-1 text-xs text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RealScreenshot
        src="/screenshots/filing-app.png"
        alt="LexyFiling product concept preview"
        accentColor="#4B3D7A"
        label="Product Preview"
        url="filing.lexyalgo.com"
      />

      <section className="bg-peach py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900">Use what is live now</h2>
          <p className="mt-3 text-slate-700 max-w-lg mx-auto">Calculators are live, and Divorce Forms is in public alpha. LexyFiling stays marked coming soon until build work actually starts.</p>
          <div className="mt-8 max-w-md mx-auto text-left">
            <WaitlistForm product="LexyFiling" accentColor="#4B3D7A" accentHover="#342A57" />
          </div>
        </div>
      </section>
    </>
  )
}
