# Design Principles

See [docs/features/](features/) for per-screen specs (layout, interaction, animation, acceptance criteria), screenshots, and Claude Design artifact links. This doc is the cross-cutting reference for tone, type, color, and the time-period taxonomy that those specs draw on.

## Visual Tone

- Dark by default — deep backgrounds, space-like depth, mystery
- Unhurried and atmospheric, not slick or fast
- Typography-forward — this is a reading app; type is the primary visual element
- Minimal UI chrome — the content and era should dominate
- The UI skin shifts subtly based on the destination era (past vs. future)

## Typography

- Headlines: a high-contrast editorial serif (something like Playfair Display or similar)
- Body: a clean, readable sans-serif
- Masthead / era titles: wide-tracked serif with gravitas

## Color System

- Base: near-black backgrounds (#0D0D0D or similar)
- Neutral text: warm off-white
- Muted text: medium warm gray
- Signal/accuracy indicators: amber fading to blue across the temporal spectrum

[DECISION NEEDED] What does the signal/accuracy indicator actually measure — is there an in-fiction reliability/hallucination mechanic tied to it, or is it purely decorative (era distance)?

Each time period group (below) carries its own accent color, used for the background glow, dividers, and the Travel button. Colors blend smoothly across the boundary as the user scrubs between adjacent groups. Per [docs/features/home/overview.md](features/home/overview.md) and its [screenshots](features/home/screenshots/):

- Antiquity — warm amber / aged gold
- Print Era — sepia / warm gold-brown (close to Antiquity's amber, slightly cooler)
- Modernity — newsprint red, with black/white
- Near-Future — cold sky blue
- Deep Future — electric purple / violet

[DECISION NEEDED] Exact hex/token values per group — the current reference is eyeballing the screenshots in docs/features/home/screenshots/. Worth exporting real design tokens from Claude Design rather than guessing values from a PNG.

## Time Period Groups

Five groups, each containing named sub-eras with their own year ranges. The large year picker on Home shows the sub-era name and range for whatever year is selected (see [docs/features/home/overview.md](features/home/overview.md)); the group determines the accent color and skin texture above.

**Antiquity** — warm amber tones, wide-tracked serif, subtle parchment grain texture
- Proto-Literate Era — c. 3000 BCE – 2800 BCE
- Urban Genesis — c. 2800 BCE – 2300 BCE
- Imperial Consolidation Era — c. 2300 BCE – 500 BCE
- Axial Philosophy Era — c. 500 BCE – 1 BCE
- Classical Zenith — c. 1 CE – 500 CE
- Feudal Decentralization Era — c. 500 CE – 1400 CE

**Print Era** — sepia and ink black, column-justified serif, paper texture
- Maritime Expansion Era — c. 1400 CE – 1650 CE
- Scientific Enlightenment Era — c. 1650 CE – 1800 CE

**Modernity** — clean newsprint: black, white, red accents
- Industrial Revolution — c. 1800 CE – 1914 CE
- Interwar Crisis Era — 1914 – 1947
- Information Age — 1947 CE – present year

**Near-Future** — deep space black, geometric thin sans, electric blue and silver accents
- Climate Apocalypse Era — 2030 – 2055
- Quantum Era — 2055 – 2080
- Interplanetary Era — 2080 – 2130
- Post-Human Era — 2130 – 2300

**Deep Future** — deep space black, more cryptic, electric purple accents
- Cosmos Era — 2300 – 2600
- Anthropocene Maximum — 2600 – 3000

[DECISION NEEDED] Information Age is specified as ending "present year" (dynamic), but the Home prototype's own screenshot shows it hard-bounded to 2030 (matching where Near-Future's Climate Apocalypse Era begins). Confirm whether Information Age's upper bound is meant to float with the real-world current date, or whether 2030 is the actual fixed boundary and "present year" in this doc is just describing today's era loosely.

Transition between time period groups uses a gradient/blend as the user scrubs between them — no hard cuts at boundaries.

## Janus Voice

Sample UI copy to inform the tone. See also [docs/features/travel-transition/overview.md](features/travel-transition/overview.md) for the signal-resolving copy pattern used during the travel transition.

- "The signal resolves. You are in London. The year is uncertain."
- "2187. The headlines here will unsettle you."
- "This transmission is fragmented. What you read may not be what was written."
- "Returning to the present. It will feel smaller than when you left."

[DECISION NEEDED] Is Janus a persistent, addressable companion (chat-like), or purely transitional narration between screens with no direct interaction?
