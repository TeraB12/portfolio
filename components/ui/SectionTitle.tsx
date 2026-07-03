"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE, VIEWPORT_ONCE } from "@/lib/motion";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { cn } from "@/lib/utils";

/**
 * Título de sección: display monumental con reveal por máscara.
 * `eyebrow` SOLO si la sección tiene presupuesto de eyebrow (máx 4 en el sitio).
 */
export function SectionTitle({
  title,
  eyebrow,
  className,
  as: Tag = "h2",
}: {
  title: string;
  eyebrow?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("mb-14 md:mb-20", className)}>
      {eyebrow && (
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-4"
        >
          <MonoLabel>{eyebrow}</MonoLabel>
        </motion.div>
      )}
      {/* el trigger de viewport vive en el contenedor NO recortado: un hijo
          desplazado 110% dentro de overflow-hidden queda 100% clipeado y el
          IntersectionObserver jamás lo consideraría visible */}
      <motion.div
        className="overflow-hidden pb-1"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        <motion.div
          variants={
            reduced
              ? { hidden: { y: "0%" }, visible: { y: "0%" } }
              : {
                  hidden: { y: "110%" },
                  visible: {
                    y: "0%",
                    transition: { duration: 0.9, ease: EASE },
                  },
                }
          }
        >
          <Tag className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.02em] text-ink">
            {title}
          </Tag>
        </motion.div>
      </motion.div>
    </div>
  );
}
