"use client";

import { tones, type Tone } from "@/lib/tones";

export function ToneSelector({
  value,
  onChange,
}: {
  value: Tone;
  onChange: (tone: Tone) => void;
}) {
  return (
    <div role="radiogroup" aria-label="Dispatch tone" className="flex rounded-full border border-white/10 bg-black/40 p-1">
      {tones.map((tone) => (
        <button
          key={tone.id}
          type="button"
          role="radio"
          aria-checked={value === tone.id}
          onClick={() => onChange(tone.id)}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm transition-all duration-200 ${
            value === tone.id ? "scale-[1.02] bg-white/15 text-zinc-50" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {tone.label}
        </button>
      ))}
    </div>
  );
}
