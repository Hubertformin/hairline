import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, type ViewStyle, type StyleProp } from 'react-native';

import { theme } from './theme.js';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

export interface SegmentedTabsProps {
  /** A bare string is shorthand for `{ id: s, label: s }`. */
  items?: (TabItem | string)[];
  value?: string;
  onChange?: (id: string) => void;
  /** Mono uppercase labels — the default, and the system's signature. */
  mono?: boolean;
  /** Let the track scroll when the tabs do not fit. Off by default. */
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
}

const { color, radius, space, type, shadow } = theme;

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    gap: space[1],
    padding: space[1],
    borderRadius: radius.pill,
    backgroundColor: color['surface-card'],
  },
  item: {
    height: 34,
    paddingHorizontal: space[7],
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
    borderRadius: radius.pill,
  },
  /* Grey track, one raised white segment. The only tab pattern. */
  itemOn: { backgroundColor: color.paper, ...shadow.raised },
  label: { ...type.label, color: color['text-muted'] },
  labelSans: { ...type['control-s'], letterSpacing: 0, textTransform: 'none' },
  labelOn: { color: color['text-strong'] },
});

export function SegmentedTabs({
  items = [],
  value,
  onChange,
  mono = true,
  scrollable = false,
  style,
}: SegmentedTabsProps) {
  const track = (
    <View accessibilityRole="tablist" style={[styles.track, style]}>
      {items.map((it) => {
        const item: TabItem = typeof it === 'string' ? { id: it, label: it } : it;
        const on = item.id === value;
        return (
          <Pressable
            key={item.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            onPress={() => onChange?.(item.id)}
            style={[styles.item, on ? styles.itemOn : null]}
          >
            {item.icon}
            <Text style={[styles.label, mono ? null : styles.labelSans, on ? styles.labelOn : null]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

  if (!scrollable) return track;
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {track}
    </ScrollView>
  );
}
