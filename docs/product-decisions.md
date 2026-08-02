# Product Decisions

A running log of concrete product decisions and their rationale. Each entry should be dated and stay even after superseded (mark it superseded, don't delete it) so we can see how thinking evolved.

Format:

```
## YYYY-MM-DD — Decision title
Decision: what we decided.
Why: the reasoning / tradeoff that drove it.
Status: active | superseded by <link>
```

## 2026-07-22 — Home screen navigation model

Decision: The Home screen combines a year slider (bounded to the current era's start/end year, e.g. "Information Age, 1947 CE – 2030 CE") with a free-text/quick-select destination field (city name or "Unknown"), plus a three-way tone selector (Hopeful / Neutral / Dire) that isn't mentioned anywhere in the existing docs.

Why: Observed directly in the "Then. News App" Claude Design prototype (artifact `0b37f6b2-4086-464d-b7f3-c2b48c1366ed`), not invented — implemented as-is in [home-screen.tsx](../components/home/home-screen.tsx).

Status: **superseded** by 2026-07-22 — Home screen navigation model, v2 (below). The bounded-slider-per-era model this entry describes is replaced by a continuous scrollable year picker across the full timeline.

## 2026-07-22 — Home screen navigation model, v2

Decision: The year control is a continuous, horizontally-scrollable picker (not a bounded per-era slider) spanning the entire timeline across five time period groups (Antiquity, Print Era, Modernity, Near-Future, Deep Future), each with its own named sub-eras and year ranges. Scroll has momentum for covering centuries quickly and fine-grained control for landing on an exact year, with tick marks displayed during scroll. The destination pill list is dynamic: typing a destination not already in the list prepends it there after entry, and selecting a pill populates the input. The tone toggle (Hopeful / Neutral / Dire) animates between states. The accent color behind the picker and on the Travel button is tied to the selected time period **group**, not to tone, and blends smoothly across group boundaries.

Why: Specified in [docs/features/home/overview.md](../docs/features/home/overview.md) and confirmed visually across all five group screenshots in [docs/features/home/screenshots/](../docs/features/home/screenshots/). Full taxonomy lives in [design-principles.md](design-principles.md#time-period-groups).

Status: active, implemented ([home-screen.tsx](../components/home/home-screen.tsx), [lib/time-periods.ts](../lib/time-periods.ts)).

## 2026-07-22 — Splash sequence

Decision: Splash is three beats on a plain black background (no dimmed home screen visible behind it): a thin horizontal amber ribbon fades in first, then the "Then." wordmark blooms in centered on the ribbon, then the "NEWS FROM WHENEVER" tagline fades in below.

Why: Specified in [docs/features/splash/overview.md](../docs/features/splash/overview.md), shown in its three [screenshots](../docs/features/splash/screenshots/).

Status: active, implemented ([splash-screen.tsx](../components/splash-screen.tsx)).

## 2026-07-22 — Travel transition screen (new)

Decision: Tapping "Travel" on Home moves to a dedicated transition screen: centered content, a glowing "signal" dot, and copy that starts as "SIGNAL RESOLVING" / "[year]. The signal is faint, if the count holds." / "TAP TO RETURN", then after a couple seconds swaps the middle line to "The signal resolves. The year is [year]." Tapping anywhere returns to Home. This screen is called out as a likely future home for a real generation-progress indicator (see the live-vs-cached generation question below).

Why: Specified in [docs/features/travel-transition/overview.md](../docs/features/travel-transition/overview.md).

Status: active, implemented ([travel-transition.tsx](../components/travel-transition.tsx)).

## 2026-07-23 — Newspaper and newspaper article screens (new)

Decision: After the travel transition resolves, the user lands on a Newspaper (headlines) screen — masthead, horizontally-scrolling category pills, a lead story with image placeholder, and additional stories below — which links to a Newspaper Article screen (two-column body copy with margin footnotes, a "TEMPORAL ACCURACY: NN%" badge, a share button). Navigation between them is a horizontal push/pop slide, not the opacity crossfades used elsewhere in the app so far. The newspaper's back button returns to Home; the article's back button returns to the newspaper it came from (not Home).

Both screens are a single parameterized template — one spec, re-themed per time period group — not bespoke per instance. For MVP, only specific Year+Destination fixture combinations are wired (not live-generated): Rome/100 BCE (Antiquity) and The Moon/2150 (Near-Future) so far, each with visibly distinct chrome (masthead wording, category names, footer sign-off, margin-note style, share-button style — see the comparison table in [docs/features/newspapers/overview.md](../docs/features/newspapers/overview.md#visual-language-per-time-period-group)). Deeper per-sub-era granularity (e.g. a distinct look within Modernity for "Information Age" vs. "Interwar Crisis Era") is intended eventually but out of scope for MVP.

The "TEMPORAL ACCURACY: NN%" badge on the article screen is confirmed to be the same mechanic as the long-open signal/accuracy indicator question in [design-principles.md](design-principles.md#color-system) — though what specifically drives the number is still undefined. The category pills are confirmed to filter the story list conceptually, but don't need to be functional for the MVP flow. The share button doesn't need to be functional for the MVP flow either.

Why: Specified in [docs/features/newspapers/overview.md](../docs/features/newspapers/overview.md) and [docs/features/newspaper-articles/overview.md](../docs/features/newspaper-articles/overview.md).

Status: active, not yet implemented — no code exists for either screen yet. Resolves the "what happens after the travel transition resolves" open question below.

## Open questions (not yet decided)

- [DECISION NEEDED] Exact hex/token values for each time period group's accent color — see [design-principles.md](design-principles.md#color-system).
- [DECISION NEEDED] Information Age's upper bound: "present year" (dynamic) per the written taxonomy vs. a fixed 2030 shown in the original prototype screenshot — see [design-principles.md](design-principles.md#time-period-groups).
- [DECISION NEEDED] What does the Hopeful/Neutral/Dire tone selector actually control in generation — does it bias the AI-generated dispatch's outlook, or is it purely cosmetic?
- [DECISION NEEDED] Accessibility: how to avoid a screen reader announcing every tick as the year picker scrolls rapidly across centuries (see [docs/features/home/overview.md](../docs/features/home/overview.md)).
- [DECISION NEEDED] Save behavior for destination/year/tone selections between sessions (carried over from the now-superseded `docs/features/initial-mobile-flow-v1.md`).
- [DECISION NEEDED] Is dispatch content generated live per request, or pre-generated and cached? Affects cost, latency, and whether "unhurried" in the design philosophy means the UI is deliberately paced or that generation genuinely takes time and the UI leans into that wait. The travel transition screen's planned progress-indicator role (above) depends on this.
- [DECISION NEEDED] Is there a notion of session/history — saved dispatches, favorites, a "logbook" of eras visited — or is every visit ephemeral and stateless?
- [DECISION NEEDED] What does the signal/accuracy indicator, aka "TEMPORAL ACCURACY: NN%" on the article screen, actually derive from (a real computed measure vs. an authored/random value per fixture)?
- [DECISION NEEDED] Accounts, auth, monetization — free, subscription, or none of the above for v1?
- [DECISION NEEDED] Content moderation / guardrails for AI-generated "news" — especially for near-future dispatches that could read as real predictions, or historical dispatches touching real sensitive events.
- [DECISION NEEDED] Is real generated imagery planned for the newspaper/article lead-story placeholder, or is a captioned placeholder box the permanent treatment?
- [DECISION NEEDED] Each story's kicker label (e.g. "THE ASSEMBLY", "THE FRONTIER") doesn't exactly match any of that newspaper's category pill names, in either fixture instance — separate taxonomy, or should they map onto the pill categories?
- [DECISION NEEDED] The `the-moon` instance folder omits a year (unlike `rome-100-bce`) — confirm it's 2150 per its screenshots and whether it should be renamed `the-moon-2150` for consistency and to allow other years at the same destination later.
