/**
 * Ledger space.
 *
 * Generous and uneven on purpose: 26–34px between sections, 20px between tiles,
 * 8–14px inside rows. Labels sit 10–14px above their value.
 */

export const space = {
  1: 4,
  2: 6,
  3: 8,
  4: 10,
  5: 12,
  6: 14,
  7: 16,
  8: 18,
  9: 20,
  10: 22,
  11: 26,
  12: 30,
  13: 34,
  14: 40,
} as const;

export type SpaceStep = keyof typeof space;

/** Vertical/horizontal pairs, as CSS would write `padding: 22px 24px`. */
export interface Inset {
  y: number;
  x: number;
}

export const inset = {
  /** A full page board. */
  board: { y: 26, x: 30 },
  /** A tile. */
  card: { y: 22, x: 24 },
  /** A list row — horizontal padding comes from the parent. */
  row: { y: 12, x: 0 },
} as const satisfies Record<string, Inset>;

export const gap = {
  /** Between tiles in a row. */
  tile: 20,
  /** Between page columns. */
  column: 26,
} as const;

/** Bottom padding to reserve when the floating assistant bar is present. */
export const clearanceBar = 116;
