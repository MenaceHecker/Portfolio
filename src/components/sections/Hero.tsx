"use client";

import { motion } from "framer-motion";
import { siteConfig, stats } from "@/lib/data";
import { useCountUp } from "@/hooks/useCountUp";
import MagneticButton from "@/components/ui/MagneticButton";
import Typewriter from "@/components/ui/Typewriter";
import dynamic from "next/dynamic";

const GlobeCanvas = dynamic(() => import("@/components/ui/GlobeCanvas"), { ssr: false });

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function StatCount({ value, label }: { value: number; label: string }) {
  const { value: count, ref } = useCountUp(value);

  return (
    <div ref={ref}>
      <div className="text-[26px] md:text-[28px] font-extrabold text-text-primary leading-none">
        {count}+
      </div>
      <div className="font-mono text-[11px] text-text-dim mt-1 tracking-wider">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative">
      <div
        className="pointer-events-none absolute left-0 top-0 w-[700px] h-[500px] opacity-[0.06]"
        style={{ background: "radial-gradient(ellipse at 15% 50%, #3B82F6 0%, transparent 65%)" }}
      />

      <div className="flex flex-col md:flex-row items-center gap-8 px-5 md:px-10 pt-16 md:pt-24 pb-14 md:pb-20">

        {/* Left — text content (unchanged, just remove the px/pt/pb from motion.div) */}
        <motion.div
          className="flex-1 max-w-xl"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] text-blue tracking-widest uppercase border border-blue-border bg-blue-dim px-3 py-1.5 rounded">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue animate-[pulse-dot_2s_ease-in-out_infinite]" />
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[clamp(2rem,7vw,3.8rem)] font-extrabold leading-[1.07] tracking-tight text-text-primary mb-6"
          >
            Building{" "}
            <Typewriter
              words={["scalable backends.", "cloud infra.", "AI products.", "distributed systems."]}
              className="text-teal"
            />
            <br />
            <span className="text-text-muted/45">Engineered for scale.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-mono text-sm text-text-muted leading-relaxed max-w-[520px] mb-10"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
            <MagneticButton
              as="a"
              href="#projects"
              strength={0.25}
              className="inline-flex items-center gap-2 px-5 md:px-6 py-3 bg-blue text-bg-primary font-bold text-sm rounded-md hover:shadow-[0_8px_28px_rgba(59,130,246,0.32)] transition-shadow duration-200"
            >
              View Projects
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </MagneticButton>

            <MagneticButton
              as="a"
              href={siteConfig.resume}
              target="_blank"
              rel="noopener noreferrer"
              strength={0.25}
              className="inline-flex items-center gap-2 px-5 md:px-6 py-3 bg-transparent text-text-secondary text-sm font-semibold rounded-md border border-border-default hover:border-blue-border hover:bg-blue-dim transition-all duration-200"
            >
              Resume
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Right — globe (shown on all devices) */}
        <motion.div
          className="block w-[240px] md:w-[380px] flex-shrink-0 opacity-90"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlobeCanvas />
        </motion.div>

      </div>

      {/* Stats bar — 2-col grid on mobile, row on sm+ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.75, ease: "easeOut" }}
        className="grid grid-cols-2 sm:flex sm:flex-row gap-y-6 sm:gap-10 px-5 md:px-10 py-6 border-t border-b border-border-subtle"
      >
        {stats.map((stat, i) =>
          typeof stat.value === "number" ? (
            <StatCount key={i} value={stat.value} label={stat.label} />
          ) : (
            <div key={i}>
              <div className="text-[26px] md:text-[28px] font-extrabold text-text-primary leading-none">
                {stat.value}
              </div>
              <div className="font-mono text-[11px] text-text-dim mt-1 tracking-wider">
                {stat.label}
              </div>
            </div>
          )
        )}
      </motion.div>
    </section>
  );
}
