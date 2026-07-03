/**
 * PULSO · Vocabulario de motion compartido.
 * Un solo easing, un solo spring: todo el sitio se mueve con la misma física.
 */

import type { Transition, Variants } from "motion/react";

/** easing global del sitio */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const SPRING: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

/** reveal estándar: sube 24px, aparece y se enfoca */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

/** contenedor con stagger para hijos que usan `reveal` */
export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/** máscara de título: el texto sube desde detrás de un clip */
export const maskRise: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

export const VIEWPORT_ONCE = { once: true, amount: 0.3 } as const;
