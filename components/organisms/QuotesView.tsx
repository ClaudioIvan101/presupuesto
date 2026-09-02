import React, { useState } from "react";
import { Button } from "../atoms/Button";
import { Badge } from "../atoms/Badge";
import { Avatar } from "../atoms/Avatar";
import { Card } from "../atoms/Card";
import { SearchBar } from "../molecules/SearchBar";
import { QuoteItem } from "@/types";

export interface QuotesViewProps {
  onNavigate: (page: string) => void;
  onSelectQuote?: (quote: QuoteItem) => void;
}

const defaultQuotes: QuoteItem[] = [
  {
    id: "1",
    number: "QF-0027",
    title: "Web + agenda de clases",
    client: "Gimnasio Norte",
    clientUrl: "gimnasionorte.com",
    avatar: "GN",
    model: "feature",
    modelLabel: "Por feature",
    totalDisplay: "$980.000",
    total: 980000,
    currency: "ARS",
    status: "accepted",
    statusLabel: "Aceptado",
    updatedAt: "Hoy, 21:38",
  },
  {
    id: "2",
    number: "QF-0024",
    title: "Landing de lanzamiento",
    client: "Martina B.",
    clientUrl: "Independiente",
    avatar: "MB",
    model: "fixed",
    modelLabel: "Precio fijo",
    totalDisplay: "USD 690",
    total: 690,
    currency: "USD",
    status: "viewed",
    statusLabel: "Visto",
    updatedAt: "Hoy, 19:12",
  },
  {
    id: "3",
    number: "QF-0023",
    title: "Automatización de leads",
    client: "Nova Studio",
    clientUrl: "novastudio.io",
    avatar: "NS",
    model: "implementation",
    modelLabel: "Implementación",
    totalDisplay: "USD 1.450",
    total: 1450,
    currency: "USD",
    status: "sent",
    statusLabel: "Enviado",
    updatedAt: "Ayer",
  },
  {
    id: "4",
    number: "QF-0022",
    title: "E-commerce B2B",
    client: "Argen Retail",
    clientUrl: "argenretail.com",
    avatar: "AR",
    model: "feature",
    modelLabel: "Por feature",
    totalDisplay: "USD 3.200",
    total: 3200,
    currency: "USD",
    status: "draft",
    statusLabel: "Borrador",
    updatedAt: "28 ago",
  },
  {
    id: "5",
    number: "QF-0019",
    title: "Soporte mensual",
    client: "Lumen Co.",
    clientUrl: "lumenco.ar",
    avatar: "LC",
    model: "hour",
    modelLabel: "Por hora",
    totalDisplay: "$38.000/h",
    total: 38000,
    currency: "ARS",
    status: "rejected",
    statusLabel: "Rechazado",
    updatedAt: "24 ago",
  },
];

export function QuotesView({ onNavigate, onSelectQuote }: QuotesViewProps) {
  const [search, setSearch] = useState("");
  const [quotes] = useState<QuoteItem[]>(defaultQuotes);

  const filteredQuotes = quotes.filter(
    (q) =>
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.client.toLowerCase().includes(search.toLowerCase()) ||
      q.number.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 page-transition">
      {/* Page Head */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[32px] font-semibold tracking-[-0.025em] text-[var(--text)] leading-tight">
            Presupuestos
          </h1>
          <p className="mt-1.5 text-[14px] text-[var(--muted)] leading-relaxed max-w-[650px]">
            Crea, envía y seguí el estado de cada propuesta desde un único lugar.
          </p>
        </div>

        <Button variant="primary" onClick={() => onNavigate("builder")}>
          + Nuevo presupuesto
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          placeholder="Buscar cliente, proyecto o #"
          onSearchChange={setSearch}
        />

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            Estado ▾
          </Button>
          <Button variant="secondary" size="sm">
            Últimos 30 días ▾
          </Button>
        </div>
      </div>

      {/* Quotes Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13.5px] border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface)] text-[10.5px] font-semibold uppercase tracking-[0.045em] text-[var(--muted)]">
                <th className="px-5 py-3">Presupuesto</th>
                <th className="px-5 py-3">Cliente</th>
                <th className="px-5 py-3">Modelo</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Estado</th>
                <th className="px-5 py-3">Actualizado</th>
                <th className="px-4 py-3 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredQuotes.map((q) => (
                <tr
                  key={q.id}
                  onClick={() => onSelectQuote?.(q)}
                  className="hover:bg-[var(--surface2)] transition-colors duration-150 cursor-pointer"
                >
                  <td className="px-5 py-4">
                    <b className="block font-semibold text-[var(--text)] leading-tight">
                      {q.title}
                    </b>
                    <span className="block text-[11.5px] text-[var(--muted)] mt-0.5 font-mono">
                      {q.number}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar initials={q.avatar} size="sm" />
                      <div>
                        <div className="font-medium text-[var(--text)] leading-tight">
                          {q.client}
                        </div>
                        {q.clientUrl && (
                          <span className="text-[11.5px] text-[var(--muted)]">
                            {q.clientUrl}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-[var(--muted)] text-[13px]">
                    {q.modelLabel}
                  </td>

                  <td className="px-5 py-4 font-semibold text-[var(--text)]">
                    {q.totalDisplay}
                  </td>

                  <td className="px-5 py-4">
                    <Badge status={q.status}>
                      {q.statusLabel}
                    </Badge>
                  </td>

                  <td className="px-5 py-4 text-[12.5px] text-[var(--muted)]">
                    {q.updatedAt}
                  </td>

                  <td className="px-4 py-4 text-center text-[var(--muted)]">
                    <span className="font-mono text-sm tracking-widest">•••</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
