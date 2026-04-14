const contactInfo = [
  { label: 'Address', value: '1174 Whitney Avenue\nHamden, CT 06517-3432', icon: '📍' },
  { label: 'Email', value: 'hello@lexyalgo.com', icon: '✉️' },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface to-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900">Get in touch</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl">
            Questions about our tools, partnership opportunities, or just want to say hello? We&rsquo;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
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

            <div className="bg-slate-100 rounded-2xl p-6 mt-8">
              <p className="text-xs text-slate-500 italic">
                LexyAlgo provides document preparation tools, not legal advice. If you need an attorney, we&rsquo;re happy to point you in the right direction.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-6">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <p className="text-sm font-semibold text-amber-900">Secure contact form coming soon</p>
                <p className="mt-2 text-sm text-amber-800">
                  We are replacing the old placeholder form with a verified delivery path and anti-spam protection.
                  Until that is live, please email us directly so your message reaches a real inbox.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-[family-name:var(--font-space)] font-bold text-xl text-slate-900">Email LexyAlgo</h3>
                <p className="text-slate-600">
                  For product questions, partnership inquiries, or support, email us and we&rsquo;ll reply within one business day.
                </p>
              </div>

              <a
                href="mailto:hello@lexyalgo.com?subject=LexyAlgo%20inquiry"
                className="inline-flex items-center justify-center bg-teal text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#12434D] transition-all shadow-sm shadow-teal/20 active:scale-[0.98]"
              >
                Email hello@lexyalgo.com
              </a>

              <p className="text-xs text-slate-500">
                We are intentionally hiding phone support here until a verified LexyAlgo support number is confirmed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
