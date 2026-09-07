import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type ViewStyle, type StyleProp } from 'react-native';

import { theme } from './theme.js';
import { renderText } from './text.js';

export interface ChipProps {
  children?: ReactNode;
  selected?: boolean;
  /** A chip that only reports — a preset that is not pressable. */
  interactive?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const { color, radius, height, space } = theme;

const styles = StyleSheet.create({
  base: {
    height: height.pill,
    paddingHorizontal: space[6],
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: space[3],
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: color['border-strong'],
    backgroundColor: 'transparent',
  },
  selected: { borderColor: color['ink-1'] },
  label: { ...theme.type.chip, color: color['text-body'] },
  labelSelected: { color: color['text-strong'] },
});

/** An outlined pill holding a whole phrase — suggestions, presets, filters. */
export function Chip({ children, selected = false, interactive = true, onPress, style }: ChipProps) {
  const content = renderText(children, [
    styles.label,
    selected ? styles.labelSelected : null,
  ]);
  const box = [styles.base, selected ? styles.selected : null, style];

  if (!interactive) return <View style={box}>{content}</View>;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={box}
    >
      {content}
    </Pressable>
  );
}
