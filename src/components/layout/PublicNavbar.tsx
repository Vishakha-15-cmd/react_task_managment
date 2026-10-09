// ============================================================
// PUBLIC NAVBAR UI
// Top navigation shown on public pages such as Home.
// ============================================================
import { CheckSquare, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export function PublicNavbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-extrabold text-white"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20">
            <CheckSquare size={19} />
          </span>
          TaskFlow
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:block"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-blue-800 shadow-lg shadow-indigo-950/10 transition hover:-translate-y-0.5"
          >
            <UserPlus size={16} />
            <span className="hidden sm:inline">Get Started</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
