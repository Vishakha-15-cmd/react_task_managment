// ============================================================
// AUTH API SERVICE
// Sends Login/Signup requests and extracts user/token data.
// ============================================================
import type {
  LoginPayload,
  LoginResponse,
  SignupPayload,
  User,
} from "../../types/auth";
import { apiRequest } from "./client";

// ==================== LOGIN API ====================
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ==================== SIGNUP API ====================
export async function signup(payload: SignupPayload): Promise<unknown> {
  return apiRequest<unknown>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ==================== NORMALIZE USER RESPONSE ====================
export function normalizeUser(
  response: LoginResponse,
  email: string,
): User {
  return (
    response.user ??
    response.data?.user ?? {
      email,
      fullName: response.data?.user?.fullName,
    }
  );
}

// ==================== EXTRACT ACCESS TOKEN ====================
export function getAccessToken(response: LoginResponse): string | null {
  return (
    response.accessToken ??
    response.access_token ??
    response.token ??
    response.data?.accessToken ??
    response.data?.access_token ??
    response.data?.token ??
    null
  );
}
