// ============================================================
// AUTHENTICATION LOGIC
// Handles login, signup, loading state, errors, and auth storage.
// ============================================================
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, login, normalizeUser, signup } from "../../../services/api/authApi";
import { storage } from "../../../lib/storage";
import type { LoginPayload, SignupPayload } from "../../../types/auth";

export function useAuth() {
  const navigate = useNavigate();
  // ==================== AUTH STATE ====================
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==================== LOGIN FLOW ====================
  const loginUser = useCallback(async (payload: LoginPayload) => {
    setLoading(true);
    setError("");

    try {
      const response = await login(payload);
      const token = getAccessToken(response);

      if (!token) {
        throw new Error("Login succeeded, but the API did not return an access token.");
      }

      storage.setToken(token);
      storage.setUser(normalizeUser(response, payload.email));
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // ==================== SIGNUP FLOW ====================
  const signupUser = useCallback(async (payload: SignupPayload) => {
    setLoading(true);
    setError("");

    try {
      await signup(payload);
      navigate("/login", {
        replace: true,
        state: { message: "Account created successfully. Please log in." },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signup failed.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // ==================== LOGOUT FLOW ====================
  const logout = useCallback(() => {
    storage.clearAuth();
    navigate("/login", { replace: true });
  }, [navigate]);

  // ==================== AUTH STATE + ACTIONS ====================
  return { loginUser, signupUser, logout, loading, error, setError };
}
