'use client';

import type { SupportBreakdown } from '@/lib/state-formulas';

const CATEGORIES = [
  { key: 'housing', label: 'Housing', color: '#1E5F6C', icon: '🏠' },
  { key: 'food', label: 'Food & Groceries', color: '#2D8F9C', icon: '🛒' },
  { key: 'childcare', label: 'Childcare', color: '#3BBFCC', icon: '👶' },
  { key: 'healthInsurance', label: 'Health Insurance', color: '#F59E0B', icon: '🏥' },
  { key: 'clothing', label: 'Clothing', color: '#8B5CF6', icon: '👕' },
  { key: 'education', label: 'Education', color: '#EC4899', icon: '📚' },
  { key: 'transportation', label: 'Transportation', color: '#10B981', icon: '🚗' },
  { key: 'other', label: 'Other Needs', color: '#6B7280', icon: '📦' },
] as const;

interface BreakdownChartProps {
  breakdown: SupportBreakdown['allocationBreakdown'];
  totalSupport: number;
  numberOfChildren: number;
}

export function BreakdownChart({ breakdown, totalSupport, numberOfChildren }: BreakdownChartProps) {
  if (totalSupport <= 0) return null;

  const childrenLabel = numberOfChildren === 1 ? 'your child' : 'your children';

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 font-[family-name:var(--font-space-grotesk)]">
        Supporting {childrenLabel}&apos;s needs
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Here&apos;s an approximate breakdown of how child support contributes to {childrenLabel}&apos;s wellbeing
      </p>

      {/* Stacked Bar */}
      <div className="mt-5 h-8 flex rounded-full overflow-hidden">
        {CATEGORIES.map(({ key, color }) => {
          const value = breakdown[key as keyof typeof breakdown];
          const pct = totalSupport > 0 ? (value / totalSupport) * 100 : 0;
          if (pct < 1) return null;
          return (
            <div
              key={key}
              style={{ width: `${pct}%`, backgroundColor: color }}
              className="transition-all duration-500"
              title={`${key}: $${value}`}
            />
          );
        })}
      </div>

      {/* Legend + Amounts */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CATEGORIES.map(({ key, label, color, icon }) => {
          const value = breakdown[key as keyof typeof breakdown];
          if (value <= 0) return null;
          return (
            <div key={key} className="flex items-start gap-2">
              <div
                className="mt-0.5 h-3 w-3 flex-shrink-0 rounded-full"
                style={{ backgroundColor: color }}
              />
              <div>
                <p className="text-xs font-medium text-gray-700">
                  {icon} {label}
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  ${value.toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
