import Link from 'next/link'
import type { Metadata } from 'next'
import { WaitlistForm } from '@/components/WaitlistForm'
import { ProductScreenshots, divorceMockups } from '@/components/ProductScreenshots'

export const metadata: Metadata = {
  title: 'Divorce Forms — Coming Soon — LexyAlgo',
  description: 'Full uncontested divorce document generation. One guided intake → court-form-driven documents for your state. CT and CA launching first.',
}

const features = [
  { title: 'Court-Form-Mapped Documents', desc: 'Not generic templates — every document maps directly to your state\'s official court forms. The same forms the clerk expects to see.' },
  { title: 'CT Divorce: 5 Forms Generated', desc: 'All five Connecticut Judicial Branch forms generated automatically from one intake. No switching between forms, no re-entering data.' },
  { title: 'CA Divorce: 13 FL-Series Forms', desc: 'All 13 official California FL-series forms (FL-100 through FL-342) generated from a single guided questionnaire.' },
  { title: 'One Intake, All Forms Filled', desc: 'Answer questions once. Every form pulls from the same data — names, dates, assets, children — no redundant entry across documents.' },
  { title: 'Path A & Path B Workflows', desc: 'No children? Streamlined Path A. Children involved? Path B adds custody, support, and parenting plan documents automatically.' },
  { title: 'PDF Download + Plain English', desc: 'Download court-ready PDFs and get plain-English summaries explaining what every document says and why it matters.' },
]

const behavioralHighlights = [
  { title: '"How to Explain This" Cards', desc: 'Every generated document comes with a companion card: a plain-English explanation of what this document does, why it\'s needed, and how to explain it to your spouse, family, or mediator.', icon: '💬' },
  { title: 'Progress Over Overwhelm', desc: 'The intake is broken into small, completable steps. You see exactly where you are, what\'s next, and how much is left. No infinite scroll of legal questions.', icon: '📋' },
  { title: 'Confidence Through Transparency', desc: 'Every form shows which court requires it, what section of the law it satisfies, and what happens if it\'s missing. You understand your own paperwork.', icon: '🔍' },
]

export default function DivorcePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#E8EEF8] via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2B4580] uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2B4580]" />
                Divorce Forms — Coming Soon
              </span>
              <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 mt-4 leading-tight">
                One intake. Every form your court requires.
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Full uncontested divorce document generation — court-form-driven, not generic templates. One guided intake produces every document your state requires. Connecticut and California launching first, more states coming.
              </p>
              <div className="mt-6">
                <Link href="/calculator"
                  className="inline-flex items-center text-sm font-semibold text-teal hover:underline"
                >
                  Try our free calculators while you wait →
                </Link>
              </div>
            </div>
            <WaitlistForm product="Divorce Forms" accentColor="#2B4580" accentHover="#1C305A" />
          </div>
        </div>
      </section>

      {/* Product Screenshots */}
      <ProductScreenshots color="#2B4580" lightBg="#E8EEF8" mockups={divorceMockups} />

      {/* Features grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900 text-center mb-16">What&rsquo;s coming</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#E8EEF8] flex items-center justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#2B4580]" />
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
            <span className="text-sm font-semibold text-[#96B0D9] uppercase tracking-wider">Behavioral Design</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-white mt-3">
              Paperwork that makes sense
            </h2>
            <p className="mt-4 text-slate-400">
              Legal documents shouldn&rsquo;t feel like a foreign language. Every form comes with context, explanation, and a way to talk about it.
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

      {/* Disclaimer */}
      <section className="py-12 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-sm text-slate-600">
              <strong className="text-slate-900">Important:</strong> Document preparation tools, not a law firm. Generated documents should be reviewed before filing. LexyAlgo does not provide legal advice — consult a licensed attorney for guidance specific to your situation.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#E8EEF8] py-16 sm:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">Be first when we launch</h2>
          <p className="mt-4 text-slate-700 max-w-lg mx-auto">Join the waitlist for Divorce Forms — CT and CA first, more states following.</p>
          <div className="mt-8 max-w-xl mx-auto">
            <WaitlistForm product="Divorce Forms" accentColor="#2B4580" accentHover="#1C305A" compact />
          </div>
        </div>
      </section>
    </>
  )
}
