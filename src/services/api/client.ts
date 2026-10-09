// ============================================================
// API CLIENT / REQUEST HANDLER
// Central fetch wrapper, authorization header, response parsing, and errors.
// ============================================================
import { storage } from "../../lib/storage";

// ==================== BACKEND API BASE URL ====================
export const API_URL = "https://intern-crud-task-api.onrender.com";

// ==================== API ERROR TYPE ====================
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ==================== RESPONSE PARSING ====================
async function parseResponse<T>(response: Response): Promise<T | null> {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

// ==================== ERROR MESSAGE EXTRACTION ====================
function getMessage(data: unknown, fallback: string): string {
  if (typeof data === "object" && data !== null) {
    const record = data as Record<string, unknown>;
    if (typeof record.message === "string") return record.message;
    if (typeof record.error === "string") return record.error;
  }

  return fallback;
}

// ==================== CENTRAL API REQUEST HANDLER ====================
export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  // Add authentication token to private API requests.
  const token = storage.getToken();

  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await parseResponse<T>(response);

  // Handle expired / invalid authentication.
  if (response.status === 401) {
    storage.clearAuth();
    throw new ApiError(
      "Your session has expired. Please log in again.",
      401,
    );
  }

  // Handle other HTTP errors.
  if (!response.ok) {
    throw new ApiError(
      getMessage(data, `Request failed with status ${response.status}.`),
      response.status,
    );
  }

  return data as T;
}
