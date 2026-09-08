/**
 * Ledger colour.
 *
 * Chrome is monochrome. Colour appears only where it encodes data — a category,
 * a series, a status. Semantic colours always travel as an ink + wash pair.
 *
 * `palette` holds the raw values; `color` holds the semantic aliases components
 * are expected to read. On the web both become custom properties and the alias
 * points at the raw var; in JS the alias is already resolved to a hex string,
 * because React Native has no `var()`.
 */

export const palette = {
  /* ink — text, in four steps from black to placeholder */
  'ink-1': '#111214',
  'ink-2': '#42454D',
  'ink-3': '#6E7178',
  'ink-4': '#8E9099',

  /* surfaces — paper white through to the desk the app sits on */
  paper: '#FFFFFF',
  'surface-1': '#FBFBFC',
  'surface-2': '#F7F8F9',
  'surface-3': '#F2F3F5',
  desk: '#EDEEF0',

  /* lines — two weights only */
  'line-1': '#F0F1F3',
  'line-2': '#E4E6EA',

  /* accents — a spectrum for data series, never for chrome */
  'a-blue': '#3B5BFF',
  'a-violet': '#8B5CF6',
  'a-purple': '#B84DFF',
  'a-magenta': '#E9298F',
  'a-rose': '#FF4D6D',
  'a-coral': '#FF6B4A',
  'a-amber': '#FFA83D',
  'a-yellow': '#FFC53D',
  'a-lemon': '#F5D93D',
  'a-green': '#8CD44A',

  /* semantic — each has an ink and a wash, and the pair is used together */
  alarm: '#D22B4A',
  'alarm-wash': '#FBF0F3',
  positive: '#3D7A2A',
  'positive-wash': '#EAF6E7',
  info: '#2E4CB8',
  'info-wash': '#F1F4FE',
  caution: '#8A6A16',
  'caution-wash': '#FFF6E0',

  /** The highlighter. Once per screen, behind the single sentence that matters. */
  marker: '#F7E29F',
} as const;

export type PaletteName = keyof typeof palette;

/**
 * The dark theme — chalk on slate rather than ink on paper.
 *
 * NOT part of the original design export, which is light-only. These values are
 * authored here and are the one part of the token layer the fidelity contract does
 * not cover, so they are the part most worth reviewing with a designer's eye.
 *
 * The structure is deliberately preserved rather than naively inverted:
 *   - boards still float *lighter* than the desk they sit on, so `paper` stays
 *     above `desk` — the relationship carries over even though both are dark;
 *   - the surface ramp still steps away from `paper` in the same direction of
 *     emphasis, so a "secondary block" still reads as recessed;
 *   - the ink ramp keeps its four roles, with `ink-3` still the floor for
 *     meaningful text (~6.5:1 on `paper`) and `ink-4` still chrome-only;
 *   - accents are lifted in luminance, because the light-mode values are tuned for
 *     contrast against white and several of them fail against a dark ground;
 *   - each semantic ink keeps a wash, and the washes become dark tints rather than
 *     pale ones so the ink+wash pairing still reads as one unit.
 *
 * Only the raw scale is re-pointed. The semantic aliases are unchanged, which is
 * what makes the whole theme a 20-line diff instead of a rewrite.
 */
export const darkPalette = {
  /* ink — inverted: 1 is now the brightest */
  'ink-1': '#F4F5F7',
  'ink-2': '#C6C9D0',
  'ink-3': '#9CA0A9',
  'ink-4': '#71757E',

  /* surfaces — boards still float above the desk */
  paper: '#17181C',
  'surface-1': '#1C1D22',
  'surface-2': '#212228',
  'surface-3': '#282A31',
  desk: '#0D0E10',

  /* lines — still two weights, still barely there */
  'line-1': '#23252B',
  'line-2': '#2F3138',

  /* accents — lifted for contrast on a dark ground */
  'a-blue': '#6E86FF',
  'a-violet': '#A78BFA',
  'a-purple': '#C98BFF',
  'a-magenta': '#F45CA6',
  'a-rose': '#FF7A90',
  'a-coral': '#FF8B6B',
  'a-amber': '#FFBB63',
  'a-yellow': '#FFD264',
  'a-lemon': '#F2E07A',
  'a-green': '#A3DC6E',

  /* semantic — ink lifted, wash darkened, still travelling together */
  alarm: '#FF6E85',
  'alarm-wash': '#2B171C',
  positive: '#7CC96A',
  'positive-wash': '#16241A',
  info: '#8098FF',
  'info-wash': '#181C31',
  caution: '#E0B564',
  'caution-wash': '#2A2317',

  /** The highlighter, as a dark gold. Text on top stays `ink-1`. */
  marker: '#5C4E1C',
} as const satisfies Record<PaletteName, string>;

/**
 * Semantic aliases. Components read these, never the raw scale — which is what
 * makes a dark theme a matter of re-pointing this map and nothing else.
 */
export const alias = {
  'text-strong': 'ink-1',
  'text-body': 'ink-2',
  'text-muted': 'ink-3',
  'text-faint': 'ink-4',
  'text-on-dark': 'paper',
  'surface-card': 'surface-2',
  'surface-field': 'surface-2',
  'surface-quiet': 'surface-3',
  'border-hairline': 'line-1',
  'border-strong': 'line-2',
  'action-solid': 'ink-1',
  'action-solid-text': 'paper',
  'focus-ring': 'ink-1',
} as const satisfies Record<string, PaletteName>;

export type AliasName = keyof typeof alias;

/** Palette plus aliases, every value resolved to a literal hex. */
export const color = {
  ...palette,
  ...(Object.fromEntries(
    Object.entries(alias).map(([name, target]) => [name, palette[target]]),
  ) as { [K in AliasName]: string }),
};

/** The accent spectrum in order, for assigning colours to data series. */
export const series = [
  palette['a-blue'],
  palette['a-violet'],
  palette['a-purple'],
  palette['a-magenta'],
  palette['a-rose'],
  palette['a-coral'],
  palette['a-amber'],
  palette['a-yellow'],
  palette['a-lemon'],
  palette['a-green'],
] as const;

/** Semantic pairs, so an ink is never used without its wash. */
export const tonePair = {
  alarm: { ink: palette.alarm, wash: palette['alarm-wash'] },
  positive: { ink: palette.positive, wash: palette['positive-wash'] },
  info: { ink: palette.info, wash: palette['info-wash'] },
  caution: { ink: palette.caution, wash: palette['caution-wash'] },
} as const;

export type ToneName = keyof typeof tonePair;
