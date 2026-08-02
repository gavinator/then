"use client";

import { useMemo, useState } from "react";
import { DEFAULT_YEAR, getAccentColorForYear, getSubEraForYear } from "@/lib/time-periods";
import { defaultTone, type Tone } from "@/lib/tones";
import { YearPicker } from "./year-picker";
import { DestinationField } from "./destination-field";
import { ToneSelector } from "./tone-selector";
import { TravelButton } from "./travel-button";

// Disintegration sequence on Travel: the 4 non-text controls fade out first, at random times,
// against the still-unchanged colorful background — then "Then" and "." (its period) fade out
// last, in that order — then, only after all of that, the background itself fades to black.
// Delaying the background fade is what keeps the disintegration itself visible instead of
// getting swallowed by the screen darkening at the same time.
const DISINTEGRATE_ELEMENT_COUNT = 4;
const DISINTEGRATE_MAX_DELAY_MS = 500;
const DISINTEGRATE_FADE_MS = 300;
const WORDMARK_FADE_DELAY_MS = 800;
const PERIOD_FADE_DELAY_MS = 1100;
const BACKGROUND_FADE_DELAY_MS = 1000;
const BACKGROUND_FADE_MS = 1000;
const DISINTEGRATE_TOTAL_MS = BACKGROUND_FADE_DELAY_MS + BACKGROUND_FADE_MS;

export function HomeScreen({
  onTravel,
}: {
  onTravel: (year: number, destination: string) => void;
}) {
  const [year, setYear] = useState(DEFAULT_YEAR);
  const [destination, setDestination] = useState("");
  const [tone, setTone] = useState<Tone>(defaultTone);
  const [fadeDelays, setFadeDelays] = useState<number[] | null>(null);

  const subEra = useMemo(() => getSubEraForYear(year), [year]);
  const accentColor = useMemo(() => getAccentColorForYear(year), [year]);

  function handleTravel() {
    if (fadeDelays) return;
    setFadeDelays(Array.from({ length: DISINTEGRATE_ELEMENT_COUNT }, () => Math.random() * DISINTEGRATE_MAX_DELAY_MS));
    setTimeout(() => onTravel(year, destination.trim() || "Unknown"), DISINTEGRATE_TOTAL_MS);
  }

  const fadeClass = `transition-opacity duration-300 ${fadeDelays ? "opacity-0" : "opacity-100"}`;

  function fadeStyle(index: number) {
    return fadeDelays ? { transitionDuration: `${DISINTEGRATE_FADE_MS}ms`, transitionDelay: `${fadeDelays[index]}ms` } : undefined;
  }

  return (
    <main
      className={`relative mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-8 px-6 py-16 text-zinc-50 ${fadeDelays ? "pointer-events-none" : ""}`}
      style={{
        background: `radial-gradient(ellipse 140% 75% at 50% 16%, ${accentColor}66, ${accentColor}2e 55%, transparent 90%), #0a0a0a`,
      }}
    >
      <div>
        <header className="pb-4">
          <span className="font-serif text-4xl tracking-tight">
            <span
              className={`transition-opacity duration-300 ${fadeDelays ? "opacity-0" : "opacity-100"}`}
              style={fadeDelays ? { transitionDelay: `${WORDMARK_FADE_DELAY_MS}ms` } : undefined}
            >
              Then
            </span>
            <span
              className={`transition-opacity duration-300 ${fadeDelays ? "opacity-0" : "opacity-100"}`}
              style={fadeDelays ? { transitionDelay: `${PERIOD_FADE_DELAY_MS}ms` } : undefined}
            >
              .
            </span>
          </span>
        </header>
        {/* Paired with the year picker's own divider below, not with "Then." — fades together
            with the year picker (index 0), not with the period. */}
        <div className={`h-px bg-white/10 ${fadeClass}`} style={fadeStyle(0)} />
      </div>

      <div className={fadeClass} style={fadeStyle(0)}>
        <YearPicker year={year} subEra={subEra} accentColor={accentColor} onChange={setYear} />
      </div>

      <div className={fadeClass} style={fadeStyle(1)}>
        <DestinationField value={destination} onChange={setDestination} />
      </div>

      <div className={fadeClass} style={fadeStyle(2)}>
        <ToneSelector value={tone} onChange={setTone} />
      </div>

      <div className={fadeClass} style={fadeStyle(3)}>
        <TravelButton accentColor={accentColor} onClick={handleTravel} />
      </div>

      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-black transition-opacity ease-out ${
          fadeDelays ? "opacity-100" : "opacity-0"
        }`}
        style={
          fadeDelays
            ? { transitionDuration: `${BACKGROUND_FADE_MS}ms`, transitionDelay: `${BACKGROUND_FADE_DELAY_MS}ms` }
            : undefined
        }
      />
    </main>
  );
}
