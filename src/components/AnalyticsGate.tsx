'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const GTM_ID = 'GTM-TMZRCGT'
const INTERNAL_ANALYTICS_BLOCKLIST = ['/internal/legal-growth-os']

function analyticsAllowed(pathname: string | null) {
  return !INTERNAL_ANALYTICS_BLOCKLIST.some((prefix) => pathname?.startsWith(prefix))
}

export function AnalyticsGate() {
  const pathname = usePathname()

  if (!analyticsAllowed(pathname)) {
    return null
  }

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
      <GoogleAnalytics />
    </>
  )
}
