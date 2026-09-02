"use client";

import React, { useState } from "react";
import { PublicQuoteView } from "@/components/organisms/PublicQuoteView";
import { DecisionModal } from "@/components/organisms/DecisionModal";
import { Toast } from "@/components/atoms/Toast";
import { BuilderState } from "@/types";

const defaultState: BuilderState = {
  step: 1,
  model: "feature",
  project: "Nueva plataforma web",
  client: "Gimnasio Norte",
  scope: "Diseño y desarrollo de una web para presentar el gimnasio, clases, horarios y facilitar el contacto por WhatsApp.",
  deliverables: [
    "Diseño responsive",
    "Agenda de clases y horarios",
    "Integración con WhatsApp",
    "Formulario de contacto",
  ],
  total: 980000,
  currency: "ARS",
  time: "3–4 semanas",
  validity: "15 días",
};

export default function PublicPage() {
  const [modal, setModal] = useState({ isOpen: false, title: "", description: "" });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 1900);
  };

  return (
    <div className="min-h-screen bg-[var(--bg2)] text-[var(--text)] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <PublicQuoteView
          state={defaultState}
          onAccept={() =>
            setModal({
              isOpen: true,
              title: "Propuesta aceptada",
              description: "El cliente aceptó la propuesta. El estado cambió a “Aceptado ✓”.",
            })
          }
          onReject={() =>
            setModal({
              isOpen: true,
              title: "Respuesta del cliente",
              description: "En el producto real, acá el cliente puede rechazar y dejar un comentario breve.",
            })
          }
          onToast={showToast}
        />
      </div>

      <DecisionModal
        isOpen={modal.isOpen}
        onClose={() => setModal((prev) => ({ ...prev, isOpen: false }))}
        title={modal.title}
        description={modal.description}
      />
      <Toast message={toastMessage} isVisible={isToastVisible} />
    </div>
  );
}
