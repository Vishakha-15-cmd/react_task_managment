// ============================================================
// PROTECTED ROUTE LOGIC
// Prevents unauthenticated users from opening private pages.
// ============================================================
import { Navigate, useLocation } from "react-router-dom";
import { storage } from "../../../lib/storage";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();

  // ==================== AUTHENTICATION GUARD ====================
  // Redirect users who do not have a stored access token.
  if (!storage.isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ==================== PROTECTED PAGE CONTENT ====================
  return children;
}
