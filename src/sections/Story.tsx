const STEPS = [
  { n: "01", title: "DISTANCE", line: "The object, held at arm's length." },
  { n: "02", title: "APPROACH", line: "The air begins to thin." },
  { n: "03", title: "ROTATION", line: "A silhouette that never repeats." },
  { n: "04", title: "DETAIL", line: "Machining as handwriting." },
  { n: "05", title: "ORBIT", line: "Light travels the equator." },
  { n: "06", title: "RETURN", line: "The first view, now earned." },
];

export function Story() {
  return (
    <section id="story" className="relative z-10 h-[280vh] md:h-[420vh]">
      <div className="sticky top-0 flex h-svh flex-col justify-between">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-ink/55 via-transparent to-ink/70" />

        <div className="relative px-5 pt-24 sm:px-8 lg:px-12">
          <p className="tracking-label text-champagne">004 — SEQUENCE</p>
          <h2 className="mt-4 font-serif text-4xl font-light text-paper sm:text-5xl">
            A film, driven by the hand
          </h2>
        </div>

        <div className="relative px-5 pb-10 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                data-story-step
                data-active={i === 0 ? "true" : "false"}
                className="border-t border-paper/15 pt-4 transition-opacity duration-500 data-[active=false]:opacity-30 data-[active=true]:opacity-100"
              >
                <p className="tracking-label text-[10px] text-champagne">{step.n}</p>
                <p className="mt-3 font-serif text-xl text-paper sm:text-2xl">{step.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-fog">{step.line}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
