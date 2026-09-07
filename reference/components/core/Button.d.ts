import * as React from 'react';

/**
 * The one pressable shape: a pill. Solid black is the single primary action per view.
 * @startingPoint section="Core" subtitle="Pill buttons in four tones and three sizes" viewport="700x160"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  /** solid = the one primary action; quiet = secondary; ghost = tertiary; danger = destructive */
  tone?: 'solid' | 'quiet' | 'ghost' | 'danger';
  size?: 's' | 'm' | 'l';
  disabled?: boolean;
  /** Optional trailing glyph, e.g. an arrow on "Continue" */
  iconRight?: React.ReactNode;
}
export function Button(props: ButtonProps): JSX.Element;
