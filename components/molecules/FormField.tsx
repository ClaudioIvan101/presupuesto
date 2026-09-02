import React from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  helperText?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  error,
  helperText,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-[11.5px] font-medium text-[var(--muted)]"
      >
        {label}
      </label>
      {children}
      {error ? (
        <span className="text-xs text-rose-500">{error}</span>
      ) : helperText ? (
        <span className="text-[11px] text-[var(--muted)]">{helperText}</span>
      ) : null}
    </div>
  );
}
