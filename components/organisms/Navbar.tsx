"use client";

import React from "react";
import { Plus, Bell } from "lucide-react";
import { Button } from "../atoms/Button";
import { SearchBar } from "../molecules/SearchBar";

export interface NavbarProps {
  title?: string;
  onNewBudget?: () => void;
}

export function Navbar({ title = "Panel Principal", onNewBudget }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-200/80 bg-white/80 px-6 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <SearchBar className="hidden md:flex" placeholder="Buscar presupuestos o clientes..." />

        <button
          aria-label="Notificaciones"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-zinc-950" />
        </button>

        <Button size="sm" onClick={onNewBudget} className="shadow-blue-600/10">
          <Plus className="h-4 w-4" />
          <span>Nuevo Presupuesto</span>
        </Button>
      </div>
    </header>
  );
}
