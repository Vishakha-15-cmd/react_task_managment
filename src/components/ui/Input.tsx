// ============================================================
// REUSABLE INPUT UI
// Shared labeled input component for forms.
// ============================================================
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", id, ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {/* Input label */}
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      {/* Actual text/email/password input */}
      <input
        id={id}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 ${
          error ? "border-rose-400" : "border-slate-200"
        } ${className}`}
        {...props}
      />
      {/* Field-level validation error */}
      {error && <p className="text-xs font-medium text-rose-600">{error}</p>}
    </div>
  );
}
