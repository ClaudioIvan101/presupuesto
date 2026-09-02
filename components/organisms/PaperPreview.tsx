import React from "react";
import { BuilderState } from "@/types";
import { formatCurrency } from "@/lib/utils";

export interface PaperPreviewProps {
  state: BuilderState;
}

export function PaperPreview({ state }: PaperPreviewProps) {
  const modelLabels: Record<string, string> = {
    hour: "Precio por hora",
    feature: "Precio por feature",
    fixed: "Precio fijo",
    implementation: "Implementación / setup",
    retainer: "Abono mensual",
    custom: "Modelo personalizado",
  };

  return (
    <aside className="hidden lg:block w-[390px] border-l border-[var(--border)] bg-[var(--bg)] p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-4 text-[12px]">
        <b className="font-semibold text-[var(--text)]">Preview en vivo</b>
        <span className="text-[11px] text-[var(--muted)]">Vista Cliente</span>
      </div>

      <div className="paper min-h-[650px] space-y-5 text-[#1D1D1F]">
        {/* Head */}
        <div className="flex items-start justify-between border-b border-[#D2D2D7] pb-5">
          <div>
            <div className="text-[18px] font-bold tracking-tight">Studio / CG</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6E6E73] mt-1">
              Propuesta comercial
            </div>
          </div>
          <div className="text-right text-[11.5px] text-[#6E6E73] font-mono leading-tight">
            QF-0028<br />30 AGO 2026
          </div>
        </div>

        {/* Client & Project */}
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6E6E73]">
            Para
          </div>
          <h2 className="text-[22px] font-bold tracking-tight leading-snug my-0.5 text-[#1D1D1F]">
            {state.client || "Nombre del cliente"}
          </h2>
          <p className="text-[12px] text-[#6E6E73]">
            {state.project || "Proyecto sin título"}
          </p>
        </div>

        {/* Scope */}
        <div className="border-b border-[#E8E8ED] pb-4.5">
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#6E6E73] mb-1.5">
            Alcance
          </h4>
          <p className="text-[12.5px] leading-relaxed text-[#333]">
            {state.scope || "Sin descripción de alcance"}
          </p>
        </div>

        {/* Deliverables */}
        <div className="border-b border-[#E8E8ED] pb-4.5">
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#6E6E73] mb-2">
            Entregables
          </h4>
          <ul className="list-disc pl-4.5 space-y-1 text-[12.5px] text-[#333]">
            {state.deliverables.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Estimated Time */}
        <div className="border-b border-[#E8E8ED] pb-4.5">
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#6E6E73] mb-1.5">
            Tiempo estimado
          </h4>
          <p className="text-[12.5px] text-[#333]">
            {state.time} desde la aprobación.
          </p>
        </div>

        {/* Price & Payment terms */}
        <div className="flex items-end justify-between pt-3">
          <div>
            <span className="text-[11px] text-[#6E6E73] block">
              {modelLabels[state.model] || "Modelo de cobro"}
            </span>
            <div className="text-[10.5px] text-[#6E6E73] mt-1">
              50% al iniciar · 50% contra entrega
            </div>
          </div>
          <strong className="text-[27px] font-bold tracking-[-0.03em] text-[#1D1D1F]">
            {formatCurrency(state.total, state.currency)}
          </strong>
        </div>
      </div>
    </aside>
  );
}
