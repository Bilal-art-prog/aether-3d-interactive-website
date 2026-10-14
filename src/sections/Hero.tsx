import { MagneticButton } from "@/components/MagneticButton";
import { scrollToId } from "@/hooks/useSmoothScroll";

export function Hero() {
  return (
    <section id="hero" className="relative z-10 flex min-h-svh flex-col justify-end">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-ink/30 via-transparent to-ink/80" />

      <div className="relative flex flex-1 flex-col justify-between px-5 pt-28 pb-8 sm:px-8 lg:px-12">
        <div className="flex items-start justify-between gap-6">
          <p className="tracking-label text-fog">LUMEN / 01</p>
          <p className="max-w-[14rem] text-right text-[11px] leading-relaxed tracking-[0.18em] text-fog uppercase">
            Silent velocity
            <br />
            Intelligent surface
          </p>
        </div>

        <div className="relative max-w-5xl">
          <p className="tracking-label mb-6 text-champagne">AETHER</p>
          <h1 className="text-display text-[13vw] text-paper sm:text-[10.5vw] lg:text-[8.6rem]">
            The future
            <br />
            <span className="italic">moves</span> differently
          </h1>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-ash sm:text-base">
            A sculptural mobility object engineered in graphite, light, and restraint. Not faster.
            Quieter. More precise.
          </p>
          <div className="mt-10">
            <MagneticButton
              onClick={() => scrollToId("showcase")}
              className="group pointer-events-auto inline-flex items-center gap-4 border border-paper/20 px-7 py-4 text-[11px] tracking-[0.28em] text-paper transition-colors duration-500 hover:border-champagne hover:text-champagne"
            >
              EXPLORE THE MACHINE
              <span className="block h-px w-8 bg-current transition-all duration-500 group-hover:w-12" />
            </MagneticButton>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToId("intro")}
        className="pointer-events-auto absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        aria-label="Scroll to introduction"
      >
        <span className="tracking-label text-[9px] text-fog">SCROLL</span>
        <span className="scroll-pulse h-10 w-px bg-champagne" />
      </button>
    </section>
  );
}
