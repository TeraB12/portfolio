"use client";

import { useId, useState } from "react";
import { CONTACT } from "@/content/data";
import { Choice } from "@/components/ui/Choice";
import { Cta } from "@/components/ui/Cta";
import { Dot } from "@/components/ui/Dot";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"nombre" | "tipo" | "mensaje", string>>;
type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full border-0 border-b bg-transparent py-2.5 text-[16px] text-ink outline-none transition-colors duration-300 placeholder:text-ink-35";

/**
 * El formulario de presupuesto. Postea a /api/presupuesto, que lo reenvía al
 * panel de control de Pulso.
 */
export function QuoteForm() {
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [tipo, setTipo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const id = useId();

  const validate = (): Errors => {
    const e: Errors = {};
    if (nombre.trim().length < 2) e.nombre = CONTACT.errors.nombre;
    if (!tipo) e.tipo = CONTACT.errors.tipo;
    if (mensaje.trim().length < 10) e.mensaje = CONTACT.errors.mensaje;
    return e;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/presupuesto", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ nombre, empresa, tipo, mensaje }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const border = (bad?: string) =>
    bad ? "border-b-[#E4603A]" : "border-b-[rgba(244,241,234,0.18)] focus:border-b-accent";

  return (
    <form
      noValidate
      onSubmit={submit}
      data-reveal="rise"
      className="border border-[rgba(244,241,234,0.15)] bg-bg p-[clamp(24px,3vw,38px)]"
    >
      <div className="mb-[26px] flex items-center gap-[9px]">
        <Dot size={6} />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-45">
          {CONTACT.formNote}
        </span>
      </div>

      <div className="flex flex-col gap-[18px]">
        <label className="block">
          <span className="mb-[9px] block font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-35">
            {CONTACT.fields.nombre.label}
          </span>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder={CONTACT.fields.nombre.placeholder}
            aria-invalid={!!errors.nombre}
            aria-describedby={errors.nombre ? `${id}-nombre` : undefined}
            className={cn(field, border(errors.nombre))}
          />
          {errors.nombre && (
            <span
              id={`${id}-nombre`}
              className="mt-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-[#E4603A]"
            >
              {errors.nombre}
            </span>
          )}
        </label>

        <label className="block">
          <span className="mb-[9px] block font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-35">
            {CONTACT.fields.empresa.label}
          </span>
          <input
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            placeholder={CONTACT.fields.empresa.placeholder}
            className={cn(field, border())}
          />
        </label>

        <div>
          <Choice
            label={CONTACT.fields.tipo.label}
            placeholder={CONTACT.fields.tipo.placeholder}
            options={CONTACT.tipoOptions}
            value={tipo}
            onChange={(v) => setTipo(v)}
            invalid={!!errors.tipo}
            describedBy={errors.tipo ? `${id}-tipo` : undefined}
          />
          {errors.tipo && (
            <span
              id={`${id}-tipo`}
              className="mt-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-[#E4603A]"
            >
              {errors.tipo}
            </span>
          )}
        </div>

        <label className="block">
          <span className="mb-[9px] block font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-35">
            {CONTACT.fields.mensaje.label}
          </span>
          <textarea
            rows={4}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder={CONTACT.fields.mensaje.placeholder}
            aria-invalid={!!errors.mensaje}
            aria-describedby={errors.mensaje ? `${id}-mensaje` : undefined}
            className={cn(field, border(errors.mensaje), "resize-y leading-[1.55]")}
          />
          {errors.mensaje && (
            <span
              id={`${id}-mensaje`}
              className="mt-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-[#E4603A]"
            >
              {errors.mensaje}
            </span>
          )}
        </label>

        <Cta
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="mt-1.5 w-full px-0 py-[18px] text-[15px] tracking-[-0.01em] disabled:opacity-70"
        >
          {status === "sending"
            ? CONTACT.sendingLabel
            : status === "sent"
              ? CONTACT.sentLabel
              : CONTACT.submitLabel}
        </Cta>

        <p aria-live="polite" className="sr-only">
          {status === "sent" ? CONTACT.sentLabel : ""}
        </p>

        {status === "error" && (
          <p
            role="alert"
            className="font-mono text-[10.5px] uppercase leading-[1.7] tracking-[0.14em] text-[#E4603A]"
          >
            {CONTACT.errorLabel}
          </p>
        )}
      </div>
    </form>
  );
}
