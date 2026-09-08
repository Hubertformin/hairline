import type { ReactNode } from 'react';
import { Text, type TextStyle, type StyleProp } from 'react-native';

/**
 * React Native throws on a bare string outside a `<Text>`, so every component
 * that accepts `children: ReactNode` has to wrap the string case itself. Nodes
 * are passed through untouched, which is what lets a caller nest an icon.
 */
export function renderText(children: ReactNode, style?: StyleProp<TextStyle>): ReactNode {
  if (children === null || children === undefined || children === false) return null;
  if (typeof children === 'string' || typeof children === 'number') {
    return <Text style={style}>{children}</Text>;
  }
  return children;
}
