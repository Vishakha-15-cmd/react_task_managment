import { useState } from "react";
import { CheckCircle2, ListChecks, Plus, Clock3 } from "lucide-react";
import { DashboardHeader } from "../features/tasks/components/DashboardHeader";
import { TaskSidebar } from "../features/tasks/components/TaskSidebar";
import { StatCard } from "../features/tasks/components/StatCard";
import { TaskItem } from "../features/tasks/components/TaskItem";
import { useTasks } from "../features/tasks/hooks/useTasks";
import { Modal } from "../components/ui/Modal";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { storage } from "../lib/storage";
import { useNavigate } from "react-router-dom";

export function DashboardPage() {
  // ==================== DASHBOARD STATE ====================
  const navigate = useNavigate();
  const user = storage.getUser();
  const tasks = useTasks();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [editingTask, setEditingTask] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // ==================== ADD TASK FORM LOGIC ====================
  async function handleAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = newTitle.trim();
    if (!title) {
      tasks.setError("Please enter a task title.");
      return;
    }

    try {
      await tasks.add(title);
      setNewTitle("");
    } catch {
      // Error is displayed by useTasks.
    }
  }

  // ==================== EDIT TASK LOGIC ====================
  async function handleEdit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingTask) return;

    const title = editTitle.trim();
    if (!title) {
      tasks.setError("Please enter a task title.");
      return;
    }

    try {
      await tasks.edit(editingTask.id, title);
      setEditingTask(null);
      setEditTitle("");
    } catch {
      // Error is displayed by useTasks.
    }
  }

  // ==================== DELETE TASK LOGIC ====================
  async function handleDelete() {
    if (!deleteId) return;

    try {
      await tasks.remove(deleteId);
      setDeleteId(null);
    } catch {
      // Error is displayed by useTasks.
    }
  }

  // ==================== LOGOUT LOGIC ====================
  function logout() {
    storage.clearAuth();
    navigate("/login", { replace: true });
  }

  const displayName = user?.fullName || user?.email?.split("@")[0] || "there";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ==================== TOP DASHBOARD HEADER ==================== */}
      <DashboardHeader
        user={user}
        onLogout={logout}
        onMenu={() => setSidebarOpen(true)}
      />

      <div className="mx-auto flex max-w-[1600px]">
        {/* ==================== SIDEBAR / TASK FILTER NAVIGATION ==================== */}
        <TaskSidebar
          filter={tasks.filter}
          onFilter={tasks.setFilter}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          stats={tasks.stats}
        />

        {/* ==================== MAIN DASHBOARD CONTENT ==================== */}
        <main className="min-w-0 flex-1 px-4 py-7 sm:px-6 lg:px-10 lg:py-9">
          <div className="mx-auto max-w-6xl">
            {/* ==================== WELCOME / DATE SECTION ==================== */}
            <div className="mb-8">
              <p className="text-xs font-black uppercase tracking-[.2em] text-blue-700">
                Good to see you
              </p>
              <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                    Hello, {displayName}! 👋
                  </h1>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Here's what your productivity looks like today.
                  </p>
                </div>
                <div className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-500 shadow-sm ring-1 ring-slate-200">
                  {new Date().toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>

            {/* ==================== TASK STATISTICS CARDS ==================== */}
            <section className="grid gap-4 sm:grid-cols-3">
              <StatCard
                label="Total tasks"
                value={tasks.stats.total}
                icon={ListChecks}
                tone="indigo"
              />
              <StatCard
                label="Pending"
                value={tasks.stats.pending}
                icon={Clock3}
                tone="amber"
              />
              <StatCard
                label="Completed"
                value={tasks.stats.completed}
                icon={CheckCircle2}
                tone="emerald"
              />
            </section>

            {/* ==================== ADD NEW TASK FORM ==================== */}
            <section className="mt-6 rounded-3xl bg-gradient-to- from-indigo-600 via-indigo-600 to-violet-600 p-1 shadow-xl shadow-indigo-200">
              <form
                onSubmit={handleAdd}
                className="flex flex-col gap-3 rounded-[1.35rem] bg-white p-3 sm:flex-row"
              >
                <input
                  value={newTitle}
                  onChange={(event) => setNewTitle(event.target.value)}
                  placeholder="Enter your tasks"
                  className="min-w-0 flex-1 rounded-xl bg-blue-50 px-4 py-3.5 text-sm font-medium text-slate-800 outline-none ring-1 ring-transparent transition placeholder:text-slate-400 focus:bg-white focus:ring-indigo-300"
                />
                <Button
                  type="submit"
                  loading={tasks.actionLoading === "add"}
                  className="px-6"
                >
                  <Plus size={18} />
                  Add task
                </Button>
              </form>
            </section>

            {/* ==================== TASK ERROR MESSAGE ==================== */}
            {tasks.error && (
              <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                <span>{tasks.error} </span>
                <button
                  onClick={() => tasks.setError("")}
                  className="font-bold text-rose-500 hover:text-rose-700"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* ==================== TASK LIST / FILTERED TASKS ==================== */}
            <section className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    {tasks.filter === "all"
                      ? "All tasks"
                      : tasks.filter === "pending"
                        ? "Pending tasks"
                        : "Completed tasks"}
                  </h2>
                  <p className="mt-1 text-xs font-medium text-slate-400">
                    {tasks.filteredTasks.length}{" "}
                    {tasks.filteredTasks.length === 1 ? "task" : "tasks"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Loading, empty-state, or task-list UI */}
                {tasks.loading ? (
                  <div className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
                    <p className="mt-4 text-sm font-semibold text-slate-500">
                      Loading your tasks...
                    </p>
                  </div>
                ) : tasks.filteredTasks.length === 0 ? (
                  <div className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
                    <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <ListChecks size={24} />
                    </div>
                    <h3 className="mt-5 font-extrabold text-slate-900">
                      No tasks here
                    </h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                      Add a new task above and start building your progress.
                    </p>
                  </div>
                ) : (
                  tasks.filteredTasks.map((task) => {
                    const taskId = task.id ?? task._id;
                    if (!taskId) return null;

                    return (
                      <TaskItem
                        key={taskId}
                        task={task}
                        busy={
                          tasks.actionLoading === `status:${taskId}` ||
                          tasks.actionLoading === `edit:${taskId}` ||
                          tasks.actionLoading === `delete:${taskId}`
                        }
                        onToggle={() => void tasks.toggleStatus(task)}
                        onEdit={() => {
                          setEditingTask({ id: taskId, title: task.title });
                          setEditTitle(task.title);
                        }}
                        onDelete={() => setDeleteId(taskId)}
                      />
                    );
                  })
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* ==================== EDIT TASK MODAL ==================== */}
      <Modal
        open={Boolean(editingTask)}
        title="Edit task"
        onClose={() => {
          if (!tasks.actionLoading?.startsWith("edit:")) setEditingTask(null);
        }}
      >
        <form onSubmit={handleEdit} className="space-y-5">
          {/* Edited task title field */}
          <Input
            label="Task title"
            value={editTitle}
            autoFocus
            onChange={(event) => setEditTitle(event.target.value)}
            placeholder="Enter a new task title"
          />
          {/* Edit modal action buttons */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setEditingTask(null)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={
                editingTask
                  ? tasks.actionLoading === `edit:${editingTask.id} `
                  : false
              }
            >
              Save changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* ==================== DELETE CONFIRMATION MODAL ==================== */}
      <Modal
        open={Boolean(deleteId)}
        title="Delete this task?"
        onClose={() => setDeleteId(null)}
      >
        {/* Delete confirmation message */}
        <p className="text-sm leading-6 text-slate-500">
          This action permanently removes the task from your account.
        </p>
        {/* Delete modal action buttons */}
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setDeleteId(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            loading={
              deleteId ? tasks.actionLoading === `delete:${deleteId}` : false
            }
            onClick={() => void handleDelete()}
          >
            Delete task
          </Button>
        </div>
      </Modal>
    </div>
  );
}
