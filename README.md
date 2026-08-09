# F1 Interactive Hub — 2026 Season

A single-file, framework-free Formula 1 fan website. Open `f1.html` in any
modern browser — there is no build step, no dependencies, nothing to install.

## Features

- **Live 2026 championship data** — drivers' & constructors' standings as of the
  Hungarian Grand Prix (round 11 of 22), with every team's points matching the
  sum of its drivers' points (verified against public F1 data).
- **Next-race countdown** — live days/hours/minutes/seconds to the Dutch Grand
  Prix at Zandvoort (23 August 2026), in the hero and the calendar section.
- **All 11 teams** — cards with CSS-drawn F1 cars in each team's livery
  (wheels spin on hover), plus a detail modal with tabs:
  Overview, The Car (2026-spec power unit details), History, and 2026 Form.
- **All 22 drivers** — ranked grid with car numbers, flags, points, wins and
  positions.
- **Race calendar** — the remaining 11 rounds, sprint markers included.
- **Animated statistics** — count-up numbers on scroll.
- **Race-winner strip** — winners of all 11 completed grands prix.

## UX / Accessibility

- Fully responsive with a hamburger menu on mobile.
- Modal opens/closes via Escape, backdrop click, or the close button, with
  focus returned to the trigger afterwards.
- Scroll-reveal animations respect `prefers-reduced-motion`.
- Semantic sections, ARIA labels, keyboard-navigable team cards.

## What was fixed vs. the original version

- Duplicate `<html>` tag (invalid markup) removed; doctype added.
- Nav link to a nonexistent `#live` section removed (it's now real sections).
- The six team "car" boxes were empty CSS shells — replaced with drawn cars
  using each team's actual livery colors.
- Stats that randomly mutated real numbers every 10 seconds are gone; stats now
  animate to correct, factual values.
- Broken `::before` querySelector / parallax that shifted the whole hero
  section are fixed (subtle hero fade-slide instead).
- `switchTab` no longer relies on the implicit global `event`.
- Content updated from the 2024 season to the current 2026 season.

## Data sources

Standings, entry list, team principals and calendar reflect public F1 data as
of the Hungarian Grand Prix, 26 July 2026. This is an unofficial fan project
and is not affiliated with Formula 1, the FIA, or any team.
