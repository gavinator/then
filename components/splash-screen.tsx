"use client";

import { useEffect, useRef, useState } from "react";

// Sequence from docs/features/splash/overview.md: ribbon fades in first, then "Then." blooms
// in centered on the ribbon, then the tagline fades in below. See screenshots there.
//
// This component never unmounts itself — once the "hold" beat's duration elapses it calls
// onComplete but keeps rendering its final frame. The caller (app-shell) is responsible for
// fading this out and removing it, so the handoff to Home reads as a crossfade rather than
// a hard cut.
type Phase = "ribbon" | "wordmark" | "tagline" | "hold";

const NEXT_PHASE: Record<Phase, Phase | null> = {
  ribbon: "wordmark",
  wordmark: "tagline",
  tagline: "hold",
  hold: null,
};

const PHASE_DURATION_MS: Record<Phase, number> = {
  ribbon: 600,
  wordmark: 900,
  tagline: 700,
  hold: 900,
};

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("ribbon");
  const completedRef = useRef(false);

  useEffect(() => {
    const next = NEXT_PHASE[phase];
    const timer = setTimeout(() => {
      if (next) {
        setPhase(next);
      } else if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, PHASE_DURATION_MS[phase]);
    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  const wordmarkVisible = phase !== "ribbon";
  const taglineVisible = phase === "tagline" || phase === "hold";
  const ribbonFading = phase === "tagline" || phase === "hold";

  return (
    <div className="fixed inset-0 z-50 flex select-none items-center justify-center bg-black">
      <div
        aria-hidden
        className={`absolute left-1/2 top-1/2 h-px w-64 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ease-out ${
          ribbonFading ? "opacity-0" : "opacity-100"
        }`}
        style={{ background: "linear-gradient(90deg, transparent, #d4a455, transparent)" }}
      />
      <div className="relative flex flex-col items-center gap-3">
        <h1
          className={`font-serif text-5xl tracking-tight text-zinc-50 transition-opacity duration-[900ms] ease-out ${
            wordmarkVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            textShadow: wordmarkVisible ? "0 0 40px rgba(212,164,85,0.55)" : "0 0 0 rgba(212,164,85,0)",
            transition: "text-shadow 900ms ease-out",
          }}
        >
          Then.
        </h1>
        <p
          className={`text-sm tracking-[0.3em] text-zinc-400 transition-opacity duration-700 ease-out ${
            taglineVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          NEWS FROM WHENEVER
        </p>
      </div>
    </div>
  );
}
