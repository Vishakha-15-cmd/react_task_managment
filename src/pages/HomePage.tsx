import {
  ArrowRight,
  Check,
  CheckCircle2,
  LayoutList,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PublicNavbar } from "../components/layout/PublicNavbar";

export function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,.35),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,.25),transparent_35%),linear-gradient(135deg,#0f172a,#172554_55%,#312e81)]" />
        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

        {/* ==================== PUBLIC NAVIGATION ==================== */}
        <PublicNavbar />

        {/* ==================== HERO CONTENT ==================== */}
        <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-24 text-center">
          <div className="mx-auto flex max-w-4xl flex-col items-center">
            {/* Badge / tagline */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-100 backdrop-blur">
              <Sparkles size={15} />
              Simple.Focused.Productive.
            </div>

            {/* Main hero heading */}
            <h1 className="text-5xl font-black leading-[1.03] tracking-tight sm:text-6xl lg:text-8xl">
              Make every task
              <span className="block bg-linear-to-r from-indigo-300 via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                move you forward.
              </span>
            </h1>

            {/* Hero description */}
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              TaskFlow gives your daily work a clear home.Add tasks, track
              completion, and stay focused on what matters most.
            </p>

            {/* Primary navigation actions */}
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-bold text-blue-800 shadow-xl shadow-black/10 transition hover:-translate-y-1"
              >
                Start for free
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="rounded-2xl border border-white/15 bg-white/5 px-7 py-4 font-bold text-white backdrop-blur transition hover:bg-white/10"
              >
                I already have an account
              </Link>
            </div>

            {/* Hero feature highlights */}
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-300">
              <span className="flex items-center gap-2">
                <Check size={16} className="text-emerald-300" />
                Fast task creation
              </span>

              <span className="flex items-center gap-2">
                <Check size={16} className="text-emerald-300" />
                Live API data
              </span>

              <span className="flex items-center gap-2">
                <Check size={16} className="text-emerald-300" />
                Clean dashboard
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES / BENEFITS SECTION ==================== */}
      <section className="bg-slate-50 px-5 py-20 text-slate-900">
        <div className="mx-auto max-w-7xl">
          {/* Features section heading */}
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[.2em] text-blue-800">
              {" "}
              Everything in one place{" "}
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              {" "}
              Designed around your workflow.
            </h2>
          </div>

          {/* Feature cards */}
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: LayoutList,
                title: "Organize",
                text: "Keep every task visible with simple filters and a focused dashboard.",
              },
              {
                icon: CheckCircle2,
                title: "Track progress",
                text: "Mark work complete and see pending versus completed tasks instantly.",
              },
              {
                icon: ShieldCheck,
                title: "API powered",
                text: "Your task data is loaded and updated through the authenticated backend.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Icon size={22} />
                </span>
                <h3 className="mt-6 text-xl font-extrabold"> {title} </h3>
                <p className="mt-3 leading-7 text-slate-500"> {text} </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
