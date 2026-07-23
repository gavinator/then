"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import { defaultDestinations } from "@/lib/destinations";

export function DestinationField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [pills, setPills] = useState<string[]>(defaultDestinations);

  function commit() {
    const trimmed = value.trim();
    if (!trimmed) return;
    setPills((prev) =>
      prev.some((place) => place.toLowerCase() === trimmed.toLowerCase()) ? prev : [trimmed, ...prev],
    );
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      commit();
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="destination" className="text-xs tracking-[0.25em] text-zinc-500">
        DESTINATION
      </label>
      <input
        id="destination"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        placeholder="Where does the signal find you?"
        className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-white/30 focus:outline-none"
      />
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {pills.map((place) => (
          <button
            key={place}
            type="button"
            onClick={() => onChange(place)}
            aria-pressed={value === place}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
              value === place
                ? "border-white/40 text-zinc-50"
                : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-zinc-200"
            }`}
          >
            {place}
          </button>
        ))}
      </div>
    </div>
  );
}
