import React from "react";
import { Modal } from "../atoms/Modal";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { Textarea } from "../atoms/Textarea";
import { FormField } from "../molecules/FormField";

import { ClientItem } from "@/types";

export interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (clientData: Partial<ClientItem>) => void;
}

export function ClientModal({ isOpen, onClose, onSave }: ClientModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nuevo cliente"
      description="Guardá solo los datos que vas a reutilizar al crear presupuestos."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="sm:col-span-2">
            <FormField label="Nombre / empresa">
              <Input placeholder="Ej. Acme Studio" required />
            </FormField>
          </div>

          <FormField label="Email">
            <Input type="email" placeholder="cliente@empresa.com" required />
          </FormField>

          <FormField label="Teléfono">
            <Input placeholder="+54 ..." />
          </FormField>

          <div className="sm:col-span-2">
            <FormField label="Notas">
              <Textarea
                rows={3}
                placeholder="Contexto útil para futuras propuestas"
              />
            </FormField>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Guardar cliente
          </Button>
        </div>
      </form>
    </Modal>
  );
}
