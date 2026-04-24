export const siteConfig = {
  name: "Tushar Mishra",
  role: "Computer Science Graduate · University of Georgia",
  tagline: "Software Engineer. Backend systems, cloud platforms, and reliability.",
  description:
    "I build cloud-native, event-driven systems and internal platforms with a focus on observability, performance, and production reliability.",
  email: "mtushar2508@gmail.com",
  github: "https://github.com/MenaceHecker",
  linkedin: "https://www.linkedin.com/in/tushar-mishra-7960b722b/",
  resume: "/resume.pdf",
};

export const stats = [
  { value: 7, label: "featured projects" },
  { value: 6, label: "tech domains" },
  { value: 15, label: "technologies" },
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
    description: "Distributed observability stack",
    longDescription: "A comprehensive distributed observability platform that provides monitoring, logging, and visualization capabilities for complex systems.",
    metric: "Observability Platform",
    tags: ["Python", "Prometheus", "Grafana", "ELK", "Postgres"],
    github: "https://github.com/MenaceHecker/nexus",
    featured: true,
  },
  {
    id: "pulseforge",
    name: "PulseForge",
    description: "Event-driven backend platform",
    longDescription: "A robust event-driven backend platform designed for high-performance, scalable applications with asynchronous processing.",
    metric: "Backend Platform",
    tags: ["Java", "Spring Boot", "PostgreSQL", "JWT", "Async"],
    github: "https://github.com/MenaceHecker/pulseforge",
    featured: true,
  },
  {
    id: "mini-ml-platform",
    name: "Mini ML Platform",
    description: "End-to-end training + inference with MLflow registry",
    longDescription: "A complete machine learning platform that handles model training, versioning, and production inference with MLflow integration.",
    metric: "ML Platform",
    tags: ["Python", "FastAPI", "MLflow", "scikit-learn"],
    github: "https://github.com/MenaceHecker/mini-ml-platform",
  },
  {
    id: "procuroid",
    name: "Procuroid",
    description: "Autonomous multi-agent procurement platform (AI ATL 2025 HM)",
    longDescription: "An autonomous multi-agent system for procurement processes, featuring AI-driven decision making and automation.",
    metric: "AI ATL 2025 Honorable Mention",
    tags: ["Python", "Flask", "GCP", "Supabase", "Twilio", "ElevenLabs"],
    github: "https://github.com/avihhan/AIATL25",
  },
  {
    id: "movieit",
    name: "movieIt (iOS)",
    description: "Swift MVVM movie booking experience",
    longDescription: "A native iOS application for movie booking with a clean MVVM architecture and seamless user experience.",
    metric: "Mobile App",
    tags: ["Swift", "iOS", "MVVM", "REST APIs"],
    github: "https://github.com/MenaceHecker/movieit",
  },
  {
    id: "crumb",
    name: "Crumb",
    description: "Realtime social app with NFC-based friend adding",
    longDescription: "A real-time social application that uses NFC technology for instant friend connections and social interactions.",
    metric: "Social App",
    tags: ["React Native", "TypeScript", "Expo", "Supabase"],
    github: "https://github.com/MenaceHecker/crumb",
  },
];

export type SkillCategory = {
  title: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend & Systems",
    skills: ["Java (Spring Boot)", "Python (Flask, FastAPI)", "REST APIs", "Asynchronous Processing", "JWT & Role-Based Access Control", "System Design"],
  },
  {
    title: "Cloud & Infrastructure",
    skills: ["AWS (EC2, S3, Lambda, IAM, CloudWatch)", "Google Cloud Platform", "Docker", "Kubernetes (Kind / Minikube / EKS)", "CI/CD Pipelines", "Infrastructure Cost Optimization"],
  },
  {
    title: "Observability & Reliability",
    skills: ["Prometheus", "Grafana", "ELK Stack", "Service Level Objectives (SLOs)", "Error Budgets", "Monitoring & Alerting"],
  },
  {
    title: "Machine Learning & Data",
    skills: ["scikit-learn", "MLflow (Tracking & Registry)", "Model Training Pipelines", "Production Inference APIs", "Experiment Versioning"],
  },
  {
    title: "Frontend & UI",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Browser Extensions", "Responsive UI Design"],
  },
  {
    title: "Mobile Development",
    skills: ["Swift (iOS)", "Kotlin (Android)", "MVVM Architecture", "React Native", "Expo", "Mobile REST Integrations"],
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
    date: "Aug 2025 — Present",
    role: "IT Engineer",
    company: "Georgia Institute of Technology",
    description: "Platform automation, internal tooling, reliability systems development and maintenance.",
  },
  {
    date: "Jun 2024 — Aug 2024",
    role: "Software Engineer Intern",
    company: "CRST International",
    description: "Cloud services development, microservices architecture, observability implementation, and Kubernetes deployment.",
  },
  {
    date: "Jan 2024 — May 2024",
    role: "Lead Undergraduate Research Assistant",
    company: "LSDIS Lab — University of Georgia",
    description: "ML systems development, graph models research, AWS serverless architecture, and data engineering.",
  },
];

export type Education = {
  degree: string;
  emphasis: string;
  graduation: string;
  institution: string;
};

export const education: Education[] = [
  {
    degree: "Bachelor of Science in Computer Science",
    emphasis: "Artificial Intelligence",
    graduation: "August 2025",
    institution: "University of Georgia",
  },
];
