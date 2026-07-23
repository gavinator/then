# Architecture

## Current stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- Deployed on Vercel

Note: this Next.js version has changes from what may be in an LLM's training data — see [AGENTS.md](../AGENTS.md) for where to check the installed docs before writing framework code.

## Current state

Splash + Home screens are implemented ([components/init-animation.tsx](../components/init-animation.tsx), [components/home/](../components/home)) but built against an earlier, now-superseded design (see [product-decisions.md](product-decisions.md) — "Home screen navigation model, v2"). They need rework to match the current spec in [docs/features/home/overview.md](features/home/overview.md): a continuous scrollable year picker (not a bounded per-era slider) spanning the full five-group timeline, with era-group-tied accent colors that blend at boundaries. The travel transition screen ([docs/features/travel-transition/](features/travel-transition/)) has no code yet. No data layer, no AI integration, no auth.

## Data model

The era taxonomy is two-level: a time period **group** (Antiquity / Print Era / Modernity / Near-Future / Deep Future — determines accent color and skin texture) containing named **sub-eras** with their own year ranges (determines the label shown under the year picker). Canonical list in [design-principles.md](design-principles.md#time-period-groups); implemented as data in [lib/eras.ts](../lib/eras.ts) (currently stubbed with only one sub-era — needs the full table).

## Open architecture questions

- [DECISION NEEDED] How are dispatches generated? Which model/provider, and is it called live per request or pre-generated and cached? (See the same open question in [product-decisions.md](product-decisions.md) — this is the technical half of that product question. The travel transition screen's planned role as a generation-progress indicator depends on this too.)
- [DECISION NEEDED] Data persistence — is there a database at all for v1, or is the app stateless (era in, dispatch out, nothing stored)? If persisted: user accounts, saved dispatches, or just caching generated content by era key?
- [DECISION NEEDED] Rendering strategy per time period group's skin (texture/color) — CSS theme values interpolated as the year scrubs, or discrete breakpoints per group with a crossfade at the edges?
- [DECISION NEEDED] The year picker needs continuous momentum-scroll behavior across ~6000 years with fine-grained control near a stop — is this a custom virtualized scroll component, or is there a library we should reach for rather than hand-rolling the physics?

## Conventions

- Per-screen UI specs live in [docs/features/<feature>/](features/) (`overview.md` for layout/interaction/animation/accessibility/acceptance criteria, `artifacts.md` for the Claude Design source link, `screenshots/` for reference images). Check there before implementing or changing a screen — it's the design of record, not this file.
- [DECISION NEEDED] Preferred implementation choices not yet established: folder structure beyond the default `app/` scaffold, state management approach, testing approach.
