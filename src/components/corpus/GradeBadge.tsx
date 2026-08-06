import { gradeLabels, type Grade } from "@/lib/corpus";

const styles: Record<Grade, string> = {
  A: "border-emerald-300 bg-emerald-50 text-emerald-800",
  B: "border-amber-300 bg-amber-50 text-amber-900",
  C: "border-sky-300 bg-sky-50 text-sky-900",
  D: "border-slate-300 bg-slate-100 text-slate-800",
  F: "border-red-300 bg-red-50 text-red-900",
};

export function GradeBadge({ grade, compact = false }: { grade: Grade; compact?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border font-semibold ${styles[grade]} ${compact ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"}`}
      aria-label={`Verification grade ${grade}: ${gradeLabels[grade]}`}
    >
      <span className="font-mono font-bold">{grade}</span>
      {!compact && <span>{gradeLabels[grade]}</span>}
    </span>
  );
}
