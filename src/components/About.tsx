import { ArrowRight } from "lucide-react";
import { CornerMarks } from "./CornerMarks";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const principles = [
  {
    k: "01",
    title: "Practical over perfect",
    desc: "Software earns its place by being used. I build to solve real problems — tuition, records, commerce — not to decorate a GitHub grid.",
  },
  {
    k: "02",
    title: "Readable is professional",
    desc: "Code is read far more than it is written. Clear naming, honest structure and small functions are how I respect the next developer.",
  },
  {
    k: "03",
    title: "Fundamentals compound",
    desc: "Frameworks rotate; data structures, networking and problem-solving don't. I invest in what stays true in five years.",
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 md:py-36">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <SectionHeading
          num="01"
          label="About"
          anchor="about"
          title={
            <>
              A developer shaped by <em className="font-light italic text-accent2">building real things</em>, one project at a time.
            </>
          }
          desc="readme / principles"
        />

        <div className="grid gap-14 lg:grid-cols-12">
          {/* editorial column */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="font-display text-xl font-light leading-[1.7] text-paper/90 md:text-[1.35rem]">
                <span className="float-left mr-3 mt-1 text-[4.6rem] font-light italic leading-[0.72] text-accent2">
                  I
                </span>
                'm Subhasri — an aspiring software developer who got into code by wanting to make useful things,
                and stayed because the craft of building them turned out to be even better than the idea.
              </p>
            </Reveal>
            <Reveal delay={110}>
              <p className="mt-7 text-[15px] leading-[1.9] text-mute">
                My work so far spans education platforms, quiz applications, management systems and storefronts —
                each one an exercise in turning a vague requirement into structured, working software. Along the way
                I've developed a habit I care about most: finishing. Scoping honestly, building carefully, and
                shipping something a real person can use.
              </p>
            </Reveal>
            <Reveal delay={190}>
              <p className="mt-6 text-[15px] leading-[1.9] text-mute">
                Right now I'm deepening my fundamentals — data structures, TypeScript and backend development —
                while looking for a team where I can contribute, learn from experienced engineers, and grow into a
                dependable professional developer.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-10 flex items-center gap-3 font-mono text-[12px] tracking-[0.1em] text-faint">
                <span className="h-px w-8 bg-line2" aria-hidden="true" />
                — subhasri s. <span className="text-accent">/</span> written in the first person, on purpose
              </p>
            </Reveal>
          </div>

          {/* principles register */}
          <div className="lg:col-span-6 lg:pl-10">
            <Reveal>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
                <span className="text-accent">[fn]</span> how i work
              </p>
            </Reveal>
            <div className="relative">
              <CornerMarks />
              <div className="flex flex-col divide-y divide-line border-y border-line">
                {principles.map((p, i) => (
                  <Reveal key={p.k} delay={i * 90}>
                    <div className="group grid gap-2 px-2 py-7 transition-colors duration-300 hover:bg-panel/80 sm:grid-cols-[64px_200px_1fr] sm:gap-6 md:-mx-2">
                      <span className="font-mono text-[11px] text-faint transition-colors duration-300 group-hover:text-accent">
                        /{p.k}
                      </span>
                      <h3 className="font-display flex items-baseline gap-2 text-lg font-normal text-paper">
                        {p.title}
                      </h3>
                      <p className="text-[13.5px] leading-[1.8] text-mute">{p.desc}</p>
                      <ArrowRight
                        size={13}
                        strokeWidth={1.75}
                        className="hidden self-start justify-self-end text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 sm:block"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal delay={140}>
              <p className="mono-label mt-5 text-faint/70">
                lines 1–3 of a much longer document — the rest is written in the projects
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
