"use client";

/**
 * PULSO · Sección La empresa (id "empresa").
 * Split asimétrico 7/5 con texto dominante: a la izquierda quién es Pulso
 * (párrafos revelados por máscara + los tres pilares de la empresa); a la
 * derecha el fundador tratado como espécimen de instrumento (marco con ticks,
 * una única pasada de scanline) con su bio, porque saber quién está atrás baja
 * el miedo a contratar. El glow del retrato late con el reloj global vía CSS
 * (clase led-b), acá no hay ningún loop propio.
 */

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { maskRise, VIEWPORT_ONCE } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { ABOUT, FOUNDER } from "@/content/data";

/** contenedor de párrafos: stagger entre las máscaras */
const paragraphsParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/**
 * Pasada única de scanline: el "carro" (inset-0) arranca una altura completa
 * por encima del marco y baja hasta apoyarse, así la línea que vive en su borde
 * inferior recorre del top al bottom solo con transform. Al llegar, se apaga.
 */
const scanPass: Variants = {
  hidden: { y: "-100%", opacity: 1 },
  visible: {
    y: "0%",
    opacity: 0,
    transition: {
      y: { duration: 1.2, ease: "linear", delay: 0.25 },
      opacity: { duration: 0.15, delay: 1.3 },
    },
  },
};

/** ticks de instrumento en las 4 esquinas del marco (marcas de registro) */
function CornerTicks() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <span className="absolute left-0 top-0 h-px w-4 bg-pulse/70" />
      <span className="absolute left-0 top-0 h-4 w-px bg-pulse/70" />
      <span className="absolute right-0 top-0 h-px w-4 bg-pulse/70" />
      <span className="absolute right-0 top-0 h-4 w-px bg-pulse/70" />
      <span className="absolute bottom-0 left-0 h-px w-4 bg-pulse/70" />
      <span className="absolute bottom-0 left-0 h-4 w-px bg-pulse/70" />
      <span className="absolute bottom-0 right-0 h-px w-4 bg-pulse/70" />
      <span className="absolute bottom-0 right-0 h-4 w-px bg-pulse/70" />
    </div>
  );
}

/** retrato del fundador como espécimen: marco 4/5, duotono ámbar, scanline única */
function SpecimenFrame({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[200px] border border-hairline bg-surface md:mx-0 md:max-w-[320px]">
      {/* conector: ancla visual del espécimen a la spine (solo desktop) */}
      <span
        aria-hidden
        className="absolute right-full top-1/2 hidden h-px w-12 bg-pulse/20 lg:block"
      />

      {/* la foto, tratada como espécimen: grayscale + tinte ámbar del sistema */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/mateo.jpeg"
          alt={`Retrato de ${FOUNDER.name}, ${FOUNDER.role.toLowerCase()} de Pulso`}
          fill
          sizes="(min-width: 768px) 320px, 200px"
          className="object-cover object-top grayscale contrast-[1.08] brightness-[0.72]"
        />
        {/* tinte ámbar: la única luz del sistema también revela el retrato */}
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-color"
          style={{ background: "rgba(255,180,84,0.28)" }}
        />
        {/* viñeta hacia el fondo del sitio: el espécimen pertenece a la oscuridad */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,8,0.55) 0%, transparent 38%)",
          }}
        />
      </div>

      {/* respiración de luz ámbar: late con el reloj global */}
      <div
        aria-hidden
        className="led-b absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(255,180,84,0.08) 0%, transparent 65%)",
        }}
      />

      <CornerTicks />

      {/* una ÚNICA pasada de scanline al entrar al viewport */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div variants={scanPass} className="absolute inset-0">
            <span className="absolute inset-x-0 bottom-0 h-px bg-pulse/60" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

/** los tres pilares de la empresa: equipo, IA y sistemas en producción */
function Pillars() {
  return (
    <ul className="mt-12 divide-y divide-hairline border-y border-hairline">
      {ABOUT.pillars.map((p) => (
        <li
          key={p.k}
          className="grid gap-x-6 gap-y-1 py-5 md:grid-cols-[120px_1fr]"
        >
          <MonoLabel tone="dim">{p.k}</MonoLabel>
          <div>
            <p className="font-medium text-ink">{p.t}</p>
            <p className="mt-1 max-w-[52ch] text-[15px] leading-relaxed text-dim">
              {p.d}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** ficha técnica: filas key/value separadas por hairlines */
function TechSheet() {
  return (
    <dl className="mt-8 divide-y divide-hairline border-t border-hairline">
      {ABOUT.ficha.map((row) => (
        <div
          key={row.k}
          className="flex items-baseline justify-between gap-6 py-3"
        >
          <dt>
            <MonoLabel tone="dim">{row.k}</MonoLabel>
          </dt>
          <dd className="text-right text-sm font-medium text-ink">{row.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** el fundador: quién está del otro lado del teléfono */
function FounderCard() {
  return (
    <div className="mt-8">
      <MonoLabel tone="amber">{FOUNDER.label}</MonoLabel>
      <p className="mt-3 font-display text-2xl font-bold tracking-[-0.01em] text-ink">
        {FOUNDER.name}
      </p>
      <p className="mt-1 text-sm text-pulse">{FOUNDER.role}</p>

      <div className="mt-5 space-y-4">
        {FOUNDER.bio.map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-dim">
            {p}
          </p>
        ))}
      </div>

      <blockquote className="mt-6 border-l border-pulse/40 pl-5 text-[15px] leading-relaxed text-ink">
        {FOUNDER.quote}
      </blockquote>
    </div>
  );
}

export function About() {
  const reduced = useReducedMotion();

  return (
    <Section id="empresa">
      <SectionTitle title={ABOUT.title} />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Columna de texto dominante: la empresa */}
        <div className="lg:col-span-7">
          <motion.div
            className="max-w-[60ch] space-y-6"
            variants={paragraphsParent}
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            {ABOUT.paragraphs.map((p, i) => (
              <div key={i} className="overflow-hidden">
                <motion.p
                  variants={maskRise}
                  className={
                    i === 0
                      ? "text-lg leading-relaxed text-ink md:text-xl"
                      : "text-[17px] leading-relaxed text-dim"
                  }
                >
                  {p}
                </motion.p>
              </div>
            ))}
          </motion.div>

          <Reveal delay={0.1}>
            <Pillars />
          </Reveal>
        </div>

        {/* El fundador + la ficha de la empresa */}
        <div className="lg:col-span-5">
          <Reveal delay={0.15} className="lg:max-w-[360px]">
            <SpecimenFrame reduced={!!reduced} />
            <FounderCard />
            <TechSheet />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
