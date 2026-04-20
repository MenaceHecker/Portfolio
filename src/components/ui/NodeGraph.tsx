"use client";

import { useEffect, useRef } from "react";

export default function NodeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let THREE: typeof import("three") | null = null;

    // Dynamically import three to avoid SSR issues
    import("three").then((mod) => {
      const { WebGLRenderer, Scene, PerspectiveCamera, BufferGeometry, PointsMaterial, Points, Vector3: Vector3Ctor, LineBasicMaterial, Line: LineCtor, BufferAttribute } = mod;
      type Vector3 = InstanceType<typeof Vector3Ctor>;
      type Line = InstanceType<typeof LineCtor>;

      const w = canvas.parentElement?.clientWidth ?? 280;
      const h = canvas.parentElement?.clientHeight ?? 280;
      canvas.width = w;
      canvas.height = h;

      const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new Scene();
      const cam = new PerspectiveCamera(45, w / h, 0.1, 100);
      cam.position.set(0, 0, 5);

      // Create nodes
      const nodeCount = 20;
      const nodes: Vector3[] = [];
      const connections: number[] = [];

      for (let i = 0; i < nodeCount; i++) {
        const x = (Math.random() - 0.5) * 4;
        const y = (Math.random() - 0.5) * 4;
        const z = (Math.random() - 0.5) * 2;
        nodes.push(new Vector3Ctor(x, y, z));
      }

      // Create connections between nearby nodes
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const distance = nodes[i].distanceTo(nodes[j]);
          if (distance < 1.5) {
            connections.push(i, j);
          }
        }
      }

      // Add node points
      const nodeGeo = new BufferGeometry().setFromPoints(nodes);
      const nodeMat = new PointsMaterial({
        color: 0x3B82F6,
        size: 0.08,
        transparent: true,
        opacity: 0.9,
      });
      const nodePoints = new Points(nodeGeo, nodeMat);
      scene.add(nodePoints);

      // Add connection lines
      let lines: Line | null = null;
      if (connections.length > 0) {
        const lineGeo = new BufferGeometry();
        const positions = new Float32Array(connections.length * 3);
        for (let i = 0; i < connections.length; i += 2) {
          const nodeA = nodes[connections[i]];
          const nodeB = nodes[connections[i + 1]];
          positions[i * 3] = nodeA.x;
          positions[i * 3 + 1] = nodeA.y;
          positions[i * 3 + 2] = nodeA.z;
          positions[(i + 1) * 3] = nodeB.x;
          positions[(i + 1) * 3 + 1] = nodeB.y;
          positions[(i + 1) * 3 + 2] = nodeB.z;
        }
        lineGeo.setAttribute('position', new BufferAttribute(positions, 3));
        const lineMat = new LineBasicMaterial({
          color: 0x3B82F6,
          transparent: true,
          opacity: 0.3,
        });
        lines = new LineCtor(lineGeo, lineMat);
        scene.add(lines);
      }

      // Animation
      const animate = () => {
        animId = requestAnimationFrame(animate);
        nodePoints.rotation.y += 0.002;
        if (lines) lines.rotation.y += 0.002;
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