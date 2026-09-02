import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, disabled, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(
          "w-full rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-[13.5px] text-[var(--text)] placeholder:text-[var(--muted)] transition-all duration-200 resize-y",
          "hover:border-[var(--border-strong)] focus:outline-none focus:border-[var(--accent)] focus:ring-3 focus:ring-[var(--accent)]/15",
          hasError && "border-rose-500 focus:border-rose-500",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
