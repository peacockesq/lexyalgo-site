const contactInfo = [
  { label: 'Address', value: '1174 Whitney Avenue\nHamden, CT 06517-3432', icon: '📍' },
  { label: 'Email', value: 'hello@lexyalgo.com', icon: '✉️' },
]

const formAction = 'https://formsubmit.co/hello@lexyalgo.com'
const thankYouUrl = 'https://lexyalgo.com/contact/thanks'

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

            <div className="bg-slate-100 rounded-2xl p-6 mt-8 space-y-3">
              <p className="text-xs text-slate-500 italic">
                LexyAlgo provides document preparation tools, not legal advice. If you need an attorney, we&rsquo;re happy to point you in the right direction.
              </p>
              <p className="text-xs text-slate-500">
                Phone support stays hidden until a verified LexyAlgo support number is confirmed.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <form
              action={formAction}
              method="POST"
              className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-6"
            >
              <div className="rounded-2xl border border-teal/20 bg-teal/5 p-5">
                <p className="text-sm font-semibold text-slate-900">Verified inbox delivery is now wired for the static site</p>
                <p className="mt-2 text-sm text-slate-700">
                  Messages submit through FormSubmit with email verification, built-in CAPTCHA, and a hidden honeypot field for spam filtering.
                </p>
              </div>

              <input type="hidden" name="_subject" value="New LexyAlgo contact form submission" />
              <input type="hidden" name="_next" value={thankYouUrl} />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                <select
                  id="subject"
                  name="topic"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal text-slate-700"
                  defaultValue="General inquiry"
                >
                  <option>General inquiry</option>
                  <option>Calculator question</option>
                  <option>Product feedback</option>
                  <option>Partnership / integration</option>
                  <option>Press / media</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal resize-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-teal text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#12434D] transition-all shadow-sm shadow-teal/20 active:scale-[0.98]"
                >
                  Send Message
                </button>

                <a
                  href="mailto:hello@lexyalgo.com?subject=LexyAlgo%20inquiry"
                  className="text-sm font-medium text-teal hover:text-[#12434D]"
                >
                  Prefer email? hello@lexyalgo.com
                </a>
              </div>

              <p className="text-xs text-slate-500">
                If this is the first live submission after deploy, FormSubmit will send an activation email to hello@lexyalgo.com before future messages start delivering.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
