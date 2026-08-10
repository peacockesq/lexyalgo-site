import type { Metadata } from 'next'
import { CorpusHome } from '@/components/corpus/CorpusHome'
import { getLexyCorpusApiUrl, getLexyCorpusMcpUrl } from '@/lib/corpus'

export const metadata: Metadata = {
  title: 'LexyCorpus — LexyAlgo',
  description: 'Primary-law authority text with version-specific currentness, finality, and source-provenance evidence.',
}

export default function CorpusPage() {
  const apiBaseUrl = getLexyCorpusApiUrl()
  const mcpUrl = getLexyCorpusMcpUrl()
  return <CorpusHome apiBaseUrl={apiBaseUrl} mcpUrl={mcpUrl} />
}
