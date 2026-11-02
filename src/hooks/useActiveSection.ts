import { useEffect, useState } from "react";

export const SECTION_IDS = [
  "about",
  "skills",
  "projects",
  "build-log",
  "achievements",
  "education",
  "journey",
  "contact",
] as const;

const SECTION_LABELS: Record<string, string> = {
  about: "about",
  skills: "skills",
  projects: "projects",
  "build-log": "build log",
  achievements: "achievements",
  education: "education",
  journey: "journey",
  contact: "contact",
};

/** Tracks which section is currently in the reader's focus band. */
export function useActiveSection() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return {
    id: active,
    label: active ? SECTION_LABELS[active] : "",
    index: active ? SECTION_IDS.indexOf(active as (typeof SECTION_IDS)[number]) : -1,
  };
}
