import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllStates, getStatesByModel, getModelTypeLabel, getModelTypeDescription } from '@/lib/state-formulas';
import { StateCard } from '@/components/calculator/StateCard';
import { Disclaimer } from '@/components/calculator/Disclaimer';
import { CalculatorFooter } from '@/components/calculator/Footer';

export const metadata: Metadata = {
  title: 'Child Support Calculator — All 50 States + DC | LexyAlgo',
  description: 'Free child support calculator for every US state. Estimate monthly support obligations using your state\'s actual formula with plain-English explanations.',
};

export default function ChildSupportHubPage() {
  const allStates = getAllStates();
  const incomeSharesCount = getStatesByModel('income-shares').length;
  const percentageCount = getStatesByModel('percentage-of-income').length;
  const melsonCount = getStatesByModel('melson-formula').length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/calculator" className="hover:text-[#1E5F6C] transition-colors">
          Calculators
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900 font-medium">Child Support</span>
      </nav>

      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl font-[family-name:var(--font-space-grotesk)]">
          Child Support Calculator
        </h1>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          Every state calculates child support differently. Select your state below to get an estimate based on a simplified version of your state&apos;s actual guidelines.
        </p>
      </div>

      <div className="mt-8 max-w-3xl mx-auto">
        <Disclaimer />
      </div>

      {/* Model Type Summary */}
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {([
          { type: 'income-shares' as const, count: incomeSharesCount, color: 'bg-[#1E5F6C]/10 border-[#1E5F6C]/20 text-[#1E5F6C]' },
          { type: 'percentage-of-income' as const, count: percentageCount, color: 'bg-amber-50 border-amber-200 text-amber-800' },
          { type: 'melson-formula' as const, count: melsonCount, color: 'bg-purple-50 border-purple-200 text-purple-800' },
        ]).map(({ type, count, color }) => (
          <div key={type} className={`rounded-2xl border p-5 ${color}`}>
            <p className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">{count}</p>
            <p className="text-sm font-semibold">{getModelTypeLabel(type)}</p>
            <p className="mt-1 text-xs opacity-75">{getModelTypeDescription(type)}</p>
          </div>
        ))}
      </div>

      {/* State Grid */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-space-grotesk)]">
          Select your state
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {allStates.length} jurisdictions available • Click any state to calculate
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allStates.map((state) => (
            <StateCard key={state.slug} state={state} />
          ))}
        </div>
      </div>

      {/* Bottom Disclaimer */}
      <div className="mt-12 max-w-3xl mx-auto">
        <Disclaimer position="bottom" />
      </div>

      <CalculatorFooter />
    </div>
  );
}
