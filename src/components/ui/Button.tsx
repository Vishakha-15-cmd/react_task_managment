// ============================================================
// REUSABLE BUTTON UI
// Shared button component used throughout the application.
// ============================================================
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-blue-900 text-white shadow-lg hover:bg-blue-950",
  secondary:
    "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
  danger:
    "bg-rose-600 text-white shadow-lg shadow-rose-100 hover:bg-rose-700",
  ghost:
    "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800",
};

export function Button({
  children,
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled= { disabled || loading
}
className = {`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
{...props }
    >
  {/* Loading spinner shown while an action is running */ }
{
  loading && (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )
}
{ children }
</button>
  );
}
