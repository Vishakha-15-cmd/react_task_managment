// ============================================================
// TASK ITEM UI
// Displays one task with status, edit, and delete controls.
// ============================================================
import { Check, Edit3, Loader2, Trash2 } from "lucide-react";
import type { Task } from "../../../types/task";

interface TaskItemProps {
  task: Task;
  busy: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskItem({
  task,
  busy,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  const completed = task.status === "completed";

  return (
    <article className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-indigo-200 hover:shadow-md sm:p-5">
      {/* Complete / pending status button */}
      <button
        type="button"
        onClick={onToggle}
        disabled={busy}
        aria-label={completed ? "Mark task pending" : "Mark task completed"}
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition ${
          completed
            ? "border-blue-800 bg-blue-800 text-white"
            : "border-slate-300 bg-white text-transparent hover:border-blue-600"
        }`}
      >
        {busy ? (
          <Loader2 size={13} className="animate-spin" />
        ) : (
          <Check size={14} strokeWidth={3} />
        )}
      </button>

      {/* Task status checkbox + task title */}
      <div className="min-w-0 flex-1">
        {/* Task title */}
        <p
          className={`wrap-break-word text-sm font-semibold transition ${
            completed ? "text-slate-400 line-through" : "text-slate-800"
          }`}
        >
          {task.title}
        </p>
        {/* Task status text */}
        <p className="mt-1 text-xs font-medium text-slate-400">
          {completed ? "Completed" : "In progress"}
        </p>
      </div>

      {/* Edit and Delete action buttons */}
      <div className="flex shrink-0 gap-1">
        {/* opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100 = for hover butons*/}
        <button
          type="button"
          onClick={onEdit}
          disabled={busy}
          className="rounded-xl p-2.5 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
          aria-label="Edit task"
        >
          <Edit3 size={17} />
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={busy}
          className="rounded-xl p-2.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
          aria-label="Delete task"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </article>
  );
}
