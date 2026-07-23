# docs/features/

Per-screen design specs, synced from Claude Design exploration. Each feature is a folder:

```
docs/features/<feature-name>/
  overview.md      — Purpose, Layout, Interaction, Animation, Accessibility, Acceptance Criteria
  artifacts.md      — Link(s) to the source Claude Design artifact, newest/best labeled
  screenshots/      — Reference images (static; won't show interaction or motion)
```

This is the design of record for a screen — check it before implementing or changing one. Cross-cutting stuff (color system, typography, the time-period taxonomy, Janus's voice) belongs in [docs/design-principles.md](../design-principles.md), not repeated inside a feature's `overview.md` — link to it instead.

## Status

Add `Status: exploring | ready to build | shipped` line at the top of each `overview.md` to remove ambiguity. Until a status is added, treat everything here as "best current understanding, confirm before relying on it for anything expensive to redo."

## Known gap

`docs/features/initial-mobile-flow-v1.md` predates this folder convention and doesn't follow it (no subfolder, no artifacts.md). It also describes a flow that contradicts the current Home spec — see the flag at the top of that file and the corresponding entry in [docs/product-decisions.md](../product-decisions.md).
