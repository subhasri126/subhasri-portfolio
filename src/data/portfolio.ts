/* ─────────────────────────────────────────────────────────────
   PORTFOLIO CONTENT — single source of truth.
   Everything on the site renders from this file.
   Items marked  ·edit·  should be personalised (links, institutions).
   ───────────────────────────────────────────────────────────── */

export const profile = {
  name: "Subhasri S.",
  domain: "subhasri.dev",
  role: "Aspiring Software Developer",
  headline: "Building practical digital solutions through code.",
  intro:
    "I’m a developer who learns by shipping. From a maths tuition platform to management systems and interactive quiz apps, I design and build software that solves everyday problems — with clean structure, readable code and interfaces people can actually use.",
  availability: "Open to internships & junior developer roles",
  email: "Subhasris126@gmail.com",
  github: "https://github.com/subhasri126",
  linkedin: "https://www.linkedin.com/in/subhasri-s-a82905376",
  resumePath: "/resume/Subhasri_Resume.pdf",
  resumeFileName: "Subhasri_Resume.pdf",
};

export const heroFacts = [
  { k: "name", v: "Subhasri S." },
  { k: "role", v: "Aspiring Software Developer" },
  { k: "focus", v: "Web development & software fundamentals" },
  { k: "status", v: "Open to opportunities" },
];

/* ─── Projects ─────────────────────────────────────────────── */
export type Project = {
  id: string;
  index: string;
  title: string;
  type: string;
  tagline: string;
  overview: string[];
  features: string[];
  stack: string[];
  image: string; // drop a screenshot at this path and it renders automatically
  github?: string; // ·edit· add repository URLs when ready
  live?: string; //   ·edit· add live demo URLs when deployed
};

export const projects: Project[] = [
  {
    id: "maths-tuition-platform",
    index: "01",
    title: "Maths Tuition Platform",
    type: "Education Platform",
    tagline: "A structured online home for maths tuition — lessons, resources and student progress in one place.",
    overview: [
      "Built to give a tuition service a real digital presence: a platform where lessons, study material and student information live behind one clean interface instead of scattered spreadsheets and chat threads.",
      "The focus was structure and clarity — content organised by class and topic, a layout students can navigate unassisted, and a design that stays usable on the phones most students actually learn on.",
    ],
    features: [
      "Lesson and topic content organised by class level",
      "Student-facing resource and study-material sections",
      "Structured layout for tracking enrolled students and their progress",
      "Fully responsive interface designed mobile-first",
      "Clear information architecture built to scale with new classes",
    ],
    stack: ["React", "JavaScript", "HTML", "CSS"],
    image: "/images/projects/maths-tuition-platform.jpg",
    live: "",
  },
  {
    id: "programming-quiz-app",
    index: "02",
    title: "Programming Quiz App",
    type: "Learning Application",
    tagline: "A knowledge-check tool that quizzes programming fundamentals with instant scoring and feedback.",
    overview: [
      "A quiz application built around programming concepts — language basics, syntax and core CS ideas — designed to make revision feel quick and measurable rather than passive.",
      "Building it meant solving classic application problems: managing question state, scoring logic, timed flows and giving the user immediate, honest feedback on every answer.",
    ],
    features: [
      "Question bank covering programming fundamentals",
      "Timed quiz flow with live score tracking",
      "Instant right/wrong feedback per question",
      "Results summary at the end of each run",
      "State-driven UI with clean restart logic",
    ],
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/images/projects/programming-quiz-app.jpg",
    live: "",
  },
  {
    id: "student-management-system",
    index: "03",
    title: "Student Management System",
    type: "Data-Driven System",
    tagline: "A CRUD system for managing student records — create, read, update and delete with data integrity.",
    overview: [
      "A management system for handling student records properly: adding, searching, updating and removing entries through a validated interface backed by persistent storage.",
      "This project was about thinking in systems — data models, edge cases, validation, and making sure the software stays reliable when the data gets messy.",
    ],
    features: [
      "Full CRUD operations on student records",
      "Search and filter across stored data",
      "Input validation to protect data integrity",
      "Persistent storage with a relational data model",
      "Console/interface designed for speed of use",
    ],
    stack: ["Python", "MySQL", "SQL"],
    image: "/images/projects/student-management-system.jpg",
    live: "",
  },
  {
    id: "interactive-quiz-game",
    index: "04",
    title: "Interactive Quiz Game",
    type: "Interactive Game",
    tagline: "A general-knowledge quiz game with categories, difficulty levels and streak-based scoring.",
    overview: [
      "Where the programming quiz app tests knowledge, this one is built for play — categories, difficulty tiers and streak mechanics that keep a round moving and make scores worth chasing.",
      "It sharpened front-end instincts: game state machines, timing, small animations that reward the player, and logic that keeps every round fair and replayable.",
    ],
    features: [
      "Multiple quiz categories and difficulty levels",
      "Streak and combo scoring to reward consistency",
      "Timed questions with visual countdown cues",
      "Animated feedback states for answers",
      "Replay flow with score history per session",
    ],
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/images/projects/interactive-quiz-game.jpg",
    live: "",
  },
  {
    id: "ecommerce-storefront",
    index: "05",
    title: "E-Commerce Storefront",
    type: "Web Storefront",
    tagline: "A storefront front-end with product catalogue, cart state and a complete checkout flow.",
    overview: [
      "A storefront built around the real anatomy of online shopping: a browsable product catalogue, a cart that holds its state, and a checkout flow that steps the user through purchase.",
      "The engineering focus was state — keeping cart, quantities and totals consistent everywhere, and designing a UI where the next step is always obvious.",
    ],
    features: [
      "Product catalogue with detail views",
      "Cart with add/remove and quantity state management",
      "Automatic totals and order summary calculations",
      "Multi-step checkout flow interface",
      "Responsive product grid across breakpoints",
    ],
    stack: ["React", "JavaScript", "CSS"],
    image: "/images/projects/ecommerce-storefront.jpg",
    live: "",
  },
];

/* ─── Technical skills ─────────────────────────────────────── */
export const skillGroups = [
  {
    id: "languages",
    label: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "SQL", "Java"],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: ["React", "HTML5", "CSS3", "Tailwind CSS", "Responsive Design"],
  },
  {
    id: "backend",
    label: "Backend & Data",
    items: ["Node.js", "REST API Fundamentals", "MySQL", "CRUD Architecture"],
  },
  {
    id: "tools",
    label: "Tools & Practice",
    items: ["Git", "GitHub", "VS Code", "Vite", "Chrome DevTools"],
  },
];

/* ─── Developer build log ──────────────────────────────────── */
export const buildLog = {
  shipped: [
    { name: "maths-tuition-platform", note: "education platform — lessons, resources, progress" },
    { name: "programming-quiz-app", note: "timed MCQ app — scoring, feedback, question bank" },
    { name: "student-management-system", note: "CRUD system — records, validation, persistence" },
    { name: "interactive-quiz-game", note: "game loops — categories, streaks, difficulty" },
    { name: "ecommerce-storefront", note: "store UI — catalogue, cart state, checkout flow" },
  ],
  stack: [
    "React + component architecture",
    "TypeScript — typed props, safer refactors",
    "Node.js & REST API fundamentals",
    "MySQL & relational data modelling",
    "Tailwind CSS — systematic, responsive UI",
    "Git workflows — branching, commits, PRs",
  ],
  practice: [
    "Data structures & algorithms — consistent problem practice",
    "Debugging discipline — reproduce, isolate, fix, document",
    "Breaking features into small, testable units",
    "Reading docs and source before reaching for answers",
  ],
  learning: [
    "Deeper TypeScript — generics and strict-mode habits",
    "Backend fundamentals — auth, APIs, data design",
    "Testing mindset — writing code that can be verified",
    "System design basics — how real products scale",
  ],
};

/* ─── Achievements & hackathons ────────────────────────────── */
export const achievements = [
  {
    title: "Competitive Hackathons",
    org: "Team builds under deadline",
    desc: "Competed in time-boxed hackathons — scoping an idea, dividing work across a team and presenting a working prototype under pressure.",
  },
  {
    title: "Five Applications Designed & Shipped",
    org: "Independent portfolio of work",
    desc: "Independently planned, built and iterated five complete applications spanning education platforms, business systems and interactive games.",
  },
  {
    title: "Consistent Problem-Solving Practice",
    org: "DSA & engineering fundamentals",
    desc: "Ongoing, structured practice of data structures and algorithmic problems — building the reasoning behind reliable software.",
  },
];

/* ─── Education ────────────────────────────────────────────── */
export const education = [
  {
    qual: "Undergraduate Studies",
    field: "Computer Science", // ·edit· add your institution & years
    desc: "Building core foundations across programming, data structures, databases and software engineering principles.",
  },
  {
    qual: "Self-Directed Learning",
    field: "Online · Ongoing",
    desc: "Documentation-first learning, structured courses and project-based exploration of the modern web ecosystem.",
  },
];

/* ─── Developer journey ────────────────────────────────────── */
export const journey = [
  {
    phase: "01",
    title: "The First Program",
    desc: "Discovered programming and wrote the first scripts that made a machine do something on purpose — the moment logic turned into craft.",
  },
  {
    phase: "02",
    title: "Learning by Building",
    desc: "Moved past tutorials into real applications — quiz apps and games with actual rules, state and people on the other side of the screen.",
  },
  {
    phase: "03",
    title: "Thinking in Systems",
    desc: "Designed data-driven software: a student management system with real records and a storefront with real cart and checkout logic.",
  },
  {
    phase: "04",
    title: "Deepening the Craft",
    desc: "Now: strengthening data structures and algorithms, exploring backend and TypeScript, and preparing for professional engineering work.",
  },
];

export const marqueeItems = [
  "React",
  "TypeScript",
  "JavaScript",
  "Python",
  "SQL",
  "Node.js",
  "Tailwind CSS",
  "Git & GitHub",
  "Problem Solving",
  "REST APIs",
];

export const navLinks = [
  { id: "about", label: "About", num: "01" },
  { id: "skills", label: "Skills", num: "02" },
  { id: "projects", label: "Projects", num: "03" },
  { id: "build-log", label: "Build Log", num: "04" },
  { id: "journey", label: "Journey", num: "07" },
  { id: "contact", label: "Contact", num: "08" },
];
