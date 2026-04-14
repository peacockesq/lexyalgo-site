export default function ContactThanksPage() {
  return (
    <section className="bg-gradient-to-b from-surface to-white py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/10 text-3xl">
          ✓
        </div>
        <h1 className="mt-6 font-[family-name:var(--font-space)] text-4xl font-bold text-slate-900">
          Thanks, we got your message
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          A LexyAlgo team member should reply within one business day.
        </p>
        <p className="mt-3 text-sm text-slate-500">
          If you do not hear back, email hello@lexyalgo.com directly.
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-teal px-8 py-3 font-semibold text-white transition-all hover:bg-[#12434D]"
          >
            Back to LexyAlgo
          </a>
        </div>
      </div>
    </section>
  )
}
