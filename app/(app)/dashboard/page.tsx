"use client";

import { useRouter } from "next/navigation";
import { DashboardView } from "@/components/organisms/DashboardView";
import { useApp } from "@/lib/AppContext";

export default function DashboardPage() {
  const router = useRouter();
  const { showToast } = useApp();

  return (
    <DashboardView
      onNavigate={(page) => router.push(`/${page}`)}
      onToast={showToast}
    />
  );
}
