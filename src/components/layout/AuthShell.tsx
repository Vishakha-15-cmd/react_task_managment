// ============================================================
// AUTH PAGE LAYOUT UI
// Shared visual layout for Login and Signup pages.
// ============================================================
import { CheckSquare, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthShellProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthShell({ children, title, subtitle }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-slate-950 lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      {/* ==================== LEFT BRANDING / PROMOTIONAL PANEL ==================== */}
      <section className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,.35),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,.25),transparent_35%),linear-gradient(135deg,#0f172a,#172554_55%,#312e81)]" />
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-3xl" />

        {/* Branding content and TaskFlow logo */}
        <div className="relative flex h-full min-h-screen flex-col justify-between p-12 text-white xl:p-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-extrabold"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15">
              <CheckSquare size={21} />
            </span>
            TaskFlow
          </Link>

          {/* Promotional message */}
          <div className="max-w-lg">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium ring-1 ring-white/10">
              <Sparkles size={15} />
              Built for focused work
            </div>
            <h2 className="text-5xl font-black leading-tight">
              Turn busy days into organized progress.
            </h2>
            <p className="mt-6 text-lg leading-8 text-indigo-100">
              Keep your priorities clear, finish important work, and see your
              progress at a glance.
            </p>
          </div>

          <p className="text-sm text-indigo-200">
            {" "}
            TaskFlow · Smart task management{" "}
          </p>
        </div>
      </section>

      {/* ==================== RIGHT AUTH FORM PANEL ==================== */}
      <section className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 lg:hidden"
          >
            <CheckSquare size={18} />
            TaskFlow
          </Link>

          {/* Login / Signup form card */}
          <div className="rounded-3xl bg-white p-7 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/70 sm:p-9">
            {/* Auth page title and subtitle */}
            <div className="mb-7">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">
                {title}
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {" "}
                {subtitle}{" "}
              </p>
            </div>
            {/* Actual Login or Signup form injected by the page */}
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
