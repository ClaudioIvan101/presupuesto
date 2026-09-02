import React from "react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { Select } from "../atoms/Select";
import { Textarea } from "../atoms/Textarea";
import { Card } from "../atoms/Card";
import { FormField } from "../molecules/FormField";
import { StepButton } from "../molecules/StepButton";
import { ChoiceCard } from "../molecules/ChoiceCard";
import { LineItem } from "../molecules/LineItem";
import { PaperPreview } from "./PaperPreview";
import { BuilderState, QuoteModel } from "@/types";
import { Copy } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export interface BuilderViewProps {
  state: BuilderState;
  setState: React.Dispatch<React.SetStateAction<BuilderState>>;
  onNavigate: (page: string) => void;
  onToast: (msg: string) => void;
}

const steps = [
  { step: 1, title: "Proyecto", subtitle: "Cliente y contexto" },
  { step: 2, title: "Alcance", subtitle: "Qué vas a construir" },
  { step: 3, title: "Entregables", subtitle: "Resultados concretos" },
  { step: 4, title: "Precio", subtitle: "Cómo vas a cobrar" },
  { step: 5, title: "Condiciones", subtitle: "Plazos y pagos" },
  { step: 6, title: "Preview", subtitle: "Revisar y enviar" },
];

export function BuilderView({
  state,
  setState,
  onNavigate,
  onToast,
}: BuilderViewProps) {
  const currentStep = state.step;

  const handleNext = () => {
    if (currentStep < 6) {
      setState((prev) => ({ ...prev, step: prev.step + 1 }));
    } else {
      onToast("Link enviado al cliente");
      onNavigate("public");
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setState((prev) => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const handleDeliverableChange = (index: number, val: string) => {
    const updated = [...state.deliverables];
    updated[index] = val;
    setState((prev) => ({ ...prev, deliverables: updated }));
  };

  const handleRemoveDeliverable = (index: number) => {
    const updated = state.deliverables.filter((_, i) => i !== index);
    setState((prev) => ({ ...prev, deliverables: updated }));
  };

  const handleAddDeliverable = () => {
    setState((prev) => ({
      ...prev,
      deliverables: [...prev.deliverables, "Nuevo entregable"],
    }));
  };

  const setModel = (model: QuoteModel) => {
    setState((prev) => ({ ...prev, model }));
  };

  const renderPricingFields = () => {
    if (state.model === "hour") {
      return (
        <Card className="p-5 mt-4 space-y-4">
          <h3 className="text-[14px] font-semibold text-[var(--text)]">Tarifa por hora</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <FormField label="Tarifa">
              <Input
                type="number"
                defaultValue={38000}
                onChange={(e) => setState((prev) => ({ ...prev, total: +e.target.value * 26 }))}
              />
            </FormField>
            <FormField label="Horas estimadas">
              <Input type="number" defaultValue={26} />
            </FormField>
            <FormField label="Moneda">
              <Select
                value={state.currency}
                onChange={(e) => setState((prev) => ({ ...prev, currency: e.target.value as BuilderState["currency"] }))}
              >
                <option value="ARS">ARS</option>
                <option value="USD">USD</option>
              </Select>
            </FormField>
            <FormField label="Total estimado">
              <Input readOnly value={formatCurrency(state.total, state.currency)} />
            </FormField>
          </div>
        </Card>
      );
    }

    if (state.model === "feature") {
      return (
        <Card className="p-5 mt-4 space-y-4">
          <h3 className="text-[14px] font-semibold text-[var(--text)]">Features / entregables cotizados</h3>
          <div className="space-y-3 divide-y divide-[var(--border)]">
            <div className="grid grid-cols-[1.8fr_0.8fr_0.65fr_0.8fr] gap-2 pt-2">
              <FormField label="Feature"><Input defaultValue="Diseño + estructura web" /></FormField>
              <FormField label="Cantidad"><Input defaultValue="1" /></FormField>
              <FormField label="Unidad"><Input defaultValue="feature" /></FormField>
              <FormField label="Precio"><Input defaultValue="280000" /></FormField>
            </div>
            <div className="grid grid-cols-[1.8fr_0.8fr_0.65fr_0.8fr] gap-2 pt-2">
              <FormField label="Feature"><Input defaultValue="Agenda de clases" /></FormField>
              <FormField label="Cantidad"><Input defaultValue="1" /></FormField>
              <FormField label="Unidad"><Input defaultValue="feature" /></FormField>
              <FormField label="Precio"><Input defaultValue="320000" /></FormField>
            </div>
            <div className="grid grid-cols-[1.8fr_0.8fr_0.65fr_0.8fr] gap-2 pt-2">
              <FormField label="Feature"><Input defaultValue="WhatsApp + formulario" /></FormField>
              <FormField label="Cantidad"><Input defaultValue="1" /></FormField>
              <FormField label="Unidad"><Input defaultValue="feature" /></FormField>
              <FormField label="Precio"><Input defaultValue="180000" /></FormField>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
            <Button variant="secondary" size="sm" onClick={() => onToast("Feature agregada")}>
              + Agregar feature
            </Button>
            <div className="text-right">
              <span className="text-[11.5px] text-[var(--muted)] block">Total</span>
              <b className="text-[20px] font-bold text-[var(--text)]">
                {formatCurrency(state.total, state.currency)}
              </b>
            </div>
          </div>
        </Card>
      );
    }

    if (state.model === "fixed") {
      return (
        <Card className="p-5 mt-4 space-y-4">
          <h3 className="text-[14px] font-semibold text-[var(--text)]">Precio cerrado</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <FormField label="Precio total">
              <Input
                type="number"
                value={state.total}
                onChange={(e) => setState((prev) => ({ ...prev, total: +e.target.value || 0 }))}
              />
            </FormField>
            <FormField label="Moneda">
              <Select
                value={state.currency}
                onChange={(e) => setState((prev) => ({ ...prev, currency: e.target.value as BuilderState["currency"] }))}
              >
                <option value="ARS">ARS</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </Select>
            </FormField>
            <div className="sm:col-span-2">
              <FormField label="Descripción del precio">
                <Input defaultValue="Precio fijo por el alcance detallado en esta propuesta" />
              </FormField>
            </div>
          </div>
        </Card>
      );
    }

    if (state.model === "implementation") {
      return (
        <Card className="p-5 mt-4 space-y-4">
          <h3 className="text-[14px] font-semibold text-[var(--text)]">Implementación / setup</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <FormField label="Fee de implementación">
              <Input
                type="number"
                value={state.total}
                onChange={(e) => setState((prev) => ({ ...prev, total: +e.target.value || 0 }))}
              />
            </FormField>
            <FormField label="Incluye">
              <Input defaultValue="Setup, configuración y puesta en marcha" />
            </FormField>
            <div className="sm:col-span-2">
              <FormField label="Costo recurrente posterior (opcional)">
                <Input placeholder="Ej. USD 120 / mes" />
              </FormField>
            </div>
          </div>
        </Card>
      );
    }

    if (state.model === "retainer") {
      return (
        <Card className="p-5 mt-4 space-y-4">
          <h3 className="text-[14px] font-semibold text-[var(--text)]">Abono mensual</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <FormField label="Precio mensual">
              <Input
                type="number"
                value={state.total}
                onChange={(e) => setState((prev) => ({ ...prev, total: +e.target.value || 0 }))}
              />
            </FormField>
            <FormField label="Capacidad incluida">
              <Input defaultValue="20 horas / mes" />
            </FormField>
            <FormField label="Duración mínima">
              <Select defaultValue="3 meses">
                <option>3 meses</option>
                <option>1 mes</option>
                <option>6 meses</option>
              </Select>
            </FormField>
            <FormField label="Excedente">
              <Input defaultValue="$45.000 / hora" />
            </FormField>
          </div>
        </Card>
      );
    }

    return (
      <Card className="p-5 mt-4 space-y-4">
        <h3 className="text-[14px] font-semibold text-[var(--text)]">Modelo personalizado</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <FormField label="Nombre de la unidad">
            <Input defaultValue="Sprint" />
          </FormField>
          <FormField label="Cantidad">
            <Input defaultValue="4" />
          </FormField>
          <FormField label="Precio por unidad">
            <Input defaultValue="245000" />
          </FormField>
          <FormField label="Total">
            <Input readOnly value={formatCurrency(state.total, state.currency)} />
          </FormField>
        </div>
      </Card>
    );
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[250px_minmax(0,1fr)_390px] min-h-[calc(100vh-52px)] -m-6 md:-m-8">
      {/* Step Navigation Sidebar */}
      <aside className="border-r border-[var(--border)] bg-[var(--surface)] p-6 pt-7 space-y-2">
        <div className="px-2.5 pb-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted)]">
          Crear presupuesto
        </div>
        <div className="space-y-1">
          {steps.map((s) => (
            <StepButton
              key={s.step}
              stepNumber={s.step}
              title={s.title}
              subtitle={s.subtitle}
              isActive={s.step === currentStep}
              isDone={s.step < currentStep}
              onClick={() => setState((prev) => ({ ...prev, step: s.step }))}
            />
          ))}
        </div>
      </aside>

      {/* Main Step Content */}
      <div className="flex-1 bg-[var(--bg2)] p-6 sm:p-9 overflow-y-auto">
        <div className="max-w-[720px] mx-auto space-y-6 page-transition">
          {/* STEP 1: Proyecto */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <h1 className="text-[30px] font-semibold tracking-[-0.025em] text-[var(--text)]">
                  Información del proyecto
                </h1>
                <p className="mt-1.5 text-[14px] text-[var(--muted)] leading-relaxed">
                  Empezá por lo básico. Esto alimenta el encabezado del presupuesto y el link público.
                </p>
              </div>

              <Card className="p-6 space-y-4">
                <h3 className="text-[14px] font-semibold text-[var(--text)]">Cliente</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="sm:col-span-2">
                    <FormField label="Cliente existente">
                      <Select
                        value={state.client}
                        onChange={(e) => setState((prev) => ({ ...prev, client: e.target.value }))}
                      >
                        <option>Gimnasio Norte</option>
                        <option>Martina B.</option>
                        <option>Nova Studio</option>
                        <option>+ Crear nuevo cliente</option>
                      </Select>
                    </FormField>
                  </div>

                  <div className="sm:col-span-2">
                    <FormField label="Nombre del proyecto">
                      <Input
                        value={state.project}
                        onChange={(e) => setState((prev) => ({ ...prev, project: e.target.value }))}
                      />
                    </FormField>
                  </div>

                  <FormField label="Moneda">
                    <Select
                      value={state.currency}
                      onChange={(e) => setState((prev) => ({ ...prev, currency: e.target.value as BuilderState["currency"] }))}
                    >
                      <option value="ARS">ARS</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </Select>
                  </FormField>

                  <FormField label="Validez de la propuesta">
                    <Select
                      value={state.validity}
                      onChange={(e) => setState((prev) => ({ ...prev, validity: e.target.value }))}
                    >
                      <option>15 días</option>
                      <option>7 días</option>
                      <option>30 días</option>
                    </Select>
                  </FormField>
                </div>
              </Card>

              {/* AI Card */}
              <div className="flex items-center justify-between gap-3.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface2)] p-4.5">
                <div>
                  <b className="text-[13px] font-semibold text-[var(--text)] block">
                    Generación con IA
                  </b>
                  <p className="text-[11.5px] text-[var(--muted)] mt-0.5">
                    Después del MVP: describís el proyecto y QuoteFlow propone alcance, entregables, tiempo, servicios y precio.
                  </p>
                </div>
                <span className="rounded-full bg-[var(--surface)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--muted)] shadow-sm shrink-0">
                  Próximamente ✦
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: Alcance */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <h1 className="text-[30px] font-semibold tracking-[-0.025em] text-[var(--text)]">
                  Definí el alcance
                </h1>
                <p className="mt-1.5 text-[14px] text-[var(--muted)] leading-relaxed">
                  Explicá con claridad qué problema resolvés y hasta dónde llega el trabajo. Evitá una lista técnica interminable.
                </p>
              </div>

              <Card className="p-6">
                <FormField
                  label="Resumen del alcance"
                  helperText="Este texto será visible para el cliente."
                >
                  <Textarea
                    rows={6}
                    value={state.scope}
                    onChange={(e) => setState((prev) => ({ ...prev, scope: e.target.value }))}
                  />
                </FormField>
              </Card>

              <Card className="p-6 space-y-3">
                <h3 className="text-[14px] font-semibold text-[var(--text)]">Fuera de alcance</h3>
                <FormField label="Exclusiones">
                  <Textarea
                    rows={3}
                    defaultValue="Producción de fotografía/video, redacción integral de contenidos y sistemas internos de gestión de socios."
                  />
                </FormField>
              </Card>
            </div>
          )}

          {/* STEP 3: Entregables */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <h1 className="text-[30px] font-semibold tracking-[-0.025em] text-[var(--text)]">
                  Entregables
                </h1>
                <p className="mt-1.5 text-[14px] text-[var(--muted)] leading-relaxed">
                  Convertí el alcance en resultados concretos. El cliente debería poder entender exactamente qué recibe.
                </p>
              </div>

              <Card className="p-6 space-y-4">
                <h3 className="text-[14px] font-semibold text-[var(--text)]">Entregables incluidos</h3>
                <div className="space-y-1">
                  {state.deliverables.map((item, idx) => (
                    <LineItem
                      key={idx}
                      label={`Entregable ${idx + 1}`}
                      value={item}
                      onChange={(v) => handleDeliverableChange(idx, v)}
                      onRemove={() => handleRemoveDeliverable(idx)}
                      canRemove={state.deliverables.length > 1}
                    />
                  ))}
                </div>

                <Button variant="secondary" size="sm" onClick={handleAddDeliverable}>
                  + Agregar entregable
                </Button>
              </Card>
            </div>
          )}

          {/* STEP 4: Precio */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <h1 className="text-[30px] font-semibold tracking-[-0.025em] text-[var(--text)]">
                  ¿Cómo cobrás este proyecto?
                </h1>
                <p className="mt-1.5 text-[14px] text-[var(--muted)] leading-relaxed">
                  Elegí la forma de cotización que mejor represente tu trabajo. QuoteFlow cambia los campos según el modelo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <ChoiceCard
                  title="Por hora"
                  description="Tarifa × horas estimadas. Ideal para soporte, consultoría o alcance variable."
                  isSelected={state.model === "hour"}
                  onClick={() => setModel("hour")}
                />
                <ChoiceCard
                  title="Por feature / entregable"
                  description="Cotizá cada funcionalidad o bloque del proyecto por separado."
                  isSelected={state.model === "feature"}
                  onClick={() => setModel("feature")}
                />
                <ChoiceCard
                  title="Precio fijo"
                  description="Un único precio cerrado por todo el alcance acordado."
                  isSelected={state.model === "fixed"}
                  onClick={() => setModel("fixed")}
                />
                <ChoiceCard
                  title="Implementación / setup"
                  description="Fee inicial por configuración, integración, onboarding o puesta en marcha."
                  isSelected={state.model === "implementation"}
                  onClick={() => setModel("implementation")}
                />
                <ChoiceCard
                  title="Abono mensual"
                  description="Precio recurrente por una capacidad o servicio continuo."
                  isSelected={state.model === "retainer"}
                  onClick={() => setModel("retainer")}
                />
                <ChoiceCard
                  title="Personalizado"
                  description="Definí una unidad propia: sprint, módulo, jornada, paquete u otra."
                  isSelected={state.model === "custom"}
                  onClick={() => setModel("custom")}
                />
              </div>

              {renderPricingFields()}
            </div>
          )}

          {/* STEP 5: Condiciones */}
          {currentStep === 5 && (
            <div className="space-y-5">
              <div>
                <h1 className="text-[30px] font-semibold tracking-[-0.025em] text-[var(--text)]">
                  Condiciones
                </h1>
                <p className="mt-1.5 text-[14px] text-[var(--muted)] leading-relaxed">
                  Definí tiempos, forma de pago y reglas básicas para evitar conversaciones ambiguas después.
                </p>
              </div>

              <Card className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <FormField label="Tiempo estimado">
                    <Input
                      value={state.time}
                      onChange={(e) => setState((prev) => ({ ...prev, time: e.target.value }))}
                    />
                  </FormField>

                  <FormField label="Inicio estimado">
                    <Select defaultValue="Al recibir anticipo">
                      <option>Al recibir anticipo</option>
                      <option>Fecha acordada</option>
                      <option>Inmediato</option>
                    </Select>
                  </FormField>

                  <FormField label="Forma de pago">
                    <Select defaultValue="50% al iniciar · 50% contra entrega">
                      <option>50% al iniciar · 50% contra entrega</option>
                      <option>100% al iniciar</option>
                      <option>30% / 40% / 30%</option>
                      <option>Mensual</option>
                    </Select>
                  </FormField>

                  <FormField label="Revisiones incluidas">
                    <Select defaultValue="2 rondas">
                      <option>2 rondas</option>
                      <option>1 ronda</option>
                      <option>3 rondas</option>
                      <option>Sin límite definido</option>
                    </Select>
                  </FormField>

                  <div className="sm:col-span-2">
                    <FormField label="Condiciones adicionales">
                      <Textarea
                        rows={3}
                        defaultValue="La propuesta tiene una validez de 15 días. Cambios que excedan el alcance se cotizan por separado. El proyecto comienza una vez acreditado el anticipo."
                      />
                    </FormField>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* STEP 6: Preview / Enviar */}
          {currentStep === 6 && (
            <div className="space-y-5">
              <div>
                <h1 className="text-[30px] font-semibold tracking-[-0.025em] text-[var(--text)]">
                  Listo para enviar
                </h1>
                <p className="mt-1.5 text-[14px] text-[var(--muted)] leading-relaxed">
                  Revisá el presupuesto, copiá el link público o descargá una versión en PDF.
                </p>
              </div>

              <Card className="p-6 space-y-4">
                <h3 className="text-[14px] font-semibold text-[var(--text)]">Resumen</h3>
                <div className="divide-y divide-[var(--border)]">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <b className="text-[13.5px] font-semibold text-[var(--text)] block">
                        {state.project}
                      </b>
                      <span className="text-[12px] text-[var(--muted)]">{state.client}</span>
                    </div>
                    <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-[11.5px] font-medium">
                      Borrador
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <b className="text-[13.5px] font-semibold text-[var(--text)] block">
                        Modelo de cobro
                      </b>
                      <span className="text-[12px] text-[var(--muted)]">
                        {state.model === "feature"
                          ? "Por feature / entregable"
                          : state.model === "hour"
                          ? "Por hora"
                          : state.model === "fixed"
                          ? "Precio fijo"
                          : state.model === "implementation"
                          ? "Implementación"
                          : "Abono mensual"}
                      </span>
                    </div>
                    <b className="text-[15px] font-bold text-[var(--text)]">
                      {formatCurrency(state.total, state.currency)}
                    </b>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <b className="text-[13.5px] font-semibold text-[var(--text)] block">
                        Link público
                      </b>
                      <span className="text-[12px] text-[var(--muted)] font-mono">
                        quoteflow.app/q/QF-0028
                      </span>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard?.writeText("quoteflow.app/q/QF-0028");
                        onToast("Link copiado");
                      }}
                    >
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      <span>Copiar link</span>
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-3">
                <h3 className="text-[14px] font-semibold text-[var(--text)]">Antes de enviar</h3>
                <label className="flex items-start gap-2.5 text-[13px] text-[var(--text)] cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="mt-1 accent-[var(--accent)]" />
                  <span>Notificarme cuando el cliente abra el presupuesto.</span>
                </label>
                <label className="flex items-start gap-2.5 text-[13px] text-[var(--text)] cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="mt-1 accent-[var(--accent)]" />
                  <span>Permitir que el cliente acepte o rechace desde el link.</span>
                </label>
              </Card>
            </div>
          )}

          {/* Builder Footer Buttons */}
          <div className="flex items-center justify-between gap-2.5 pt-4 pb-6 border-t border-[var(--border)]">
            <Button
              variant="secondary"
              onClick={handlePrev}
              className={currentStep === 1 ? "invisible" : ""}
            >
              ← Atrás
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={() => onToast("Borrador guardado")}>
                Guardar borrador
              </Button>
              <Button variant="primary" onClick={handleNext}>
                {currentStep === 6 ? "Enviar link →" : "Continuar →"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Paper Preview Panel */}
      <PaperPreview state={state} />
    </div>
  );
}
