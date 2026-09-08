# Hairline class reference

Generated from `src/css/components.css` by `scripts/build-skill.ts`. Every class
below exists in `hairline.css`; nothing else does. If a class you want is not here,
compose one out of the tokens rather than inventing a `.hl-` name.

## foundations

- `.hl-desk`
- `.hl-board` — A white board floating on the desk.
- `.hl-label` — The mono uppercase label — the system's signature.
- `.hl-label--s`
- `.hl-data` — Any figure in a table. Never set a figure in the sans.
- `.hl-data--s`
- `.hl-marker` — The highlighter. Once per screen, behind the single sentence that matters.
- `.hl-hairline` — Structure by hairline, not by box.

## core / Button

- `.hl-btn`
- `.hl-btn--s`
- `.hl-btn--l`
- `.hl-btn--solid`
- `.hl-btn--quiet`
- `.hl-btn--ghost`
- `.hl-btn--danger`

## core / IconButton

- `.hl-iconbtn`
- `.hl-iconbtn--quiet`
- `.hl-iconbtn--solid`
- `.hl-iconbtn--bare`

## core / Chip

- `.hl-chip`
- `.hl-chip--selected`
- `.hl-chip--static` — A chip that only reports — a preset that is not pressable.

## core / Badge

- `.hl-badge`
- `.hl-badge--neutral`
- `.hl-badge--alarm`
- `.hl-badge--positive`
- `.hl-badge--info`
- `.hl-badge--caution`

## forms / Field

- `.hl-field__label`
- `.hl-field__box`
- `.hl-field__prefix`
- `.hl-field__value`
- `.hl-field__hint`

## forms / Select

- `.hl-select__label`
- `.hl-select__box`
- `.hl-select__main`
- `.hl-select__dot` — The category dot. Its colour is data, so it comes from the markup.
- `.hl-select__value`
- `.hl-select__meta`
- `.hl-select__caret`

## forms / Toggle

- `.hl-toggle__switch`
- `.hl-toggle__switch--on`
- `.hl-toggle__knob`
- `.hl-toggle-row` — A whole settings row: the switch, its label, and its consequence.
- `.hl-toggle-row__label`
- `.hl-toggle-row__note`

## forms / SegmentedTabs

- `.hl-tabs`
- `.hl-tabs__item`
- `.hl-tabs__item--on` — Grey track, one raised white segment. The only tab pattern.

## data / Tile

- `.hl-tile` — The only card shape. Fill, radius, no border.
- `.hl-tile--paper`
- `.hl-tile--dark`
- `.hl-tile--alarm`
- `.hl-tile--info`
- `.hl-tile--caution`
- `.hl-tile__head`
- `.hl-tile__label`

## data / StatBlock

- `.hl-stat__label`
- `.hl-stat__row`
- `.hl-stat__value` — Say the number...
- `.hl-stat__unit`
- `.hl-stat__note` — ...then say what it means.

## data / DataRow

- `.hl-row` — A ledger line: dot, name, mono meta, figure, running total.
- `.hl-row__dot` — The category dot. Its colour is data, so it comes from the markup.
- `.hl-row__main`
- `.hl-row__name`
- `.hl-row__meta`
- `.hl-row__amount`
- `.hl-row__amount--demoted`
- `.hl-row__amount--struck`
- `.hl-row__amount--alarm`
- `.hl-row__secondary` — The running total, in its own aligned column.

## data / MeterBar

- `.hl-meter`
- `.hl-meter__fill`
- `.hl-meter--stacked` — The stacked composition variant: weighted segments, 2px gaps.
- `.hl-meter__segment`
