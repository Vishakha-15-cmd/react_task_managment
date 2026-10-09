// ============================================================
// TASK MANAGEMENT LOGIC
// Loads tasks and handles add, edit, delete, status, filters, and statistics.
// ============================================================
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createTask,
  fetchTasks,
  removeTask,
  updateTask,
  updateTaskStatus,
} from "../../../services/api/taskApi";
import type { Task, TaskFilter } from "../../../types/task";
import { taskEditStorage } from "../../../lib/taskEditStorage";

function getTaskId(task: Task): string {
  return task.id ?? task._id ?? "";
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  // ==================== LOAD TASKS ====================
  const loadTasks = useCallback(async () => {
    try {
      // Show loading state while tasks are fetched.
      setLoading(true);
      setError("");
      const serverTasks = await fetchTasks()
      // Keep successful edits visible after refresh if the API GET response is stale.
      setTasks(taskEditStorage.apply(serverTasks))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadTasks();
  }, [loadTasks]);

  // ==================== ADD TASK ====================
  const add = useCallback(
    async (title: string) => {
      setActionLoading("add");
      setError("");

      try {
        // Send new task to the API, then reload the list.
        await createTask(title);
        await loadTasks();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Could not add task.";
        setError(message);
        throw err;
      } finally {
        setActionLoading(null);
      }
    },
    [loadTasks],
  );

  // ==================== EDIT TASK ====================
  const edit = useCallback(async (id: string, title: string) => {
    setActionLoading(`edit:${id}`);
    setError("");

    try {
      // Persist the exact title the user saved.
      // This also protects the UI from a stale GET /api/tasks response after refresh.
      await updateTask(id, title);
      taskEditStorage.setTitle(id, title);

      setTasks((currentTasks) =>
        currentTasks.map((task) => {
          const taskId = getTaskId(task);
          return taskId === id ? { ...task, title } : task;
        }),
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not edit task.";
      setError(message);
      throw err;
    } finally {
      setActionLoading(null);
    }
  }, [loadTasks]);

  // ==================== DELETE TASK ====================
  const remove = useCallback(
    async (id: string) => {
      setActionLoading(`delete:${id}`);
      setError("");

      try {
        // Delete the task from the API, then reload the list.
        await removeTask(id);
        await loadTasks();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Could not delete task.";
        setError(message);
        throw err;
      } finally {
        setActionLoading(null);
      }
    },
    [loadTasks],
  );

  // ==================== TOGGLE TASK STATUS ====================
  const toggleStatus = useCallback(
    async (task: Task) => {
      const id = getTaskId(task);
      if (!id) {
        setError("This task does not have a valid ID.");
        throw new Error("This task does not have a valid ID.");
      }

      setActionLoading(`status:${id}`);
      setError("");

      try {
        // Switch between completed and pending states.
        const status = task.status === "completed" ? "pending" : "completed";
        await updateTaskStatus(id, status);
        await loadTasks();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Could not update task.";
        setError(message);
        throw err;
      } finally {
        setActionLoading(null);
      }
    },
    [loadTasks],
  );

  // ==================== FILTER TASKS ====================
  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    if (filter === "completed") {
      return tasks.filter((task) => task.status === "completed");
    }
    return tasks.filter((task) => task.status !== "completed");
  }, [tasks, filter]);

  // ==================== CALCULATE DASHBOARD COUNTS ====================
  const stats = useMemo(() => {
    const completed = tasks.filter(
      (task) => task.status === "completed",
    ).length;
    // ==================== EXPOSE TASK STATE + ACTIONS ====================
    return {
      total: tasks.length,
      completed,
      pending: tasks.length - completed,
    };
  }, [tasks]);

  return {
    tasks,
    filteredTasks,
    stats,
    filter,
    setFilter,
    loading,
    actionLoading,
    error,
    setError,
    add,
    edit,
    remove,
    toggleStatus,
    reload: loadTasks,
  };
}
