import { CornerMarks } from "./CornerMarks";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { skillGroups } from "../data/portfolio";

/** Short mono tokens tag each group — editor-flavored labelling. */
const TOKENS: Record<string, string> = {
  languages: "fn",
  frontend: "ui",
  backend: "db",
  tools: "$",
};

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-line bg-ink2 py-24 md:py-36">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <SectionHeading
          num="02"
          label="Technical Skills"
          anchor="skills"
          title={
            <>
              A toolkit built for <em className="font-light italic text-accent2">shipping working software</em>.
            </>
          }
          desc="languages / frameworks / practice"
        />

        <div className="relative">
          <CornerMarks />
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {skillGroups.map((group, gi) => (
              <Reveal key={group.id} delay={gi * 80} className="bg-ink">
                <div className="group h-full p-7 transition-colors duration-300 hover:bg-panel md:p-9">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint transition-colors group-hover:text-paper">
                      <span className="text-accent">[{TOKENS[group.id] ?? "•"}]</span> {group.label}
                    </h3>
                    <span className="font-mono text-[11px] text-faint/70 tabular-nums">
                      {String(group.items.length).padStart(2, "0")}
                    </span>
                  </div>
                  <ul className="mt-7 space-y-0">
                    {group.items.map((item, i) => (
                      <li
                        key={item}
                        className="group/item flex items-baseline gap-3 border-t border-line/70 py-3 first:border-t-0 first:pt-0 last:pb-0"
                      >
                        <span className="row-caret font-mono text-[11px] text-accent">›</span>
                        <span className="w-6 font-mono text-[10px] text-faint/60 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] text-paper/85 transition-all duration-300 group-hover/item:translate-x-0.5 group-hover/item:text-paper">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120}>
          <p className="mono-label mt-6 text-faint">
            + currently deepening · typescript strictness · backend architecture · testing habits
          </p>
        </Reveal>
      </div>
    </section>
  );
}
