"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, ImagePlus, SunMoon, Upload } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { ChoiceCard } from "@/components/molecules/ChoiceCard";
import { FormField } from "@/components/molecules/FormField";
import { useApp } from "@/lib/AppContext";
import { cn } from "@/lib/utils";
import type {
  CompanyType,
  ProfileCurrency,
  ReferralSource,
  UserProfile,
} from "@/types";

type OnboardingForm = Omit<UserProfile, "onboardingComplete">;
type FormErrorKey = "name" | "email" | "companyType" | "referralSource";
type FormErrors = Partial<Record<FormErrorKey, string>>;

const companyOptions: Array<{
  value: CompanyType;
  title: string;
  description: string;
}> = [
  {
    value: "landing",
    title: "Landing",
    description: "Sitios y páginas de presentación.",
  },
  {
    value: "software",
    title: "Software",
    description: "Productos digitales y aplicaciones.",
  },
  {
    value: "other",
    title: "Otro",
    description: "Un servicio o negocio diferente.",
  },
];

const referralOptions: Array<{ value: ReferralSource; label: string }> = [
  { value: "google", label: "Google" },
  { value: "social", label: "Redes sociales" },
  { value: "recommendation", label: "Recomendación" },
  { value: "community", label: "Comunidad / evento" },
  { value: "other", label: "Otro" },
];

const currencyOptions: Array<{ value: ProfileCurrency; label: string }> = [
  { value: "USD", label: "USD — Dólar estadounidense" },
  { value: "ARS", label: "ARS — Peso argentino" },
  { value: "EUR", label: "EUR — Euro" },
  { value: "MXN", label: "MXN — Peso mexicano" },
];

const countryOptions = ["Argentina", "México", "España", "Chile", "Colombia"];

export function OnboardingView() {
  const router = useRouter();
  const { profile, completeOnboarding, theme, toggleTheme } = useApp();
  const [form, setForm] = useState<OnboardingForm>(() => ({
    name: profile.name,
    email: profile.email,
    logo: profile.logo,
    currency: profile.currency,
    country: profile.country,
    companyType: profile.companyType,
    referralSource: profile.referralSource,
  }));
  const [errors, setErrors] = useState<FormErrors>({});
  const [logoError, setLogoError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = <K extends keyof OnboardingForm>(
    field: K,
    value: OnboardingForm[K]
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (field in errors) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleLogo = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setLogoError("Elegí un archivo de imagen.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      updateField("logo", { name: file.name, previewUrl: reader.result });
      setLogoError(null);
    };
    reader.onerror = () => setLogoError("No pudimos leer ese archivo.");
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

    if (!form.name.trim()) nextErrors.name = "Ingresá el nombre de tu empresa.";
    if (!emailIsValid) nextErrors.email = "Ingresá un email válido.";
    if (!form.companyType) nextErrors.companyType = "Elegí una opción para continuar.";
    if (!form.referralSource) nextErrors.referralSource = "Elegí una opción para continuar.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    completeOnboarding({
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
    });
    router.replace("/dashboard");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[var(--bg2)] px-4 py-8 text-[var(--text)] sm:px-6">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Cambiar a tema ${theme === "light" ? "oscuro" : "claro"}`}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--text)] shadow-[var(--shadow-soft)] transition-transform hover:scale-105 sm:right-6 sm:top-6"
      >
        <SunMoon className="h-4 w-4" />
      </button>

      <Card className="w-full max-w-[540px] p-6 sm:p-8">
        <div className="mb-7">
          <p className="text-[12px] font-semibold tracking-[0.04em] text-[var(--accent)]">
            PASO ÚNICO
          </p>
          <h1 className="mt-2 text-[26px] font-semibold tracking-[-0.025em] text-[var(--text)]">
            Configura tu perfil
          </h1>
          <p className="mt-1.5 max-w-[430px] text-[13.5px] leading-relaxed text-[var(--muted)]">
            Esto se va a usar automáticamente en todos tus presupuestos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Nombre / empresa" htmlFor="profile-name" error={errors.name}>
              <Input
                id="profile-name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Ej. Claudio Dev"
                hasError={Boolean(errors.name)}
                autoComplete="organization"
              />
            </FormField>

            <FormField label="Email" htmlFor="profile-email" error={errors.email}>
              <Input
                id="profile-email"
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="contacto@tuempresa.com"
                hasError={Boolean(errors.email)}
                autoComplete="email"
              />
            </FormField>
          </div>

          <FormField
            label="Logo (opcional)"
            error={logoError ?? undefined}
            helperText={logoError ? undefined : "Podés subirlo ahora o agregarlo después."}
          >
            <label
              htmlFor="profile-logo"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                handleLogo(event.dataTransfer.files[0]);
              }}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-[var(--radius-md)] border border-dashed border-[var(--border-strong)] bg-[var(--surface2)] p-4 transition-colors",
                "hover:border-[var(--accent)] hover:bg-[var(--surface)]",
                logoError && "border-rose-500"
              )}
            >
              {form.logo ? (
                <Image
                  src={form.logo.previewUrl}
                  alt=""
                  width={48}
                  height={48}
                  unoptimized
                  className="h-12 w-12 rounded-[var(--radius-sm)] object-cover"
                />
              ) : (
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-[var(--surface)] text-[var(--accent)] shadow-sm">
                  <ImagePlus className="h-5 w-5" />
                </span>
              )}
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-medium text-[var(--text)]">
                  {form.logo?.name ?? "Subí tu logo"}
                </span>
                <span className="mt-0.5 flex items-center gap-1 text-[11.5px] text-[var(--muted)]">
                  <Upload className="h-3.5 w-3.5" />
                  Elegí una imagen o arrastrala acá
                </span>
              </span>
              <input
                id="profile-logo"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(event) => handleLogo(event.target.files?.[0])}
              />
            </label>
          </FormField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Moneda predeterminada" htmlFor="profile-currency">
              <Select
                id="profile-currency"
                value={form.currency}
                onChange={(event) =>
                  updateField("currency", event.target.value as ProfileCurrency)
                }
              >
                {currencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField label="País" htmlFor="profile-country">
              <Select
                id="profile-country"
                value={form.country}
                onChange={(event) => updateField("country", event.target.value)}
              >
                {countryOptions.map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </Select>
            </FormField>
          </div>

          <fieldset className="space-y-3">
            <legend className="text-[13px] font-medium text-[var(--muted)]">
              ¿De qué se trata tu empresa?
            </legend>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {companyOptions.map((option) => (
                <ChoiceCard
                  key={option.value}
                  title={option.title}
                  description={option.description}
                  isSelected={form.companyType === option.value}
                  onClick={() => updateField("companyType", option.value)}
                  className="p-3.5"
                />
              ))}
            </div>
            {errors.companyType && (
              <p className="text-xs text-rose-500">{errors.companyType}</p>
            )}
          </fieldset>

          <FormField
            label="¿Cómo nos conociste?"
            htmlFor="profile-referral"
            error={errors.referralSource}
          >
            <Select
              id="profile-referral"
              value={form.referralSource}
              onChange={(event) =>
                updateField("referralSource", event.target.value as ReferralSource | "")
              }
              hasError={Boolean(errors.referralSource)}
            >
              <option value="">Seleccioná una opción</option>
              {referralOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormField>

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            <span>Continuar al dashboard</span>
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>
      </Card>
    </main>
  );
}
