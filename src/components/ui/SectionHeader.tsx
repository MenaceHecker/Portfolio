"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  index: string;
  label: string;
}

export default function SectionHeader({ index, label }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 mb-10"
    >
      <span className="font-mono text-[11px] text-blue tracking-widest uppercase">
        {'// '}
        {index}
        {' — '}
        {label}
      </span>
      <div className="flex-1 h-px bg-border-subtle" />
    </motion.div>
  );
}
