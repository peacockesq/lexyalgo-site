'use client'

import { useState } from 'react'

interface MockupElement {
  type: 'nav' | 'form-field' | 'card' | 'button' | 'calendar' | 'drag-item' | 'progress' | 'table-row' | 'chart-bar' | 'status-pill' | 'divider' | 'text-line' | 'avatar' | 'checkbox' | 'toggle'
  label?: string
  width?: string
  checked?: boolean
}

interface ScreenshotMockup {
  title: string
  subtitle: string
  elements: MockupElement[]
}

interface ProductScreenshotsProps {
  color: string       // accent hex
  lightBg: string     // light bg hex
  mockups: ScreenshotMockup[]
}

function MockNav({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-3" style={{ backgroundColor: `${color}dd` }}>
      <div className="w-3 h-3 rounded-full bg-white/30" />
      <div className="w-16 h-2 rounded bg-white/40" />
      <div className="ml-auto flex gap-2">
        <div className="w-10 h-2 rounded bg-white/25" />
        <div className="w-10 h-2 rounded bg-white/25" />
        <div className="w-6 h-6 rounded-md bg-white/20" />
      </div>
    </div>
  )
}

function MockFormField({ label }: { label?: string }) {
  return (
    <div className="mb-2">
      {label && <div className="text-[9px] text-white/60 mb-0.5 font-medium">{label}</div>}
      <div className="h-7 rounded-md bg-white/15 border border-white/10 px-2 flex items-center">
        <div className="w-2/3 h-2 rounded bg-white/20" />
      </div>
    </div>
  )
}

function MockCard({ color }: { color: string }) {
  return (
    <div className="rounded-lg p-3 mb-2" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: `${color}88` }} />
        <div>
          <div className="w-20 h-2 rounded bg-white/40" />
          <div className="w-14 h-1.5 rounded bg-white/20 mt-1" />
        </div>
      </div>
      <div className="w-full h-1.5 rounded bg-white/15 mt-1" />
      <div className="w-3/4 h-1.5 rounded bg-white/10 mt-1" />
    </div>
  )
}

function MockButton({ label, color }: { label?: string; color: string }) {
  return (
    <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-[9px] font-semibold text-white/90 mt-1"
      style={{ backgroundColor: `${color}cc` }}>
      {label || 'Submit'}
      <span className="text-white/50">→</span>
    </div>
  )
}

function MockCalendar({ color }: { color: string }) {
  const days = Array.from({ length: 28 }, (_, i) => i + 1)
  return (
    <div className="rounded-lg p-2 bg-white/10">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="text-[9px] text-white/60 font-medium">March 2026</div>
        <div className="flex gap-1">
          <div className="w-4 h-4 rounded bg-white/10 flex items-center justify-center text-[8px] text-white/40">‹</div>
          <div className="w-4 h-4 rounded bg-white/10 flex items-center justify-center text-[8px] text-white/40">›</div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={`h-${i}`} className="text-[7px] text-white/30 text-center py-0.5">{d}</div>
        ))}
        {days.map((d) => {
          const isHighlight = [3,4,5,10,11,17,18,24,25].includes(d)
          const isAlt = [12,13,19,20,26,27].includes(d)
          return (
            <div key={d} className="text-[7px] text-center py-1 rounded"
              style={{
                backgroundColor: isHighlight ? `${color}66` : isAlt ? 'rgba(255,255,255,0.15)' : 'transparent',
                color: isHighlight || isAlt ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)',
              }}>
              {d}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MockDragItem({ label, color }: { label?: string; color: string }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/10 border border-white/5 mb-1.5">
      <div className="flex flex-col gap-0.5">
        <div className="w-1 h-1 rounded-full bg-white/25" />
        <div className="w-1 h-1 rounded-full bg-white/25" />
        <div className="w-1 h-1 rounded-full bg-white/25" />
      </div>
      <div className="flex-1">
        <div className="text-[9px] text-white/70 font-medium">{label || 'Asset Item'}</div>
        <div className="w-12 h-1.5 rounded bg-white/15 mt-0.5" />
      </div>
      <div className="text-[9px] text-white/50 font-medium" style={{ color: `${color}cc` }}>$—</div>
    </div>
  )
}

function MockProgress({ color }: { color: string }) {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <div className="text-[8px] text-white/40">Step 2 of 5</div>
        <div className="text-[8px] text-white/40">40%</div>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full rounded-full w-2/5" style={{ backgroundColor: `${color}aa` }} />
      </div>
    </div>
  )
}

function MockTableRow({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5 border-b border-white/5">
      <div className="w-4 h-4 rounded bg-white/10" />
      <div className="flex-1 text-[9px] text-white/60">{label || 'Item'}</div>
      <div className="w-12 h-2 rounded bg-white/15" />
      <div className="w-3 h-3 rounded bg-white/10" />
    </div>
  )
}

function MockChartBar({ color }: { color: string }) {
  const heights = [40, 65, 50, 80, 55, 70, 90]
  return (
    <div className="flex items-end gap-1 h-16 px-2 pt-2">
      {heights.map((h, i) => (
        <div key={i} className="flex-1 rounded-t"
          style={{
            height: `${h}%`,
            backgroundColor: i % 2 === 0 ? `${color}88` : 'rgba(255,255,255,0.15)',
          }} />
      ))}
    </div>
  )
}

function MockStatusPill({ label, color }: { label?: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-medium mr-1 mb-1"
      style={{ backgroundColor: `${color}33`, color: 'rgba(255,255,255,0.7)' }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${color}aa` }} />
      {label || 'Status'}
    </span>
  )
}

function MockTextLine({ width }: { width?: string }) {
  return <div className={`h-2 rounded bg-white/15 mb-1.5`} style={{ width: width || '100%' }} />
}

function MockAvatar() {
  return <div className="w-6 h-6 rounded-full bg-white/20 flex-shrink-0" />
}

function MockCheckbox({ label, checked }: { label?: string; checked?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <div className={`w-3.5 h-3.5 rounded border ${checked ? 'bg-white/30 border-white/40' : 'border-white/20'} flex items-center justify-center`}>
        {checked && <span className="text-[7px] text-white/80">✓</span>}
      </div>
      <div className="text-[9px] text-white/60">{label || 'Option'}</div>
    </div>
  )
}

function MockToggle({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-between mb-1.5">
      <div className="text-[9px] text-white/60">{label || 'Setting'}</div>
      <div className="w-7 h-4 rounded-full bg-white/20 relative">
        <div className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white/60" />
      </div>
    </div>
  )
}

function RenderElement({ el, color }: { el: MockupElement; color: string }) {
  switch (el.type) {
    case 'nav': return <MockNav color={color} />
    case 'form-field': return <MockFormField label={el.label} />
    case 'card': return <MockCard color={color} />
    case 'button': return <MockButton label={el.label} color={color} />
    case 'calendar': return <MockCalendar color={color} />
    case 'drag-item': return <MockDragItem label={el.label} color={color} />
    case 'progress': return <MockProgress color={color} />
    case 'table-row': return <MockTableRow label={el.label} />
    case 'chart-bar': return <MockChartBar color={color} />
    case 'status-pill': return <MockStatusPill label={el.label} color={color} />
    case 'divider': return <div className="border-b border-white/10 my-2" />
    case 'text-line': return <MockTextLine width={el.width} />
    case 'avatar': return <MockAvatar />
    case 'checkbox': return <MockCheckbox label={el.label} checked={el.checked} />
    case 'toggle': return <MockToggle label={el.label} />
    default: return null
  }
}

function ScreenshotCard({ mockup, color, lightBg }: { mockup: ScreenshotMockup; color: string; lightBg: string }) {
  return (
    <div className="flex-shrink-0 w-full sm:w-[340px] md:w-[380px]">
      <div className="rounded-2xl overflow-hidden shadow-xl border border-white/10" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-black/20">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="ml-3 flex-1 h-4 rounded bg-white/10 max-w-[200px] flex items-center px-2">
            <span className="text-[8px] text-white/30">lexyalgo.com</span>
          </div>
        </div>
        {/* Content area */}
        <div className="p-4 min-h-[220px]">
          {mockup.elements.map((el, i) => (
            <RenderElement key={i} el={el} color={color} />
          ))}
        </div>
        {/* Footer label */}
        <div className="px-4 pb-3">
          <div className="text-[10px] font-semibold text-white/70">{mockup.title}</div>
          <div className="text-[8px] text-white/40 mt-0.5">{mockup.subtitle}</div>
        </div>
      </div>
    </div>
  )
}

export function ProductScreenshots({ color, lightBg, mockups }: ProductScreenshotsProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color }}>Product Preview</span>
          <h2 className="font-[family-name:var(--font-space)] text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            See it in action
          </h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory sm:justify-center sm:flex-wrap">
          {mockups.map((m, i) => (
            <div key={i} className="snap-center">
              <ScreenshotCard mockup={m} color={color} lightBg={lightBg} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pre-built mockup configs for each product
export const divorceMockups: ScreenshotMockup[] = [
  {
    title: 'Form Wizard',
    subtitle: 'Guided intake with progress tracking',
    elements: [
      { type: 'nav' },
      { type: 'progress' },
      { type: 'text-line', width: '60%' },
      { type: 'form-field', label: 'Petitioner Full Legal Name' },
      { type: 'form-field', label: 'Date of Marriage' },
      { type: 'form-field', label: 'County of Filing' },
      { type: 'divider' },
      { type: 'checkbox', label: 'No minor children', checked: false },
      { type: 'checkbox', label: 'Minor children involved', checked: true },
      { type: 'button', label: 'Continue to Step 3' },
    ],
  },
  {
    title: 'Document Preview',
    subtitle: 'Court-form-mapped PDF generation',
    elements: [
      { type: 'nav' },
      { type: 'status-pill', label: 'CT — JD-FM-159' },
      { type: 'status-pill', label: 'Generated' },
      { type: 'divider' },
      { type: 'text-line', width: '45%' },
      { type: 'text-line', width: '100%' },
      { type: 'text-line', width: '90%' },
      { type: 'text-line', width: '75%' },
      { type: 'divider' },
      { type: 'text-line', width: '100%' },
      { type: 'text-line', width: '85%' },
      { type: 'text-line', width: '60%' },
      { type: 'divider' },
      { type: 'button', label: 'Download PDF' },
    ],
  },
]

export const assetDividerMockups: ScreenshotMockup[] = [
  {
    title: 'Asset Division Workspace',
    subtitle: 'Drag-and-drop allocation with fairness scoring',
    elements: [
      { type: 'nav' },
      { type: 'status-pill', label: 'Fairness: 52/48' },
      { type: 'status-pill', label: '12 Assets' },
      { type: 'divider' },
      { type: 'drag-item', label: 'Family Home — $425,000' },
      { type: 'drag-item', label: '401(k) — $180,000' },
      { type: 'drag-item', label: 'Savings Account — $35,000' },
      { type: 'drag-item', label: 'Vehicle — $28,000' },
      { type: 'drag-item', label: 'Pension (DB) — $95,000' },
    ],
  },
  {
    title: 'Proposal Summary',
    subtitle: 'Settlement overview with future value projections',
    elements: [
      { type: 'nav' },
      { type: 'text-line', width: '50%' },
      { type: 'chart-bar' },
      { type: 'divider' },
      { type: 'table-row', label: 'Your Share — Present Value' },
      { type: 'table-row', label: 'Your Share — Age 62 Value' },
      { type: 'table-row', label: 'Spouse Share — Present Value' },
      { type: 'divider' },
      { type: 'button', label: 'Generate Agreement' },
    ],
  },
]

export const coParentMockups: ScreenshotMockup[] = [
  {
    title: 'Parenting Calendar',
    subtitle: 'Dual-colour schedule for both parents',
    elements: [
      { type: 'nav' },
      { type: 'status-pill', label: 'Your Time: 14 days' },
      { type: 'status-pill', label: 'Co-Parent: 14 days' },
      { type: 'calendar' },
    ],
  },
  {
    title: 'Expense Tracker',
    subtitle: 'Child expense contributions and splits',
    elements: [
      { type: 'nav' },
      { type: 'text-line', width: '40%' },
      { type: 'table-row', label: 'School supplies — $124' },
      { type: 'table-row', label: 'Soccer registration — $200' },
      { type: 'table-row', label: 'Doctor co-pay — $35' },
      { type: 'table-row', label: 'Winter jacket — $65' },
      { type: 'divider' },
      { type: 'chart-bar' },
      { type: 'button', label: 'Add Expense' },
    ],
  },
]

export const qdroMockups: ScreenshotMockup[] = [
  {
    title: 'Plan Selection',
    subtitle: 'Search from nearly 1 million plans',
    elements: [
      { type: 'nav' },
      { type: 'form-field', label: 'Search retirement plan name or employer' },
      { type: 'divider' },
      { type: 'card' },
      { type: 'card' },
      { type: 'status-pill', label: '401(k)' },
      { type: 'status-pill', label: 'Defined Contribution' },
      { type: 'button', label: 'Select Plan' },
    ],
  },
  {
    title: 'Generated Order',
    subtitle: 'Plan-specific QDRO ready for filing',
    elements: [
      { type: 'nav' },
      { type: 'status-pill', label: 'QDRO Ready' },
      { type: 'status-pill', label: 'Plan-Specific' },
      { type: 'divider' },
      { type: 'text-line', width: '55%' },
      { type: 'text-line', width: '100%' },
      { type: 'text-line', width: '85%' },
      { type: 'text-line', width: '95%' },
      { type: 'text-line', width: '70%' },
      { type: 'divider' },
      { type: 'text-line', width: '100%' },
      { type: 'text-line', width: '90%' },
      { type: 'divider' },
      { type: 'button', label: 'Download QDRO PDF' },
    ],
  },
]

export const calculatorMockups: ScreenshotMockup[] = [
  {
    title: 'Calculator Input',
    subtitle: 'State-specific child support guidelines',
    elements: [
      { type: 'nav' },
      { type: 'form-field', label: 'Your Gross Monthly Income' },
      { type: 'form-field', label: 'Co-Parent Gross Monthly Income' },
      { type: 'form-field', label: 'Number of Children' },
      { type: 'form-field', label: 'Overnights Per Year (yours)' },
      { type: 'divider' },
      { type: 'toggle', label: 'Include healthcare costs' },
      { type: 'toggle', label: 'Include childcare costs' },
      { type: 'button', label: 'Calculate Support' },
    ],
  },
  {
    title: 'Results Card',
    subtitle: 'Breakdown with future-value timeline',
    elements: [
      { type: 'nav' },
      { type: 'status-pill', label: 'Connecticut' },
      { type: 'status-pill', label: 'Income Shares' },
      { type: 'divider' },
      { type: 'chart-bar' },
      { type: 'divider' },
      { type: 'table-row', label: 'Monthly obligation' },
      { type: 'table-row', label: 'Combined income %' },
      { type: 'table-row', label: 'Deviation factors' },
      { type: 'button', label: 'Export as PDF' },
    ],
  },
]

export const estatePlanningMockups: ScreenshotMockup[] = [
  {
    title: 'Will Builder',
    subtitle: 'Guided will creation with state requirements',
    elements: [
      { type: 'nav' },
      { type: 'progress' },
      { type: 'form-field', label: 'Primary Beneficiary' },
      { type: 'form-field', label: 'Executor Name' },
      { type: 'divider' },
      { type: 'checkbox', label: 'Specific bequests', checked: true },
      { type: 'checkbox', label: 'Residuary estate to spouse', checked: true },
      { type: 'checkbox', label: 'Guardian for minors', checked: false },
      { type: 'divider' },
      { type: 'button', label: 'Continue to Trusts' },
    ],
  },
  {
    title: 'Trust Configurator',
    subtitle: 'Revocable living trust setup',
    elements: [
      { type: 'nav' },
      { type: 'status-pill', label: 'Revocable Trust' },
      { type: 'status-pill', label: 'CT Compliant' },
      { type: 'form-field', label: 'Trust Name' },
      { type: 'form-field', label: 'Successor Trustee' },
      { type: 'divider' },
      { type: 'toggle', label: 'Pour-over will provision' },
      { type: 'toggle', label: 'Incapacity provisions' },
      { type: 'toggle', label: 'Spendthrift clause' },
      { type: 'divider' },
      { type: 'button', label: 'Generate Trust Document' },
    ],
  },
]

export const filingMockups: ScreenshotMockup[] = [
  {
    title: 'Court Selection',
    subtitle: 'Find your filing court and requirements',
    elements: [
      { type: 'nav' },
      { type: 'form-field', label: 'State' },
      { type: 'form-field', label: 'County' },
      { type: 'divider' },
      { type: 'card' },
      { type: 'status-pill', label: 'E-Filing Available' },
      { type: 'status-pill', label: 'No Filing Fee Waiver' },
      { type: 'divider' },
      { type: 'table-row', label: 'Filing fee: $360' },
      { type: 'table-row', label: 'Processing: 2-5 days' },
      { type: 'button', label: 'Prepare Filing' },
    ],
  },
  {
    title: 'Filing Status',
    subtitle: 'Real-time tracking of your court submission',
    elements: [
      { type: 'nav' },
      { type: 'status-pill', label: 'Submitted' },
      { type: 'status-pill', label: 'Case #2026-CV-1234' },
      { type: 'divider' },
      { type: 'table-row', label: 'Complaint — Accepted ✓' },
      { type: 'table-row', label: 'Summons — Accepted ✓' },
      { type: 'table-row', label: 'Financial Affidavit — Pending' },
      { type: 'table-row', label: 'Parenting Plan — Pending' },
      { type: 'divider' },
      { type: 'text-line', width: '70%' },
      { type: 'button', label: 'View Confirmation' },
    ],
  },
]
