"use client";

import { useEffect, useRef } from "react";
import { RETURN_CROSSFADE_MS } from "@/lib/transition-timing";

const HOLD_MS = 1100;

// Shown when leaving the newspaper back to Home: same pulsing-dot motif as the outbound
// "SIGNAL RESOLVING" beat in TravelTransition, but automatic (no tap) and one-directional —
// it always ends by cross-fading into Home, never resolves into a middle state.
export function ReturningTransition({
  accentColor,
  fading = false,
  onHoldComplete,
}: {
  accentColor: string;
  // Set once the hold beat is done, to gently cross-fade this screen out and reveal Home
  // mounted underneath — see app-shell.tsx.
  fading?: boolean;
  onHoldComplete: () => void;
}) {
  const onHoldCompleteRef = useRef(onHoldComplete);

  useEffect(() => {
    onHoldCompleteRef.current = onHoldComplete;
  }, [onHoldComplete]);

  useEffect(() => {
    const timer = setTimeout(() => onHoldCompleteRef.current(), HOLD_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black px-8 text-center transition-opacity ease-out ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${RETURN_CROSSFADE_MS}ms` }}
    >
      <div
        className="h-3 w-3 rounded-full animate-[signal-pulse_2.4s_ease-in-out_infinite]"
        style={{ backgroundColor: accentColor, color: accentColor }}
      />
      <span className="text-xs tracking-[0.3em] text-zinc-500">RETURNING</span>
    </div>
  );
}
