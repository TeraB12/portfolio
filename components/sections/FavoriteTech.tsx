"use client";

/**
 * PULSO · Sección 9: Tecnologías favoritas (id "tecnologias").
 * Índice tipográfico monumental: nombres enormes en outline que se llenan
 * de ámbar al hover/focus (clip-path), con panel lateral sticky que explica
 * el porqué honesto de cada elección. SIN eyebrow (presupuesto agotado).
 *
 * Foco de profundidad (injerto APERTURA): la fila activa al 100%, el resto
 * baja a opacity-40. Siempre hay una activa (inicial: la primera).
 */

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FAVORITE_TECH } from "@/content/data";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { cn } from "@/lib/utils";

/** tipografía compartida por las dos capas del nombre (deben calzar 1:1) */
const NAME_TYPE =
  "font-display text-[clamp(2.6rem,5.5vw,4.8rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.02em]";

export function FavoriteTech() {
  const items = FAVORITE_TECH.items;
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  return (
    <Section id="tecnologias">
      <SectionTitle title={FAVORITE_TECH.title} />

      {/* ================= DESKTOP (>= lg): índice + panel sticky ================= */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-x-12">
        {/* Índice tipográfico */}
        <div className="col-span-8 flex flex-col items-start">
          {items.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.06} className="w-full">
              <IndexName
                name={item.name}
                active={active === i}
                reduced={!!reduced}
                onActivate={() => setActive(i)}
              />
            </Reveal>
          ))}
        </div>

        {/* Panel lateral: el porqué honesto */}
        <div className="col-span-4">
          <div className="sticky top-32">
            <Reveal delay={0.15}>
              <MonoLabel tone="dim">{FAVORITE_TECH.panelLabel}</MonoLabel>
              <div aria-live="polite" className="mt-5 min-h-32">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={items[active].name}
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.2, ease: EASE }}
                  >
                    <p className="max-w-[36ch] text-lg leading-relaxed text-ink">
                      {items[active].why}
                    </p>
                    {/* sello de respaldo: la herramienta que lo hace posible */}
                    <p className="mt-5">
                      <MonoLabel>{`Con ${items[active].tech}`}</MonoLabel>
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ================= MOBILE (< lg): nombre relleno + porqué visible ================= */}
      <div className="flex flex-col lg:hidden">
        {items.map((item, i) => (
          <Reveal key={item.name} delay={i * 0.05}>
            <div
              className={cn(
                "border-b border-hairline pb-6",
                i === 0 ? "pt-0" : "pt-6",
              )}
            >
              <h3 className="font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-ink">
                {item.name}
              </h3>
              <p className="mt-2">
                <MonoLabel>{`Con ${item.tech}`}</MonoLabel>
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-dim">
                {item.why}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ========================================================================== */
/* Sub-componentes privados                                                    */
/* ========================================================================== */

/**
 * Nombre del índice en dos capas: outline (stroke hueso) + relleno ámbar que
 * entra por clip-path de izquierda a derecha. hover/focus activan; el activo
 * queda encendido (nunca hay cero activos). Los no activos bajan a opacity-40.
 */
function IndexName({
  name,
  active,
  reduced,
  onActivate,
}: {
  name: string;
  active: boolean;
  reduced: boolean;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-current={active ? "true" : undefined}
      className={cn(
        "block w-full py-1.5 text-left transition-opacity duration-300",
        active ? "opacity-100" : "opacity-40",
      )}
    >
      <span className="relative inline-block">
        {/* Capa 1: outline. El texto real (accesible) con stroke hueso. */}
        <span
          className={NAME_TYPE}
          style={{
            WebkitTextStroke: "1px rgba(233,230,221,0.28)",
            color: "transparent",
          }}
        >
          {name}
        </span>
        {/* Capa 2: relleno ámbar que entra con clip-path. Decorativa. */}
        <motion.span
          aria-hidden
          className={cn(NAME_TYPE, "absolute inset-0 text-pulse")}
          initial={false}
          animate={{
            clipPath: active ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          }}
          transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
        >
          {name}
        </motion.span>
      </span>
    </button>
  );
}
