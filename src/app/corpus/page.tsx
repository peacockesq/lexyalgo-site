import type { Metadata } from 'next'
import { CorpusHome } from '@/components/corpus/CorpusHome'

export const metadata: Metadata = {
  title: 'LexyCorpus — LexyAlgo',
  description: 'Primary-law authority text with version-specific currentness, finality, and source-provenance evidence.',
}

export default function CorpusPage() {
  return <CorpusHome />
}
