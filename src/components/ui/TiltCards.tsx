"use client";

import { useEffect, useRef } from "react";

export default function TiltCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;

    // Create floating cards animation
    const cards: HTMLDivElement[] = [];
    const cardCount = 8;

    for (let i = 0; i < cardCount; i++) {
      const card = document.createElement('div');
      card.className = 'absolute w-16 h-16 bg-blue/10 border border-blue/20 rounded-lg backdrop-blur-sm';
      card.style.left = `${Math.random() * 80}%`;
      card.style.top = `${Math.random() * 80}%`;
      card.style.transform = `rotate(${Math.random() * 360}deg)`;
      container.appendChild(card);
      cards.push(card);
    }

    // Animation
    const animate = () => {
      animId = requestAnimationFrame(animate);

      cards.forEach((card, i) => {
        const time = Date.now() * 0.001;
        const offset = i * 0.5;
        const x = Math.sin(time + offset) * 20;
        const y = Math.cos(time + offset) * 20;
        const rotate = Math.sin(time * 0.5 + offset) * 5;

        card.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
        card.style.opacity = `${0.3 + Math.sin(time + offset) * 0.2}`;
      });
    };
    animate();

    // Cleanup
    return () => {
      if (animId) cancelAnimationFrame(animId);
      cards.forEach(card => card.remove());
    };
  }, []);

  return <div ref={containerRef} className="relative w-full h-32 overflow-hidden" />;
}