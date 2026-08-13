import type { Metadata } from 'next'
import { CorpusHome } from '@/components/corpus/CorpusHome'
import { getLexyCorpusApiUrl, getLexyCorpusMcpUrl } from '@/lib/corpus'

export const metadata: Metadata = {
  title: 'LexyCorpus — LexyAlgo',
  description: 'Free legal research for attorneys, self-represented people, and the public, with clear verification grades for every authority.',
}

export default function CorpusPage() {
  const apiBaseUrl = getLexyCorpusApiUrl()
  const mcpUrl = getLexyCorpusMcpUrl()
  return <CorpusHome apiBaseUrl={apiBaseUrl} mcpUrl={mcpUrl} />
}
