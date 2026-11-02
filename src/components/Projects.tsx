import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Plus, X } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { CornerMarks } from "./CornerMarks";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { profile, projects, type Project } from "../data/portfolio";
import { cn } from "../utils/cn";

/** Deterministic short hash — a real artifact derived from each project id. */
function shortHash(s: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0").slice(0, 7);
}

/* ─── Project media — renders a screenshot if added, otherwise a designed placeholder ─── */
function Media({ project, eager }: { project: Project; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="media-frame relative aspect-[16/10] overflow-hidden border border-line bg-panel">
      <CornerMarks />
      {!failed ? (
        <img
          src={project.image}
          alt={`${project.title} — project screenshot`}
          loading={eager ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="img-pattern flex h-full w-full flex-col justify-between p-5 md:p-6">
          <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
            <span>{project.type}</span>
            <span className="text-accent/80">p—{project.index}</span>
          </div>
          <div>
            <span className="font-display block text-5xl font-light italic leading-none text-paper/85 md:text-6xl">
              {project.title
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
              <span className="text-accent">.</span>
            </span>
            <p className="mono-label mt-4 normal-case tracking-[0.12em] text-faint/80">
              {/* the exact path keeps the placeholder genuinely useful */}
              {project.image}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Editorial project card ─── */
function ProjectCard({
  project,
  flip,
  onOpen,
}: {
  project: Project;
  flip: boolean;
  onOpen: (p: Project) => void;
}) {
  return (
    <Reveal>
      <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
          <button
            onClick={() => onOpen(project)}
            className="relative block w-full text-left"
            aria-label={`Open case study — ${project.title}`}
          >
            <Media project={project} />
            <span className="absolute -right-3 -top-3 z-20 flex h-11 w-11 items-center justify-center border border-line2 bg-ink text-paper opacity-0 transition-all duration-300 hover:border-accent hover:bg-accent hover:text-ink lg:translate-y-2 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
              <ArrowUpRight size={16} strokeWidth={1.75} />
            </span>
          </button>
        </div>

        <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
          <div className="mono-label flex flex-wrap items-center gap-3 text-faint">
            <span className="text-accent">p.{project.index}</span>
            <span className="h-px w-6 bg-line2" />
            <span>{project.type}</span>
            <span className="text-line2" aria-hidden="true">·</span>
            <span className="text-faint/70">c·{shortHash(project.id)}</span>
          </div>

          <h3 className="font-display mt-5 text-3xl font-light leading-tight text-paper md:text-4xl">
            <button onClick={() => onOpen(project)} className="u-link text-left">
              {project.title}
            </button>
          </h3>

          <p className="mt-4 text-[14.5px] leading-[1.85] text-mute">{project.tagline}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li
                key={s}
                className="border border-line px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-mute transition-colors hover:border-accent/50 hover:text-paper"
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <button
              onClick={() => onOpen(project)}
              className="u-link group/btn inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-paper"
            >
              Case study
              <ArrowUpRight
                size={13}
                className="text-accent transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
              />
            </button>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="u-link inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-mute transition-colors hover:text-paper"
              >
                <GithubIcon size={13} />
                Source
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="u-link inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-mute transition-colors hover:text-paper"
              >
                <ExternalLink size={13} strokeWidth={1.75} />
                Live demo
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ─── Full-screen case study view ─── */
function ProjectDetail({
  project,
  position,
  visible,
  onClose,
  onStep,
}: {
  project: Project;
  position: number;
  visible: boolean;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[85] flex flex-col bg-ink transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — case study`}
    >
      {/* header bar */}
      <div className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-line px-6 md:px-10">
        <p className="truncate font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          projects <span className="mx-1 text-line2">/</span>{" "}
          <span className="text-accent2">{project.id}</span>
          <span className="ml-3 hidden text-faint/60 sm:inline">c·{shortHash(project.id)}</span>
        </p>
        <div className="flex items-center gap-2">
          <span className="mr-2 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-faint md:block">
            {String(position + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => onStep(-1)}
            aria-label="Previous project"
            className="flex h-9 w-9 items-center justify-center border border-line text-mute transition-colors hover:border-accent/60 hover:text-paper"
          >
            <ChevronLeft size={15} strokeWidth={1.75} />
          </button>
          <button
            onClick={() => onStep(1)}
            aria-label="Next project"
            className="flex h-9 w-9 items-center justify-center border border-line text-mute transition-colors hover:border-accent/60 hover:text-paper"
          >
            <ChevronRight size={15} strokeWidth={1.75} />
          </button>
          <button
            onClick={onClose}
            className="group ml-2 flex h-9 items-center gap-2 border border-line px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-mute transition-colors hover:border-accent/60 hover:text-paper"
          >
            Close
            <X size={14} strokeWidth={1.75} className="transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>
      </div>

      {/* scrollable body — remount per project to reset scroll */}
      <div key={project.id} ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1100px] px-6 py-12 md:px-10 md:py-16">
          <p className="mono-label text-faint">
            <span className="text-accent">p.{project.index}</span> — {project.type}
          </p>
          <h3 className="font-display mt-5 max-w-3xl text-4xl font-light leading-[1.05] text-paper md:text-6xl">
            {project.title}
          </h3>
          <p className="font-display mt-6 max-w-2xl text-lg font-light italic leading-relaxed text-mute md:text-xl">
            {project.tagline}
          </p>

          <div className="mt-10">
            <Media project={project} eager />
            <p className="mono-label mt-3 flex items-center justify-between normal-case tracking-[0.12em] text-faint/70">
              <span>{project.image}</span>
              <span>16 : 10</span>
            </p>
          </div>

          <div className="mt-14 grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                <span className="text-faint">[md]</span> overview
              </h4>
              {project.overview.map((para, i) => (
                <p
                  key={i}
                  className={cn(
                    "leading-[1.9] text-mute",
                    i === 0 ? "mt-6 text-[15.5px] text-paper/85" : "mt-5 text-[14.5px]"
                  )}
                >
                  {para}
                </p>
              ))}

              <h4 className="mt-12 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                <span className="text-faint">[+]</span> key features
              </h4>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {project.features.map((f) => (
                  <li key={f} className="group/feat flex items-baseline gap-4 py-3.5">
                    <Plus
                      size={12}
                      strokeWidth={2}
                      className="shrink-0 translate-y-[-1px] text-accent transition-transform duration-300 group-hover/feat:rotate-90"
                    />
                    <span className="text-[14px] leading-relaxed text-mute transition-colors group-hover/feat:text-paper/80">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="md:col-span-5">
              <div className="relative border border-line bg-panel p-7">
                <CornerMarks />
                <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
                  <span className="text-accent">[db]</span> stack
                </h4>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <li
                      key={s}
                      className="border border-line bg-ink px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-mute"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-line pt-7">
                  <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
                    <span className="text-accent">[↗]</span> links
                  </h4>
                  <div className="mt-5 flex flex-col gap-3">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex h-11 items-center justify-center gap-2.5 bg-accent font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-accent2"
                      >
                        <GithubIcon size={14} />
                        View on GitHub
                      </a>
                    ) : (
                      <p className="font-mono text-[11px] leading-relaxed text-faint">
                        repository link available on request
                      </p>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center justify-center gap-2.5 border border-line2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-paper transition-colors hover:border-accent/70 hover:text-accent2"
                      >
                        <ExternalLink size={14} strokeWidth={1.75} />
                        Open live demo
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <p className="mono-label mt-6 leading-relaxed text-faint/70">
                tip — use ← → arrow keys to browse all {projects.length} case studies
              </p>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Section ─── */
export default function Projects() {
  const [index, setIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  const open = useCallback((p: Project) => {
    setIndex(projects.findIndex((x) => x.id === p.id));
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    window.setTimeout(() => setIndex(null), 450);
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setIndex((cur) => (cur === null ? cur : (cur + dir + projects.length) % projects.length));
    },
    []
  );

  useEffect(() => {
    document.body.style.overflow = index !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [index]);

  const current = index !== null ? projects[index] : null;

  return (
    <section id="projects" className="scroll-mt-24 py-24 md:py-36">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <SectionHeading
          num="03"
          label="Projects"
          anchor="projects"
          title={
            <>
              Selected work — <em className="font-light italic text-accent2">five applications</em>, each built to be used.
            </>
          }
          desc="click a project for the full case study"
        />

        <div className="flex flex-col gap-24 md:gap-32">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} flip={i % 2 === 1} onOpen={open} />
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-24 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
              more experiments & coursework live on github
            </p>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="u-link group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-paper"
            >
              <GithubIcon size={14} />
              Browse the archive
              <ArrowUpRight size={13} className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>

      {current && (
        <ProjectDetail
          project={current}
          position={index!}
          visible={visible}
          onClose={close}
          onStep={step}
        />
      )}
    </section>
  );
}
