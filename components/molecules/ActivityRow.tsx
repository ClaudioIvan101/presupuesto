import React from "react";
import { cn } from "@/lib/utils";

export interface ActivityRowProps {
  icon: string;
  title: string;
  description: string;
  time: string;
  className?: string;
}

export function ActivityRow({
  icon,
  title,
  description,
  time,
  className,
}: ActivityRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[34px_1fr_auto] items-center gap-3 border-b border-[var(--border)] px-5 py-3.5 last:border-b-0",
        className
      )}
    >
      <div className="flex h-8.5 w-8.5 items-center justify-center rounded-[10px] bg-[var(--surface2)] text-[13px] font-bold text-[var(--accent)] select-none">
        {icon}
      </div>
      <div className="min-w-0">
        <b className="block text-[13.5px] font-semibold text-[var(--text)] leading-snug truncate">
          {title}
        </b>
        <p className="text-[12px] text-[var(--muted)] truncate mt-0.5">
          {description}
        </p>
      </div>
      <time className="text-[11px] text-[var(--muted)] shrink-0 pl-2">
        {time}
      </time>
    </div>
  );
}
