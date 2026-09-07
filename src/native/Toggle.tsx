import { Pressable, StyleSheet, Text, View, type ViewStyle, type StyleProp } from 'react-native';

import { theme } from './theme.js';

export interface ToggleProps {
  on?: boolean;
  onChange?: () => void;
  /** With a label, the whole settings row renders. Without one, just the switch. */
  label?: string;
  /** The consequence of turning it on — say the uncomfortable part. */
  note?: string;
  /** The accessible name when there is no visible label. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const { color, radius, space, inset, type } = theme;

const styles = StyleSheet.create({
  track: {
    width: 36,
    height: 22,
    borderRadius: radius.pill,
    backgroundColor: color['border-strong'],
    justifyContent: 'center',
  },
  trackOn: { backgroundColor: color['ink-1'] },
  knob: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: color.paper,
  },
  knobOn: { left: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space[9],
    paddingVertical: inset.row.y,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color['border-hairline'],
  },
  label: { ...type.item, color: color['text-strong'] },
  note: { ...type.caption, marginTop: 3, color: color['text-muted'] },
  main: { flexShrink: 1, minWidth: 0 },
});

/**
 * A switch, or a whole settings row with its consequence.
 *
 * The knob is positioned rather than animated: RN needs `Animated` for a real
 * transition, and pulling that in for a 180ms slide is not worth the dependency
 * in a component this small. Wrap it yourself if the motion matters.
 */
export function Toggle({ on = false, onChange, label, note, accessibilityLabel, style }: ToggleProps) {
  const sw = (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: on }}
      accessibilityLabel={label ?? accessibilityLabel}
      hitSlop={11}
      onPress={onChange}
      style={[styles.track, on ? styles.trackOn : null]}
    >
      <View style={[styles.knob, on ? styles.knobOn : null]} />
    </Pressable>
  );

  if (!label) return sw;

  return (
    <View style={[styles.row, style]}>
      <View style={styles.main}>
        <Text style={styles.label}>{label}</Text>
        {note ? <Text style={styles.note}>{note}</Text> : null}
      </View>
      {sw}
    </View>
  );
}
