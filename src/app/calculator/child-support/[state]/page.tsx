import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStateBySlug, getAllStates } from '@/lib/state-formulas';
import { CalculatorForm } from '@/components/calculator/CalculatorForm';
import { Disclaimer } from '@/components/calculator/Disclaimer';

interface PageProps {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return getAllStates().map((state) => ({
    state: state.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) return { title: 'Not Found' };

  return {
    title: `${state.name} Child Support Calculator — Free Estimate | LexyAlgo`,
    description: `Calculate estimated child support in ${state.name} using the ${state.modelLabel}. Free calculator with plain-English explanations of how ${state.abbreviation} determines child support obligations.`,
  };
}

export default async function StateCalculatorPage({ params }: PageProps) {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);

  if (!state) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/calculator" className="hover:text-[#1E5F6C] transition-colors">
          Calculators
        </Link>
        <span className="mx-2">›</span>
        <Link href="/calculator/child-support" className="hover:text-[#1E5F6C] transition-colors">
          Child Support
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900 font-medium">{state.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{state.emoji}</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl font-[family-name:var(--font-space-grotesk)]">
              {state.name} Child Support Calculator
            </h1>
            <div className="mt-1 flex items-center gap-2">
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium
                ${state.modelType === 'income-shares' ? 'bg-[#1E5F6C]/10 text-[#1E5F6C]' :
                  state.modelType === 'percentage-of-income' ? 'bg-amber-100 text-amber-800' :
                  'bg-purple-100 text-purple-800'}`}>
                {state.modelLabel}
              </span>
              <span className="text-sm text-gray-500">{state.abbreviation}</span>
            </div>
          </div>
        </div>
      </div>

      <Disclaimer />

      <CalculatorForm state={state} />

      <Disclaimer position="bottom" />

      {/* Other States */}
      <div className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 font-[family-name:var(--font-space-grotesk)]">
          Not in {state.name}?
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          We have child support calculators for all 50 states and Washington DC.
        </p>
        <Link
          href="/calculator/child-support"
          className="mt-3 inline-flex items-center text-sm font-medium text-[#1E5F6C] hover:underline"
        >
          Browse all states →
        </Link>
      </div>

    </div>
  );
}
