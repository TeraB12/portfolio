"use client";

/**
 * PULSO · Skills: constelación de nodos conectados.
 *
 * Desktop (lg+): 4 columnas verticales (una por grupo), nodos HTML absolutos
 * sobre UN SVG de aristas. El peso tipográfico del label ES el dominio real
 * (injerto PLOMO). Hover/focus de un nodo ilumina su cadena real de
 * dependencias derivada de SKILLS.deps; el resto baja a opacity-30.
 * Mobile (<lg): la constelación colapsa a 4 listas agrupadas con puntos led.
 *
 * Layout 100% determinístico: columnas fijas + jitter hardcodeado por índice.
 * Nada de Math.random. Los puntos respiran con el reloj global (--pulse).
 */

import { useMemo, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { SKILLS } from "@/content/data";
import { EASE, VIEWPORT_ONCE } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { cn } from "@/lib/utils";

/** x (%) de cada columna de grupo, por índice de grupo */
const COL_X = [8, 34, 60, 86] as const;

/** y (%) base de cada nodo dentro de su columna */
const BASE_Y = [24, 40, 56, 72, 88] as const;

/** jitter fijo determinístico (en %), distinto por índice global de nodo */
const JITTER = [
  { x: 0.0, y: -1.5 },
  { x: 2.6, y: 1.8 },
  { x: -1.8, y: -0.6 },
  { x: 3.4, y: 2.4 },
  { x: 0.8, y: -2.2 },
  { x: 2.2, y: 0.6 },
  { x: -1.2, y: -2.4 },
  { x: 3.0, y: 1.2 },
  { x: 0.4, y: 2.8 },
  { x: -2.0, y: -1.0 },
  { x: 1.6, y: 2.0 },
  { x: 3.6, y: -1.4 },
  { x: -0.8, y: 1.0 },
  { x: 2.8, y: -2.6 },
  { x: 0.2, y: 1.6 },
  { x: -1.6, y: -2.0 },
  { x: 2.4, y: 2.6 },
  { x: 0.6, y: -0.8 },
  { x: 3.2, y: 1.4 },
  { x: -0.4, y: -1.8 },
] as const;

const STROKE_REST = "rgba(233,230,221,0.10)";
const STROKE_LIT = "rgba(255,180,84,0.6)";

/** entrada de nodos: stagger por índice global */
const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE, delay: 0.1 + i * 0.035 },
  }),
};

/** entrada de nombres de grupo: fade suave, solo opacity (no pisa el translate) */
const groupLabelVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (gi: number) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: EASE, delay: gi * 0.12 },
  }),
};

/** entrada de aristas: se dibujan apenas después de los nodos */
const edgeVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.7, ease: EASE, delay: 0.55 + i * 0.04 },
      opacity: { duration: 0.25, delay: 0.55 + i * 0.04 },
    },
  }),
};

type NodeMeta = { x: number; y: number; index: number };

export function Skills() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  /** mapa id → posición (%) e índice global; nodos y aristas leen del MISMO mapa */
  const layout = useMemo(() => {
    const map = new Map<string, NodeMeta>();
    let k = 0;
    SKILLS.groups.forEach((g, gi) => {
      g.nodes.forEach((n, ni) => {
        const j = JITTER[k % JITTER.length];
        map.set(n.id, {
          x: COL_X[gi % COL_X.length] + j.x,
          y: BASE_Y[ni % BASE_Y.length] + j.y,
          index: k,
        });
        k += 1;
      });
    });
    return map;
  }, []);

  /** adyacencia real de SKILLS.deps, en ambas direcciones */
  const adjacency = useMemo(() => {
    const m = new Map<string, Set<string>>();
    const add = (a: string, b: string) => {
      const set = m.get(a) ?? new Set<string>();
      set.add(b);
      m.set(a, set);
    };
    for (const [from, to] of SKILLS.deps) {
      add(from, to);
      add(to, from);
    }
    return m;
  }, []);

  /** nodo activo + sus conectados directos; null cuando no hay hover/focus */
  const litNodes = useMemo(() => {
    if (!active) return null;
    const set = new Set<string>(adjacency.get(active) ?? []);
    set.add(active);
    return set;
  }, [active, adjacency]);

  return (
    <Section id="skills">
      <SectionTitle title={SKILLS.title} />

      {/* ============ Desktop: constelación (lg+) ============ */}
      <motion.div
        className="relative hidden h-[560px] lg:block"
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        onMouseLeave={() => setActive(null)}
      >
        {/* UN solo SVG de aristas, debajo de los nodos */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
        >
          {SKILLS.deps.map(([from, to], i) => {
            const a = layout.get(from);
            const b = layout.get(to);
            if (!a || !b) return null;
            const isLit = active !== null && (from === active || to === active);
            const isDim = active !== null && !isLit;
            return (
              <g
                key={`${from}-${to}`}
                className={cn(
                  "transition-opacity duration-300",
                  isDim ? "opacity-30" : "opacity-100",
                )}
              >
                <motion.line
                  x1={`${a.x}%`}
                  y1={`${a.y}%`}
                  x2={`${b.x}%`}
                  y2={`${b.y}%`}
                  stroke={isLit ? STROKE_LIT : STROKE_REST}
                  strokeWidth={1}
                  strokeLinecap="square"
                  custom={i}
                  variants={edgeVariants}
                  className="transition-[stroke] duration-300"
                />
              </g>
            );
          })}
        </svg>

        {SKILLS.groups.map((g, gi) => {
          /* la última columna crece hacia la izquierda para no desbordar */
          const growsLeft = gi === COL_X.length - 1;
          return (
            <div key={g.name} className="contents">
              <motion.h3
                custom={gi}
                variants={groupLabelVariants}
                className="absolute top-0 -translate-x-1/2 whitespace-nowrap"
                style={{ left: `${COL_X[gi % COL_X.length]}%` }}
              >
                <MonoLabel tone="dim">{g.name}</MonoLabel>
              </motion.h3>

              {g.nodes.map((n) => {
                const meta = layout.get(n.id);
                if (!meta) return null;
                const isLit = litNodes !== null && litNodes.has(n.id);
                const isDim = litNodes !== null && !isLit;
                return (
                  <span
                    key={n.id}
                    className={cn(
                      "absolute -translate-y-1/2 transition-opacity duration-300",
                      growsLeft && "-translate-x-full",
                      isDim ? "opacity-30" : "opacity-100",
                    )}
                    style={{
                      /* corrección de 3px: el centro del punto cae exacto en x% */
                      left: `calc(${meta.x}% ${growsLeft ? "+" : "-"} 3px)`,
                      top: `${meta.y}%`,
                    }}
                  >
                    <motion.button
                      type="button"
                      custom={meta.index}
                      variants={nodeVariants}
                      aria-label={`${n.label}, ${g.name}. Resalta sus conexiones.`}
                      onMouseEnter={() => setActive(n.id)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(n.id)}
                      onBlur={() => setActive(null)}
                      className={cn(
                        "flex items-center gap-2.5",
                        growsLeft && "flex-row-reverse",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "h-1.5 w-1.5 shrink-0 transition-colors duration-300",
                          isLit ? "bg-pulse" : "bg-pulse/70",
                          meta.index % 2 ? "breathe-b" : "breathe",
                        )}
                      />
                      <span
                        className={cn(
                          "whitespace-nowrap text-[15px] leading-none transition-colors duration-300",
                          isLit ? "text-pulse" : "text-ink",
                        )}
                        style={{ fontWeight: n.weight }}
                      >
                        {n.label}
                      </span>
                    </motion.button>
                  </span>
                );
              })}
            </div>
          );
        })}
      </motion.div>

      {/* ============ Mobile (<lg): listas agrupadas ============ */}
      <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:hidden">
        {SKILLS.groups.map((g, gi) => (
          <Reveal key={g.name} delay={gi * 0.08}>
            <h3>
              <MonoLabel tone="dim">{g.name}</MonoLabel>
            </h3>
            <ul className="mt-5 flex flex-col gap-3.5 border-l border-hairline pl-5">
              {g.nodes.map((n) => {
                const meta = layout.get(n.id);
                const even = (meta?.index ?? 0) % 2 === 0;
                return (
                  <li key={n.id} className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 bg-pulse/70",
                        even ? "led" : "led-b",
                      )}
                    />
                    <span
                      className="text-[15px] text-ink"
                      style={{ fontWeight: n.weight }}
                    >
                      {n.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
