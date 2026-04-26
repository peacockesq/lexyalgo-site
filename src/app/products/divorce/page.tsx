import Link from 'next/link'
import type { Metadata } from 'next'
import { RealScreenshot } from '@/components/RealScreenshot'
import { sharedAuthLinks } from '@/lib/shared-auth-links'

export const metadata: Metadata = {
  title: 'Divorce Forms — Free Public Alpha — LexyAlgo',
  description: 'Free public alpha for court-form-driven uncontested divorce workflows. One guided intake, state-specific forms, and clear early-alpha expectations.',
}

const PUBLIC_ALPHA_URL = sharedAuthLinks.divorceAlpha

const features = [
  { title: 'Court-Form-Mapped Documents', desc: 'Not generic templates — every document maps directly to your state’s official court forms.' },
  { title: 'CT Divorce Workflow', desc: 'Connecticut intake and document generation built around the real Judicial Branch forms instead of generic divorce paperwork.' },
  { title: 'CA Divorce Workflow', desc: 'California FL-series coverage built from one guided questionnaire instead of form-by-form manual entry.' },
  { title: 'One Intake, Reused Everywhere', desc: 'Enter names, dates, assets, and children once. The workflow reuses that information across the document set.' },
  { title: 'Children / No-Children Paths', desc: 'The interview adapts the path depending on whether custody, support, and parenting-plan forms are needed.' },
  { title: 'PDF Download + Plain English', desc: 'Download court-ready PDFs and get plain-English context for what each document means before you file anything.' },
]

export default function DivorcePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#E8EEF8] via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2B4580] uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2B4580]" />
                Divorce Forms — Free Public Alpha
              </span>
              <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 mt-4 leading-tight">
                Court-form-driven divorce paperwork, without the generic-template mess
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Divorce Forms is free in public alpha because basic document clarity should not be locked behind a paywall. One guided intake produces the court-form-driven document set your workflow needs, with Connecticut and California leading the rollout.
              </p>
              <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/80 p-4 text-sm leading-relaxed text-slate-700">
                This is an early alpha. It is usable now, but you should expect rough edges, state-coverage gaps, and ongoing changes while we tighten the workflows in public.
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href={PUBLIC_ALPHA_URL}
                  className="inline-flex items-center justify-center bg-[#2B4580] text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#1C305A] transition-all shadow-lg shadow-[#2B4580]/20 hover:shadow-xl hover:shadow-[#2B4580]/30 active:scale-[0.98]"
                >
                  Open free alpha
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <Link href="/pricing"
                  className="inline-flex items-center justify-center border-2 border-slate-200 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all"
                >
                  See why it is free
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-[#2B4580]/10 bg-white p-8 shadow-xl shadow-[#2B4580]/10">
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#2B4580]">
                Free alpha access
              </div>
              <h2 className="mt-5 font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900">
                Open the current workflow directly
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                We are exposing Divorce Forms directly so people can test the real workflow, not a mockup. That is how we find the gaps faster and make the product actually useful.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {['Free public alpha', 'Court-form-driven workflow', 'CT and CA lead the rollout'].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#E8EEF8] text-[#2B4580]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href={PUBLIC_ALPHA_URL}
                className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-[#2B4580] px-6 py-4 text-center font-semibold text-white transition-all hover:bg-[#1C305A] active:scale-[0.98]"
              >
                Launch Divorce Forms alpha
              </a>
            </div>
          </div>
        </div>
      </section>

      <RealScreenshot
        src="/screenshots/v2-app-homepage.png"
        alt="LexyAlgo V2 Divorce App — form wizard and document generation"
        accentColor="#2B4580"
        label="Public Alpha"
        url="app.lexyalgo.com"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900 text-center mb-16">What the alpha already covers</h2>
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

      <section className="py-12 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
            <p className="text-sm text-slate-600">
              <strong className="text-slate-900">Important:</strong> Document preparation tools, not a law firm. Generated documents should be reviewed before filing. LexyAlgo does not provide legal advice — consult a licensed attorney for guidance specific to your situation.
            </p>
            <p className="text-sm text-slate-600">
              This workflow is still in early alpha, so you should expect product gaps and should not assume every edge case or jurisdictional nuance is fully covered yet.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#E8EEF8] py-16 sm:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">Test Divorce Forms now</h2>
          <p className="mt-4 text-slate-700 max-w-lg mx-auto">Run the free alpha, pressure-test the workflow, and tell us where it breaks or where the explanation still is not clear enough.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PUBLIC_ALPHA_URL}
              className="inline-flex items-center justify-center bg-[#2B4580] text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#1C305A] transition-all shadow-lg shadow-[#2B4580]/20 active:scale-[0.98]"
            >
              Open free alpha
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
