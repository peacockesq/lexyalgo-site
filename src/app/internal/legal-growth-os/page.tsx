import type { Metadata } from 'next'
import { AgencyHomeShell } from '@/components/AgencySiteShell'

export const metadata: Metadata = {
  title: 'Internal Legal Growth OS Website Shell — LexyAlgo',
  description: 'Internal staging artifact for the Legal Growth Operating System agency website shell. Not approved for public publication.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function InternalLegalGrowthOsPage() {
  return <AgencyHomeShell />
}
