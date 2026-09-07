import * as React from 'react';

/**
 * A labelled value on a grey fill. Fields have no border; the fill is the affordance.
 * @startingPoint section="Forms" subtitle="Fields, selects, toggles and segmented tabs" viewport="700x300"
 */
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Mono uppercase label above the control */
  label?: string;
  /** One quiet line below, for units, rates or rules */
  hint?: string;
  value?: React.ReactNode;
  /** Mono unit sitting inside, left of the value — e.g. "XAF" */
  prefix?: string;
  /** lg is for the one amount a form is about */
  size?: 'm' | 'lg';
  trailing?: React.ReactNode;
}
export function Field(props: FieldProps): JSX.Element;
