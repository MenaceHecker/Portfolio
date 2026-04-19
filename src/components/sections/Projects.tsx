"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import TechTag from "@/components/ui/TechTag";
import GradientBorderCard from "@/components/ui/GradientBorderCard";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Projects() {
  return (
    <section id="projects" className="px-5 md:px-10 py-12 md:py-16 border-t border-border-subtle">
      <SectionHeader index="01" label="featured projects" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={item}
            className={project.featured ? "md:col-span-2" : ""}
          >
            <GradientBorderCard featured={false}>
              <div className={`p-5 md:p-6 ${project.featured ? "md:grid md:grid-cols-2 md:gap-8" : ""}`}>
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{project.name}</h3>
                  <p className="font-mono text-xs text-text-muted leading-relaxed mb-4">
                    {project.featured ? project.longDescription : project.description}
                  </p>
                  <span className="inline-flex items-center font-mono text-[11px] text-blue bg-blue-dim border border-blue-border px-2.5 py-1 rounded">
                    {project.metric}
                  </span>
                </div>

                <div className={project.featured ? "md:flex md:flex-col md:justify-between" : ""}>
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border-subtle">
                    {project.tags.map((tag) => (
                      <TechTag key={tag} label={tag} />
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] text-text-muted hover:text-blue transition-colors"
                      >
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                        GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] text-text-muted hover:text-blue transition-colors"
                      >
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </GradientBorderCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
