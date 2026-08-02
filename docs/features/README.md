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

## Per-instance content screens

`newspapers/` and `newspaper-articles/` are a variant of the convention above: `overview.md` (the spec) lives at the screen-type level, since both are a single parameterized template across all time period groups — not bespoke per instance. Each instance subfolder underneath holds only the fixture-specific reference material:

```
docs/features/newspapers/overview.md
docs/features/newspapers/<year-destination>/          (artifacts.md, screenshots/)
docs/features/newspaper-articles/overview.md
docs/features/newspaper-articles/<year-destination>/  (artifacts.md, screenshots/)
```

Instance folders use kebab-case (`rome-100-bce`), matching the rest of the repo. See [docs/features/newspapers/overview.md](newspapers/overview.md#visual-language-per-time-period-group) for how the template's visual language varies by time period group, and that doc's "Known instances" section for the current list.
