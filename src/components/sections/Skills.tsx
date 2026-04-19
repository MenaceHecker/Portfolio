"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Skills() {
  return (
    <section id="skills" className="px-5 md:px-10 py-12 md:py-16 border-t border-border-subtle">
      <SectionHeader index="02" label="skills" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.title}
            variants={item}
            className="bg-bg-card border border-border-default rounded-xl p-4 md:p-5 hover:border-border-hover transition-colors duration-300"
          >
            <div className="font-mono text-[10px] text-blue tracking-widest uppercase mb-3 md:mb-4">
              {category.title}
            </div>
            <ul className="space-y-2 md:space-y-2.5">
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2 font-mono text-[11px] md:text-[12px] text-text-muted"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue/50 flex-shrink-0" />
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
