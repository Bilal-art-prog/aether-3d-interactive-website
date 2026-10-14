export function Introduction() {
  return (
    <section id="intro" className="relative z-10 bg-ink">
      <div className="mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-5 py-28 sm:px-8 lg:px-12">
        <p className="tracking-label text-champagne" data-reveal>
          001 — PREFACE
        </p>

        <h2 className="mt-10 max-w-5xl">
          <span className="block overflow-hidden" data-reveal-line>
            <span data-reveal-inner className="text-display block text-5xl text-paper sm:text-7xl lg:text-8xl">
              Designed for a world
            </span>
          </span>
          <span className="block overflow-hidden" data-reveal-line>
            <span
              data-reveal-inner
              className="text-display mt-2 block text-5xl italic text-paper sm:text-7xl lg:text-8xl"
            >
              that hasn&apos;t arrived yet.
            </span>
          </span>
        </h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="hairline lg:col-span-4 lg:mt-3" data-reveal />
          <p className="max-w-xl text-base leading-[1.8] text-ash lg:col-span-5" data-reveal>
            AETHER is not an automobile in the inherited sense. It is a vessel for intent — a single
            continuous surface that reads the air, holds the light, and refuses ornament. We design
            machines the way a luthier designs silence: by removing everything that does not belong.
          </p>
          <p className="text-sm leading-relaxed text-fog lg:col-span-3" data-reveal>
            Studio 01
            <br />
            Graphite / Champagne
            <br />
            Motion as material
          </p>
        </div>
      </div>
    </section>
  );
}
