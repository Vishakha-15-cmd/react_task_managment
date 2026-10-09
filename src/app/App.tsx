// ============================================================
// APP ROUTING SECTION
// Defines the application's routes and page navigation.
// ============================================================
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { DashboardPage } from "../pages/DashboardPage";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Home / landing page */}
      <Route path="/" element={<HomePage />} />
      {/* Login page */}
      <Route path="/login" element={<LoginPage />} />
      {/* Signup page */}
      <Route path="/signup" element={<SignupPage />} />
      {/* Protected dashboard page */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      {/* Unknown URL fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
