import React from "react";
import { cn } from "@/lib/utils";

export interface StepButtonProps {
  stepNumber: number;
  title: string;
  subtitle: string;
  isActive: boolean;
  isDone: boolean;
  onClick: () => void;
}

export function StepButton({
  stepNumber,
  title,
  subtitle,
  isActive,
  isDone,
  onClick,
}: StepButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full grid grid-cols-[28px_1fr_auto] items-center gap-2.5 p-2.5 rounded-[var(--radius-md)] text-left transition-all duration-180 cursor-pointer select-none",
        "hover:bg-[var(--surface2)]",
        isActive && "bg-[var(--surface2)] text-[var(--text)] font-semibold shadow-inner",
        !isActive && "text-[var(--muted)]"
      )}
    >
      <div
        className={cn(
          "w-6.5 h-6.5 rounded-full border border-[var(--border)] grid place-items-center text-[11px] font-semibold transition-colors",
          isDone && "bg-[var(--accent)] text-white border-[var(--accent)]",
          isActive && !isDone && "border-[var(--accent)] text-[var(--accent)]"
        )}
      >
        {isDone ? "✓" : stepNumber}
      </div>

      <div className="min-w-0">
        <strong className="block text-[13px] font-medium leading-tight text-[var(--text)]">
          {title}
        </strong>
        <small className="block text-[10.5px] text-[var(--muted)] mt-0.5 truncate">
          {subtitle}
        </small>
      </div>

      <div className="text-[12px] text-[var(--accent)] font-bold">
        {isDone && "✓"}
      </div>
    </button>
  );
}
