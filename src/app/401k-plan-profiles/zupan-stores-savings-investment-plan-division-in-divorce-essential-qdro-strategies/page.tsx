import type { Metadata } from 'next'
import Link from 'next/link'

const planName = 'Zupan Stores Savings & Investment Plan'
const slug = 'zupan-stores-savings-investment-plan-division-in-divorce-essential-qdro-strategies'

export const metadata: Metadata = {
  title: `${planName} QDRO Tool Guide | LexyAlgo`,
  description:
    'LexyAlgo sample plan profile for the Zupan Stores Savings & Investment Plan: AI-driven QDRO drafting guidance, plan-specific checks, and low-cost divorce document workflow.',
}

const planFacts = [
  ['Plan name', planName, 'Use the exact plan name when preparing QDRO paperwork.'],
  ['Sponsor', 'Zupan Enterprises Oregon Inc.', 'Confirm sponsor and administrator before relying on any draft.'],
  ['Known address from imported profile', '5711 S Hood Ave', 'A useful clue, not a substitute for current administrator instructions.'],
  ['Plan type', '401(k) / defined contribution plan', 'Usually divided by percentage, dollar award, or formula.'],
  ['Status in imported profile', 'Active', 'Current account and plan records still need confirmation.'],
  ['Known gaps', 'EIN, plan number, official QDRO procedures, and plan year were not supplied in the imported article.', 'LexyAlgo should flag these as missing inputs instead of pretending the page is complete.'],
]

const risks = [
  ['Vesting', 'Employer contributions may be partly unvested, so the draft should avoid awarding money the participant does not own.'],
  ['Loans', 'Participant loans can change the account balance and should be handled explicitly.'],
  ['Roth vs. pre-tax', 'Different tax sources should not be blended into vague “half the account” language.'],
  ['Contribution sources', 'Employee deferrals, match, profit sharing, and rollover balances may need separate handling.'],
]

const lexyFaqs = [
  ['Can LexyAlgo draft this QDRO for me?', 'The product vision is a low-cost, AI-assisted drafting workflow that turns plan facts and divorce terms into a structured draft packet. This sample shows the content model; it is not yet a completed plan-approved workflow.'],
  ['Is LexyAlgo a lawyer?', 'No. LexyAlgo is software. It can provide legal information, organization, calculations, and drafting assistance, but it does not provide legal advice or represent you in court.'],
  ['What makes this cheaper than hiring a lawyer?', 'Software can collect inputs, flag missing information, reuse plan-specific templates, and generate consistent draft language at scale. That reduces manual work. It does not replace legal judgment when the facts are contested or the court/plan administrator pushes back.'],
  ['What should I verify before using any draft?', 'Verify the plan name, participant account, administrator procedures, plan number, loans, Roth/pre-tax sources, valuation date, and whether draft preapproval is available.'],
]

export default function LexyZupanPlanProfile() {
  return (
    <article className="min-h-screen bg-gradient-to-br from-[#E4F3F6] via-white to-[#FFEDE8] text-slate-900">
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/products/qdro" className="text-sm font-semibold text-teal hover:text-primary-container">← QDRO tools</Link>
        </div>
      </div>

      <header className="relative overflow-hidden">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-teal-light/60 blur-3xl" />
        <div className="absolute bottom-0 left-8 h-72 w-72 rounded-full bg-peach/70 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_.8fr] lg:px-8 lg:py-28">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-teal-light px-4 py-2 text-sm font-bold text-teal">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              LexyAlgo Plan Profile · AI-Assisted QDRO Drafting
            </div>
            <h1 className="font-[family-name:var(--font-space)] text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {planName} QDRO Tool Guide
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              The Zupan Stores Savings & Investment Plan is a 401(k)-style defined contribution plan. If it needs to be divided in divorce, the draft should capture the correct plan name, division date, award formula, gains and losses, loans, vesting, Roth/pre-tax sources, and administrator submission requirements.
            </p>
            <div className="mt-5 max-w-3xl rounded-3xl border border-teal-light bg-white/75 p-5 text-base leading-7 text-slate-700 shadow-sm">
              This is the LexyAlgo version: cheap, AI-driven, and built to help people assemble a cleaner QDRO draft packet without starting from a blank page. The software should flag missing plan data—like EIN, plan number, and current QDRO procedures—instead of burying those gaps below generic filler.
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/products/qdro" className="inline-flex items-center justify-center rounded-2xl bg-primary-container px-7 py-4 font-bold text-white shadow-lg shadow-primary-container/20 transition hover:bg-primary">
                Start a low-cost QDRO draft
              </Link>
              <a href="#plan-facts" className="inline-flex items-center justify-center rounded-2xl border-2 border-slate-200 bg-white px-7 py-4 font-bold text-slate-700 transition hover:border-teal hover:text-teal">
                See plan checks
              </a>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60">
            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <p className="text-sm font-semibold text-teal-light">Product position</p>
              <p className="mt-2 text-2xl font-bold">Cheap + AI-driven</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">Use software to organize plan facts, draft language, and missing-info checks. Use a lawyer when you need advice, negotiation, or court representation.</p>
            </div>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl bg-teal-light/60 p-4"><strong className="block text-teal">Likely draft type</strong><span className="text-sm text-slate-700">401(k) defined contribution QDRO</span></div>
              <div className="rounded-2xl bg-peach/60 p-4"><strong className="block text-primary-container">Biggest flags</strong><span className="text-sm text-slate-700">Loans, vesting, tax sources, missing administrator rules</span></div>
              <div className="rounded-2xl bg-sky-50 p-4"><strong className="block text-sky-700">Not legal advice</strong><span className="text-sm text-slate-700">LexyAlgo helps draft and organize. It does not represent either spouse.</span></div>
            </div>
          </aside>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:px-8">
        <section id="plan-facts" className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="font-bold uppercase tracking-[.18em] text-teal">Plan data table</p><h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-950">Known facts and missing inputs</h2></div>
            <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">Prototype proof layer</span>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-[780px] w-full border-collapse text-left">
              <thead className="bg-slate-950 text-white"><tr><th className="p-4">Input</th><th className="p-4">Current value</th><th className="p-4">How LexyAlgo should use it</th></tr></thead>
              <tbody>{planFacts.map(([a,b,c]) => <tr key={a} className="border-b border-slate-100 even:bg-slate-50/70"><th className="p-4 font-bold text-teal">{a}</th><td className="p-4 text-slate-700">{b}</td><td className="p-4 text-slate-600">{c}</td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-4">
          {risks.map(([title, body]) => <div key={title} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"><h3 className="font-[family-name:var(--font-space)] text-xl font-bold text-slate-950">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{body}</p></div>)}
        </section>

        <section className="grid grid-cols-1 gap-6 rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><p className="font-bold uppercase tracking-[.18em] text-teal-light">LexyAlgo CTA</p><h2 className="mt-2 font-[family-name:var(--font-space)] text-3xl font-bold">Use AI to build the draft packet. Escalate only when the facts need human judgment.</h2><p className="mt-4 max-w-3xl text-slate-300">The product should be the low-cost route for organized, plan-aware QDRO drafting—not a fake law firm and not a generic blog post.</p></div>
          <Link href="/products/qdro" className="inline-flex justify-center rounded-2xl bg-white px-7 py-4 font-bold text-slate-950">Open QDRO tool</Link>
        </section>

        <section className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-950">FAQ</h2>
          <div className="mt-5 grid gap-4">{lexyFaqs.map(([q,a]) => <div key={q} className="rounded-2xl bg-slate-50 p-5"><h3 className="font-bold text-slate-950">{q}</h3><p className="mt-2 text-slate-600">{a}</p></div>)}</div>
        </section>

        <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 text-sm leading-6 text-amber-900 sm:p-8">
          <strong>Legal information only.</strong> LexyAlgo is software, not a law firm. This page and any AI-assisted draft workflow do not provide legal advice, do not represent either spouse, and do not replace review by an attorney when legal advice is needed. Current plan documents and administrator procedures must be verified before filing or serving any QDRO.
        </section>
      </main>
    </article>
  )
}
