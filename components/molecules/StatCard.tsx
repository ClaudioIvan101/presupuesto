import React from "react";
import { Card } from "../atoms/Card";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  isPositive = true,
  icon,
  description,
  className,
}: StatCardProps) {
  return (
    <Card hoverEffect className={cn("flex flex-col justify-between", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {title}
        </span>
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {value}
        </div>

        {(change || description) && (
          <div className="mt-1.5 flex items-center gap-2 text-xs">
            {change && (
              <span
                className={cn(
                  "inline-flex items-center font-semibold",
                  isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                )}
              >
                {isPositive ? "↑" : "↓"} {change}
              </span>
            )}
            {description && (
              <span className="text-zinc-500 dark:text-zinc-400">{description}</span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
