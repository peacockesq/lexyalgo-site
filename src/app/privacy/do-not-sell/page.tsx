'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DoNotSellPage() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production this would POST to an API
    setSubmitted(true)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h1 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-slate-900">
        Do Not Sell My Personal Information
      </h1>
      <p className="mt-4 text-slate-600 leading-relaxed">
        Under the California Consumer Privacy Act (CCPA), California residents have the right to opt out of the &ldquo;sale&rdquo; of their personal information.
      </p>
      <div className="mt-6 bg-teal-light rounded-2xl p-6 border border-teal/10">
        <p className="text-sm text-slate-700">
          <strong>LexyAlgo does not sell your personal information.</strong> We do not share your data with third parties for monetary consideration. However, if you would like to formally submit an opt-out request for your records, you may use the form below.
        </p>
      </div>

      {submitted ? (
        <div className="mt-10 bg-green-50 rounded-2xl p-8 border border-green-200 text-center">
          <div className="text-3xl mb-3">✅</div>
          <h2 className="font-[family-name:var(--font-space)] text-xl font-bold text-slate-900">
            Request Received
          </h2>
          <p className="mt-2 text-slate-600">
            We&rsquo;ve recorded your opt-out request. As noted above, LexyAlgo does not sell personal information, but your request is on file. You&rsquo;ll receive a confirmation email at <strong>{email}</strong>.
          </p>
          <Link href="/" className="inline-flex items-center mt-6 text-sm font-semibold text-teal hover:underline">
            ← Back to home
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
              placeholder="Your full legal name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-slate-700 mb-1">State of Residence</label>
            <input
              id="state"
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
              placeholder="e.g. California"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal text-white font-semibold px-8 py-4 rounded-2xl hover:bg-[#12434D] transition-all shadow-lg shadow-teal/20 active:scale-[0.98]"
          >
            Submit Opt-Out Request
          </button>
          <p className="text-xs text-slate-500 text-center">
            We will process your request within 45 days as required by the CCPA.
          </p>
        </form>
      )}

      <div className="mt-12 pt-8 border-t border-slate-200">
        <p className="text-sm text-slate-500">
          For questions about your privacy rights, contact us at{' '}
          <a href="mailto:privacy@lexyalgo.com" className="text-teal hover:underline">privacy@lexyalgo.com</a>.
          See our full <Link href="/privacy" className="text-teal hover:underline">Privacy Policy</Link> for details.
        </p>
      </div>
    </div>
  )
}
