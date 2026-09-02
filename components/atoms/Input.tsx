import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, disabled, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        disabled={disabled}
        className={cn(
          "w-full rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-[13.5px] text-[var(--text)] placeholder:text-[var(--muted)] transition-all duration-200",
          "hover:border-[var(--border-strong)] focus:outline-none focus:border-[var(--accent)] focus:ring-3 focus:ring-[var(--accent)]/15",
          hasError && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/15",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
