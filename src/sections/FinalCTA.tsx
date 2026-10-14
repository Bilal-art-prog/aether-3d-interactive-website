import { MagneticButton } from "@/components/MagneticButton";

export function FinalCTA() {
  return (
    <section id="cta" className="relative z-10 flex min-h-svh flex-col justify-end">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-ink/40 via-transparent to-ink" />

      <div className="relative px-5 py-24 sm:px-8 lg:px-12">
        <p className="tracking-label text-champagne" data-reveal>
          007 — THRESHOLD
        </p>
        <h2
          className="text-display mt-6 max-w-4xl text-5xl text-paper sm:text-7xl lg:text-8xl"
          data-reveal
        >
          Ready for
          <br />
          what&apos;s <span className="italic">next?</span>
        </h2>
        <p className="mt-8 max-w-md text-sm leading-relaxed text-ash" data-reveal>
          The Lumen is not ordered. It is allocated. Leave a mark, and the studio will answer when
          the time is correct.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <MagneticButton
            onClick={() => {
              window.location.href = "mailto:studio@aether.motion?subject=AETHER%20Lumen%20Allocation";
            }}
            className="group pointer-events-auto inline-flex items-center gap-4 bg-paper px-8 py-4 text-[11px] tracking-[0.28em] text-ink transition-colors duration-500 hover:bg-champagne"
          >
            ENTER AETHER
            <span className="block h-px w-8 bg-current transition-all duration-500 group-hover:w-12" />
          </MagneticButton>
          <a
            href="mailto:studio@aether.motion"
            data-cursor="interactive"
            className="pointer-events-auto text-[11px] tracking-[0.28em] text-fog underline decoration-paper/20 underline-offset-8 transition-colors hover:text-champagne"
          >
            STUDIO@AETHER.MOTION
          </a>
        </div>
      </div>
    </section>
  );
}
