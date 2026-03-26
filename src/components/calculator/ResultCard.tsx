'use client';

import type { SupportBreakdown } from '@/lib/state-formulas';

interface ResultCardProps {
  result: SupportBreakdown;
  numberOfChildren: number;
}

export function ResultCard({ result, numberOfChildren }: ResultCardProps) {
  if (result.estimatedMonthlySupport <= 0) return null;

  const childrenLabel = numberOfChildren === 1 ? 'child' : 'children';
  const payerLabel = result.payingParent === 1 ? 'Parent 1' : 'Parent 2';

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#1E5F6C] to-[#164B56] p-8 text-white shadow-lg">
      <p className="text-sm font-medium text-white/70 uppercase tracking-wider">
        Estimated Monthly Support
      </p>
      <p className="mt-2 text-5xl font-bold font-[family-name:var(--font-space-grotesk)] tracking-tight">
        ${result.estimatedMonthlySupport.toLocaleString()}
      </p>
      <p className="mt-2 text-sm text-white/80">
        {payerLabel} contributes this amount monthly to support {numberOfChildren} {childrenLabel}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white/10 px-4 py-3">
          <p className="text-xs text-white/60">Basic obligation</p>
          <p className="text-lg font-semibold">${result.basicObligation.toLocaleString()}</p>
        </div>
        {result.childcareShare > 0 && (
          <div className="rounded-xl bg-white/10 px-4 py-3">
            <p className="text-xs text-white/60">Childcare</p>
            <p className="text-lg font-semibold">${result.childcareShare.toLocaleString()}</p>
          </div>
        )}
        {result.healthInsuranceShare > 0 && (
          <div className="rounded-xl bg-white/10 px-4 py-3">
            <p className="text-xs text-white/60">Health insurance</p>
            <p className="text-lg font-semibold">${result.healthInsuranceShare.toLocaleString()}</p>
          </div>
        )}
        {result.parentingTimeAdjustment !== 0 && (
          <div className="rounded-xl bg-white/10 px-4 py-3">
            <p className="text-xs text-white/60">Parenting time adj.</p>
            <p className="text-lg font-semibold">
              {result.parentingTimeAdjustment > 0 ? '+' : ''}${result.parentingTimeAdjustment.toLocaleString()}
            </p>
          </div>
        )}
        <div className="rounded-xl bg-white/10 px-4 py-3">
          <p className="text-xs text-white/60">Per year</p>
          <p className="text-lg font-semibold">${(result.estimatedMonthlySupport * 12).toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-white/10 px-4 py-3">
          <p className="text-xs text-white/60">Per week</p>
          <p className="text-lg font-semibold">${Math.round(result.estimatedMonthlySupport / 4.33).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
