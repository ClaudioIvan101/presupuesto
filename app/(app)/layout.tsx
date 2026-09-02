"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppProvider, useApp } from "@/lib/AppContext";
import { Sidebar } from "@/components/organisms/Sidebar";
import { Topbar } from "@/components/organisms/Topbar";
import { ClientModal } from "@/components/organisms/ClientModal";
import { DecisionModal } from "@/components/organisms/DecisionModal";
import { Toast } from "@/components/atoms/Toast";

const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/quotes": "Presupuestos",
    "/clients": "Clientes",
    "/builder": "Nuevo presupuesto",
    "/settings": "Configuración",
};

function AppLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const {
        toggleTheme,
        isClientModalOpen,
        setIsClientModalOpen,
        decisionModal,
        closeDecisionModal,
        toastMessage,
        isToastVisible,
        showToast,
    } = useApp();

    return (
        <div className="min-h-screen bg-[var(--bg2)] text-[var(--text)] font-sans">
            <Sidebar
                isOpenMobile={isMobileOpen}
                onCloseMobile={() => setIsMobileOpen(false)}
            />

            <div className="md:pl-[248px] flex min-h-screen flex-col min-w-0 w-full">
                <Topbar
                    activePageTitle={titles[pathname] || "QuoteFlow"}
                    onOpenMobileMenu={() => setIsMobileOpen(true)}
                    onToggleTheme={toggleTheme}
                    onNewBudget={() => router.push("/builder")}
                />

                <main className="flex-1 p-6 md:p-8 w-full max-w-[1480px] mx-auto">
                    {children}
                </main>
            </div>

            <ClientModal
                isOpen={isClientModalOpen}
                onClose={() => setIsClientModalOpen(false)}
                onSave={() => showToast("Cliente guardado")}
            />

            <DecisionModal
                isOpen={decisionModal.isOpen}
                onClose={closeDecisionModal}
                title={decisionModal.title}
                description={decisionModal.description}
            />

            <Toast message={toastMessage} isVisible={isToastVisible} />
        </div>
    );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppProvider>
            <AppLayoutContent>{children}</AppLayoutContent>
        </AppProvider>
    );
}
