'use client';

export function Disclaimer({ position = 'top' }: { position?: 'top' | 'bottom' }) {
  return (
    <div className={`rounded-2xl border-2 border-amber-300 bg-amber-50 px-5 py-4 ${position === 'bottom' ? 'mt-8' : 'mb-8'}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none">⚠️</span>
        <div>
          <p className="font-semibold text-amber-900 text-sm uppercase tracking-wide">
            Beta Estimate Only
          </p>
          <p className="mt-1 text-amber-800 text-sm leading-relaxed">
            This calculator provides rough estimates for informational purposes only. It is in beta and should not be relied upon as legal advice. Child support calculations involve many factors not captured here. Consult a licensed attorney or your state&apos;s child support agency for accurate calculations.
          </p>
        </div>
      </div>
    </div>
  );
}
