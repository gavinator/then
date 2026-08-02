# Overview

Status: ready to build

This spec applies to all newspaper screens, not just one destination — see [Visual language per time period group](#visual-language-per-time-period-group) below. It's a single parameterized template: same structure, but masthead, colors, typography, and vocabulary follow whichever [time period group](../../design-principles.md#time-period-groups) the selected year falls into. Deeper granularity per sub-era (e.g. a distinct look for "Information Age" vs. "Interwar Crisis Era" within Modernity) is planned eventually but out of scope for MVP.

## Purpose

The newspaper landing screen is displayed as the informational destination for the combined year and destination/location selection. It serves as a convincing representation of what news might appear at that time and place.

## Layout

From top to bottom: Newspaper name, date, etc. in header/masthead, with a back button at top left. Categories of news. Lead story with photo. Additional stories without photos. A possible advertisement at bottom or interleaved. Footer.

## How to Arrive Here

Reached by selecting a Year and Destination on Home and completing the travel transition. For MVP, only specific Year+Destination fixture combinations are wired up (not live-generated) — see [Known instances](#known-instances). The back button returns to the Then. Home screen.

## Interaction

This is a standard news homepage, much like for a newspaper such as The New York Times, Washington Post, BBC News, etc. that we see contemporaneously.

The page scrolls vertically. Tapping an article title and its blurb links you to the article page.

The category pill row filters the story list by category. For the MVP flow, this filtering need not actually be functional — the pills can render and show a selected state without changing the list.

## Animation

The newspaper landing page moves leftward out of the viewport simultaneous with the linked article page that moves leftward from out of the viewport to within full view. The inverse occurs when the user navigates back to the home screen from the article.

## Accessibility

Text can be read aloud by a screen reader.

## Acceptance Criteria

### Header/Masthead

Back button, top left (circular; returns to Home).

Three-line masthead, centered:
- Eyebrow: publisher mark + volume/relay identifier, small tracked caps
- Title: publication name, large serif/display type, wraps to two lines
- Subtitle: location · year · price-or-equivalent, small tracked caps

Full-width divider rule below the masthead.

### Categories of News

Horizontally-scrolling pill row of category names (time-period-appropriate vocabulary — see table below). One pill shown in an active/selected state. Filtering behavior described in Interaction above; not required to be functional for MVP.

### Lead Story

- Eyebrow label: "LEAD STORY" (or period-appropriate equivalent)
- Image placeholder: bordered box with centered caption in the form "[MEDIUM] · [CAPTION]" — placeholder pending real imagery; see the open question in [product-decisions.md](../../product-decisions.md) on whether generated imagery is planned
- Headline (bold serif/display, wraps up to ~3 lines)
- Blurb (italic, 1–3 lines)
- Byline: "LOCATION, SUB-LOCATION — YEAR"

### Additional Stories

Repeating pattern, separated by a divider rule between each:
- Kicker (small tracked caps, accent-colored) — a per-story sub-category label. Its relationship to the Categories-of-News pills above is unclear: kickers observed so far don't exactly match any pill name. [DECISION NEEDED] whether kickers are a separate, more granular taxonomy or should map onto the pill categories.
- Headline (bold serif/display, no image)
- Blurb (italic)
- Byline: "LOCATION — YEAR"

### Footer

Sign-off line + next-update line, period-appropriate (see table below).

## Visual language per time period group

Two instances exist so far. Everything below varies; layout structure doesn't.

| | [Antiquity](rome-100-bce/) — Rome, 100 BCE | [Near-Future](the-moon/) — The Moon, 2150 |
|---|---|---|
| Masthead eyebrow | "SPQR · VOL. DCLIV" | "SIGNAL RELAY · LUNA NET" |
| Masthead title | "The Republic Register" | "The Tranquility Wire" |
| Masthead subtitle | "ROME · 100 BCE · ONE AS" | "LUNA COLONY · 2150" |
| Category pills | Senate, Forum, Provinces, Games, Religion, Markets | Domes, Orbit, Mining, Transit, … |
| Lead story eyebrow | "LEAD STORY" | "LEAD TRANSMISSION" |
| Lead image caption style | "ENGRAVING · [caption]" | "VISUAL FEED · [caption]" |
| Footer | "END OF DISPATCH · NEXT EDITION AT DAWN" | "SIGNAL END · NEXT RELAY IN 06:00" |
| Chrome | parchment tone, warm serif, hairline rules | dark, thin geometric sans, thin grid background, cold blue accents |

See each instance's own `artifacts.md` / `screenshots/` for full visual reference — that per-instance detail isn't repeated here.

## Known instances

- [rome-100-bce](rome-100-bce/) — Antiquity
- [the-moon](the-moon/) — Near-Future, year 2150 per its screenshots. [DECISION NEEDED] the folder name omits the year (unlike `rome-100-bce`); confirm whether it should be `the-moon-2150` for consistency and to allow other years at the same destination later.
