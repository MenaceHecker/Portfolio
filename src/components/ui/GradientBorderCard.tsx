"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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

  // Gradient border opacity
  const borderOpacity = useMotionValue(0);
  const smoothBorder = useSpring(borderOpacity, { stiffness: 120, damping: 20 });

  // Tilt values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawY, { stiffness: 200, damping: 22 });
  const rotateY = useSpring(rawX, { stiffness: 200, damping: 22 });

  // Subtle shine position
  const shineX = useTransform(rawX, [-10, 10], ["0%", "100%"]);
  const shineY = useTransform(rawY, [-10, 10], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set(((e.clientX - cx) / rect.width) * 14);
    rawY.set(-((e.clientY - cy) / rect.height) * 10);
    borderOpacity.set(1);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    borderOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={`relative rounded-xl ${featured ? "col-span-2" : ""} ${className}`}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none z-0"
        style={{
          opacity: smoothBorder,
          padding: "1px",
          background: "linear-gradient(135deg, rgba(78,205,196,0.6) 0%, rgba(139,92,246,0.45) 50%, rgba(78,205,196,0.6) 100%)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{
            background: "linear-gradient(135deg, rgba(78,205,196,0.7) 0%, rgba(139,92,246,0.5) 50%, rgba(78,205,196,0.7) 100%)",
            backgroundSize: "200% 200%",
          }}
        />
      </motion.div>

      {/* Shine overlay */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none z-20 overflow-hidden"
        style={{ opacity: smoothBorder }}
      >
        <motion.div
          className="absolute w-32 h-32 rounded-full blur-2xl"
          style={{
            background: "rgba(78,205,196,0.06)",
            left: shineX,
            top: shineY,
            transform: "translate(-50%, -50%)",
          }}
        />
      </motion.div>

      {/* Static border fallback */}
      <div className="absolute inset-0 rounded-xl border border-border-default pointer-events-none z-0" />

      {/* Card content */}
      <div className="relative z-10 bg-bg-card rounded-xl h-full" style={{ transform: "translateZ(4px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
