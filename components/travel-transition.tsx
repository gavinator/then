"use client";

import { useEffect, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { formatYear } from "@/lib/time-periods";

const RESOLVE_DELAY_MS = 4200;
const CONTENT_FADE_MS = 200;

// Fades its children in from 0% to 100% opacity over CONTENT_FADE_MS. Give it a `key` that
// changes to re-trigger the fade-in on remount (e.g. when the resolving/resolved state flips).
function FadeIn({ children, className }: { children: ReactNode; className?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`ease-out ${className ?? ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transitionProperty: "opacity",
        transitionDuration: visible ? `${CONTENT_FADE_MS}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

export function TravelTransition({
  year,
  destination,
  accentColor,
  onReturn,
}: {
  year: number;
  destination: string;
  accentColor: string;
  onReturn: () => void;
}) {
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setResolved(true), RESOLVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onReturn();
    }
  }

  const formattedYear = formatYear(year);
  const preposition = destination.trim().toLowerCase() === "the moon" ? "on" : "in";

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Tap to return to Home"
      onClick={onReturn}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center gap-6 bg-black px-8 text-center"
    >
      {/* Mounted once, never remounted — it should just stop pulsing when resolved, not fade
          or reappear along with the text below. */}
      <FadeIn>
        <div
          aria-hidden
          className={`h-3 w-3 rounded-full ${resolved ? "" : "animate-[signal-pulse_2.4s_ease-in-out_infinite]"}`}
          style={{
            backgroundColor: accentColor,
            color: accentColor,
            boxShadow: resolved ? `0 0 20px 4px ${accentColor}` : undefined,
          }}
        />
      </FadeIn>

      <FadeIn key={resolved ? "resolved" : "pending"} className="flex flex-col items-center gap-6">
        <span className={`text-xs tracking-[0.3em] text-zinc-500 ${resolved ? "invisible" : ""}`}>SIGNAL RESOLVING</span>

        <p className="max-w-xs font-serif text-2xl italic leading-snug text-zinc-100">
          {resolved
            ? `The signal resolves. The year is ${formattedYear} ${preposition} ${destination}.`
            : `${formattedYear}. The signal is faint, if the count holds.`}
        </p>

        <span className={`text-xs tracking-[0.3em] text-zinc-500 ${resolved ? "invisible" : ""}`}>TAP TO RETURN</span>
      </FadeIn>
    </div>
  );
}
