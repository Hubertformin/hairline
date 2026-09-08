## How to build with Hairline

**No provider, no wrapper, no theme setup.** Hairline is a plain CSS-custom-property
system: `styles.css` imports `_ds_bundle.css`, which defines every token on `:root`
and carries the component classes. Import the components and they are styled.
There is no `ThemeProvider` and no dark theme — do not invent one.

The design direction in one line: **monochrome ink on paper, mono uppercase labels,
tabular figures, generous space, and colour reserved for data.**

### Two ways to style, and when to use each

**1. Components** (`window.Hairline.*`) — always prefer these for UI parts:
`Button`, `IconButton`, `Chip`, `Badge`, `Field`, `Select`, `Toggle`,
`SegmentedTabs`, `Tile`, `StatBlock`, `DataRow`, `MeterBar`.

**2. Tokens + the `.hl-` classes** for your own layout glue. There is no utility
framework here — no Tailwind, no spacing utilities. Write real CSS using the tokens:

```css
.summary { padding: var(--pad-card); border-radius: var(--r-card); background: var(--surface-2); }
```

The class vocabulary you may reuse directly (everything else is composed from tokens):
`.hl-board` (a white board on the desk), `.hl-label` (the mono uppercase label),
`.hl-data` (any figure in a table), `.hl-marker` (the highlighter),
`.hl-hairline` (a 1px rule).

### The tokens, by family

- **Ink**: `--ink-1` `--ink-2` `--ink-3` `--ink-4`. Meaningful text is never lighter
  than `--ink-3`; `--ink-4` is placeholders and chrome only.
- **Surfaces**: `--paper` `--surface-1` `--surface-2` `--surface-3` `--desk`.
  Two greys inside a board — resist a third.
- **Lines**: `--line-1` `--line-2`. Two weights, no more.
- **Accents** (data only, never chrome): `--a-blue` `--a-violet` `--a-purple`
  `--a-magenta` `--a-rose` `--a-coral` `--a-amber` `--a-yellow` `--a-lemon` `--a-green`.
- **Semantic pairs** — ink and wash always travel together: `--alarm`/`--alarm-wash`,
  `--positive`/`--positive-wash`, `--info`/`--info-wash`, `--caution`/`--caution-wash`.
  Plus `--marker`, the highlighter, once per screen.
- **Type**: `--type-figure-xl|l|m|s` (with `--track-figure`), `--type-lead`,
  `--type-body`, `--type-body-s`, `--type-caption`, `--type-label`, `--type-label-s`
  (with `--track-label`), `--type-data`, `--type-data-s`, `--numeric-data`.
- **Space**: `--s-1` … `--s-14`, `--gap-tile`, `--gap-column`, `--pad-board`,
  `--pad-card`, `--pad-row`, `--clearance-bar`.
- **Shape**: `--r-board` `--r-card` `--r-inner` `--r-field` `--r-chip` `--r-pill`,
  `--h-control` `--h-field` `--h-field-lg` `--h-pill` `--h-touch`, `--shadow-raised`.
- **Motion**: `--ease`, `--dur-fast|base|slow`.

### Rules that are easy to get wrong

- **Colour is data only.** Chrome is monochrome. An accent means a category, a series
  or a status — never decoration, never a border-only accent.
- **One `tone="solid"` Button per view.** If two are visible, one is wrong.
- **Every figure in a table is mono and tabular** — `StatBlock`, `DataRow`, or
  `.hl-data`. A figure never appears in the sans in a table; prose never appears
  in the mono.
- **Uppercase is only ever the mono label.** Everything else is sentence case,
  buttons and titles included.
- **Say the number, then say what it means.** A `StatBlock` `value` wants its `note`:
  one line of plain consequence, second person, no hedging.
- **Structure by hairline, not by box.** No vertical rules, no zebra striping, no cell
  borders. `Tile` is the only card, and it takes a fill, never a border.
- **`Tile tone="dark"` once per page**, holding the primary figure.
- No emoji, no exclamation marks, no gradients, no photography.

### Where the truth is

Read `styles.css` and the files it imports for the full token list, and each
component's `.prompt.md` for when to reach for it. There are no icon assets — use
Lucide (24px grid, round caps, ~1.75 stroke) and note the substitution.

### An idiomatic screen fragment

```jsx
<div style={{ display: 'grid', gap: 'var(--gap-tile)', gridTemplateColumns: '1fr 1fr' }}>
  <Tile tone="dark" label="Available">
    <StatBlock size="l" value="227 400" unit="XAF" />
  </Tile>
  <Tile tone="quiet" label="This month">
    <StatBlock value="1 284 900" note="Nothing saved this month." />
  </Tile>
</div>
```
