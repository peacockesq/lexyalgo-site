import Image from 'next/image'

interface RealScreenshotProps {
  src: string
  alt: string
  accentColor?: string
  label?: string
  url?: string
}

export function RealScreenshot({ src, alt, accentColor = '#1E5F6C', label = 'Product Preview', url = 'lexyalgo.com' }: RealScreenshotProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: accentColor }}>
            {label}
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            See it in action
          </h2>
        </div>
        <div
          className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200/80"
          style={{ transform: 'perspective(1400px) rotateX(1.5deg)', transformOrigin: 'top center' }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 border-b border-slate-200">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            <div className="ml-3 flex-1 max-w-[260px] h-5 rounded bg-white border border-slate-200 flex items-center px-2.5">
              <span className="text-[10px] text-slate-400 truncate">{url}</span>
            </div>
          </div>
          {/* Screenshot */}
          <Image
            src={src}
            alt={alt}
            width={1280}
            height={800}
            className="w-full h-auto block"
            priority
          />
        </div>
      </div>
    </section>
  )
}
