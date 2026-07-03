import { cn } from "@/lib/utils";

/**
 * LED de instrumento: cuadrado (aristas vivas, como los racks del Stack),
 * late con el reloj global vía las clases led / led-b.
 */
export function Led({
  size = "sm",
  phase = "a",
  className,
}: {
  size?: "sm" | "md";
  /** desfase del latido: "a" = --pulse, "b" = --pulse-b */
  phase?: "a" | "b";
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block bg-pulse",
        size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2",
        phase === "a" ? "led" : "led-b",
        className,
      )}
    />
  );
}
