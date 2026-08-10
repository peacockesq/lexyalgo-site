import type { Metadata } from 'next'
import { CorpusHome } from '@/components/corpus/CorpusHome'
import { getLexyCorpusApiUrl, getLexyCorpusMcpUrl } from '@/lib/corpus'

export const metadata: Metadata = {
  title: 'LexyCorpus — LexyAlgo',
  description: 'Search millions of statutes, constitutions, and judicial opinions with visible verification grades, canonical versions, source provenance, and integrity proof.',
}

export default function CorpusPage() {
  const apiBaseUrl = getLexyCorpusApiUrl()
  const mcpUrl = getLexyCorpusMcpUrl()
  return <CorpusHome apiBaseUrl={apiBaseUrl} mcpUrl={mcpUrl} />
}
