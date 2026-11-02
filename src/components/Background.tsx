import { CornerMarks } from "./CornerMarks";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { achievements, education, journey } from "../data/portfolio";

/* ─── 05 · Achievements & hackathons ─── */
export function Achievements() {
  return (
    <section id="achievements" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <SectionHeading
          num="05"
          label="Achievements & Hackathons"
          anchor="achievements"
          title={
            <>
              Proof of work, <em className="font-light italic text-accent2">not</em> proof of buzzwords.
            </>
          }
          desc="verified by shipped things"
        />
        <div className="divide-y divide-line border-y border-line">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 70}>
              <div className="group grid gap-3 px-2 py-8 transition-colors duration-300 hover:bg-panel/60 md:-mx-2 md:grid-cols-12 md:gap-8 md:py-9">
                <div className="md:col-span-1">
                  <span className="font-mono text-[11px] text-faint transition-colors duration-300 group-hover:text-accent">
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-xl font-normal leading-snug text-paper transition-transform duration-300 group-hover:translate-x-1 md:text-[1.35rem]">
                    {a.title}
                  </h3>
                  <p className="mono-label mt-2.5 normal-case tracking-[0.14em] text-faint">{a.org}</p>
                </div>
                <p className="text-[14px] leading-[1.85] text-mute md:col-span-6">{a.desc}</p>
                {/* boot-sequence callback: rows report "[ ok ]" on inspection */}
                <div className="hidden md:col-span-1 md:flex md:justify-end">
                  <span className="h-fit font-mono text-[10px] uppercase tracking-[0.18em] text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    [ok]
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 06 · Education ─── */
export function Education() {
  return (
    <section id="education" className="scroll-mt-24 border-t border-line bg-ink2 py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <SectionHeading
          num="06"
          label="Education"
          anchor="education"
          title={
            <>
              Grounded in <em className="font-light italic text-accent2">computer science fundamentals</em>.
            </>
          }
          desc="foundations / continuous learning"
        />
        <div className="relative">
          <CornerMarks />
          <div className="grid gap-px border border-line bg-line md:grid-cols-2">
            {education.map((e, i) => (
              <Reveal key={e.qual} delay={i * 90} className="bg-ink">
                <div className="group h-full p-8 transition-colors duration-300 hover:bg-panel md:p-10">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="mono-label text-faint transition-colors group-hover:text-paper">
                      <span className="text-accent">[edu]</span> {e.field}
                    </p>
                    <span className="font-mono text-[10px] text-faint/60">
                      {String(i + 1).padStart(2, "0")}/{String(education.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-2xl font-light text-paper">{e.qual}</h3>
                  <p className="mt-4 text-[14px] leading-[1.85] text-mute">{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 07 · Developer journey ─── */
export function Journey() {
  return (
    <section id="journey" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <SectionHeading
          num="07"
          label="Developer Journey"
          anchor="journey"
          title={
            <>
              Four phases, <em className="font-light italic text-accent2">one direction</em>.
            </>
          }
          desc="from first program to professional path"
        />
        <div className="relative ml-2 md:ml-6">
          <span className="absolute bottom-3 left-0 top-3 w-px bg-line" aria-hidden="true" />
          <div className="flex flex-col gap-12 md:gap-14">
            {journey.map((j, i) => (
              <Reveal key={j.phase} delay={i * 80}>
                <div className="group relative grid gap-2 pl-10 md:grid-cols-12 md:gap-8 md:pl-14">
                  <span
                    className="absolute -left-[4.5px] top-[7px] h-2.5 w-2.5 rotate-45 border border-accent bg-ink transition-colors duration-300 group-hover:bg-accent"
                    aria-hidden="true"
                  />
                  <div className="md:col-span-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint transition-colors group-hover:text-accent">
                      phase {j.phase}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-light leading-snug text-paper transition-transform duration-300 group-hover:translate-x-1 md:col-span-4">
                    {j.title}
                  </h3>
                  <p className="text-[14px] leading-[1.85] text-mute md:col-span-6">{j.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mono-label mt-14 pl-10 text-faint/70 md:pl-14">
            next.phase → <span className="text-accent2">a first professional engineering team</span>
          </p>
        </div>
      </div>
    </section>
  );
}
