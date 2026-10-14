import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import gsap from "gsap";
import { sim } from "@/store/experience";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function MagneticButton({ children, className = "", onMouseMove, onMouseLeave, ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      data-cursor="interactive"
      className={className}
      onMouseMove={(e) => {
        onMouseMove?.(e);
        if (sim.ui.isMobile || sim.ui.reducedMotion) return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        gsap.to(el, { x: x * 0.28, y: y * 0.28, duration: 0.45, ease: "power3.out" });
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        const el = ref.current;
        if (!el) return;
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
