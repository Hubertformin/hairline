import type { ReactNode } from 'react';
import { Pressable, StyleSheet, type PressableProps, type ViewStyle, type StyleProp } from 'react-native';

import { theme } from './theme.js';
import { renderText } from './text.js';

export type ButtonTone = 'solid' | 'quiet' | 'ghost' | 'danger';
export type ButtonSize = 's' | 'm' | 'l';

export interface ButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  children?: ReactNode;
  /** solid = the one primary action; quiet = secondary; ghost = tertiary; danger = destructive */
  tone?: ButtonTone;
  size?: ButtonSize;
  iconRight?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const { color, radius, height, space, type } = theme;

const base: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: space[3],
  borderRadius: radius.pill,
  height: height.control,
  paddingHorizontal: space[8],
};

const sizes = StyleSheet.create({
  s: { height: height.pill, paddingHorizontal: space[6] },
  m: {},
  l: { height: 48, paddingHorizontal: space[10] },
});

const tones = StyleSheet.create({
  solid: { backgroundColor: color['action-solid'] },
  quiet: { backgroundColor: color['surface-quiet'] },
  ghost: { backgroundColor: 'transparent' },
  danger: { backgroundColor: color['alarm-wash'] },
});

/** Press steps one surface darker — the same rule the web layer applies on :active. */
const pressed = StyleSheet.create({
  solid: { backgroundColor: color['ink-2'] },
  quiet: { backgroundColor: color.desk },
  ghost: { backgroundColor: color['surface-2'] },
  danger: { backgroundColor: color['alarm-wash'] },
});

const labels = StyleSheet.create({
  s: { ...type['control-s'], color: color['text-strong'] },
  m: { ...type.control, color: color['text-strong'] },
  l: { ...type['control-l'], color: color['text-strong'] },
});

const labelTones = StyleSheet.create({
  solid: { color: color['action-solid-text'] },
  quiet: { color: color['text-strong'] },
  ghost: { color: color['text-body'] },
  danger: { color: color.alarm },
});

/** The one pressable shape: a pill. `solid` is the single primary action per view. */
export function Button({
  children,
  tone = 'solid',
  size = 'm',
  iconRight,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={(state) => [
        base,
        sizes[size],
        tones[tone],
        state.pressed && !disabled ? pressed[tone] : null,
        disabled ? { opacity: 0.45 } : null,
        style as ViewStyle,
      ]}
      {...rest}
    >
      {renderText(children, [labels[size], labelTones[tone]])}
      {iconRight}
    </Pressable>
  );
}
