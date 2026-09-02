import React from "react";
import { cn } from "@/lib/utils";

export interface ChoiceCardProps {
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export function ChoiceCard({
  title,
  description,
  isSelected,
  onClick,
  className,
}: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[var(--radius-md)] border bg-[var(--surface)] p-4 text-left transition-all duration-200 cursor-pointer select-none",
        "hover:border-[var(--border-strong)] hover:-translate-y-0.5 hover:shadow-[0_5px_16px_rgba(0,0,0,0.045)]",
        isSelected
          ? "border-2 border-[var(--accent)] p-[15px] ring-3 ring-[var(--accent)]/10 shadow-sm"
          : "border-[var(--border)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <strong className="text-[13.5px] font-semibold text-[var(--text)]">
          {title}
        </strong>
        <div
          className={cn(
            "h-4 w-4 rounded-full border border-[var(--border-strong)] grid place-items-center shrink-0 transition-colors",
            isSelected && "border-[var(--accent)]"
          )}
        >
          {isSelected && (
            <div className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          )}
        </div>
      </div>
      <p className="mt-1.5 text-[11.5px] text-[var(--muted)] leading-relaxed">
        {description}
      </p>
    </button>
  );
}
