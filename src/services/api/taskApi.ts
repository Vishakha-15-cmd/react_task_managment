// ============================================================
// TASK API SERVICE
// Contains API requests for loading, creating, editing, completing, and deleting tasks.
// ============================================================
import type { Task } from "../../types/task";
import { apiRequest } from "./client";

// ==================== TASK LIST RESPONSE SHAPE ====================
interface TasksResponse {
  tasks?: Task[];
  data?: Task[];
}

// ==================== NORMALIZE TASK LIST RESPONSE ====================
function extractTasks(response: Task[] | TasksResponse | null): Task[] {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.tasks)) return response.tasks;
  if (Array.isArray(response?.data)) return response.data;
  return [];
}

// ==================== GET TASKS ====================
export async function fetchTasks(): Promise<Task[]> {
  const response = await apiRequest<Task[] | TasksResponse>("/api/tasks");
  return extractTasks(response);
}

// ==================== CREATE TASK ====================
export async function createTask(title: string): Promise<Task> {
  return apiRequest<Task>("/api/tasks", {
    method: "POST",
    body: JSON.stringify({ title, status: "pending" }),
  });
}

// ==================== EDIT TASK ====================
export async function updateTask(
  id: string,
  title: string,
): Promise<Task> {
  return apiRequest<Task>(`/api/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title }),
  });
}

// ==================== UPDATE TASK STATUS ====================
export async function updateTaskStatus(
  id: string,
  status: "pending" | "completed",
): Promise<Task> {
  return apiRequest<Task>(`/api/tasks/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

// ==================== DELETE TASK ====================
export async function removeTask(id: string): Promise<void> {
  await apiRequest<unknown>(`/api/tasks/${id}`, {
    method: "DELETE",
  });
}
