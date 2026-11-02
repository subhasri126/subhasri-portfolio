import { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy, FileDown } from "lucide-react";
import { GithubIcon, LinkedinIcon, MailIcon } from "./BrandIcons";
import { CornerMarks } from "./CornerMarks";
import { Reveal } from "./Reveal";
import { profile } from "../data/portfolio";
import { cn } from "../utils/cn";

/** Real session timer — honest, and a quiet nod to the developer identity. */
function Uptime() {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    const t0 = Date.now();
    const iv = window.setInterval(() => setSecs(Math.floor((Date.now() - t0) / 1000)), 1000);
    return () => window.clearInterval(iv);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return (
    <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint/70 tabular-nums">
      session {h}:{m}:{s}
    </span>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  return (
    <footer id="contact" className="scroll-mt-24 border-t border-line bg-ink2">
      <div className="mx-auto max-w-[1240px] px-6 pb-10 pt-24 md:px-10 md:pt-36">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">08</span>
            <span className="h-px w-10 bg-line2" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">Contact</span>
            <span className="draw-line hidden h-px flex-1 bg-line md:block" aria-hidden="true" />
            <span className="hidden items-center gap-2.5 border border-line bg-ink px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-mute md:flex">
              <span className="status-dot h-1.5 w-1.5 rounded-full bg-accent" />
              accepting messages
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal delay={80}>
              <h2 className="font-display text-[11.5vw] font-light leading-[1.02] tracking-[-0.015em] text-paper sm:text-6xl md:text-7xl">
                Let's build something
                <br />
                <em className="italic text-accent2">practical</em> together.
              </h2>
            </Reveal>
            <Reveal delay={170}>
              <p className="mt-8 max-w-xl text-[15px] leading-[1.9] text-mute">
                I'm actively looking for internships, junior developer roles and meaningful collaborations. If you
                have a problem worth solving — or a team worth learning from — my inbox is open.
              </p>
            </Reveal>
            <Reveal delay={250}>
              <div className="mt-11 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex h-12 w-full items-center justify-center gap-3 bg-accent px-4 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-accent2 sm:w-auto sm:px-7"
                >
                  <MailIcon size={14} />
                  {profile.email}
                </a>
                <button
                  onClick={copyEmail}
                  aria-live="polite"
                  className={cn(
                    "inline-flex h-12 w-full items-center justify-center gap-2.5 border font-mono text-[12px] uppercase tracking-[0.16em] transition-colors sm:w-32",
                    copied
                      ? "border-accent/70 text-accent2"
                      : "border-line2 text-paper hover:border-accent/70 hover:text-accent2"
                  )}
                >
                  {copied ? <Check size={14} strokeWidth={2} /> : <Copy size={14} strokeWidth={1.75} />}
                  {copied ? "copied" : "copy"}
                </button>
                <a
                  href={profile.resumePath}
                  download={profile.resumeFileName}
                  className="inline-flex h-12 w-full items-center justify-center gap-3 border border-line2 px-4 font-mono text-[12px] uppercase tracking-[0.16em] text-paper transition-colors hover:border-accent/70 hover:text-accent2 sm:w-auto sm:px-7"
                >
                  <FileDown size={14} strokeWidth={1.75} />
                  Résumé
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="lg:col-span-4">
            <div className="relative border border-line bg-ink p-7">
              <CornerMarks />
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
                <span className="text-accent">[↗]</span> elsewhere
              </p>
              <div className="mt-6 flex flex-col">
                {[
                  { label: "GitHub", sub: "code & repositories", href: profile.github, Icon: GithubIcon },
                  { label: "LinkedIn", sub: "professional profile", href: profile.linkedin, Icon: LinkedinIcon },
                  { label: "Email", sub: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon },
                ].map(({ label, sub, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="group flex items-center justify-between gap-4 border-t border-line py-4 first:border-t-0"
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex h-9 w-9 items-center justify-center border border-line text-mute transition-colors group-hover:border-accent/60 group-hover:text-accent2">
                        <Icon size={14} />
                      </span>
                      <span>
                        <span className="block text-[14px] text-paper">{label}</span>
                        <span className="block font-mono text-[10.5px] tracking-[0.08em] text-faint">{sub}</span>
                      </span>
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* bottom bar */}
        <div className="mt-24 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-line pt-7">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
            © {new Date().getFullYear()} Subhasri S. — designed & built by hand
          </p>
          <Uptime />
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint transition-colors hover:text-paper"
          >
            {profile.email}
          </a>
          <p className="hidden font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint/70 md:block">
            react · vite · tailwind
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-mute transition-colors hover:text-paper"
          >
            Back to top
            <ArrowUp size={13} strokeWidth={1.75} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-accent" />
          </a>
        </div>
      </div>
    </footer>
  );
}
