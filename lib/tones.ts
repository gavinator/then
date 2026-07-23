export type Tone = "hopeful" | "neutral" | "dire";

export const tones: { id: Tone; label: string }[] = [
  { id: "hopeful", label: "Hopeful" },
  { id: "neutral", label: "Neutral" },
  { id: "dire", label: "Dire" },
];

export const defaultTone: Tone = "neutral";
