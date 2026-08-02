"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Desplegable propio.
 *
 * El <select> nativo rompe la estética: en Windows y Android el sistema pinta
 * su propio panel blanco y no hay CSS que lo cambie. Este es un botón que abre
 * un panel absoluto, se cierra al elegir, al hacer clic afuera o con Escape, y
 * se maneja con flechas desde el teclado.
 */
export function Choice({
  label,
  placeholder,
  options,
  value,
  onChange,
  invalid,
  describedBy,
}: {
  label: string;
  placeholder: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
  describedBy?: string;
}) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;

    const onDocClick = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    // fase de captura: así se cierra aunque el clic caiga en algo que
    // detenga la propagación
    document.addEventListener("click", onDocClick, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const move = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const next = e.key === "ArrowDown" ? i + 1 : i - 1;
    const items = panel.current?.querySelectorAll("button");
    items?.[(next + options.length) % options.length]?.focus();
  };

  return (
    <div ref={box} className="relative">
      <span
        id={`${id}-label`}
        className="mb-[9px] block font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-35"
      >
        {label}
      </span>

      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={`${id}-label`}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={cn(
          "flex w-full items-center justify-between gap-3 border-0 border-b bg-transparent py-2.5 text-left text-[16px] outline-none transition-colors duration-300",
          invalid
            ? "border-b-[#E4603A]"
            : "border-b-[rgba(244,241,234,0.18)] hover:border-b-accent",
        )}
      >
        <span className={value ? "text-ink" : "text-ink-35"}>
          {value || placeholder}
        </span>
        <span
          aria-hidden
          className="font-mono text-[10px] tracking-[0.1em] text-accent"
        >
          ▼
        </span>
      </button>

      {open && (
        <div
          ref={panel}
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="absolute inset-x-0 top-[calc(100%+5px)] z-40 flex flex-col border border-[rgba(244,241,234,0.16)] bg-card-hover shadow-[0_26px_60px_-22px_rgba(0,0,0,0.95)]"
        >
          {options.map((o, i) => (
            <button
              key={o}
              type="button"
              role="option"
              aria-selected={o === value}
              onKeyDown={(e) => move(e, i)}
              onClick={() => {
                onChange(o);
                setOpen(false);
                trigger.current?.focus();
              }}
              className="border-0 border-b border-b-[rgba(244,241,234,0.07)] bg-transparent px-[15px] py-[13px] text-left text-[14.5px] text-ink-70 transition-colors duration-200 last:border-b-0 hover:bg-accent hover:text-[#0A0A08] focus-visible:bg-accent focus-visible:text-[#0A0A08]"
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
