import { SECTION_IDS, useActiveSection } from "../hooks/useActiveSection";
import { cn } from "../utils/cn";

/**
 * Fixed chapter rail on the left edge — vertical section ticks plus a rotated
 * mono label naming the section in view. Appears only on wide screens where
 * the gutters have room for it.
 */
export default function ChapterRail() {
  const active = useActiveSection();

  return (
    <div className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 min-[1440px]:flex">
      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-faint/70">
        {active.index >= 0 ? String(active.index + 1).padStart(2, "0") : "00"}
      </span>
      <div className="flex flex-col items-center gap-[9px]" role="navigation" aria-label="Chapters">
        {SECTION_IDS.map((id, i) => {
          const isActive = active.index === i;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-label={id}
              title={id}
              className={cn(
                "rail-dot block w-[3px] rounded-full",
                isActive ? "h-5 bg-accent" : "h-[7px] bg-line2 hover:bg-mute"
              )}
            />
          );
        })}
      </div>
      <span className="h-8 w-px bg-line" aria-hidden="true" />
      <span
        className="inline-block font-mono text-[9px] uppercase tracking-[0.3em] text-faint/80 [writing-mode:vertical-rl]"
        style={{ transform: "rotate(180deg)" }}
      >
        {active.label || "index"}
      </span>
    </div>
  );
}
