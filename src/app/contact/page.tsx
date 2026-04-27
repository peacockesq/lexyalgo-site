const contactInfo = [
  { label: 'Address', value: '1174 Whitney Avenue\nHamden, CT 06517-3432', icon: '📍' },
  { label: 'Response times', value: 'We usually reply within 1 to 2 business days.', icon: '⏱️' },
]

const formAction = 'https://formsubmit.co/hello@lexyalgo.com'
const contactPageUrl = 'https://lexyalgo.com/contact'
const thankYouUrl = 'https://lexyalgo.com/contact/thanks'

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-slate-900">Get in touch</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Questions about our tools, product feedback, partnerships, or press? Send us a note and we&rsquo;ll route it to the right person.
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

            <div className="mt-8 rounded-2xl bg-slate-100 p-6">
              <p className="text-xs italic text-slate-500">
                LexyAlgo provides document preparation tools, not legal advice. If you need an attorney, we&rsquo;re happy to point you in the right direction.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form
              action={formAction}
              method="POST"
              className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-6"
            >
              <div className="rounded-2xl border border-teal/20 bg-teal/5 p-5">
                <p className="text-sm font-semibold text-slate-900">Send us a message</p>
                <p className="mt-2 text-sm text-slate-700">
                  Use the form below for product questions, feedback, partnerships, or press inquiries. Please do not include confidential case details here.
                </p>
              </div>

              <input type="hidden" name="_subject" value="New LexyAlgo contact form submission" />
              <input type="hidden" name="_next" value={thankYouUrl} />
              <input type="hidden" name="_url" value={contactPageUrl} />
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
                  className="inline-flex items-center justify-center rounded-xl bg-teal px-8 py-3 font-semibold text-white shadow-sm shadow-teal/20 transition-all hover:bg-[#12434D] active:scale-[0.98]"
                >
                  Send message
                </button>
                <p className="text-sm text-slate-500">We usually reply within 1 to 2 business days.</p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
