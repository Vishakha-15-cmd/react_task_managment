import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthShell } from "../components/layout/AuthShell";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useAuth } from "../features/auth/hooks/useAuth";

const initialForm = {
  fullName: "",
  email: "",
  password: "",
  gender: "",
};

export function SignupPage() {
  // ==================== SIGNUP FORM STATE ====================
  const auth = useAuth();
  const [form, setForm] = useState(initialForm);

  // Update one Signup field while keeping the other fields unchanged.
  function updateField(name: keyof typeof form, value: string) {
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  // ==================== SIGNUP FORM SUBMIT LOGIC ====================
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.gender
    ) {
      auth.setError("Please complete all fields.");
      return;
    }

    try {
      await auth.signupUser({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
        gender: form.gender,
      });
    } catch {
      // useAuth exposes the error message in the UI.
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start organizing your work with TaskFlow."
    >
      {/* Signup form: full name, email, password, gender */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full name field */}
        <Input
          id="fullName"
          label="Full name"
          placeholder="Your full name"
          autoComplete="name"
          value={form.fullName}
          onChange={(event) => updateField("fullName", event.target.value)}
        />

        {/* Email field */}
        <Input
          id="signup-email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          autoComplete="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
        />

        {/* Password field */}
        <Input
          id="signup-password"
          type="password"
          label="Password"
          placeholder="Create a password"
          autoComplete="new-password"
          value={form.password}
          onChange={(event) => updateField("password", event.target.value)}
        />

        {/* Gender dropdown */}
        <div className="space-y-2">
          <label
            htmlFor="gender"
            className="block text-sm font-semibold text-slate-700"
          >
            Gender
          </label>
          <select
            id="gender"
            value={form.gender}
            onChange={(event) => updateField("gender", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Signup API / validation error */}
        {auth.error && (
          <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {auth.error}
          </div>
        )}

        {/* Create account button */}
        <Button
          type="submit"
          loading={auth.loading}
          className="mt-2 w-full py-3.5"
        >
          Create account
        </Button>
      </form>

      {/* Link back to Login page */}
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-bold text-blue-700 hover:text-blue-900"
        >
          Login
        </Link>
      </p>
    </AuthShell>
  );
}
