import React from "react";
import { MetricCard } from "../atoms/MetricCard";
import { Button } from "../atoms/Button";
import { Card, CardHeader, CardBody } from "../atoms/Card";
import { ActivityRow } from "../molecules/ActivityRow";
import { FunnelStep } from "../molecules/FunnelStep";
import { ActivityItem, FunnelItem, MetricItem } from "@/types";

export interface DashboardViewProps {
  onNavigate: (page: string) => void;
  onToast: (msg: string) => void;
}

const metrics: MetricItem[] = [
  { title: "Presupuestos activos", badge: "↗", value: "7", subtext: "3 esperando respuesta" },
  { title: "Valor enviado", badge: "ARS", value: "$4.8M", subtext: "Últimos 30 días" },
  { title: "Tasa de aceptación", badge: "✓", value: "62%", subtext: "8 de 13 aceptados" },
  { title: "Tiempo hasta respuesta", badge: "⏱", value: "1.8d", subtext: "Promedio histórico" },
];

const activities: ActivityItem[] = [
  { id: "1", icon: "✓", title: "Gimnasio Norte aceptó el presupuesto", description: "Web institucional + agenda de clases · $980.000", time: "hace 18 min" },
  { id: "2", icon: "◉", title: "Martina abrió tu presupuesto", description: "Landing para lanzamiento · QF-0024", time: "hace 2 h" },
  { id: "3", icon: "→", title: "Presupuesto enviado a Nova Studio", description: "Automatización de leads · USD 1,450", time: "ayer" },
  { id: "4", icon: "•", title: "Borrador actualizado", description: "E-commerce B2B · 6 features definidas", time: "ayer" },
];

const funnel: FunnelItem[] = [
  { label: "Enviados", count: 13, percentage: 100 },
  { label: "Vistos", count: 11, percentage: 84 },
  { label: "Aceptados", count: 8, percentage: 62 },
  { label: "Rechazados", count: 2, percentage: 15 },
];

export function DashboardView({ onNavigate, onToast }: DashboardViewProps) {
  return (
    <div className="space-y-7 page-transition">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[32px] font-semibold tracking-[-0.025em] text-[var(--text)] leading-tight">
            Buenas noches, Claudio.
          </h1>
          <p className="mt-1.5 text-[14px] text-[var(--muted)] leading-relaxed max-w-[650px]">
            Todo lo importante de tus presupuestos, sin convertirlo en un CRM.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button variant="secondary" onClick={() => onToast("Exportando datos...")}>
            Exportar
          </Button>
          <Button variant="primary" onClick={() => onNavigate("builder")}>
            + Nuevo presupuesto
          </Button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <MetricCard
            key={m.title}
            title={m.title}
            badge={m.badge}
            value={m.value}
            subtext={m.subtext}
          />
        ))}
      </div>

      {/* Dashboard Grid: Activity + Funnel */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.7fr_minmax(290px,0.7fr)]">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div>
              <h2 className="text-[14px] font-semibold text-[var(--text)]">Actividad reciente</h2>
              <span className="text-[12px] text-[var(--muted)]">Qué pasó con tus últimos presupuestos</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("quotes")}
              className="text-[12.5px] font-medium text-[var(--accent)] hover:underline cursor-pointer"
            >
              Ver todos ›
            </button>
          </CardHeader>
          <div className="divide-y divide-[var(--border)]">
            {activities.map((a) => (
              <ActivityRow
                key={a.id}
                icon={a.icon}
                title={a.title}
                description={a.description}
                time={a.time}
              />
            ))}
          </div>
        </Card>

        {/* Funnel */}
        <Card>
          <CardHeader>
            <div>
              <h2 className="text-[14px] font-semibold text-[var(--text)]">Embudo simple</h2>
              <span className="text-[12px] text-[var(--muted)]">Sin pipeline, solo presupuesto</span>
            </div>
          </CardHeader>
          <CardBody className="space-y-1">
            {funnel.map((step) => (
              <FunnelStep
                key={step.label}
                label={step.label}
                count={step.count}
                percentage={step.percentage}
              />
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
