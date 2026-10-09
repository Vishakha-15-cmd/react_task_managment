import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthShell } from "../components/layout/AuthShell";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useAuth } from "../features/auth/hooks/useAuth";

export function LoginPage() {
  // ==================== LOGIN STATE ====================
  const location = useLocation();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const successMessage = (location.state as { message?: string } | null)
    ?.message;

  // ==================== LOGIN FORM SUBMIT LOGIC ====================
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password) {
      auth.setError("Please enter your email and password.");
      return;
    }

    try {
      await auth.loginUser({ email: email.trim(), password });
    } catch {
      // useAuth exposes the error message in the UI.
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue managing your tasks."
    >
      {/* Success message after signup/redirect */}
      {successMessage && (
        <div className="mb-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {successMessage}
        </div>
      )}

      {/* Login form: email, password, validation, and submit */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email field */}
        <Input
          id="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        {/* Password field */}
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {/* API / validation error message */}
        {auth.error && (
          <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {auth.error}
          </div>
        )}

        {/* Login submit button */}
        <Button type="submit" loading={auth.loading} className="w-full py-3.5">
          Login
        </Button>
      </form>

      {/* Link to Signup page */}
      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-bold text-blue-700 hover:text-blue-900"
        >
          Create account
        </Link>
      </p>
    </AuthShell>
  );
}
