import Link from 'next/link'
import type { Metadata } from 'next'
import { WaitlistForm } from '@/components/WaitlistForm'

export const metadata: Metadata = {
  title: 'Estate Planning — Coming Soon — LexyAlgo',
  description: 'Guided estate planning document generation. Wills, trusts, powers of attorney, healthcare directives — all from one structured intake.',
}

const features = [
  { title: 'Last Will and Testament', desc: 'A guided questionnaire produces a state-compliant will — asset distribution, guardianship, executor appointment — all in one document.' },
  { title: 'Revocable Living Trust', desc: 'Avoid probate with a properly structured living trust. Fund it during your lifetime, and your assets transfer seamlessly.' },
  { title: 'Durable Power of Attorney', desc: 'Designate someone to handle financial decisions if you can\'t. Effective immediately or springing — your choice.' },
  { title: 'Healthcare Proxy / Advance Directive', desc: 'Make your medical wishes known before they\'re needed. Appoint a healthcare agent and document your preferences.' },
  { title: 'State-Specific Requirements', desc: 'Every state has different rules for witnesses, notarisation, and execution. We build those requirements into the document generation.' },
  { title: 'One Intake, Complete Package', desc: 'Answer questions once. Your will, trust, POA, and healthcare directive all pull from the same information — no re-entering data.' },
]

const behavioralHighlights = [
  { title: 'Future-Focused Framing', desc: 'Estate planning feels morbid when framed around death. We frame it around protection: protecting your family, your assets, your wishes. The outcome is the same — the feeling is different.', icon: '🛡️' },
  { title: '"How to Explain This" Cards', desc: 'Each document comes with a plain-English companion: what it does, when it activates, and how to explain your choices to family members.', icon: '💬' },
  { title: 'Small Steps, Big Peace of Mind', desc: 'The intake is broken into completable chunks. You can save progress and come back. No pressure to finish in one sitting.', icon: '✅' },
]

export default function EstatePlanningPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#FAF2DC] via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#7A5C1E] uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7A5C1E]" />
                Estate Planning — Coming Soon
              </span>
              <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 mt-4 leading-tight">
                Plan for the future. We&rsquo;ll handle the paperwork.
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Guided estate planning document generation. Wills, trusts, powers of attorney, healthcare directives — all from one structured intake. State-specific requirements built in.
              </p>
              <div className="mt-6">
                <Link href="/calculator"
                  className="inline-flex items-center text-sm font-semibold text-teal hover:underline"
                >
                  Try our free calculators while you wait →
                </Link>
              </div>
            </div>
            <WaitlistForm product="Estate Planning" accentColor="#7A5C1E" accentHover="#573F0E" />
          </div>
        </div>
      </section>

      {/* Screenshot placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-20">
        <div className="bg-[#7A5C1E] rounded-2xl aspect-[16/9] sm:aspect-[2.2/1] flex items-center justify-center shadow-2xl shadow-[#7A5C1E]/10">
          <div className="text-center p-8">
            <p className="text-white/80 text-lg font-medium font-[family-name:var(--font-space)]">Estate Planning Suite</p>
            <p className="text-white/50 text-sm mt-2">Wills, trusts, powers of attorney — one intake, complete package</p>
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
                <div className="w-10 h-10 rounded-xl bg-[#FAF2DC] flex items-center justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#7A5C1E]" />
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
            <span className="text-sm font-semibold text-[#D4B868] uppercase tracking-wider">Behavioral Design</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-white mt-3">
              Protection, not paperwork
            </h2>
            <p className="mt-4 text-slate-400">
              Estate planning is about protecting the people you love. We designed every step to feel like progress toward peace of mind — not a legal chore.
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
      <section className="bg-[#FAF2DC] py-16 sm:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">Don&rsquo;t wait to plan ahead</h2>
          <p className="mt-4 text-slate-700 max-w-lg mx-auto">Join the waitlist and be first to create your estate plan with confidence.</p>
          <div className="mt-8 max-w-xl mx-auto">
            <WaitlistForm product="Estate Planning" accentColor="#7A5C1E" accentHover="#573F0E" compact />
          </div>
        </div>
      </section>
    </>
  )
}
