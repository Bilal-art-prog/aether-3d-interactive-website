import architecture from "@/assets/architecture.jpg";

export function VisualBreak() {
  return (
    <section id="visual" className="relative z-10 min-h-[100svh] overflow-hidden bg-ink">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={architecture}
          alt="Monumental dark concrete interior with champagne light"
          className="h-[120%] w-full object-cover opacity-70"
          data-parallax="0.08"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/25 to-ink/80" />
      </div>

      <div className="relative flex min-h-[100svh] items-end px-5 py-24 sm:px-8 lg:px-12">
        <h2 className="text-display max-w-5xl text-6xl text-paper sm:text-8xl lg:text-[7.5rem]">
          Engineered
          <br />
          without
          <br />
          <span className="italic">compromise.</span>
        </h2>
      </div>
    </section>
  );
}
