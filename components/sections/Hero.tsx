"use client";

import { useEffect, useRef } from "react";
import { HeroPulse } from "@/components/signal/HeroPulse";
import { Cta } from "@/components/ui/Cta";
import { HERO } from "@/content/data";
import { rd } from "@/lib/utils";

/**
 * El hero: el pulso 3D atrás, un scrim radial para que el texto se lea y el
 * contenido apoyado abajo. Al scrollear el canvas se va más lento que la
 * página y el texto se desvanece: la profundidad la da el desfasaje.
 */
export function Hero() {
  const layer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let queued = false;
    const apply = () => {
      queued = false;
      const y = window.scrollY;
      if (layer.current) {
        layer.current.style.transform = `translate3d(0,${(y * 0.24).toFixed(1)}px,0)`;
      }
      if (inner.current) {
        inner.current.style.transform = `translate3d(0,${(y * 0.09).toFixed(1)}px,0)`;
        inner.current.style.opacity = Math.max(0, 1 - y / 620).toFixed(3);
      }
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="inicio"
      className="relative flex min-h-[92vh] items-end pt-[132px]"
    >
      <div ref={layer} className="absolute inset-0">
        <HeroPulse />
      </div>

      {/* scrim: sin esto el titular pelea contra el pulso */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(115% 80% at 8% 42%, rgba(10,10,8,0.94) 0%, rgba(10,10,8,0.72) 38%, rgba(10,10,8,0) 72%)",
        }}
      />
      {/* hairline dorada: alto FIJO en px, con % atraviesa el titular en
          pantallas bajas */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[38%] top-0 h-[104px] w-px"
        style={{
          background:
            "linear-gradient(180deg,rgba(233,178,62,0.42) 0%,rgba(233,178,62,0) 100%)",
        }}
      />

      <div
        ref={inner}
        className="shell relative w-full pb-[clamp(56px,7vw,96px)]"
      >
        <div
          data-reveal="rise"
          style={rd(220)}
          className="mb-[clamp(24px,3vw,38px)] flex items-center gap-3"
        >
          <span aria-hidden className="h-px w-[34px] bg-accent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-60">
            {HERO.eyebrow}
          </span>
        </div>

        <h1
          data-reveal="mask"
          style={rd(340)}
          className="t-h1 max-w-[16ch] text-balance"
        >
          {HERO.titleTop[0]}
          <br />
          {HERO.titleTop[1]}
          <span className="block text-ink-50">{HERO.titleBottom}</span>
        </h1>

        <div className="mt-[clamp(32px,4vw,52px)] flex flex-wrap items-end gap-[clamp(28px,5vw,72px)]">
          <p
            data-reveal="rise"
            style={rd(460)}
            className="max-w-[46ch] text-[clamp(16px,1.35vw,19px)] leading-[1.55] text-ink-70"
          >
            {HERO.intro}
          </p>
          <div
            data-reveal="rise"
            style={rd(580)}
            className="flex flex-wrap gap-3"
          >
            <Cta
              href={HERO.ctaPrimary.href}
              magnetic
              arrow
              className="px-[26px] py-[17px] text-[14px] tracking-[-0.01em]"
            >
              {HERO.ctaPrimary.label}
            </Cta>
            <Cta
              href={HERO.ctaSecondary.href}
              variant="outline"
              magnetic
              className="px-[26px] py-[17px] text-[14px]"
            >
              {HERO.ctaSecondary.label}
            </Cta>
          </div>
        </div>
      </div>
    </section>
  );
}
