'use client';

import type { StateFormula } from '@/lib/state-formulas';

export function InsightBadge({ state }: { state: StateFormula }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="text-xl">💡</span>
        <div>
          <p className="text-xs font-semibold text-[#1E5F6C] uppercase tracking-wide">
            {state.name} — {state.modelLabel}
          </p>
          <p className="mt-1 text-sm text-gray-600 leading-relaxed">
            {state.howItWorks}
          </p>
          {state.notes.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {state.notes.map((note, i) => (
                <span
                  key={i}
                  className="inline-block rounded-full bg-[#1E5F6C]/10 px-3 py-1 text-xs font-medium text-[#1E5F6C]"
                >
                  {note}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
