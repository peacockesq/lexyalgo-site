'use client'

import { useState } from 'react'

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

const contactRecipient = String.fromCharCode(
  104, 101, 108, 108, 111, 64, 108, 101, 120, 121, 97, 108, 103, 111, 46, 99, 111, 109,
)

const contactEndpoint = `https://formsubmit.co/ajax/${contactRecipient}`
const contactPageUrl = 'https://lexyalgo.com/contact'
const thankYouUrl = '/contact/thanks'

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)
    formData.set('_subject', 'New LexyAlgo contact form submission')
    formData.set('_url', contactPageUrl)
    formData.set('_template', 'table')

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Contact form returned HTTP ${response.status}`)
      }

      const payload = await response.json().catch(() => null) as { success?: string; message?: string } | null
      const combinedMessage = `${payload?.success ?? ''} ${payload?.message ?? ''}`.toLowerCase()
      if (combinedMessage.includes('activation')) {
        throw new Error('Contact delivery provider still requires activation.')
      }

      setStatus('success')
      window.location.assign(thankYouUrl)
    } catch (error) {
      console.error('Contact form submission failed:', error)
      setStatus('error')
      setErrorMessage('We could not send the message yet. Please try again in a few minutes.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-6"
    >
      <div className="rounded-2xl border border-teal/20 bg-teal/5 p-5">
        <p className="text-sm font-semibold text-slate-900">Send us a message</p>
        <p className="mt-2 text-sm text-slate-700">
          Use the form below for product questions, feedback, partnerships, or press inquiries. Please do not include confidential case details here.
        </p>
      </div>

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

      {status === 'error' && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center rounded-xl bg-teal px-8 py-3 font-semibold text-white shadow-sm shadow-teal/20 transition-all hover:bg-[#12434D] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </button>
        <p className="text-sm text-slate-500">We usually reply within 1 to 2 business days.</p>
      </div>
    </form>
  )
}
