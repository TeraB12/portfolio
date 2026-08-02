import { HISTORY } from "@/content/data";
import { Dot } from "@/components/ui/Dot";

/**
 * 07 — La historia. Ocho celdas iguales, de 2022 a hoy. La única marca dorada
 * es el mes en que la primera empresa empezó a vender con el sistema, y el
 * único punto que late es HOY.
 */
export function History() {
  return (
    <section className="border-t border-hairline py-[clamp(80px,10vw,132px)]">
      <div className="shell">
        <div data-reveal="rise" className="t-eyebrow mb-[22px]">
          {HISTORY.eyebrow}
        </div>
        <h2
          data-reveal="mask"
          className="t-h2 mb-[clamp(44px,5vw,64px)] max-w-[24ch]"
        >
          {HISTORY.title}
        </h2>

        <div className="rule-grid border-t border-hairline [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
          {HISTORY.events.map((e) => (
            <div
              key={e.stamp}
              data-reveal="rise"
              className="flex flex-col gap-3 bg-bg p-[26px]"
            >
              <div className="flex items-center gap-2.5">
                {e.tone === "live" ? (
                  <Dot />
                ) : (
                  <span
                    aria-hidden
                    className={`h-[7px] w-[7px] ${
                      e.tone === "accent"
                        ? "bg-accent"
                        : "bg-[rgba(244,241,234,0.3)]"
                    }`}
                  />
                )}
                <span
                  className={`font-mono text-[11px] tracking-[0.16em] ${
                    e.tone === "accent"
                      ? "text-accent"
                      : e.tone === "live"
                        ? "text-signal"
                        : "text-ink-35"
                  }`}
                >
                  {e.stamp}
                </span>
              </div>
              <h3 className="text-[20px] leading-[1.15] tracking-[-0.03em]">
                {e.title}
              </h3>
              <p className="text-[14px] leading-[1.6] text-ink-45">
                {e.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
