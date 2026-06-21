import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import { SiteChrome } from '@/components/SiteChrome'
import { AnalyticsGate } from '@/components/AnalyticsGate'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LexyAlgo — Divorce Tools That Actually Help',
  description: 'Divorce is hard. Your tools shouldn\'t be. Court-form-driven document preparation, calculators, and family-law workflows that help people move forward with more clarity.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'LexyAlgo — Divorce Tools That Actually Help',
    description: 'Court-form-driven document preparation, asset division, co-parenting, and support calculators.',
    url: 'https://lexyalgo.com',
    siteName: 'LexyAlgo',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <AnalyticsGate />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
