"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import dynamic from "next/dynamic";

const HelixTimeline = dynamic(() => import("@/components/ui/HelixTimeline"), { ssr: false });

export default function Experience() {
  return (
    <section id="experience" className="px-5 md:px-10 py-12 md:py-16 border-t border-border-subtle">
      <SectionHeader index="03" label="experience" />

      <div className="flex gap-6 md:gap-10 items-stretch">
        <div className="hidden md:block w-16 flex-shrink-0">
          <HelixTimeline />
        </div>

        <div className="flex-1 space-y-8 md:space-y-10">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              className="relative"
            >
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
