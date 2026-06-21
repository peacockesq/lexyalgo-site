'use client'

import { usePathname } from 'next/navigation'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isInternalAgencyArtifact = pathname?.startsWith('/internal/legal-growth-os')

  if (isInternalAgencyArtifact) {
    return <div className="flex-1">{children}</div>
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
