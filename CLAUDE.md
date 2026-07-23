@AGENTS.md

# Mission

In a world awash with news and information about the present, there's something about the past or future, including the distant past or future, that makes us wonder: What has been said, or what will be said, then? What stories were never told, or never will be?


# Project Guidelines

## Overview

"Then." is a mobile, time travel news app that delivers AI-generated news dispatches from the past and future. The app has a guide character named Janus who narrates the experience in a measured, knowing, slightly enigmatic voice — short sentences, never chatty, as if time is something to be spent carefully.

## Identity

- App name: Then.
- Tagline: News from whenever
- Character: Janus — an all-knowing guide who has witnessed every era


# Documentation

Start at [docs/product-spec.md](docs/product-spec.md) — it's the index and links out to everything below rather than duplicating it.

- [docs/vision.md](docs/vision.md) — mission, what success looks like, audience
- [docs/design-principles.md](docs/design-principles.md) — visual tone, typography, color system, time period group taxonomy, Janus voice
- [docs/architecture.md](docs/architecture.md) — stack, data flow, data model, open technical decisions
- [docs/product-decisions.md](docs/product-decisions.md) — decision log; check here before assuming a product question is unresolved
- [docs/roadmap.md](docs/roadmap.md) — phased milestones
- [docs/features/](docs/features/) — per-screen specs (layout, interaction, animation, acceptance criteria), screenshots, and Claude Design artifact links; this is the design of record for a given screen, synced from Claude Design exploration. See [docs/features/README.md](docs/features/README.md) for the folder convention.

Several of these still have `[DECISION NEEDED]` markers — don't fill those in unilaterally; surface them to the user. When a `docs/features/` spec and the current implementation disagree, the spec wins unless told otherwise — check [product-decisions.md](docs/product-decisions.md) for whether the gap is already tracked before re-raising it. `docs/prompts.md` is a personal prompt library for the user's own use in other tools — it's not instructions for you.


# Collaboration Style

- Before making major architectural changes, explain your reasoning.
- In general, prefer incremental changes over large rewrites.