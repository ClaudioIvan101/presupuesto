"use client";

import React, { useState } from "react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { Select } from "../atoms/Select";
import { Switch } from "../atoms/Switch";
import { Card } from "../atoms/Card";
import { FormField } from "../molecules/FormField";
import { cn } from "@/lib/utils";

export interface SettingsViewProps {
  onSave: () => void;
}

export function SettingsView({ onSave }: SettingsViewProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [showLogo, setShowLogo] = useState(true);
  const [notifyOpen, setNotifyOpen] = useState(true);
  const [allowReject, setAllowReject] = useState(true);

  const tabs = [
    { id: "profile", label: "Perfil" },
    { id: "brand", label: "Marca" },
    { id: "quotes", label: "Presupuestos" },
    { id: "billing", label: "Facturación" },
  ];

  return (
    <div className="space-y-6 page-transition">
      {/* Page Head */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[32px] font-semibold tracking-[-0.025em] text-[var(--text)] leading-tight">
            Configuración
          </h1>
          <p className="mt-1.5 text-[14px] text-[var(--muted)] leading-relaxed max-w-[650px]">
            Lo mínimo necesario para que cada presupuesto salga listo para enviar.
          </p>
        </div>

        <Button variant="primary" onClick={onSave}>
          Guardar cambios
        </Button>
      </div>

      {/* Settings Layout: Menu + Content */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4.5">
        {/* Settings Menu */}
        <Card className="p-2 h-fit">
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-[10px] px-3 py-2.5 text-[13px] font-medium transition-colors text-left cursor-pointer select-none whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-[var(--surface2)] text-[var(--text)] font-semibold shadow-inner"
                    : "text-[var(--muted)] hover:text-[var(--text)]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </Card>

        {/* Settings Content */}
        <Card className="p-6">
          <div className="max-w-[680px] space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <FormField label="Nombre / estudio">
                <Input defaultValue="Studio / CG" />
              </FormField>
              <FormField label="Email de contacto">
                <Input defaultValue="claudio@studio.dev" />
              </FormField>
              <FormField label="Moneda por defecto">
                <Select defaultValue="ARS — Peso argentino">
                  <option>ARS — Peso argentino</option>
                  <option>USD — Dólar estadounidense</option>
                  <option>EUR — Euro</option>
                </Select>
              </FormField>
              <FormField label="Validez por defecto">
                <Select defaultValue="15 días">
                  <option>15 días</option>
                  <option>7 días</option>
                  <option>30 días</option>
                </Select>
              </FormField>
            </div>

            {/* iOS Switch Rows */}
            <div className="pt-4 border-t border-[var(--border)] divide-y divide-[var(--border)]">
              <div className="flex items-center justify-between py-4.5">
                <div>
                  <b className="text-[13px] font-semibold text-[var(--text)] block">
                    Mostrar logo en propuestas
                  </b>
                  <p className="text-[11.5px] text-[var(--muted)] mt-0.5">
                    Se verá tanto en el link público como en PDF.
                  </p>
                </div>
                <Switch checked={showLogo} onChange={setShowLogo} />
              </div>

              <div className="flex items-center justify-between py-4.5">
                <div>
                  <b className="text-[13px] font-semibold text-[var(--text)] block">
                    Notificar cuando el cliente abra
                  </b>
                  <p className="text-[11.5px] text-[var(--muted)] mt-0.5">
                    Genera el estado “Visto” y registra la última apertura.
                  </p>
                </div>
                <Switch checked={notifyOpen} onChange={setNotifyOpen} />
              </div>

              <div className="flex items-center justify-between py-4.5">
                <div>
                  <b className="text-[13px] font-semibold text-[var(--text)] block">
                    Permitir rechazo con comentario
                  </b>
                  <p className="text-[11.5px] text-[var(--muted)] mt-0.5">
                    El cliente puede explicar por qué no acepta la propuesta.
                  </p>
                </div>
                <Switch checked={allowReject} onChange={setAllowReject} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
