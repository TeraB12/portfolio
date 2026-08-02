import { CONTACT } from "@/content/data";
import { QuoteForm } from "@/components/sections/QuoteForm";

/**
 * 08 — Contacto. A la izquierda las dos vías directas, sin formulario de por
 * medio; a la derecha el formulario, que entra al panel de control.
 */
export function Contact() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden border-t border-hairline bg-alt py-[clamp(80px,10vw,140px)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 90% at 20% 20%, rgba(233,178,62,0.1) 0%, rgba(12,12,10,0) 65%)",
        }}
      />

      <div className="shell relative">
        <div className="grid items-start gap-[clamp(40px,5vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]">
          <div>
            <div data-reveal="rise" className="t-eyebrow mb-6">
              {CONTACT.eyebrow}
            </div>
            <h2
              data-reveal="mask"
              className="mb-6 text-[clamp(32px,5vw,68px)] font-semibold leading-[0.96] tracking-[-0.05em]"
            >
              {CONTACT.titleLines[0]}
              <br />
              {CONTACT.titleLines[1]}
            </h2>
            <p
              data-reveal="rise"
              className="mb-9 max-w-[42ch] text-[16px] leading-[1.62] text-ink-70"
            >
              {CONTACT.intro}
            </p>

            <div
              data-reveal="group"
              className="rule-grid border-t border-hairline"
            >
              {CONTACT.direct.map((d) => (
                <a
                  key={d.k}
                  href={d.href}
                  {...(d.external
                    ? { target: "_blank", rel: "noopener" }
                    : {})}
                  className="link-ul flex items-center justify-between gap-4 bg-alt px-[22px] py-5 text-ink transition-colors duration-300 hover:text-accent"
                >
                  <span>
                    <span className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-50">
                      {d.k}
                    </span>
                    <span className="inline-block pb-[3px] text-[clamp(16px,1.4vw,19px)] font-medium leading-[1.5] tracking-[-0.02em] [overflow-wrap:anywhere]">
                      {d.v}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="font-mono text-[12px] opacity-50"
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
