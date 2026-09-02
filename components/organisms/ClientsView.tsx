import React, { useState } from "react";
import { Button } from "../atoms/Button";
import { Avatar } from "../atoms/Avatar";
import { Card } from "../atoms/Card";
import { SearchBar } from "../molecules/SearchBar";
import { ClientItem } from "@/types";

export interface ClientsViewProps {
  onOpenNewClientModal: () => void;
}

const defaultClients: ClientItem[] = [
  {
    id: "1",
    name: "Gimnasio Norte",
    avatar: "GN",
    company: "Empresa",
    email: "hola@gimnasionorte.com",
    quotesCount: 3,
    acceptedCount: 2,
    totalValue: "$1.64M",
    lastActivity: "Hoy",
  },
  {
    id: "2",
    name: "Martina B.",
    avatar: "MB",
    company: "Independiente",
    email: "martina@brandlab.co",
    quotesCount: 2,
    acceptedCount: 1,
    totalValue: "USD 1.040",
    lastActivity: "Hoy",
  },
  {
    id: "3",
    name: "Nova Studio",
    avatar: "NS",
    company: "Agencia",
    email: "team@novastudio.io",
    quotesCount: 4,
    acceptedCount: 3,
    totalValue: "USD 5.800",
    lastActivity: "Ayer",
  },
  {
    id: "4",
    name: "Argen Retail",
    avatar: "AR",
    company: "Empresa",
    email: "producto@argenretail.com",
    quotesCount: 1,
    acceptedCount: 0,
    totalValue: "USD 3.200",
    lastActivity: "28 ago",
  },
];

export function ClientsView({ onOpenNewClientModal }: ClientsViewProps) {
  const [search, setSearch] = useState("");
  const [clients] = useState<ClientItem[]>(defaultClients);

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 page-transition">
      {/* Page Head */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[32px] font-semibold tracking-[-0.025em] text-[var(--text)] leading-tight">
            Clientes
          </h1>
          <p className="mt-1.5 text-[14px] text-[var(--muted)] leading-relaxed max-w-[650px]">
            Una libreta mínima para no volver a cargar datos cada vez. Sin CRM, sin oportunidades, sin pipelines.
          </p>
        </div>

        <Button variant="primary" onClick={onOpenNewClientModal}>
          + Nuevo cliente
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          placeholder="Buscar cliente"
          onSearchChange={setSearch}
        />

        <Button variant="secondary" size="sm">
          Ordenar ▾
        </Button>
      </div>

      {/* Clients Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13.5px] border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface)] text-[10.5px] font-semibold uppercase tracking-[0.045em] text-[var(--muted)]">
                <th className="px-5 py-3">Cliente</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3 text-center">Presupuestos</th>
                <th className="px-5 py-3 text-center">Aceptados</th>
                <th className="px-5 py-3">Valor total</th>
                <th className="px-5 py-3">Última actividad</th>
                <th className="px-4 py-3 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredClients.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-[var(--surface2)] transition-colors duration-150 cursor-pointer"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar initials={c.avatar} size="sm" />
                      <div>
                        <b className="font-semibold text-[var(--text)] leading-tight block">
                          {c.name}
                        </b>
                        {c.company && (
                          <span className="text-[11.5px] text-[var(--muted)]">
                            {c.company}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-[13px] text-[var(--muted)]">
                    {c.email}
                  </td>

                  <td className="px-5 py-4 text-center font-medium text-[var(--text)]">
                    {c.quotesCount}
                  </td>

                  <td className="px-5 py-4 text-center font-medium text-[var(--text)]">
                    {c.acceptedCount}
                  </td>

                  <td className="px-5 py-4 font-semibold text-[var(--text)]">
                    {c.totalValue}
                  </td>

                  <td className="px-5 py-4 text-[12.5px] text-[var(--muted)]">
                    {c.lastActivity}
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
