import type { AuthorityVersion } from "@/lib/corpus";

export function PrimaryTextReader({ version }: { version: AuthorityVersion }) {
  return (
    <section aria-labelledby="primary-text-heading" className="py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Source-native content</p>
          <h2 id="primary-text-heading" className="font-serif text-3xl font-semibold text-slate-950">Primary text</h2>
        </div>
        <p className="text-xs text-slate-500">Editorial annotations and summaries excluded</p>
      </div>
      <div className="mx-auto max-w-[72ch] font-serif text-[1.08rem] leading-[1.85] text-slate-900">
        {version.primary_text.split(/\n\n+/).map((paragraph, index) => (
          <p key={`${index}-${paragraph.slice(0, 20)}`} className="mb-6 whitespace-pre-wrap">{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
