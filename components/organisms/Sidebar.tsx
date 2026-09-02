"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  PlusCircle,
  Eye,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../atoms";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/AppContext";

export interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}


export function Sidebar({ isOpenMobile, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { resetProfile } = useApp();

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    resetProfile();
    router.push("/landing");
  };

  const workspaceNav = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/quotes", label: "Presupuestos", icon: FileText },
    { href: "/clients", label: "Clientes", icon: Users },
    { href: "/builder", label: "Nuevo presupuesto", icon: PlusCircle },
  ];

  const systemNav = [
    { href: "/quote", label: "Vista cliente", icon: Eye },
    { href: "/settings", label: "Configuración", icon: Settings },
  ];

  return (
    <>
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col sidebar-glass p-4 transition-transform duration-200 ease-out",
          "md:translate-x-0",
          isOpenMobile ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center gap-2.5 px-2.5 pb-6 pt-1 font-semibold text-[17px] tracking-[-0.015em] text-[var(--text)]">
          <div className="flex h-7.5 w-7.5 items-center justify-center rounded-[9px] bg-[var(--accent)] text-[14px] font-bold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16),0_3px_9px_rgba(0,113,227,0.18)]">
            Q
          </div>
          <span>QuoteFlow</span>
        </div>

        <div className="px-2.5 pb-2 text-[10.5px] font-semibold uppercase tracking-[0.055em] text-[var(--muted)]">
          Workspace
        </div>
        <nav className="flex flex-col gap-[3px]">
          {workspaceNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center gap-2.5 rounded-[10px] px-3 py-2 text-[13.5px] font-medium transition-all duration-180 select-none text-left",
                  isActive
                    ? "bg-[var(--surface2)] text-[var(--text)] font-semibold shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--border)_55%,transparent)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface2)] hover:text-[var(--text)]"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-[var(--accent)]" : "text-[var(--muted)]")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-5.5 px-2.5 pb-2 text-[10.5px] font-semibold uppercase tracking-[0.055em] text-[var(--muted)]">
          Sistema
        </div>
        <nav className="flex flex-col gap-[3px]">
          {systemNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center gap-2.5 rounded-[10px] px-3 py-2 text-[13.5px] font-medium transition-all duration-180 select-none text-left",
                  isActive
                    ? "bg-[var(--surface2)] text-[var(--text)] font-semibold shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--border)_55%,transparent)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface2)] hover:text-[var(--text)]"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-[var(--accent)]" : "text-[var(--muted)]")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-2.5 pt-4">
          <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-3.5 shadow-sm">
            <b className="text-[13px] font-semibold text-[var(--text)]">Plan Starter</b>
            <p className="mt-1 mb-2.5 text-[11.5px] text-[var(--muted)] leading-tight">
              7 de 20 presupuestos este mes
            </p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface3)]">
              <div className="h-full w-[35%] rounded-full bg-[var(--accent)]" />
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-[var(--radius-md)] p-2 hover:bg-[var(--surface2)] transition-colors">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface2)] text-[12px] font-semibold text-[var(--text)]">
              CG
            </div>
            <div className="min-w-0 flex-1">
              <b className="block text-[13px] font-semibold text-[var(--text)] truncate">
                Claudio Gómez
              </b>
              <span className="block text-[11.5px] text-[var(--muted)] truncate">
                claudio@quoteflow.dev
              </span>
              <Button size="sm" variant="ghost" onClick={() => {
                handleSignOut()
              }}>
                <LogOut className="h-4 w-4" />
                <span>Cerrar sesión</span>
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
