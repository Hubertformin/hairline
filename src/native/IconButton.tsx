import type { ReactNode } from 'react';
import { Pressable, StyleSheet, type ViewStyle, type StyleProp } from 'react-native';

import { theme } from './theme.js';

export type IconButtonTone = 'quiet' | 'solid' | 'bare';

export interface IconButtonProps {
  children?: ReactNode;
  tone?: IconButtonTone;
  /** Diameter. The export's default is 34 — below the 44pt touch minimum, so a
   *  small icon button should carry `hitSlop`, which this component adds for you. */
  size?: number;
  /** The accessible name. Required — a glyph alone is unreachable without one. */
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const { color, radius, height } = theme;

const tones = StyleSheet.create({
  quiet: { backgroundColor: color['surface-quiet'] },
  solid: { backgroundColor: color['action-solid'] },
  bare: { backgroundColor: 'transparent' },
});

/** A round button holding one 24-grid stroke glyph. */
export function IconButton({
  children,
  tone = 'quiet',
  size = 34,
  label,
  onPress,
  disabled,
  style,
}: IconButtonProps) {
  // Keep the visual size but meet the 44pt minimum target.
  const slop = Math.max(0, Math.round((height.touch - size) / 2));
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      hitSlop={slop}
      style={(state) => [
        {
          width: size,
          height: size,
          borderRadius: radius.pill,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tones[tone],
        state.pressed && !disabled ? { opacity: 0.7 } : null,
        disabled ? { opacity: 0.45 } : null,
        style as ViewStyle,
      ]}
    >
      {children}
    </Pressable>
  );
}
