import { StyleSheet, View, type ViewStyle, type StyleProp } from 'react-native';

import { theme } from './theme.js';

export interface MeterSegment {
  label?: string;
  amount: number;
  color: string;
}

export interface MeterBarProps {
  /** Pass segments for a stacked composition bar; omit them for a limit meter. */
  segments?: MeterSegment[];
  value?: number;
  limit?: number;
  /** Over the limit: the whole track fills, in alarm. */
  over?: boolean;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

const { color, radius, stroke } = theme;

const styles = StyleSheet.create({
  track: { borderRadius: radius.pill, backgroundColor: color['border-strong'], overflow: 'hidden' },
  fill: { height: '100%', borderRadius: radius.pill, backgroundColor: color['ink-1'] },
  over: { backgroundColor: color.alarm },
  stacked: { flexDirection: 'row', gap: 2, backgroundColor: 'transparent', overflow: 'visible' },
  segment: { borderRadius: radius.pill, minWidth: 2 },
});

/** A limit meter, or a stacked composition bar. */
export function MeterBar({
  segments,
  value = 0,
  limit = 100,
  over = false,
  height = stroke.meter,
  style,
}: MeterBarProps) {
  if (segments && segments.length) {
    const total = segments.reduce((sum, s) => sum + s.amount, 0) || 1;
    return (
      <View style={[styles.track, styles.stacked, { height }, style]}>
        {segments.map((s, i) => (
          <View
            key={s.label ?? i}
            style={[styles.segment, { flex: s.amount / total, backgroundColor: s.color }]}
          />
        ))}
      </View>
    );
  }

  const pct = Math.min(100, Math.round((value / (limit || 1)) * 100));
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ now: value, min: 0, max: limit }}
      style={[styles.track, { height }, style]}
    >
      <View style={[styles.fill, over ? styles.over : null, { width: `${over ? 100 : pct}%` }]} />
    </View>
  );
}
