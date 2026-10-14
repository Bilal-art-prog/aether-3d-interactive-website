const ITEMS = [
  {
    n: "01",
    title: "ADAPTIVE SURFACE",
    copy: "Thousands of silent actuators sit beneath a continuous skin. The body reads pressure, heat, and intention — then reforms before the air can argue.",
  },
  {
    n: "02",
    title: "INTELLIGENT DRIVE",
    copy: "Torque without a transmission. Direction without delay. Four hovering cores converse in a closed loop so motion feels less like force and more like thought.",
  },
  {
    n: "03",
    title: "SPATIAL INTERFACE",
    copy: "Controls appear only when the hand is already reaching. No dashboard of noise. Presence is earned, then it recedes.",
  },
  {
    n: "04",
    title: "ENERGY CORE",
    copy: "Dense, quiet, and designed to outlive the machine. Power is stored the way light is stored in metal — without spectacle.",
  },
];

export function Technology() {
  return (
    <section id="technology" className="relative z-10 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 lg:px-12">
        <div className="mb-20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="tracking-label text-champagne" data-reveal>
              003 — SYSTEMS
            </p>
            <h2 className="mt-5 font-serif text-5xl font-light text-paper sm:text-6xl" data-reveal>
              Technology as
              <br />
              <span className="italic">etiquette</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-fog" data-reveal>
            Four disciplines. One object. Nothing is stacked. Everything is in conversation.
          </p>
        </div>

        <ul>
          {ITEMS.map((item) => (
            <li
              key={item.n}
              className="group grid gap-4 border-t border-paper/10 py-10 lg:grid-cols-12 lg:items-start lg:gap-8 lg:py-14"
              data-reveal
            >
              <span className="tracking-label text-champagne lg:col-span-2">{item.n}</span>
              <h3 className="font-serif text-3xl font-light tracking-tight text-paper transition-colors duration-500 group-hover:text-champagne sm:text-4xl lg:col-span-4">
                {item.title}
              </h3>
              <p className="max-w-xl text-sm leading-[1.85] text-ash sm:text-base lg:col-span-5">
                {item.copy}
              </p>
              <span className="hidden h-px origin-left scale-x-0 bg-champagne transition-transform duration-700 group-hover:scale-x-100 lg:col-span-1 lg:mt-5 lg:block" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
