/**
 * Ledger type.
 *
 * Two families. Schibsted Grotesk carries everything human; Azeret Mono carries
 * everything machine — uppercase labels and every figure in a table. A figure
 * never appears in the sans in a table, and prose never appears in the mono.
 *
 * Styles are stored structurally rather than as a CSS `font:` shorthand, because
 * React Native has no shorthand and no `lineHeight: 1.65` unitless ratio. The CSS
 * generator composes the shorthand; the native adapter multiplies the ratio out.
 */

export const family = {
  sans: {
    /** The web stack. */
    stack: '"Schibsted Grotesk", system-ui, sans-serif',
    /** The name the font file registers under, for React Native. */
    native: 'SchibstedGrotesk',
    /** The Google Fonts family name, for both loaders. */
    google: 'Schibsted Grotesk',
    weights: [400, 500, 600],
  },
  mono: {
    stack: '"Azeret Mono", ui-monospace, monospace',
    native: 'AzeretMono',
    google: 'Azeret Mono',
    weights: [400, 500],
  },
} as const;

export type FamilyName = keyof typeof family;
export type Weight = 400 | 500 | 600;

export interface TextStyle {
  family: FamilyName;
  /** px */
  size: number;
  weight: Weight;
  /**
   * Unitless ratio, as CSS writes it — `1` means "set solid". `'normal'` leaves
   * it to the font's own metrics, which is what the mono labels and figures want.
   */
  lineHeight: number | 'normal';
  /** em, matching CSS `letter-spacing`. */
  tracking?: number;
  uppercase?: boolean;
  /** Tabular, slashed-zero figures. Every number in a table sets this. */
  tabular?: boolean;
}

export const text = {
  /* display — figures and page titles, always tight */
  'figure-xl': { family: 'sans', size: 46, weight: 500, lineHeight: 1, tracking: -0.03 },
  'figure-l': { family: 'sans', size: 38, weight: 500, lineHeight: 1, tracking: -0.03 },
  'figure-m': { family: 'sans', size: 30, weight: 500, lineHeight: 1, tracking: -0.03 },
  'figure-s': { family: 'sans', size: 24, weight: 500, lineHeight: 1, tracking: -0.03 },

  /* prose */
  lead: { family: 'sans', size: 17, weight: 500, lineHeight: 1.5 },
  body: { family: 'sans', size: 14, weight: 400, lineHeight: 1.65 },
  'body-s': { family: 'sans', size: 12.5, weight: 400, lineHeight: 1.6 },
  caption: { family: 'sans', size: 11.5, weight: 400, lineHeight: 1.6 },

  /* label — mono, uppercase, wide. the system's signature */
  label: { family: 'mono', size: 9.5, weight: 500, lineHeight: 'normal', tracking: 0.12, uppercase: true },
  'label-s': { family: 'mono', size: 8.5, weight: 500, lineHeight: 'normal', tracking: 0.12, uppercase: true },

  /* data — mono figures, tabular and slashed */
  data: { family: 'mono', size: 13, weight: 400, lineHeight: 'normal', tabular: true },
  'data-s': { family: 'mono', size: 11, weight: 400, lineHeight: 'normal', tabular: true },

  /* content — the sans at the sizes the components actually set it */
  /** A row name, a toggle label, a field value. */
  item: { family: 'sans', size: 14, weight: 400, lineHeight: 'normal' },
  /** The chosen value in a Select. */
  value: { family: 'sans', size: 13.5, weight: 400, lineHeight: 'normal' },
  /** A chip's phrase. */
  chip: { family: 'sans', size: 12.5, weight: 400, lineHeight: 'normal' },
  /** A mono code sitting before a value, e.g. XAF. */
  prefix: { family: 'mono', size: 10, weight: 500, lineHeight: 'normal', tracking: 0.1 },
  /** The one amount on a form, inside a large Field. */
  amount: { family: 'sans', size: 26, weight: 500, lineHeight: 'normal', tracking: -0.02 },

  /* control — the sans used inside pressable things */
  control: { family: 'sans', size: 13, weight: 500, lineHeight: 'normal' },
  'control-s': { family: 'sans', size: 12, weight: 500, lineHeight: 'normal' },
  'control-l': { family: 'sans', size: 14, weight: 500, lineHeight: 'normal' },
} as const satisfies Record<string, TextStyle>;

export type TextName = keyof typeof text;

/** Kept as named tokens because the readme cites them by name. */
export const tracking = {
  figure: -0.03,
  label: 0.12,
  /** Mono meta inside a data row — wider than data, tighter than a label. */
  meta: 0.06,
  /** The large amount in a Field: tight, but not as tight as a display figure. */
  amount: -0.02,
  /** A currency code beside a figure. */
  unit: 0.08,
  /** A mono prefix inside a field. */
  prefix: 0.1,
} as const;
