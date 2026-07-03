"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Wrapper estándar de sección (órgano del sistema).
 * Padding vertical del sitio, carril izquierdo libre para la spine en desktop
 * y "ping": un anillo ámbar que se expande desde la spine al entrar al viewport.
 */
export function Section({
  id,
  children,
  className,
  bleed = false,
  ping = true,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  /** true: sin contenedor (la sección maneja su propio ancho, ej. banda full-bleed) */
  bleed?: boolean;
  ping?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <section id={id} className={cn("relative py-28 md:py-40", className)}>
      {ping && !reduced && (
        <motion.span
          aria-hidden
          className="absolute left-[42px] top-32 hidden h-3 w-3 rounded-full border border-pulse lg:block"
          initial={{ scale: 0.3, opacity: 0 }}
          whileInView={{ scale: [0.3, 2.4], opacity: [0, 0.9, 0] }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      )}
      {bleed ? (
        children
      ) : (
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:pl-28 lg:pr-20">
          {children}
        </div>
      )}
    </section>
  );
}
