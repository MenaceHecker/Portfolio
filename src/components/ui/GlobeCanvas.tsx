"use client";

import { useEffect, useRef } from "react";
import type { Vector3, WebGLRenderer, Scene, PerspectiveCamera, BufferGeometry, PointsMaterial, Points, TorusGeometry, MeshBasicMaterial, Mesh } from "three";

export default function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let THREE: typeof import("three") | null = null;

    // Dynamically import three to avoid SSR issues
    import("three").then((mod) => {
      const { Vector3: Vector3Ctor, WebGLRenderer: WebGLRendererCtor, Scene: SceneCtor, PerspectiveCamera: PerspectiveCameraCtor, BufferGeometry: BufferGeometryCtor, PointsMaterial: PointsMaterialCtor, Points: PointsCtor, TorusGeometry: TorusGeometryCtor, MeshBasicMaterial: MeshBasicMaterialCtor, Mesh: MeshCtor } = mod;

      const w = canvas.parentElement?.clientWidth ?? 420;
      const h = w;
      canvas.width = w;
      canvas.height = h;

      const renderer = new WebGLRendererCtor({ canvas, antialias: true, alpha: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new SceneCtor();
      const cam = new PerspectiveCameraCtor(45, 1, 0.1, 100);
      cam.position.set(0, 0, 3.2);

      // Dot-matrix sphere using Fibonacci spiral distribution
      const DOT_COUNT = 1800;
      const pts: Vector3[] = [];
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < DOT_COUNT; i++) {
        const y = 1 - (i / (DOT_COUNT - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i;
        pts.push(new Vector3Ctor(Math.cos(theta) * r * 1.15, y * 1.15, Math.sin(theta) * r * 1.15));
      }

      const geo = new BufferGeometryCtor().setFromPoints(pts);
      const mat = new PointsMaterialCtor({
        color: 0x3B82F6,
        size: 0.028,
        transparent: true,
        opacity: 0.75,
        sizeAttenuation: true,
      });
      const globe = new PointsCtor(geo, mat);
      scene.add(globe);

      // Faint equator ring
      const ringGeo = new TorusGeometryCtor(1.22, 0.003, 4, 80);
      const ringMat = new MeshBasicMaterialCtor({ color: 0x3B82F6, transparent: true, opacity: 0.18 });
      const ring = new MeshCtor(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);

      // Mouse drag
      let isDragging = false;
      let lastX = 0;
      let lastY = 0;
      let velX = 0;
      let velY = 0;

      const onDown = (e: MouseEvent | TouchEvent) => {
        isDragging = true;
        const pos = "touches" in e ? e.touches[0] : e;
        lastX = pos.clientX;
        lastY = pos.clientY;
        velX = 0;
        velY = 0;
      };
      const onMove = (e: MouseEvent | TouchEvent) => {
        if (!isDragging) return;
        const pos = "touches" in e ? e.touches[0] : e;
        velX = (pos.clientX - lastX) * 0.012;
        velY = (pos.clientY - lastY) * 0.012;
        globe.rotation.y += velX;
        globe.rotation.x += velY;
        ring.rotation.z += velX;
        lastX = pos.clientX;
        lastY = pos.clientY;
      };
      const onUp = () => { isDragging = false; };

      canvas.addEventListener("mousedown", onDown);
      canvas.addEventListener("touchstart", onDown, { passive: true });
      window.addEventListener("mousemove", onMove);
      window.addEventListener("touchmove", onMove, { passive: true });
      window.addEventListener("mouseup", onUp);
      window.addEventListener("touchend", onUp);

      // Resize
      const observer = new ResizeObserver(() => {
        const nw = canvas.parentElement?.clientWidth ?? 420;
        canvas.width = nw;
        canvas.height = nw;
        renderer.setSize(nw, nw);
      });
      if (canvas.parentElement) observer.observe(canvas.parentElement);

      // Animate
      const animate = () => {
        animId = requestAnimationFrame(animate);
        if (!isDragging) {
          velX *= 0.95;
          velY *= 0.95;
          globe.rotation.y += 0.0035 + velX;
          globe.rotation.x += velY;
          ring.rotation.z += 0.0015;
        }
        renderer.render(scene, cam);
      };
      animate();

      // Cleanup stored on canvas
      (canvas as HTMLCanvasElement & { _cleanup?: () => void })._cleanup = () => {
        cancelAnimationFrame(animId);
        observer.disconnect();
        canvas.removeEventListener("mousedown", onDown);
        canvas.removeEventListener("touchstart", onDown);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("mouseup", onUp);
        window.removeEventListener("touchend", onUp);
        renderer.dispose();
      };
    });

    return () => {
      const c = canvas as HTMLCanvasElement & { _cleanup?: () => void };
      c._cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full aspect-square cursor-grab active:cursor-grabbing"
      style={{ touchAction: "none" }}
    />
  );
}