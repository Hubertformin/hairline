import { StyleSheet, Text, View, type ViewStyle, type StyleProp } from 'react-native';

import { theme } from './theme.js';

export type StatSize = 'xl' | 'l' | 'm' | 's';
export type StatTone = 'ink' | 'alarm' | 'positive' | 'info';

export interface StatBlockProps {
  label?: string;
  /** The figure. Group thousands with a thin space: 250 000. */
  value?: string | number;
  unit?: string;
  /** One line of plain consequence. Say the number, then say what it means. */
  note?: string;
  size?: StatSize;
  tone?: StatTone;
  /** Set when the block sits inside a dark Tile. */
  onDark?: boolean;
  style?: StyleProp<ViewStyle>;
}

const { color, space, type, tracking } = theme;

const figures = StyleSheet.create({
  xl: type['figure-xl'],
  l: type['figure-l'],
  m: type['figure-m'],
  s: type['figure-s'],
});

const inks = StyleSheet.create({
  ink: { color: color['text-strong'] },
  alarm: { color: color.alarm },
  positive: { color: color.positive },
  info: { color: color.info },
});

const styles = StyleSheet.create({
  label: { ...type.label, color: color['text-faint'] },
  row: { marginTop: space[5], flexDirection: 'row', alignItems: 'baseline', gap: space[5] },
  unit: {
    ...type['data-s'],
    letterSpacing: (type['data-s'].fontSize ?? 11) * tracking.unit,
    color: color['text-muted'],
    textTransform: 'uppercase',
  },
  note: { ...type['body-s'], marginTop: space[4], color: color['text-muted'] },
  onDark: { color: color['text-on-dark'] },
  labelOnDark: { color: 'rgba(255,255,255,0.66)' },
});

/** Label, big tight figure, one line of meaning. */
export function StatBlock({
  label,
  value,
  unit,
  note,
  size = 'm',
  tone = 'ink',
  onDark = false,
  style,
}: StatBlockProps) {
  return (
    <View style={style}>
      {label ? (
        <Text style={[styles.label, onDark ? styles.labelOnDark : null]}>{label}</Text>
      ) : null}
      <View style={styles.row}>
        <Text
          style={[
            // Figure tracking is part of the token, so `textStyle` has already
            // applied it — do not set letterSpacing again here.
            figures[size],
            inks[tone],
            onDark && tone === 'ink' ? styles.onDark : null,
          ]}
        >
          {value}
        </Text>
        {unit ? <Text style={styles.unit}>{unit}</Text> : null}
      </View>
      {note ? <Text style={styles.note}>{note}</Text> : null}
    </View>
  );
}
