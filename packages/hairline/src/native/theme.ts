/**
 * The React Native adapter over the shared token layer.
 *
 * Web reads tokens through `var(--ink-1)`. React Native has no custom properties,
 * so it reads the same TypeScript source directly and translates the handful of
 * things CSS expresses differently:
 *
 *   - a `font` shorthand becomes fontFamily + fontSize + fontWeight;
 *   - `letter-spacing` in em becomes px (RN has no em), so tracking is multiplied
 *     by the font size;
 *   - `line-height` as a unitless ratio becomes px, likewise multiplied;
 *   - one CSS box-shadow becomes iOS shadow* props plus an Android elevation;
 *   - font weights become distinct registered font families, because that is how
 *     Google Fonts ships them to Expo.
 */
import type { TextStyle as RNTextStyle, ViewStyle } from 'react-native';

/** React Native's style types are deeply readonly; building one needs a mutable view. */
type Mutable<T> = { -readonly [K in keyof T]: T[K] };

import {
  color,
  palette,
  series,
  tonePair,
  family,
  text,
  tracking,
  space,
  inset,
  gap,
  clearanceBar,
  radius,
  height,
  shadow,
  scrim,
  stroke,
  dotSeries,
  duration,
  easeBezier,
  type TextName,
  type TextStyle,
  type Weight,
  type ShadowName,
} from '@hairline/tokens';

/** How Google Fonts names each weight when Expo registers it. */
const WEIGHT_SUFFIX: Record<Weight, string> = {
  400: 'Regular',
  500: 'Medium',
  600: 'SemiBold',
};

/**
 * The registered family name for a family + weight, e.g. `SchibstedGrotesk_500Medium`.
 * These are exactly the export names of `@expo-google-fonts/schibsted-grotesk`
 * and `@expo-google-fonts/azeret-mono`.
 */
export function fontFamilyFor(which: 'sans' | 'mono', weight: Weight): string {
  return `${family[which].native}_${weight}${WEIGHT_SUFFIX[weight]}`;
}

/**
 * Everything that must be loaded before the first render.
 *
 * ```tsx
 * import { useFonts, SchibstedGrotesk_400Regular, SchibstedGrotesk_500Medium,
 *          SchibstedGrotesk_600SemiBold } from '@expo-google-fonts/schibsted-grotesk';
 * import { AzeretMono_400Regular, AzeretMono_500Medium } from '@expo-google-fonts/azeret-mono';
 * ```
 *
 * Until they resolve, RN silently falls back to the system face — which loses the
 * tabular figures the whole system depends on, so gate your first paint on it.
 */
export const requiredFonts = [
  ...family.sans.weights.map((w) => fontFamilyFor('sans', w as Weight)),
  ...family.mono.weights.map((w) => fontFamilyFor('mono', w as Weight)),
];

/** Translates a token text style into a React Native `TextStyle`. */
export function textStyle(name: TextName): RNTextStyle {
  // `text` is `as const`, so each entry narrows to a literal type without the
  // optional keys. Widen to the declared interface before reading them.
  const t: TextStyle = text[name];
  const style: Mutable<RNTextStyle> = {
    fontFamily: fontFamilyFor(t.family, t.weight),
    fontSize: t.size,
  };
  if (t.lineHeight !== 'normal') style.lineHeight = Math.round(t.size * t.lineHeight);
  // RN letter-spacing is in px; the token is in em, as CSS writes it.
  if (t.tracking) style.letterSpacing = Number((t.size * t.tracking).toFixed(2));
  if (t.uppercase) style.textTransform = 'uppercase';
  // iOS honours tabular-nums; there is no slashed-zero equivalent, and Android
  // depends on the font's own default figures.
  if (t.tabular) style.fontVariant = ['tabular-nums'];
  return style;
}

/** Every text token, pre-translated. Cheaper than calling `textStyle` per render. */
export const type = Object.fromEntries(
  (Object.keys(text) as TextName[]).map((k) => [k, textStyle(k)]),
) as Record<TextName, RNTextStyle>;

const RGBA = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,/\s]+([\d.]*))?\s*\)/;

/**
 * Translates one CSS shadow into RN's split model.
 *
 * iOS wants an opaque colour plus a separate opacity, so the token's rgba is
 * taken apart here; Android ignores all of it and uses `elevation`.
 */
export function shadowStyle(name: ShadowName): ViewStyle {
  const s = shadow[name];
  const m = RGBA.exec(s.color);
  const rgb = m ? `rgb(${m[1]}, ${m[2]}, ${m[3]})` : s.color;
  const opacity = m && m[4] !== undefined && m[4] !== '' ? Number(m[4]) : 1;
  return {
    shadowColor: rgb,
    shadowOffset: { width: s.x, height: s.y },
    // CSS blur radius is roughly twice iOS's shadowRadius.
    shadowRadius: s.blur / 2,
    shadowOpacity: opacity,
    elevation: s.elevation,
  };
}

/**
 * The design language, in the shape React Native styles want.
 *
 * Annotated explicitly rather than inferred: `ViewStyle` reaches into RN's
 * internal type modules, which TypeScript cannot name from a declaration file.
 */
export interface Theme {
  color: typeof color;
  palette: typeof palette;
  series: typeof series;
  tonePair: typeof tonePair;
  type: Record<TextName, RNTextStyle>;
  space: typeof space;
  inset: typeof inset;
  gap: typeof gap;
  clearanceBar: number;
  radius: typeof radius;
  height: typeof height;
  scrim: string;
  stroke: typeof stroke;
  dotSeries: number;
  duration: typeof duration;
  easeBezier: typeof easeBezier;
  tracking: typeof tracking;
  shadow: Record<ShadowName, ViewStyle>;
}

export const theme: Theme = {
  color,
  palette,
  series,
  tonePair,
  type,
  space,
  inset,
  gap,
  clearanceBar,
  radius,
  height,
  scrim,
  stroke,
  dotSeries,
  duration,
  easeBezier,
  tracking,
  shadow: {
    raised: shadowStyle('raised'),
    float: shadowStyle('float'),
    modal: shadowStyle('modal'),
  },
};
