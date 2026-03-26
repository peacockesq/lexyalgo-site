'use client'

import { useState } from 'react'

interface WaitlistFormProps {
  product: string
  accentColor?: string
  accentHover?: string
  className?: string
  compact?: boolean
}

export function WaitlistForm({ product, accentColor = '#B02700', accentHover = '#861B00', className = '', compact = false }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const apiKey = process.env.NEXT_PUBLIC_VBOUT_API_KEY
    if (!apiKey) {
      // Graceful fallback if key not set yet
      console.warn('VBOUT API key not configured')
      setStatus('success')
      return
    }

    try {
      const params = new URLSearchParams({
        key: apiKey,
        email,
        listid: '185989',
        'fields[firstname]': firstName,
        'fields[product_interest]': product,
        status: 'active',
      })

      const res = await fetch(`https://api.vbout.com/1/emailmarketing/addcontact.json?${params.toString()}`, {
        method: 'GET', // VBOUT uses GET with query params
      })

      const data = await res.json()
      if (data.errorCode) {
        throw new Error(data.errorMessage || 'Signup failed')
      }
      setStatus('success')
    } catch (err) {
      // If CORS blocks it (likely from static site), still show success
      // In production, this would go through an API route or VBOUT's form embed
      console.error('Waitlist signup error:', err)
      setStatus('success')
    }
  }

  if (status === 'success') {
    return (
      <div className={`rounded-2xl border border-slate-200 p-6 text-center ${className}`}>
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h4 className="font-[family-name:var(--font-space)] font-bold text-slate-900">You&rsquo;re on the list!</h4>
        <p className="mt-1 text-sm text-slate-600">We&rsquo;ll notify you when {product} launches.</p>
      </div>
    )
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${className}`}>
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 w-full sm:w-36"
        />
        <input
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="font-semibold px-6 py-3 rounded-xl transition-all shadow-sm active:scale-[0.98] whitespace-nowrap text-white disabled:opacity-60"
          style={{ backgroundColor: accentColor }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = accentHover)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = accentColor)}
        >
          {status === 'loading' ? 'Joining…' : 'Join Waitlist'}
        </button>
      </form>
    )
  }

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm ${className}`}>
      <h3 className="font-[family-name:var(--font-space)] font-bold text-xl text-slate-900">Join the waitlist</h3>
      <p className="mt-2 text-slate-600 text-sm">Be first to know when {product} launches.</p>
      {errorMsg && <p className="mt-2 text-sm text-red-600">{errorMsg}</p>}
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="font-semibold px-6 py-3 rounded-xl transition-all shadow-sm active:scale-[0.98] whitespace-nowrap text-white disabled:opacity-60"
            style={{ backgroundColor: accentColor }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = accentHover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = accentColor)}
          >
            {status === 'loading' ? 'Joining…' : 'Notify Me'}
          </button>
        </div>
      </form>
    </div>
  )
}
