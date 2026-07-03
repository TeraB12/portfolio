"use client";

/**
 * PULSO · Timeline: la señal pasa al centro.
 * Línea vertical central con scrub atado al scroll (el latido recorre la
 * historia) e hitos alternados izquierda/derecha como eventos de log.
 * Cada hito es un spike de ECG congelado que se enciende al llegar.
 * Sin GSAP: useScroll + useSpring de motion alcanzan.
 */

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { TIMELINE } from "@/content/data";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { cn } from "@/lib/utils";

/**
 * Viewport sincronizado con el scrub: el hito se enciende cuando cruza el 70%
 * de la ventana, el mismo punto donde el offset "start 0.7" arranca la capa
 * ámbar. Así el encendido acompaña visualmente al latido que baja.
 */
const VIEWPORT_SYNC = { once: true, margin: "0px 0px -30% 0px" } as const;

export function Timeline() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.7", "end 0.5"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  return (
    <Section id="timeline">
      <SectionTitle title={TIMELINE.title} />

      <div ref={trackRef} className="relative">
        {/* Línea vertical: base tenue + capa ámbar que el scroll hace crecer */}
        <div
          aria-hidden
          className="absolute bottom-0 top-0 left-[9px] w-[1.5px] md:left-1/2 md:-translate-x-1/2"
        >
          <div className="absolute inset-0 bg-pulse/15" />
          {reduced ? (
            <div className="absolute inset-0 bg-pulse/70" />
          ) : (
            <motion.div
              className="absolute inset-0 origin-top bg-pulse/70"
              style={{ scaleY }}
            />
          )}
        </div>

        <ol className="relative">
          {TIMELINE.events.map((event, i) => (
            <TimelineEvent
              key={`${event.stamp}-${event.title}`}
              event={event}
              index={i}
            />
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-componentes privados                                            */
/* ------------------------------------------------------------------ */

type TimelineEventData = (typeof TIMELINE.events)[number];

function TimelineEvent({
  event,
  index,
}: {
  event: TimelineEventData;
  index: number;
}) {
  const reduced = useReducedMotion();
  const onLeft = index % 2 === 0;

  return (
    <li className="relative grid grid-cols-1 py-10 md:grid-cols-2 md:gap-x-16 md:py-14">
      <SpikeMarker />

      <motion.div
        initial={reduced ? false : { opacity: 0.25, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_SYNC}
        transition={{ duration: 0.7, ease: EASE }}
        className={cn(
          "pl-10 md:pl-0",
          onLeft
            ? "md:col-start-1 md:text-right"
            : "md:col-start-2 md:text-left",
        )}
      >
        <MonoLabel tone="dim">{event.stamp}</MonoLabel>
        <h3 className="mt-2 font-display text-xl font-bold leading-snug text-ink md:text-2xl">
          {event.title}
        </h3>
        <p className="mt-2 inline-block max-w-[36ch] text-[15px] leading-relaxed text-dim">
          {event.detail}
        </p>
      </motion.div>
    </li>
  );
}

/**
 * Marcador sobre la línea: un mini-spike de ECG congelado.
 * Arranca en dim; cuando el hito entra al viewport se enciende la capa ámbar
 * (crossfade de opacidad) y aparece un glow radial que respira con --pulse.
 */
function SpikeMarker() {
  const reduced = useReducedMotion();

  return (
    <span
      aria-hidden
      className="absolute left-[10px] top-10 h-4 w-6 -translate-x-1/2 md:left-1/2 md:top-14"
    >
      {reduced ? (
        <>
          <GlowHalo className="opacity-100" />
          <Spike className="absolute inset-0 text-pulse" />
        </>
      ) : (
        <motion.span
          className="absolute inset-0 block"
          initial="off"
          whileInView="on"
          viewport={VIEWPORT_SYNC}
        >
          <motion.span
            className="absolute inset-0 block"
            variants={{ off: { opacity: 1 }, on: { opacity: 0 } }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Spike className="absolute inset-0 text-dim" />
          </motion.span>
          <motion.span
            className="absolute inset-0 block"
            variants={{ off: { opacity: 0 }, on: { opacity: 1 } }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <GlowHalo className="led" />
            <Spike className="absolute inset-0 text-pulse" />
          </motion.span>
        </motion.span>
      )}
    </span>
  );
}

/** Glow radial ámbar detrás del spike (único degradado permitido: luz). */
function GlowHalo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute -inset-3 rounded-full",
        className,
      )}
      style={{
        background:
          "radial-gradient(closest-side, rgba(255, 180, 84, 0.3), transparent 72%)",
      }}
    />
  );
}

/** Zigzag de electrocardiograma, 24x16, stroke en currentColor. */
function Spike({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      width="24"
      height="16"
      fill="none"
      className={className}
    >
      <path
        d="M0 8 H6.5 L8.5 10.5 L11 1.5 L13.5 14.5 L15.5 8 H24"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
