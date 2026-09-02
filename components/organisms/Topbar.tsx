"use client";

import React from "react";
import { Menu, Plus, SunMoon } from "lucide-react";
import { Button } from "../atoms/Button";

export interface TopbarProps {
  activePageTitle: string;
  onOpenMobileMenu: () => void;
  onToggleTheme: () => void;
  onNewBudget: () => void;
}

export function Topbar({
  activePageTitle,
  onOpenMobileMenu,
  onToggleTheme,
  onNewBudget,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-[52px] items-center justify-between border-b border-[var(--border)] topbar-glass px-3 md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Abrir menú"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface2)] text-[var(--text)] md:hidden transition-transform hover:scale-105"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="flex min-w-0 items-center gap-1.5 text-[12.5px]">
          <span className="hidden text-[var(--muted)] sm:inline">QuoteFlow</span>
          <span className="hidden text-[var(--muted)] sm:inline">/</span>
          <b className="truncate font-semibold text-[var(--text)]">{activePageTitle}</b>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <button
          type="button"
          onClick={onToggleTheme}
          title="Cambiar tema (Claro / Oscuro)"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface2)] text-[var(--text)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--border)_65%,transparent)] transition-all hover:scale-105 cursor-pointer"
        >
          <SunMoon className="h-4 w-4" />
        </button>

        <Button size="sm" onClick={onNewBudget} aria-label="Nuevo presupuesto">
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Nuevo presupuesto</span>
        </Button>
      </div>
    </header>
  );
}
