import type { ReactNode } from 'react';
import { StyleSheet, Text, View, type ViewStyle, type StyleProp } from 'react-native';

import { theme } from './theme.js';

export type TileTone = 'quiet' | 'paper' | 'dark' | 'alarm' | 'info' | 'caution';

export interface TileProps {
  children?: ReactNode;
  tone?: TileTone;
  label?: string;
  action?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const { color, radius, inset, space, type, shadow } = theme;

const tones = StyleSheet.create({
  quiet: { backgroundColor: color['surface-card'] },
  paper: { backgroundColor: color.paper, ...shadow.raised },
  dark: { backgroundColor: color['ink-1'] },
  alarm: { backgroundColor: color['alarm-wash'] },
  info: { backgroundColor: color['info-wash'] },
  caution: { backgroundColor: color['caution-wash'] },
});

const styles = StyleSheet.create({
  base: {
    paddingVertical: inset.card.y,
    paddingHorizontal: inset.card.x,
    borderRadius: radius.card,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space[5],
    marginBottom: space[6],
  },
  label: { ...type.label, color: color['text-faint'] },
  /* On the dark tile the label lifts off the ink rather than sinking into it. */
  labelOnDark: { color: 'rgba(255,255,255,0.66)' },
});

/** The only card shape: a fill, a radius, no border. */
export function Tile({ children, tone = 'quiet', label, action, style }: TileProps) {
  return (
    <View style={[styles.base, tones[tone], style]}>
      {label || action ? (
        <View style={styles.head}>
          {label ? (
            <Text style={[styles.label, tone === 'dark' ? styles.labelOnDark : null]}>{label}</Text>
          ) : (
            <View />
          )}
          {action}
        </View>
      ) : null}
      {children}
    </View>
  );
}
