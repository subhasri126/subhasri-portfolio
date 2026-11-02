import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";

const LINES = [
  "INITIALIZING SUBHASRI.DEV",
  "LOADING DEVELOPER PROFILE",
  "PREPARING PROJECT SHOWCASE",
  "COMPILING INTERFACE",
  "SYSTEM READY",
];

const TARGETS = [10, 34, 58, 80, 100];

/**
 * Developer boot sequence.
 * Progress is driven by real initialization signals (window load, webfont
 * readiness) plus a short minimum clock — never a fake, arbitrary delay.
 */
export default function Boot({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState(1);
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const flags = useRef({ load: false, fonts: false });
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minTotal = reduced ? 500 : 1900;
    const t0 = performance.now();
    const disp = { v: 0 };

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setStage(LINES.length);
      setPct(100);
      window.setTimeout(() => setLeaving(true), reduced ? 100 : 420);
      window.setTimeout(() => onDoneRef.current(), reduced ? 320 : 940);
    };

    const onLoad = () => {
      flags.current.load = true;
    };
    if (document.readyState === "complete") flags.current.load = true;
    else window.addEventListener("load", onLoad);

    try {
      document.fonts?.ready.then(() => {
        flags.current.fonts = true;
      });
    } catch {
      flags.current.fonts = true;
    }
    // Fallbacks: never let a slow signal hang the experience.
    const fLoad = window.setTimeout(() => (flags.current.load = true), 1300);
    const fFonts = window.setTimeout(() => (flags.current.fonts = true), 1700);
    const kill = window.setTimeout(finish, 4000);

    const iv = window.setInterval(() => {
      const el = performance.now() - t0;
      let s = 1;
      if (el > 340) s = 2;
      if (el > 780 && flags.current.load) s = 3;
      if (el > 1220 && flags.current.fonts) s = 4;
      if (el >= minTotal && flags.current.load && flags.current.fonts) s = 5;
      setStage(s);

      const target = TARGETS[s - 1];
      if (disp.v < target) {
        disp.v = Math.min(target, disp.v + Math.max(0.6, (target - disp.v) * 0.14));
        setPct(Math.floor(disp.v));
      }
      if (s === 5) {
        window.clearInterval(iv);
        finish();
      }
    }, 40);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearInterval(iv);
      window.clearTimeout(fLoad);
      window.clearTimeout(fFonts);
      window.clearTimeout(kill);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-ink px-6 transition-all duration-500 ease-out",
        leaving && "pointer-events-none -translate-y-3 opacity-0"
      )}
      aria-hidden={leaving}
    >
      <div className="w-full max-w-md">
        {/* header row */}
        <div className="mono-label mb-8 flex items-center justify-between text-faint">
          <span className="text-mute">subhasri@dev : ~</span>
          <span>boot sequence</span>
        </div>

        {/* log lines */}
        <div className="min-h-[8.5rem] space-y-2.5 font-mono text-[13px] leading-relaxed">
          {LINES.slice(0, stage).map((line, i) => {
            const active = i === stage - 1 && i < LINES.length - 1;
            const last = i === LINES.length - 1;
            return (
              <p key={line} className="flex items-baseline gap-2.5">
                <span className="text-accent">›</span>
                <span
                  className={cn(
                    "tracking-[0.08em]",
                    last ? "text-accent2" : active ? "text-paper" : "text-faint"
                  )}
                >
                  {line}
                </span>
                {!active && !last && <span className="text-faint/70">· ok</span>}
                {active && <span className="caret ml-1 inline-block h-[13px] w-[7px] translate-y-[2px] bg-accent" />}
              </p>
            );
          })}
        </div>

        {/* progress */}
        <div className="mt-10">
          <div className="h-px w-full bg-line">
            <div
              className="h-px bg-accent transition-[width] duration-300 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mono-label mt-3 flex items-center justify-between text-faint">
            <span>{stage >= 5 ? "ready" : "initializing"}</span>
            <span className="tabular-nums text-mute">{String(pct).padStart(3, "0")}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
