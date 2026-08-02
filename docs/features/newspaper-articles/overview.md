# Overview

Status: ready to build

This spec applies to all newspaper article screens, not just one destination — see [Visual language per time period group](#visual-language-per-time-period-group) below. Same parameterized-template relationship to [docs/features/newspapers/overview.md](../newspapers/overview.md): one structure, chrome follows the [time period group](../../design-principles.md#time-period-groups).

## Purpose

The newspaper article screen is displayed as the linked article from the newspaper home screen. It serves as a convincingly written representation of what the news story might be at that time and place.

## Layout

From top to bottom: In header/masthead, a back button at left, and a "temporal accuracy" indicator at right. A kicker line (category and location). Lead story with title, subtitle, and photo. News story copy at left, with small summarizing callouts at right. Share button. Footer.

## How to Arrive Here

Reached by tapping a story on the matching [newspaper screen](../newspapers/overview.md). The back button returns to that same newspaper screen (not Home).

## Interaction

This is a standard news article, much like for a newspaper such as The New York Times, Washington Post, BBC News, etc. that we see contemporaneously.

The page scrolls vertically. Tapping the back button returns the user to the newspaper home screen.

## Animation

See [docs/features/newspapers/overview.md](../newspapers/overview.md) to understand how this page animates simultaneously with the newspaper home screen.

## Accessibility

Text can be read aloud by a screen reader.

## Acceptance Criteria

### Header/Masthead

Back button, top left (circular, matches the newspaper screen's).

"TEMPORAL ACCURACY: NN%" pill, top right (bordered, rounded). Confirmed to be the same mechanic as the signal/accuracy indicator in [design-principles.md](../../design-principles.md#color-system) — value varies per article (73% on the Rome piece, 41% on the Moon piece) — but what specifically drives the number is still undefined.

### Title Region and Photo

- Kicker line: "[CATEGORY] · [LOCATION], [YEAR]" — a single eyebrow line, not the repeated pill row from the newspaper screen; the Layout section's "kicker line" wording is easy to misread as that same interactive pill list.
- Headline (large bold serif/display, wraps to ~3 lines) — matches the linked story's headline on the newspaper screen exactly.
- Blurb (italic) — matches the linked story's blurb exactly.
- Byline: "[SUB-LOCATION] · [YEAR]" — same sub-location as the newspaper screen's byline, but reformatted (bullet instead of em dash, city name dropped since it's already in the kicker above).
- Lead image placeholder, same treatment and same caption as the newspaper screen's lead story image (confirms it's the same image asset, not regenerated per screen).

### Story Copy and Side Summary

Two-column layout below the lead image:
- Left column (~60% width): body copy in paragraphs.
- Right column (~35% width), separated by a vertical rule: footnote-style margin notes, each prefixed with a symbol (†, ‡, §, …) matching a superscript marker inline in the body copy at the point it's referenced.

### Footer

Full-width share button, period-appropriate label (see table below). Not required to be functional for MVP — no share sheet / copy-link behavior needs to be wired up.

Sign-off caption, centered, below the button.

## Visual language per time period group

| | [Antiquity](rome-100-bce/) — Rome, 100 BCE | [Near-Future](the-moon/) — The Moon, 2150 |
|---|---|---|
| Temporal accuracy (example) | 73% | 41% |
| Margin note label | bare symbol only (†, ‡, §) | symbol + "DATA NOTE" label |
| Share button | "SHARE THIS DISPATCH", solid filled pill | "SHARE THIS TRANSMISSION", outlined pill |
| Footer sign-off | "END OF DISPATCH" | "SIGNAL END" |
| Chrome | parchment tone, warm serif, hairline rules | dark, thin geometric sans, thin grid background, cold blue accents |

See each instance's own `artifacts.md` / `screenshots/` for full visual reference.

## Known instances

- [rome-100-bce](rome-100-bce/) — Antiquity
- [the-moon](the-moon/) — Near-Future, year 2150 per its screenshots. Same naming question as the newspaper screen's instance — see [docs/features/newspapers/overview.md](../newspapers/overview.md#known-instances).
