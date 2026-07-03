"use client";

/**
 * PULSO · Sección 12: Contacto / Cotizador (el clímax del organismo).
 *
 * Form editorial en 2 columnas: contexto y vías directas a la izquierda,
 * el cotizador a la derecha. Sin backend: valida en el cliente, arma el
 * mensaje con lib/wa y lo abre en WhatsApp.
 *
 * CLÍMAX: cada campo obligatorio completado acelera el reloj cardíaco
 * global (pulse.setRate), solo mientras la sección está a la vista.
 * A form completo el corazón late ~3.6x más rápido; al salir de vista,
 * desmontar o vaciar campos, el ritmo vuelve a reposo.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Mail, MessageCircle, Send } from "lucide-react";

/** mark oficial de GitHub (Simple Icons); lucide ya no incluye iconos de marcas */
function GithubMark({
  className,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

import { CONTACT, IDENTITY } from "@/content/data";
import { usePulse } from "@/lib/pulse";
import { buildWhatsAppUrl, isValidEmail } from "@/lib/wa";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Field, SelectField, TextArea } from "@/components/ui/fields";

type RequiredKey = "name" | "email" | "devType" | "business";
type FieldErrors = Partial<Record<RequiredKey, string>>;

/** Vías directas de contacto (izquierda, debajo del intro) */
function DirectLinks() {
  const links = [
    {
      href: `https://wa.me/${IDENTITY.whatsappNumber}`,
      label: IDENTITY.phoneDisplay,
      aria: "Abrir WhatsApp",
      Icon: MessageCircle,
    },
    {
      href: `mailto:${IDENTITY.email}`,
      label: IDENTITY.email,
      aria: "Escribir un email",
      Icon: Mail,
    },
    {
      href: IDENTITY.github,
      label: IDENTITY.github.replace(/^https?:\/\//, ""),
      aria: "Ver GitHub",
      Icon: GithubMark,
    },
  ];

  return (
    <div className="mt-12">
      <p className="text-sm text-dim">{CONTACT.directLabel}</p>
      <div className="mt-4 flex flex-col items-start gap-3">
        {links.map(({ href, label, aria, Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${aria}: ${label}`}
            className="inline-flex items-center gap-3 font-mono text-[13px] tracking-wide text-ink transition-colors hover:text-pulse"
          >
            <Icon aria-hidden className="h-4 w-4 text-pulse" strokeWidth={1.5} />
            <span>{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function Contact() {
  const pulse = usePulse();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [devType, setDevType] = useState("");
  const [business, setBusiness] = useState("");
  const [ideas, setIdeas] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);

  const clearError = (key: RequiredKey) =>
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));

  // CLÍMAX PULSO: el corazón se acelera con cada campo obligatorio completo.
  const filled =
    (name.trim() ? 1 : 0) +
    (email.trim() ? 1 : 0) +
    (devType ? 1 : 0) +
    (business.trim() ? 1 : 0);

  useEffect(() => {
    pulse.setRate(inView ? 1 + filled * 0.65 : 1);
    return () => pulse.setRate(1);
  }, [inView, filled, pulse]);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const next: FieldErrors = {};
    if (!name.trim()) next.name = CONTACT.errors.name;
    if (!isValidEmail(email)) next.email = CONTACT.errors.email;
    if (!devType) next.devType = CONTACT.errors.devType;
    if (!business.trim()) next.business = CONTACT.errors.business;
    setErrors(next);

    if (next.name || next.email || next.devType || next.business) return;

    const url = buildWhatsAppUrl({ name, email, devType, business, ideas });
    // Sin "noopener" en el tercer argumento: hace que window.open devuelva
    // siempre null y vuelve indetectable el bloqueo de popups.
    const win = window.open(url, "_blank");
    if (win) {
      win.opener = null; // preserva la intención noopener
      setSent(true);
    } else {
      // Popup bloqueado (Safari iOS, navegadores in-app): fallback same-tab.
      window.location.assign(url);
    }
  };

  return (
    <Section id="contacto" className="min-h-[100dvh]">
      <div ref={ref} className="grid grid-cols-1 gap-14 lg:grid-cols-12">
        {/* Columna izquierda: título, intro y vías directas */}
        <div className="lg:col-span-5">
          <SectionTitle
            eyebrow={CONTACT.eyebrow}
            title={CONTACT.title}
            className="mb-8 md:mb-10"
          />
          <Reveal>
            <p className="max-w-[40ch] text-lg leading-relaxed text-dim">
              {CONTACT.intro}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <DirectLinks />
          </Reveal>
        </div>

        {/* Columna derecha: el cotizador */}
        <div className="lg:col-span-7">
          <Reveal delay={0.08}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field
                  label={CONTACT.fields.name.label}
                  placeholder={CONTACT.fields.name.placeholder}
                  autoComplete="name"
                  value={name}
                  error={errors.name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearError("name");
                  }}
                />
                <Field
                  type="email"
                  label={CONTACT.fields.email.label}
                  placeholder={CONTACT.fields.email.placeholder}
                  autoComplete="email"
                  value={email}
                  error={errors.email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearError("email");
                  }}
                />
              </div>

              <SelectField
                label={CONTACT.fields.devType.label}
                placeholder={CONTACT.fields.devType.placeholder}
                options={CONTACT.devTypes}
                value={devType}
                error={errors.devType}
                onChange={(value) => {
                  setDevType(value);
                  clearError("devType");
                }}
              />

              <TextArea
                label={CONTACT.fields.business.label}
                placeholder={CONTACT.fields.business.placeholder}
                rows={5}
                value={business}
                error={errors.business}
                onChange={(e) => {
                  setBusiness(e.target.value);
                  clearError("business");
                }}
              />

              <TextArea
                label={CONTACT.fields.ideas.label}
                placeholder={CONTACT.fields.ideas.placeholder}
                rows={4}
                value={ideas}
                onChange={(e) => setIdeas(e.target.value)}
              />

              <div className="mt-2 flex flex-col gap-5">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full md:w-auto md:self-start"
                >
                  {CONTACT.submitLabel}
                  <Send aria-hidden className="ml-2 h-4 w-4" strokeWidth={1.5} />
                </Button>

                {sent && (
                  <motion.div
                    role="status"
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex flex-col gap-1.5"
                  >
                    <MonoLabel>{CONTACT.sentLabel}</MonoLabel>
                    <p className="text-sm text-dim">{CONTACT.sentHint}</p>
                  </motion.div>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
