"use client";

/**
 * PULSO · Sección 8: Servicios (id "servicios").
 * Familia: grid asimétrico de celdas desiguales que comparten hairlines.
 * Tres tamaños de celda: torre (dominante, 7 col × 2 filas), cuadrado (5 col)
 * y franja horizontal final (12 col). En mobile todo colapsa a una columna
 * apilada con hairline inferior.
 * Hover: el contenido interno sube 4px y aparece un tick mono de confirmación.
 */

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Check } from "lucide-react";
import { SERVICES } from "@/content/data";
import { EASE, SPRING } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { cn } from "@/lib/utils";

type CellVariant = "tower" | "square" | "strip";
type ServiceItem = (typeof SERVICES.items)[number];

/** el contenido interno sube 4px al hover (feedback quirúrgico, sin flotación) */
const LIFT: Variants = {
  rest: { y: 0 },
  hover: { y: -4 },
};

/** tick mono de confirmación en la esquina superior derecha de la celda */
const TICK: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

function Bullet({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2.5 text-sm text-ink/90">
      <Check
        aria-hidden
        strokeWidth={1.5}
        className="h-3.5 w-3.5 shrink-0 text-pulse"
      />
      <span>{text}</span>
    </li>
  );
}

/** contenido interno de cada celda según su tamaño */
function CellBody({
  item,
  variant,
}: {
  item: ServiceItem;
  variant: CellVariant;
}) {
  if (variant === "tower") {
    return (
      <div className="flex h-full flex-col p-10 md:p-14">
        <h3 className="font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-ink md:text-4xl">
          {item.name}
        </h3>
        <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-dim">
          {item.description}
        </p>
        <ul className="mt-auto grid grid-cols-1 gap-x-8 gap-y-2 pt-10 sm:grid-cols-2">
          {item.bullets.map((b) => (
            <Bullet key={b} text={b} />
          ))}
        </ul>
      </div>
    );
  }

  if (variant === "strip") {
    return (
      <div className="flex h-full flex-col gap-6 p-8 md:p-10 lg:flex-row lg:items-center lg:gap-12">
        <h3 className="shrink-0 font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-ink">
          {item.name}
        </h3>
        <p className="max-w-[46ch] text-[15px] leading-relaxed text-dim lg:max-w-[38ch]">
          {item.description}
        </p>
        <ul className="flex flex-wrap gap-x-8 gap-y-2 lg:ml-auto lg:justify-end">
          {item.bullets.map((b) => (
            <Bullet key={b} text={b} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col p-8 md:p-10">
      <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-ink">
        {item.name}
      </h3>
      <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-dim">
        {item.description}
      </p>
      <ul className="mt-6 flex flex-col gap-y-2">
        {item.bullets.map((b) => (
          <Bullet key={b} text={b} />
        ))}
      </ul>
    </div>
  );
}

function ServiceCell({
  item,
  variant,
  delay,
}: {
  item: ServiceItem;
  variant: CellVariant;
  delay: number;
}) {
  const reduced = useReducedMotion();

  return (
    <Reveal
      delay={delay}
      className={cn(
        // mobile: celdas apiladas full-width separadas por hairline inferior
        "border-b border-hairline bg-bg lg:border-b-0",
        variant === "tower" && "lg:col-span-7 lg:row-span-2",
        variant === "square" && "lg:col-span-5",
        variant === "strip" && "lg:col-span-12",
      )}
    >
      <motion.div
        className="relative h-full"
        initial="rest"
        animate="rest"
        whileHover="hover"
      >
        <motion.span
          aria-hidden
          variants={TICK}
          transition={{ duration: 0.25, ease: EASE }}
          className="pointer-events-none absolute right-6 top-6 z-10 flex items-center gap-1.5"
        >
          <Check strokeWidth={1.5} className="h-3 w-3 text-pulse" />
          <MonoLabel>{SERVICES.availableLabel}</MonoLabel>
        </motion.span>

        <motion.div
          variants={reduced ? undefined : LIFT}
          transition={SPRING}
          className="h-full"
        >
          <CellBody item={item} variant={variant} />
        </motion.div>
      </motion.div>
    </Reveal>
  );
}

export function Services() {
  const last = SERVICES.items.length - 1;

  return (
    <Section id="servicios">
      <SectionTitle title={SERVICES.title} />

      <div className="border-t border-hairline lg:grid lg:grid-cols-12 lg:gap-px lg:border lg:bg-hairline">
        {SERVICES.items.map((item, i) => (
          <ServiceCell
            key={item.id}
            item={item}
            variant={item.dominant ? "tower" : i === last ? "strip" : "square"}
            delay={i * 0.08}
          />
        ))}
      </div>
    </Section>
  );
}
