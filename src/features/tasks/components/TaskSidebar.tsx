// ============================================================
// TASK SIDEBAR UI
// Dashboard navigation/filter menu for All, Pending, and Completed tasks.
// ============================================================
import {
  CheckCircle2,
  ClipboardList,
  Clock3,
  LayoutDashboard,
  X,
} from "lucide-react";
import type { TaskFilter } from "../../../types/task";

interface TaskSidebarProps {
  filter: TaskFilter;
  onFilter: (filter: TaskFilter) => void;
  open: boolean;
  onClose: () => void;
  stats: { total: number; pending: number; completed: number };
}

export function TaskSidebar({
  filter,
  onFilter,
  open,
  onClose,
  stats,
}: TaskSidebarProps) {
  const items = [
    {
      id: "all" as const,
      label: "All Tasks",
      icon: LayoutDashboard,
      count: stats.total,
    },
    {
      id: "pending" as const,
      label: "Pending",
      icon: Clock3,
      count: stats.pending,
    },
    {
      id: "completed" as const,
      label: "Completed",
      icon: CheckCircle2,
      count: stats.completed,
    },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {open && (
        <button
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white px-5 py-24 transition-transform duration-300 lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:translate-x-0 lg:py-8 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile sidebar header / close button */}
        <div className="mb-8 flex items-center justify-between lg:hidden">
          <span className="font-bold text-slate-900">Navigation</span>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={19} />
          </button>
        </div>

        {/* Productivity summary card */}
        <div className="mb-8 rounded-2xl bg-linear-to-br from-blue-700 to-blue-950 p-5 text-white shadow-lg shadow-indigo-200">
          <ClipboardList size={23} />
          <p className="mt-4 text-sm font-bold">Your productivity space</p>
          <p className="mt-1 text-xs leading-5 text-indigo-100">
            Keep today's work clear and focused.
          </p>
        </div>

        {/* Sidebar section title */}
        <p className="mb-3 px-3 text-[11px] font-black uppercase tracking-[.18em] text-slate-400">
          Workspace
        </p>

        {/* Task filter navigation */}
        <nav className="space-y-1">
          {items.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => {
                onFilter(id);
                onClose();
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
                filter === id
                  ? "bg-blue-50 text-blue-800"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Icon size={18} />
              <span className="flex-1">{label}</span>
              <span
                className={`rounded-lg px-2 py-1 text-xs ${
                  filter === id
                    ? "bg-white text-blue-800"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
