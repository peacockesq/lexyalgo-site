import Link from 'next/link'

const contactInfo = [
  { label: 'Mailing address', value: '1174 Whitney Avenue\nHamden, CT 06517-3432', icon: '📍' },
  { label: 'Support line', value: 'Publishing soon, once the dedicated LexyAlgo number is live.', icon: '📞' },
  { label: 'General inbox', value: 'Publishing soon, once the production contact inbox is verified.', icon: '✉️' },
]

const contactLanes = [
  {
    title: 'Product updates',
    body: 'Want to hear when calculators, filing, or co-parenting tools launch? Join the waitlist and we will send product updates there.',
    href: '/pricing',
    cta: 'View pricing and waitlists',
  },
  {
    title: 'Privacy requests',
    body: 'Need a privacy or data-rights contact path right now? Use the documented privacy lane instead of a generic inbox.',
    href: '/privacy',
    cta: 'Open privacy policy',
  },
  {
    title: 'Terms and legal notices',
    body: 'For formal legal notices or terms questions, use the legal contact path listed on the terms page.',
    href: '/terms',
    cta: 'Open terms',
  },
]

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900">Contact routing is being finalized</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl">
            We removed the old placeholder form because it did not send anywhere. Until the production inbox, anti-spam flow, and dedicated support number are verified, this page shows only confirmed contact paths.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-8">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-[family-name:var(--font-space)] font-bold text-slate-900 text-sm">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-600 whitespace-pre-line">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mt-8">
              <p className="text-sm text-amber-900 font-medium">Why this changed</p>
              <p className="mt-2 text-sm text-amber-800">
                The previous contact form showed a success state without delivering a real message. It is better to be explicit than to pretend a message was sent.
              </p>
            </div>

            <div className="bg-slate-100 rounded-2xl p-6">
              <p className="text-xs text-slate-500 italic">
                LexyAlgo provides document preparation tools, not legal advice. If you need legal advice, consult a licensed attorney in your jurisdiction.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 sm:p-10">
            <h2 className="font-[family-name:var(--font-space)] font-bold text-2xl text-slate-900">Use a confirmed lane</h2>
            <p className="mt-3 text-slate-600 max-w-2xl">
              We will add the general contact form back only after it reaches a real inbox and includes verified anti-spam protection. Until then, use one of the confirmed paths below.
            </p>

            <div className="mt-8 grid gap-4">
              {contactLanes.map((lane) => (
                <div key={lane.title} className="rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-[family-name:var(--font-space)] font-bold text-lg text-slate-900">{lane.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{lane.body}</p>
                  <Link
                    href={lane.href}
                    className="mt-4 inline-flex items-center rounded-xl bg-teal px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#12434D] transition-all active:scale-[0.98]"
                  >
                    {lane.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
