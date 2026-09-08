/**
 * Ledger shape.
 *
 * Pills for anything you can press, 14px for fields, 20px for tiles, 22px for
 * boards. Nothing is square-cornered and nothing is a circle except avatars,
 * dots and the send button.
 */

export const radius = {
  board: 22,
  card: 20,
  inner: 16,
  field: 14,
  chip: 12,
  'tile-icon': 10,
  /** Effectively a pill at any height this system uses. */
  pill: 99,
} as const;

export type RadiusName = keyof typeof radius;

export const height = {
  /** Buttons, selects. */
  control: 40,
  /** Text fields. */
  field: 48,
  /** Amount fields — the one big figure on a form. */
  'field-lg': 56,
  /** Tabs, chips. */
  pill: 32,
  /** Minimum touch target on mobile. */
  touch: 44,
} as const;

export interface Shadow {
  /** px */
  x: number;
  y: number;
  blur: number;
  /** rgba string, so both platforms can read the colour directly. */
  color: string;
  /** React Native has no blur-less spread model; this drives `elevation`. */
  elevation: number;
}

export const shadow = {
  /** The only shadow in normal UI. */
  raised: { x: 0, y: 1, blur: 2, color: 'rgba(17,18,20,.08)', elevation: 1 },
  /** The floating assistant bar. */
  float: { x: 0, y: 10, blur: 30, color: 'rgba(17,18,20,.22)', elevation: 8 },
  modal: { x: 0, y: 24, blur: 60, color: 'rgba(17,18,20,.30)', elevation: 16 },
} as const satisfies Record<string, Shadow>;

export type ShadowName = keyof typeof shadow;

/** The modal scrim, at 30 % ink. The only transparency in the system. */
export const scrim = 'rgba(17,18,20,.30)';

export const stroke = {
  /** A limit meter. */
  meter: 8,
  /** A line on a chart. */
  series: 2,
} as const;

/** A dot on a series line, or the category dot in a data row. */
export const dotSeries = 6;
