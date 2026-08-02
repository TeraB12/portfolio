"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE = "a, button, input, select, textarea, [data-magnetic]";

/**
 * Cursor de instrumento: un punto dorado de 5px que sigue exacto y un anillo
 * de 32px que llega con retraso (lerp 0.16). Sobre cualquier control el anillo
 * escala a 1.85, sube el alfa del borde y se llena apenas.
 *
 * El cursor NATIVO se mantiene visible a propósito: esto acompaña, no
 * reemplaza, y así no se pierde el feedback del sistema (I-beam en los campos,
 * mano en los links).
 *
 * Solo con puntero fino y sin prefers-reduced-motion.
 */
export function CustomCursor() {
  const [active, setActive] = useState(false);
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    // gate post-hidratación intencional: el server no sabe qué puntero hay
    const update = () => setActive(fine.matches && !reduced.matches);

    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const r = ring.current;
    const d = dot.current;
    if (!r || !d) return;

    let tx = -200;
    let ty = -200;
    let rx = -200;
    let ry = -200;
    let scale = 1;
    let target = 1;
    let shown = false;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        shown = true;
        r.style.opacity = "1";
        d.style.opacity = "1";
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      const hit = !!el?.closest?.(INTERACTIVE);
      target = hit ? 1.85 : 1;
      r.style.backgroundColor = hit ? "rgba(233,178,62,0.12)" : "transparent";
      r.style.borderColor = hit
        ? "rgba(233,178,62,0.8)"
        : "rgba(233,178,62,0.5)";
    };

    let raf = requestAnimationFrame(function loop() {
      raf = requestAnimationFrame(loop);
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      scale += (target - scale) * 0.12;
      r.style.transform = `translate3d(${rx - 16}px,${ry - 16}px,0) scale(${scale.toFixed(3)})`;
      d.style.transform = `translate3d(${tx - 2.5}px,${ty - 2.5}px,0)`;
    });

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div aria-hidden>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-8 w-8 rounded-full border border-[rgba(233,178,62,0.5)] opacity-0 transition-[opacity,background-color,border-color] duration-[350ms]"
        style={{ transform: "translate3d(-200px,-200px,0)" }}
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[201] h-[5px] w-[5px] rounded-full bg-accent opacity-0 transition-opacity duration-[350ms]"
        style={{ transform: "translate3d(-200px,-200px,0)" }}
      />
    </div>
  );
}
