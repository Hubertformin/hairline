import * as React from 'react';

/** A mono uppercase status pill. Ink and wash always travel together. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  tone?: 'neutral' | 'alarm' | 'positive' | 'info' | 'caution';
}
export function Badge(props: BadgeProps): JSX.Element;
