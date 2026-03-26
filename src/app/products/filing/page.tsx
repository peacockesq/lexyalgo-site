import Link from 'next/link'
import type { Metadata } from 'next'
import { WaitlistForm } from '@/components/WaitlistForm'

export const metadata: Metadata = {
  title: 'LexyFiling — Coming Soon — LexyAlgo',
  description: 'E-filing integration that submits your completed divorce documents directly to the court.',
}

export default function FilingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-light via-white to-white min-h-[70vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-violet uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-violet" />
                LexyFiling — Coming Soon
              </span>
              <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 mt-4 leading-tight">
                File without the courthouse
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                E-filing integration that takes your completed LexyAlgo documents and submits them directly to the court. No printing, no mailing, no waiting in line.
              </p>
              <div className="mt-6">
                <Link href="/calculator"
                  className="inline-flex items-center text-sm font-semibold text-teal hover:underline"
                >
                  Try our free calculators while you wait →
                </Link>
              </div>
            </div>
            <WaitlistForm product="LexyFiling" accentColor="#4B3D7A" accentHover="#342A57" />
          </div>

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto lg:max-w-none">
            {[
              { title: 'Direct Filing', desc: 'Submit to court e-filing systems without leaving LexyAlgo.' },
              { title: 'Status Tracking', desc: 'Track acceptance, rejection, and processing in real time.' },
              { title: 'Multi-State', desc: 'Support for courts across all states where LexyAlgo operates.' },
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

      {/* CTA */}
      <section className="bg-peach py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900">In the meantime</h2>
          <p className="mt-3 text-slate-700 max-w-lg mx-auto">Start running your support calculations — free, no account required.</p>
          <Link href="/calculator"
            className="inline-flex items-center justify-center mt-6 bg-teal text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#12434D] transition-all shadow-lg shadow-teal/20 active:scale-[0.98]"
          >
            Try the Calculator
          </Link>
        </div>
      </section>
    </>
  )
}
