// ============================================================
// DASHBOARD HEADER UI
// Top bar containing TaskFlow branding, user information, and logout/menu controls.
// ============================================================
import { Bell, CheckSquare, LogOut, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import type { User } from "../../../types/auth";

interface DashboardHeaderProps {
  user: User | null;
  onLogout: () => void;
  onMenu: () => void;
}

export function DashboardHeader({
  user,
  onLogout,
  onMenu,
}: DashboardHeaderProps) {
  const name = user?.fullName || user?.email?.split("@")[0] || "User";

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="flex h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            onClick={onMenu}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* TaskFlow dashboard logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-black text-slate-900"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-800 text-white shadow-lg shadow-indigo-200">
              <CheckSquare size={18} />
            </span>
            <span> TaskFlow </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notification button */}
          <button className="hidden rounded-xl p-2.5 text-slate-400 hover:bg-slate-100 sm:block">
            <Bell size={19} />
          </button>

          {/* Logged-in user information */}
          <div className="hidden text-right sm:block">
            <p className="text-sm font-bold text-slate-800"> {name} </p>
            <p className="text-xs text-slate-400"> Workspace </p>
          </div>

          {/* Logout button */}
          <button
            onClick={onLogout}
            className="grid h-10 w-10 place-items-center rounded-xl bg-rose-50 text-rose-600 transition hover:bg-rose-100"
            aria-label="Logout"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
