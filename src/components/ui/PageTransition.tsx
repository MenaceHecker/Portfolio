"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransition() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* First panel — teal */}
          <motion.div
            className="fixed inset-0 z-[100] origin-left"
            style={{ background: "#4ECDC4" }}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />
          {/* Second panel — dark, slightly delayed */}
          <motion.div
            className="fixed inset-0 z-[99] origin-left"
            style={{ background: "#0a0c10" }}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.22 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
