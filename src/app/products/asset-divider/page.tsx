import Link from 'next/link'
import type { Metadata } from 'next'
import { RealScreenshot } from '@/components/RealScreenshot'

export const metadata: Metadata = {
  title: 'Asset Divider Workspace — LexyAlgo',
  description: 'Free asset division workspace for manual scenario planning, with one-time premium valuation features for higher-cost automation like Plaid imports.',
}

const LAUNCH_URL = 'https://calc.lexyalgo.com/launch/asset-divider'

const features = [
  { title: 'Visual Asset Inventory', desc: 'See every asset and debt in one dashboard — house, cars, retirement, bank accounts, and personal property.' },
  { title: 'Scenario Comparison', desc: 'Test different proposed splits side by side so you can compare outcomes before you commit to a settlement.' },
  { title: 'Balanced Settlement Guidance', desc: 'Use parity context and cleaner framing to negotiate toward something balanced instead of fighting over isolated line items.' },
  { title: 'Retirement + Future Value Context', desc: 'See present-day numbers alongside future value context so cash and retirement are not treated like interchangeable dollars.' },
  { title: 'Attorney-Ready Exports', desc: 'Export the working scenario and supporting numbers to use with your attorney, mediator, or records.' },
  { title: 'Premium Valuation Layer', desc: 'When higher-cost automation is needed, premium valuation features like Plaid-linked account pulls fit as a one-time case fee, not a subscription.' },
]

export default function AssetDividerPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-ember-light via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-ember uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-ember" />
                Asset Divider — Early Alpha Workspace
              </span>
              <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 mt-4 leading-tight">
                Split assets with clearer math and less friction
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Asset Divider helps you compare proposals, balance tradeoffs, and understand what different settlement paths actually do. The core workspace is meant to stay accessible, while higher-cost valuation automation belongs in a one-time premium layer when needed.
              </p>
              <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50/80 p-4 text-sm leading-relaxed text-slate-700">
                Asset Divider is still in early alpha. Useful today, yes — but expect rough edges, incomplete workflows, and ongoing changes as we build it in public.
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href={LAUNCH_URL}
                  className="inline-flex items-center justify-center bg-ember text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#861B00] transition-all shadow-lg shadow-ember/20 active:scale-[0.98]"
                >
                  Launch Asset Divider
                </a>
                <Link href="/pricing"
                  className="inline-flex items-center justify-center border-2 border-slate-200 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all"
                >
                  See free vs premium
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-ember/10 bg-white p-8 shadow-xl shadow-ember/10">
              <div className="inline-flex items-center gap-2 rounded-full bg-ember-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ember">
                Free core workflow
              </div>
              <h2 className="mt-5 font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900">
                Start with the workspace, not a paywall
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Manual asset comparison, scenario planning, and settlement framing should be easy to open and pressure-test. Premium only shows up where outside integrations or heavier valuation automation create real cost.
              </p>
              <a href={LAUNCH_URL}
                className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-ember px-6 py-4 text-center font-semibold text-white transition-all hover:bg-[#861B00] active:scale-[0.98]"
              >
                Launch Asset Divider
              </a>
            </div>
          </div>
        </div>
      </section>

      <RealScreenshot
        src="/screenshots/v2-app-homepage.png"
        alt="LexyAlgo V2 App — asset division workspace"
        accentColor="#B02700"
        label="Live Workspace"
        url="calc.lexyalgo.com/launch/asset-divider"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-green-200 bg-green-50/70 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">Free core access</p>
            <h2 className="mt-3 font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900">Use Asset Divider for the core math and comparison workflow</h2>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {[
                'Manual asset entry and scenario planning',
                'Comparison of proposed splits and tradeoffs',
                'Settlement-balance context and exportable outputs',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-[#E3BEB6] bg-[#FFEDE8] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-container">One-time premium valuation</p>
            <h2 className="mt-3 font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900">Pay once when you need heavier financial automation</h2>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {[
                'Plaid-linked statement and account pulls',
                'Higher-cost valuation workflows and account refreshes',
                'Case-based premium access instead of recurring subscription pricing',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-primary-container">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900 text-center mb-16">What the workspace helps you do</h2>
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

      <section className="bg-peach py-16 sm:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">Open Asset Divider now</h2>
          <p className="mt-4 text-slate-700 max-w-lg mx-auto">Start with the workspace, use the free core workflow, and layer in premium valuation only when your case actually needs it.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={LAUNCH_URL}
              className="inline-flex items-center justify-center bg-ember text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#861B00] transition-all shadow-lg shadow-ember/20 active:scale-[0.98]"
            >
              Launch Asset Divider
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
