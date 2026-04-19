"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface GradientBorderCardProps {
  children: ReactNode;
  className?: string;
  featured?: boolean;
}

export default function GradientBorderCard({
  children,
  className = "",
  featured = false,
}: GradientBorderCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const opacity = useMotionValue(0);
  const smoothOpacity = useSpring(opacity, { stiffness: 120, damping: 20 });

  const handleMouseEnter = () => opacity.set(1);
  const handleMouseLeave = () => opacity.set(0);

  return (
    <div
      ref={ref}
      className={`relative rounded-xl ${featured ? "col-span-2" : ""} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated gradient border layer */}
      <motion.div
        className="absolute inset-0 rounded-xl z-0"
        style={{
          opacity: smoothOpacity,
          padding: "1px",
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.6) 0%, rgba(99,102,241,0.45) 50%, rgba(59,130,246,0.6) 100%)",
          backgroundSize: "200% 200%",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.7) 0%, rgba(99,102,241,0.5) 50%, rgba(59,130,246,0.7) 100%)",
            backgroundSize: "200% 200%",
          }}
        />
      </motion.div>

      {/* Static border fallback */}
      <div className="absolute inset-0 rounded-xl border border-border-default z-0 pointer-events-none" />

      {/* Card content */}
      <div className="relative z-10 bg-bg-card rounded-xl h-full">
        {children}
      </div>
    </div>
  );
}
