import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  num: string;
  label: string;
  title: ReactNode;
  desc?: string;
  anchor?: string;
};

/**
 * Editorial section opener — mono index, a hairline that draws itself in,
 * a serif headline, and a hover-revealed permalink for direct linking.
 */
export function SectionHeading({ num, label, title, desc, anchor }: Props) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <div className="group flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{num}</span>
          <span className="h-px w-10 bg-line2" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">{label}</span>
          {anchor && (
            <a
              href={`#${anchor}`}
              aria-label={`Link to ${label} section`}
              className="font-mono text-[12px] leading-none text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100"
            >
              #
            </a>
          )}
          <span className="draw-line hidden h-px flex-1 bg-line md:block" aria-hidden="true" />
          {desc && (
            <span className="hidden font-mono text-[11px] normal-case tracking-[0.14em] text-faint md:block">
              {desc}
            </span>
          )}
        </div>
      </Reveal>
      <Reveal delay={90}>
        <h2 className="font-display mt-7 max-w-3xl text-4xl leading-[1.06] font-light tracking-[-0.01em] text-paper sm:text-5xl md:text-[3.4rem]">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
