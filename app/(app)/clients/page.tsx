"use client";

import { ClientsView } from "@/components/organisms/ClientsView";
import { useApp } from "@/lib/AppContext";

export default function ClientsPage() {
    const { setIsClientModalOpen } = useApp();

    return (
        <ClientsView
            onOpenNewClientModal={() => setIsClientModalOpen(true)}
        />
    );
}
