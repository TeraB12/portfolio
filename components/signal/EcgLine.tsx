import { cn } from "@/lib/utils";

/** El trazo de la marca. Un solo path, dos veces: la traza muerta y la viva. */
const PATH =
  "M0 30 H380 l18 0 l12 -6 l12 10 l12 -4 H470 l10 0 l7 -20 l9 42 l9 -30 l7 8 H580 l20 0 l10 -5 l12 10 l10 -5 H1200";

/**
 * Divisor de electrocardiograma: la línea de fondo queda quieta y un pulso
 * dorado la recorre en loop. El dash largo (90 de 1400) es lo que hace que se
 * lea como UN latido viajando, no como una línea punteada.
 */
export function EcgLine({
  height = 52,
  dash = "90 1310",
  duration = "5.5s",
  trackOpacity = 0.13,
  className,
}: {
  height?: number;
  dash?: string;
  duration?: string;
  trackOpacity?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      className={cn("block w-full overflow-visible", className)}
      style={{ height }}
    >
      <path
        d={PATH}
        fill="none"
        stroke={`rgba(244,241,234,${trackOpacity})`}
        strokeWidth={1.4}
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={PATH}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={1.6}
        vectorEffect="non-scaling-stroke"
        strokeDasharray={dash}
        className="ecg-live"
        style={{ animationDuration: duration }}
      />
    </svg>
  );
}
