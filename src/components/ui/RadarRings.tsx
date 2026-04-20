"use client";

import { useEffect, useRef } from "react";

export default function RadarRings() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let THREE: typeof import("three") | null = null;

    // Dynamically import three to avoid SSR issues
    import("three").then((mod) => {
      const { WebGLRenderer, Scene, PerspectiveCamera, RingGeometry, MeshBasicMaterial, Mesh: MeshCtor } = mod;
      type Mesh = InstanceType<typeof MeshCtor>;
      type MeshBasicMaterial = InstanceType<typeof MeshBasicMaterial>;

      const w = canvas.parentElement?.clientWidth ?? 400;
      const h = canvas.parentElement?.clientHeight ?? 300;
      canvas.width = w;
      canvas.height = h;

      const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new Scene();
      const cam = new PerspectiveCamera(45, w / h, 0.1, 100);
      cam.position.set(0, 0, 5);

      // Create multiple radar rings
      const ringCount = 5;
      const rings: Mesh[] = [];

      for (let i = 0; i < ringCount; i++) {
        const innerRadius = 0.5 + i * 0.3;
        const outerRadius = innerRadius + 0.1;
        const geo = new RingGeometry(innerRadius, outerRadius, 64);
        const mat = new MeshBasicMaterial({
          color: 0x3B82F6,
          transparent: true,
          opacity: 0.1 + (i / ringCount) * 0.2,
          side: 2, // DoubleSide
        });
        const ring = new MeshCtor(geo, mat);
        ring.rotation.x = Math.PI / 2; // Lay flat
        rings.push(ring);
        scene.add(ring);
      }

      // Animation - rotating sweep
      let sweepAngle = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        sweepAngle += 0.02;

        // Animate rings with different speeds
        rings.forEach((ring, i) => {
          ring.rotation.z = sweepAngle * (0.5 + i * 0.2);
          (ring.material as any).opacity = (0.1 + (i / ringCount) * 0.2) * (0.5 + 0.5 * Math.sin(sweepAngle + i));
        });

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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}