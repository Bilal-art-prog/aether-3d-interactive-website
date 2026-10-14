import { scrollToId } from "@/hooks/useSmoothScroll";

const LINKS = [
  { n: "01", label: "EXPERIENCE", id: "hero" },
  { n: "02", label: "TECHNOLOGY", id: "technology" },
  { n: "03", label: "DESIGN", id: "philosophy" },
  { n: "04", label: "SPECIFICATIONS", id: "specs" },
  { n: "05", label: "CONTACT", id: "cta" },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MenuOverlay({ open, onClose }: Props) {
  return (
    <div
      id="site-menu"
      className={`fixed inset-0 z-40 bg-ink transition-[clip-path,opacity] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{
        clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
      }}
      aria-hidden={!open}
    >
      <nav className="flex h-full flex-col justify-between px-6 pt-28 pb-10 sm:px-12 lg:px-16">
        <ul className="space-y-1 sm:space-y-2">
          {LINKS.map((link, i) => (
            <li key={link.id}>
              <button
                type="button"
                data-cursor="interactive"
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  onClose();
                  scrollToId(link.id);
                }}
                className="group flex w-full items-baseline gap-5 text-left"
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              >
                <span className="w-8 text-[10px] tracking-[0.28em] text-champagne">{link.n}</span>
                <span className="font-serif text-4xl font-light tracking-tight text-paper transition-colors duration-300 group-hover:text-champagne sm:text-6xl lg:text-7xl">
                  {link.label}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-paper/10 pt-6">
          <p className="max-w-sm text-sm leading-relaxed text-fog">
            AETHER LUMEN — a study in silent velocity. Designed for a world that has not arrived yet.
          </p>
          <p className="tracking-label text-[10px] text-fog">EST. 2026 / STUDIO 01</p>
        </div>
      </nav>
    </div>
  );
}
