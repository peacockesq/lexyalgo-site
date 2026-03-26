import Link from 'next/link';
import type { StateFormula } from '@/lib/state-formulas';

const MODEL_COLORS = {
  'income-shares': 'bg-[#1E5F6C]/10 text-[#1E5F6C]',
  'percentage-of-income': 'bg-amber-100 text-amber-800',
  'melson-formula': 'bg-purple-100 text-purple-800',
} as const;

export function StateCard({ state }: { state: StateFormula }) {
  return (
    <Link
      href={`/calculator/child-support/${state.slug}`}
      className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-[#1E5F6C]/30 hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{state.emoji}</span>
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#1E5F6C] transition-colors font-[family-name:var(--font-space-grotesk)] truncate">
            {state.name}
          </h3>
          <p className="text-xs text-gray-500">{state.abbreviation}</p>
        </div>
      </div>

      <div className="mt-3">
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${MODEL_COLORS[state.modelType]}`}>
          {state.modelLabel}
        </span>
      </div>

      <p className="mt-3 text-xs text-gray-500 line-clamp-2 flex-1">
        {state.howItWorks.slice(0, 120)}…
      </p>

      <div className="mt-4 flex items-center text-sm font-medium text-[#1E5F6C] group-hover:gap-2 transition-all">
        Calculate
        <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}
