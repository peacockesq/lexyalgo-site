'use client';

import { useState } from 'react';
import type { StateFormula, SupportBreakdown, CalculationInput } from '@/lib/state-formulas';
import { calculateSupport } from '@/lib/state-formulas';
import { InputField } from './InputField';
import { ResultCard } from './ResultCard';
import { BreakdownChart } from './BreakdownChart';
import { HowToExplain } from './HowToExplain';
import { InsightBadge } from './InsightBadge';

export function CalculatorForm({ state }: { state: StateFormula }) {
  const [input, setInput] = useState<CalculationInput>({
    parent1Income: 0,
    parent2Income: 0,
    numberOfChildren: 1,
    healthInsurance: 0,
    childcare: 0,
    parentingTimePct: 50,
  });

  const [result, setResult] = useState<SupportBreakdown | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleCalculate = () => {
    const r = calculateSupport(state, input);
    setResult(r);
    setShowResult(true);
  };

  const updateField = <K extends keyof CalculationInput>(key: K, value: CalculationInput[K]) => {
    setInput(prev => ({ ...prev, [key]: value }));
    setShowResult(false);
  };

  return (
    <div className="space-y-8">
      {/* Insight Badge */}
      <InsightBadge state={state} />

      {/* Input Form */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 font-[family-name:var(--font-space-grotesk)]">
          Enter your information
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          All income amounts should be monthly gross (before taxes) unless noted otherwise.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <InputField
            label="Parent 1 gross monthly income"
            id="parent1Income"
            value={input.parent1Income}
            onChange={(v) => updateField('parent1Income', v)}
            helpText="Before taxes. Include salary, bonuses, commissions, rental income, etc."
          />
          <InputField
            label="Parent 2 gross monthly income"
            id="parent2Income"
            value={input.parent2Income}
            onChange={(v) => updateField('parent2Income', v)}
            helpText="Before taxes. Include salary, bonuses, commissions, rental income, etc."
          />
          <InputField
            label="Number of children"
            id="numberOfChildren"
            value={input.numberOfChildren}
            onChange={(v) => updateField('numberOfChildren', Math.max(1, Math.min(6, v)))}
            prefix=""
            min={1}
            max={6}
            helpText="Children eligible for support in this case (1–6)"
          />
          <InputField
            label="Health insurance (monthly cost for children)"
            id="healthInsurance"
            value={input.healthInsurance}
            onChange={(v) => updateField('healthInsurance', v)}
            helpText="Monthly cost of adding children to health insurance"
          />
          <InputField
            label="Childcare costs (monthly)"
            id="childcare"
            value={input.childcare}
            onChange={(v) => updateField('childcare', v)}
            helpText="Work-related childcare, daycare, after-school care"
          />
          <div className="space-y-1.5">
            <label htmlFor="parentingTimePct" className="block text-sm font-medium text-gray-700">
              Parent 1 parenting time
            </label>
            <div className="space-y-2">
              <input
                type="range"
                id="parentingTimePct"
                min={0}
                max={100}
                step={1}
                value={input.parentingTimePct}
                onChange={(e) => updateField('parentingTimePct', Number(e.target.value))}
                className="w-full accent-[#1E5F6C]"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0% (Parent 2 has full custody)</span>
                <span className="font-semibold text-[#1E5F6C] text-sm">
                  {input.parentingTimePct}% / {100 - input.parentingTimePct}%
                </span>
                <span>100% (Parent 1 has full custody)</span>
              </div>
              <p className="text-xs text-gray-500">
                ≈ {Math.round(input.parentingTimePct * 3.65)} / {Math.round((100 - input.parentingTimePct) * 3.65)} overnights per year
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          disabled={input.parent1Income <= 0 && input.parent2Income <= 0}
          className="mt-8 w-full rounded-xl bg-[#1E5F6C] px-6 py-4 text-base font-semibold text-white shadow-sm transition-all
            hover:bg-[#164B56] hover:shadow-md
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-[#1E5F6C]/40 focus:ring-offset-2"
        >
          Calculate Estimate
        </button>
      </div>

      {/* Results */}
      {showResult && result && result.estimatedMonthlySupport > 0 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ResultCard result={result} numberOfChildren={input.numberOfChildren} />
          <BreakdownChart
            breakdown={result.allocationBreakdown}
            totalSupport={result.estimatedMonthlySupport}
            numberOfChildren={input.numberOfChildren}
          />
          <HowToExplain
            result={result}
            state={state}
            numberOfChildren={input.numberOfChildren}
          />
        </div>
      )}

      {showResult && result && result.estimatedMonthlySupport <= 0 && (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
          <p className="text-gray-600">
            Based on the information provided, no support obligation is estimated. This may occur when parenting time is equal and incomes are similar. Consult an attorney for a complete analysis.
          </p>
        </div>
      )}
    </div>
  );
}
