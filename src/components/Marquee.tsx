import { marqueeItems } from "../data/portfolio";

/** Slow, quiet capability strip — a hairline divider with motion. */
export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="overflow-hidden border-y border-line bg-ink2 py-4" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-faint">{item}</span>
            <span className="h-1 w-1 rotate-45 bg-accent/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
