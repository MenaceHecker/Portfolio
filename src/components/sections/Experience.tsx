"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Experience() {
  return (
    <section id="experience" className="px-5 md:px-10 py-12 md:py-16 border-t border-border-subtle">
      <SectionHeader index="03" label="experience" />

      <div className="relative pl-7 md:pl-8">
        <div className="absolute left-0 top-2 bottom-2 w-px bg-border-subtle" />

        <div className="space-y-8 md:space-y-10">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[1.875rem] md:-left-[2.375rem] top-1.5 w-2 h-2 rounded-full bg-blue border-2 border-bg-primary" />

              <div className="font-mono text-[11px] text-text-dim tracking-wider mb-1">
                {exp.date}
              </div>
              <div className="text-[16px] md:text-[17px] font-bold text-text-primary leading-snug">
                {exp.role}
              </div>
              <div className="font-mono text-[12px] text-blue mb-2">{exp.company}</div>
              <p className="font-mono text-[12px] text-text-muted leading-relaxed max-w-xl">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
