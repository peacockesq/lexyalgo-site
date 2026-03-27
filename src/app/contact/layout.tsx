import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — LexyAlgo',
  description: 'Get in touch with LexyAlgo. Questions about our tools, partnership opportunities, or QDRO services.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
