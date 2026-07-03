"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { NAV } from "@/content/data";
import { Led } from "@/components/ui/Led";
import { scrollToHash, scrollToTop } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/**
 * Nav de instrumento: nombre, links en mono y el LED de estado de la sesión
 * (late con el reloj global: estado real, no adorno).
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 32));

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToHash(href);
  };

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between px-6 transition-colors duration-300 md:px-12",
        scrolled && "border-b border-hairline bg-bg/85 backdrop-blur-sm",
      )}
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <a
        href="#inicio"
        onClick={(e) => {
          e.preventDefault();
          scrollToTop();
        }}
        className="font-display text-[15px] font-bold tracking-tight text-ink"
        aria-label="Volver al inicio"
      >
        Mateo Pereyra
      </a>

      <nav className="flex items-center gap-7" aria-label="Principal">
        {NAV.links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => go(e, l.href)}
            className={cn(
              "px-2 py-5 -mx-2 font-mono text-[12px] uppercase tracking-[0.14em] text-dim transition-colors hover:text-pulse",
              i < NAV.links.length - 1 && "hidden md:inline",
            )}
          >
            {l.label}
          </a>
        ))}
        <span
          className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-dim sm:flex"
          title="Sesión en vivo"
        >
          <Led />
          {NAV.statusLabel}
        </span>
      </nav>
    </motion.header>
  );
}
