# Ledger class reference

Generated from `src/css/components.css` by `scripts/build-skill.ts`. Every class
below exists in `ledger.css`; nothing else does. If a class you want is not here,
compose one out of the tokens rather than inventing a `.led-` name.

## foundations

- `.led-desk`
- `.led-board` — A white board floating on the desk.
- `.led-label` — The mono uppercase label — the system's signature.
- `.led-label--s`
- `.led-data` — Any figure in a table. Never set a figure in the sans.
- `.led-data--s`
- `.led-marker` — The highlighter. Once per screen, behind the single sentence that matters.
- `.led-hairline` — Structure by hairline, not by box.

## core / Button

- `.led-btn`
- `.led-btn--s`
- `.led-btn--l`
- `.led-btn--solid`
- `.led-btn--quiet`
- `.led-btn--ghost`
- `.led-btn--danger`

## core / IconButton

- `.led-iconbtn`
- `.led-iconbtn--quiet`
- `.led-iconbtn--solid`
- `.led-iconbtn--bare`

## core / Chip

- `.led-chip`
- `.led-chip--selected`
- `.led-chip--static` — A chip that only reports — a preset that is not pressable.

## core / Badge

- `.led-badge`
- `.led-badge--neutral`
- `.led-badge--alarm`
- `.led-badge--positive`
- `.led-badge--info`
- `.led-badge--caution`

## forms / Field

- `.led-field__label`
- `.led-field__box`
- `.led-field__prefix`
- `.led-field__value`
- `.led-field__hint`

## forms / Select

- `.led-select__label`
- `.led-select__box`
- `.led-select__main`
- `.led-select__dot` — The category dot. Its colour is data, so it comes from the markup.
- `.led-select__value`
- `.led-select__meta`
- `.led-select__caret`

## forms / Toggle

- `.led-toggle__switch`
- `.led-toggle__switch--on`
- `.led-toggle__knob`
- `.led-toggle-row` — A whole settings row: the switch, its label, and its consequence.
- `.led-toggle-row__label`
- `.led-toggle-row__note`

## forms / SegmentedTabs

- `.led-tabs`
- `.led-tabs__item`
- `.led-tabs__item--on` — Grey track, one raised white segment. The only tab pattern.

## data / Tile

- `.led-tile` — The only card shape. Fill, radius, no border.
- `.led-tile--paper`
- `.led-tile--dark`
- `.led-tile--alarm`
- `.led-tile--info`
- `.led-tile--caution`
- `.led-tile__head`
- `.led-tile__label`

## data / StatBlock

- `.led-stat__label`
- `.led-stat__row`
- `.led-stat__value` — Say the number...
- `.led-stat__unit`
- `.led-stat__note` — ...then say what it means.

## data / DataRow

- `.led-row` — A ledger line: dot, name, mono meta, figure, running total.
- `.led-row__dot` — The category dot. Its colour is data, so it comes from the markup.
- `.led-row__main`
- `.led-row__name`
- `.led-row__meta`
- `.led-row__amount`
- `.led-row__amount--demoted`
- `.led-row__amount--struck`
- `.led-row__amount--alarm`
- `.led-row__secondary` — The running total, in its own aligned column.

## data / MeterBar

- `.led-meter`
- `.led-meter__fill`
- `.led-meter--stacked` — The stacked composition variant: weighted segments, 2px gaps.
- `.led-meter__segment`
