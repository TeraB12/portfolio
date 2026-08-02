"use client";

import { useEffect, useRef, useState } from "react";
import { COMPANY, NAV } from "@/content/data";
import { Cta } from "@/components/ui/Cta";
import { Dot } from "@/components/ui/Dot";
import { scrollToHash, scrollToTop } from "@/lib/scroll";

/** uptime de la sesión. Devuelve "" hasta que hidrata, así no hay mismatch. */
function useUptime(): string {
  const [value, setValue] = useState("");
  useEffect(() => {
    const t0 = Date.now();
    const p = (n: number) => String(n).padStart(2, "0");
    const tick = () => {
      const s = Math.floor((Date.now() - t0) / 1000);
      setValue(
        `${p(Math.floor(s / 3600))}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}`,
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return value;
}

/**
 * Header fijo con la barra de progreso de scroll pegada abajo.
 * Entra deslizándose desde arriba una sola vez (animación CSS, ver globals).
 */
export function Header() {
  const bar = useRef<HTMLDivElement>(null);
  const uptime = useUptime();

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    let queued = false;

    const apply = () => {
      queued = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
      el.style.width = `${pct.toFixed(2)}%`;
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="header-in fixed inset-x-0 top-0 z-[90] border-b border-[rgba(244,241,234,0.09)] bg-[rgba(10,10,8,0.72)] backdrop-blur-[14px]">
      <div className="shell flex h-[70px] items-center gap-8">
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          className="flex items-baseline gap-2.5 text-ink"
          aria-label={`${COMPANY.name}, volver al inicio`}
        >
          <span className="text-[21px] font-extrabold tracking-[-0.04em]">
            {COMPANY.wordmark}
          </span>
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink-45 sm:inline">
            {COMPANY.descriptor.toLowerCase()}
          </span>
        </a>

        <nav
          className="ml-auto hidden items-center gap-[26px] md:flex"
          aria-label="Principal"
        >
          {NAV.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToHash(l.href);
              }}
              className="link-ul font-mono text-[11px] uppercase tracking-[0.12em] text-ink-60 transition-colors duration-300 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4 md:ml-0">
          {uptime && (
            <div
              className="hidden items-center gap-[7px] lg:flex"
              title="Tiempo de esta sesión"
            >
              <Dot size={6} />
              <span className="font-mono text-[10px] tracking-[0.1em] text-ink-35 tabular-nums">
                UPTIME {uptime}
              </span>
            </div>
          )}
          <Cta
            href={NAV.cta.href}
            magnetic
            className="px-[18px] py-[11px] font-mono text-[11px] font-medium uppercase tracking-[0.1em] whitespace-nowrap"
          >
            {NAV.cta.label}
          </Cta>
        </div>
      </div>

      <div ref={bar} className="h-[2px] w-0 bg-accent" />
    </header>
  );
}
