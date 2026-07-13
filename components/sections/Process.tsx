"use client";

/**
 * PULSO · Cómo trabajamos (id "proceso").
 * Los pasos de la relación con el cliente, de la primera charla al sistema
 * andando. Cada paso es un nodo sobre una hairline con un punto led que late
 * con el reloj global. Desktop: cuatro columnas conectadas; mobile: apilado.
 * Baja el miedo a comprarle a alguien que no conocés: todo claro, sin vueltas.
 */

import { PROCESS } from "@/content/data";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { ButtonLink } from "@/components/ui/Button";
import { scrollToHash } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function Process() {
  return (
    <Section id="proceso">
      <SectionTitle eyebrow={PROCESS.eyebrow} title={PROCESS.title} />

      <Reveal>
        <p className="mb-14 max-w-[52ch] text-lg leading-relaxed text-dim md:mb-20">
          {PROCESS.intro}
        </p>
      </Reveal>

      <ol className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
        {PROCESS.steps.map((step, i) => (
          <li key={step.n}>
            <Reveal delay={i * 0.1}>
              <div className="relative flex flex-col border-t border-hairline pt-6">
                {/* nodo led sobre la línea: el paso "enciende" con el latido */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -top-[3.5px] left-0 h-[7px] w-[7px] bg-pulse",
                    i % 2 === 0 ? "led" : "led-b",
                  )}
                />
                <MonoLabel tone="dim">{`Paso ${step.n}`}</MonoLabel>
                <h3 className="mt-4 font-display text-2xl font-bold leading-tight tracking-[-0.01em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-dim">
                  {step.detail}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal delay={0.2}>
        <div className="mt-14 flex flex-col items-start gap-5 border-t border-hairline pt-10 md:mt-20 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[46ch] text-[15px] leading-relaxed text-dim">
            La primera charla no se cobra ni te compromete a nada. Me escribís, me contás y te respondo yo.
          </p>
          <ButtonLink
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              scrollToHash("#contacto");
            }}
            className="w-full shrink-0 sm:w-auto"
          >
            Pedí tu presupuesto
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
