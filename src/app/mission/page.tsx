import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mission — LexyAlgo',
  description: 'Why an attorney licensed in 8 states built LexyAlgo — access to justice, behavioral economics, and document preparation done right.',
}

export default function MissionPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface to-white py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Why I built this
          </h1>
          <p className="mt-4 text-lg text-slate-500">From Willie Peacock, Founder &amp; Attorney</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="prose prose-slate prose-lg max-w-none">
          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p className="text-xl text-slate-900 font-medium">
              I&rsquo;ve practised family law across eight states. I&rsquo;ve drafted thousands of QDROs, reviewed tens of thousands of retirement accounts, and watched how people make decisions at the worst moments of their lives.
            </p>

            <p>
              Here&rsquo;s what I noticed: the tools available to people going through divorce are either (a) so complex they require a law degree, or (b) so dumbed-down they&rsquo;re useless. The legal system gives you 40-page forms and says &ldquo;good luck.&rdquo; Online generators give you a form that might not even be valid in your county.
            </p>

            <p>
              Neither helps you <em>understand what you&rsquo;re deciding</em>.
            </p>

            <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900 mt-12 mb-4">The access-to-justice problem</h2>

            <p>
              Most people can&rsquo;t afford a divorce attorney. The median cost of a contested divorce in the US is $15,000–$20,000. Even an uncontested one can run $3,000–$5,000 just for paperwork. The result? Millions of people either can&rsquo;t afford to divorce, or they do it themselves with forms they don&rsquo;t understand and consequences they can&rsquo;t foresee.
            </p>

            <p>
              LexyAlgo exists to close that gap. Not by replacing attorneys — but by giving people court-form-driven document preparation tools that use their state&rsquo;s actual forms, explain what every field means, and help them make informed decisions about property division, support, and parenting.
            </p>

            <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900 mt-12 mb-4">Why behavioral economics matters here</h2>

            <p>
              Divorce is a decision-making crisis. Loss aversion makes people fight over assets they don&rsquo;t even want — because giving them up <em>feels</em> like losing. Hyperbolic discounting makes people take $30K in cash today instead of $48K in retirement at 62. The endowment effect makes people overvalue what they have and undervalue what they&rsquo;d receive.
            </p>

            <p>
              These aren&rsquo;t character flaws. They&rsquo;re how human brains work under stress. A good mediator knows this and reframes the conversation. A good tool should do the same thing.
            </p>

            <div className="bg-peach rounded-2xl p-8 my-8 not-prose">
              <div className="flex gap-4 items-start">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="font-[family-name:var(--font-space)] font-bold text-slate-900 text-lg">Our design philosophy</h3>
                  <p className="mt-2 text-slate-700 leading-relaxed">
                    Every screen asks: &ldquo;What bias is the user feeling right now, and how do I reframe the information to help them make a decision they won&rsquo;t regret?&rdquo; This isn&rsquo;t manipulation — it&rsquo;s what a good mediator does in the room. We&rsquo;re building the mediator into the software.
                  </p>
                </div>
              </div>
            </div>

            <p>
              That&rsquo;s why every trade-off in Asset Divider shows what you <em>gain</em>, not what you lose. Why our calculators show future-value timelines, not just present-value numbers. Why every scenario comes with a &ldquo;how to explain this to family&rdquo; card — because research on reason-based choice shows people pick what&rsquo;s easiest to <em>justify</em>, not what&rsquo;s objectively best.
            </p>

            <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-slate-900 mt-12 mb-4">What we are — and aren&rsquo;t</h2>

            <p>
              <strong>LexyAlgo is a document preparation platform.</strong> We use court-approved forms. We help you fill them out correctly. We show you what your financial picture looks like so you can make informed decisions.
            </p>

            <p>
              <strong>LexyAlgo is not a law firm.</strong> We don&rsquo;t provide legal advice. We don&rsquo;t represent you in court. We don&rsquo;t tell you what to do. If your situation is complex — high-conflict custody, hidden assets, domestic violence, business valuation — you need an attorney, and we&rsquo;ll tell you that.
            </p>

            <p>
              Our job is to make the straightforward cases genuinely straightforward, and to help everyone else understand their situation well enough to have a productive conversation with their attorney.
            </p>

            <div className="bg-slate-100 rounded-2xl p-8 my-8 not-prose">
              <p className="text-sm text-slate-500 italic">
                This tool provides information and document preparation assistance only. It does not constitute legal advice. Generated by AI. Consult a licensed attorney for legal guidance specific to your situation.
              </p>
            </div>

            <p className="text-lg font-medium text-slate-900">
              Divorce is hard. Your tools shouldn&rsquo;t be.
            </p>

            <p className="text-slate-500 mt-8">
              — Willie Peacock<br />
              Attorney at Law (CA, NY, NJ, KS, MO, IA, ND, CT)<br />
              Founder, LexyAlgo
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
