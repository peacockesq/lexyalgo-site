import type { Metadata } from 'next'
import { AgencyTemplatesShell } from '@/components/AgencySiteShell'

export const metadata: Metadata = {
  title: 'Internal Legal Growth OS Template Library — LexyAlgo',
  description: 'Internal staging artifact for Legal Growth Operating System reusable page templates. Not approved for public publication.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function InternalLegalGrowthOsTemplatesPage() {
  return <AgencyTemplatesShell />
}
