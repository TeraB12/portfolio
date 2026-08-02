import { cn } from "@/lib/utils";

/**
 * Punto de estado que late. Verde = en producción / operativo.
 * Es de los pocos círculos del sitio: todo lo demás es recto.
 */
export function Dot({
  size = 7,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("dot shrink-0", className)}
      style={{ width: size, height: size }}
    />
  );
}
