import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle, type StyleProp } from 'react-native';

import { theme } from './theme.js';
import { renderText } from './text.js';

export type BadgeTone = 'neutral' | 'alarm' | 'positive' | 'info' | 'caution';

export interface BadgeProps {
  children?: ReactNode;
  tone?: BadgeTone;
  style?: StyleProp<ViewStyle>;
}

const { color, radius, type } = theme;

const base: ViewStyle = {
  height: 20,
  paddingHorizontal: 9,
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'flex-start',
  borderRadius: radius.pill,
};

/** Ink and wash travel together — a badge is never a border-only accent. */
const tones = StyleSheet.create({
  neutral: { backgroundColor: color['surface-quiet'] },
  alarm: { backgroundColor: color['alarm-wash'] },
  positive: { backgroundColor: color['positive-wash'] },
  info: { backgroundColor: color['info-wash'] },
  caution: { backgroundColor: color['caution-wash'] },
});

const inks = StyleSheet.create({
  neutral: { color: color['text-muted'] },
  alarm: { color: color.alarm },
  positive: { color: color.positive },
  info: { color: color.info },
  caution: { color: color.caution },
});

/** A mono uppercase state marker. */
export function Badge({ children, tone = 'neutral', style }: BadgeProps) {
  return (
    <View style={[base, tones[tone], style]}>
      {renderText(children, [type['label-s'], inks[tone]])}
    </View>
  );
}
