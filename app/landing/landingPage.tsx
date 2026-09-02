import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { ReceiptText, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";

export default function Landing() {
    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
            {/* Header */}
            <header className="flex h-20 items-center justify-between border-b border-zinc-200/80 bg-white/70 px-6 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/70 sm:px-12">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/25">
                        <ReceiptText className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        QuoteFlow
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="sm">
                            Iniciar Sesión
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button variant="primary" size="sm">
                            Registrarse
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center sm:px-12">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-300 mb-8 shadow-sm">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Gestión de presupuestos inteligente</span>
                </div>

                <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl sm:leading-[1.15]">
                    Crea y envía presupuestos profesionales en{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        minutos
                    </span>
                </h1>

                <p className="mt-6 max-w-xl text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
                    Gestiona cotizaciones, clientes y seguimiento de estados desde una sola plataforma ágil y moderna.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Link href="/dashboard">
                        <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-blue-600/25">
                            <span>Ingresar al Panel</span>
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                            Ver Demo
                        </Button>
                    </Link>
                </div>

                {/* Feature Highlights (Cards Atom/Molecule) */}
                <div className="mt-20 grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3 text-left">
                    <Card hoverEffect className="space-y-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                            <Zap className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Rápido y Fácil</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Arma ítems, impuestos y descuentos en pocos clics sin fricción.
                        </p>
                    </Card>

                    <Card hoverEffect className="space-y-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Control Total</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Sigue el estado de tus cotizaciones: borrador, enviado, aprobado o vencido.
                        </p>
                    </Card>

                    <Card hoverEffect className="space-y-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
                            <ReceiptText className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Exportación PDF</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Entrega presupuestos con estética profesional listos para compartir con tus clientes.
                        </p>
                    </Card>
                </div>
            </main>
        </div>
    );
}