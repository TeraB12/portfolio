"use client";

import { useRef, type ReactNode } from "react";
import { scrollToHash } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const EASE = "cubic-bezier(.16,1,.3,1)";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden text-center";

const variants = {
  /** dorado, con barrido blanco cálido */
  solid: "bg-accent text-[#0A0A08] font-semibold",
  /** borde fino, sin barrido */
  outline:
    "border border-line text-ink font-medium transition-[border-color,background-color,color] duration-300 hover:border-ink hover:bg-[rgba(244,241,234,0.05)]",
  /** borde fino que se vuelve dorado (links de proyecto) */
  outlineAccent:
    "border border-line text-ink font-medium transition-[border-color,color] duration-300 hover:border-accent hover:text-accent",
};

type Props = {
  children: ReactNode;
  variant?: keyof typeof variants;
  /** flecha ↗ que se despega en el hover */
  arrow?: boolean;
  /** sigue al cursor hasta 9px en X y 6px en Y */
  magnetic?: boolean;
  className?: string;
} & (
  | { href: string; external?: boolean; onClick?: never; type?: never; disabled?: never }
  | {
      href?: never;
      external?: never;
      onClick?: () => void;
      type?: "button" | "submit";
      disabled?: boolean;
    }
);

/**
 * El único botón del sitio.
 *
 * El barrido del `solid` entra por la izquierda y SALE por la derecha: al
 * soltar el mouse la capa sigue de largo y recién después vuelve a su lugar
 * sin transición. Eso no se puede hacer con CSS solo, de ahí el JS.
 */
export function Cta({
  children,
  variant = "solid",
  arrow = false,
  magnetic = false,
  className,
  href,
  external,
  onClick,
  type = "button",
  disabled,
}: Props) {
  const el = useRef<HTMLElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const reset = useRef<number | undefined>(undefined);
  const sweep = variant === "solid";

  const onEnter = () => {
    const f = fill.current;
    if (!f) return;
    window.clearTimeout(reset.current);
    f.style.transition = `transform .6s ${EASE}`;
    f.style.transform = "translateX(0%)";
  };

  const onLeave = () => {
    const f = fill.current;
    if (f) {
      f.style.transform = "translateX(101%)";
      reset.current = window.setTimeout(() => {
        f.style.transition = "none";
        f.style.transform = "translateX(-101%)";
        requestAnimationFrame(() => {
          f.style.transition = `transform .6s ${EASE}`;
        });
      }, 620);
    }
    if (magnetic && el.current) {
      el.current.style.transition = `transform .75s ${EASE}`;
      el.current.style.transform = "translate(0,0)";
    }
  };

  const onMove = (e: React.MouseEvent) => {
    if (!magnetic || !el.current) return;
    const r = el.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    el.current.style.transition = "transform .18s ease-out";
    el.current.style.transform = `translate(${(dx * 9).toFixed(2)}px,${(dy * 6).toFixed(2)}px)`;
  };

  const inner = (
    <>
      {sweep && (
        <span
          ref={fill}
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-full bg-ink"
          style={{ transform: "translateX(-101%)" }}
        />
      )}
      <span className="relative inline-flex items-center gap-2.5">
        {children}
        {arrow && (
          <span
            aria-hidden
            className="inline-block font-mono text-[11px] opacity-65 transition-transform duration-[450ms] ease-site group-hover:translate-x-[4px] group-hover:-translate-y-[4px]"
          >
            ↗
          </span>
        )}
      </span>
    </>
  );

  const shared = {
    className: cn(base, variants[variant], className),
    onMouseEnter: sweep ? onEnter : undefined,
    onMouseLeave: sweep || magnetic ? onLeave : undefined,
    onMouseMove: magnetic ? onMove : undefined,
    ...(magnetic ? { "data-magnetic": "" } : {}),
  };

  if (href !== undefined) {
    const isHash = href.startsWith("#");
    return (
      <a
        ref={el as React.RefObject<HTMLAnchorElement>}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener" } : {})}
        onClick={
          isHash
            ? (e) => {
                e.preventDefault();
                scrollToHash(href);
              }
            : undefined
        }
        {...shared}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={el as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...shared}
    >
      {inner}
    </button>
  );
}
