"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Campos del cotizador: label ARRIBA, error inline ABAJO, foco ámbar.
 * Sobre --surface, aristas vivas, contraste AA en label, placeholder y error.
 */

const inputBase =
  "w-full border bg-surface px-4 text-[15px] text-ink placeholder:text-dim transition-colors focus:outline-none focus:ring-1 focus:ring-pulse/50";

function borderFor(error?: string) {
  return error ? "border-pulse/70" : "border-hairline focus:border-pulse/60";
}

function FieldShell({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          className="font-mono text-[12px] tracking-wide text-pulse"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function Field({
  label,
  error,
  className,
  ...props
}: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        id={id}
        className={cn(inputBase, "h-12", borderFor(error), className)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
    </FieldShell>
  );
}

export function TextArea({
  label,
  error,
  className,
  ...props
}: { label: string; error?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} error={error}>
      <textarea
        id={id}
        className={cn(inputBase, "min-h-28 resize-y py-3", borderFor(error), className)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
    </FieldShell>
  );
}

/**
 * Select custom del sistema (el nativo no se puede estilar: opciones blancas y
 * highlight celeste del SO rompían la estética). Listbox accesible completo:
 * flechas, Home/End, Enter/Espacio, Esc, click afuera, aria-activedescendant.
 */
export function SelectField({
  label,
  error,
  placeholder,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  error?: string;
  placeholder?: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();

  const selectedIndex = options.indexOf(value);

  // click afuera: cerrar
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // abrir activando la opción seleccionada (o la primera) y scrollearla a la vista
  const openList = () => {
    const idx = selectedIndex >= 0 ? selectedIndex : 0;
    setActiveIndex(idx);
    setOpen(true);
    requestAnimationFrame(() => {
      listRef.current?.children[idx]?.scrollIntoView({ block: "nearest" });
    });
  };

  const commit = (idx: number) => {
    onChange(options[idx]);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
      return;
    }
    const move = (next: number) => {
      e.preventDefault();
      const idx = Math.min(options.length - 1, Math.max(0, next));
      setActiveIndex(idx);
      listRef.current?.children[idx]?.scrollIntoView({ block: "nearest" });
    };
    if (e.key === "ArrowDown") move(activeIndex + 1);
    else if (e.key === "ArrowUp") move(activeIndex - 1);
    else if (e.key === "Home") move(0);
    else if (e.key === "End") move(options.length - 1);
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (activeIndex >= 0) commit(activeIndex);
    }
  };

  return (
    <FieldShell id={id} label={label} error={error}>
      <div ref={rootRef} className="relative" onKeyDown={onKeyDown}>
        <button
          ref={buttonRef}
          type="button"
          id={id}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          onClick={() => (open ? setOpen(false) : openList())}
          className={cn(
            inputBase,
            "flex h-12 items-center justify-between gap-3 pr-3 text-left",
            !value && "text-dim",
            open && "border-pulse/60",
            borderFor(error),
            className,
          )}
        >
          <span className="truncate">{value || placeholder}</span>
          <ChevronDown
            aria-hidden
            strokeWidth={1.5}
            className={cn(
              "h-4 w-4 shrink-0 text-dim transition-transform duration-200",
              open && "rotate-180 text-pulse",
            )}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              ref={listRef}
              id={`${id}-listbox`}
              role="listbox"
              aria-labelledby={id}
              initial={reduced ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inset-x-0 top-full z-20 mt-2 max-h-72 overflow-y-auto border border-pulse/25 bg-surface py-1 shadow-[0_16px_48px_rgba(0,0,0,0.55)]"
            >
              {options.map((o, i) => {
                const selected = o === value;
                const active = i === activeIndex;
                return (
                  <li
                    key={o}
                    role="option"
                    aria-selected={selected}
                    onPointerMove={() => setActiveIndex(i)}
                    onClick={() => commit(i)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-[15px] transition-colors duration-100",
                      active ? "bg-pulse/10 text-ink" : "text-dim",
                      selected && "text-pulse",
                    )}
                  >
                    <span className="truncate">{o}</span>
                    {selected && (
                      <Check
                        aria-hidden
                        strokeWidth={1.5}
                        className="h-4 w-4 shrink-0 text-pulse"
                      />
                    )}
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </FieldShell>
  );
}
