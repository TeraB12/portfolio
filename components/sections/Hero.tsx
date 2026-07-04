"use client";

/**
 * PULSO · Hero (id "inicio"): el sistema hace boot ante tus ojos.
 *
 * Coreografía: el ECG se dibuja (HeroSignal), y las letras del nombre se
 * resuelven justo cuando el primer latido global cruza debajo (delay =
 * bootDelaySeconds() + FIRST_BEAT_MS + 0.2). Después llegan tagline, CTAs y
 * la telemetría honesta. Todo animado on-mount (es un boot, no un reveal de
 * scroll). Con prefers-reduced-motion: todo estático y legible.
 *
 * Hero stack (máx 4 elementos de texto): telemetría, nombre, subtítulo, CTAs.
 */

import { useMemo, type MouseEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { HERO, IDENTITY, NAV } from "@/content/data";
import { bootDelaySeconds } from "@/lib/boot";
import { EASE } from "@/lib/motion";
import { PULSE_TIMING } from "@/lib/pulse";
import { scrollToHash } from "@/lib/scroll";
import { useUptime } from "@/lib/telemetry";
import { HeroSignal } from "@/components/signal/HeroSignal";
import { ButtonLink } from "@/components/ui/Button";
import { Led } from "@/components/ui/Led";

/** stagger entre letras del nombre */
const LETTER_STAGGER = 0.045;

/** margen izquierdo del hero: px-6 en mobile, 6vw en md, carril de spine en lg */
const LEFT_RAIL = "pl-6 md:pl-[6vw] lg:pl-[max(6vw,6.5rem)]";

/** una línea del nombre, letra por letra: rise 24px + blur 8→0 */
function BootLetters({
  text,
  from,
  base,
  reduced,
}: {
  text: string;
  /** índice acumulado para que la cascada continúe entre líneas */
  from: number;
  base: number;
  reduced: boolean;
}) {
  return (
    <span aria-hidden className="block">
      {text.split("").map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block will-change-transform"
          initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: 0.7,
                  ease: EASE,
                  delay: base + (from + i) * LETTER_STAGGER,
                }
          }
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/** fade + rise del boot (on-mount, con delay coreografiado) */
function BootRise({
  delay,
  reduced,
  className,
  children,
}: {
  delay: number;
  reduced: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={
        reduced ? { duration: 0 } : { duration: 0.7, ease: EASE, delay }
      }
    >
      {children}
    </motion.div>
  );
}

/** hoja del uptime: solo este nodo re-renderiza por segundo (en mobile está oculto) */
function UptimeReadout() {
  const uptime = useUptime();
  return (
    <p className="hidden text-dim tabular-nums md:block">
      {`UPTIME ${uptime || "00:00:00"}`}
    </p>
  );
}

/** resalta la palabra clave del tagline en peso 700 */
function Keyword({ text, word }: { text: string; word: string }) {
  const at = text.indexOf(word);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <b className="font-bold">{word}</b>
      {text.slice(at + word.length)}
    </>
  );
}

export function Hero() {
  const reduced = !!useReducedMotion();

  /** las letras se resuelven cuando el primer latido cruza debajo del nombre */
  const base = useMemo(
    () => bootDelaySeconds() + PULSE_TIMING.FIRST_BEAT_MS / 1000 + 0.2,
    [],
  );

  const go = (hash: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToHash(hash);
  };

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-16 md:block"
    >
      {/* capa fondo (solo md+): el electrocardiograma a pantalla completa.
          En mobile el ECG vive como franja EN FLUJO entre el nombre y el texto:
          así jamás puede pisar la tipografía, mida lo que mida la pantalla. */}
      <div aria-hidden className="absolute inset-0 hidden md:block">
        <HeroSignal yRatio={0.62} />
      </div>

      {/* telemetría honesta: el único bloque mono del hero */}
      <motion.div
        className="mono-label absolute right-6 top-24 z-10 space-y-1.5 text-right md:right-12"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 0.8, ease: EASE, delay: base + 1.25 }
        }
      >
        <p className="flex items-center justify-end gap-2">
          <Led />
          <span className="text-pulse">{NAV.statusLabel}</span>
        </p>
        <p className="text-dim">{IDENTITY.locationShort}</p>
        <UptimeReadout />
      </motion.div>

      {/* nombre monumental, por encima del canvas */}
      <div className={`relative z-10 pt-[7vh] md:pt-[9vh] ${LEFT_RAIL}`}>
        <h1
          aria-label={`${IDENTITY.firstName} ${IDENTITY.lastName}`}
          className="font-display text-[clamp(4.5rem,11vw,9.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-ink max-[374px]:text-[3.5rem]"
        >
          <BootLetters
            text={IDENTITY.firstName}
            from={0}
            base={base}
            reduced={reduced}
          />
          <BootLetters
            text={IDENTITY.lastName}
            from={IDENTITY.firstName.length}
            base={base}
            reduced={reduced}
          />
        </h1>
      </div>

      {/* mobile: la señal como franja propia, "subrayando" el nombre */}
      <div aria-hidden className="relative mt-10 h-20 w-full md:hidden">
        <HeroSignal yRatio={0.5} />
      </div>

      {/* debajo de la línea del ECG: tagline + subline + CTAs.
          Mobile: en flujo, empujado hacia abajo (mt-auto). Desktop: absoluto,
          anclado abajo o al 66% según la altura real del viewport. */}
      <div
        className={`relative z-10 mt-auto pb-10 pr-6 md:absolute md:inset-x-0 md:bottom-6 md:mt-0 md:pb-0 md:pr-12 [@media(min-width:768px)_and_(min-height:760px)]:bottom-auto [@media(min-width:768px)_and_(min-height:760px)]:top-[66%] ${LEFT_RAIL}`}
      >
        <BootRise delay={base + 0.75} reduced={reduced}>
          <p className="text-base text-ink sm:text-lg md:text-xl">
            <Keyword text={IDENTITY.heroTagline} word="opero" />
          </p>
        </BootRise>

        <BootRise delay={base + 0.9} reduced={reduced}>
          <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-dim md:text-[17px]">
            {IDENTITY.heroSubline}
          </p>
        </BootRise>

        <BootRise
          delay={base + 1.05}
          reduced={reduced}
          className="mt-7 flex flex-col gap-4 sm:flex-row"
        >
          <ButtonLink
            href="#contacto"
            onClick={go("#contacto")}
            className="w-full sm:w-auto"
          >
            {HERO.ctaPrimary}
          </ButtonLink>
          <ButtonLink
            variant="ghost"
            href="#proyectos"
            onClick={go("#proyectos")}
            className="w-full sm:w-auto"
          >
            {HERO.ctaSecondary}
          </ButtonLink>
        </BootRise>
      </div>
    </section>
  );
}
