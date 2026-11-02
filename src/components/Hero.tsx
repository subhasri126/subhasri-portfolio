import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, FileDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { heroFacts, profile } from "../data/portfolio";
import { cn } from "../utils/cn";

function Portrait() {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Subtle parallax drift on pointer
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.closest("[data-hero]");
    if (!parent || window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    };
    parent.addEventListener("mousemove", onMove as EventListener);
    return () => parent.removeEventListener("mousemove", onMove as EventListener);
  }, []);

  return (
    <div ref={ref} className="relative transition-transform duration-300 ease-out will-change-transform">
      {/* offset frame */}
      <div className="absolute -left-3 -top-3 h-full w-full border border-line2/80" aria-hidden="true" />
      <div className="absolute -bottom-3 -right-3 h-full w-full border border-line/60" aria-hidden="true" />

      <div className="relative aspect-[4/5] overflow-hidden border border-line bg-panel media-frame">
        {!failed ? (
          <img
            src={`${import.meta.env.BASE_URL}images/profile.jpg`}
            alt="Subhasri S., software developer"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          /* Designed placeholder — replaced automatically once the profile image is available */
          <div className="img-pattern flex h-full w-full flex-col items-center justify-center gap-6">
            <span className="font-display text-[7rem] font-light italic leading-none text-paper/90">
              S<span className="text-accent">.</span>
            </span>
            <span className="mono-label text-faint">portrait forthcoming</span>
          </div>
        )}
        {/* corner tick */}
        <div className="absolute right-3 top-3 font-mono text-[10px] tracking-[0.2em] text-paper/40">fig.01</div>
      </div>

      {/* caption */}
      <div className="mt-6 flex items-center justify-between gap-4 font-mono text-[10.5px] tracking-[0.14em] text-faint">
        <span className="min-w-0 break-all">/images/profile.jpg</span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
        <span>4 : 5</span>
      </div>
    </div>
  );
}

/* Tiny code-editor card — a signature identity element for the hero. */
function ConfigCard({ entered }: { entered: boolean }) {
  const P = ({ children }: { children: string }) => <span className="text-faint">{children}</span>;
  const K = ({ children }: { children: string }) => <span className="text-accent2">{children}</span>;
  const S = ({ children }: { children: string }) => <span className="text-paper/85">{children}</span>;

  return (
    <div
      className={cn(
        "relative z-20 mt-8 w-full border border-line2 bg-ink/90 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-sm",
        "transition-all duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        "lg:absolute lg:-left-16 lg:bottom-12 lg:mt-0 lg:w-[292px]",
        entered ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      )}
      style={{ transitionDelay: "660ms" }}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">profile.config.ts</span>
        <span className="status-dot h-1.5 w-1.5 rounded-full bg-accent" />
      </div>
      <div className="px-4 py-3.5 font-mono text-[11px] leading-[2]">
        <p><P>{"const developer = {"}</P></p>
        <p className="pl-4"><K>"name"</K><P>: </P><S>"Subhasri S."</S><P>,</P></p>
        <p className="pl-4"><K>"role"</K><P>: </P><S>"aspiring software developer"</S><P>,</P></p>
        <p className="pl-4"><K>"focus"</K><P>: [</P><S>"web"</S><P>, </P><S>"systems"</S><P>, </P><S>"ui"</S><P>],</P></p>
        <p className="pl-4"><K>"status"</K><P>: </P><span className="text-accent">"open_to_work"</span></p>
        <p>
          <P>{"};"}</P>
          <span className="caret ml-1.5 inline-block h-[11px] w-[6px] translate-y-[1px] bg-accent" />
        </p>
      </div>
    </div>
  );
}

export default function Hero({ booted }: { booted: boolean }) {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (booted) {
      const t = window.setTimeout(() => setEntered(true), 60);
      return () => window.clearTimeout(t);
    }
  }, [booted]);

  const ease = "transition-all duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]";
  const stage = (on: boolean, d: number) => ({
    className: cn(ease, on ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"),
    style: { transitionDelay: `${d}ms` },
  });

  return (
    <section id="top" data-hero className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="grid min-w-0 items-start gap-14 lg:grid-cols-12 lg:gap-8">
          {/* ── Left column ── */}
          <div className="min-w-0 lg:col-span-7 lg:pt-6">
            <div {...stage(entered, 0)} className={cn(stage(entered, 0).className, "inline-flex")}>
              <span className="flex max-w-full flex-wrap items-center gap-2.5 border border-line bg-panel/70 px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-mute">
                <span className="status-dot h-1.5 w-1.5 rounded-full bg-accent" />
                {profile.availability}
              </span>
            </div>

            <h1
              {...stage(entered, 90)}
              className={cn(stage(entered, 90).className, "font-display mt-8 text-[17vw] font-light leading-[0.95] tracking-[-0.02em] text-paper sm:text-7xl md:text-8xl xl:text-[6.75rem]")}
            >
              Subhasri
              <span className="italic text-accent2"> S.</span>
            </h1>

            <p
              {...stage(entered, 180)}
              className={cn(stage(entered, 180).className, "font-display mt-7 flex items-start gap-4 text-xl font-light leading-snug text-paper/85 sm:text-2xl")}
            >
              <span className="mt-3 hidden h-px w-10 shrink-0 bg-accent sm:block" aria-hidden="true" />
              {profile.headline}
            </p>

            <p {...stage(entered, 260)} className={cn(stage(entered, 260).className, "mt-7 max-w-xl text-[15px] leading-[1.85] text-mute")}>
              {profile.intro}
            </p>

            {/* CTAs */}
            <div {...stage(entered, 340)} className={cn(stage(entered, 340).className, "mt-10 flex flex-wrap items-center gap-4")}>
              <a
                href="#projects"
                className="group inline-flex h-12 w-full items-center justify-center gap-3 bg-accent px-4 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-accent2 sm:w-auto sm:px-7"
              >
                View Projects
                <ArrowDown size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
              <a
                href={profile.resumePath}
                download={profile.resumeFileName}
                className="group inline-flex h-12 w-full items-center justify-center gap-3 border border-line2 px-4 font-mono text-[12px] uppercase tracking-[0.16em] text-paper transition-colors hover:border-accent/70 hover:text-accent2 sm:w-auto sm:px-7"
              >
                <FileDown size={14} strokeWidth={1.75} />
                Download Résumé
              </a>
            </div>

            {/* Socials */}
            <div {...stage(entered, 420)} className={cn(stage(entered, 420).className, "mt-12 flex flex-wrap items-center gap-x-8 gap-y-4")}>
              <span className="mono-label text-faint">Find me</span>
              <span className="h-px w-8 bg-line2" aria-hidden="true" />
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="u-link group inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-mute transition-colors hover:text-paper"
              >
                <GithubIcon size={14} />
                GitHub
                <ArrowUpRight size={12} className="text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="u-link group inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-mute transition-colors hover:text-paper"
              >
                <LinkedinIcon size={14} />
                LinkedIn
                <ArrowUpRight size={12} className="text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            </div>
          </div>

          {/* ── Right column — portrait ── */}
          <div className="min-w-0 lg:col-span-5 lg:pl-10">
            <div {...stage(entered, 300)} className={cn(stage(entered, 300).className, "relative mx-auto max-w-[380px] lg:ml-auto lg:max-w-none")}>
              <Portrait />
              <ConfigCard entered={entered} />
            </div>
          </div>
        </div>

        {/* ── Bottom meta row ── */}
        <div {...stage(entered, 520)} className={cn(stage(entered, 520).className, "mt-20 hidden border-t border-line pt-6 md:block")}>
          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
            <div className="flex items-center gap-3">
              <span className="mono-label text-faint">Scroll</span>
              <span className="relative h-8 w-px overflow-hidden bg-line" aria-hidden="true">
                <span className="scroll-line absolute inset-0 bg-accent" />
              </span>
            </div>
            <dl className="flex flex-wrap items-center gap-x-10 gap-y-2">
              {heroFacts.map((f) => (
                <div key={f.k} className="flex items-baseline gap-2 font-mono text-[11px] tracking-[0.1em]">
                  <dt className="text-faint">{f.k}</dt>
                  <dd className="text-mute">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
