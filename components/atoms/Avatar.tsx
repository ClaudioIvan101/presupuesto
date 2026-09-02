import React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({
  initials,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const sizeStyles = {
    sm: "w-8 h-8 rounded-[9px] text-[11px]",
    md: "w-8.5 h-8.5 rounded-[10px] text-[12px]",
    lg: "w-10 h-10 rounded-[12px] text-[13px]",
  };

  return (
    <div
      className={cn(
        "grid place-items-center bg-[var(--surface2)] border border-[var(--border)] font-semibold text-[var(--text)] select-none shrink-0",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {initials}
    </div>
  );
}
