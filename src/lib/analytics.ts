// Google Analytics 4 event tracking utility
// Measurement ID: G-XH4GTCEQDR

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export const GA_MEASUREMENT_ID = 'G-XH4GTCEQDR'

// Log page views (handled automatically by gtag, but useful for SPA route changes)
export function pageview(url: string) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: url })
}

// Log custom events
export function event(action: string, params?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', action, params)
}

// Pre-defined events
export const trackWaitlistSignup = (product: string) =>
  event('generate_lead', {
    event_category: 'waitlist',
    event_label: product,
    value: 1,
  })

export const trackContactForm = () =>
  event('generate_lead', {
    event_category: 'contact',
    event_label: 'contact_form',
    value: 1,
  })

export const trackCalculatorUse = (calculator: string) =>
  event('calculator_use', {
    event_category: 'engagement',
    event_label: calculator,
  })

export const trackCTAClick = (cta: string, location: string) =>
  event('cta_click', {
    event_category: 'engagement',
    event_label: cta,
    page_location: location,
  })
