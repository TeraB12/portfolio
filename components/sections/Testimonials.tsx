"use client";

import { ArrowUpRight } from "lucide-react";
import { Led } from "@/components/ui/Led";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { ButtonLink } from "@/components/ui/Button";
import { TESTIMONIALS } from "@/content/data";

/**
 * Testimonios · prueba real única.
 *
 * HONESTO: acá no se inventan testimonios jamás. Todavía no hay citas escritas,
 * así que en vez de un hueco mostramos prueba verificable (un cliente operando
 * y sus revendedores activos) con link a la tienda en vivo. El punto led late
 * con el reloj global: el instrumento recibió señal. La entrada es un Reveal
 * simple (blur + 12px), que ya degrada a estático con prefers-reduced-motion.
 */
export function Testimonials() {
  const { proof } = TESTIMONIALS;
  return (
    <Section id="testimonios">
      <SectionTitle title={TESTIMONIALS.title} />

      <Reveal y={12}>
        <figure className="hatch flex min-h-[320px] flex-col items-center justify-center gap-7 border border-hairline p-8 text-center sm:p-12 md:p-20">
          <div className="flex items-center gap-3">
            <Led />
            <MonoLabel tone="dim">{proof.label}</MonoLabel>
          </div>

          <blockquote className="max-w-[46ch] font-display text-xl font-medium leading-snug text-ink md:text-[clamp(1.4rem,2.6vw,2rem)]">
            {proof.text}
          </blockquote>

          <ButtonLink
            variant="ghost"
            href={proof.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {proof.ctaLabel}
            <ArrowUpRight aria-hidden className="ml-2 h-4 w-4" strokeWidth={1.5} />
          </ButtonLink>
        </figure>
      </Reveal>
    </Section>
  );
}
