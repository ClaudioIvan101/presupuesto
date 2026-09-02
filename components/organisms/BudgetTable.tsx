import React from "react";
import { Budget } from "@/types";
import { Badge } from "../atoms/Badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { MoreHorizontal, FileText } from "lucide-react";

export interface BudgetTableProps {
  budgets: Budget[];
  onSelectBudget?: (budget: Budget) => void;
}

export function BudgetTable({ budgets, onSelectBudget }: BudgetTableProps) {
  const statusLabels: Record<string, string> = {
    draft: "Borrador",
    sent: "Enviado",
    approved: "Aprobado",
    rejected: "Rechazado",
    expired: "Vencido",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200/80 bg-zinc-50/75 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
            <tr>
              <th className="px-6 py-3.5">Presupuesto</th>
              <th className="px-6 py-3.5">Cliente</th>
              <th className="px-6 py-3.5">Estado</th>
              <th className="px-6 py-3.5">Fecha</th>
              <th className="px-6 py-3.5 text-right">Total</th>
              <th className="px-6 py-3.5 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
            {budgets.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                  No hay presupuestos creados aún.
                </td>
              </tr>
            ) : (
              budgets.map((budget) => (
                <tr
                  key={budget.id}
                  onClick={() => onSelectBudget?.(budget)}
                  className="group transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 transition-colors">
                          {budget.title}
                        </div>
                        <div className="text-xs text-zinc-500 font-mono">
                          {budget.number}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-medium text-zinc-800 dark:text-zinc-200">
                      {budget.client.name}
                    </div>
                    {budget.client.company && (
                      <div className="text-xs text-zinc-500">
                        {budget.client.company}
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <Badge variant={budget.status}>
                      {statusLabels[budget.status] || budget.status}
                    </Badge>
                  </td>

                  <td className="px-6 py-4 text-xs text-zinc-500 dark:text-zinc-400">
                    {formatDate(budget.createdAt)}
                  </td>

                  <td className="px-6 py-4 text-right font-semibold text-zinc-900 dark:text-zinc-100">
                    {formatCurrency(budget.total, budget.currency)}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      aria-label="Opciones"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
