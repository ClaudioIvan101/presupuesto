"use client";

import { useRouter } from "next/navigation";
import { BuilderView } from "@/components/organisms/BuilderView";
import { useApp } from "@/lib/AppContext";

export default function BuilderPage() {
    const router = useRouter();
    const { builderState, setBuilderState, showToast } = useApp();

    return (
        <BuilderView
            state={builderState}
            setState={setBuilderState}
            onNavigate={(page) => router.push(`/${page}`)}
            onToast={showToast}
        />
    );
}
