import { Button } from "../atoms/Button";
import { Badge } from "../atoms/Badge";
import { BuilderState } from "@/types";
import { formatCurrency } from "@/lib/utils";

export interface PublicQuoteViewProps {
  state: BuilderState;
  onAccept: () => void;
  onReject: () => void;
  onToast: (msg: string) => void;
}

export function PublicQuoteView({
  state,
  onAccept,
  onReject,
  onToast,
}: PublicQuoteViewProps) {
  return (
    <div className="max-w-[1000px] mx-auto py-12 px-4 sm:px-6 page-transition">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-7">
        <div className="font-semibold text-[17px] text-[var(--text)] tracking-[-0.015em]">
          Studio / CG
        </div>
        <Badge status="viewed">Visto hace 2 min</Badge>
      </div>

      {/* Public Proposal Card */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] overflow-hidden">
        {/* Hero */}
        <div className="border-b border-[var(--border)] p-9 sm:p-11">
          <div className="text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[var(--accent)]">
            Propuesta QF-0028 · 30 AGO 2026
          </div>
          <h1 className="text-[36px] sm:text-[40px] font-semibold tracking-[-0.028em] text-[var(--text)] my-2">
            {state.project}
          </h1>
          <p className="text-[14px] text-[var(--muted)] max-w-[680px] leading-relaxed">
            Propuesta preparada para {state.client}. Incluye alcance, entregables, tiempos, inversión y condiciones.
          </p>
        </div>

        {/* 2 Columns: Content + Summary Box */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.7fr]">
          {/* Left Column: Scope, Deliverables, Exclusions, Conditions */}
          <div className="p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-[var(--border)] space-y-8">
            <section>
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[var(--text)] mb-2.5">
                Alcance
              </h3>
              <p className="text-[13.5px] text-[var(--muted)] leading-relaxed">
                {state.scope}
              </p>
            </section>

            <section>
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[var(--text)] mb-2.5">
                Entregables
              </h3>
              <ul className="list-disc pl-4.5 space-y-1.5 text-[13.5px] text-[var(--muted)] leading-relaxed">
                {state.deliverables.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[var(--text)] mb-2.5">
                No incluido
              </h3>
              <p className="text-[13.5px] text-[var(--muted)] leading-relaxed">
                Producción de fotografía/video, redacción integral de contenidos y sistemas internos de gestión de socios.
              </p>
            </section>

            <section>
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[var(--text)] mb-2.5">
                Condiciones
              </h3>
              <p className="text-[13.5px] text-[var(--muted)] leading-relaxed">
                Inicio con 50% de anticipo. Saldo restante contra entrega. Incluye dos rondas de cambios sobre el diseño aprobado. La propuesta tiene una validez de 15 días.
              </p>
            </section>
          </div>

          {/* Right Column: Pricing Summary & Decision Actions */}
          <aside className="p-8 sm:p-9 bg-[var(--surface2)] flex flex-col justify-between space-y-6">
            <div className="divide-y divide-[var(--border)]">
              <div className="pb-4">
                <span className="text-[11px] text-[var(--muted)] block mb-1">
                  Cliente
                </span>
                <b className="text-[15px] font-semibold text-[var(--text)]">
                  {state.client}
                </b>
              </div>

              <div className="py-4">
                <span className="text-[11px] text-[var(--muted)] block mb-1">
                  Modelo de cobro
                </span>
                <b className="text-[15px] font-semibold text-[var(--text)]">
                  {state.model === "feature"
                    ? "Por feature / entregable"
                    : state.model === "hour"
                    ? "Por hora"
                    : "Precio fijo"}
                </b>
              </div>

              <div className="py-4">
                <span className="text-[11px] text-[var(--muted)] block mb-1">
                  Tiempo estimado
                </span>
                <b className="text-[15px] font-semibold text-[var(--text)]">
                  {state.time}
                </b>
              </div>

              <div className="py-5">
                <span className="text-[11px] text-[var(--muted)] block">
                  Inversión total
                </span>
                <strong className="block text-[30px] font-bold tracking-[-0.03em] text-[var(--text)] mt-1">
                  {formatCurrency(state.total, state.currency)}
                </strong>
                <small className="text-[11.5px] text-[var(--muted)]">
                  {state.currency} · impuestos no incluidos
                </small>
              </div>
            </div>

            <div className="space-y-2.5">
              <Button
                variant="primary"
                className="w-full text-[14px] py-3 shadow-md"
                onClick={onAccept}
              >
                Aceptar propuesta
              </Button>
              <Button
                variant="secondary"
                className="w-full text-[14px] py-2.5"
                onClick={onReject}
              >
                Rechazar / comentar
              </Button>
              <Button
                variant="ghost"
                className="w-full text-[13px]"
                onClick={() => onToast("Descargando PDF...")}
              >
                Descargar PDF
              </Button>
              <div className="text-[10.5px] text-[var(--muted)] text-center pt-1 leading-tight">
                Al aceptar confirmás que leíste el alcance y las condiciones.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
