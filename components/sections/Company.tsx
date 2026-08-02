import Image from "next/image";
import { COMPANY_SECTION, FOUNDER } from "@/content/data";
import { Dot } from "@/components/ui/Dot";

/**
 * 05 — La empresa. A la izquierda quiénes somos y la ficha de datos duros;
 * a la derecha el fundador con nombre, cara y cargo. Cuando la empresa es
 * joven, saber a quién vas a tener enfrente baja el miedo a contratar.
 */
export function Company() {
  return (
    <section
      id="empresa"
      className="border-t border-hairline py-[clamp(80px,10vw,140px)]"
    >
      <div className="shell">
        <div data-reveal="rise" className="t-eyebrow mb-[26px]">
          {COMPANY_SECTION.eyebrow}
        </div>

        <div className="grid items-start gap-[clamp(36px,5vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]">
          <div>
            <h2
              data-reveal="mask"
              className="mb-[26px] text-[clamp(32px,4.6vw,62px)] font-semibold leading-[0.98] tracking-[-0.05em]"
            >
              {COMPANY_SECTION.titleTop}
              <br />
              <span className="text-[#7A756D]">
                {COMPANY_SECTION.titleBottom}
              </span>
            </h2>

            {COMPANY_SECTION.paragraphs.map((p, i) => (
              <p
                key={i}
                data-reveal="rise"
                className={`max-w-[48ch] text-[16px] leading-[1.62] text-ink-70 ${
                  i === COMPANY_SECTION.paragraphs.length - 1 ? "mb-8" : "mb-[18px]"
                }`}
              >
                {p}
              </p>
            ))}

            <dl
              data-reveal="group"
              className="rule-grid border-t border-hairline [grid-template-columns:repeat(auto-fit,minmax(min(160px,100%),1fr))]"
            >
              {COMPANY_SECTION.ficha.map((f) => (
                /* la primera ficha va al ras para que "Base" alinee con los
                   párrafos de arriba */
                <div key={f.k} className="bg-bg p-5 first:pl-0">
                  <dt className="t-label mb-2.5 text-ink-50">{f.k}</dt>
                  <dd className="flex items-center gap-2 text-[16px] font-medium tracking-[-0.02em]">
                    {"live" in f && f.live && <Dot size={6} />}
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal="media">
            <div className="border border-[rgba(244,241,234,0.13)] bg-card">
              <div className="relative overflow-hidden bg-[#131311]">
                <Image
                  src={FOUNDER.photo}
                  alt={FOUNDER.photoAlt}
                  width={960}
                  height={1280}
                  sizes="(max-width: 900px) 100vw, 560px"
                  className="block h-auto w-full [filter:grayscale(0.35)_contrast(1.05)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[45%]"
                  style={{
                    background:
                      "linear-gradient(180deg,rgba(14,14,12,0) 0%,rgba(14,14,12,0.92) 100%)",
                  }}
                />
                <div className="absolute inset-x-[22px] bottom-5">
                  <div className="mb-2.5 font-mono text-[9.5px] uppercase tracking-[0.22em] text-accent">
                    {FOUNDER.label}
                  </div>
                  <div className="text-[clamp(21px,2.2vw,28px)] font-semibold leading-[1.05] tracking-[-0.03em]">
                    {FOUNDER.name}
                  </div>
                  <div className="mt-[9px] font-mono text-[11px] uppercase tracking-[0.14em] text-ink-60">
                    {FOUNDER.role}
                  </div>
                </div>
              </div>

              <div className="p-[clamp(22px,2.4vw,30px)]">
                {FOUNDER.bio.map((p, i) => (
                  <p
                    key={i}
                    className={`text-[15px] leading-[1.62] text-ink-60 ${
                      i === FOUNDER.bio.length - 1 ? "mb-6" : "mb-4"
                    }`}
                  >
                    {p}
                  </p>
                ))}
                <blockquote className="t-quote border-t border-[rgba(244,241,234,0.13)] pt-6 text-ink">
                  {FOUNDER.quote}
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
