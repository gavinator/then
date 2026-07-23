"use client";

import { useMemo, useState } from "react";
import { DEFAULT_YEAR, getAccentColorForYear, getSubEraForYear } from "@/lib/time-periods";
import { defaultTone, type Tone } from "@/lib/tones";
import { YearPicker } from "./year-picker";
import { DestinationField } from "./destination-field";
import { ToneSelector } from "./tone-selector";
import { TravelButton } from "./travel-button";

export function HomeScreen({
  onTravel,
}: {
  onTravel: (year: number, destination: string) => void;
}) {
  const [year, setYear] = useState(DEFAULT_YEAR);
  const [destination, setDestination] = useState("");
  const [tone, setTone] = useState<Tone>(defaultTone);

  const subEra = useMemo(() => getSubEraForYear(year), [year]);
  const accentColor = useMemo(() => getAccentColorForYear(year), [year]);

  return (
    <main
      className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-8 px-6 py-16 text-zinc-50"
      style={{
        background: `radial-gradient(ellipse 140% 75% at 50% 16%, ${accentColor}66, ${accentColor}2e 55%, transparent 90%), #0a0a0a`,
      }}
    >
      <header className="border-b border-white/10 pb-4">
        <span className="font-serif text-4xl tracking-tight">Then.</span>
      </header>

      <YearPicker year={year} subEra={subEra} accentColor={accentColor} onChange={setYear} />

      <DestinationField value={destination} onChange={setDestination} />

      <ToneSelector value={tone} onChange={setTone} />

      <TravelButton accentColor={accentColor} onClick={() => onTravel(year, destination.trim() || "Unknown")} />
    </main>
  );
}
