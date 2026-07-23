# Overview

Status: ready to build

## Purpose

The travel transition screen displays after users have clicked the 'Travel' button, segueing into the alternate time period and the corresponding UI change for that time period.

In the future, this screen may also serve as a progress indicator, giving the app time to generate copy, images, etc. for the time period's newspaper on the fly.

## Layout

Content resides at center middle.

## Interaction

Users can tap the screen to immediately return to the Home screen.

## Animation

A small dot representing the "signal" glows in and out.

## Accessibility

Text can be read aloud by a screen reader.

## Acceptance Criteria

Starting state, from top to bottom:
- Small, glowing dot
- "SIGNAL RESOLVING" in small font
- "[YEAR SELECTED] The signal is faint, if the count holds."
- "TAP TO RETURN" in small font

Resolving state, displaying after a couple seconds:
- "[YEAR SELECTED]..." is replaced with "The signal resolves. The year is [YEAR SELECTED]."