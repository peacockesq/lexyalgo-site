import type { Metadata } from 'next'
import { CorpusHome } from '@/components/corpus/CorpusHome'

export const metadata: Metadata = {
  title: 'LexyCorpus — LexyAlgo',
  description: 'Primary-law authority text with version-specific currentness, finality, and source-provenance evidence.',
}

export default function CorpusPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_LEXYCORPUS_API_URL?.replace(/\/$/, '') || null
  const mcpUrl = process.env.NEXT_PUBLIC_LEXYCORPUS_MCP_URL || null
  return <CorpusHome apiBaseUrl={apiBaseUrl} mcpUrl={mcpUrl} />
}
