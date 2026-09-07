import { Pressable, StyleSheet, Text, View, type ViewStyle, type StyleProp } from 'react-native';

import { theme } from './theme.js';

export interface SelectProps {
  label?: string;
  /** The chosen value, as displayed. */
  value?: string;
  /** A category dot. Its colour is data, so it is passed in as a colour. */
  dot?: string;
  /** Mono detail after the value — an account number, a count. */
  meta?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  /** The caret glyph. Bring your own icon set; Lucide matches the 24px grid. */
  caret?: React.ReactNode;
}

const { color, radius, height, space, type, dotSeries } = theme;

const styles = StyleSheet.create({
  label: { ...type['label-s'], color: color['text-faint'] },
  box: {
    marginTop: space[4],
    height: height.field,
    paddingHorizontal: space[7],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space[5],
    borderRadius: radius.field,
    backgroundColor: color['surface-field'],
  },
  pressed: { backgroundColor: color['surface-quiet'] },
  main: { flexDirection: 'row', alignItems: 'center', gap: space[4], minWidth: 0, flexShrink: 1 },
  dot: { width: dotSeries, height: dotSeries, borderRadius: dotSeries / 2 },
  value: { ...type.value, color: color['text-strong'], flexShrink: 1 },
  meta: { ...type['data-s'], color: color['text-muted'] },
});

/**
 * A closed dropdown — the trigger only.
 *
 * It renders the closed state and calls `onPress`; it does not open a menu or
 * manage selection. Wire it to your own sheet or picker.
 */
export function Select({ label, value, dot, meta, onPress, style, caret }: SelectProps) {
  return (
    <View style={style}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityValue={{ text: value }}
        onPress={onPress}
        style={(state) => [styles.box, state.pressed ? styles.pressed : null]}
      >
        <View style={styles.main}>
          {dot ? <View style={[styles.dot, { backgroundColor: dot }]} /> : null}
          <Text style={styles.value} numberOfLines={1}>
            {value}
          </Text>
          {meta ? <Text style={styles.meta}>{meta}</Text> : null}
        </View>
        {caret}
      </Pressable>
    </View>
  );
}
