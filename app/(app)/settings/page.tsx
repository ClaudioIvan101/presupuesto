"use client";

import { SettingsView } from "@/components/organisms/SettingsView";
import { useApp } from "@/lib/AppContext";

export default function SettingsPage() {
    const { showToast } = useApp();
    return (
        <SettingsView
            onSave={() => showToast("Configuración guardada")}
        />
    );
}