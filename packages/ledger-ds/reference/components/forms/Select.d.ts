import * as React from 'react';

/** A closed dropdown row. Carries an optional category dot and a mono meta value. */
export interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  value?: React.ReactNode;
  /** CSS colour for the leading category dot */
  dot?: string;
  /** Mono detail beside the value — a rate, an account balance, a format */
  meta?: string;
}
export function Select(props: SelectProps): JSX.Element;
