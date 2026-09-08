import * as React from 'react';

/** An outlined pill offering a whole sentence the user can pick — suggestions, filters, presets. */
export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  selected?: boolean;
  interactive?: boolean;
}
export function Chip(props: ChipProps): JSX.Element;
