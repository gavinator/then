# Overview

Status: ready to build

## Purpose

The home screen is how users launch into a given year's news, giving them control over year, location, and tone.

## Layout

'Then.' brand and year picker occupy much of the top of the screen, while additional controls occupy the lower half.

## Interaction

The year picker is horizontally scrollable. It's easy for a user to scroll quickly across centuries or millennial, and it's equally easy for them to slow their scrolling to pinpoint a specific year selection—without having to fuss over tiny movements that inhibit the exact year from being effortlessly selected.

The destination input and pill group work together. The pills scroll horizontally. When a user types in a destination not yet shown in the pill group, it's later added to the beginning of the pill group list. If a user selects a pill from the list, it populates the input.

The tone toggle animates between states.

## Animation

The year picker displays tick marks to enhance and accentuate the rapid passing of years while scrolling.

## Accessibility

Text can be read aloud by a screen reader. [DECISION NEEDED] regarding how to minimize noisiness as years are scrolled.

## Acceptance Criteria

### Header

'Then.' displays at left within header region.

### Time Selection

An oversize year picker enables users to choose a desired year.

The full time period group and sub-era taxonomy (names, year ranges, and accent colors) is canonical in [docs/design-principles.md](../../design-principles.md#time-period-groups) — don't duplicate it here.

When a given year is selected, the corresponding sub-era name and year range display below the picker, and the time period group's accent color displays behind the picker. Colors blend smoothly between color states at the edge of contiguous time period groups.

### Destination Selection

Input labeled "Destination".

Pill group below, including default pills: New York, Rome, The Moon, Unknown.

### Tone Selection

Toggle button group, including default options: Hopeful, Neutral, Dire.

### Submit

Large button labeled "Travel".

When a given year is selected, the same color associated with a time period group also imbues the 'Travel' button. Both blend smoothly between color states, at the edge of contiguous time period groups.