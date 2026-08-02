import { SERVICES } from "@/content/data";

/**
 * 02 — Qué hacemos.
 *
 * NO son tarjetas: son las filas de un índice. Cuatro renglones separados por
 * hairlines, con el número a la izquierda, el título y su línea de
 * especificación en mono, y la explicación a la derecha. En el hover la fila
 * se enciende entera y una línea dorada crece desde la izquierda (ver .svc-row
 * en globals.css).
 */
export function Services() {
  return (
    <section
      id="servicios"
      className="shell py-[clamp(72px,9vw,120px)]"
    >
      <div className="mb-[clamp(44px,5vw,68px)]">
        <div data-reveal="rise" className="t-eyebrow mb-[22px]">
          {SERVICES.eyebrow}
        </div>
        <h2 data-reveal="mask" className="t-h2 max-w-[22ch]">
          {SERVICES.title}
        </h2>
      </div>

      <div className="border-t border-line">
        {SERVICES.items.map((item) => (
          <div
            key={item.n}
            data-reveal="rise"
            className="svc-row relative grid items-start gap-x-[clamp(14px,3vw,44px)] gap-y-3 border-b border-hairline py-[clamp(24px,2.6vw,36px)] pr-[clamp(12px,1.4vw,18px)] [grid-template-columns:44px_1fr] lg:[grid-template-columns:44px_minmax(200px,1fr)_minmax(230px,1.3fr)]"
          >
            <span className="svc-num pt-[9px] font-mono text-[12px] tracking-[0.14em] text-ink-50">
              {item.n}
            </span>
            <div>
              <h3 className="t-h3 mb-3.5">{item.name}</h3>
              <p className="font-mono text-[10.5px] uppercase leading-[1.95] tracking-[0.1em] text-ink-45">
                {item.spec}
              </p>
            </div>
            <p className="col-start-2 text-[15px] leading-[1.64] text-ink-50 lg:col-start-3">
              {item.detail}
            </p>
            <span
              aria-hidden
              className="svc-mark absolute inset-x-0 -bottom-px h-px bg-accent"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
