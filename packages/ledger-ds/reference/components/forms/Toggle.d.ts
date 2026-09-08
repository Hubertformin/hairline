import * as React from 'react';

/** A switch. With `label` it renders as a full settings row with a hairline beneath. */
export interface ToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  on?: boolean;
  onChange?: () => void;
  label?: string;
  /** The sentence that explains the consequence of the switch */
  note?: string;
}
export function Toggle(props: ToggleProps): JSX.Element;
