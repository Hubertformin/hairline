import type { ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type ViewStyle,
  type StyleProp,
} from 'react-native';

import { theme } from './theme.js';

export type FieldSize = 'm' | 'lg';

export interface FieldProps {
  label?: string;
  hint?: string;
  /** The value shown, or the input's value when `editable`. */
  value?: string | number;
  /** A mono code sitting before the value, e.g. XAF. */
  prefix?: string;
  /** `lg` is for the one amount on a form — never for two. */
  size?: FieldSize;
  trailing?: ReactNode;
  /**
   * Render a real `TextInput` rather than static text. The original export was a
   * display-only mock, which is right for a screen design and useless in an app.
   */
  editable?: boolean;
  inputProps?: Omit<TextInputProps, 'value' | 'style'>;
  style?: StyleProp<ViewStyle>;
}

const { color, radius, height, space, type, tracking } = theme;

const styles = StyleSheet.create({
  label: { ...type['label-s'], color: color['text-faint'] },
  box: {
    marginTop: space[4],
    height: height.field,
    paddingHorizontal: space[7],
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[5],
    borderRadius: radius.field,
    backgroundColor: color['surface-field'],
  },
  boxLg: { height: height['field-lg'] },
  prefix: { ...type.prefix, color: color['text-muted'] },
  value: { flex: 1, minWidth: 0, ...type.item, color: color['text-strong'] },
  valueLg: { ...type.amount, letterSpacing: (type.amount.fontSize ?? 26) * tracking.amount },
  hint: { ...type.caption, marginTop: space[3], color: color['text-muted'] },
  /* RN gives a TextInput its own vertical padding and a platform default height. */
  input: { paddingVertical: 0, margin: 0 },
});

/** A labelled value on a grey fill. `size="lg"` is for the single amount a form is about. */
export function Field({
  label,
  hint,
  value,
  prefix,
  size = 'm',
  trailing,
  editable,
  inputProps,
  style,
}: FieldProps) {
  const valueStyle = [styles.value, size === 'lg' ? styles.valueLg : null];
  return (
    <View style={style}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.box, size === 'lg' ? styles.boxLg : null]}>
        {prefix ? <Text style={styles.prefix}>{prefix}</Text> : null}
        {editable ? (
          <TextInput
            value={value === undefined ? undefined : String(value)}
            placeholderTextColor={color['text-faint']}
            style={[valueStyle, styles.input]}
            {...inputProps}
          />
        ) : (
          <Text style={valueStyle} numberOfLines={1}>
            {value}
          </Text>
        )}
        {trailing}
      </View>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}
