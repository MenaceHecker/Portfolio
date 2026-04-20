"use client";

import { useEffect, useRef } from "react";

export default function HelixTimeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let THREE: typeof import("three") | null = null;

    // Dynamically import three to avoid SSR issues
    import("three").then((mod) => {
      const { WebGLRenderer, Scene, PerspectiveCamera, BufferGeometry, PointsMaterial, Points, Vector3: Vector3Ctor } = mod;
      type Vector3 = InstanceType<typeof Vector3Ctor>;

      const w = canvas.parentElement?.clientWidth ?? 64;
      const h = canvas.parentElement?.clientHeight ?? 400;
      canvas.width = w;
      canvas.height = h;

      const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new Scene();
      const cam = new PerspectiveCamera(45, w / h, 0.1, 100);
      cam.position.set(0, 0, 5);

      // Create helix points
      const points: Vector3[] = [];
      const turns = 8;
      const pointsPerTurn = 50;
      const radius = 0.8;
      const height = 3;

      for (let i = 0; i < turns * pointsPerTurn; i++) {
        const t = (i / (turns * pointsPerTurn - 1)) * Math.PI * 2 * turns;
        const y = (i / (turns * pointsPerTurn - 1) - 0.5) * height;
        const x = Math.cos(t) * radius;
        const z = Math.sin(t) * radius;
        points.push(new Vector3Ctor(x, y, z));
      }

      const geo = new BufferGeometry().setFromPoints(points);
      const mat = new PointsMaterial({
        color: 0x3B82F6,
        size: 0.05,
        transparent: true,
        opacity: 0.8,
      });

      const helix = new Points(geo, mat);
      scene.add(helix);

      // Animation
      const animate = () => {
        animId = requestAnimationFrame(animate);
        helix.rotation.y += 0.005;
        renderer.render(scene, cam);
      };
      animate();

      // Cleanup
      return () => {
        if (animId) cancelAnimationFrame(animId);
        renderer.dispose();
      };
    });

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}