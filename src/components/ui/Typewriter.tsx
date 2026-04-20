"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
}

export default function Typewriter({
  words,
  className = "",
  typingSpeed = 60,
  deletingSpeed = 35,
  pauseMs = 1800,
}: TypewriterProps) {
  const longestWord = words.reduce((longest, word) =>
    word.length > longest.length ? word : longest, ""
  );
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const current = words[wordIndex % words.length];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          setIsPaused(true);
          setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, pauseMs);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((i) => i + 1);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, isPaused, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className={`inline-grid align-baseline ${className}`}>
      <span className="col-start-1 row-start-1 whitespace-pre-wrap break-words">
        {displayed}
        <span className="inline-block w-[2px] h-[0.85em] bg-current ml-0.5 align-middle animate-[pulse-dot_0.8s_ease-in-out_infinite]" />
      </span>
      <span
        aria-hidden="true"
        className="invisible col-start-1 row-start-1 whitespace-pre-wrap break-words"
      >
        {longestWord}
        <span className="inline-block w-[2px] h-[0.85em] ml-0.5 align-middle" />
      </span>
    </span>
  );
}
