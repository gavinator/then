// Shared with components/travel-transition.tsx, components/returning-transition.tsx, and
// app-shell.tsx so the CSS transition-duration on each overlay always matches the timeout
// AppShell uses to unmount it.
//
// Continue -> Newspaper is the "temporal tele-transport" moment and is deliberately the
// longest cross-fade in the app; Newspaper -> Home (returning) is shorter.
export const CONTINUE_CROSSFADE_MS = 1100;
export const RETURN_CROSSFADE_MS = 900;
