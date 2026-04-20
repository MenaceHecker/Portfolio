"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 28 });
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    document.documentElement.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role=button], input, textarea, select, label")) {
        setHovered(true);
      }
    };
    const onLeave = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role=button], input, textarea, select, label")) {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed z-[200] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: clicked ? 6 : 8,
          height: clicked ? 6 : 8,
          background: "#4ECDC4",
          opacity: hovered ? 0 : 1,
          transition: "width 0.15s, height 0.15s, opacity 0.2s",
        }}
      />

      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed z-[199] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 44 : clicked ? 28 : 36,
          height: hovered ? 44 : clicked ? 28 : 36,
          borderColor: hovered ? "rgba(78,205,196,0.9)" : "rgba(78,205,196,0.5)",
          borderWidth: hovered ? 2 : 1,
          background: hovered ? "rgba(78,205,196,0.06)" : "transparent",
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.2s, background 0.2s",
        }}
      />
    </>
  );
}
