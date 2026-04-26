import Link from 'next/link'
import type { Metadata } from 'next'
import { sharedAuthLinks } from '@/lib/shared-auth-links'

export const metadata: Metadata = {
  title: 'Estate Planning — Free — LexyAlgo',
  description: 'Free wills, trusts, powers of attorney, and healthcare directives. One intake, four core documents, and a clearer way to get your estate plan started.',
}

const DA_INTERVIEW_URL = sharedAuthLinks.estatePlanning

const features = [
  { title: 'Last Will and Testament', desc: 'A guided questionnaire produces a state-aware will covering distribution, guardianship, and executor appointment.' },
  { title: 'Revocable Living Trust', desc: 'Create a properly structured living trust so probate avoidance and successor planning are not left to guesswork.' },
  { title: 'Durable Power of Attorney', desc: 'Designate someone to handle financial decisions if you cannot, with clear plain-English guidance around the choices.' },
  { title: 'Healthcare Proxy / Advance Directive', desc: 'Document medical preferences and appoint a healthcare agent before those decisions become urgent.' },
  { title: 'State-Specific Requirements', desc: 'Witness, notarization, and signing requirements vary by state, and the workflow is built to surface those differences.' },
  { title: 'One Intake, Complete Package', desc: 'Answer the questions once and reuse the information across the trust, will, POA, and healthcare directive.' },
]

const steps = [
  { step: '1', title: 'Tell us about yourself', desc: 'The intake adapts to whether you are single or planning as a couple and gathers the information the full package needs.' },
  { step: '2', title: 'Make your choices', desc: 'We ask plain questions about beneficiaries, decision-makers, and priorities, then translate those answers into legal document structure.' },
  { step: '3', title: 'Download your documents', desc: 'Generate the living trust, will, durable POA, and healthcare directive for review, signing, and next-step discussion with counsel if needed.' },
]

export default function EstatePlanningPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#FAF2DC] via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#7A5C1E] uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7A5C1E]" />
                Estate Planning
              </span>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                Free
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Estate planning should not be the expensive part you keep putting off
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              One intake generates a living trust, will, durable power of attorney, and healthcare directive. Getting the basics in place should not be expensive, confusing, or easy to postpone forever.
            </p>
            <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50/80 p-4 text-sm leading-relaxed text-slate-700">
              Estate Planning is still in beta. It is useful now, but you should expect ongoing improvements, possible bugs, and state-coverage limitations while we keep tightening the workflow.
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href={DA_INTERVIEW_URL}
                className="inline-flex items-center justify-center bg-[#7A5C1E] text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#573F0E] transition-all shadow-lg shadow-[#7A5C1E]/20 hover:shadow-xl hover:shadow-[#7A5C1E]/30 active:scale-[0.98]"
              >
                Try it now free
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <Link href="/mission"
                className="inline-flex items-center justify-center border-2 border-slate-200 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                Why it is free
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-[#D4B868] uppercase tracking-wider">How it works</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-white mt-3">
              Three steps to your estate plan
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
                <span className="text-sm font-semibold uppercase tracking-wider text-[#D4B868]">Step {s.step}</span>
                <h3 className="font-[family-name:var(--font-space)] font-bold text-white mt-4 text-xl">{s.title}</h3>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900 text-center mb-16">Four documents, one intake</h2>
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

      <section className="py-12 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">Early product</span>
          </div>
          <p className="text-sm text-slate-600">
            This tool generates estate planning document drafts. <strong>These documents should be reviewed by a licensed attorney before signing or filing.</strong> LexyAlgo is a document preparation service, not a law firm. We do not provide legal advice.
          </p>
          <p className="mt-3 text-sm text-slate-600">
            State-specific signing requirements are included where supported, but the product is still in beta and you should confirm execution requirements for your state before relying on the output.
          </p>
        </div>
      </section>

      <section className="bg-[#FAF2DC] py-16 sm:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">Protect your family. Start now.</h2>
          <p className="mt-4 text-slate-700 max-w-lg mx-auto">Generate your trust, will, power of attorney, and healthcare directive for free — then review and sign with eyes open.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={DA_INTERVIEW_URL}
              className="inline-flex items-center justify-center bg-[#7A5C1E] text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#573F0E] transition-all shadow-lg shadow-[#7A5C1E]/20 active:scale-[0.98]"
            >
              Try it now free
            </a>
            <Link href="/contact"
              className="inline-flex items-center justify-center border-2 border-slate-300 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:border-slate-400 hover:bg-white transition-all"
            >
              Questions? Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
