"use client";

import { useState } from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import SplashScreen from "@/components/ui/SplashScreen";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashDone = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onDone={handleSplashDone} />}
      <main className="min-h-screen bg-bg-primary">
        <Navbar />
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
