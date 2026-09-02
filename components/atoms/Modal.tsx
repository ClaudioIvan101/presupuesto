"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "max-w-[520px]",
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/35 backdrop-blur-[7px] animate-fadeIn"
      onClick={onClose}
    >
      <div
        className={cn(
          "w-full rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6.5 shadow-[var(--shadow)] page-transition",
          maxWidth
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[21px] font-semibold tracking-[-0.02em] text-[var(--text)]">
          {title}
        </h2>
        {description && (
          <p className="mt-1.5 mb-4.5 text-[13px] text-[var(--muted)]">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
