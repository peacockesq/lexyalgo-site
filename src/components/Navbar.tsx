'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const productGroups = [
  {
    label: 'Divorce & family law',
    items: [
      { name: 'Atlas', href: 'https://atlas.lexyalgo.com', color: '#515F74', badge: 'Preview' },
      { name: 'Calculators', href: '/calculator', color: '#1E5F6C', badge: 'Live' },
      { name: 'QDRO Services', href: '/products/qdro', color: '#8B5E3C', badge: 'Live' },
      { name: 'Divorce Forms', href: '/products/divorce', color: '#2B4580', badge: 'Preview' },
      { name: 'Asset Divider', href: '/products/asset-divider', color: '#B02700', badge: 'Preview' },
      { name: 'Co-Parent', href: '/products/co-parent', color: '#2E6B4F', badge: 'Preview' },
      { name: 'LexyFiling', href: '/products/filing', color: '#4B3D7A', badge: 'Coming Soon' },
    ],
  },
  {
    label: 'Estate planning',
    items: [
      { name: 'Estate Planning', href: '/products/estate-planning', color: '#7A5C1E', badge: 'Free Beta' },
    ],
  },
] as const

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const productsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!productsOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!productsRef.current?.contains(event.target as Node)) {
        setProductsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setProductsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [productsOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-1 font-[family-name:var(--font-space)] text-xl font-bold tracking-tight text-slate-900">
          LEXY <span className="font-light text-slate-400">/</span> ALGO
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <div
            ref={productsRef}
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
            onFocusCapture={() => setProductsOpen(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setProductsOpen(false)
              }
            }}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
              aria-expanded={productsOpen}
              aria-haspopup="menu"
              aria-controls="products-menu"
              onClick={() => setProductsOpen((open) => !open)}
            >
              Products
              <svg className={`h-4 w-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>

            <div className={`absolute left-0 top-full pt-2 ${productsOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
              <div
                id="products-menu"
                className={`w-[22rem] rounded-3xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/8 transition-all duration-150 ${productsOpen ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'}`}
              >
                {productGroups.map((group, groupIndex) => (
                  <div key={group.label} className={groupIndex === 0 ? '' : 'mt-3 border-t border-slate-100 pt-3'}>
                    <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{group.label}</p>
                    <div className="space-y-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="group flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-slate-50 focus:bg-slate-50"
                          onClick={() => setProductsOpen(false)}
                        >
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{item.name}</span>
                          <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-medium ${item.badge === 'Live' ? 'bg-green-100 text-green-700' : item.badge === 'Free Beta' ? 'bg-amber-100 text-amber-700' : item.badge === 'Preview' ? 'bg-sky-100 text-sky-700' : 'bg-violet-100 text-violet-700'}`}>{item.badge}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link href="/pricing" className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">Pricing</Link>
          <Link href="/mission" className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">Mission</Link>
          <Link href="/blog" className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">Blog</Link>
          <Link href="/contact" className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">Contact</Link>

          <Link
            href="/#products"
            className="rounded-xl bg-primary-container px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary-container/20 transition-colors hover:bg-primary active:scale-[0.98]"
          >
            Explore tools
          </Link>
        </div>

        <button
          className="p-2 text-slate-700 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-6 pt-2 md:hidden">
          <div className="space-y-1">
            <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Products</p>
            {productGroups.map((group) => (
              <div key={group.label} className="pt-1 first:pt-0">
                <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{group.label}</p>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50"
                  >
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium text-slate-700">{item.name}</span>
                    <span className={`ml-auto rounded-full px-2 py-0.5 text-xs ${item.badge === 'Live' ? 'bg-green-100 text-green-700' : item.badge === 'Free Beta' ? 'bg-amber-100 text-amber-700' : item.badge === 'Preview' ? 'bg-sky-100 text-sky-700' : 'bg-violet-100 text-violet-700'}`}>{item.badge}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-3 space-y-1 border-t border-slate-100 pt-3">
            <Link href="/pricing" onClick={() => setMobileOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Pricing</Link>
            <Link href="/mission" onClick={() => setMobileOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Mission</Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Blog</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Contact</Link>
          </div>

          <Link
            href="/#products"
            className="mt-4 block rounded-xl bg-primary-container px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-primary"
            onClick={() => setMobileOpen(false)}
          >
            Explore tools
          </Link>
        </div>
      )}
    </header>
  )
}
