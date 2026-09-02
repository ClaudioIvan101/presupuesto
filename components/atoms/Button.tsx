import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-[var(--radius-pill)] transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer whitespace-nowrap";

    const variantStyles = {
      primary:
        "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] border border-[var(--accent)] shadow-sm",
      secondary:
        "bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--text)] shadow-[var(--shadow-soft)]",
      ghost:
        "bg-transparent text-[var(--accent)] hover:underline border-transparent px-2",
      danger:
        "bg-transparent text-[var(--text)] border border-[var(--border)] hover:border-rose-500 hover:text-rose-500",
    };

    const sizeStyles = {
      sm: "text-[12.5px] px-3.5 py-1.5 gap-1.5",
      md: "text-[13.5px] px-4.5 py-2.5 gap-2",
      lg: "text-[15px] px-6 py-3 gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
