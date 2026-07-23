# Initial Mobile Flow v1

[FLAGGED FOR REVIEW] This predates the current per-screen specs in `docs/features/splash/`, `docs/features/home/`, and `docs/features/travel-transition/`, and it directly contradicts them: this doc says complex time/era selectors were nixed for being too complicated, but `docs/features/home/overview.md` (and its screenshots) show the opposite — an oversize scrollable year picker across five time period groups is the current design of record. Keeping this file as-is since it's real decision history, not deleting or silently rewriting it — but flagging so a human confirms whether it's fully superseded or whether some part of "Design Notes" still applies (e.g., to a scope this flow covers that Home doesn't, like "view headlines" / "read article").

## Goal

Design a rough, testable flow that fulfills the original idea.

## Flow

Launch
↓
Choose date and destination
↓
View headlines
↓
Read article

## Design Notes

- Nixed several Home screen variants with time/era selectors that were too complicated, distracted from the clean aesthetic, or had the effect of reducing desired level of serendipity across the time spectrum.

## Open Questions

- Save behavior for destination, etc.
- Timeline interaction needs polished