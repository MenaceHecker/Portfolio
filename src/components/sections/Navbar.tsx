"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data";
import MagneticButton from "@/components/ui/MagneticButton";

const navLinks = [
  { href: "#projects", label: "projects" },
  { href: "#skills", label: "skills" },
  { href: "#experience", label: "experience" },
  { href: "#contact", label: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 flex items-center justify-between px-5 md:px-10 py-5 transition-all duration-300 ${
          scrolled || menuOpen
            ? "border-b border-border-subtle bg-bg-primary/90 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <a href="#" className="font-mono text-[15px] font-bold tracking-wider text-text-primary">
          TM<span className="text-blue">.</span>dev
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 list-none">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
              >
                <a
                  href={link.href}
                  className="font-mono text-[12px] text-text-muted tracking-widest hover:text-blue transition-colors duration-200"
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>
          <MagneticButton
            as="a"
            href={siteConfig.resume}
            target="_blank"
            rel="noopener noreferrer"
            strength={0.3}
            className="font-mono text-[12px] text-blue border border-blue-border px-3 py-1.5 rounded hover:bg-blue-dim transition-colors duration-200"
          >
            resume
          </MagneticButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 text-text-muted hover:text-blue transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block w-5 h-px bg-current origin-center transition-colors"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-px bg-current"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block w-5 h-px bg-current origin-center"
          />
        </button>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-[65px] z-40 overflow-hidden bg-bg-primary/95 backdrop-blur-xl border-b border-border-subtle md:hidden"
          >
            <ul className="flex flex-col px-5 py-4 gap-1 list-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block font-mono text-[13px] text-text-muted tracking-widest py-3 border-b border-border-subtle last:border-0 hover:text-blue transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <a
                  href={siteConfig.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-[12px] text-blue border border-blue-border px-4 py-2 rounded hover:bg-blue-dim transition-colors"
                >
                  resume ↓
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
