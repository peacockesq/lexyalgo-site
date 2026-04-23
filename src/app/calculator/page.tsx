import type { Metadata } from 'next';
import Link from 'next/link';
import { CalculatorFooter } from '@/components/calculator';

export const metadata: Metadata = {
  title: 'Free Legal Calculators | LexyAlgo',
  description: 'Free legal calculators for child support, retirement division, asset division, and more, with plain-English explanations and clear rollout status.',
};

const CALCULATOR_TYPES = [
  {
    title: 'Child Support Calculator',
    description: 'Estimate child support obligations for all 50 states + DC. Each state uses its own formula — our calculator applies simplified versions of the actual guidelines.',
    href: '/calculator/child-support',
    emoji: '👶',
    badge: 'Live now',
    available: true,
  },
  {
    title: 'Asset Division Calculator',
    description: 'Compare property-division scenarios with the same free-first logic behind Asset Divider. Retirement, real estate, businesses, and more.',
    href: '/calculator/asset-division',
    emoji: '⚖️',
    badge: 'Rolling out',
    available: false,
  },
  {
    title: 'Retirement Division (QDRO)',
    description: 'Calculate the marital portion of retirement accounts, see future-value context, and understand what a proposed share is really worth.',
    href: '/calculator/qdro',
    emoji: '💰',
    badge: 'Rolling out',
    available: false,
  },
  {
    title: 'Alimony / Spousal Support',
    description: 'Estimate spousal support with clearer inputs, duration context, and state-specific logic as this calculator set expands.',
    href: '/calculator/alimony',
    emoji: '📊',
    badge: 'Rolling out',
    available: false,
  },
];

export default function CalculatorHubPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-green-700">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-sm font-semibold">Free tools, rolling out in public</span>
        </div>
        <h1 className="mt-6 text-4xl font-bold text-gray-900 sm:text-5xl font-[family-name:var(--font-space-grotesk)]">
          Free legal calculators
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Free tools to help you understand your legal situation. Every number comes with a plain-English explanation — because understanding matters as much as the math.
        </p>
        <div className="mt-6 max-w-2xl mx-auto rounded-2xl border border-sky-100 bg-sky-50/80 p-4 text-sm leading-relaxed text-slate-700">
          The calculator hub is shipping in public. Some calculators are live now, and others are still rolling out — so the page should show that status clearly instead of pretending everything is equally ready.
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {CALCULATOR_TYPES.map((calc) => {
          const baseClassName = `group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all
                ${calc.available ? 'hover:shadow-md hover:border-[#1E5F6C]/30 hover:-translate-y-0.5 cursor-pointer' : 'opacity-75 cursor-default'}`;

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
              {calc.available ? (
                <div className="mt-4 flex items-center text-sm font-medium text-[#1E5F6C]">
                  Open calculator
                  <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </div>
              ) : (
                <div className="mt-4 text-sm font-medium text-gray-500">
                  Not live yet
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

      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500 max-w-xl mx-auto">
          Our calculators use simplified versions of actual state guidelines. They&apos;re designed to give you a starting point — not a final answer. Always consult a licensed attorney for decisions affecting your family.
        </p>
      </div>

      <CalculatorFooter />
    </div>
  );
}
