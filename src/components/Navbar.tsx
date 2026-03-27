'use client'

import Link from 'next/link'
import { useState } from 'react'

const products = [
  { name: 'Divorce Forms', href: '/products/divorce', color: '#2B4580', badge: 'Soon' },
  { name: 'Asset Divider', href: '/products/asset-divider', color: '#B02700', badge: 'Soon' },
  { name: 'Co-Parent', href: '/products/co-parent', color: '#2E6B4F', badge: 'Soon' },
  { name: 'Support Calculator', href: '/calculator', color: '#1E5F6C', badge: 'Live' },
  { name: 'QDRO Services', href: '/products/qdro', color: '#8B5E3C', badge: 'Live' },
  { name: 'Estate Planning', href: '/products/estate-planning', color: '#7A5C1E', badge: 'Free Beta' },
  { name: 'LexyFiling', href: '/products/filing', color: '#4B3D7A', badge: 'Soon' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 font-[family-name:var(--font-space)] font-bold text-xl tracking-tight text-slate-900">
          LEXY <span className="text-slate-400 font-light">/</span> ALGO
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {/* Products dropdown */}
          <div className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1">
              Products
              <svg className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {productsOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-lg border border-slate-100 p-2">
                {products.map((p) => (
                  <Link key={p.href} href={p.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group"
                    onClick={() => setProductsOpen(false)}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{p.name}</span>
                    {p.badge && (
                      <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${
                        p.badge === 'Live' ? 'bg-green-100 text-green-700' : 'bg-violet-100 text-violet-700'
                      }`}>{p.badge}</span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/calculator" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">Calculator</Link>
          <Link href="/pricing" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">Pricing</Link>
          <Link href="/mission" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">Mission</Link>
          <Link href="/blog" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">Blog</Link>
          <Link href="/contact" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">Contact</Link>

          <Link href="/calculator"
            className="bg-teal text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#12434D] transition-colors shadow-sm shadow-teal/20"
          >
            Try Calculator
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-slate-700"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pb-6 pt-2">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 pt-3 pb-1">Products</p>
            {products.map((p) => (
              <Link key={p.href} href={p.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-sm font-medium text-slate-700">{p.name}</span>
                {p.badge && (
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                    p.badge === 'Live' ? 'bg-green-100 text-green-700' : 'bg-violet-100 text-violet-700'
                  }`}>{p.badge}</span>
                )}
              </Link>
            ))}
          </div>
          <div className="mt-3 space-y-1 border-t border-slate-100 pt-3">
            <Link href="/pricing" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-50">Pricing</Link>
            <Link href="/mission" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-50">Mission</Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-50">Blog</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-50">Contact</Link>
          </div>
          <Link href="/calculator"
            className="block mt-4 text-center bg-teal text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-[#12434D] transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Try Calculator — Free
          </Link>
        </div>
      )}
    </header>
  )
}
