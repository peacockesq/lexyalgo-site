import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Legal Calculators | LexyAlgo',
  description: 'Free legal calculators for child support, asset division, and more. Get instant estimates with plain-English explanations.',
};

const CALCULATOR_TYPES = [
  {
    title: 'Child Support Calculator',
    description: 'Estimate child support obligations for all 50 states + DC. Each state uses its own formula — our calculator applies simplified versions of the actual guidelines.',
    href: '/calculator/child-support',
    emoji: '👶',
    badge: '50 States + DC',
    available: true,
  },
  {
    title: 'Asset Division Calculator',
    description: 'Divide marital assets fairly using behavioral economics. Understand the real value of each asset — retirement accounts, real estate, businesses, and more.',
    href: '/calculator/asset-division',
    emoji: '⚖️',
    badge: 'Coming Soon',
    available: false,
  },
  {
    title: 'Retirement Division (QDRO)',
    description: 'Calculate the marital portion of retirement accounts using coverture fractions. See future value projections and understand what your share is really worth.',
    href: '/calculator/qdro',
    emoji: '💰',
    badge: 'Coming Soon',
    available: false,
  },
  {
    title: 'Alimony / Spousal Support',
    description: 'Estimate spousal support based on your state\'s guidelines. Understand duration, amount, and factors that affect the calculation.',
    href: '/calculator/alimony',
    emoji: '📊',
    badge: 'Coming Soon',
    available: false,
  },
];

export default function CalculatorHubPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl font-[family-name:var(--font-space-grotesk)]">
          Legal Calculators
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Free tools to help you understand your legal situation. Every number comes with a plain-English explanation — because understanding matters as much as the math.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {CALCULATOR_TYPES.map((calc) => {
          const baseClassName = `group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all
                ${calc.available ? 'hover:shadow-md hover:border-[#1E5F6C]/30 hover:-translate-y-0.5 cursor-pointer' : 'opacity-60 cursor-default'}`;

          const content = (
            <>
              <div className="flex items-center justify-between">
                <span className="text-3xl">{calc.emoji}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-medium
                  ${calc.available ? 'bg-[#1E5F6C]/10 text-[#1E5F6C]' : 'bg-gray-100 text-gray-500'}`}>
                  {calc.badge}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-900 font-[family-name:var(--font-space-grotesk)]">
                {calc.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">
                {calc.description}
              </p>
              {calc.available && (
                <div className="mt-4 flex items-center text-sm font-medium text-[#1E5F6C]">
                  Get started
                  <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </div>
              )}
            </>
          );

          if (calc.available) {
            return <Link key={calc.title} href={calc.href} className={baseClassName}>{content}</Link>;
          }
          return <div key={calc.title} className={baseClassName}>{content}</div>;
        })}
      </div>

      {/* Trust */}
      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500 max-w-xl mx-auto">
          Our calculators use simplified versions of actual state guidelines. They&apos;re designed to give you a starting point — not a final answer. Always consult a licensed attorney for decisions affecting your family.
        </p>
      </div>

    </div>
  );
}
