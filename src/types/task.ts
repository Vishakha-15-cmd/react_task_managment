// ============================================================
// TASK TYPES
// TypeScript types for task data and task filters.
// ============================================================
// Allowed task status values.
export type TaskStatus = "pending" | "completed";

// Task object returned by the backend API.
export interface Task {
  id?: string;
  _id?: string;
  authId?: string;
  title: string;
  description?: string;
  priority?: string;
  status: TaskStatus | string;
}

// Dashboard sidebar filters.
export type TaskFilter = "all" | "pending" | "completed";
