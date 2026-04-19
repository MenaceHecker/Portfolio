"use client";

export default function DotGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="dot-pattern"
            x="0"
            y="0"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="rgba(59,130,246,0.18)" />
          </pattern>
          <radialGradient id="dot-fade" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#0a0c10" stopOpacity="1" />
            <stop offset="55%" stopColor="#0a0c10" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0a0c10" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
        <rect width="100%" height="100%" fill="url(#dot-fade)" />
      </svg>
    </div>
  );
}
