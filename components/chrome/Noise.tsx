/** Grano global fijo: mata el flat digital. Nunca sobre contenedores que scrollean. */
export function Noise() {
  return (
    <div
      aria-hidden
      className="grain pointer-events-none fixed inset-0 z-[70] opacity-[0.035]"
    />
  );
}
