import React from "react";
import { Modal } from "../atoms/Modal";
import { Button } from "../atoms/Button";

export interface DecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export function DecisionModal({
  isOpen,
  onClose,
  title,
  description,
}: DecisionModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
    >
      <div className="flex justify-end pt-3">
        <Button variant="primary" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </Modal>
  );
}
