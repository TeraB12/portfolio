"use client";

/**
 * PULSO · Sección 3: Experiencia.
 * Tabla tipográfica editorial full-width con acordeón. Sin cards, sin eyebrow.
 * Una sola fila abierta a la vez; al expandir, la spine "registra" el evento
 * con una línea ámbar que barre desde la izquierda hacia la fila.
 */

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { EXPERIENCE } from "@/content/data";
import { EASE, VIEWPORT_ONCE, reveal, staggerParent } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

type ExperienceRowData = (typeof EXPERIENCE.rows)[number];

function ExperienceRow({
  row,
  open,
  onToggle,
  reduced,
  buttonId,
  detailId,
}: {
  row: ExperienceRowData;
  open: boolean;
  onToggle: () => void;
  reduced: boolean;
  buttonId: string;
  detailId: string;
}) {
  return (
    <motion.div variants={reveal} className="relative border-b border-hairline">
      {/* Feedback del sistema: la spine registró la expansión */}
      <AnimatePresence>
        {open && !reduced && (
          <motion.span
            aria-hidden
            className="absolute left-0 top-0 h-px w-full origin-left bg-pulse/60 lg:-left-28 lg:w-[calc(100%+7rem)]"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: [1, 1, 0] }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{
              scaleX: { duration: 0.5, ease: EASE },
              opacity: { duration: 1.2, times: [0, 0.5, 1] },
            }}
          />
        )}
      </AnimatePresence>

      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={detailId}
        onClick={onToggle}
        className="grid w-full grid-cols-[1fr_auto] items-start gap-x-4 gap-y-2 py-6 text-left transition-colors duration-300 hover:bg-surface/60 md:grid-cols-[140px_1fr_auto] md:items-baseline md:gap-4 md:py-7"
      >
        <span className="order-1 font-mono text-[12px] tracking-wide text-dim md:order-none">
          {row.period}
        </span>

        <span className="order-3 col-span-2 block md:order-none md:col-span-1">
          <span className="block font-display text-2xl font-bold text-ink md:text-3xl">
            {row.role}
          </span>
          <span className="mt-1 block text-sm font-medium text-pulse">
            {row.org}
          </span>
          <span className="mt-2 block max-w-[60ch] text-[15px] text-dim">
            {row.summary}
          </span>
        </span>

        <motion.span
          aria-hidden
          className="order-2 md:order-none"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
        >
          <ChevronDown className="h-5 w-5 text-dim" strokeWidth={1.5} />
        </motion.span>
      </button>

      {/* El wrapper con id vive siempre en el DOM: aria-controls nunca apunta al vacío */}
      <div id={detailId}>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{
                height: reduced ? "auto" : 0,
                opacity: 0,
                transition: { duration: reduced ? 0 : 0.5, ease: EASE },
              }}
              transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="py-6 pl-0 md:pl-[156px]">
                <p className="max-w-[65ch] leading-relaxed text-dim">
                  {row.detail}
                </p>
                {"certs" in row && row.certs && (
                  <ul className="mt-5 flex max-w-[70ch] flex-wrap gap-2">
                    {row.certs.map((c) => (
                      <li
                        key={c}
                        className="border border-hairline px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/90"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduced = useReducedMotion() ?? false;
  const baseId = useId();

  return (
    <Section id="experiencia">
      <SectionTitle title={EXPERIENCE.title} />

      <motion.div
        variants={staggerParent}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        {EXPERIENCE.rows.map((row, i) => (
          <ExperienceRow
            key={row.org}
            row={row}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            reduced={reduced}
            buttonId={`${baseId}-trigger-${i}`}
            detailId={`${baseId}-detail-${i}`}
          />
        ))}
      </motion.div>
    </Section>
  );
}
