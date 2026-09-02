"use client";

import { useRouter } from "next/navigation";
import { QuotesView } from "@/components/organisms/QuotesView";
import { useApp } from "@/lib/AppContext";

export default function QuotesPage() {
    const router = useRouter();
    const { setBuilderState } = useApp();

    return (
        <QuotesView
            onNavigate={(page) => router.push(`/${page}`)}
            onSelectQuote={(q) => {
                setBuilderState((prev) => ({
                    ...prev,
                    project: q.title,
                    client: q.client,
                    total: q.total,
                    currency: q.currency,
                    model: q.model,
                }));
                router.push("/quote");
            }}
        />
    );
}
