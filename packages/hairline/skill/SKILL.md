---
name: hairline-design
description: Use this skill to generate well-branded interfaces and assets for Hairline, the calm-money design direction — monochrome ink on paper, mono uppercase labels, tabular figures, generous space, colour reserved for data. Either for production or throwaway prototypes and mocks. Contains design guidelines, colours, type, fonts, and a component library for prototyping.
user-invocable: true
---

# Hairline

Read `DESIGN.md` first — it is the design spec, and it decides most questions
before you ask them. Then pick a surface:

| Building | Use |
| --- | --- |
| A mock, a slide, a throwaway HTML prototype | `hairline.css` + the classes in `CLASSES.md` |
| A React web app | `import { Button } from '@hairline/ds'` + `import '@hairline/ds/hairline.css'` |
| A React Native / Expo app | `import { Button } from '@hairline/ds/native'` |
| Something with its own components | `tokens.css` alone — the `var(--*)` layer |

## For static HTML

Link `hairline.css` and write the markup in `CLASSES.md`. Nothing else is required:
no build step, no npm, no JavaScript.

```html
<link rel="stylesheet" href="hairline.css">

<div class="hl-tile hl-tile--dark">
  <div class="hl-tile__head"><span class="hl-tile__label">Available</span></div>
  <div class="hl-stat hl-stat--l">
    <div class="hl-stat__row">
      <span class="hl-stat__value">227&thinsp;400</span>
      <span class="hl-stat__unit">XAF</span>
    </div>
  </div>
</div>
```

## Rules that are easy to get wrong

- **Colour is data only.** Chrome is monochrome. An accent means a category, a
  series or a status — never decoration, never a border-only accent.
- **One solid button per view.** If two `hl-btn--solid` are visible, one is wrong.
- **Every figure in a table is mono and tabular** (`hl-data`, or `hl-row__amount`).
  A figure never appears in the sans in a table, and prose never appears in the mono.
- **Uppercase is only ever the mono label** (`hl-label`). Everything else is
  sentence case, buttons included.
- **Say the number, then say what it means.** A `hl-stat__value` wants a
  `hl-stat__note` under it with one line of plain consequence.
- **Structure by hairline, not by box.** No vertical rules, no zebra striping, no
  cell borders. Cards get a fill, not a border.
- **No emoji, no exclamation marks, no gradients, no photography.**

## What is not here

No logo, no icon assets, no dark theme. For icons use Lucide (`lucide-static`) —
same 24px grid, round caps, ~1.75 stroke — and note the substitution.

## Files

| File | What it is |
| --- | --- |
| `DESIGN.md` | The design spec: voice, colour, type, space, motion. Read first. |
| `CLASSES.md` | Every class in `hairline.css`, generated from the stylesheet. |
| `hairline.css` | Tokens + components. The one file to link. |
| `tokens.css` | The `var(--*)` layer alone. |
| `hairline.d.ts` | The React prop contracts, from the build. |
| `components/` | Per-component usage notes — when to reach for each one. |
| `guidelines/` | Foundation specimen cards. |
