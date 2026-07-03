"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE, VIEWPORT_ONCE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Reveal estándar del sitio: sube, aparece y se enfoca. Una sola vez.
 * Con reduced-motion el contenido llega estático.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduced ? false : { opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
