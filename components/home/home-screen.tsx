"use client";

import { useMemo, useState } from "react";
import { DEFAULT_YEAR, getAccentColorForYear, getSubEraForYear } from "@/lib/time-periods";
import { defaultTone, type Tone } from "@/lib/tones";
import { YearPicker } from "./year-picker";
import { DestinationField } from "./destination-field";
import { ToneSelector } from "./tone-selector";
import { TravelButton } from "./travel-button";

const DISINTEGRATE_ELEMENT_COUNT = 5;
const DISINTEGRATE_MAX_DELAY_MS = 650;
const DISINTEGRATE_FADE_MS = 300;
const DISINTEGRATE_TOTAL_MS = 1000;

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
      className={`mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-8 px-6 py-16 text-zinc-50 ${fadeDelays ? "pointer-events-none" : ""}`}
      style={{
        background: `radial-gradient(ellipse 140% 75% at 50% 16%, ${accentColor}66, ${accentColor}2e 55%, transparent 90%), #0a0a0a`,
      }}
    >
      <header className={`border-b border-white/10 pb-4 ${fadeClass}`} style={fadeStyle(0)}>
        <span className="font-serif text-4xl tracking-tight">Then.</span>
      </header>

      <div className={fadeClass} style={fadeStyle(1)}>
        <YearPicker year={year} subEra={subEra} accentColor={accentColor} onChange={setYear} />
      </div>

      <div className={fadeClass} style={fadeStyle(2)}>
        <DestinationField value={destination} onChange={setDestination} />
      </div>

      <div className={fadeClass} style={fadeStyle(3)}>
        <ToneSelector value={tone} onChange={setTone} />
      </div>

      <div className={fadeClass} style={fadeStyle(4)}>
        <TravelButton accentColor={accentColor} onClick={handleTravel} />
      </div>
    </main>
  );
}
