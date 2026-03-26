'use client';

import type { SupportBreakdown, StateFormula } from '@/lib/state-formulas';

interface HowToExplainProps {
  result: SupportBreakdown;
  state: StateFormula;
  numberOfChildren: number;
}

export function HowToExplain({ result, state, numberOfChildren }: HowToExplainProps) {
  if (result.estimatedMonthlySupport <= 0) return null;

  const childrenWord = numberOfChildren === 1 ? 'child' : 'children';
  const payerLabel = result.payingParent === 1 ? 'Parent 1' : 'Parent 2';
  const receiverLabel = result.payingParent === 1 ? 'Parent 2' : 'Parent 1';

  return (
    <div className="rounded-2xl border border-[#1E5F6C]/20 bg-[#1E5F6C]/5 p-6">
      <div className="flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 font-[family-name:var(--font-space-grotesk)]">
            How to explain this
          </h3>

          <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
            <p>
              <strong>In plain English:</strong> Based on {state.name}&apos;s {state.modelLabel.toLowerCase()}, 
              the estimated monthly contribution toward supporting your {childrenWord} is{' '}
              <strong className="text-[#1E5F6C]">${result.estimatedMonthlySupport.toLocaleString()}/month</strong>.
            </p>

            <p>
              <strong>What this means:</strong> {payerLabel} would contribute this amount to help cover the {childrenWord}&apos;s 
              daily needs — housing, food, childcare, health insurance, clothing, education, and transportation — while 
              living with {receiverLabel}.
            </p>

            <p>
              <strong>How {state.name} calculates this:</strong> {state.howItWorks}
            </p>

            {state.uniqueFactors.length > 0 && (
              <div>
                <strong>Factors unique to {state.name}:</strong>
                <ul className="mt-1 list-disc pl-5 space-y-0.5">
                  {state.uniqueFactors.map((factor, i) => (
                    <li key={i}>{factor}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-3 rounded-xl bg-white/60 px-4 py-3 border border-[#1E5F6C]/10">
              <p className="text-xs font-medium text-[#1E5F6C] uppercase tracking-wide mb-1">
                How to explain this to family &amp; friends
              </p>
              <p className="text-sm text-gray-600 italic">
                &ldquo;The state of {state.name} has a formula that looks at both parents&apos; incomes and figures out 
                what&apos;s fair for supporting the {numberOfChildren === 1 ? 'kid' : 'kids'}. It&apos;s not about 
                paying anyone — it&apos;s about making sure the {numberOfChildren === 1 ? 'child has' : 'children have'} what{' '}
                {numberOfChildren === 1 ? 'they need' : 'they need'} no matter which home {numberOfChildren === 1 ? "they're" : "they're"} at.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
