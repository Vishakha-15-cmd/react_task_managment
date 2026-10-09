// ============================================================
// DASHBOARD STAT CARD UI
// Displays Total, Pending, or Completed task counts.
// ============================================================
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  tone: "indigo" | "amber" | "emerald";
}

const toneClasses = {
  indigo: "bg-indigo-50 text-indigo-600",
  amber: "bg-amber-50 text-amber-600",
  emerald: "bg-emerald-50 text-emerald-600",
};

export function StatCard({ label, value, icon: Icon, tone }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Icon and numeric value */}
      <div className="flex items-center justify-between">
        <span className={`grid h-10 w-10 place-items-center rounded-xl ${toneClasses[tone]}`}>
          <Icon size={19} />
        </span>
        <span className="text-3xl font-black tracking-tight text-slate-900">{value}</span>
      </div>
      {/* Stat label */}
      <p className="mt-4 text-sm font-semibold text-slate-500">{label}</p>
    </div>
  );
}
