import { CornerMarks } from "./CornerMarks";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { buildLog } from "../data/portfolio";
import { cn } from "../utils/cn";

type Row =
  | { kind: "comment"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "k"; k: string; v: string }
  | { kind: "item"; text: string }
  | { kind: "blank" }
  | { kind: "eof" };

function buildRows(): Row[] {
  const rows: Row[] = [
    { kind: "comment", text: "# developer build log — honest notes, no vanity metrics" },
    { kind: "blank" },
    { kind: "heading", text: "projects.shipped" },
    ...buildLog.shipped.map<Row>((p) => ({ kind: "k", k: p.name, v: p.note })),
    { kind: "blank" },
    { kind: "heading", text: "stack.explored" },
    ...buildLog.stack.map<Row>((s) => ({ kind: "item", text: s })),
    { kind: "blank" },
    { kind: "heading", text: "practice.problem_solving" },
    ...buildLog.practice.map<Row>((s) => ({ kind: "item", text: s })),
    { kind: "blank" },
    { kind: "heading", text: "currently.learning" },
    ...buildLog.learning.map<Row>((s) => ({ kind: "item", text: s })),
    { kind: "eof" },
  ];
  return rows;
}

const ROWS = buildRows();

export default function BuildLog() {
  let ln = 0;

  return (
    <section id="build-log" className="scroll-mt-24 border-t border-line bg-ink2 py-24 md:py-36">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <SectionHeading
          num="04"
          label="Developer Build Log"
          anchor="build-log"
          title={
            <>
              Process over polish — <em className="font-light italic text-accent2">what I've built, used and learned</em>.
            </>
          }
          desc="rendered from build.log"
        />

        <Reveal>
          <div className="relative">
            <CornerMarks />
            <div className="overflow-hidden border border-line bg-panel shadow-[0_24px_80px_-32px_rgba(0,0,0,0.8)]">
            {/* editor chrome */}
            <div className="flex items-center gap-4 border-b border-line bg-ink px-4 md:px-5">
              <div className="flex gap-[7px]" aria-hidden="true">
                <span className="h-[9px] w-[9px] rounded-full bg-line2" />
                <span className="h-[9px] w-[9px] rounded-full bg-line2" />
                <span className="h-[9px] w-[9px] rounded-full bg-accent/70" />
              </div>
              <div className="flex items-end gap-1 pt-2.5 font-mono text-[11px]">
                <span className="border-x border-t border-line bg-panel px-4 py-2 text-accent2">
                  build.log
                </span>
                <span className="px-4 py-2 text-faint">notes.md</span>
              </div>
              <div className="ml-auto hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-faint sm:flex">
                <span>utf-8</span>
                <span className="text-line2">·</span>
                <span>markdown</span>
              </div>
            </div>

            {/* code body */}
            <div className="overflow-x-auto">
              <div className="min-w-[760px] py-5 font-mono text-[12.5px] leading-[1.95] md:text-[13px]">
                {ROWS.map((row, i) => {
                  ln += 1;
                  return (
                    <div key={i} className="log-line flex items-baseline transition-colors">
                      <span className="w-14 shrink-0 select-none pr-5 text-right text-faint/40 tabular-nums">
                        {ln}
                      </span>
                      <span className="pr-6">
                        {row.kind === "comment" && <span className="italic text-faint">{row.text}</span>}
                        {row.kind === "heading" && (
                          <span>
                            <span className="text-faint">{"// "}</span>
                            <span className="font-medium text-accent">{row.text}</span>
                          </span>
                        )}
                        {row.kind === "k" && (
                          <span>
                            <span className="text-faint">{"- "}</span>
                            <span className="text-accent2">{row.k}</span>
                            <span className="text-faint/70">{" — "}</span>
                            <span className="text-mute">{row.v}</span>
                          </span>
                        )}
                        {row.kind === "item" && (
                          <span>
                            <span className="text-faint">{"- "}</span>
                            <span className="text-paper/80">{row.text}</span>
                          </span>
                        )}
                        {row.kind === "blank" && <span>&nbsp;</span>}
                        {row.kind === "eof" && (
                          <span className="text-faint/60">
                            ::eof
                            <span className="caret ml-2 inline-block h-[12px] w-[7px] translate-y-[1px] bg-accent/80" />
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

              {/* status bar */}
              <div className="flex items-center justify-between border-t border-line bg-ink px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-faint md:px-5">
                <span className="flex items-center gap-2">
                  <span className="status-dot h-1.5 w-1.5 rounded-full bg-accent" />
                  main — up to date
                </span>
                <span className="hidden sm:block">
                  ln {ROWS.length} · {buildLog.shipped.length} projects · spaces: 2
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className={cn("mono-label mt-6 text-faint")}>
            this log is real content — edited by hand in src/data/portfolio.ts
          </p>
        </Reveal>
      </div>
    </section>
  );
}
