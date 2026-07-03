"use client";

/**
 * PULSO · Stack (sección 5): bahía de racks.
 * Banda horizontal full-bleed con scroll-snap contenido en la franja.
 * Cada módulo es una unidad de rack: LED, nombre, rol en mono.
 * Boot sequence: al entrar la banda al viewport, los LEDs encienden en
 * secuencia (delay por índice) y después quedan latiendo con el reloj
 * global vía las clases led / led-b (alternadas para no latir al unísono).
 */

import { motion, useReducedMotion, type Variants } from "motion/react";
import { STACK } from "@/content/data";
import { EASE, VIEWPORT_ONCE } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

/** encendido secuencial: el contenedor del LED pasa de 0 a 1 con delay por índice */
const ledBoot: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.35, delay: i * 0.08, ease: EASE },
  }),
};

function RackModule({
  name,
  role,
  index,
}: {
  name: string;
  role: string;
  index: number;
}) {
  return (
    <li className="flex min-w-[170px] snap-start flex-col gap-6 border-l border-hairline px-7 py-10 sm:min-w-[210px] md:min-w-[240px]">
      {/* el wrapper anima SOLO la aparición; la clase led/led-b late siempre */}
      <motion.span
        aria-hidden
        variants={ledBoot}
        custom={index}
        className="block"
      >
        <span
          className={cn(
            "block h-[6px] w-[6px] bg-pulse",
            index % 2 === 0 ? "led" : "led-b",
          )}
        />
      </motion.span>
      <span className="font-display text-xl font-bold text-ink">{name}</span>
      <span className="mono-label text-dim">{role}</span>
    </li>
  );
}

export function Stack() {
  const reduced = useReducedMotion();

  return (
    <Section id="stack" bleed>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:pl-28 lg:pr-20">
        <SectionTitle title={STACK.title} />
      </div>

      {/* la bahía: banda full-bleed con scroll horizontal propio */}
      <div className="relative border-y border-hairline">
        <motion.ul
          data-lenis-prevent
          tabIndex={0}
          aria-label={STACK.title}
          initial={reduced ? "visible" : "hidden"}
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {STACK.modules.map((m, i) => (
            <RackModule key={m.name} name={m.name} role={m.role} index={i} />
          ))}
        </motion.ul>

        {/* pistas de scroll: fades laterales hacia el fondo (solo desktop) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-linear-to-r from-bg to-transparent md:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-linear-to-l from-bg to-transparent md:block"
        />
      </div>
    </Section>
  );
}
