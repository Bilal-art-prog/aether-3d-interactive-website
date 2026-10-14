import { Mark } from "@/components/Mark";
import { scrollToId } from "@/hooks/useSmoothScroll";

const LINKS = [
  { label: "Explore", id: "hero" },
  { label: "Technology", id: "technology" },
  { label: "Design", id: "philosophy" },
  { label: "Experience", id: "story" },
  { label: "Contact", id: "cta" },
];

export function Footer() {
  return (
    <footer className="relative z-10 bg-ink">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-8 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-12 border-t border-paper/10 pt-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <button
              type="button"
              data-cursor="interactive"
              onClick={() => scrollToId("hero")}
              className="flex items-center gap-3"
              aria-label="Back to top"
            >
              <Mark className="h-8 w-8 text-champagne" />
              <span className="font-serif text-2xl tracking-[0.28em] text-paper">AETHER</span>
            </button>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-fog">
              The future of motion is not speed. It is composure.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="space-y-3">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    data-cursor="interactive"
                    onClick={() => scrollToId(link.id)}
                    className="text-sm tracking-[0.18em] text-ash uppercase transition-colors hover:text-champagne"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-8 text-sm tracking-[0.18em] text-fog uppercase">
            <a href="https://www.instagram.com" data-cursor="interactive" className="hover:text-champagne">
              IG
            </a>
            <a href="https://www.awwwards.com" data-cursor="interactive" className="hover:text-champagne">
              AW
            </a>
            <a href="https://www.linkedin.com" data-cursor="interactive" className="hover:text-champagne">
              IN
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-6 text-[10px] tracking-[0.22em] text-fog uppercase">
          <p>© 2026 AETHER STUDIO. All rights reserved.</p>
          <p>Graphite — Champagne — Silence</p>
        </div>
      </div>
    </footer>
  );
}
