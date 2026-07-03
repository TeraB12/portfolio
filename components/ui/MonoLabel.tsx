import { cn } from "@/lib/utils";

/**
 * Etiqueta de instrumento (mono, 11px, caja alta).
 * RACIONADA: máximo 4 eyebrows en todo el sitio (ver DESIGN.md §5).
 */
export function MonoLabel({
  children,
  className,
  tone = "amber",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "amber" | "dim";
}) {
  return (
    <span
      className={cn(
        "mono-label",
        tone === "amber" ? "text-pulse" : "text-dim",
        className,
      )}
    >
      {children}
    </span>
  );
}
