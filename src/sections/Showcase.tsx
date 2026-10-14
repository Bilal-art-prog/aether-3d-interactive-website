import { setHotspot } from "@/store/experience";
import { useSimUi } from "@/hooks/useSim";

const HOTSPOTS = [
  {
    id: "core" as const,
    n: "01",
    title: "AERODYNAMIC CORE",
    copy: "A laminar spine that reforms 400 times a second. Drag is not fought. It is composed.",
    className: "top-[18%] left-[6%] lg:left-[14%]",
  },
  {
    id: "surface" as const,
    n: "02",
    title: "INTELLIGENT SURFACE",
    copy: "A living skin of micro-actuators. Temperature, airflow, and light become one language.",
    className: "top-[36%] right-[6%] lg:right-[16%]",
  },
  {
    id: "light" as const,
    n: "03",
    title: "PRECISION LIGHTING",
    copy: "A single champagne slit. Presence without glare. Signal without noise.",
    className: "bottom-[26%] left-[14%] lg:left-[28%]",
  },
];

export function Showcase() {
  const ui = useSimUi();
  const active = HOTSPOTS.find((h) => h.id === ui.hotspot);

  return (
    <section id="showcase" className="relative z-10 h-[170vh] md:h-[220vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/75" />

        <div className="relative flex items-start justify-between px-5 pt-24 sm:px-8 lg:px-12">
          <div>
            <p className="tracking-label text-champagne">002 — LUMEN</p>
            <h2 className="mt-4 font-serif text-4xl font-light text-paper sm:text-5xl">The machine</h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm leading-relaxed text-fog md:block">
            Select a node. Each mark is a decision we refused to hide.
          </p>
        </div>

        <div className="relative hidden flex-1 md:block">
          {HOTSPOTS.map((h) => {
            const on = ui.hotspot === h.id;
            return (
              <button
                key={h.id}
                type="button"
                data-cursor="interactive"
                onClick={() => setHotspot(on ? null : h.id)}
                className={`absolute flex items-center gap-3 py-2 pr-3 text-left ${h.className}`}
                aria-expanded={on}
              >
                <span
                  className={`hotspot-dot h-2.5 w-2.5 rounded-full ${on ? "bg-champagne" : "bg-paper"}`}
                />
                <span className="tracking-label text-[10px] text-paper/80">{h.title}</span>
              </button>
            );
          })}
        </div>

        <div className="relative mt-auto px-5 pb-8 sm:px-8 lg:px-12">
          <div className="mb-5 flex gap-2 overflow-x-auto md:hidden">
            {HOTSPOTS.map((h) => {
              const on = ui.hotspot === h.id;
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setHotspot(on ? null : h.id)}
                  className={`shrink-0 border px-3 py-2 text-[10px] tracking-[0.2em] ${
                    on ? "border-champagne text-champagne" : "border-paper/20 text-fog"
                  }`}
                >
                  {h.n} {h.title}
                </button>
              );
            })}
          </div>
          <div className="max-w-lg border-t border-paper/10 pt-6 min-h-[7.5rem]">
            {active ? (
              <div>
                <p className="tracking-label text-champagne">
                  {active.n} / {active.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ash sm:text-base">{active.copy}</p>
              </div>
            ) : (
              <p className="text-sm text-fog">Choose a hotspot to inspect the architecture.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
