"use client";

/**
 * PULSO · Footer: barra de estado de sistema.
 * La señal que nació en el hero termina acá, en un punto que late para siempre.
 * Telemetría honesta: uptime real de la sesión, hora real de Córdoba y los
 * segundos desde el último latido del reloj global.
 */

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { FOOTER } from "@/content/data";
import { Led } from "@/components/ui/Led";
import { usePulse } from "@/lib/pulse";
import { scrollToTop } from "@/lib/scroll";
import { useCordobaTime, useUptime } from "@/lib/telemetry";

/**
 * Segundos desde el último latido del reloj global.
 * Devuelve null hasta el primer latido (y siempre con reduced-motion,
 * donde el reloj no corre: telemetría honesta, no se inventa señal).
 */
function useSecondsSinceLastBeat(): number | null {
  const { onBeat } = usePulse();
  const reduced = useReducedMotion();
  const lastBeatAt = useRef<number | null>(null);
  const [seconds, setSeconds] = useState<number | null>(null);

  useEffect(() => {
    if (reduced) return;

    const unsubscribe = onBeat(() => {
      lastBeatAt.current = Date.now();
      setSeconds(0);
    });
    const id = setInterval(() => {
      if (lastBeatAt.current === null) return;
      setSeconds(Math.max(0, Math.floor((Date.now() - lastBeatAt.current) / 1000)));
    }, 1000);

    return () => {
      unsubscribe();
      clearInterval(id);
    };
  }, [onBeat, reduced]);

  return seconds;
}

/** Strip de telemetría mono: items separados por hairlines, sin puntos medios. */
function TelemetryStrip() {
  const uptime = useUptime();
  const time = useCordobaTime();
  const lastSignal = useSecondsSinceLastBeat();

  return (
    <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
      <span>{FOOTER.statusPrefix}</span>

      <span className="border-l border-hairline pl-4 whitespace-nowrap">
        UPTIME <span className="inline-block min-w-[8ch]">{uptime}</span>
      </span>

      <span className="hidden border-l border-hairline pl-4 whitespace-nowrap sm:inline-block">
        <span className="inline-block min-w-[5ch]">{time}</span> CBA
      </span>

      <span className="hidden min-w-[21ch] border-l border-hairline pl-4 whitespace-nowrap sm:inline-block">
        {lastSignal === null ? "" : `ÚLTIMA SEÑAL HACE ${lastSignal}S`}
      </span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-[1400px] px-6 py-10 md:px-12 lg:pl-28 lg:pr-20">
        {/* Fila 1: punto final de la señal + telemetría */}
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Led size="md" />
            <span className="text-sm text-dim">{FOOTER.rights}</span>
          </div>

          <TelemetryStrip />
        </div>

        {/* Fila 2: volver arriba */}
        <div className="mt-8 flex flex-wrap items-center justify-end gap-4">
          <button
            type="button"
            onClick={scrollToTop}
            className="-mx-2 -my-3 inline-flex items-center gap-2 px-2 py-3 font-mono text-[12px] uppercase tracking-wide text-dim transition-colors hover:text-pulse"
          >
            {FOOTER.backToTop}
            <ArrowUp aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </footer>
  );
}
