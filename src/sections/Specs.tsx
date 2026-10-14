const SPECS = [
  { label: "0–100 KM/H", suffix: "SEC", count: "2.8", decimals: "1" },
  { label: "RANGE", suffix: "KM", count: "780", decimals: "0" },
  { label: "POWER", suffix: "HP", count: "820", decimals: "0" },
  { label: "MASS", suffix: "KG", count: "1240", decimals: "0" },
];

export function Specs() {
  return (
    <section id="specs" className="relative z-10 bg-graphite">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 lg:px-12">
        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="tracking-label text-champagne" data-reveal>
              006 — MEASURE
            </p>
            <h2 className="mt-5 font-serif text-5xl font-light text-paper" data-reveal>
              Performance, <span className="italic">unannounced</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-fog" data-reveal>
            Numbers for those who require them. The rest is felt.
          </p>
        </div>

        <div className="grid grid-cols-1 border-t border-paper/10 sm:grid-cols-2 lg:grid-cols-4">
          {SPECS.map((spec) => (
            <div key={spec.label} className="border-paper/10 py-10 sm:border-r sm:px-8 sm:first:pl-0 lg:py-14">
              <p className="tracking-label text-fog">{spec.label}</p>
              <p className="mt-6 flex items-baseline gap-3">
                <span
                  data-count={spec.count}
                  data-decimals={spec.decimals}
                  className="font-serif text-6xl font-light tracking-tight text-paper sm:text-7xl"
                >
                  0
                </span>
                <span className="tracking-label text-[10px] text-champagne">{spec.suffix}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
