---
category: Forms
status: incoming
---

A date and a time, asked one after the other rather than on one surface.

```jsx
<DateTimeField value={when} onChange={setWhen} withTime />
<DateTimeField value={period} onChange={setPeriod} dateFormat="d MMM" hideIcon />
```

Two steps. The calendar first, with a footer row showing the time currently set; choosing
a day advances rather than commits. Then the time: the chosen day as a back button, an
input, a `NOW` chip, and the commit. Without `withTime` it is a plain date field that
commits on selection.

**Why it is two steps.** It replaced a single panel holding a calendar, a time input and a
Save button underneath, and that shape produced two complaints in live use. The first was
"there is no way for me to save" — the button was present, but read as unrelated to the
calendar above it. As the end of a sequence the same button is unmistakably the commit.
The second was the time silently resetting to midday whenever the day changed: a calendar
hands back midnight, and the old code rebuilt the value from the date alone. Carry the
hours, minutes, seconds and milliseconds across. A transaction's time decides the order
rows appear in, and losing it reorders someone's ledger.

Closing without committing restores the stored value, so an abandoned edit leaves no trace.

Use `withTime` only where the time is real. A budget period or a plan month has no time to
set, and offering one invites a decision that carries no information.

## Before this ships here

**It breaks the motion rule as built.** DESIGN.md says *"140–260ms with `--ease`; opacity,
colour and background only"*, with a single exception for an amount arcing between months.
The Moni implementation animates the panel's height between steps and slides each step
10px, because a popover that jumps from a 330px calendar to a 194px time panel reads as
two panels swapping rather than one surface changing its question.

Two honest resolutions, and this needs deciding before it lands rather than after:

1. **Fix the panel to the taller step and cross-fade only.** Fully compliant, no reflow,
   and arguably calmer than the morph. Costs a band of empty space under the time step.
2. **Give the core rule a narrow exception** for a surface that changes its question in
   place — a sequence, not a decoration. Or put the morphing variant in the expressive
   tier the roadmap already plans, and keep the cross-fade in the calm core.

**Moni has adopted this library's motion tokens verbatim** — `--ease` and the four
`--dur-*` values — so a component arriving from there already moves at these speeds. It
previously had its own curve and durations; aligning while a single component depended on
them was cheaper than reconciling later. Hairline is the source of those numbers; Moni's
`global.css` and `lib/motion.ts` follow it.

## Extraction notes

- Depends on `react-day-picker` and a popover primitive. Hairline should either take both
  as peers or accept the calendar through a render prop, since the calendar is the part
  most likely to be replaced.
- The selected day must take its colours from one token set that inverts together. The
  Moni original inherited shadcn's `--primary`, which is defined under `.dark` while the
  app's own tokens are defined under `[data-theme="dark"]` — nothing set either, so a
  selected day could land light-on-light.
- Web only. React Native needs a different calendar entirely; the native flow deserves
  designing rather than porting.

Prior art: the two-step sequence is adapted from Watermelon UI's `schedule-date`. Its own
motion is a `layoutId` thumb gliding between range ends and a `scale: 0 → 1` check; its
gradients and indigo glows are the decoration-first house style this library exists to
avoid. The sequence was worth having, the surface was not.
