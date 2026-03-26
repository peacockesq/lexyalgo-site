import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Divorce Calculators — Free — LexyAlgo',
  description: 'Free child support and retirement division calculators. State-specific formulas, future-value timelines, and plain-English explanations.',
}

const calculators = [
  { title: 'Child Support Calculator', desc: 'State-specific guideline calculations. Input incomes, overnights, insurance, and childcare — get the number your court uses.', icon: '👶' },
  { title: 'Retirement Division Calculator', desc: 'Calculate coverture fractions, marital portions, and QDRO-ready numbers for 401(k)s, pensions, and IRAs.', icon: '🏦' },
  { title: 'Future Value Calculator', desc: '"Take $30K today or keep $48K growing?" Side-by-side comparison with age milestones at 55, 62, and 67.', icon: '📈' },
  { title: 'Alimony Estimator', desc: 'Duration and amount estimates based on your state\'s guidelines, marriage length, and income differential.', icon: '💰' },
]

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
  'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming',
]

export default function CalculatorPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-light via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold text-green-700">Free — No Account Required</span>
            </div>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Divorce calculators that show the full picture
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
              State-specific child support calculations, retirement division with coverture fractions, and future-value timelines — with plain-English explanations alongside every formula. Built by an attorney licensed in 8 states.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {calculators.map((calc) => (
            <div key={calc.title}
              className="bg-white rounded-2xl border border-slate-100 p-8 hover:shadow-lg hover:border-teal/20 transition-all duration-300 cursor-pointer group"
            >
              <span className="text-3xl">{calc.icon}</span>
              <h3 className="font-[family-name:var(--font-space)] text-xl font-bold text-slate-900 mt-4 group-hover:text-teal transition-colors">{calc.title}</h3>
              <p className="mt-3 text-slate-600 leading-relaxed text-sm">{calc.desc}</p>
              <div className="mt-5 inline-flex items-center text-sm font-semibold text-teal">
                Open calculator
                <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Behavioral insight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-teal-light rounded-2xl p-8 sm:p-12 border border-teal/10">
          <div className="flex gap-4 items-start">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-[family-name:var(--font-space)] font-bold text-slate-900 text-lg">Why we show future value</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">
                Research on hyperbolic discounting shows people consistently take less money now over more money later — even when waiting is objectively better. Our calculators counter this bias by making future value <em>visual</em>: timeline graphics, growth curves, and concrete dollar amounts at specific ages. You can still choose the cash. But you&rsquo;ll choose it with eyes open.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* State-specific section */}
      <section className="bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-white">State-specific calculations</h2>
            <p className="mt-4 text-slate-400">
              Every state has different guidelines. Our calculators use your state&rsquo;s actual formulas — not national averages.
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {states.map((state) => (
              <div key={state} className="bg-slate-900/50 rounded-lg px-2 py-2 text-center text-xs text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">
                {state.length > 10 ? state.split(' ').map(w => w[0]).join('') : state}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features breakdown */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-teal rounded-2xl aspect-[4/3] flex items-center justify-center shadow-xl">
              <div className="text-center p-8">
                <p className="text-white/80 text-lg font-medium font-[family-name:var(--font-space)]">Future Value Timeline</p>
                <p className="text-white/50 text-sm mt-2">Animated growth curves with age milestones</p>
              </div>
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">
                Not just numbers — stories
              </h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Every calculation includes a plain-English summary. Coverture fractions explained as &ldquo;You were married for 15 of the 25 years this pension accrued, so 60% is marital.&rdquo;
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'Plain-English summary alongside every formula',
                  'Coverture fraction explained, not just calculated',
                  '"How to explain this to family" scripts',
                  'Exportable PDF reports for your attorney or mediator',
                  'No account required — start calculating immediately',
                ].map((item) => (
                  <div key={item} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-peach py-16 sm:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-slate-900">See what your assets are really worth</h2>
          <p className="mt-4 text-slate-700 max-w-lg mx-auto">Free. No account. No credit card. Just answers.</p>
          <p className="mt-8 text-sm text-slate-500 italic">Individual state calculator pages coming soon.</p>
        </div>
      </section>
    </>
  )
}
