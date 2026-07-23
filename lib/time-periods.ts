import { lerpColor } from "./color";

export type TimePeriodGroupId = "antiquity" | "print-era" | "modernity" | "near-future" | "deep-future";

export type TimePeriodGroup = {
  id: TimePeriodGroupId;
  name: string;
  // Eyeballed from docs/features/home/screenshots/*.png, not real design tokens yet —
  // see the [DECISION NEEDED] in docs/design-principles.md#color-system.
  color: string;
};

export type SubEra = {
  id: string;
  name: string;
  groupId: TimePeriodGroupId;
  // Astronomical-ish year numbering: BCE years are negative (1 BCE = -1), CE years positive, no year 0.
  startYear: number;
  endYear: number;
  approx?: boolean;
};

export const MIN_YEAR = -3000;
export const MAX_YEAR = 3000;
export const DEFAULT_YEAR = 2026;

export const timePeriodGroups: TimePeriodGroup[] = [
  { id: "antiquity", name: "Antiquity", color: "#c99a44" },
  { id: "print-era", name: "Print Era", color: "#b98f5e" },
  { id: "modernity", name: "Modernity", color: "#c1523c" },
  { id: "near-future", name: "Near-Future", color: "#6ec3f0" },
  { id: "deep-future", name: "Deep Future", color: "#a17ee6" },
];

// Information Age is written as ending "present year" in design-principles.md, but that
// floats forever and would eventually overrun Near-Future's fixed 2030 start — the only
// internally-consistent reading (and what the original prototype screenshot shows) is a
// fixed 2030 boundary. Flagged as [DECISION NEEDED] there; revisit if resolved differently.
export const subEras: SubEra[] = [
  { id: "proto-literate", name: "Proto-Literate Era", groupId: "antiquity", startYear: -3000, endYear: -2800, approx: true },
  { id: "urban-genesis", name: "Urban Genesis", groupId: "antiquity", startYear: -2800, endYear: -2300, approx: true },
  { id: "imperial-consolidation", name: "Imperial Consolidation Era", groupId: "antiquity", startYear: -2300, endYear: -500, approx: true },
  { id: "axial-philosophy", name: "Axial Philosophy Era", groupId: "antiquity", startYear: -500, endYear: -1, approx: true },
  { id: "classical-zenith", name: "Classical Zenith", groupId: "antiquity", startYear: 1, endYear: 500, approx: true },
  { id: "feudal-decentralization", name: "Feudal Decentralization Era", groupId: "antiquity", startYear: 500, endYear: 1400, approx: true },

  { id: "maritime-expansion", name: "Maritime Expansion Era", groupId: "print-era", startYear: 1400, endYear: 1650, approx: true },
  { id: "scientific-enlightenment", name: "Scientific Enlightenment Era", groupId: "print-era", startYear: 1650, endYear: 1800, approx: true },

  { id: "industrial-revolution", name: "Industrial Revolution", groupId: "modernity", startYear: 1800, endYear: 1914, approx: true },
  { id: "interwar-crisis", name: "Interwar Crisis Era", groupId: "modernity", startYear: 1914, endYear: 1947 },
  { id: "information-age", name: "Information Age", groupId: "modernity", startYear: 1947, endYear: 2030 },

  { id: "climate-apocalypse", name: "Climate Apocalypse Era", groupId: "near-future", startYear: 2030, endYear: 2055 },
  { id: "quantum-era", name: "Quantum Era", groupId: "near-future", startYear: 2055, endYear: 2080 },
  { id: "interplanetary-era", name: "Interplanetary Era", groupId: "near-future", startYear: 2080, endYear: 2130 },
  { id: "post-human-era", name: "Post-Human Era", groupId: "near-future", startYear: 2130, endYear: 2300 },

  { id: "cosmos-era", name: "Cosmos Era", groupId: "deep-future", startYear: 2300, endYear: 2600 },
  { id: "anthropocene-maximum", name: "Anthropocene Maximum", groupId: "deep-future", startYear: 2600, endYear: 3000 },
];

export function getSubEraForYear(year: number): SubEra {
  const clamped = Math.min(MAX_YEAR, Math.max(MIN_YEAR, year));
  return subEras.find((era) => clamped >= era.startYear && clamped < era.endYear) ?? subEras[subEras.length - 1];
}

const groupRanges = timePeriodGroups.map((group) => {
  const erasInGroup = subEras.filter((era) => era.groupId === group.id);
  return {
    group,
    start: erasInGroup[0].startYear,
    end: erasInGroup[erasInGroup.length - 1].endYear,
  };
});

const BLEND_WINDOW_YEARS = 60;

export function getAccentColorForYear(year: number): string {
  const clamped = Math.min(MAX_YEAR, Math.max(MIN_YEAR, year));
  const rawIndex = groupRanges.findIndex((range) => clamped >= range.start && clamped < range.end);
  const index = rawIndex === -1 ? groupRanges.length - 1 : rawIndex;
  const current = groupRanges[index];

  const distanceToEnd = current.end - clamped;
  if (distanceToEnd <= BLEND_WINDOW_YEARS && index < groupRanges.length - 1) {
    const next = groupRanges[index + 1];
    const t = (1 - distanceToEnd / BLEND_WINDOW_YEARS) * 0.5;
    return lerpColor(current.group.color, next.group.color, t);
  }

  const distanceToStart = clamped - current.start;
  if (distanceToStart <= BLEND_WINDOW_YEARS && index > 0) {
    const prev = groupRanges[index - 1];
    const t = (1 - distanceToStart / BLEND_WINDOW_YEARS) * 0.5;
    return lerpColor(current.group.color, prev.group.color, t);
  }

  return current.group.color;
}

/** Bare number for CE years, explicit "N BCE" for BCE years — matches the big year-picker digit. */
export function formatYear(year: number): string {
  const rounded = Math.round(year);
  if (rounded === 0) return "1 BCE";
  return rounded < 0 ? `${-rounded} BCE` : `${rounded}`;
}

/** Always-explicit "N CE" / "N BCE" — matches the sub-era range subtitle. */
function formatYearWithEra(year: number): string {
  if (year === 0) return "1 BCE";
  return year < 0 ? `${-year} BCE` : `${year} CE`;
}

export function formatYearRange(era: SubEra): string {
  const prefix = era.approx ? "c. " : "";
  return `${prefix}${formatYearWithEra(era.startYear)} – ${formatYearWithEra(era.endYear)}`;
}
