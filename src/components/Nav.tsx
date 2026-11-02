import { useEffect, useState } from "react";
import { FileDown, Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { useActiveSection } from "../hooks/useActiveSection";
import { navLinks, profile } from "../data/portfolio";
import { cn } from "../utils/cn";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Sub-sections fold into their nearest nav chapter for the active state.
  const navActive = active.id === "achievements" || active.id === "education" ? "journey" : active.id;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "border-b border-line bg-ink/85 backdrop-blur-md" : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-6 md:px-10">
          <a
            href="#top"
            className="group flex items-baseline gap-0.5 font-mono text-[13px] tracking-[0.08em] text-paper"
            aria-label="subhasri.dev — home"
          >
            <span className="text-faint transition-colors group-hover:text-accent">~/</span>
            {profile.domain}
            <span className="caret text-accent">_</span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={cn(
                  "u-link font-mono text-[11.5px] tracking-[0.14em] uppercase transition-colors",
                  navActive === l.id ? "is-active text-paper" : "text-mute hover:text-paper"
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <span className="mr-3 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-faint xl:block">
              {active.label ? `// ${active.label}` : "// index"}
            </span>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden h-9 w-9 items-center justify-center text-mute transition-colors hover:text-paper sm:flex"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hidden h-9 w-9 items-center justify-center text-mute transition-colors hover:text-paper sm:flex"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={profile.resumePath}
              download={profile.resumeFileName}
              className="ml-2 hidden h-9 items-center gap-2 border border-line bg-panel px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-paper transition-colors hover:border-accent/60 hover:text-accent2 sm:flex"
            >
              <FileDown size={13} strokeWidth={1.75} />
              Résumé
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center text-paper lg:hidden"
            >
              <Menu size={19} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* build-bar echo — page scroll progress */}
        <div
          className="nav-progress absolute bottom-0 left-0 h-px bg-accent/70"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[80] flex flex-col bg-ink transition-all duration-500",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <span className="font-mono text-[13px] tracking-[0.08em] text-paper">
            <span className="text-faint">~/</span>
            {profile.domain}
            <span className="text-accent">_</span>
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center text-paper"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-1 px-8" aria-label="Mobile">
          {navLinks.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className={cn(
                "group flex items-baseline gap-4 border-b border-line/70 py-5 transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
              style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
            >
              <span className="font-mono text-[11px] text-accent">{l.num}</span>
              <span className="font-display text-3xl font-light text-paper transition-colors group-hover:text-accent2">
                {l.label}
              </span>
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-between px-8 pb-10">
          <div className="flex gap-5">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-mute hover:text-paper">
              <GithubIcon size={18} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-mute hover:text-paper">
              <LinkedinIcon size={18} />
            </a>
          </div>
          <a
            href={profile.resumePath}
            download={profile.resumeFileName}
            className="flex h-10 items-center gap-2 border border-line px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-paper"
          >
            <FileDown size={13} strokeWidth={1.75} />
            Résumé
          </a>
        </div>
      </div>
    </>
  );
}
