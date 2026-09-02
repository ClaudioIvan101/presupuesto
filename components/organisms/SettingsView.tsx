"use client";

import React, { useState, useRef } from "react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { Select } from "../atoms/Select";
import { Switch } from "../atoms/Switch";
import { Card } from "../atoms/Card";
import { FormField } from "../molecules/FormField";
import { cn } from "@/lib/utils";
import { Upload, Lock, ChevronDown, ChevronUp, Zap, Star } from "lucide-react";

export interface SettingsViewProps {
  onSave: () => void;
}

export function SettingsView({ onSave }: SettingsViewProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [showLogo, setShowLogo] = useState(true);
  const [notifyOpen, setNotifyOpen] = useState(true);
  const [allowReject, setAllowReject] = useState(true);

  // Logo
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const tabs = [
    { id: "profile", label: "Perfil" },
    { id: "brand", label: "Marca" },
    { id: "quotes", label: "Presupuestos" },
    { id: "billing", label: "Facturación" },
  ];

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  // Plan data
  const planUsed = 7;
  const planLimit = 20;
  const planPercent = Math.round((planUsed / planLimit) * 100);

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
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4">
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
          {/* ─────────────── PERFIL ─────────────── */}
          {activeTab === "profile" && (
            <div className="max-w-[640px] space-y-6">
              {/* Nombre / Email */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted)] mb-3">
                  Datos personales
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <FormField label="Nombre / estudio">
                    <Input defaultValue="Studio / CG" />
                  </FormField>
                  <FormField label="Email de contacto">
                    <Input defaultValue="claudio@studio.dev" type="email" />
                  </FormField>
                </div>
              </div>

              {/* Logo */}
              <div className="border-t border-[var(--border)] pt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted)] mb-3">
                  Logo
                </p>
                <div className="flex items-center gap-4">
                  {/* Preview */}
                  <div className="h-14 w-14 flex-shrink-0 rounded-[12px] border border-[var(--border)] bg-[var(--surface2)] overflow-hidden flex items-center justify-center">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-[18px] font-bold text-[var(--accent)]">Q</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoChange}
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-3.5 w-3.5" />
                      Cambiar logo
                    </Button>
                    <p className="text-[11px] text-[var(--muted)]">
                      PNG, JPG o SVG. Recomendado: 256 × 256 px.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cambiar contraseña */}
              <div className="border-t border-[var(--border)] pt-5">
                <button
                  type="button"
                  onClick={() => setShowPasswordSection((v) => !v)}
                  className="flex w-full items-center justify-between cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-[var(--muted)]" />
                    <span className="text-[13.5px] font-semibold text-[var(--text)]">
                      Cambiar contraseña
                    </span>
                  </div>
                  {showPasswordSection ? (
                    <ChevronUp className="h-4 w-4 text-[var(--muted)] group-hover:text-[var(--text)] transition-colors" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-[var(--muted)] group-hover:text-[var(--text)] transition-colors" />
                  )}
                </button>

                {showPasswordSection && (
                  <div className="mt-4 space-y-3">
                    <FormField label="Contraseña actual">
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </FormField>
                    <FormField label="Nueva contraseña">
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </FormField>
                    <FormField label="Confirmar contraseña">
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        hasError={!!confirmPassword && confirmPassword !== newPassword}
                      />
                      {!!confirmPassword && confirmPassword !== newPassword && (
                        <p className="mt-1 text-[11.5px] text-rose-500">
                          Las contraseñas no coinciden.
                        </p>
                      )}
                    </FormField>
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={
                        !currentPassword ||
                        !newPassword ||
                        newPassword !== confirmPassword
                      }
                      onClick={onSave}
                    >
                      Actualizar contraseña
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─────────────── MARCA ─────────────── */}
          {activeTab === "brand" && (
            <div className="max-w-[640px] space-y-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted)] mb-3">
                Apariencia de presupuestos
              </p>

              <div className="divide-y divide-[var(--border)]">
                <div className="flex items-center justify-between py-4">
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

                <div className="flex items-center justify-between py-4">
                  <div>
                    <b className="text-[13px] font-semibold text-[var(--text)] block">
                      Notificar cuando el cliente abra
                    </b>
                    <p className="text-[11.5px] text-[var(--muted)] mt-0.5">
                      Genera el estado &quot;Visto&quot; y registra la última apertura.
                    </p>
                  </div>
                  <Switch checked={notifyOpen} onChange={setNotifyOpen} />
                </div>

                <div className="flex items-center justify-between py-4">
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
          )}

          {/* ─────────────── PRESUPUESTOS ─────────────── */}
          {activeTab === "quotes" && (
            <div className="max-w-[640px] space-y-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted)] mb-3">
                Valores por defecto
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
            </div>
          )}

          {/* ─────────────── FACTURACIÓN ─────────────── */}
          {activeTab === "billing" && (
            <div className="max-w-[640px] space-y-6">
              {/* Plan card */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted)] mb-3">
                  Plan actual
                </p>
                <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface2)] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="h-4 w-4 text-[var(--accent)]" />
                        <span className="text-[15px] font-semibold text-[var(--text)]">
                          Plan Starter
                        </span>
                        <span className="inline-flex items-center rounded-full bg-[var(--surface)] border border-[var(--border)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--muted)]">
                          Starter
                        </span>
                      </div>
                      <p className="text-[12.5px] text-[var(--muted)] mb-4">
                        Presupuestos ilimitados en borrador, hasta {planLimit} enviados por mes.
                      </p>

                      {/* Usage bar */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11.5px]">
                          <span className="text-[var(--muted)]">Presupuestos enviados este mes</span>
                          <span className="font-semibold text-[var(--text)]">
                            {planUsed} / {planLimit}
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--border)]">
                          <div
                            className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
                            style={{ width: `${planPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upgrade CTA */}
                  <div className="mt-5 pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-[12.5px] font-semibold text-[var(--text)]">
                        ¿Necesitás más?
                      </p>
                      <p className="text-[11.5px] text-[var(--muted)]">
                        Plan Pro: presupuestos ilimitados + PDF personalizado + múltiples usuarios.
                      </p>
                    </div>
                    <Button variant="primary" size="sm" className="shrink-0">
                      <Zap className="h-3.5 w-3.5" />
                      Mejorar plan
                    </Button>
                  </div>
                </div>
              </div>

              {/* Billing info placeholder */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted)] mb-3">
                  Información de facturación
                </p>
                <div className="rounded-[var(--radius-md)] border border-[var(--border)] p-5 flex items-center justify-between gap-4">
                  <p className="text-[13px] text-[var(--muted)]">
                    No hay método de pago registrado.
                  </p>
                  <Button variant="secondary" size="sm">
                    Agregar tarjeta
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
