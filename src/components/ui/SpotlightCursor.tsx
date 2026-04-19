"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function SpotlightCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    // Hide on touch-primary devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (isTouch) return null;

  return (
    <motion.div className="pointer-events-none fixed inset-0 z-30">
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: springX,
          top: springY,
          width: 520,
          height: 520,
          background:
            "radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
