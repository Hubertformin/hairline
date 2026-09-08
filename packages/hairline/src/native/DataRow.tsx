import type { ReactNode } from 'react';
import { StyleSheet, Text, View, type ViewStyle, type StyleProp } from 'react-native';

import { theme } from './theme.js';

export type DataRowState = 'plain' | 'demoted' | 'struck' | 'alarm';

export interface DataRowProps {
  name?: string;
  /** Mono uppercase detail under the name — a date, a method, a category. */
  meta?: string;
  /** A category dot. Its colour is data, so it is passed in as a colour. */
  dot?: string;
  amount?: string | number;
  /** The running total, in its own right-aligned column. */
  secondary?: string | number;
  state?: DataRowState;
  badge?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const { color, space, inset, type, tracking, dotSeries } = theme;

const states = StyleSheet.create({
  plain: { color: color['text-strong'] },
  demoted: { color: color['text-muted'] },
  /* Demoted values carry a mark as well as a step down, because lightness
     alone is not readable. */
  struck: { color: color['text-muted'], textDecorationLine: 'line-through' },
  alarm: { color: color.alarm, fontWeight: '500' },
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[5],
    paddingVertical: inset.row.y,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color['border-hairline'],
  },
  dot: { width: dotSeries, height: dotSeries, borderRadius: dotSeries / 2 },
  main: { flex: 1, minWidth: 0 },
  name: { ...type.item, color: color['text-strong'] },
  meta: {
    ...type['data-s'],
    marginTop: 3,
    letterSpacing: (type['data-s'].fontSize ?? 11) * tracking.meta,
    textTransform: 'uppercase',
    color: color['text-muted'],
  },
  amount: type.data,
  secondary: { ...type.data, width: 110, textAlign: 'right', color: color['text-muted'] },
});

/** A hairline line: dot, name, mono meta, figure, running total. */
export function DataRow({
  name,
  meta,
  dot,
  amount,
  secondary,
  state = 'plain',
  badge,
  style,
}: DataRowProps) {
  return (
    <View style={[styles.row, style]}>
      {dot ? <View style={[styles.dot, { backgroundColor: dot }]} /> : null}
      <View style={styles.main}>
        <Text style={styles.name}>{name}</Text>
        {meta ? <Text style={styles.meta}>{meta}</Text> : null}
      </View>
      {badge}
      <Text style={[styles.amount, states[state]]}>{amount}</Text>
      {secondary !== undefined ? <Text style={styles.secondary}>{secondary}</Text> : null}
    </View>
  );
}
