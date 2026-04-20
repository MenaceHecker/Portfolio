"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Education() {
  return (
    <section id="education" className="px-5 md:px-10 py-12 md:py-16 border-t border-border-subtle">
      <SectionHeader index="04" label="education" />

      <div className="space-y-8">
        {education.map((item, i) => (
          <motion.div
            key={`${item.degree}-${item.institution}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
            className="rounded-xl border border-border-subtle bg-bg-card px-6 py-6 md:px-8"
          >
            <div className="font-mono text-[11px] text-text-dim tracking-wider mb-2">
              {item.graduation}
            </div>
            <div className="text-[16px] md:text-[18px] font-bold text-text-primary leading-snug">
              {item.degree}
            </div>
            <div className="font-mono text-[12px] text-blue mb-2">
              Area of Emphasis - {item.emphasis}
            </div>
            <p className="font-mono text-[12px] text-text-muted leading-relaxed">
              {item.institution}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
