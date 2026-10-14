import metal from "@/assets/metal-skin.jpg";

const PRINCIPLES = [
  {
    n: "I",
    title: "Silence is a material",
    copy: "We treat quiet as something to be milled, polished, and fitted. If a part can be heard, it is unfinished.",
  },
  {
    n: "II",
    title: "Motion without friction",
    copy: "The ideal journey has no edges. Surfaces meet as if they were always one. Resistance is a design error.",
  },
  {
    n: "III",
    title: "Form follows tomorrow",
    copy: "We do not style the present. We prototype the etiquette of a future that has not asked for us yet.",
  },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="relative z-10 bg-ink">
      <div id="philosophy-pin" className="relative overflow-hidden">
        <div className="px-5 pt-28 sm:px-8 lg:px-12">
          <p className="tracking-label text-champagne" data-reveal>
            005 — ATELIER
          </p>
          <h2 className="mt-5 font-serif text-5xl font-light text-paper sm:text-6xl" data-reveal>
            A philosophy of
            <br />
            <span className="italic">refusal</span>
          </h2>
        </div>

        <div
          id="philosophy-track"
          className="mt-16 flex w-full flex-col gap-10 px-5 pb-24 sm:px-8 md:w-max md:flex-row md:items-stretch md:gap-0 lg:px-12"
        >
          <article className="w-[min(88vw,420px)] shrink-0 md:pr-16">
            <img
              src={metal}
              alt="Brushed titanium surface with champagne reflections"
              className="h-64 w-full object-cover sm:h-80"
            />
            <p className="mt-6 text-sm leading-relaxed text-fog">
              Graphite body. Champagne equator. The Lumen is less a vehicle than a held breath —
              machined until only intention remains.
            </p>
          </article>

          {PRINCIPLES.map((item) => (
            <article
              key={item.n}
              className="w-[min(88vw,520px)] shrink-0 border-t border-paper/10 pt-8 md:border-t-0 md:border-l md:px-16 md:pt-0"
            >
              <p className="font-serif text-5xl italic text-champagne">{item.n}</p>
              <h3 className="mt-8 font-serif text-3xl font-light text-paper sm:text-4xl">{item.title}</h3>
              <p className="mt-6 max-w-sm text-sm leading-[1.85] text-ash">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
