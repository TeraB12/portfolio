import { cn } from "@/lib/utils";

type Common = {
  variant?: "primary" | "ghost";
  className?: string;
  children: React.ReactNode;
};

const base =
  "inline-flex h-12 select-none items-center justify-center whitespace-nowrap px-7 text-[15px] font-medium tracking-wide transition-all duration-200 active:translate-y-px";

const variants = {
  primary: "bg-pulse text-[#0A0A08] hover:brightness-110",
  ghost:
    "border border-hairline text-ink hover:border-pulse/40 hover:bg-pulse/10",
};

/**
 * Botón de instrumento: rectangular, aristas vivas, golpe de matriz al click.
 * Label de máximo 3 palabras (jamás wrappea).
 */
export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: Common & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}
