"use client";

/**
 * PULSO · Casos de éxito (id "casos"). Familia: dossier documental.
 *
 * Cabecera mono "EN PRODUCCIÓN · MYA IMPORTACIONES", tres columnas de datos
 * duros (solo borde izquierdo, jamás cajas) y la cita del flujo real.
 * Los números cuentan desde 0 UNA vez: el trigger se arma al entrar al
 * viewport y el count-up arranca con el PRÓXIMO latido del reloj global
 * (fallback 2s si el beat no llega). Con reduced-motion: valor final directo.
 */

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { CASE_STUDIES } from "@/content/data";
import { usePulse } from "@/lib/pulse";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { MonoLabel } from "@/components/ui/MonoLabel";

const nf = new Intl.NumberFormat("es-AR");

/** Dato duro del dossier: count-up sincronizado al latido global. */
function Metric({
  value,
  suffix,
  label,
  className,
}: {
  value: number;
  suffix: string;
  label: string;
  className?: string;
}) {
  const { onBeat } = usePulse();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const started = useRef(false);
  const [display, setDisplay] = useState(0);

  // Reduced-motion: sin loop de pulso ni count-up, el valor llega entero.
  useEffect(() => {
    if (reduced && !started.current) {
      started.current = true;
      setDisplay(value);
    }
  }, [reduced, value]);

  // Armado del trigger: en viewport → esperar el próximo latido global.
  useEffect(() => {
    if (!inView || reduced || started.current) return;

    let controls: ReturnType<typeof animate> | undefined;

    const start = () => {
      if (started.current) return;
      started.current = true;
      controls = animate(0, value, {
        duration: 1.4,
        ease: EASE,
        onUpdate: (v) => setDisplay(Math.round(v)),
      });
    };

    const offBeat = onBeat(start);
    // Si el beat no llega en 2s (pestaña recién visible, etc.), arranca igual.
    const fallback = window.setTimeout(start, 2000);

    return () => {
      offBeat();
      window.clearTimeout(fallback);
      controls?.stop();
    };
  }, [inView, reduced, value, onBeat]);

  return (
    <div ref={ref} className={`border-l border-hairline pl-6 ${className ?? ""}`}>
      <div className="font-mono text-[clamp(2.8rem,5vw,4.2rem)] leading-none text-pulse tabular-nums">
        <span aria-hidden>
          {nf.format(display)}
          {suffix}
        </span>
        <span className="sr-only">
          {nf.format(value)}
          {suffix}
        </span>
      </div>
      <p className="mt-4 max-w-[22ch] text-[14px] leading-relaxed text-dim">
        {label}
      </p>
    </div>
  );
}

/** offsets verticales en desktop: fila asimétrica, no vitrina simétrica */
const METRIC_OFFSETS = ["", "md:mt-10", "md:mt-20"];

export function CaseStudies() {
  return (
    <Section id="casos">
      <SectionTitle eyebrow={CASE_STUDIES.eyebrow} title={CASE_STUDIES.title} />

      <Reveal>
        <p className="mb-16 max-w-[60ch] text-lg leading-relaxed text-dim">
          {CASE_STUDIES.intro}
        </p>
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {CASE_STUDIES.metrics.map((m, i) => (
            <Metric
              key={m.label}
              value={m.value}
              suffix={m.suffix}
              label={m.label}
              className={METRIC_OFFSETS[i] ?? ""}
            />
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-16 border-t border-hairline pt-10">
          <MonoLabel tone="dim">{CASE_STUDIES.flowLabel}</MonoLabel>
          <blockquote className="mt-6 max-w-[42ch] font-display text-xl font-medium leading-snug text-ink sm:text-2xl md:text-3xl">
            {CASE_STUDIES.flowQuote}
          </blockquote>
          <p className="mt-10 text-[14px] leading-relaxed text-dim">
            {CASE_STUDIES.note}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
