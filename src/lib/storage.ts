// ============================================================
// LOCAL STORAGE / AUTH SESSION
// Stores and retrieves the access token and logged-in user.
// ============================================================
import type { User } from "../types/auth";

const TOKEN_KEY = "accessToken";
const USER_KEY = "currentUser";

// ==================== TOKEN STORAGE ====================
// ==================== USER STORAGE ====================
// ==================== LOGOUT / CLEAR AUTH ====================
export const storage = {
  // Read the access token used for Authorization headers.
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Save the access token after login.
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  // Read the logged-in user's profile.
  getUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  },

  // Save the logged-in user's profile.
  setUser(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  // Remove token and user data during logout or 401 errors.
  clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Check whether a login token exists.
  isAuthenticated() {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },
};
