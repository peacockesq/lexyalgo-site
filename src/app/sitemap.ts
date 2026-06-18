import type { MetadataRoute } from 'next'
import { getCorpusCaseSlugs } from '@/lib/corpus'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lexyalgo.com').replace(/\/$/, '')
export const dynamic = 'force-static'

const staticRoutes = [
  '',
  '/blog',
  '/calculator',
  '/calculator/child-support',
  '/contact',
  '/corpus',
  '/mission',
  '/pricing',
  '/privacy',
  '/privacy/do-not-sell',
  '/products/asset-divider',
  '/products/co-parent',
  '/products/divorce',
  '/products/estate-planning',
  '/products/filing',
  '/products/qdro',
  '/terms',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const corpusCaseRoutes = getCorpusCaseSlugs().map((slug) => ({
    url: `${siteUrl}/corpus/cases/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.65,
  }))

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: route === '/corpus' ? ('daily' as const) : ('monthly' as const),
      priority: route === '' ? 1 : route === '/corpus' ? 0.9 : 0.7,
    })),
    ...corpusCaseRoutes,
  ]
}
