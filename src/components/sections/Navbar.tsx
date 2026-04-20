"use client";

import { useState, useEffect, useRef } from "react";
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
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [localTime, setLocalTime] = useState("");
  const lastScrollY = useRef(0);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastScrollY.current || y < 60);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/New_York",
    });

    const syncTime = () => setLocalTime(formatter.format(new Date()));

    syncTime();
    const interval = window.setInterval(syncTime, 30_000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-5 left-0 right-0 z-50 flex justify-center px-5 pointer-events-none"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Glass card */}
        <div
          className="pointer-events-auto w-full max-w-2xl rounded-2xl border border-white/[0.07] backdrop-blur-2xl"
          style={{
            background: "rgba(10,12,16,0.6)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(78,205,196,0.04)",
          }}
        >
          <div className="flex items-center justify-between px-5 py-3">

            {/* Logo */}
            <a href="#" className="font-mono text-[14px] font-bold text-text-primary tracking-wider flex-shrink-0">
              TM<span className="text-teal">.</span>dev
            </a>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = active === id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative font-mono text-[11px] px-3 py-2 rounded-lg tracking-wider transition-colors duration-200 ${
                      isActive
                        ? "text-teal"
                        : "text-text-muted hover:text-text-primary hover:bg-white/[0.06]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-bg"
                        className="absolute inset-0 rounded-lg bg-teal/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right side — status + CTA (desktop) */}
            <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
              <div className="flex items-center gap-2 rounded-full border border-teal/15 bg-teal/[0.06] px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] text-teal">
                <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal/60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal" />
                </span>
                available
              </div>
              <div
                className="rounded-full border border-white/[0.08] px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-text-muted"
                title="Local time in Atlanta"
              >
                ATL {localTime || "--:--"}
              </div>
              <MagneticButton
                as="a"
                href="#contact"
                strength={0.3}
                className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 py-2 font-mono text-[11px] tracking-[0.18em] text-text-primary transition-colors duration-200 hover:border-teal/35 hover:bg-teal/[0.08] hover:text-teal"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-teal/10 text-teal transition-colors duration-200 group-hover:bg-teal/15">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                  </svg>
                </span>
                let&apos;s build
              </MagneticButton>
            </div>

            {/* Mobile — availability dot + hamburger */}
            <div className="flex md:hidden items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-teal animate-[pulse-dot_2s_ease-in-out_infinite]" />
              <button
                className="flex flex-col gap-[5px] p-1 text-text-muted hover:text-teal transition-colors"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                <motion.span animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-current origin-center" />
                <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-px bg-current" />
                <motion.span animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-current origin-center" />
              </button>
            </div>
          </div>

          {/* Mobile dropdown — inside the glass card */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden border-t border-white/[0.06]"
              >
                <ul className="flex flex-col px-4 py-3 gap-0.5 list-none">
                  {navLinks.map((link) => {
                    const id = link.href.replace("#", "");
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center gap-2 font-mono text-[12px] py-2.5 px-2 rounded-lg tracking-wider transition-colors ${
                            active === id ? "text-teal bg-teal/10" : "text-text-muted hover:text-text-primary"
                          }`}
                        >
                          {active === id && <span className="w-1 h-1 rounded-full bg-teal flex-shrink-0" />}
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                  <li className="mt-2 border-t border-white/[0.06] pt-3">
                    <div className="mb-3 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2">
                      <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-teal">
                        <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal/60" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal" />
                        </span>
                        available
                      </div>
                      <span className="font-mono text-[10px] tracking-[0.16em] text-text-muted">
                        ATL {localTime || "--:--"}
                      </span>
                    </div>
                    <a
                      href="#contact"
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 font-mono text-[11px] tracking-[0.18em] text-text-primary transition-colors duration-200 hover:border-teal/35 hover:bg-teal/[0.08] hover:text-teal"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-teal/10 text-teal">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                      let&apos;s build
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
