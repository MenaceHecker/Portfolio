export const siteConfig = {
  name: "Tushar Mishra",
  role: "Backend / Cloud / Infrastructure Engineer",
  tagline: "Building scalable backend systems, cloud infrastructure, and AI-powered products",
  description:
    "I architect systems that handle scale — from distributed APIs to cloud-native deployments and AI-powered products.",
  email: "your@email.com", // TODO: update
  github: "https://github.com/tusharmishra", // TODO: update
  linkedin: "https://linkedin.com/in/tusharmishra", // TODO: update
  resume: "/resume.pdf", // TODO: add resume to /public
};

export const stats = [
  { value: "4+", label: "featured projects" },
  { value: "5+", label: "tech domains" },
  { value: "10+", label: "cloud & AI tools" },
  { value: "∞", label: "systems to build" },
];

export type Project = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  metric: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "nexus",
    name: "Nexus",
    description:
      "Scalable backend infrastructure — distributed systems architecture for high-throughput, fault-tolerant environments.",
    longDescription:
      "A distributed backend platform designed from the ground up for scale. Features include async task queuing, horizontal auto-scaling, circuit-breaker patterns, and observability dashboards.",
    metric: "Core Platform",
    tags: ["Python", "AWS", "PostgreSQL", "Docker", "Redis"],
    github: "https://github.com/tusharmishra/nexus", // TODO: update
    demo: "", // TODO: update
    featured: true,
  },
  {
    id: "huntai",
    name: "HuntAI",
    description:
      "AI-powered job hunting platform. Intelligent matching, automated outreach pipelines, and real-time market signal processing.",
    longDescription:
      "End-to-end AI job search assistant. Parses job postings with LLMs, matches against a skill profile, automates tailored outreach emails, and tracks application pipelines.",
    metric: "AI Product",
    tags: ["FastAPI", "LLM", "Celery", "AWS Lambda", "PostgreSQL"],
    github: "https://github.com/tusharmishra/huntai", // TODO: update
    demo: "", // TODO: update
  },
  {
    id: "crowdlens",
    name: "CrowdLens",
    description:
      "Real-time crowd analytics. Ingestion pipeline + ML inference + cloud-native deployment at scale.",
    longDescription:
      "Streaming data platform that ingests crowd sensor data via Kafka, runs ML inference for density and flow predictions, and visualises results in a live dashboard deployed on GCP.",
    metric: "Real-time",
    tags: ["Kafka", "Python", "GCP", "TensorFlow", "BigQuery"],
    github: "https://github.com/tusharmishra/crowdlens", // TODO: update
  },
  {
    id: "careersync",
    name: "CareerSync / InboxIQ",
    description:
      "Intelligent career workflow automation — email parsing, CRM sync, and AI-driven job application tracking.",
    longDescription:
      "Two-part product: InboxIQ parses incoming recruiter emails and extracts structured data; CareerSync syncs that data into a Kanban-style job tracker with AI-generated follow-up suggestions.",
    metric: "Automation",
    tags: ["Node.js", "GPT-4", "Supabase", "Vercel", "TypeScript"],
    github: "https://github.com/tusharmishra/careersync", // TODO: update
    demo: "", // TODO: update
  },
];

export type SkillCategory = {
  title: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend",
    skills: ["Python / FastAPI", "Node.js", "REST / GraphQL", "Celery / Workers", "System Design"],
  },
  {
    title: "Cloud",
    skills: ["AWS (Lambda, EC2, S3)", "GCP", "Docker / Kubernetes", "CI/CD Pipelines", "Terraform"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "Redis", "Supabase", "Kafka", "MongoDB"],
  },
  {
    title: "AI / Tools",
    skills: ["LLM APIs (GPT-4)", "LangChain", "TensorFlow", "Prompt Engineering", "Git / GitHub"],
  },
];

export type Experience = {
  date: string;
  role: string;
  company: string;
  description: string;
};

export const experiences: Experience[] = [
  {
    date: "2024 — Present",
    role: "Backend / Cloud Engineer",
    company: "Projects & Freelance",
    description:
      "Designed and shipped 4 production-grade systems spanning AI-powered platforms, real-time analytics, and cloud-native infrastructure.",
  },
  {
    date: "2022 — 2024",
    role: "IT Support Specialist",
    company: "Previous Role", // TODO: update company name
    description:
      "End-to-end infrastructure support, systems administration, and internal tooling — foundation for cloud and backend expertise.",
  },
];
