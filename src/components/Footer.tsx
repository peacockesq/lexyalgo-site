import Link from 'next/link'
import { WaitlistForm } from './WaitlistForm'

const productLinks = [
  { name: 'Support Calculator', href: '/calculator', live: true },
  { name: 'Asset Divider', href: '/products/asset-divider' },
  { name: 'Co-Parent', href: '/products/co-parent' },
  { name: 'LexyFiling', href: '/products/filing' },
]

const companyLinks = [
  { name: 'Mission', href: '/mission' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy Policy', href: '#' },
  { name: 'Do Not Sell My Personal Information', href: '#' },
]

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      {/* Newsletter signup */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-[family-name:var(--font-space)] font-bold text-xl text-white">Stay in the loop</h3>
              <p className="mt-2 text-sm text-slate-400">Get notified when we launch new tools. No spam — just product updates.</p>
            </div>
            <WaitlistForm product="LexyAlgo Newsletter" accentColor="#1E5F6C" accentHover="#12434D" compact />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-[family-name:var(--font-space)] font-bold text-xl text-white tracking-tight">
              LEXY <span className="text-slate-600 font-light">/</span> ALGO
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-md">
              Court-form-driven divorce document preparation tools, asset division calculators, and co-parenting solutions — built by an attorney licensed in 8 states.
            </p>
            {/* Social placeholders */}
            <div className="flex gap-4 mt-6">
              {['Twitter', 'LinkedIn', 'Facebook'].map((s) => (
                <a key={s} href="#" className="text-slate-500 hover:text-slate-300 transition-colors text-sm">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-[family-name:var(--font-space)] font-semibold text-white text-sm uppercase tracking-wider mb-4">Products</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href} className="flex items-center gap-2">
                  <Link href={link.href} className="text-sm hover:text-slate-200 transition-colors">{link.name}</Link>
                  {link.live && <span className="text-[10px] bg-green-900/50 text-green-400 px-1.5 py-0.5 rounded-full">Live</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-[family-name:var(--font-space)] font-semibold text-white text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-slate-200 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500">
          © 2026 LexyAlgo. Document preparation tools, not a law firm.
        </div>
      </div>
    </footer>
  )
}
