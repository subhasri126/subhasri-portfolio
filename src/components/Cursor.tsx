import { useEffect, useRef, useState } from "react";

/**
 * Refined cursor companion: a precise dot + a lerped ring that expands over
 * interactive elements. Disabled entirely on touch / coarse pointers.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let raf = 0;
    let shown = false;

    const move = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      if (!shown) {
        shown = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const hot = target?.closest("a, button, [role='button'], [data-cursor]");
      ring.classList.toggle("is-hot", !!hot);
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cursor-root" aria-hidden="true">
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[95] h-8 w-8 rounded-full border border-paper/25 opacity-0 [.is-hot]:h-12 [.is-hot]:w-12 [.is-hot]:border-accent/60 [.is-hot]:bg-accentdim"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[96] h-[5px] w-[5px] rounded-full bg-accent opacity-0"
      />
    </div>
  );
}
