import { ContactForm } from '@/components/ContactForm'

const contactInfo = [
  { label: 'Address', value: '1174 Whitney Avenue\nHamden, CT 06517-3432', icon: '📍' },
  { label: 'Response times', value: 'We usually reply within 1 to 2 business days.', icon: '⏱️' },
]

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
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
