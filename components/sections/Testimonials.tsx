"use client";

import { Led } from "@/components/ui/Led";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { TESTIMONIALS } from "@/content/data";

/**
 * Testimonios · cita monumental única.
 *
 * Placeholder HONESTO: acá no se inventan testimonios jamás. La zona se marca
 * como "sin relevar" con achurado diagonal (clase `hatch`) y un punto led que
 * late con el reloj global: el instrumento está encendido, esperando señal.
 * Toda la entrada es un Reveal simple (blur + 12px), que ya degrada a estático
 * con prefers-reduced-motion.
 */
export function Testimonials() {
  return (
    <Section id="testimonios">
      <SectionTitle title={TESTIMONIALS.title} />

      <Reveal y={12}>
        <figure className="hatch flex min-h-[320px] flex-col items-center justify-center gap-6 border border-hairline p-8 text-center sm:p-12 md:p-20">
          <div className="flex items-center gap-3">
            <Led />
            <MonoLabel tone="dim">{TESTIMONIALS.placeholder.label}</MonoLabel>
          </div>

          <blockquote className="max-w-[38ch] font-display text-xl font-medium leading-snug text-dim md:text-[clamp(1.4rem,2.6vw,2rem)]">
            {TESTIMONIALS.placeholder.text}
          </blockquote>
        </figure>
      </Reveal>
    </Section>
  );
}
