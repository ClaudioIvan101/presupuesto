import React from "react";
import { cn } from "@/lib/utils";

export interface MetricCardProps {
  title: string;
  badge: string;
  value: string | number;
  subtext: string;
  className?: string;
}

export function MetricCard({
  title,
  badge,
  value,
  subtext,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5.5 shadow-[var(--shadow-soft)] transition-all duration-200",
        className
      )}
    >
      <div className="flex items-center justify-between text-[12.5px] text-[var(--muted)]">
        <span>{title}</span>
        <span className="font-mono text-xs text-[var(--faint)]">{badge}</span>
      </div>
      <div className="my-3 font-semibold text-[31px] tracking-[-0.025em] text-[var(--text)] leading-tight font-sans">
        {value}
      </div>
      <div className="text-xs text-[var(--muted)]">{subtext}</div>
    </div>
  );
}
