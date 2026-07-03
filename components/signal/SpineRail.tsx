"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { WAYPOINTS } from "@/content/data";
import { usePulse } from "@/lib/pulse";
import { scrollToHash } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/**
 * La columna vertebral: línea vertical fija en el carril izquierdo (desktop),
 * recorrida por el latido global. Los waypoints marcan la sección activa
 * (indicador de scroll real) y navegan al click.
 * Aparece con un handoff al salir del hero; en mobile no existe (barra CSS aparte).
 */
export function SpineRail() {
  const [active, setActive] = useState<string>(WAYPOINTS[0].id);
  const [interactive, setInteractive] = useState(false);
  const [beat, setBeat] = useState(0);
  const reduced = useReducedMotion();
  const pulse = usePulse();

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [300, 700], [0, 1]);
  useMotionValueEvent(scrollY, "change", (v) => setInteractive(v > 400));

  // latido que recorre la línea
  useEffect(() => pulse.onBeat((i) => setBeat(i)), [pulse]);

  // sección activa por IntersectionObserver (jamás listeners de scroll manuales)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const w of WAYPOINTS) {
      const el = document.getElementById(w.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  const n = WAYPOINTS.length;

  return (
    <>
      {/* mobile: la señal degrada a una barra mínima que late por CSS */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 h-dvh w-[2px] bg-pulse/10 lg:hidden"
      >
        <div className="led h-full w-full bg-pulse/30" />
      </div>
      <motion.div
      className={cn(
        "fixed left-0 top-0 z-30 hidden h-dvh w-24 lg:block",
        !interactive && "pointer-events-none",
      )}
      style={{ opacity: reduced ? (interactive ? 1 : 0) : opacity }}
      aria-hidden={!interactive}
    >
      {/* la señal */}
      <div className="absolute bottom-0 left-12 top-0 w-[1.5px] -translate-x-1/2 bg-pulse/20" />

      {/* el latido viaja por la señal */}
      {!reduced && beat > 0 && (
        <motion.div
          key={beat}
          className="absolute left-12 top-0 h-28 w-[3px] -translate-x-1/2 blur-[2px]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,180,84,0.9), transparent)",
          }}
          initial={{ y: "-15dvh", opacity: 0 }}
          animate={{ y: "110dvh", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.4, ease: "linear" }}
        />
      )}

      {/* waypoints: indicador de sección + navegación */}
      <nav aria-label="Secciones">
        {WAYPOINTS.map((w, i) => {
          const top = 12 + (i * 76) / (n - 1); // 12% a 88% del alto
          const isActive = active === w.id;
          return (
            <button
              key={w.id}
              onClick={() => scrollToHash(`#${w.id}`)}
              className="group absolute left-12 flex -translate-x-1/2 -translate-y-1/2 items-center p-2"
              style={{ top: `${top}%` }}
              aria-label={w.label}
              aria-current={isActive ? "true" : undefined}
              tabIndex={interactive ? 0 : -1}
            >
              <span
                className={cn(
                  "block h-[5px] w-[5px] transition-all duration-300",
                  isActive
                    ? "scale-150 bg-pulse shadow-[0_0_8px_rgba(255,180,84,0.7)]"
                    : "bg-faint group-hover:bg-pulse/70",
                )}
              />
              <span
                className={cn(
                  "pointer-events-none absolute left-7 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100",
                  isActive ? "text-pulse" : "text-dim",
                )}
              >
                {w.label}
              </span>
            </button>
          );
        })}
      </nav>
      </motion.div>
    </>
  );
}
