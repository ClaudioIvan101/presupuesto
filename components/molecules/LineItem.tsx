import React from "react";
import { Input } from "../atoms/Input";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LineItemProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  canRemove?: boolean;
  className?: string;
}

export function LineItem({
  label,
  value,
  onChange,
  onRemove,
  canRemove = true,
  className,
}: LineItemProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[1fr_34px] items-end gap-2.5 py-3 border-t border-[var(--border)] first:border-t-0",
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <label className="text-[10.5px] font-medium text-[var(--muted)]">
          {label}
        </label>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Escribe el entregable..."
        />
      </div>

      {canRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="flex h-[41px] w-[34px] items-center justify-center rounded-[var(--radius-sm)] text-[var(--muted)] hover:bg-[var(--surface2)] hover:text-[var(--text)] transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      ) : <div />}
    </div>
  );
}
