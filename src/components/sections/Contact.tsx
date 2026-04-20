"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import MagneticButton from "@/components/ui/MagneticButton";
import dynamic from "next/dynamic";

const RadarRings = dynamic(() => import("@/components/ui/RadarRings"), { ssr: false });

const socialLinks = [
  {
    label: "GitHub",
    href: siteConfig.github,
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="px-5 md:px-10 py-12 md:py-16 border-t border-border-subtle">
      <SectionHeader index="04" label="contact" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-xl border border-blue-border bg-blue-dim px-6 py-10 md:px-10 md:py-14 text-center overflow-hidden"
      >
        <RadarRings />

        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(ellipse at 50% 0%, #3B82F6 0%, transparent 70%)" }}
        />

        <h2 className="text-[1.6rem] md:text-[2rem] font-extrabold text-text-primary mb-3 relative z-10">
          Let&apos;s build something.
        </h2>
        <p className="font-mono text-sm text-text-muted max-w-md mx-auto mb-8 md:mb-10 relative z-10">
          Open to full-time roles, contracts, and interesting problems in backend, cloud, or AI infra.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap relative z-10">
          <MagneticButton
            as="a"
            href={`mailto:${siteConfig.email}`}
            strength={0.3}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue text-bg-primary font-bold text-sm rounded-md hover:shadow-[0_8px_28px_rgba(59,130,246,0.35)] transition-shadow duration-200"
          >
            Get in Touch
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </MagneticButton>

          {socialLinks.map((link) => (
            <MagneticButton
              key={link.label}
              as="a"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              strength={0.25}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-transparent text-text-secondary text-sm font-semibold rounded-md border border-border-default hover:border-blue-border hover:bg-bg-card transition-all duration-200"
            >
              {link.icon}
              {link.label}
            </MagneticButton>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
