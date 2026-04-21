'use client'

import { useState } from 'react'

const contactInfo = [
  { label: 'Address', value: '1174 Whitney Avenue\nHamden, CT 06517-3432', icon: '📍' },
  { label: 'Phone', value: '(929) 437-3767', icon: '📞', href: 'tel:+19294373767' },
]

const subjectOptions = [
  'General inquiry',
  'Calculator question',
  'Product feedback',
  'Partnership or integration',
  'Press or media',
  'Other',
] as const

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState<(typeof subjectOptions)[number]>('General inquiry')
  const [message, setMessage] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const body = [`Name: ${name}`, `Email: ${email}`, '', message].join('\n')
    const mailto = `mailto:hello@lexyalgo.com?subject=${encodeURIComponent(`LexyAlgo contact: ${subject}`)}&body=${encodeURIComponent(body)}`

    window.location.href = mailto
  }

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-space)] text-4xl font-bold text-slate-900 sm:text-5xl">Get in touch</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Questions about calculators, QDRO services, product feedback, or partnerships? Reach out and we&rsquo;ll point you in the right direction.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-8">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-sm font-bold text-slate-900 font-[family-name:var(--font-space)]">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="mt-1 block whitespace-pre-line text-sm text-slate-600 transition-colors hover:text-slate-900">
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 whitespace-pre-line text-sm text-slate-600">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="rounded-2xl bg-slate-100 p-6">
              <p className="text-sm font-semibold text-slate-900">Fastest path</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Share your question here and we&rsquo;ll make sure it reaches the right LexyAlgo team.
              </p>
              <p className="mt-3 text-sm text-slate-600">We usually reply within one business day.</p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-6">
              <p className="text-xs italic text-slate-500">
                LexyAlgo provides document preparation tools, not legal advice. If you need an attorney, we&rsquo;ll say so directly.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-8 sm:p-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-700">Subject</label>
                <select
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as (typeof subjectOptions)[number])}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                >
                  {subjectOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">Message</label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="How can we help?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                  required
                />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">Tell us what you need and we&rsquo;ll route it to the right place.</p>
                <button
                  type="submit"
                  className="rounded-xl bg-teal px-8 py-3 font-semibold text-white shadow-sm shadow-teal/20 transition-all hover:bg-[#12434D] active:scale-[0.98]"
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
