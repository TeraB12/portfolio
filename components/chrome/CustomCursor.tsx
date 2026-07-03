"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const INTERACTIVE =
  'a, button, input, select, textarea, label, [role="button"], [data-cursor]';

/**
 * Cursor de instrumento: punto ámbar preciso + anillo con física + glow ambiental.
 * Solo en punteros finos; con reduced-motion o touch vuelve el cursor nativo.
 */
export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [seen, setSeen] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 26 });
  const ringY = useSpring(y, { stiffness: 320, damping: 26 });
  const glowX = useSpring(x, { stiffness: 60, damping: 22 });
  const glowY = useSpring(y, { stiffness: 60, damping: 22 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setActive(fine.matches && !reduced.matches);

    // gate post-hidratación intencional: el server renderiza null y recién acá
    // sabemos si el dispositivo tiene puntero fino (un solo re-render al montar)
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

    document.documentElement.classList.add("cursor-custom");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setSeen(true);
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      setHovering(!!t?.closest?.(INTERACTIVE));
    };
    const onLeave = () => setSeen(false);
    const onEnter = () => setSeen(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);

    return () => {
      document.documentElement.classList.remove("cursor-custom");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
    };
  }, [active, x, y]);

  if (!active) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50">
      {/* glow ambiental: el sistema siente al visitante */}
      <motion.div
        className="absolute h-[520px] w-[520px] rounded-full"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(closest-side, rgba(255,180,84,0.05), transparent 70%)",
          opacity: seen ? 1 : 0,
        }}
      />
      {/* anillo con física */}
      <motion.div
        className="absolute h-7 w-7 rounded-full border border-pulse/50"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: hovering ? 1.6 : 1,
          backgroundColor: hovering
            ? "rgba(255,180,84,0.12)"
            : "rgba(255,180,84,0)",
          opacity: seen ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
      {/* punto preciso */}
      <motion.div
        className="absolute h-1 w-1 rounded-full bg-pulse"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          opacity: seen ? 1 : 0,
        }}
      />
    </div>
  );
}
