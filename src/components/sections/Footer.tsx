"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data";

interface Particle {
  id: number;
  angle: number;
  distance: number;
  size: number;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [burst, setBurst] = useState(0);

  const triggerBurst = () => {
    const newParticles: Particle[] = Array.from({ length: 18 }, (_, i) => ({
      id: burst * 100 + i,
      angle: (i / 18) * 360 + Math.random() * 15,
      distance: 40 + Math.random() * 45,
      size: 3 + Math.random() * 4,
    }));
    setParticles(newParticles);
    setBurst((b) => b + 1);
    setTimeout(() => setParticles([]), 900);
  };

  return (
    <footer className="px-5 md:px-10 py-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-2">
      <div className="relative flex items-center gap-3">
        <button
          onClick={triggerBurst}
          className="font-mono text-[13px] font-bold text-text-primary hover:text-teal transition-colors duration-200 select-none cursor-pointer"
          aria-label="Easter egg"
        >
          TM<span className="text-teal">.</span>dev
        </button>

        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute pointer-events-none rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: p.id % 3 === 0 ? "#4ECDC4" : p.id % 3 === 1 ? "#8b5cf6" : "#f0f2f8",
                left: "50%",
                top: "50%",
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
                y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
                opacity: 0,
                scale: 0,
              }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </AnimatePresence>

        <span className="font-mono text-[11px] text-text-dim hidden sm:inline">
          © {year}
        </span>
      </div>

      <span className="font-mono text-[11px] text-text-dim">
        Built with Next.js + Tailwind + Framer Motion
      </span>
    </footer>
  );
}
