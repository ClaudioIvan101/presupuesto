import React from "react";
import { cn } from "@/lib/utils";
import { QuoteStatus } from "@/types";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: QuoteStatus | "approved" | "expired" | "default" | string;
  variant?: QuoteStatus | "approved" | "expired" | "default" | string;
}

export function Badge({
  className,
  status,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const currentStatus = status || variant;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-medium border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] transition-colors",
        className
      )}
      {...props}
    >
      {(currentStatus === "accepted" || currentStatus === "approved") && (
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--sys-green)] shrink-0" />
      )}
      {currentStatus === "viewed" && (
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
      )}
      {(currentStatus === "sent" ||
        currentStatus === "draft" ||
        currentStatus === "rejected" ||
        currentStatus === "expired" ||
        currentStatus === "default") && (
        <span className="h-1.5 w-1.5 rounded-full border border-[var(--muted)] shrink-0" />
      )}
      {children}
    </span>
  );
}
