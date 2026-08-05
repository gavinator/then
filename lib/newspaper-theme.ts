import type { TimePeriodGroupId } from "./time-periods";

// Eyeballed from docs/features/newspapers/*/screenshots and docs/features/newspaper-articles/*/screenshots,
// not real design tokens yet — same [DECISION NEEDED] as lib/time-periods.ts's group colors.
export type NewspaperTheme = {
  groupId: TimePeriodGroupId;
  pageBg: string;
  pageBgImage: string;
  textPrimary: string;
  textMuted: string;
  accent: string;
  divider: string;
  headingFont: "font-serif" | "font-sans";
  bodyFont: "font-serif" | "font-sans";
  bodyItalicMarginNotes: boolean;
  pillActiveStyle: { background: string; border: string; color: string };
  pillInactiveStyle: { border: string; color: string };
  imagePlaceholderBorder: string;
  imagePlaceholderBgImage: string;
  shareButtonStyle: "solid" | "outline";
  cornerClass: string;
};

const antiquityTheme: NewspaperTheme = {
  groupId: "antiquity",
  pageBg: "#e6dbc0",
  pageBgImage:
    "repeating-linear-gradient(180deg, rgba(61,43,31,0.035) 0px, rgba(61,43,31,0.035) 1px, transparent 1px, transparent 3px)",
  textPrimary: "#2b2013",
  textMuted: "#8a6a3f",
  accent: "#8a6a3f",
  divider: "#4a3826",
  headingFont: "font-serif",
  bodyFont: "font-serif",
  bodyItalicMarginNotes: true,
  pillActiveStyle: { background: "#e6dbc0", border: "#8a6a3f", color: "#2b2013" },
  pillInactiveStyle: { border: "#b3a077", color: "#5b4a30" },
  imagePlaceholderBorder: "#a3906a",
  imagePlaceholderBgImage:
    "repeating-linear-gradient(45deg, rgba(61,43,31,0.12) 0px, rgba(61,43,31,0.12) 2px, transparent 2px, transparent 14px)",
  shareButtonStyle: "solid",
  cornerClass: "rounded-none",
};

const nearFutureTheme: NewspaperTheme = {
  groupId: "near-future",
  pageBg: "#0a0e14",
  pageBgImage:
    "repeating-linear-gradient(0deg, rgba(110,195,240,0.06) 0px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, rgba(110,195,240,0.06) 0px, transparent 1px, transparent 24px)",
  textPrimary: "#e8edf2",
  textMuted: "#9fb3c8",
  accent: "#6ec3f0",
  divider: "#2a3a48",
  headingFont: "font-sans",
  bodyFont: "font-sans",
  bodyItalicMarginNotes: false,
  pillActiveStyle: { background: "rgba(110,195,240,0.12)", border: "#6ec3f0", color: "#e8edf2" },
  pillInactiveStyle: { border: "#2a3a48", color: "#9fb3c8" },
  imagePlaceholderBorder: "#3a5568",
  imagePlaceholderBgImage:
    "repeating-linear-gradient(0deg, rgba(110,195,240,0.08) 0px, transparent 1px, transparent 16px), repeating-linear-gradient(90deg, rgba(110,195,240,0.08) 0px, transparent 1px, transparent 16px)",
  shareButtonStyle: "outline",
  cornerClass: "rounded-none",
};

const themes: Partial<Record<TimePeriodGroupId, NewspaperTheme>> = {
  antiquity: antiquityTheme,
  "near-future": nearFutureTheme,
};

export function getNewspaperTheme(groupId: TimePeriodGroupId): NewspaperTheme {
  return themes[groupId] ?? antiquityTheme;
}
