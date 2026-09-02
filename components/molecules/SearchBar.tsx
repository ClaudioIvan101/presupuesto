import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearchChange?: (value: string) => void;
}

export function SearchBar({ className, onSearchChange, placeholder = "Buscar...", ...props }: SearchBarProps) {
  return (
    <div
      className={cn(
        "relative flex items-center w-full max-w-[280px] rounded-[var(--radius-md)] bg-[var(--surface2)] px-3.5 py-2 transition-all duration-200",
        "border border-transparent hover:border-[var(--border)] focus-within:border-[var(--accent)] focus-within:ring-3 focus-within:ring-[var(--accent)]/15",
        className
      )}
    >
      <Search className="h-4 w-4 text-[var(--muted)] shrink-0 mr-2" />
      <input
        type="search"
        placeholder={placeholder}
        className="w-full border-none bg-transparent text-[13px] text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none"
        onChange={(e) => onSearchChange?.(e.target.value)}
        {...props}
      />
    </div>
  );
}
