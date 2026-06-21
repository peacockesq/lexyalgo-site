import Link from 'next/link'
import { faqs, processSteps, proofStrip, services, templateCards } from '@/lib/agency-site-content'

const focusRing = 'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#4F46E5]'

function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-lg bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(79,70,229,.22)] motion-safe:transition motion-safe:hover:-translate-y-0.5 hover:bg-[#3730A3] ${focusRing}`}
    >
      {children}
    </Link>
  )
}

function SecondaryLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-lg border px-5 py-3 text-sm font-semibold motion-safe:transition motion-safe:hover:-translate-y-0.5 ${focusRing} ${
        dark
          ? 'border-[#253250] bg-white text-[#0A0F1F] hover:border-white'
          : 'border-[#D8E1EC] bg-white text-[#0B1020] hover:border-[#B8C7D9]'
      }`}
    >
      {children}
    </Link>
  )
}

function SectionHeader({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className={`text-xs font-bold uppercase tracking-[0.22em] ${light ? 'text-[#AEBBD0]' : 'text-[#4F46E5]'}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl ${light ? 'text-white' : 'text-[#0B1020]'}`}>{title}</h2>
      {copy ? <p className={`mt-4 text-base leading-7 ${light ? 'text-[#AEBBD0]' : 'text-[#596579]'}`}>{copy}</p> : null}
    </div>
  )
}

function HeroLoopCard() {
  const nodes = ['Query intent', 'Landing-page test', 'Qualified lead', 'Budget decision']

  return (
    <div className="relative min-w-0 rounded-[1.5rem] border border-[#D8E1EC] bg-white p-4 shadow-[0_24px_70px_rgba(25,42,70,.16)] sm:p-6">
      <div className="flex items-center gap-2 border-b border-[#D8E1EC] pb-4">
        <span className="h-3 w-3 rounded-full bg-[#F87171]" />
        <span className="h-3 w-3 rounded-full bg-[#FBBF24]" />
        <span className="h-3 w-3 rounded-full bg-[#34D399]" />
        <span className="ml-3 min-w-0 truncate rounded-md border border-[#D8E1EC] bg-[#F7F9FC] px-2 py-1 text-[11px] font-medium text-[#596579]">growth-os.internal/loop</span>
      </div>
      <div className="mt-5 rounded-2xl bg-gradient-to-br from-[#F7F9FC] via-white to-[#E6F6FE] p-5">
        <div className="grid min-w-0 gap-3 sm:grid-cols-2">
          {nodes.map((node, index) => (
            <div key={node} className="rounded-xl border border-[#D8E1EC] bg-white/90 p-4 shadow-[0_1px_2px_rgba(11,16,32,.06)]">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#4F46E5]">0{index + 1}</span>
              <p className="mt-2 text-sm font-semibold text-[#0B1020]">{node}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-[#253250] bg-[#0A0F1F] p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#AEBBD0]">Decision payload</p>
          <p className="mt-2 text-sm leading-6 text-[#F8FAFC]">What changed, what evidence supports it, and what budget or operating decision follows.</p>
        </div>
      </div>
    </div>
  )
}

function TrustStrip() {
  return (
    <section className="border-y border-[#D8E1EC] bg-white">
      <div className="mx-auto grid max-w-[1180px] gap-4 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {proofStrip.map((item) => (
          <div key={item.label} className="rounded-2xl border border-[#D8E1EC] bg-[#F7F9FC] p-5">
            <p className="font-mono text-sm font-bold text-[#0B1020]">{item.label}</p>
            <p className="mt-2 text-sm leading-6 text-[#596579]">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProblemFraming() {
  const leaks = ['Paid spend judged by platform conversions alone', 'SEO work separated from commercial demand', 'Landing pages disconnected from query intent', 'CRM feedback never reaches budget decisions', 'Automation hides failure instead of surfacing signal']

  return (
    <section id="operating-loop" className="bg-[#F7F9FC] px-4 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-[#D8E1EC] bg-white p-6 shadow-[0_16px_40px_rgba(25,42,70,.10)] sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#A15C07]">Fragmented stack</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#0B1020]">Most growth systems leak signal before they leak budget.</h2>
          <div className="mt-6 space-y-3">
            {leaks.map((leak) => (
              <div key={leak} className="flex gap-3 rounded-xl border border-[#F8D8A7] bg-[#FFF4DA] p-4 text-sm leading-6 text-[#182033]">
                <span aria-hidden="true" className="mt-0.5 font-bold text-[#A15C07]">!</span>
                <span>{leak}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-[#253250] bg-[#0A0F1F] p-6 text-white shadow-[0_24px_80px_rgba(79,70,229,.22)] sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#AEBBD0]">Operating system</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white">Connect every channel to one qualified-demand decision loop.</h2>
          <p className="mt-4 text-base leading-7 text-[#AEBBD0]">The shell treats paid media, AI search, landing pages, tracking, and automation as one system. Proof stays caveated until verified; green/status styling is reserved for validated performance only.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {['Source', 'Page', 'Lead', 'Decision'].map((label) => (
              <div key={label} className="rounded-xl border border-[#253250] bg-[#111B33] p-4">
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="mt-2 text-xs leading-5 text-[#AEBBD0]">Context, caveat, and next action slot.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesGrid() {
  return (
    <section id="services" className="bg-white px-4 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeader eyebrow="Services" title="Six modules, one acquisition loop." copy="Each card describes the constraint, the system output, and the measurement family instead of a generic service blurb." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.title} href={service.href} className={`group rounded-[1.125rem] border border-[#D8E1EC] bg-white p-6 shadow-[0_1px_2px_rgba(11,16,32,.06)] motion-safe:transition motion-safe:hover:-translate-y-1 hover:border-[#B8C7D9] hover:shadow-[0_16px_40px_rgba(25,42,70,.10)] ${focusRing}`}>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4F46E5]">{service.constraint}</p>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-[#0B1020]">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#596579]">{service.output}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#EEF3F8] px-3 py-1 text-xs font-semibold text-[#182033]">{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessPanel() {
  return (
    <section id="proof" className="bg-[#F7F9FC] px-4 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-[1180px] rounded-[1.5rem] border border-[#253250] bg-[#0A0F1F] p-6 shadow-[0_24px_80px_rgba(79,70,229,.22)] sm:p-8 lg:p-10">
        <SectionHeader light eyebrow="Signature workflow" title="Diagnose → Instrument → Build → Launch → Measure → Iterate." copy="The dark panel is reserved for technical process and evidence architecture, per the design handoff." />
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {processSteps.map((item) => (
            <div key={item.step} className="rounded-2xl border border-[#253250] bg-[#111B33] p-4">
              <p className="font-mono text-xs font-bold text-[#AEBBD0]">{item.step}</p>
              <h3 className="mt-3 text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-xs leading-5 text-[#AEBBD0]">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseStudyModule() {
  return (
    <section className="bg-white px-4 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1fr_.9fr]">
        <div className="rounded-[1.5rem] border border-[#D8E1EC] bg-white p-6 shadow-[0_16px_40px_rgba(25,42,70,.10)] sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#4F46E5]">Proof-safe case module</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#0B1020]">Evidence slots are designed before public claims exist.</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {['Starting constraint', 'Intervention', 'Measurement window', 'Result/caveat state'].map((field) => (
              <div key={field} className="rounded-xl border border-[#D8E1EC] bg-[#F7F9FC] p-4">
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-[#596579]">{field}</dt>
                <dd className="mt-2 text-sm text-[#182033]">Placeholder field; requires verified source before publication.</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-[1.5rem] border border-[#253250] bg-[#0A0F1F] p-6 text-white sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#AEBBD0]">Publication gate</p>
          <p className="mt-3 text-2xl font-semibold tracking-[-0.025em]">No public numeric outcome, testimonial, screenshot, or client-identifying detail.</p>
          <p className="mt-4 text-sm leading-6 text-[#AEBBD0]">Evidence source, redaction, claim-risk level, caveat language, and Willie/team approval are required before this component can carry public proof.</p>
        </div>
      </div>
    </section>
  )
}

function LoopLanes() {
  const lanes = [
    ['AI Search Visibility', 'Query set, answer presence, entity consistency, citations, and missing commercial assets.'],
    ['Paid Media Signal', 'Intent tier, search terms, landing-page fit, event quality, and CRM qualified-lead feedback.'],
    ['Landing-Page Conversion', 'Offer clarity, proof fit, friction points, test plan, and diagnostic next action.'],
  ]

  return (
    <section className="bg-[#F7F9FC] px-4 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeader eyebrow="Conversion loop" title="AI search, paid media, and landing pages move as one system." />
        <div className="grid gap-5 lg:grid-cols-3">
          {lanes.map(([title, copy]) => (
            <div key={title} className="rounded-[1.125rem] border border-[#D8E1EC] bg-white p-6 shadow-[0_1px_2px_rgba(11,16,32,.06)]">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#0B1020]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#596579]">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DiagnosticForm() {
  return (
    <section id="diagnostic" className="bg-white px-4 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-[1180px] gap-8 rounded-[1.5rem] border border-[#253250] bg-[#0A0F1F] p-6 text-white shadow-[0_24px_80px_rgba(79,70,229,.22)] sm:p-8 lg:grid-cols-[.9fr_1fr] lg:p-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#AEBBD0]">Growth Diagnostic</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em]">Start with the constraint, not a retainer pitch.</h2>
          <p className="mt-4 text-base leading-7 text-[#AEBBD0]">No generic audit deck. You get the likely constraint, the evidence behind it, and the next decision it supports.</p>
          <div className="mt-6 rounded-xl border border-[#253250] bg-[#111B33] p-4 text-sm leading-6 text-[#AEBBD0]">
            Stub only: this internal form posts to this route without putting values in the URL. No live lead capture, analytics event, or outbound delivery is connected.
          </div>
        </div>
        <form action="/internal/legal-growth-os#diagnostic-stub" method="post" className="rounded-2xl border border-[#253250] bg-white p-5 text-[#0B1020] sm:p-6">
          <div id="diagnostic-stub" className="sr-only">Diagnostic form stub endpoint target.</div>
          <label className="block text-sm font-semibold" htmlFor="problem">Current acquisition problem</label>
          <textarea id="problem" name="problem" rows={3} className={`mt-2 w-full rounded-lg border border-[#B8C7D9] bg-white px-3 py-3 text-sm ${focusRing}`} placeholder="Lead quality, tracking confidence, AI visibility, paid efficiency..." />
          <label className="mt-4 block text-sm font-semibold" htmlFor="systems">Systems involved</label>
          <input id="systems" name="systems" className={`mt-2 w-full rounded-lg border border-[#B8C7D9] bg-white px-3 py-3 text-sm ${focusRing}`} placeholder="Google Ads, GA4, CRM, landing pages, automations" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold" htmlFor="tracking">Tracking confidence <span className="text-[#596579]">0-10</span><input id="tracking" name="tracking" type="number" min="0" max="10" className={`mt-2 w-full rounded-lg border border-[#B8C7D9] bg-white px-3 py-3 text-sm ${focusRing}`} /></label>
            <label className="block text-sm font-semibold" htmlFor="clarity">Page clarity <span className="text-[#596579]">0-10</span><input id="clarity" name="clarity" type="number" min="0" max="10" className={`mt-2 w-full rounded-lg border border-[#B8C7D9] bg-white px-3 py-3 text-sm ${focusRing}`} /></label>
          </div>
          <button type="submit" className={`mt-5 min-h-11 w-full rounded-lg bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white motion-safe:transition hover:bg-[#3730A3] ${focusRing}`}>Preview diagnostic request</button>
          <p className="mt-3 text-xs leading-5 text-[#596579]">Validation states must include text and icon when this becomes a real endpoint.</p>
        </form>
      </div>
    </section>
  )
}

function FaqAndFinalCta() {
  return (
    <section id="faq" className="bg-[#F7F9FC] px-4 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-[980px]">
        <SectionHeader eyebrow="Risk reversal" title="FAQ for the first diagnostic conversation." />
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0} className={`rounded-2xl border border-[#D8E1EC] bg-white p-5 ${focusRing}`}>
              <summary className="cursor-pointer text-base font-semibold text-[#0B1020]">{faq.question}</summary>
              <p className="mt-3 text-sm leading-6 text-[#596579]">{faq.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-10 rounded-[1.5rem] border border-[#253250] bg-[#0A0F1F] p-6 text-center text-white shadow-[0_24px_80px_rgba(79,70,229,.22)] sm:p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.035em]">Find the constraint before you spend around it.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#AEBBD0]">Send the current acquisition problem and the systems involved. We will map the likely leak and recommend the next measurable step.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <SecondaryLink dark href="#diagnostic">Start the Diagnostic</SecondaryLink>
            <SecondaryLink dark href="#services">Review Services</SecondaryLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AgencyHomeShell() {
  return (
    <div className="agency-artifact overflow-x-clip bg-[#F7F9FC] text-[#182033]">
      <div className="border-b border-[#F8D8A7] bg-[#FFF4DA] px-4 py-3 text-center text-sm font-semibold text-[#A15C07]">
        Internal staging artifact only — not linked in public navigation and not approved for publication.
      </div>
      <header className="sticky top-0 z-40 border-b border-[#D8E1EC] bg-white/90 backdrop-blur-lg">
        <nav className="mx-auto flex max-w-[1180px] items-center justify-between gap-3 px-4 py-4 lg:px-8" aria-label="Legal Growth OS internal navigation">
          <Link href="/internal/legal-growth-os" className={`flex min-w-0 items-center gap-3 text-sm font-bold text-[#0B1020] ${focusRing}`}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#0A0F1F] text-white">OS</span>
            <span className="min-w-0 truncate">Legal Growth OS</span>
          </Link>
          <div className="hidden items-center gap-6 lg:flex">
            <Link href="#services" className={`text-sm font-semibold text-[#596579] hover:text-[#0B1020] ${focusRing}`}>Services</Link>
            <Link href="#operating-loop" className={`text-sm font-semibold text-[#596579] hover:text-[#0B1020] ${focusRing}`}>Operating Loop</Link>
            <Link href="#proof" className={`text-sm font-semibold text-[#596579] hover:text-[#0B1020] ${focusRing}`}>Proof</Link>
            <Link href="#diagnostic" className={`text-sm font-semibold text-[#596579] hover:text-[#0B1020] ${focusRing}`}>Diagnostic</Link>
            <Link href="#faq" className={`text-sm font-semibold text-[#596579] hover:text-[#0B1020] ${focusRing}`}>FAQ</Link>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <SecondaryLink href="#operating-loop">See loop</SecondaryLink>
            <PrimaryLink href="#diagnostic">Get a Growth Diagnostic</PrimaryLink>
          </div>
        </nav>
      </header>
      <main>
        <section className="relative overflow-hidden px-4 py-16 sm:py-28 lg:px-8 lg:py-32">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#E9E7FF] blur-3xl sm:h-[20rem] sm:w-[20rem] lg:right-[-18rem] lg:top-[-16rem] lg:h-[34rem] lg:w-[34rem]" />
          <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-[#E6F6FE] blur-3xl sm:h-[18rem] sm:w-[18rem] lg:bottom-[-14rem] lg:left-[-16rem] lg:h-[30rem] lg:w-[30rem]" />
          <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[1.03fr_.97fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#4F46E5] sm:tracking-[0.22em]">Measurement-literate acquisition systems</p>
              <h1 className="mt-5 max-w-4xl text-[2.15rem] font-semibold leading-[1.04] tracking-[-0.035em] text-[#0B1020] sm:text-6xl lg:text-[4.5rem] lg:leading-[.94] lg:tracking-[-0.065em]">Build an acquisition system you can actually measure.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#596579]">We connect paid media, AI search visibility, landing pages, tracking, and automation so you can see what is producing qualified demand — and what is just spending budget.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryLink href="#diagnostic">Get a Growth Diagnostic</PrimaryLink>
                <SecondaryLink href="#operating-loop">See the operating loop</SecondaryLink>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-[#596579]">For legal, professional-services, and complex-services teams where lead quality matters more than raw form volume.</p>
            </div>
            <HeroLoopCard />
          </div>
        </section>
        <TrustStrip />
        <ProblemFraming />
        <ServicesGrid />
        <ProcessPanel />
        <CaseStudyModule />
        <LoopLanes />
        <DiagnosticForm />
        <FaqAndFinalCta />
      </main>
      <Link href="#diagnostic" className={`fixed inset-x-4 bottom-4 z-50 rounded-xl bg-[#4F46E5] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_16px_35px_rgba(79,70,229,.32)] sm:hidden ${focusRing}`}>Get Diagnostic</Link>
    </div>
  )
}

export function AgencyTemplatesShell() {
  return (
    <div className="agency-artifact overflow-x-clip bg-[#F7F9FC] px-4 py-12 text-[#182033] sm:py-16 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="rounded-[1.5rem] border border-[#D8E1EC] bg-white p-6 shadow-[0_16px_40px_rgba(25,42,70,.10)] sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#4F46E5] sm:tracking-[0.22em]">Internal template library</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#0B1020] sm:text-5xl sm:tracking-[-0.045em]">Reusable page shells for service, landing, proof, and intake pages.</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#596579]">These modules mirror the Seven handoff and remain staging-only until publication approval. Each template keeps a first-viewport CTA, mid-page diagnostic CTA, proof-safe case slots, and a final conversion panel.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {templateCards.map((template) => (
            <article key={template.href} id={template.href.split('#')[1]} className="rounded-[1.125rem] border border-[#D8E1EC] bg-white p-6 shadow-[0_1px_2px_rgba(11,16,32,.06)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4F46E5]">{template.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-[#0B1020]">{template.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#596579]">{template.promise}</p>
              <ul className="mt-5 grid gap-2">
                {template.modules.map((module) => (
                  <li key={module} className="rounded-lg border border-[#D8E1EC] bg-[#F7F9FC] px-3 py-2 text-sm text-[#182033]">{module}</li>
                ))}
              </ul>
              <a href={template.href} className={`mt-5 inline-flex min-h-11 items-center rounded-lg border border-[#D8E1EC] bg-[#F7F9FC] px-4 py-2 text-sm font-semibold text-[#0B1020] hover:border-[#B8C7D9] ${focusRing}`}>Primary CTA: {template.primaryCta}</a>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-[1.5rem] border border-[#253250] bg-[#0A0F1F] p-6 text-white sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#AEBBD0]">Variant rules</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              'Swap hero visuals by intent without changing the measurement mechanism.',
              'Keep numeric proof as empty, caveated slots until source validation and approval exist.',
              'Forms remain stubbed; no live delivery, CRM write, or external lead capture is connected.',
            ].map((rule) => (
              <div key={rule} className="rounded-xl border border-[#253250] bg-[#111B33] p-4 text-sm leading-6 text-[#AEBBD0]">{rule}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
