"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { hasBooted, markBooted, PRELOADER_MS } from "@/lib/boot";
import { EASE } from "@/lib/motion";

/**
 * Boot del sistema: una línea ámbar se dibuja, late una vez y el sitio enciende.
 * Corre UNA vez por sesión; con reduced-motion no corre.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (hasBooted() || reduced) {
      markBooted();
      // gate post-hidratación intencional: sessionStorage solo existe en el
      // cliente; un único re-render para descartar el overlay en revisitas
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      markBooted();
      setVisible(false);
      document.body.style.overflow = "";
    }, PRELOADER_MS);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden
          data-preloader
          className="fixed inset-0 z-[60] flex items-center justify-center bg-bg"
          exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeOut" } }}
        >
          <div className="relative h-px w-[min(60vw,480px)]">
            {/* la línea se dibuja */}
            <motion.div
              className="absolute inset-0 origin-left bg-pulse"
              style={{ boxShadow: "0 0 12px rgba(255,180,84,0.5)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            />
            {/* un único latido antes de encender */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,180,84,0.55), transparent)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.6], opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
