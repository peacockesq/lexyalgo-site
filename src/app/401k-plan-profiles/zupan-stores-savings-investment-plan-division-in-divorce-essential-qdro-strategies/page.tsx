import type { Metadata } from 'next'
import Link from 'next/link'

const planName = 'Zupan Stores Savings & Investment Plan'

export const metadata: Metadata = {
  title: `${planName} QDRO Guide | LexyAlgo`,
  description:
    'Low-cost LexyAlgo guide for preparing a QDRO draft for the Zupan Stores Savings & Investment Plan, including plan checks, missing information, and filing-readiness issues.',
}

const planFacts = [
  ['Plan name', planName, 'Use the plan name exactly as it appears on current account and plan documents.'],
  ['Sponsor', 'Zupan Enterprises Oregon Inc.', 'Confirm the sponsor and current administrator before preparing final paperwork.'],
  ['Known address', '5711 S Hood Ave', 'Treat this as a starting point only. Current administrator instructions control.'],
  ['Plan type', '401(k) / defined contribution plan', 'The award is usually stated as a percentage, fixed dollar amount, or formula tied to a valuation date.'],
  ['Status', 'Active', 'The account balance, source breakdown, and loan status still need to be checked against current records.'],
  ['Information still needed', 'EIN, plan number, plan year, administrator instructions, loan details, and Roth/pre-tax source detail.', 'Collect these items before filing or serving the order.'],
]

const risks = [
  ['Vesting', 'Employer contributions may be partly unvested. The order should not award money the participant does not own.'],
  ['Loans', 'A participant loan can reduce the divisible balance. The order should say how any loan is treated.'],
  ['Tax sources', 'Roth, pre-tax, rollover, match, and profit-sharing balances may need separate treatment.'],
  ['Date and gains/losses', 'The order should state the division date and whether investment gains or losses are included.'],
]

const lexyFaqs = [
  ['Can LexyAlgo help prepare this QDRO?', 'Yes. LexyAlgo is built to help organize the required plan information and prepare a structured QDRO draft packet for review, signing, and filing.'],
  ['Is LexyAlgo a law firm?', 'No. LexyAlgo is document-preparation software. It provides legal information and drafting support, but it does not provide legal advice or represent either spouse.'],
  ['When should I use a lawyer instead?', 'Use a lawyer if the divorce terms are unclear, the spouses disagree, the plan rejects the order, a loan or tax issue is disputed, or you need someone to appear in court.'],
  ['What should I check before filing?', 'Confirm the exact plan name, participant account, administrator instructions, plan number, loans, tax sources, valuation date, and whether the administrator will review a draft before court entry.'],
]

export default function LexyZupanPlanProfile() {
  return (
    <article className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[#E4F3F6] via-white to-[#FFEDE8] text-slate-900">
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/products/qdro" className="text-sm font-semibold text-teal hover:text-primary-container">← QDRO tools</Link>
        </div>
      </div>

      <header className="relative overflow-hidden">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-teal-light/60 blur-3xl" />
        <div className="absolute bottom-0 left-8 h-72 w-72 rounded-full bg-peach/70 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_.8fr] lg:px-8 lg:py-24">
          <div className="min-w-0">
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full bg-teal-light px-4 py-2 text-xs font-bold uppercase tracking-wide text-teal sm:text-sm">
              <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
              Low-cost QDRO drafting guide
            </div>
            <h1 className="font-[family-name:var(--font-space)] text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {planName} QDRO Guide
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              The Zupan Stores Savings & Investment Plan is a 401(k)-style defined contribution plan. If the account is being divided in divorce, the QDRO should identify the correct plan, define the division date, state the award formula, and explain how gains, losses, loans, vesting, and tax sources are handled.
            </p>
            <div className="mt-5 max-w-3xl rounded-3xl border border-teal-light bg-white/75 p-5 text-base leading-7 text-slate-700 shadow-sm">
              Start by confirming the sponsor, administrator, account balance, loan status, and whether the account includes Roth, pre-tax, rollover, match, or profit-sharing money. A clean draft is easier to review when the missing plan details are identified before anyone files paperwork with the court.
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

          <aside className="min-w-0 rounded-[2rem] border border-slate-100 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-6">
            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <p className="text-sm font-semibold text-teal-light">Best for</p>
              <p className="mt-2 text-2xl font-bold">Lower-cost drafting help</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">Use LexyAlgo when you want organized QDRO paperwork, plan-specific checks, and a clearer path from divorce terms to a draft order.</p>
            </div>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl bg-teal-light/60 p-4"><strong className="block text-teal">Likely draft type</strong><span className="text-sm text-slate-700">401(k) defined contribution QDRO</span></div>
              <div className="rounded-2xl bg-peach/60 p-4"><strong className="block text-primary-container">Key checks</strong><span className="text-sm text-slate-700">Loans, vesting, tax sources, valuation date, and administrator rules</span></div>
              <div className="rounded-2xl bg-sky-50 p-4"><strong className="block text-sky-700">Legal boundary</strong><span className="text-sm text-slate-700">Document help and legal information only. No court appearance or legal advice.</span></div>
            </div>
          </aside>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:px-8">
        <section id="plan-facts" className="min-w-0 rounded-[2rem] border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0"><p className="font-bold uppercase tracking-[.18em] text-teal">Plan checks</p><h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-950 sm:text-4xl">Known facts and missing information</h2></div>
            <span className="w-fit rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">Draft-readiness checklist</span>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="bg-slate-950 text-white"><tr><th className="p-4">Input</th><th className="p-4">Current value</th><th className="p-4">Why it matters</th></tr></thead>
              <tbody>{planFacts.map(([a,b,c]) => <tr key={a} className="border-b border-slate-100 even:bg-slate-50/70"><th className="p-4 font-bold text-teal">{a}</th><td className="p-4 text-slate-700">{b}</td><td className="p-4 text-slate-600">{c}</td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {risks.map(([title, body]) => <div key={title} className="min-w-0 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"><h3 className="font-[family-name:var(--font-space)] text-xl font-bold text-slate-950">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{body}</p></div>)}
        </section>

        <section className="grid min-w-0 grid-cols-1 gap-6 rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="min-w-0"><p className="font-bold uppercase tracking-[.18em] text-teal-light">Prepare the draft</p><h2 className="mt-2 font-[family-name:var(--font-space)] text-3xl font-bold leading-tight sm:text-4xl">Build a cleaner QDRO packet before you file.</h2><p className="mt-4 max-w-3xl text-slate-300">LexyAlgo helps collect the plan facts, organize the divorce terms, and prepare a draft that is easier for the court and plan administrator to review.</p></div>
          <Link href="/products/qdro" className="inline-flex w-full justify-center rounded-2xl bg-white px-7 py-4 font-bold text-slate-950 sm:w-auto">Open QDRO tool</Link>
        </section>

        <section className="rounded-[2rem] border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-950 sm:text-4xl">FAQ</h2>
          <div className="mt-5 grid gap-4">{lexyFaqs.map(([q,a]) => <div key={q} className="rounded-2xl bg-slate-50 p-5"><h3 className="font-bold text-slate-950">{q}</h3><p className="mt-2 text-slate-600">{a}</p></div>)}</div>
        </section>

        <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 text-sm leading-6 text-amber-900 sm:p-8">
          <strong>Legal information only.</strong> LexyAlgo is software, not a law firm. This page and any draft generated from it do not provide legal advice, do not represent either spouse, and do not replace review by an attorney when legal advice is needed. Current plan documents and administrator procedures must be verified before filing or serving any QDRO.
        </section>
      </main>
    </article>
  )
}
