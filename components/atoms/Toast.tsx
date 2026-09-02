import React from "react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  message: string | null;
  isVisible: boolean;
}

export function Toast({ message, isVisible }: ToastProps) {
  if (!isVisible || !message) return null;

  return (
    <div
      className={cn(
        "fixed right-6 bottom-6 z-50 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)]/90 px-4 py-3 text-[12.5px] font-semibold text-[var(--text)] shadow-[var(--shadow)] backdrop-blur-[20px] transition-all duration-200 pointer-events-none",
        "animate-fadeIn"
      )}
    >
      {message}
    </div>
  );
}
