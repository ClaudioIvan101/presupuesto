import React from "react";
import { cn } from "@/lib/utils";

export interface FunnelStepProps {
  label: string;
  count: number | string;
  percentage: number;
  className?: string;
}

export function FunnelStep({
  label,
  count,
  percentage,
  className,
}: FunnelStepProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[1fr_auto] items-center gap-2.5 py-2.5 border-b border-[var(--border)] last:border-b-0",
        className
      )}
    >
      <span className="text-[13px] text-[var(--text)]">{label}</span>
      <b className="text-[13px] font-semibold text-[var(--text)]">{count}</b>
      <div className="col-span-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface2)] mt-0.5">
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
    </div>
  );
}
