import { cn } from "../utils/cn";

/**
 * Blueprint-style registration marks — quiet "+" crosses on all four corners
 * of a relative container. A recurring technical-drawing motif across the site.
 */
export function CornerMarks({ className }: { className?: string }) {
  const mark = "absolute font-mono text-[11px] leading-none text-faint/60 select-none";
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 z-10", className)}>
      <span className={cn(mark, "left-0 top-0 -translate-x-1/2 -translate-y-1/2")}>+</span>
      <span className={cn(mark, "right-0 top-0 translate-x-1/2 -translate-y-1/2")}>+</span>
      <span className={cn(mark, "bottom-0 left-0 -translate-x-1/2 translate-y-1/2")}>+</span>
      <span className={cn(mark, "bottom-0 right-0 translate-x-1/2 translate-y-1/2")}>+</span>
    </div>
  );
}
